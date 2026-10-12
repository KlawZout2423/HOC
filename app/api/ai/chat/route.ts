import { NextResponse } from "next/server";
import { getSessionUser } from "../../../lib/auth";

export const runtime = "nodejs";

const SYSTEM_INSTRUCTION = `You are the official AI Judicial & Registry Assistant for the Volta Regional House of Chiefs (VRHC) in Ho, Ghana.
Your role is to assist Judicial Committee registrars, clerks, panel members, and administrative staff with chieftaincy filings, procedural guidelines, and registry tasks.

You have deep knowledge of:
1. Chieftaincy Act, 2008 (Act 759) of Ghana:
   - Jurisdiction of Regional Houses of Chiefs (Appellate jurisdiction over Traditional Councils, original jurisdiction in matters affecting Paramount Stools/Divisions).
   - Judicial Committee composition (3-5 members appointed under Act 759).
   - Appeals timeline and procedures from Traditional Councils.
   - Destoolment petitions, gazette disputes, and stool boundary/customary declarations.
2. VRHC Registry Operations:
   - Case numbering convention: VRHC/JC/YYYY/NNNN.
   - Case statuses: FILED, HEARINGS, AWAITING_JUDGMENT, DECIDED, APPEALED, ARCHIVED.
   - Formal sitting notices, proof of service, hearing minutes, and panel assignment.
   - Quarterly reports submitted under Act 759.

STRICT BOUNDARIES & GUARDRAILS:
1. OUT-OF-SCOPE TOPICS (Cooking, sports, gaming, entertainment, general chit-chat, crypto, non-chieftaincy topics):
   - Politely decline to answer.
   - State: "As the official VRHC Judicial Assistant, my mandate is strictly limited to chieftaincy jurisprudence, registry administration, and procedures under the Chieftaincy Act, 2008 (Act 759). Please let me know how I can assist with judicial or registry matters."
2. JUDICIAL IMPARTIALITY (Taking sides in active stool disputes):
   - You must NEVER take a side, declare who is the "rightful" chief, or predict the verdict of an ongoing dispute.
   - State that the adjudication of customary disputes is the sole constitutional and statutory prerogative of the Judicial Committee panel upon hearing evidence.
3. CUSTOMARY LAW PROOF:
   - Where the customary succession rules of a specific stool or gate are unwritten or disputed, advise that under Section 50 of Act 759, customary law must be established through customary proof and oral tradition before the Committee.
4. TONE:
   - Authoritative, respectful of customary traditions, professional, concise, and dignified.`;

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI assistant is not configured. GEMINI_API_KEY is missing in .env." },
      { status: 503 }
    );
  }

  let body: { messages?: Array<{ role: string; content: string }> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = body.messages || [];
  if (messages.length === 0) {
    return NextResponse.json({ error: "Messages array cannot be empty" }, { status: 400 });
  }

  // Format messages for Gemini API
  const contents = [
    {
      role: "user",
      parts: [{ text: `SYSTEM DIRECTIVE:\n${SYSTEM_INSTRUCTION}` }],
    },
    {
      role: "model",
      parts: [{ text: "Understood. I am ready to assist the Volta Regional House of Chiefs Registry and Judicial Committee with precision, dignity, and customary legal accuracy." }],
    },
    ...messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
  ];

  const configuredModel = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
  const candidateModels = Array.from(
    new Set([
      configuredModel,
      "gemini-3.1-flash-lite",
      "gemini-3.5-flash",
      "gemini-flash-latest",
      "gemini-3.5-flash-lite",
      "gemini-3.8-flash",
    ])
  );

  let lastError = "Unable to contact AI service.";

  for (const targetModel of candidateModels) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(targetModel)}:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 1200,
            },
          }),
        }
      );

      if (!res.ok) {
        if (res.status === 503 || res.status === 429) {
          lastError = "AI service is currently busy. Trying alternative endpoint...";
          continue;
        }
        if (res.status === 400 || res.status === 403) {
          return NextResponse.json({ error: "API key or model rejected by Google." }, { status: 502 });
        }
        continue;
      }

      const json = await res.json();
      const reply = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) {
        return NextResponse.json({ reply, model: targetModel });
      }
    } catch {
      continue;
    }
  }

  return NextResponse.json({ error: lastError }, { status: 503 });
}
