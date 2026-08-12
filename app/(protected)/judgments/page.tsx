import Link from "next/link";

export default async function JudgmentsPage() {
  const stats = [
    { label: "Total Rulings", value: "84", desc: "Since establishment" },
    { label: "Gazetted Rulings", value: "62", desc: "Published officially" },
    { label: "Stool Precedents", value: "28", desc: "Succession guidelines" },
    { label: "Appeals Active", value: "3", desc: "National committee reviews" },
  ];

  const mockJudgments = [
    {
      id: "jud-1",
      caseNumber: "VRHC-JC-2024-0012",
      caseTitle: "Awudome Paramountcy Stool Succession Contest",
      rulingDate: "2024-11-20",
      panelPresident: "Togbe Tepre Hodo IV",
      gazetteStatus: "GAZETTED",
    },
    {
      id: "jud-2",
      caseNumber: "VRHC-JC-2025-0005",
      caseTitle: "Gbi Boundary Arbitration Dispute",
      rulingDate: "2025-06-14",
      panelPresident: "Togbe Worde IV",
      gazetteStatus: "PENDING_PUBLICATION",
    },
  ];

  return (
    <main>
      {/* Header */}
      <div className="row-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "24px", marginBottom: "36px" }}>
        <div>
          <h1 className="page-title">Judgments & Rulings</h1>
          <p className="page-subtitle">Lookup historical precedents, search court judgments, and review gazetted declarations.</p>
        </div>
        <button className="button" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span>⚖️</span> Record Judgment
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        {stats.map((stat, i) => (
          <div key={i} className="card stat-card" style={{ borderLeftColor: i === 2 ? "var(--warning)" : "var(--primary-mid)" }}>
            <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--muted)", textTransform: "uppercase" }}>{stat.label}</span>
            <p style={{ margin: "4px 0 0", fontSize: "32px", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.1 }}>{stat.value}</p>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--muted)" }}>{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Main Rulings Table */}
      <div className="card table-wrap" style={{ padding: "0" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Ruling Date</th>
              <th>Case Reference</th>
              <th>Judgment Case Heading</th>
              <th>Panel President</th>
              <th>Gazette Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockJudgments.map((j) => (
              <tr key={j.id}>
                <td style={{ fontWeight: 700, fontSize: "14px", color: "var(--primary)" }}>{j.rulingDate}</td>
                <td>{j.caseNumber}</td>
                <td style={{ fontWeight: 600, fontSize: "14px", maxWidth: "340px" }}>{j.caseTitle}</td>
                <td>{j.panelPresident}</td>
                <td>
                  <span className={`status-badge ${j.gazetteStatus === "GAZETTED" ? "status-done" : "status-pending"}`}>
                    {j.gazetteStatus.replace("_", " ")}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button className="link-button" style={{ fontSize: "13px", fontWeight: 600 }}>
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
