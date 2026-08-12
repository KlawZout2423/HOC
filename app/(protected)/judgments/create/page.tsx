"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RecordJudgmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [caseId, setCaseId] = useState("");
  const [rulingDate, setRulingDate] = useState("");
  const [panelPresident, setPanelPresident] = useState("Togbe Tepre Hodo IV");
  const [verdictType, setVerdictType] = useState("STOOL_CONFIRMATION");
  const [summary, setSummary] = useState("");
  const [gazetteStatus, setGazetteStatus] = useState("PENDING_PUBLICATION");
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate saving to DB
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/judgments");
      }, 1500);
    }, 1000);
  };

  return (
    <main>
      {/* Back to list */}
      <Link href="/judgments" className="back-link">
        <span style={{ fontSize: "16px" }}>←</span> Back to Judgments List
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 className="page-title">Record Judgment</h1>
        <p className="page-subtitle">Publish final panel verdicts, log historical chieftaincy precedents, and queue rulings for Gazette registration.</p>
      </div>

      <div className="form-view-container">
        {/* Progress Tracker Card */}
        <div className="card" style={{ marginBottom: "28px", display: "flex", gap: "24px", justifyContent: "space-between", background: "#f8fafc", padding: "16px 24px" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", opacity: step >= 1 ? 1 : 0.6 }}>
            <span style={{ 
              width: "28px", 
              height: "28px", 
              borderRadius: "50%", 
              background: step >= 1 ? "var(--primary)" : "#cbd5e1", 
              color: step >= 1 ? "white" : "#475569", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              fontSize: "14px", 
              fontWeight: 700 
            }}>1</span>
            <span style={{ fontWeight: 600, color: step >= 1 ? "var(--foreground)" : "inherit" }}>Case & Date</span>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", opacity: step >= 2 ? 1 : 0.6 }}>
            <span style={{ 
              width: "28px", 
              height: "28px", 
              borderRadius: "50%", 
              background: step >= 2 ? "var(--primary)" : "#cbd5e1", 
              color: step >= 2 ? "white" : "#475569", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              fontSize: "14px", 
              fontWeight: 700 
            }}>2</span>
            <span style={{ fontWeight: 600, color: step >= 2 ? "var(--foreground)" : "inherit" }}>Verdict Details</span>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", opacity: step >= 3 ? 1 : 0.6 }}>
            <span style={{ 
              width: "28px", 
              height: "28px", 
              borderRadius: "50%", 
              background: step >= 3 ? "var(--primary)" : "#cbd5e1", 
              color: step >= 3 ? "white" : "#475569", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              fontSize: "14px", 
              fontWeight: 700 
            }}>3</span>
            <span style={{ fontWeight: 600, color: step >= 3 ? "var(--foreground)" : "inherit" }}>Publication</span>
          </div>
        </div>

        {/* Conversational Form */}
        <div className="card">
          {isSuccess ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--success)", margin: "0 0 8px" }}>Judgment Recorded</h3>
              <p style={{ color: "var(--muted)", margin: 0 }}>The ruling has been registered into archives and the status is set to {gazetteStatus.replace("_", " ")}.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form">
              {step === 1 && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>Step 1: Case Reference & Verdict Date</h3>
                  <p style={{ margin: "0 0 16px", fontSize: "15px", color: "var(--muted)" }}>Select the case file being closed and the official date the panel read the verdict.</p>

                  <div>
                    <label htmlFor="caseId" className="form-label">Select Case reference</label>
                    <select 
                      id="caseId" 
                      name="caseId" 
                      className="input" 
                      required 
                      value={caseId}
                      onChange={(e) => setCaseId(e.target.value)}
                    >
                      <option value="">-- Select Concluded Case file --</option>
                      <option value="case-101">VRHC-JC-2026-0004 — Togbe Afede XIV & Ors v. Paramount Stool Claimant</option>
                      <option value="case-102">VRHC-JC-2025-0019 — Nana Kwaku Duah II v. Traditional Council Claimant</option>
                      <option value="case-103">VRHC-JC-2026-0001 — Paramount Queen Mother v. Stool Elders Council</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="rulingDate" className="form-label">Ruling Delivery Date</label>
                    <input 
                      id="rulingDate" 
                      name="rulingDate" 
                      type="date" 
                      required 
                      className="input" 
                      value={rulingDate}
                      onChange={(e) => setRulingDate(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "20px", marginTop: "12px" }}>
                    <Link href="/judgments" className="button secondary-button" style={{ padding: "10px 24px" }}>Cancel</Link>
                    <button 
                      type="button" 
                      className="button" 
                      disabled={!caseId || !rulingDate} 
                      onClick={() => setStep(2)}
                      style={{ padding: "10px 28px", opacity: (!caseId || !rulingDate) ? 0.6 : 1 }}
                    >
                      Next: Verdict Details →
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>Step 2: Verdict & Presiding Panel Details</h3>
                  <p style={{ margin: "0 0 16px", fontSize: "15px", color: "var(--muted)" }}>Enter the specific ruling outputs, core legal type, and panel details.</p>

                  <div>
                    <label htmlFor="panelPresident" className="form-label">Presiding President of Panel</label>
                    <select 
                      id="panelPresident" 
                      name="panelPresident" 
                      className="input" 
                      required 
                      value={panelPresident}
                      onChange={(e) => setPanelPresident(e.target.value)}
                    >
                      <option value="Togbe Tepre Hodo IV">Togbe Tepre Hodo IV (Paramount Chief of Awudome)</option>
                      <option value="Togbe Worde IV">Togbe Worde IV (Gbi Council)</option>
                      <option value="Togbe Afede XIV">Togbe Afede XIV (Asogli Council)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="verdictType" className="form-label">Precedent Classification</label>
                    <select 
                      id="verdictType" 
                      name="verdictType" 
                      className="input" 
                      required 
                      value={verdictType}
                      onChange={(e) => setVerdictType(e.target.value)}
                    >
                      <option value="STOOL_CONFIRMATION">Stool Succession Confirmation (Enstoolment Validated)</option>
                      <option value="STOOL_DESTITUTION">Stool Destoolment / Deposition Declaration</option>
                      <option value="BOUNDARY_DEMARCATION">Traditional Boundary Land Award / Demarcation</option>
                      <option value="CUSTOMARY_LAW">Customary Rite Declaration / Amendment</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="summary" className="form-label">Judgment Core Summary (Ratio Decidendi)</label>
                    <textarea 
                      id="summary" 
                      name="summary" 
                      rows={5} 
                      required
                      className="input" 
                      placeholder="Outline the fundamental findings of fact, evidence weighed, and the final order declared by the judicial panel..."
                      style={{ resize: "vertical" }}
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "20px", marginTop: "12px" }}>
                    <button type="button" className="button secondary-button" onClick={() => setStep(1)} style={{ padding: "10px 24px" }}>← Back</button>
                    <button 
                      type="button" 
                      className="button" 
                      disabled={!summary} 
                      onClick={() => setStep(3)}
                      style={{ padding: "10px 28px", opacity: !summary ? 0.6 : 1 }}
                    >
                      Next: Gazette & Publication →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>Step 3: Gazette Notification & Document Archival</h3>
                  <p style={{ margin: "0 0 16px", fontSize: "15px", color: "var(--muted)" }}>Log official document files and specify whether the outcome updates the National Register of Chiefs.</p>

                  <div>
                    <label htmlFor="gazetteStatus" className="form-label">Gazette Publication Status</label>
                    <select 
                      id="gazetteStatus" 
                      name="gazetteStatus" 
                      className="input" 
                      required 
                      value={gazetteStatus}
                      onChange={(e) => setGazetteStatus(e.target.value)}
                    >
                      <option value="PENDING_PUBLICATION">Pending Review by Ministry / National Secretariat</option>
                      <option value="GAZETTED">Gazetted & Published in Official Register</option>
                      <option value="EXEMPT">Exempted / Internal Resolution Only</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="document" className="form-label">Upload Certified True Copy (Signed PDF)</label>
                    <div style={{
                      border: "2px dashed var(--border-strong)",
                      borderRadius: "var(--radius)",
                      padding: "24px",
                      textAlign: "center",
                      background: "#fafafa",
                      cursor: "pointer",
                      transition: "var(--transition)"
                    }} onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = ".pdf";
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) setFileName(file.name);
                      };
                      input.click();
                    }}>
                      <span style={{ fontSize: "28px", display: "block", marginBottom: "8px" }}>📄</span>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--primary)", display: "block" }}>
                        {fileName ? `Selected: ${fileName}` : "Click to select PDF judgment file"}
                      </span>
                      <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                        Max file size: 15MB. Signed scans are preferred.
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "20px", marginTop: "12px" }}>
                    <button type="button" className="button secondary-button" onClick={() => setStep(2)} style={{ padding: "10px 24px" }}>← Back</button>
                    <button 
                      type="submit" 
                      className="button" 
                      disabled={isSubmitting}
                      style={{ padding: "10px 32px" }}
                    >
                      {isSubmitting ? "Recording Judgment..." : "Finalize & Record Judgment"}
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
