"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FileAppealPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [originalCaseNum, setOriginalCaseNum] = useState("");
  const [appealTitle, setAppealTitle] = useState("");
  const [appellant, setAppellant] = useState("");
  const [respondent, setRespondent] = useState("");
  const [dateEscalated, setDateEscalated] = useState("");
  const [grounds, setGrounds] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate saving to DB
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/appeals");
      }, 1500);
    }, 1000);
  };

  return (
    <main>
      {/* Back to list */}
      <Link href="/appeals" className="back-link">
        <span style={{ fontSize: "16px" }}>←</span> Back to Appeals Log
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 className="page-title">File Appeal Record</h1>
        <p className="page-subtitle">Register records of external chieftaincy reviews escalated to the National House of Chiefs or supreme review committees.</p>
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
            <span style={{ fontWeight: 600, color: step >= 1 ? "var(--foreground)" : "inherit" }}>Appeal Info</span>
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
            <span style={{ fontWeight: 600, color: step >= 2 ? "var(--foreground)" : "inherit" }}>Litigants</span>
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
            <span style={{ fontWeight: 600, color: step >= 3 ? "var(--foreground)" : "inherit" }}>Grounds & Review</span>
          </div>
        </div>

        {/* Conversational Form */}
        <div className="card">
          {isSuccess ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏛️</div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--success)", margin: "0 0 8px" }}>Appeal Logged</h3>
              <p style={{ color: "var(--muted)", margin: 0 }}>The appeal has been officially cataloged and marked as PENDING National House review.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form">
              {step === 1 && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>Step 1: Appeal Info & Original Reference</h3>
                  <p style={{ margin: "0 0 16px", fontSize: "15px", color: "var(--muted)" }}>Log details about the original local committee ruling that is under challenge.</p>

                  <div>
                    <label htmlFor="originalCaseNum" className="form-label">Original Local Case Reference</label>
                    <input 
                      id="originalCaseNum" 
                      name="originalCaseNum" 
                      type="text" 
                      required 
                      className="input" 
                      placeholder="e.g. VRHC-JC-2024-0010"
                      value={originalCaseNum}
                      onChange={(e) => setOriginalCaseNum(e.target.value)}
                    />
                    <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "4px" }}>Enter the VRHC case file identifier being appealed.</p>
                  </div>

                  <div>
                    <label htmlFor="appealTitle" className="form-label">Appeal Suit Heading / Title</label>
                    <input 
                      id="appealTitle" 
                      name="appealTitle" 
                      type="text" 
                      required 
                      className="input" 
                      placeholder="e.g. Togbe Afede XIV & Ors v. Paramount Stool Claimant (Appeal)"
                      value={appealTitle}
                      onChange={(e) => setAppealTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="dateEscalated" className="form-label">Date Escalated / Transmitted</label>
                    <input 
                      id="dateEscalated" 
                      name="dateEscalated" 
                      type="date" 
                      required 
                      className="input" 
                      value={dateEscalated}
                      onChange={(e) => setDateEscalated(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "20px", marginTop: "12px" }}>
                    <Link href="/appeals" className="button secondary-button" style={{ padding: "10px 24px" }}>Cancel</Link>
                    <button 
                      type="button" 
                      className="button" 
                      disabled={!originalCaseNum || !appealTitle || !dateEscalated} 
                      onClick={() => setStep(2)}
                      style={{ padding: "10px 28px", opacity: (!originalCaseNum || !appealTitle || !dateEscalated) ? 0.6 : 1 }}
                    >
                      Next: Litigants Details →
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>Step 2: Litigant Parties Details</h3>
                  <p style={{ margin: "0 0 16px", fontSize: "15px", color: "var(--muted)" }}>Detail the appellant challenging the local ruling and the defending respondent.</p>

                  <div>
                    <label htmlFor="appellant" className="form-label">Appellant (Challenging Party)</label>
                    <input 
                      id="appellant" 
                      name="appellant" 
                      type="text" 
                      required 
                      className="input" 
                      placeholder="e.g. Togbe Afede XIV & Stool Elders"
                      value={appellant}
                      onChange={(e) => setAppellant(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="respondent" className="form-label">Respondent (Defending Party)</label>
                    <input 
                      id="respondent" 
                      name="respondent" 
                      type="text" 
                      required 
                      className="input" 
                      placeholder="e.g. Paramount Stool Claimant / Kingmakers"
                      value={respondent}
                      onChange={(e) => setRespondent(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "20px", marginTop: "12px" }}>
                    <button type="button" className="button secondary-button" onClick={() => setStep(1)} style={{ padding: "10px 24px" }}>← Back</button>
                    <button 
                      type="button" 
                      className="button" 
                      disabled={!appellant || !respondent} 
                      onClick={() => setStep(3)}
                      style={{ padding: "10px 28px", opacity: (!appellant || !respondent) ? 0.6 : 1 }}
                    >
                      Next: Grounds of Appeal →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>Step 3: Grounds of Appeal & Submission</h3>
                  <p style={{ margin: "0 0 16px", fontSize: "15px", color: "var(--muted)" }}>Enter specific legal or customary claims regarding why the local judgment was flawed.</p>

                  <div>
                    <label htmlFor="grounds" className="form-label">Summary of Grounds / Submissions</label>
                    <textarea 
                      id="grounds" 
                      name="grounds" 
                      rows={6} 
                      required
                      className="input" 
                      placeholder="e.g. The Judicial Committee erred by ignoring the customary succession rules of the Asogli Constitution..."
                      style={{ resize: "vertical" }}
                      value={grounds}
                      onChange={(e) => setGrounds(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "20px", marginTop: "12px" }}>
                    <button type="button" className="button secondary-button" onClick={() => setStep(2)} style={{ padding: "10px 24px" }}>← Back</button>
                    <button 
                      type="submit" 
                      className="button" 
                      disabled={isSubmitting}
                      style={{ padding: "10px 32px" }}
                    >
                      {isSubmitting ? "Filing Appeal..." : "Submit Appeal Record"}
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
