import Link from "next/link";

export default async function HearingsPage() {
  const stats = [
    { label: "Sittings Scheduled", value: "3", desc: "For this month" },
    { label: "Hearing Notices Dispatched", value: "18", desc: "Served on Counsel & Parties" },
    { label: "Presiding Panels", value: "2", desc: "Judicial committees active" },
    { label: "Sitting Location", value: "VRCC Courtroom, Ho", desc: "Volta Regional Coordinating Council" },
  ];

  const mockHearings = [
    {
      id: "hear-1",
      caseNumber: "VRHC/JC/2026/0001",
      caseTitle: "John H.M. Nyonator & 2 Ors v. Togbe Adza Kwadzo III",
      panel: "Judicial Committee Panel A",
      date: "2026-09-18",
      time: "10:00 AM",
      location: "VRCC Courtroom, Ho",
      noticeStatus: "DISPATCHED",
      status: "SCHEDULED",
    },
    {
      id: "hear-2",
      caseNumber: "VRHC/JC/2025/0019",
      caseTitle: "Togbe Korbla Adzoyi & 6 Ors v. Tator Agbodemegbe & 4 Ors",
      panel: "Judicial Committee Panel B",
      date: "2026-09-24",
      time: "11:30 AM",
      location: "VRCC Courtroom, Ho",
      noticeStatus: "DISPATCHED",
      status: "SCHEDULED",
    },
  ];

  return (
    <main>
      {/* Header */}
      <div className="row-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "24px", marginBottom: "36px" }}>
        <div>
          <h1 className="page-title">Hearings & Cause List</h1>
          <p className="page-subtitle">Schedule judicial committee panels at VRCC Courtroom, dispatch hearing notices, and log sitting minutes.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button className="button-secondary" style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "14px" }}>
            <span>📬</span> Dispatch Hearing Notices
          </button>
          <Link href="/hearings/create" className="button" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span>📅</span> Schedule Sitting
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        {stats.map((stat, i) => (
          <div key={i} className="card stat-card" style={{ borderLeftColor: i === 0 ? "var(--warning)" : i === 1 ? "var(--success)" : "var(--primary-mid)" }}>
            <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--muted)", textTransform: "uppercase" }}>{stat.label}</span>
            <p style={{ margin: "4px 0 0", fontSize: "28px", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.1 }}>{stat.value}</p>
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
              <th>Suit No. & Case Details</th>
              <th>Presiding Panel</th>
              <th>Venue</th>
              <th>Hearing Notice</th>
              <th>Status</th>
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
                <td style={{ fontSize: "13px", fontWeight: 600 }}>🏛️ {h.location}</td>
                <td>
                  <span className="status-badge status-done">
                    ✓ {h.noticeStatus}
                  </span>
                </td>
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
