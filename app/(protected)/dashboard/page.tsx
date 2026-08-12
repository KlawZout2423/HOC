import { getSessionUser } from "../../lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) return null;

  // Mock data for proceedings
  const todaysProceedings = [
    {
      caseNumber: "VRHC-JC-2026-0014",
      title: "Togbe Ayim III v. Paramount Stool Competitor",
      type: "Boundary dispute",
      panel: "Judicial Committee Panel A",
      time: "10:00 AM",
      location: "Main Court Hall, Ho",
    },
    {
      caseNumber: "VRHC-JC-2026-0008",
      title: "Paramount Queen Mother v. Elders Council",
      type: "Succession Dispute",
      panel: "Judicial Committee Panel B",
      time: "01:30 PM",
      location: "Main Court Hall, Ho",
    },
  ];

  const caseHealth = [
    { label: "Total Cases", value: "356", sub: "Disputes logged" },
    { label: "Active Matters", value: "135", sub: "Currently in trial", highlight: true },
    { label: "Disposed", value: "221", sub: "Past rulings archived" },
    { label: "Appeals Active", value: "42", sub: "Under committee review" },
  ];

  const traditionalOverview = [
    { label: "Registered Areas", value: "18", sub: "Traditional Councils" },
    { label: "Active Councils", value: "15", sub: "Gazetted stools" },
    { label: "Succession Matters", value: "23", sub: "Stools under dispute", warning: true },
  ];

  const quickActions = [
    { label: "Register New Case", desc: "Create a new judicial matter", href: "/cases/create", icon: "＋" },
    { label: "Upload Document", desc: "Index filings to case folders", href: "/registry", icon: "📤" },
    { label: "Schedule Hearing", desc: "Set committee panel sitting", href: "/hearings", icon: "📅" },
    { label: "Record Proceedings", desc: "Log minutes of active session", href: "/hearings", icon: "📝" },
    { label: "Generate Cause List", desc: "Publish scheduled list", href: "/hearings", icon: "📋" },
    { label: "Create Report", desc: "Export system performance logs", href: "/reports", icon: "📊" },
  ];

  const coreModules = [
    {
      title: "Judicial Cases",
      desc: "Manage chieftaincy disputes, succession, land boundaries and appeals.",
      icon: "⚖️",
      links: [
        { label: "New Cases", href: "/cases/create" },
        { label: "Active Cases", href: "/cases" },
        { label: "Hearings", href: "/hearings" },
        { label: "Judgments", href: "/judgments" },
        { label: "Appeals", href: "/appeals" },
      ],
    },
    {
      title: "Registry & Mail",
      desc: "Manage official correspondence, physical files routing and logs.",
      icon: "📂",
      links: [
        { label: "Incoming Documents", href: "/registry" },
        { label: "Outgoing Letters", href: "/registry" },
        { label: "File Tracking", href: "/registry" },
        { label: "Registry Archive", href: "/registry" },
      ],
    },
    {
      title: "Traditional Areas",
      desc: "Registry of paramount stools, traditional councils, and gazette details.",
      icon: "👑",
      links: [
        { label: "Paramount Stools", href: "/reports" },
        { label: "Traditional Councils", href: "/reports" },
        { label: "Chiefs Registry", href: "/reports" },
        { label: "Succession Lineages", href: "/reports" },
      ],
    },
    {
      title: "Judicial Panels",
      desc: "Manage judicial committees, panel members and case sittings.",
      icon: "🏛️",
      links: [
        { label: "Panel Chairmen", href: "/dashboard" },
        { label: "Committee Members", href: "/dashboard" },
        { label: "Assignments Log", href: "/dashboard" },
      ],
    },
  ];

  const archiveMemory = [
    { label: "Past Judgments", count: "148 records", href: "/judgments" },
    { label: "Customary Laws Reference", count: "18 regional codifications", href: "/reports" },
    { label: "Succession Records", count: "32 stools documented", href: "/reports" },
    { label: "Historical Case Files", count: "412 archived folders", href: "/registry" },
    { label: "Traditional Area Records", count: "18 paramountcies logged", href: "/reports" },
  ];

  return (
    <main className="cultural-bg-adinkrahene">
      {/* 1. Welcome / Institutional Header */}
      <div style={{
        marginBottom: "32px",
        padding: "36px 40px",
        background: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
        color: "white",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 10px 25px rgba(15, 23, 42, 0.15)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle decorative crest overlay */}
        <div style={{
          position: "absolute",
          right: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "120px",
          opacity: 0.05,
          fontWeight: 900,
          pointerEvents: "none"
        }}>
          VRHC
        </div>

        <span style={{
          fontSize: "12px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          color: "var(--warning)",
          marginBottom: "8px",
          display: "block"
        }}>
          Good Morning, Registrar
        </span>
        <h1 style={{ fontSize: "32px", fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
          Volta Regional House of Chiefs
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: "18px", opacity: 0.8, fontWeight: 500 }}>
          Judicial & Registry Command Centre
        </p>
        
        <div style={{
          marginTop: "24px",
          paddingTop: "16px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "14px",
          fontWeight: 500,
          opacity: 0.9
        }}>
          <span>📅 Thursday, 4 August 2026</span>
          <span>Institution: Ho Secretariat</span>
        </div>
      </div>

      {/* Grid: Proceedings and Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "28px", marginBottom: "32px", alignItems: "start" }}>
        
        {/* 2. Today's Proceedings */}
        <div className="card" style={{ padding: "24px", height: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, margin: 0 }}>Today's Proceedings</h2>
            <span className="status-badge status-progress" style={{ fontSize: "12px", padding: "4px 8px" }}>2 Scheduled Hearings</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {todaysProceedings.map((p, i) => (
              <div key={i} style={{
                padding: "16px",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px"
              }}>
                <div>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase" }}>{p.caseNumber}</span>
                  <h4 style={{ margin: "4px 0", fontSize: "16px", fontWeight: 600, color: "var(--foreground)" }}>{p.title}</h4>
                  <p style={{ margin: 0, fontSize: "14px", color: "var(--muted)" }}>Type: {p.type} · {p.panel}</p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--warning)" }}>{p.time}</div>
                  <div style={{ fontSize: "12px", color: "var(--muted)" }}>{p.location}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "20px", borderTop: "1px solid var(--border)", paddingTop: "16px", display: "flex", justifyContent: "flex-end" }}>
            <Link href="/hearings" className="link-button" style={{ fontWeight: 700, fontSize: "14px" }}>
              View Complete Cause List →
            </Link>
          </div>
        </div>

        {/* 5. Quick Action Center */}
        <div className="card" style={{ padding: "24px", height: "100%" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 20px", paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>
            Quick Action Center
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {quickActions.map((act, i) => (
              <Link key={i} href={act.href} style={{ textDecoration: "none" }}>
                <div className="card" style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  gap: "6px",
                  background: "var(--bg)",
                  height: "100%",
                  cursor: "pointer",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  boxShadow: "none",
                  transition: "var(--transition)"
                }}>
                  <span style={{ fontSize: "20px" }}>{act.icon}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px", textAlign: "left" }}>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", lineHeight: "1.2" }}>{act.label}</span>
                    <span style={{ fontSize: "12px", fontWeight: 400, color: "var(--muted)", lineHeight: "1.3" }}>{act.desc}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Judicial Overview and Traditional Authority Overview */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "28px", marginBottom: "32px" }}>
        
        {/* 3. Judicial Overview */}
        <div className="card" style={{ padding: "24px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 16px" }}>Judicial Case Health</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "16px" }}>
            {caseHealth.map((stat, i) => (
              <div key={i} className="card" style={{
                padding: "16px",
                borderLeft: stat.highlight ? "4px solid var(--warning)" : "1px solid var(--border)",
                background: "var(--bg)",
                boxShadow: "none",
                borderRadius: "var(--radius-sm)"
              }}>
                <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--muted)", textTransform: "uppercase" }}>{stat.label}</span>
                <p style={{ margin: "4px 0 0", fontSize: "32px", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.1 }}>{stat.value}</p>
                <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--muted)" }}>{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Traditional Authority Overview */}
        <div className="card" style={{ padding: "24px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 16px" }}>Traditional Councils & Stools</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "16px" }}>
            {traditionalOverview.map((stat, i) => (
              <div key={i} className="card" style={{
                padding: "16px",
                borderLeft: stat.warning ? "4px solid var(--danger)" : "1px solid var(--border)",
                background: "var(--bg)",
                boxShadow: "none",
                borderRadius: "var(--radius-sm)"
              }}>
                <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--muted)", textTransform: "uppercase" }}>{stat.label}</span>
                <p style={{ margin: "4px 0 0", fontSize: "32px", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.1 }}>{stat.value}</p>
                <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--muted)" }}>{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Core Modules & Institutional Memory */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "28px", alignItems: "start" }}>
        
        {/* Core Modules Grid */}
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--foreground)", marginBottom: "20px" }}>
            Enterprise Management Modules
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {coreModules.map((mod, i) => (
              <div key={i} className="card" style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%"
              }}>
                <div>
                  <div style={{ fontSize: "28px", marginBottom: "14px" }}>{mod.icon}</div>
                  <h4 style={{ fontSize: "16px", fontWeight: 600, margin: "0 0 8px" }}>{mod.title}</h4>
                  <p style={{ margin: "0 0 16px", fontSize: "14px", color: "var(--muted)", lineHeight: 1.5 }}>{mod.desc}</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
                  {mod.links.map((link, j) => (
                    <Link key={j} href={link.href} className="module-link-btn">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional Memory */}
        <div className="card" style={{ padding: "24px" }}>
          <div style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <span>📜</span> Institutional Memory
            </h3>
            <p style={{ margin: "4px 0 0", fontSize: "14px", color: "var(--muted)" }}>Historical records and customary precedents archives.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {archiveMemory.map((item, i) => (
              <Link key={i} href={item.href} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 14px",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  transition: "var(--transition)"
                }}>
                  <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--foreground)" }}>{item.label}</span>
                  <span className="status-badge" style={{ fontSize: "12px", fontWeight: 700, background: "var(--border)", color: "var(--muted)", padding: "2px 6px" }}>{item.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
