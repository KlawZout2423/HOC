import Link from "next/link";

export default async function ReportsPage() {
  const reportCategories = [
    {
      title: "Chieftaincy Dispute Statistics",
      desc: "Annual and monthly reports on stool succession disputes, boundary litigations, and arbitrated resolutions.",
      icon: "📊",
    },
    {
      title: "Paramount Stool Vacancies Log",
      desc: "Comprehensive list of vacant paramountcies, date of stool vacancy, and current status of candidates selection.",
      icon: "👑",
    },
    {
      title: "Panel Sitting Efficiency & Load",
      desc: "Reports evaluating the case volume, hearing frequency, and decision speed across active judicial panels.",
      icon: "⚖️",
    },
    {
      title: "Registry Documents Archival Audit",
      desc: "Audit logs indicating document index rates, digitizations, and folder activity metrics in VRHC archives.",
      icon: "📁",
    },
  ];

  return (
    <main>
      {/* Header */}
      <div style={{ marginBottom: "36px", paddingBottom: "24px", borderBottom: "1px solid var(--border)" }}>
        <h1 className="page-title">Reports & System Logs</h1>
        <p className="page-subtitle">Extract analytics data, print cause lists, and review chieftaincy council indexes.</p>
      </div>

      {/* Reports Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px", marginBottom: "40px" }}>
        {reportCategories.map((rep, i) => (
          <div key={i} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <div>
              <div style={{ fontSize: "36px", marginBottom: "14px" }}>{rep.icon}</div>
              <h3 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: 600, color: "var(--foreground)" }}>{rep.title}</h3>
              <p style={{ margin: 0, fontSize: "15px", color: "var(--muted)", lineHeight: 1.5 }}>{rep.desc}</p>
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "24px", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
              <button className="button" style={{ padding: "8px 16px", fontSize: "14px" }}>Generate PDF</button>
              <button className="button secondary-button" style={{ padding: "8px 16px", fontSize: "14px" }}>Export CSV</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
