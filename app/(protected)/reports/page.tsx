import Link from "next/link";

export default async function ReportsPage() {
  const summaryStats = [
    { label: "Reports Generated", value: "247", desc: "All time", color: "var(--primary)" },
    { label: "Last Export", value: "Today", desc: "At 08:42 AM", color: "var(--success)" },
    { label: "Scheduled Reports", value: "4", desc: "Auto-export weekly", color: "var(--warning)" },
    { label: "Data Period", value: "2018–2026", desc: "Full institutional archive", color: "var(--border-strong)" },
  ];

  const reportCategories = [
    {
      title: "Chieftaincy Dispute Statistics",
      desc: "Annual and monthly reports on stool succession disputes, boundary litigations, and arbitrated resolutions. Filterable by traditional area and year.",
      icon: "📊",
      tag: "ANALYTICS",
      lastGenerated: "2026-08-01",
      recordCount: "356 cases",
    },
    {
      title: "Paramount Stool Vacancies Log",
      desc: "Comprehensive list of vacant paramountcies, date of stool vacancy, current status of candidate selection, and gazette notifications pending.",
      icon: "👑",
      tag: "REGISTRY",
      lastGenerated: "2026-07-15",
      recordCount: "23 stools",
    },
    {
      title: "Panel Sitting Efficiency & Load",
      desc: "Evaluates case volume, hearing frequency, and decision speed across all active judicial panels for the Volta Region.",
      icon: "⚖️",
      tag: "PERFORMANCE",
      lastGenerated: "2026-07-28",
      recordCount: "3 active panels",
    },
    {
      title: "Registry Documents Archival Audit",
      desc: "Audit logs indicating document index rates, physical file digitisation ratios, and archival activity metrics across VRHC registry.",
      icon: "📁",
      tag: "AUDIT",
      lastGenerated: "2026-08-05",
      recordCount: "142 documents",
    },
    {
      title: "Pending Gazette Publications",
      desc: "List of all chieftaincy decisions awaiting formal gazette publication by the Ministry of Chieftaincy & Religious Affairs. Includes appeal window tracking.",
      icon: "📰",
      tag: "GAZETTE",
      lastGenerated: "2026-08-10",
      recordCount: "8 pending",
    },
    {
      title: "Traditional Chiefs Register",
      desc: "Official registry of all gazetted and recognised paramount chiefs across the 18 traditional areas of the Volta Region. Includes succession lineage references.",
      icon: "🏛️",
      tag: "REGISTRY",
      lastGenerated: "2026-06-30",
      recordCount: "18 traditional areas",
    },
    {
      title: "Case Status Breakdown",
      desc: "Real-time breakdown of all judicial cases by status: Filed, Active Hearings, Awaiting Judgment, Decided, Appealed, and Archived.",
      icon: "📋",
      tag: "ANALYTICS",
      lastGenerated: "2026-08-12",
      recordCount: "356 total cases",
    },
    {
      title: "Adjournment & Delay Analysis",
      desc: "Tracks patterns in case adjournment rates, panel no-shows, and average days between sittings. Key for judicial efficiency reporting.",
      icon: "⏳",
      tag: "PERFORMANCE",
      lastGenerated: "2026-07-20",
      recordCount: "11 adjourned",
    },
  ];

  const recentExports = [
    {
      title: "Chieftaincy Dispute Statistics — July 2026",
      format: "PDF",
      generatedBy: "Admin",
      date: "2026-08-12 · 08:42 AM",
      size: "2.4 MB",
    },
    {
      title: "Panel Sitting Efficiency Report — Q2 2026",
      format: "PDF",
      generatedBy: "Registrar",
      date: "2026-07-28 · 03:15 PM",
      size: "1.1 MB",
    },
    {
      title: "Registry Documents Audit — August 2026",
      format: "CSV",
      generatedBy: "Admin",
      date: "2026-08-05 · 11:00 AM",
      size: "480 KB",
    },
    {
      title: "Case Status Breakdown — Full Register",
      format: "CSV",
      generatedBy: "Admin",
      date: "2026-07-15 · 09:20 AM",
      size: "820 KB",
    },
  ];

  const tagColors: Record<string, { bg: string; color: string }> = {
    ANALYTICS: { bg: "var(--primary-light)", color: "var(--primary)" },
    REGISTRY: { bg: "var(--success-light)", color: "var(--success)" },
    PERFORMANCE: { bg: "var(--warning-light)", color: "var(--warning)" },
    AUDIT: { bg: "var(--danger-light)", color: "var(--danger)" },
    GAZETTE: { bg: "#f3e8ff", color: "#7c3aed" },
  };

  return (
    <main>
      {/* 1. Welcome Header */}
      <div
        className="row-between"
        style={{ borderBottom: "1px solid var(--border)", paddingBottom: "24px", marginBottom: "36px" }}
      >
        <div>
          <h1 className="page-title">Reports & System Logs</h1>
          <p className="page-subtitle">
            Extract analytics data, print cause lists, and review chieftaincy council performance indexes.
          </p>
        </div>
        <button
          className="button"
          style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}
        >
          <span>📊</span> Schedule Report
        </button>
      </div>

      {/* 2. Context Summary Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {summaryStats.map((stat, i) => (
          <div
            key={i}
            className="card stat-card"
            style={{ borderLeftColor: stat.color }}
          >
            <span
              style={{ fontSize: "12px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}
            >
              {stat.label}
            </span>
            <p style={{ margin: "6px 0 0", fontSize: "30px", fontWeight: 800, color: "var(--foreground)", lineHeight: 1.1 }}>
              {stat.value}
            </p>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--muted)" }}>{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* 3. Smart Filter Bar */}
      <div className="card" style={{ marginBottom: "28px", padding: "18px 24px" }}>
        <form style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: 2, minWidth: "220px" }}>
            <input
              placeholder="Search reports by name or category..."
              className="input"
              style={{ width: "100%", background: "#fff" }}
            />
          </div>
          <div style={{ minWidth: "160px" }}>
            <select className="input" style={{ background: "#fff" }}>
              <option value="">All Categories</option>
              <option value="ANALYTICS">Analytics</option>
              <option value="REGISTRY">Registry</option>
              <option value="PERFORMANCE">Performance</option>
              <option value="AUDIT">Audit</option>
              <option value="GAZETTE">Gazette</option>
            </select>
          </div>
          <div style={{ minWidth: "160px" }}>
            <select className="input" style={{ background: "#fff" }}>
              <option value="">All Formats</option>
              <option value="PDF">PDF Reports</option>
              <option value="CSV">CSV / Excel Export</option>
            </select>
          </div>
          <button type="submit" className="button secondary-button" style={{ padding: "11px 20px", flexShrink: 0 }}>
            Filter
          </button>
        </form>
      </div>

      {/* 4. Reports Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "24px",
          marginBottom: "48px",
        }}
      >
        {reportCategories.map((rep, i) => {
          const tag = tagColors[rep.tag] ?? tagColors.ANALYTICS;
          return (
            <div
              key={i}
              className="card"
              style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}
            >
              <div>
                {/* Icon + Tag Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "12px",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    {rep.icon}
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      background: tag.bg,
                      color: tag.color,
                      padding: "4px 10px",
                      borderRadius: "20px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {rep.tag}
                  </span>
                </div>

                <h3 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: 700, color: "var(--foreground)" }}>
                  {rep.title}
                </h3>
                <p style={{ margin: "0 0 16px", fontSize: "14px", color: "var(--muted)", lineHeight: 1.6 }}>
                  {rep.desc}
                </p>

                {/* Meta */}
                <div
                  style={{ display: "flex", gap: "16px", fontSize: "12px", color: "var(--muted)", marginBottom: "16px" }}
                >
                  <span>📅 Last: {rep.lastGenerated}</span>
                  <span>📂 {rep.recordCount}</span>
                </div>
              </div>

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  borderTop: "1px solid var(--border)",
                  paddingTop: "16px",
                  marginTop: "auto",
                }}
              >
                <button className="button" style={{ flex: 1, padding: "8px 14px", fontSize: "13px" }}>
                  📄 Generate PDF
                </button>
                <button
                  className="button secondary-button"
                  style={{ flex: 1, padding: "8px 14px", fontSize: "13px" }}
                >
                  📊 Export CSV
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Recent Exports */}
      <div>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 700,
            marginBottom: "20px",
            paddingBottom: "12px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          Recent Exports
        </h2>
        <div className="card table-wrap" style={{ padding: "0" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Report Title</th>
                <th>Format</th>
                <th>Generated By</th>
                <th>Date & Time</th>
                <th>File Size</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentExports.map((exp, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, fontSize: "14px" }}>{exp.title}</td>
                  <td>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        background: exp.format === "PDF" ? "var(--danger-light)" : "var(--success-light)",
                        color: exp.format === "PDF" ? "var(--danger)" : "var(--success)",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        textTransform: "uppercase",
                      }}
                    >
                      {exp.format}
                    </span>
                  </td>
                  <td>{exp.generatedBy}</td>
                  <td style={{ fontSize: "13px", color: "var(--muted)" }}>{exp.date}</td>
                  <td style={{ fontSize: "13px", color: "var(--muted)" }}>{exp.size}</td>
                  <td style={{ textAlign: "right" }}>
                    <button className="link-button" style={{ fontSize: "13px", fontWeight: 600 }}>
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
