import Link from "next/link";

export default async function HearingsPage() {
  const stats = [
    { label: "Sittings Scheduled", value: "3", desc: "For this month" },
    { label: "Adjourned Cases", value: "11", desc: "Awaiting reschedule" },
    { label: "Presiding Panels", value: "2", desc: "Judicial committees active" },
    { label: "Sitting Locations", value: "1", desc: "Main Court Hall, Ho" },
  ];

  const mockHearings = [
    {
      id: "hear-1",
      caseNumber: "VRHC-JC-2026-0004",
      caseTitle: "Togbe Afede XIV & Ors v. Paramount Stool Claimant",
      panel: "Judicial Committee Panel B",
      date: "2026-08-24",
      time: "10:00 AM",
      location: "VRHC Courtroom, Ho",
      status: "SCHEDULED",
    },
    {
      id: "hear-2",
      caseNumber: "VRHC-JC-2025-0019",
      caseTitle: "Nana Kwaku Duah II v. Traditional Council Claimant",
      panel: "Judicial Committee Panel A",
      date: "2026-09-02",
      time: "11:30 AM",
      location: "VRHC Courtroom, Ho",
      status: "SCHEDULED",
    },
  ];

  return (
    <main>
      {/* Header */}
      <div className="row-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "24px", marginBottom: "36px" }}>
        <div>
          <h1 className="page-title">Hearings & Cause List</h1>
          <p className="page-subtitle">Schedule judicial committee panels, record sitting minutes, and publish official cause lists.</p>
        </div>
        <Link href="/hearings/create" className="button" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span>📅</span> Schedule Sitting
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        {stats.map((stat, i) => (
          <div key={i} className="card stat-card" style={{ borderLeftColor: i === 0 ? "var(--warning)" : "var(--primary-mid)" }}>
            <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--muted)", textTransform: "uppercase" }}>{stat.label}</span>
            <p style={{ margin: "4px 0 0", fontSize: "32px", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.1 }}>{stat.value}</p>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--muted)" }}>{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Sittings Cause List Table */}
      <div className="card table-wrap" style={{ padding: "0" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Case Details</th>
              <th>Presiding Judicial Panel</th>
              <th>Location</th>
              <th>Filing Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockHearings.map((h) => (
              <tr key={h.id}>
                <td style={{ fontWeight: 700, fontSize: "14px", color: "var(--primary)" }}>
                  <div>{h.date}</div>
                  <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--muted)" }}>{h.time}</div>
                </td>
                <td style={{ maxWidth: "320px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--muted)" }}>{h.caseNumber}</div>
                  <div style={{ fontWeight: 600, fontSize: "14px" }}>{h.caseTitle}</div>
                </td>
                <td>{h.panel}</td>
                <td>{h.location}</td>
                <td>
                  <span className="status-badge status-progress">
                    {h.status}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Link href="/hearings/create?mode=minutes" className="link-button" style={{ fontSize: "13px", fontWeight: 600 }}>
                    Record Minutes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
