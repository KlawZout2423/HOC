import Link from "next/link";

export default async function CasesPage() {
  const stats = [
    { label: "Total Cases", value: "32", desc: "Registered disputes" },
    { label: "Active Hearings", value: "14", desc: "Currently in trial sittings" },
    { label: "Awaiting Judgment", value: "5", desc: "Arguments concluded" },
    { label: "Archived & Decided", value: "13", desc: "Past rulings archived" },
  ];

  const mockCases = [
    {
      id: "case-101",
      caseNumber: "VRHC-JC-2026-0004",
      title: "Togbe Afede XIV & Ors v. Paramount Stool Claimant",
      type: "Stool Dispute",
      traditionalArea: "Asogli",
      status: "HEARINGS",
      filingDate: "2026-04-12",
    },
    {
      id: "case-102",
      caseNumber: "VRHC-JC-2025-0019",
      title: "Nana Kwaku Duah II v. Traditional Council Claimant",
      type: "Land Dispute",
      traditionalArea: "Anfoega",
      status: "AWAITING_JUDGMENT",
      filingDate: "2025-11-08",
    },
    {
      id: "case-103",
      caseNumber: "VRHC-JC-2026-0001",
      title: "Paramount Queen Mother v. Stool Elders Council",
      type: "Gazette Challenge",
      traditionalArea: "Gbi",
      status: "FILED",
      filingDate: "2026-01-15",
    },
  ];

  const statusColors: Record<string, string> = {
    FILED: "status-pending",
    HEARINGS: "status-progress",
    AWAITING_JUDGMENT: "status-pending",
    DECIDED: "status-done",
  };

  return (
    <main>
      {/* 1. Welcome Header */}
      <div className="row-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "24px", marginBottom: "36px" }}>
        <div>
          <h1 className="page-title">Judicial Cases</h1>
          <p className="page-subtitle">Manage chieftaincy petitions, stool disputes, and appeals in the Volta Region.</p>
        </div>
        
        {/* 3. Primary Actions */}
        <Link href="/cases/create" className="button" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span>＋</span> Register New Case
        </Link>
      </div>

      {/* 2. Context Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        {stats.map((stat, i) => (
          <div key={i} className="card stat-card" style={{ borderLeftColor: i === 1 ? "var(--primary)" : i === 2 ? "var(--warning)" : i === 3 ? "var(--success)" : "var(--border-strong)" }}>
            <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--muted)", textTransform: "uppercase" }}>{stat.label}</span>
            <p style={{ margin: "4px 0 0", fontSize: "32px", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.1 }}>{stat.value}</p>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--muted)" }}>{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* 4. Smart Filters */}
      <div className="card" style={{ marginBottom: "28px", padding: "20px 24px" }}>
        <form style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: 2, minWidth: "260px" }}>
            <input placeholder="Search by case title, number, or parties..." className="input" style={{ width: "100%", background: "#fff" }} />
          </div>
          <div style={{ flex: 1, minWidth: "160px" }}>
            <select className="input" style={{ background: "#fff" }}>
              <option value="">All Case Types</option>
              <option value="STOOL_DISPUTE">Stool Dispute</option>
              <option value="LAND_DISPUTE">Land Dispute</option>
              <option value="GAZETTE_CHALLENGE">Gazette Challenge</option>
            </select>
          </div>
          <div style={{ flex: 1, minWidth: "160px" }}>
            <select className="input" style={{ background: "#fff" }}>
              <option value="">All Statuses</option>
              <option value="FILED">Filed / New</option>
              <option value="HEARINGS">Hearings Ongoing</option>
              <option value="AWAITING_JUDGMENT">Awaiting Judgment</option>
              <option value="DECIDED">Decided</option>
            </select>
          </div>
          <button type="submit" className="button secondary-button" style={{ padding: "11px 20px" }}>
            Apply Filters
          </button>
        </form>
      </div>

      {/* 5. Main Content */}
      <div className="card table-wrap" style={{ padding: "0" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Case Number</th>
              <th>Case Title</th>
              <th>Dispute Type</th>
              <th>Traditional Area</th>
              <th>Filing Date</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCases.map((c) => (
              <tr key={c.id}>
                <td style={{ fontWeight: 700, fontSize: "15px", color: "var(--primary)" }}>{c.caseNumber}</td>
                <td style={{ fontWeight: 600, fontSize: "16px", maxWidth: "340px" }}>{c.title}</td>
                <td>{c.type}</td>
                <td>{c.traditionalArea}</td>
                <td>{c.filingDate}</td>
                <td>
                  <span className={`status-badge ${statusColors[c.status] || "status-pending"}`}>
                    {c.status.replace("_", " ")}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Link href={`/cases/${c.id}`} className="link-button" style={{ fontSize: "14px", fontWeight: 700 }}>
                    Open Folder →
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
