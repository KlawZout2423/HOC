import Link from "next/link";

export default async function AppealsPage() {
  const stats = [
    { label: "Appeals Registered", value: "8", desc: "Under process" },
    { label: "Awaiting Hearing", value: "3", desc: "Escalated sittings" },
    { label: "Appeals Decided", value: "5", desc: "Closed reviews" },
    { label: "Decision Maintained", value: "80%", desc: "Lower ruling confirmed" },
  ];

  const mockAppeals = [
    {
      id: "app-1",
      appealCaseNumber: "VRHC-AP-2026-0002",
      originalCaseNumber: "VRHC-JC-2024-0010",
      title: "Anfoega Stool Claim Appeal v. Council Council Decision",
      dateFiled: "2026-02-18",
      status: "PENDING",
    },
    {
      id: "app-2",
      appealCaseNumber: "VRHC-AP-2025-0014",
      originalCaseNumber: "VRHC-JC-2023-0082",
      title: "Awudome boundary appeal ruling",
      dateFiled: "2025-09-04",
      status: "DECIDED",
    },
  ];

  return (
    <main>
      {/* Header */}
      <div className="row-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "24px", marginBottom: "36px" }}>
        <div>
          <h1 className="page-title">Appeals Log</h1>
          <p className="page-subtitle">Track stool or traditional council decisions appealed to national levels or external review panels.</p>
        </div>
        <Link href="/appeals/create" className="button" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span>🏛️</span> File Appeal Record
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        {stats.map((stat, i) => (
          <div key={i} className="card stat-card" style={{ borderLeftColor: i === 1 ? "var(--warning)" : "var(--primary-mid)" }}>
            <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--muted)", textTransform: "uppercase" }}>{stat.label}</span>
            <p style={{ margin: "4px 0 0", fontSize: "32px", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.1 }}>{stat.value}</p>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--muted)" }}>{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Main Appeals Table */}
      <div className="card table-wrap" style={{ padding: "0" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Appeal Case ID</th>
              <th>Original Case Reference</th>
              <th>Appeal Title / Suit Description</th>
              <th>Date Escalated</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockAppeals.map((a) => (
              <tr key={a.id}>
                <td style={{ fontWeight: 700, fontSize: "14px", color: "var(--primary)" }}>{a.appealCaseNumber}</td>
                <td>{a.originalCaseNumber}</td>
                <td style={{ fontWeight: 600, fontSize: "14px", maxWidth: "340px" }}>{a.title}</td>
                <td>{a.dateFiled}</td>
                <td>
                  <span className={`status-badge ${a.status === "PENDING" ? "status-pending" : "status-done"}`}>
                    {a.status}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button className="link-button" style={{ fontSize: "13px", fontWeight: 600 }}>
                    Open Folder
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
