"use client";

import { useRef, useState } from "react";

export interface CaseIntakeResult {
  nature: "PETITION" | "APPEAL";
  caseType: string;
  traditionalArea: string;
  divisionTown: string;
  title: string;
  appealDecision: string;
  reliefsSought: string;
  claimant: { name: string; phone: string; email: string; address: string };
  defendant: { name: string; phone: string; address: string };
  summary: string;
  lowConfidenceFields: string[];
  warnings: string[];
}

interface Props {
  knownAreas: string[];
  onExtracted: (data: CaseIntakeResult, sourceName: string) => void;
}

type Mode = "upload" | "paste";
type Status = "idle" | "analysing" | "done" | "error";

const ACCEPT = ".pdf,.png,.jpg,.jpeg,.webp,.heic,.heif,.txt";

const STAGES = [
  "Reading the document…",
  "Identifying parties and stool titles…",
  "Extracting reliefs sought…",
  "Preparing the registration form…",
];

export default function AiIntakePanel({ knownAreas, onExtracted }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<Mode>("upload");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [pasted, setPasted] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [stage, setStage] = useState(0);
  const [result, setResult] = useState<CaseIntakeResult | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const pickFile = (f: File | null | undefined) => {
    if (!f) return;
    setFile(f);
    setError("");
    setStatus("idle");
  };

  const analyse = async () => {
    if (mode === "upload" && !file) return;
    if (mode === "paste" && pasted.trim().length < 40) {
      setError("Please paste a bit more of the document so the assistant has enough to work with.");
      return;
    }

    setStatus("analysing");
    setError("");
    setStage(0);
    const timer = setInterval(() => setStage((s) => Math.min(s + 1, STAGES.length - 1)), 2200);

    try {
      const body = new FormData();
      if (mode === "upload" && file) body.append("file", file);
      else body.append("text", pasted);
      body.append("areas", JSON.stringify(knownAreas));

      const res = await fetch("/api/ai/case-intake", { method: "POST", body });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Analysis failed.");

      const data = json.data as CaseIntakeResult;
      setResult(data);
      setStatus("done");
      onExtracted(data, mode === "upload" && file ? file.name : "Pasted text");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Analysis failed.");
    } finally {
      clearInterval(timer);
    }
  };

  const reset = () => {
    setFile(null);
    setPasted("");
    setResult(null);
    setStatus("idle");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const fmtSize = (b: number) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(b / 1024)} KB`);

  return (
    <section className="ai-intake" aria-labelledby="ai-intake-title">
      <div className="ai-intake-header">
        <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
          <span className="ai-intake-icon" aria-hidden>✨</span>
          <div>
            <h2 id="ai-intake-title" className="ai-intake-title">
              Smart Case Intake <span className="ai-pill">AI Assisted</span>
            </h2>
            <p className="ai-intake-sub">
              Upload the petition or appeal letter and the assistant will pre-fill the form for you.
              You stay in control — every field can be reviewed and edited before registration.
            </p>
          </div>
        </div>
        <button
          id="ai-intake-toggle"
          type="button"
          className="ai-link-btn"
          onClick={() => setCollapsed((c) => !c)}
          aria-expanded={!collapsed}
        >
          {collapsed ? "Show ▾" : "Hide ▴"}
        </button>
      </div>

      {!collapsed && (
        <div className="ai-intake-body">
          {status === "done" && result ? (
            <div className="ai-result fade-in">
              <div className="ai-result-head">
                <span className="status-badge status-done">✓ Form pre-filled</span>
                <span style={{ fontSize: "13px", color: "var(--muted)" }}>
                  from <strong>{file?.name ?? "pasted text"}</strong>
                </span>
              </div>

              {result.summary && (
                <div className="ai-summary">
                  <span className="ai-summary-label">Case summary</span>
                  <p>{result.summary}</p>
                </div>
              )}

              {(result.warnings.length > 0 || result.lowConfidenceFields.length > 0) && (
                <div className="ai-warnings" role="note">
                  <strong>⚠ Please double-check before registering</strong>
                  <ul>
                    {result.warnings.map((w, i) => (
                      <li key={`w${i}`}>{w}</li>
                    ))}
                    {result.lowConfidenceFields.length > 0 && (
                      <li>
                        Uncertain fields (highlighted in amber):{" "}
                        <em>{result.lowConfidenceFields.join(", ")}</em>
                      </li>
                    )}
                  </ul>
                </div>
              )}

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button id="ai-intake-another" type="button" className="button secondary-button" onClick={reset}>
                  Analyse another document
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="ai-tabs" role="tablist">
                <button
                  id="ai-tab-upload"
                  type="button"
                  role="tab"
                  aria-selected={mode === "upload"}
                  className={`ai-tab ${mode === "upload" ? "active" : ""}`}
                  onClick={() => setMode("upload")}
                >
                  📄 Upload scan / PDF
                </button>
                <button
                  id="ai-tab-paste"
                  type="button"
                  role="tab"
                  aria-selected={mode === "paste"}
                  className={`ai-tab ${mode === "paste" ? "active" : ""}`}
                  onClick={() => setMode("paste")}
                >
                  📝 Paste text
                </button>
              </div>

              {mode === "upload" ? (
                <div
                  id="ai-dropzone"
                  className={`ai-dropzone ${dragOver ? "drag" : ""} ${file ? "has-file" : ""}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    pickFile(e.dataTransfer.files?.[0]);
                  }}
                  onClick={() => status !== "analysing" && inputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
                >
                  <input
                    ref={inputRef}
                    id="ai-file-input"
                    type="file"
                    accept={ACCEPT}
                    hidden
                    onChange={(e) => pickFile(e.target.files?.[0])}
                  />
                  {file ? (
                    <div className="ai-file-chip">
                      <span style={{ fontSize: "22px" }}>{file.type.startsWith("image/") ? "🖼️" : "📄"}</span>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontWeight: 600 }}>{file.name}</div>
                        <div style={{ fontSize: "12px", color: "var(--muted)" }}>{fmtSize(file.size)} · click to change</div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: "28px", marginBottom: "6px" }}>⬆</div>
                      <div style={{ fontWeight: 600 }}>Drag & drop the petition here, or click to browse</div>
                      <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "4px" }}>
                        PDF, phone photo or scan (JPG, PNG, HEIC) · up to 15 MB
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <textarea
                  id="ai-paste-input"
                  className="input"
                  rows={6}
                  placeholder="Paste the full text of the petition, appeal notice or letter here…"
                  value={pasted}
                  onChange={(e) => setPasted(e.target.value)}
                  disabled={status === "analysing"}
                />
              )}

              {error && (
                <div className="ai-error fade-in" role="alert">
                  {error}
                </div>
              )}

              <div className="ai-actions">
                {status === "analysing" ? (
                  <div className="ai-progress" aria-live="polite">
                    <span className="ai-spinner" aria-hidden />
                    <span>{STAGES[stage]}</span>
                  </div>
                ) : (
                  <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                    🔒 Documents are only used to pre-fill this form.
                  </span>
                )}
                <button
                  id="ai-analyse-btn"
                  type="button"
                  className="button ai-analyse-btn"
                  disabled={status === "analysing" || (mode === "upload" ? !file : !pasted.trim())}
                  onClick={analyse}
                >
                  {status === "analysing" ? "Analysing…" : "✨ Analyse & Pre-fill Form"}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}
