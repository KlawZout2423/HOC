import Link from "next/link";

export default async function CreateCasePage() {
  return (
    <main>
      {/* Back to list */}
      <Link href="/cases" className="back-link">
        <span style={{ fontSize: "16px" }}>←</span> Back to Cases List
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 className="page-title">Register Case</h1>
        <p className="page-subtitle">File a new chieftaincy dispute petition, stool contest, or council appeal.</p>
      </div>

      <div className="form-view-container">
        {/* Progress Tracker Card */}
        <div className="card" style={{ marginBottom: "28px", display: "flex", gap: "24px", justifyContent: "space-between", background: "#f8fafc", padding: "16px 24px" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700 }}>1</span>
            <span style={{ fontWeight: 600, color: "var(--foreground)" }}>Case Information</span>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", opacity: 0.6 }}>
            <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#cbd5e1", color: "#475569", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700 }}>2</span>
            <span style={{ fontWeight: 600 }}>Parties Details</span>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", opacity: 0.6 }}>
            <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#cbd5e1", color: "#475569", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700 }}>3</span>
            <span style={{ fontWeight: 600 }}>Filing Documents</span>
          </div>
        </div>

        {/* Conversational Form */}
        <div className="card">
          <form className="form">
            <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>Step 1: Basic Case Specifications</h3>
            <p style={{ margin: "0 0 16px", fontSize: "15px", color: "var(--muted)" }}>Provide the core classification details for this chieftaincy record.</p>

            <div>
              <label htmlFor="caseType" className="form-label">Dispute Type</label>
              <select id="caseType" name="caseType" className="input" required>
                <option value="">-- Choose Classification --</option>
                <option value="STOOL_DISPUTE">Stool Dispute (Succession / Enstoolment)</option>
                <option value="LAND_DISPUTE">Traditional Boundary Land Dispute</option>
                <option value="GAZETTE_CHALLENGE">Gazette Registry Challenge</option>
              </select>
              <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "4px" }}>Select the primary legal nature of the petition.</p>
            </div>

            <div>
              <label htmlFor="traditionalArea" className="form-label">Traditional Area Jurisdiction</label>
              <select id="traditionalArea" name="traditionalArea" className="input" required>
                <option value="">-- Choose Paramountcy Area --</option>
                <option value="Awudome">Awudome Traditional Area</option>
                <option value="Anfoega">Anfoega Traditional Area</option>
                <option value="Gbi">Gbi Traditional Area</option>
              </select>
            </div>

            <div>
              <label htmlFor="title" className="form-label">Case Title / Suit Heading</label>
              <input 
                id="title" 
                name="title" 
                type="text" 
                required 
                className="input" 
                placeholder="e.g. Togbe Kobla II v. Council of Kingmakers"
              />
            </div>

            <div>
              <label htmlFor="description" className="form-label">Petition Summary / Details</label>
              <textarea 
                id="description" 
                name="description" 
                rows={5} 
                className="input" 
                placeholder="Briefly summarize the details of the stool contest or gazette challenge..."
                style={{ resize: "vertical" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "20px", marginTop: "12px" }}>
              <Link href="/cases" className="button secondary-button" style={{ padding: "10px 24px" }}>Cancel</Link>
              <button type="button" className="button" style={{ padding: "10px 28px" }}>
                Next: Litigant Parties →
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
