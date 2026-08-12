"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateCasePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Step 1 — Case Information
  const [caseType, setCaseType] = useState("");
  const [traditionalArea, setTraditionalArea] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Step 2 — Parties Details
  const [claimantName, setClaimantName] = useState("");
  const [claimantAddress, setClaimantAddress] = useState("");
  const [defendantName, setDefendantName] = useState("");
  const [defendantAddress, setDefendantAddress] = useState("");
  const [panel, setPanel] = useState("Panel A");

  const [generatedCaseNumber] = useState(() => {
    const year = new Date().getFullYear();
    const seq = String(Math.floor(Math.random() * 9000) + 1000).padStart(4, "0");
    return `VRHC-JC-${year}-${seq}`;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => router.push("/cases"), 1800);
    }, 1100);
  };

  const step1Valid = caseType && traditionalArea && title;
  const step2Valid = claimantName && defendantName;

  const stepLabel = [
    { n: 1, label: "Case Information" },
    { n: 2, label: "Parties Details" },
    { n: 3, label: "Review & File" },
  ];

  return (
    <main>
      {/* Back link */}
      <Link href="/cases" className="back-link">
        <span style={{ fontSize: "16px" }}>←</span> Back to Cases List
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 className="page-title">Register New Case</h1>
        <p className="page-subtitle">
          File a new chieftaincy dispute petition, stool contest, or council appeal into the official judicial record.
        </p>
      </div>

      <div className="form-view-container">
        {/* Progress Tracker */}
        <div
          className="card"
          style={{
            marginBottom: "28px",
            display: "flex",
            gap: "12px",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#f8fafc",
            padding: "16px 24px",
          }}
        >
          {stepLabel.map(({ n, label }) => (
            <div
              key={n}
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                opacity: step >= n ? 1 : 0.45,
                transition: "opacity 0.3s ease",
              }}
            >
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: step > n ? "var(--success)" : step === n ? "var(--primary)" : "#cbd5e1",
                  color: step >= n ? "white" : "#475569",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: 700,
                  flexShrink: 0,
                  transition: "background 0.3s ease",
                }}
              >
                {step > n ? "✓" : n}
              </span>
              <span style={{ fontWeight: 600, color: step >= n ? "var(--foreground)" : "inherit", fontSize: "14px" }}>
                {label}
              </span>
              {n < 3 && (
                <span
                  style={{
                    flex: 1,
                    height: "1px",
                    background: step > n ? "var(--success)" : "var(--border)",
                    minWidth: "24px",
                    transition: "background 0.3s ease",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Main Form Card */}
        <div className="card">
          {isSuccess ? (
            <div style={{ textAlign: "center", padding: "48px 20px" }}>
              <div style={{ fontSize: "52px", marginBottom: "16px" }}>📁</div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--success)", margin: "0 0 8px" }}>
                Case Filed Successfully
              </h3>
              <p style={{ color: "var(--muted)", margin: "0 0 16px", maxWidth: "440px", marginInline: "auto" }}>
                Case{" "}
                <strong style={{ color: "var(--primary)" }}>{generatedCaseNumber}</strong> has been registered
                and is now active in the judicial records.
              </p>
              <div className="status-badge status-done" style={{ display: "inline-flex" }}>
                ✓ Status: FILED
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form">
              {/* ── STEP 1: Case Information ── */}
              {step === 1 && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <div>
                    <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>
                      Step 1: Basic Case Specifications
                    </h3>
                    <p style={{ margin: "0 0 20px", fontSize: "15px", color: "var(--muted)" }}>
                      Provide the core classification details for this chieftaincy petition.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="caseType" className="form-label">
                      Dispute Type <span style={{ color: "var(--danger)" }}>*</span>
                    </label>
                    <select
                      id="caseType"
                      name="caseType"
                      className="input"
                      required
                      value={caseType}
                      onChange={(e) => setCaseType(e.target.value)}
                    >
                      <option value="">— Choose Classification —</option>
                      <option value="STOOL_DISPUTE">Stool Dispute (Succession / Enstoolment)</option>
                      <option value="LAND_DISPUTE">Traditional Boundary Land Dispute</option>
                      <option value="GAZETTE_CHALLENGE">Gazette Registry Challenge</option>
                    </select>
                    <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "4px" }}>
                      Select the primary legal nature of this petition.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="traditionalArea" className="form-label">
                      Traditional Area Jurisdiction <span style={{ color: "var(--danger)" }}>*</span>
                    </label>
                    <select
                      id="traditionalArea"
                      name="traditionalArea"
                      className="input"
                      required
                      value={traditionalArea}
                      onChange={(e) => setTraditionalArea(e.target.value)}
                    >
                      <option value="">— Choose Paramountcy Area —</option>
                      <option value="Asogli">Asogli Traditional Area (Ho Municipal)</option>
                      <option value="Awudome">Awudome Traditional Area</option>
                      <option value="Anfoega">Anfoega Traditional Area</option>
                      <option value="Gbi">Gbi Traditional Area (Hohoe)</option>
                      <option value="Mafi">Mafi Traditional Area</option>
                      <option value="Kpando">Kpando Traditional Area</option>
                      <option value="Buem">Buem Traditional Area</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="title" className="form-label">
                      Case Title / Suit Heading <span style={{ color: "var(--danger)" }}>*</span>
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      required
                      className="input"
                      placeholder="e.g. Togbe Kobla II v. Council of Kingmakers"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="form-label">
                      Petition Summary / Details
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      className="input"
                      placeholder="Briefly summarize the nature of the stool contest, boundary dispute, or gazette challenge..."
                      style={{ resize: "vertical" }}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "12px",
                      borderTop: "1px solid var(--border)",
                      paddingTop: "20px",
                      marginTop: "8px",
                    }}
                  >
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
                      Next: Litigant Parties →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 2: Parties Details ── */}
              {step === 2 && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <div>
                    <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>
                      Step 2: Litigant Parties & Judicial Panel
                    </h3>
                    <p style={{ margin: "0 0 20px", fontSize: "15px", color: "var(--muted)" }}>
                      Register the claimant and respondent, and assign a presiding judicial committee.
                    </p>
                  </div>

                  {/* Claimant */}
                  <div
                    style={{
                      background: "var(--primary-light)",
                      border: "1px solid var(--primary-mid)",
                      borderRadius: "var(--radius)",
                      padding: "20px",
                      display: "grid",
                      gap: "16px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "var(--primary)",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      🟦 Petitioner / Claimant
                    </span>
                    <div>
                      <label htmlFor="claimantName" className="form-label">
                        Full Name / Title <span style={{ color: "var(--danger)" }}>*</span>
                      </label>
                      <input
                        id="claimantName"
                        name="claimantName"
                        type="text"
                        required
                        className="input"
                        placeholder="e.g. Togbe Afede XIV & Stool Elders"
                        value={claimantName}
                        onChange={(e) => setClaimantName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="claimantAddress" className="form-label">
                        Address / Stool Palace
                      </label>
                      <input
                        id="claimantAddress"
                        name="claimantAddress"
                        type="text"
                        className="input"
                        placeholder="e.g. Asogli Stool Palace, Ho West District"
                        value={claimantAddress}
                        onChange={(e) => setClaimantAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Defendant */}
                  <div
                    style={{
                      background: "var(--warning-light)",
                      border: "1px solid var(--warning-mid)",
                      borderRadius: "var(--radius)",
                      padding: "20px",
                      display: "grid",
                      gap: "16px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "var(--warning)",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      🟠 Respondent / Defendant
                    </span>
                    <div>
                      <label htmlFor="defendantName" className="form-label">
                        Full Name / Title <span style={{ color: "var(--danger)" }}>*</span>
                      </label>
                      <input
                        id="defendantName"
                        name="defendantName"
                        type="text"
                        required
                        className="input"
                        placeholder="e.g. Paramount Stool Claimant & Kingmakers Council"
                        value={defendantName}
                        onChange={(e) => setDefendantName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="defendantAddress" className="form-label">
                        Address / Secretariat
                      </label>
                      <input
                        id="defendantAddress"
                        name="defendantAddress"
                        type="text"
                        className="input"
                        placeholder="e.g. Paramount Secretariat, Ho"
                        value={defendantAddress}
                        onChange={(e) => setDefendantAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Panel Assignment */}
                  <div>
                    <label htmlFor="panel" className="form-label">
                      Assign Presiding Judicial Panel
                    </label>
                    <select
                      id="panel"
                      name="panel"
                      className="input"
                      value={panel}
                      onChange={(e) => setPanel(e.target.value)}
                    >
                      <option value="Panel A">Judicial Committee Panel A (Togbe Hodo IV Presiding)</option>
                      <option value="Panel B">Judicial Committee Panel B (Togbe Worde IV Presiding)</option>
                      <option value="Panel C">Special Stool Boundary Arbitration Panel</option>
                    </select>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "12px",
                      borderTop: "1px solid var(--border)",
                      paddingTop: "20px",
                      marginTop: "8px",
                    }}
                  >
                    <button
                      type="button"
                      className="button secondary-button"
                      onClick={() => setStep(1)}
                      style={{ padding: "10px 24px" }}
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      className="button"
                      disabled={!step2Valid}
                      onClick={() => setStep(3)}
                      style={{ padding: "10px 28px", opacity: !step2Valid ? 0.6 : 1 }}
                    >
                      Next: Review & File →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Review & Submit ── */}
              {step === 3 && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <div>
                    <h3 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>
                      Step 3: Review & Confirm Filing
                    </h3>
                    <p style={{ margin: "0 0 20px", fontSize: "15px", color: "var(--muted)" }}>
                      Verify the case details below before submitting to the official judicial record.
                    </p>
                  </div>

                  {/* Generated Case Number Banner */}
                  <div
                    style={{
                      background: "linear-gradient(135deg, var(--primary) 0%, #172554 100%)",
                      color: "white",
                      borderRadius: "var(--radius)",
                      padding: "20px 24px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "12px", fontWeight: 700, opacity: 0.7, textTransform: "uppercase", letterSpacing: "1px" }}>
                        Assigned Case Number
                      </span>
                      <div style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "1px", marginTop: "4px" }}>
                        {generatedCaseNumber}
                      </div>
                    </div>
                    <div style={{ fontSize: "36px", opacity: 0.4 }}>📁</div>
                  </div>

                  {/* Summary */}
                  <div
                    style={{
                      background: "#f8fafc",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      overflow: "hidden",
                    }}
                  >
                    {[
                      { label: "Dispute Type", value: caseType.replace("_", " ") },
                      { label: "Traditional Area", value: traditionalArea },
                      { label: "Case Title", value: title },
                      { label: "Claimant", value: claimantName },
                      { label: "Respondent", value: defendantName },
                      { label: "Judicial Panel", value: panel },
                      { label: "Status on Filing", value: "FILED" },
                    ].map(({ label, value }, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          padding: "12px 20px",
                          borderBottom: i < 6 ? "1px solid var(--border)" : "none",
                          gap: "20px",
                        }}
                      >
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--muted)", minWidth: "130px" }}>
                          {label}
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: label === "Status on Filing" ? "var(--warning)" : "var(--foreground)",
                            textAlign: "right",
                          }}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "12px",
                      borderTop: "1px solid var(--border)",
                      paddingTop: "20px",
                      marginTop: "8px",
                    }}
                  >
                    <button
                      type="button"
                      className="button secondary-button"
                      onClick={() => setStep(2)}
                      style={{ padding: "10px 24px" }}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="button"
                      disabled={isSubmitting}
                      style={{ padding: "10px 32px" }}
                    >
                      {isSubmitting ? "Filing Case..." : "Confirm & Register Case"}
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
