"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LogCorrespondencePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [category, setCategory] = useState("LETTER");
  const [title, setTitle] = useState("");
  const [dateReceived, setDateReceived] = useState("");
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("Registrar, VRHC");
  const [status, setStatus] = useState("PENDING");
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate saving to DB
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/registry");
      }, 1500);
    }, 1000);
  };

  return (
    <main>
      {/* Back to list */}
      <Link href="/registry" className="back-link">
        <span style={{ fontSize: "16px" }}>←</span> Back to Registry
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 className="page-title">Log Correspondence</h1>
        <p className="page-subtitle">Index incoming/outgoing physical letters, motions, and gazette updates into digital archives.</p>
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
            <span style={{ fontWeight: 600, color: step >= 1 ? "var(--foreground)" : "inherit" }}>Mail Type</span>
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
            <span style={{ fontWeight: 600, color: step >= 2 ? "var(--foreground)" : "inherit" }}>Parties</span>
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
            <span style={{ fontWeight: 600, color: step >= 3 ? "var(--foreground)" : "inherit" }}>Digital Attach</span>
          </div>
        </div>

        {/* Conversational Form */}
        <div className="card">
          {isSuccess ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📥</div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--success)", margin: "0 0 8px" }}>Correspondence Logged</h3>
              <p style={{ color: "var(--muted)", margin: 0 }}>The record has been indexed under reference and assigned status PENDING review.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form">
              {step === 1 && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>Step 1: Correspondence Type & Date</h3>
                  <p style={{ margin: "0 0 16px", fontSize: "15px", color: "var(--muted)" }}>Classify the incoming files and establish receipt timelines.</p>

                  <div>
                    <label htmlFor="category" className="form-label">Correspondence Category</label>
                    <select 
                      id="category" 
                      name="category" 
                      className="input" 
                      required 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="MOTION">Notice of Motion (Substitution/Amendments)</option>
                      <option value="LETTER">Official Administrative Letter</option>
                      <option value="GAZETTE">Gazette Notification Confirmation</option>
                      <option value="MINUTES">Traditional Council Sitting Minutes</option>
                      <option value="PETITION">Fresh Petition / Suit Filing</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="title" className="form-label">Document Description / Subject</label>
                    <input 
                      id="title" 
                      name="title" 
                      type="text" 
                      required 
                      className="input" 
                      placeholder="e.g. Notice of Motion - Substitution of Parties"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="dateReceived" className="form-label">Date Received & Stamp Logged</label>
                    <input 
                      id="dateReceived" 
                      name="dateReceived" 
                      type="date" 
                      required 
                      className="input" 
                      value={dateReceived}
                      onChange={(e) => setDateReceived(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "20px", marginTop: "12px" }}>
                    <Link href="/registry" className="button secondary-button" style={{ padding: "10px 24px" }}>Cancel</Link>
                    <button 
                      type="button" 
                      className="button" 
                      disabled={!title || !dateReceived} 
                      onClick={() => setStep(2)}
                      style={{ padding: "10px 28px", opacity: (!title || !dateReceived) ? 0.6 : 1 }}
                    >
                      Next: Sender & Recipient →
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>Step 2: Sender & Recipient Authorities</h3>
                  <p style={{ margin: "0 0 16px", fontSize: "15px", color: "var(--muted)" }}>Log routing details for tracking the paper trail of the correspondence.</p>

                  <div>
                    <label htmlFor="sender" className="form-label">Sender Name / Originating Agency</label>
                    <input 
                      id="sender" 
                      name="sender" 
                      type="text" 
                      required 
                      className="input" 
                      placeholder="e.g. Law Offices of Kwami & Co"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="recipient" className="form-label">Recipient Department / Officer</label>
                    <input 
                      id="recipient" 
                      name="recipient" 
                      type="text" 
                      required 
                      className="input" 
                      placeholder="e.g. Registrar, VRHC"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="status" className="form-label">Review Status State</label>
                    <select 
                      id="status" 
                      name="status" 
                      className="input" 
                      required 
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="PENDING">Pending (Awaiting Registrar Minute Action)</option>
                      <option value="RESOLVED">Resolved (Dispatched / Indexed to Case File)</option>
                    </select>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "20px", marginTop: "12px" }}>
                    <button type="button" className="button secondary-button" onClick={() => setStep(1)} style={{ padding: "10px 24px" }}>← Back</button>
                    <button 
                      type="button" 
                      className="button" 
                      disabled={!sender || !recipient} 
                      onClick={() => setStep(3)}
                      style={{ padding: "10px 28px", opacity: (!sender || !recipient) ? 0.6 : 1 }}
                    >
                      Next: Scan Attachment →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: "grid", gap: "20px" }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>Step 3: Document Scan & Association</h3>
                  <p style={{ margin: "0 0 16px", fontSize: "15px", color: "var(--muted)" }}>Log official digital scan file to attach to the permanent index registry.</p>

                  <div>
                    <label htmlFor="scan" className="form-label">Attach Digital PDF Scan</label>
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
                      input.accept = ".pdf,image/*";
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) setFileName(file.name);
                      };
                      input.click();
                    }}>
                      <span style={{ fontSize: "28px", display: "block", marginBottom: "8px" }}>📥</span>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--primary)", display: "block" }}>
                        {fileName ? `Selected: ${fileName}` : "Click to select PDF or image scan"}
                      </span>
                      <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                        Max file size: 10MB. PDF or high-contrast image.
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
                      {isSubmitting ? "Logging Record..." : "Confirm & Index Mail"}
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
