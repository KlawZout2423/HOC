"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AiIntakePanel, { type CaseIntakeResult } from "./AiIntakePanel";

type AiMark = "ok" | "uncertain";

const INITIAL_TRADITIONAL_AREAS = [
  "Aflao", "Agave", "Akpini (Kpando)", "Anlo", "Ave-Dakpa", "Ave-Havi",
  "Aveme", "Avenor", "Awate", "Battor", "Doffor", "Dzodze", "Fievie",
  "Fodome", "Gbledi", "Holuta", "Klikor", "Kpeve", "Mafi", "Sokpoe",
  "Somey", "Sovie", "Torgorme", "Weta", "Ziavi", "Ziope", "Ho Asogli",
  "Peki", "Abutia", "Kpetoe"
];

export default function CreateCasePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Traditional Areas state
  const [areaList, setAreaList] = useState<string[]>(INITIAL_TRADITIONAL_AREAS);
  const [traditionalArea, setTraditionalArea] = useState(INITIAL_TRADITIONAL_AREAS[0]);
  const [isCustomArea, setIsCustomArea] = useState(false);
  const [customAreaInput, setCustomAreaInput] = useState("");

  // Step 1 — Case Nature & Jurisdiction
  const [nature, setNature] = useState("PETITION");
  const [divisionTown, setDivisionTown] = useState("");
  const [title, setTitle] = useState("");
  const [appealDecision, setAppealDecision] = useState("");

  const handleAddNewArea = () => {
    if (customAreaInput.trim()) {
      const formatted = customAreaInput.trim();
      if (!areaList.includes(formatted)) {
        setAreaList((prev) => [...prev, formatted].sort());
      }
      setTraditionalArea(formatted);
      setCustomAreaInput("");
      setIsCustomArea(false);
    }
  };

  // Step 2 — Reliefs & Litigants
  const [claimantName, setClaimantName] = useState("");
  const [claimantPhone, setClaimantPhone] = useState("");
  const [claimantEmail, setClaimantEmail] = useState("");
  const [claimantAddress, setClaimantAddress] = useState("");
  const [defendantName, setDefendantName] = useState("");
  const [defendantPhone, setDefendantPhone] = useState("");
  const [defendantAddress, setDefendantAddress] = useState("");
  const [reliefsSought, setReliefsSought] = useState("");
  const [remarks, setRemarks] = useState("Date yet to be fixed");
  const [panel, setPanel] = useState("Judicial Committee Panel A");

  const [generatedCaseNumber] = useState(() => {
    const year = new Date().getFullYear();
    const seq = String(Math.floor(Math.random() * 9000) + 1000).padStart(4, "0");
    return `VRHC/JC/${year}/${seq}`;
  });

  // AI Smart Intake state — which fields were pre-filled and how confident the AI was
  const [aiFields, setAiFields] = useState<Record<string, AiMark>>({});
  const [aiSource, setAiSource] = useState<string | null>(null);

  const ai = (key: string) =>
    `input${aiFields[key] === "uncertain" ? " ai-uncertain" : aiFields[key] ? " ai-filled" : ""}`;

  const aiTag = (k: string) =>
    aiFields[k] ? (
      <span className={`ai-badge${aiFields[k] === "uncertain" ? " uncertain" : ""}`} title={aiFields[k] === "uncertain" ? "AI was unsure — please verify" : "Pre-filled by AI"}>
        {aiFields[k] === "uncertain" ? "⚠ Check" : "✨ AI"}
      </span>
    ) : null;

  const handleExtracted = (d: CaseIntakeResult, source: string) => {
    const low = new Set(d.lowConfidenceFields ?? []);
    const marks: Record<string, AiMark> = {};
    const apply = (key: string, value: string | undefined, setter: (v: string) => void) => {
      const v = (value ?? "").trim();
      if (!v) return;
      setter(v);
      marks[key] = low.has(key) ? "uncertain" : "ok";
    };

    if (d.nature === "PETITION" || d.nature === "APPEAL") {
      setNature(d.nature);
      marks.nature = low.has("nature") ? "uncertain" : "ok";
    }
    apply("title", d.title, setTitle);
    apply("divisionTown", d.divisionTown, setDivisionTown);
    apply("appealDecision", d.appealDecision, setAppealDecision);
    apply("reliefsSought", d.reliefsSought, setReliefsSought);
    apply("claimant.name", d.claimant?.name, setClaimantName);
    apply("claimant.phone", d.claimant?.phone, setClaimantPhone);
    apply("claimant.email", d.claimant?.email, setClaimantEmail);
    apply("claimant.address", d.claimant?.address, setClaimantAddress);
    apply("defendant.name", d.defendant?.name, setDefendantName);
    apply("defendant.phone", d.defendant?.phone, setDefendantPhone);
    apply("defendant.address", d.defendant?.address, setDefendantAddress);

    // Match the Traditional Area against the known list; add it if it's new
    const area = (d.traditionalArea ?? "").replace(/\s+traditional\s+(area|council)\s*$/i, "").trim();
    if (area) {
      const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");
      const exact = areaList.find((a) => norm(a) === norm(area));
      const prefix = areaList.filter((a) => norm(a).startsWith(norm(area)));
      const match = exact ?? (prefix.length === 1 ? prefix[0] : undefined);
      if (match) {
        setTraditionalArea(match);
        marks.traditionalArea = low.has("traditionalArea") ? "uncertain" : "ok";
      } else {
        setAreaList((prev) => [...prev, area].sort());
        setTraditionalArea(area);
        marks.traditionalArea = "uncertain"; // new area — registrar should confirm
      }
      setIsCustomArea(false);
    }

    setAiFields(marks);
    setAiSource(source);
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => router.push("/cases"), 1800);
    }, 1100);
  };

  const step1Valid = nature && traditionalArea && title;
  const step2Valid = claimantName && defendantName && reliefsSought;

  const stepLabel = [
    { n: 1, label: "Jurisdiction & Nature" },
    { n: 2, label: "Reliefs & Litigants" },
    { n: 3, label: "Review & Register" },
  ];

  return (
    <main>
      {/* Back link */}
      <Link href="/cases" className="back-link">
        <span style={{ fontSize: "16px" }}>←</span> Back to Cases List
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 className="page-title">Register Chieftaincy Case</h1>
        <p className="page-subtitle">
          File a new Chieftaincy Petition or Appeal into the VRHC Judicial Committee docket under Act 759.
        </p>
      </div>

      <div className="form-view-container">
        {/* AI Smart Case Intake */}
        {!isSuccess && step === 1 && (
          <AiIntakePanel knownAreas={areaList} onExtracted={handleExtracted} />
        )}

        {/* Progress Tracker */}
        <div className="card" style={{ marginBottom: "28px", display: "flex", gap: "12px", justifyContent: "space-between", alignItems: "center", background: "#f8fafc", padding: "16px 24px" }}>
          {stepLabel.map(({ n, label }) => (
            <div key={n} style={{ display: "flex", gap: "10px", alignItems: "center", opacity: step >= n ? 1 : 0.45 }}>
              <span style={{
                width: "28px", height: "28px", borderRadius: "50%",
                background: step > n ? "var(--success)" : step === n ? "var(--primary)" : "#cbd5e1",
                color: step >= n ? "white" : "#475569",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, flexShrink: 0
              }}>
                {step > n ? "✓" : n}
              </span>
              <span style={{ fontWeight: 600, color: step >= n ? "var(--foreground)" : "inherit", fontSize: "14px" }}>
                {label}
              </span>
              {n < 3 && <span style={{ flex: 1, height: "1px", background: step > n ? "var(--success)" : "var(--border)", minWidth: "24px" }} />}
            </div>
          ))}
        </div>

        {/* Main Form Card */}
        <div className="card">
          {isSuccess ? (
            <div style={{ textAlign: "center", padding: "48px 20px" }}>
              <div style={{ fontSize: "52px", marginBottom: "16px" }}>📁</div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--success)", margin: "0 0 8px" }}>
                Case Registered Successfully
              </h3>
              <p style={{ color: "var(--muted)", margin: "0 0 16px", maxWidth: "440px", marginInline: "auto" }}>
                Case <strong style={{ color: "var(--primary)" }}>{generatedCaseNumber}</strong> has been registered
                and logged in the Q1 judicial docket.
              </p>
              <div className="status-badge status-done" style={{ display: "inline-flex" }}>
                ✓ Status: FILED
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form">
              {/* STEP 1: Case Nature & Jurisdiction */}
              {step === 1 && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <div>
                    <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>
                      Step 1: Jurisdiction & Nature of Case
                    </h3>
                    <p style={{ margin: "0 0 20px", fontSize: "15px", color: "var(--muted)" }}>
                      Specify whether this suit is a fresh Petition or an Appeal against a Traditional Council decision.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="nature" className="form-label">
                      Nature of Case <span style={{ color: "var(--danger)" }}>*</span>
                      {aiTag("nature")}
                    </label>
                    <select
                      id="nature"
                      name="nature"
                      className={ai("nature")}
                      required
                      value={nature}
                      onChange={(e) => setNature(e.target.value)}
                    >
                      <option value="PETITION">PETITION (Fresh Dispute / Stool Petition)</option>
                      <option value="APPEAL">APPEAL (Appeal against Traditional Council Ruling)</option>
                    </select>
                  </div>

                  {nature === "APPEAL" && (
                    <div>
                      <label htmlFor="appealDecision" className="form-label">
                        Decision of Traditional Council Being Appealed
                        {aiTag("appealDecision")}
                      </label>
                      <textarea
                        id="appealDecision"
                        name="appealDecision"
                        rows={3}
                        className={ai("appealDecision")}
                        placeholder="State the decision or ruling of the lower Traditional Council being appealed..."
                        value={appealDecision}
                        onChange={(e) => setAppealDecision(e.target.value)}
                      />
                    </div>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                        <label htmlFor="traditionalArea" className="form-label" style={{ margin: 0 }}>
                          Traditional Area <span style={{ color: "var(--danger)" }}>*</span>
                          {aiTag("traditionalArea")}
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsCustomArea(!isCustomArea)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--primary)",
                            fontWeight: 700,
                            fontSize: "12px",
                            cursor: "pointer",
                            padding: 0
                          }}
                        >
                          {isCustomArea ? "← Select Existing" : "＋ Add New Area"}
                        </button>
                      </div>

                      {isCustomArea ? (
                        <div style={{ display: "flex", gap: "8px" }}>
                          <input
                            id="customAreaInput"
                            name="customAreaInput"
                            type="text"
                            autoFocus
                            className="input"
                            placeholder="Enter new Traditional Area name..."
                            value={customAreaInput}
                            onChange={(e) => setCustomAreaInput(e.target.value)}
                          />
                          <button
                            type="button"
                            className="button"
                            style={{ fontSize: "12px", padding: "6px 12px", whiteSpace: "nowrap" }}
                            onClick={handleAddNewArea}
                          >
                            Add
                          </button>
                        </div>
                      ) : (
                        <select
                          id="traditionalArea"
                          name="traditionalArea"
                          className={ai("traditionalArea")}
                          required
                          value={traditionalArea}
                          onChange={(e) => {
                            if (e.target.value === "__NEW__") {
                              setIsCustomArea(true);
                            } else {
                              setTraditionalArea(e.target.value);
                            }
                          }}
                        >
                          {areaList.map((area) => (
                            <option key={area} value={area}>
                              {area} Traditional Area
                            </option>
                          ))}
                          <option value="__NEW__">＋ Add New Custom Area...</option>
                        </select>
                      )}
                    </div>
                    <div>
                      <label htmlFor="divisionTown" className="form-label">
                        Division & Town
                        {aiTag("divisionTown")}
                      </label>
                      <input
                        id="divisionTown"
                        name="divisionTown"
                        type="text"
                        className={ai("divisionTown")}
                        placeholder="e.g. Kpando, Lashibi, Adekpuigakope"
                        value={divisionTown}
                        onChange={(e) => setDivisionTown(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="title" className="form-label">
                      Title of Case / Suit Heading <span style={{ color: "var(--danger)" }}>*</span>
                      {aiTag("title")}
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      required
                      className={ai("title")}
                      placeholder="e.g. John H.M. Nyonator & 2 Ors v. Togbe Adza Kwadzo III"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
                    <Link href="/cases" className="button secondary-button" style={{ padding: "10px 24px" }}>
                      Cancel
                    </Link>
                    <button
                      type="button"
                      className="button"
                      disabled={!step1Valid}
                      onClick={() => setStep(2)}
                      style={{ padding: "10px 28px", opacity: !step1Valid ? 0.6 : 1 }}
                    >
                      Next: Reliefs & Litigants →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Reliefs & Litigants */}
              {step === 2 && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <div>
                    <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>
                      Step 2: Reliefs Sought & Litigant Parties
                    </h3>
                    <p style={{ margin: "0 0 20px", fontSize: "15px", color: "var(--muted)" }}>
                      Record the reliefs claimed by the Petitioner/Appellant and specify presiding panel assignments.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="reliefsSought" className="form-label">
                      Reliefs Sought by Petitioner / Appellant <span style={{ color: "var(--danger)" }}>*</span>
                      {aiTag("reliefsSought")}
                    </label>
                    <textarea
                      id="reliefsSought"
                      name="reliefsSought"
                      rows={4}
                      required
                      className={ai("reliefsSought")}
                      placeholder="e.g. 1. A declaration that the letter written by respondent to delete name of chief is void. 2. Perpetual injunction..."
                      value={reliefsSought}
                      onChange={(e) => setReliefsSought(e.target.value)}
                    />
                  </div>

                  {/* Petitioner */}
                  <div style={{ background: "var(--primary-light)", border: "1px solid var(--primary-mid)", borderRadius: "var(--radius)", padding: "18px", display: "grid", gap: "12px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase" }}>
                      🟦 Petitioner(s) / Plaintiff(s) / Applicant(s)
                      {aiTag("claimant.name")}
                    </span>
                    <input
                      id="claimantName"
                      name="claimantName"
                      type="text"
                      required
                      className={ai("claimant.name")}
                      placeholder="Full Name(s) / Title(s) of Petitioner(s)"
                      value={claimantName}
                      onChange={(e) => setClaimantName(e.target.value)}
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                      <div>
                        <label htmlFor="claimantPhone" className="form-label" style={{ fontSize: "11px" }}>
                          Phone Number (Numeric)
                        </label>
                        <input
                          id="claimantPhone"
                          name="claimantPhone"
                          type="tel"
                          inputMode="tel"
                          pattern="[0-9+ -]*"
                          className={ai("claimant.phone")}
                          placeholder="e.g. +233 24 123 4567"
                          value={claimantPhone}
                          onChange={(e) => setClaimantPhone(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="claimantEmail" className="form-label" style={{ fontSize: "11px" }}>
                          Email Address
                        </label>
                        <input
                          id="claimantEmail"
                          name="claimantEmail"
                          type="email"
                          inputMode="email"
                          className={ai("claimant.email")}
                          placeholder="e.g. petitioner@council.gh"
                          value={claimantEmail}
                          onChange={(e) => setClaimantEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="claimantAddress" className="form-label" style={{ fontSize: "11px" }}>
                          Address / Town
                        </label>
                        <input
                          id="claimantAddress"
                          name="claimantAddress"
                          type="text"
                          className={ai("claimant.address")}
                          placeholder="e.g. P.O. Box 42, Ziavi"
                          value={claimantAddress}
                          onChange={(e) => setClaimantAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Respondent */}
                  <div style={{ background: "var(--warning-light)", border: "1px solid var(--warning-mid)", borderRadius: "var(--radius)", padding: "18px", display: "grid", gap: "12px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--warning)", textTransform: "uppercase" }}>
                      🟠 Respondent(s) / Defendant(s) / Appellant(s)
                      {aiTag("defendant.name")}
                    </span>
                    <input
                      id="defendantName"
                      name="defendantName"
                      type="text"
                      required
                      className={ai("defendant.name")}
                      placeholder="Full Name(s) / Title(s) of Respondent(s)"
                      value={defendantName}
                      onChange={(e) => setDefendantName(e.target.value)}
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label htmlFor="defendantPhone" className="form-label" style={{ fontSize: "11px" }}>
                          Respondent Phone Number
                        </label>
                        <input
                          id="defendantPhone"
                          name="defendantPhone"
                          type="tel"
                          inputMode="tel"
                          pattern="[0-9+ -]*"
                          className={ai("defendant.phone")}
                          placeholder="e.g. +233 20 987 6543"
                          value={defendantPhone}
                          onChange={(e) => setDefendantPhone(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="defendantAddress" className="form-label" style={{ fontSize: "11px" }}>
                          Respondent Address / Advocate
                        </label>
                        <input
                          id="defendantAddress"
                          name="defendantAddress"
                          type="text"
                          className={ai("defendant.address")}
                          placeholder="e.g. Chambers of Legal Counsel"
                          value={defendantAddress}
                          onChange={(e) => setDefendantAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label htmlFor="panel" className="form-label">Assign Judicial Committee Panel</label>
                      <select
                        id="panel"
                        name="panel"
                        className="input"
                        value={panel}
                        onChange={(e) => setPanel(e.target.value)}
                      >
                        <option value="Judicial Committee Panel A">Judicial Committee Panel A (Togbe Hodo IV Presiding)</option>
                        <option value="Judicial Committee Panel B">Judicial Committee Panel B (Togbe Worde IV Presiding)</option>
                        <option value="Special Arbitration Panel">Special Stool Arbitration Panel</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="remarks" className="form-label">Registry Remarks / Sitting Note</label>
                      <input
                        id="remarks"
                        name="remarks"
                        type="text"
                        className="input"
                        placeholder="e.g. Date yet to be fixed / Pending notice service"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
                    <button type="button" className="button secondary-button" onClick={() => setStep(1)} style={{ padding: "10px 24px" }}>
                      ← Back
                    </button>
                    <button
                      type="button"
                      className="button"
                      disabled={!step2Valid}
                      onClick={() => setStep(3)}
                      style={{ padding: "10px 28px", opacity: !step2Valid ? 0.6 : 1 }}
                    >
                      Next: Review & Register →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Review & Submit */}
              {step === 3 && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <div>
                    <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>
                      Step 3: Review & Confirm Registration
                    </h3>
                    <p style={{ margin: "0 0 20px", fontSize: "15px", color: "var(--muted)" }}>
                      Confirm filing details before committing to the VRHC Q1 Judicial Committee Docket.
                    </p>
                  </div>

                  <div style={{ background: "linear-gradient(135deg, var(--primary) 0%, #172554 100%)", color: "white", borderRadius: "var(--radius)", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: "12px", fontWeight: 700, opacity: 0.7, textTransform: "uppercase" }}>Assigned Case Number</span>
                      <div style={{ fontSize: "24px", fontWeight: 800, marginTop: "4px" }}>{generatedCaseNumber}</div>
                    </div>
                    <div style={{ fontSize: "36px", opacity: 0.4 }}>📁</div>
                  </div>

                  <div style={{ background: "#f8fafc", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
                    {[
                      { label: "Suit Number", value: generatedCaseNumber },
                      { label: "Nature of Case", value: nature },
                      { label: "Traditional Area / Division", value: `${traditionalArea} (${divisionTown || "N/A"})` },
                      { label: "Title of Case", value: title },
                      { label: "Petitioner / Applicant", value: `${claimantName} ${claimantPhone ? `[Phone: ${claimantPhone}]` : ""} ${claimantEmail ? `[Email: ${claimantEmail}]` : ""}` },
                      { label: "Respondent / Appellant", value: `${defendantName} ${defendantPhone ? `[Phone: ${defendantPhone}]` : ""}` },
                      { label: "Reliefs Sought", value: reliefsSought },
                      { label: "Appeal Decision (If Appeal)", value: nature === "APPEAL" ? appealDecision || "N/A" : "N/A (Fresh Petition)" },
                      { label: "Registry Remarks", value: remarks || "Date yet to be fixed" },
                      { label: "Source", value: aiSource ? `AI pre-filled from "${aiSource}" — reviewed by registrar` : "Manual entry" },
                      { label: "Status on Filing", value: "FILED" },
                    ].map(({ label, value }, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px", borderBottom: i < 6 ? "1px solid var(--border)" : "none", gap: "20px" }}>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--muted)", minWidth: "140px" }}>{label}</span>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", textAlign: "right" }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
                    <button type="button" className="button secondary-button" onClick={() => setStep(2)} style={{ padding: "10px 24px" }}>
                      ← Back
                    </button>
                    <button type="submit" className="button" disabled={isSubmitting} style={{ padding: "10px 32px" }}>
                      {isSubmitting ? "Registering Case..." : "Confirm & Register Case"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
