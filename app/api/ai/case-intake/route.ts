import { NextResponse } from "next/server";
import { getSessionUser } from "../../../lib/auth";

/**
 * Smart Case Intake — extracts structured case details from a petition,
 * appeal notice, or letter (scanned image, PDF, or plain text) using Gemini.
 *
 * The AI only PRE-FILLS the registration form. A registrar must always
 * review and confirm before the case is registered.
 */

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_BYTES = 15 * 1024 * 1024; // Gemini inline data limit is ~20MB per request
const SUPPORTED_MIME = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/heic",
  "image/heif",
  "text/plain",
];

// OpenAPI-style schema accepted by Gemini's responseSchema
const RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    nature: { type: "STRING", enum: ["PETITION", "APPEAL"] },
    caseType: {
      type: "STRING",
      enum: [
        "STOOL_DISPUTE",
        "DESTOOLMENT_PETITION",
        "GAZETTE_CHALLENGE",
        "CHIEFTAINCY_DECLARATION",
        "COUNCIL_APPEAL",
      ],
    },
    traditionalArea: { type: "STRING", description: "Traditional Area name only, without the words 'Traditional Area'/'Traditional Council'" },
    divisionTown: { type: "STRING" },
    title: { type: "STRING", description: "Suit heading in the form 'X & N Ors v. Y'" },
    appealDecision: { type: "STRING" },
    reliefsSought: { type: "STRING", description: "Numbered list of reliefs, one per line" },
    claimant: {
      type: "OBJECT",
      properties: {
        name: { type: "STRING" },
        phone: { type: "STRING" },
        email: { type: "STRING" },
        address: { type: "STRING" },
      },
      required: ["name", "phone", "email", "address"],
    },
    defendant: {
      type: "OBJECT",
      properties: {
        name: { type: "STRING" },
        phone: { type: "STRING" },
        address: { type: "STRING" },
      },
      required: ["name", "phone", "address"],
    },
    summary: { type: "STRING", description: "2-3 sentence plain-English summary of the dispute" },
    lowConfidenceFields: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "Field keys that were guessed, illegible, or ambiguous",
    },
    warnings: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "Short notes for the registrar, e.g. missing signatures, unclear dates, possible duplicate parties",
    },
  },
  required: [
    "nature", "caseType", "traditionalArea", "divisionTown", "title", "appealDecision",
    "reliefsSought", "claimant", "defendant", "summary", "lowConfidenceFields", "warnings",
  ],
};

function buildPrompt(knownAreas: string[]) {
  return `You are a meticulous registry clerk at the Volta Regional House of Chiefs (Ghana), Judicial Committee.
You read chieftaincy petitions, appeals against Traditional Council rulings, and related letters filed under the Chieftaincy Act, 2008 (Act 759).

Extract the details needed to register the case. Rules:
- "nature": APPEAL if the document appeals a Traditional Council decision, otherwise PETITION.
- "traditionalArea": prefer an exact match from this list when applicable: ${knownAreas.join(", ")}. Otherwise return the name as written.
- "title": format as "<Petitioner(s)> v. <Respondent(s)>", using "& N Ors" when there are several parties. Preserve stool titles (Togbe, Mama, Nana, Torgbui, etc.).
- "claimant" = petitioner / plaintiff / applicant / appellant who filed. "defendant" = respondent(s).
- "reliefsSought": list each relief on its own line, numbered "1.", "2.", ...
- "appealDecision": only for appeals — the lower council's decision being appealed; else "".
- Phone numbers: keep Ghana format (e.g. +233 24 123 4567). Do not invent contact details.
- Use "" for anything not present. NEVER fabricate names, numbers, or reliefs.
- List any guessed or hard-to-read field keys in "lowConfidenceFields" (e.g. "claimant.phone", "title").
- Add brief, practical "warnings" for the registrar if something looks incomplete or inconsistent.`;
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI is not configured. Add GEMINI_API_KEY to your .env file and restart the server." },
      { status: 503 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  }

  const file = form.get("file");
  const pastedText = (form.get("text") as string | null)?.trim() ?? "";
  let knownAreas: string[] = [];
  try {
    knownAreas = JSON.parse((form.get("areas") as string) || "[]");
  } catch {
    /* ignore */
  }

  const parts: Record<string, unknown>[] = [{ text: buildPrompt(knownAreas) }];

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File is larger than 15 MB. Please upload a smaller scan." }, { status: 413 });
    }
    const mime = file.type || "application/octet-stream";
    if (!SUPPORTED_MIME.includes(mime)) {
      return NextResponse.json(
        { error: "Unsupported file type. Upload a PDF, photo (JPG/PNG/WEBP/HEIC), or .txt file. For Word documents, save as PDF first." },
        { status: 415 }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    if (mime === "text/plain") {
      parts.push({ text: `DOCUMENT TEXT:\n${buffer.toString("utf8")}` });
    } else {
      parts.push({ inlineData: { mimeType: mime, data: buffer.toString("base64") } });
    }
  } else if (pastedText) {
    parts.push({ text: `DOCUMENT TEXT:\n${pastedText}` });
  } else {
    return NextResponse.json({ error: "Please upload a document or paste its text." }, { status: 400 });
  }

  try {
    const configuredModel = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
    const candidateModels = Array.from(new Set([
      configuredModel,
      "gemini-3.1-flash-lite",
      "gemini-3.5-flash",
      "gemini-flash-latest",
      "gemini-3.5-flash-lite",
      "gemini-3.8-flash",
    ]));

    let lastError: string | null = null;

    for (const targetModel of candidateModels) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(targetModel)}:generateContent?key=${encodeURIComponent(apiKey)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts }],
              generationConfig: {
                temperature: 0.1,
                responseMimeType: "application/json",
                responseSchema: RESPONSE_SCHEMA,
              },
            }),
          }
        );

        if (!res.ok) {
          const detail = await res.text();
          console.warn(`[AI case-intake] Model ${targetModel} returned ${res.status}:`, detail);
          // If overloaded or unavailable, try next candidate
          if (res.status === 503 || res.status === 429) {
            lastError = "The AI service is currently busy. Please try again in a few moments.";
            continue;
          }
          if (res.status === 400 || res.status === 403) {
            return NextResponse.json(
              { error: "The AI service rejected the request. Please verify your GEMINI_API_KEY in .env." },
              { status: 502 }
            );
          }
          lastError = "The AI service encountered an issue. Trying backup model...";
          continue;
        }

        const json = await res.json();
        const text: string | undefined = json?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
          return NextResponse.json(
            { error: "The AI could not read this document. Try a clearer scan or paste the text instead." },
            { status: 422 }
          );
        }

        const data = JSON.parse(text);
        return NextResponse.json({ data, model: targetModel });
      } catch (innerErr) {
        console.warn(`[AI case-intake] Model ${targetModel} network error:`, innerErr);
        continue;
      }
    }

    return NextResponse.json(
      { error: lastError || "All AI models are temporarily busy. You can still fill the form manually." },
      { status: 503 }
    );
  } catch (err) {
    console.error("[AI case-intake] failure", err);
    return NextResponse.json(
      { error: "Something went wrong while analysing the document. You can still fill the form manually." },
      { status: 500 }
    );
  }
}
