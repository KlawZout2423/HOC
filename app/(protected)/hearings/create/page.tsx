"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ScheduleSittingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [caseId, setCaseId] = useState("");
  const [panel, setPanel] = useState("Panel A");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [location, setLocation] = useState("Main Court Hall, Ho");
  const [purpose, setPurpose] = useState("TRIAL");
  const [notes, setNotes] = useState("");
  const [publishCauseList, setPublishCauseList] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate saving to DB
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/hearings");
      }, 1500);
    }, 1000);
  };

  return (
    <main>
      {/* Back to list */}
      <Link href="/hearings" className="back-link">
        <span style={{ fontSize: "16px" }}>←</span> Back to Hearings List
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 className="page-title">Schedule Sitting</h1>
        <p className="page-subtitle">Configure panels, select dates/times, and link registered chieftaincy cases for trial sittings.</p>
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
            <span style={{ fontWeight: 600, color: step >= 1 ? "var(--foreground)" : "inherit" }}>Panel & Case</span>
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
            <span style={{ fontWeight: 600, color: step >= 2 ? "var(--foreground)" : "inherit" }}>Schedule Details</span>
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
            <span style={{ fontWeight: 600, color: step >= 3 ? "var(--foreground)" : "inherit" }}>Confirm sitting</span>
          </div>
        </div>

        {/* Conversational Form */}
        <div className="card">
          {isSuccess ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--success)", margin: "0 0 8px" }}>Sitting Scheduled</h3>
              <p style={{ color: "var(--muted)", margin: 0 }}>The hearing has been registered and is being added to the official cause list.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form">
              {step === 1 && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>Step 1: Case Details & Presiding Panel</h3>
                  <p style={{ margin: "0 0 16px", fontSize: "15px", color: "var(--muted)" }}>Select which active dispute is being scheduled and which Judicial Committee panel will sit.</p>

                  <div>
                    <label htmlFor="caseId" className="form-label">Associate Case Dispute</label>
                    <select 
                      id="caseId" 
                      name="caseId" 
                      className="input" 
                      required 
                      value={caseId}
                      onChange={(e) => setCaseId(e.target.value)}
                    >
                      <option value="">-- Select Registered Case File --</option>
                      <option value="case-101">VRHC-JC-2026-0004 — Togbe Afede XIV & Ors v. Paramount Stool Claimant</option>
                      <option value="case-102">VRHC-JC-2025-0019 — Nana Kwaku Duah II v. Traditional Council Claimant</option>
                      <option value="case-103">VRHC-JC-2026-0001 — Paramount Queen Mother v. Stool Elders Council</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="panel" className="form-label">Presiding Judicial Panel</label>
                    <select 
                      id="panel" 
                      name="panel" 
                      className="input" 
                      required 
                      value={panel}
                      onChange={(e) => setPanel(e.target.value)}
                    >
                      <option value="Panel A">Judicial Committee Panel A (Togbe Hodo IV Presiding)</option>
                      <option value="Panel B">Judicial Committee Panel B (Togbe Worde IV Presiding)</option>
                      <option value="Panel C">Special Stool Boundary Arbitration Panel</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="purpose" className="form-label">Sitting Stage / Purpose</label>
                    <select 
                      id="purpose" 
                      name="purpose" 
                      className="input" 
                      required 
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                    >
                      <option value="DIRECTIONS">Directions Stage (Filing Reviews)</option>
                      <option value="TRIAL">Trial Sitting / Cross Examination</option>
                      <option value="JUDGMENT">Judgment Delivery</option>
                    </select>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "20px", marginTop: "12px" }}>
                    <Link href="/hearings" className="button secondary-button" style={{ padding: "10px 24px" }}>Cancel</Link>
                    <button 
                      type="button" 
                      className="button" 
                      disabled={!caseId} 
                      onClick={() => setStep(2)}
                      style={{ padding: "10px 28px", opacity: !caseId ? 0.6 : 1 }}
                    >
                      Next: Date & Location →
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>Step 2: Date, Time & Venue</h3>
                  <p style={{ margin: "0 0 16px", fontSize: "15px", color: "var(--muted)" }}>Establish the timeline and geographical/physical room context for the sitting.</p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label htmlFor="date" className="form-label">Sitting Date</label>
                      <input 
                        id="date" 
                        name="date" 
                        type="date" 
                        required 
                        className="input" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="form-label">Sitting Time</label>
                      <input 
                        id="time" 
                        name="time" 
                        type="time" 
                        required 
                        className="input" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="location" className="form-label">Sitting Courtroom Venue</label>
                    <select 
                      id="location" 
                      name="location" 
                      className="input" 
                      required 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="Main Court Hall, Ho">Main Courtroom Hall (VRHC, Ho)</option>
                      <option value="Traditional Council Chamber">Paramountcy Council Chamber (Field Sitting)</option>
                      <option value="Chamber Room 3">Judicial Panel Room 3</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="notes" className="form-label">Pre-Sitting Instructions / Registrar Notes</label>
                    <textarea 
                      id="notes" 
                      name="notes" 
                      rows={4} 
                      className="input" 
                      placeholder="Add registry guidelines, requested files, or instructions for the litigants..."
                      style={{ resize: "vertical" }}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "20px", marginTop: "12px" }}>
                    <button type="button" className="button secondary-button" onClick={() => setStep(1)} style={{ padding: "10px 24px" }}>← Back</button>
                    <button 
                      type="button" 
                      className="button" 
                      disabled={!date} 
                      onClick={() => setStep(3)}
                      style={{ padding: "10px 28px", opacity: !date ? 0.6 : 1 }}
                    >
                      Next: Confirm sitting →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>Step 3: Review & Finalize Sitting</h3>
                  <p style={{ margin: "0 0 16px", fontSize: "15px", color: "var(--muted)" }}>Verify the details. Confirming this step schedules the sitting and notifies panel members.</p>

                  <div style={{ background: "#f8fafc", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px", display: "grid", gap: "12px" }}>
                    <div style={{ display: "flex", justifySpaceBetween: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>
                      <span style={{ fontWeight: 500, color: "var(--muted)" }}>Associated Case:</span>
                      <span style={{ fontWeight: 600, color: "var(--foreground)", textAlign: "right" }}>
                        {caseId === "case-101" ? "VRHC-JC-2026-0004 (Asogli)" : caseId === "case-102" ? "VRHC-JC-2025-0019 (Anfoega)" : "VRHC-JC-2026-0001 (Gbi)"}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifySpaceBetween: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>
                      <span style={{ fontWeight: 500, color: "var(--muted)" }}>Judicial Panel:</span>
                      <span style={{ fontWeight: 600, color: "var(--foreground)" }}>{panel}</span>
                    </div>
                    <div style={{ display: "flex", justifySpaceBetween: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>
                      <span style={{ fontWeight: 500, color: "var(--muted)" }}>Sitting Schedule:</span>
                      <span style={{ fontWeight: 600, color: "var(--foreground)" }}>{date} at {time}</span>
                    </div>
                    <div style={{ display: "flex", justifySpaceBetween: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>
                      <span style={{ fontWeight: 500, color: "var(--muted)" }}>Location Venue:</span>
                      <span style={{ fontWeight: 600, color: "var(--foreground)" }}>{location}</span>
                    </div>
                    <div style={{ display: "flex", justifySpaceBetween: "space-between" }}>
                      <span style={{ fontWeight: 500, color: "var(--muted)" }}>Sitting Purpose:</span>
                      <span style={{ fontWeight: 600, color: "var(--foreground)", textTransform: "uppercase" }}>{purpose}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
                    <input 
                      type="checkbox" 
                      id="publish" 
                      checked={publishCauseList} 
                      onChange={(e) => setPublishCauseList(e.target.checked)}
                      style={{ width: "18px", height: "18px", accentColor: "var(--primary)" }}
                    />
                    <label htmlFor="publish" style={{ fontSize: "14px", fontWeight: 500, color: "var(--foreground)", cursor: "pointer" }}>
                      Automatically publish to public VRHC Cause List & Notification Board
                    </label>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "20px", marginTop: "12px" }}>
                    <button type="button" className="button secondary-button" onClick={() => setStep(2)} style={{ padding: "10px 24px" }}>← Back</button>
                    <button 
                      type="submit" 
                      className="button" 
                      disabled={isSubmitting}
                      style={{ padding: "10px 32px" }}
                    >
                      {isSubmitting ? "Registering Sitting..." : "Confirm & Schedule Sitting"}
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
