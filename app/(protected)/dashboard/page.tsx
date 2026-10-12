import { getSessionUser } from "../../lib/auth";
import Link from "next/link";
import { getCurrentQuarter, getCurrentYear, getFormattedToday, calculateTimePending } from "../../lib/dateUtils";

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) return null;

  const username = user.email.split("@")[0];
  const capitalizedUser = username.charAt(0).toUpperCase() + username.slice(1);

  const currentYear = getCurrentYear();
  const currentQuarter = getCurrentQuarter();
  const todayFormatted = getFormattedToday();

  // Dynamic greeting
  const now = new Date();
  const hour = now.getUTCHours() + 0;
  const greetingTime = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const dynamicGreeting = `${greetingTime}, ${capitalizedUser}`;

  // Table 1 — Quarterly Reporting Summary (Regional House Level)
  const q1SummaryStats = [
    { label: `Brought Forward (${currentYear - 1})`, value: "40", desc: `Cases from ${currentYear - 1}`, color: "var(--primary)" },
    { label: `Received in ${currentQuarter}`, value: "2", desc: "Fresh petitions filed", color: "var(--warning)" },
    { label: "Active Cases", value: "42", desc: "Regional House docket", color: "#1e3a8a" },
    { label: `Disposed in ${currentQuarter}`, value: "0", desc: "No cases closed", color: "var(--muted)" },
    { label: "Pending Regional Cases", value: "42", desc: "Under active hearing", color: "var(--danger)" },
  ];

  // Cases Received in Reporting Period (Table 2)
  const q1ReceivedCases = [
    {
      title: "John H.M. Nyonator & 2 Ors v. Togbe Adza Kwadzo III",
      traditionalArea: "Ziavi",
      division: "Ziavi",
      type: "PETITION",
      dateFiled: `${currentYear}-01-23`,
      timePending: calculateTimePending(`${currentYear}-01-23`),
      relief: "Declaration that letter written to delete Togbe Wu Adza-Wugah III from National Register of Chiefs is void & breaches natural justice.",
    },
    {
      title: "Emmanuel Kwasi Norgbey & 4 Ors v. George Kofi Agbagba & 1 Or",
      traditionalArea: "Ziavi",
      division: "Ziavi",
      type: "PETITION",
      dateFiled: `${currentYear}-02-06`,
      timePending: calculateTimePending(`${currentYear}-02-06`),
      relief: "Declaration that Tsadaviefe Royal clan is original, exclusive royal family of Ziavi Paramount Stool with sole authority to enstool.",
    },
  ];

  // High-Volume Active Hearings (Table 4 Highlights)
  const activeHearings = [
    {
      title: "Togbe Korbla Adzoyi & 6 Ors v. Tator Agbodemegbe & 4 Ors",
      traditionalArea: "Agave",
      sittings: "62 Sittings",
      dateFiled: "2013-12-10",
      timePending: calculateTimePending("2013-12-10"),
      directive: "Continuation of Trial",
    },
    {
      title: "Godson Kwaku Amekah v. Togbe Akitisu Tette & 4 Ors",
      traditionalArea: "Doffor",
      sittings: "43 Sittings",
      dateFiled: "2015-01-30",
      timePending: calculateTimePending("2015-01-30"),
      directive: "Continuation of Trial",
    },
    {
      title: "Togbe Kungabi V & 3 Ors v. George Prika & 4 Ors",
      traditionalArea: "Sovie",
      sittings: "26 Sittings",
      dateFiled: "2015-10-15",
      timePending: calculateTimePending("2015-10-15"),
      directive: "Proceedings adoption following Committee reconstitution",
    },
    {
      title: "Togbe Zogah II & 2 Ors v. Mishida Lagla & 2 Ors",
      traditionalArea: "Sokpoe",
      sittings: "26 Sittings",
      dateFiled: "2019-02-21",
      timePending: calculateTimePending("2019-02-21"),
      directive: "Continuation of Trial",
    },
    {
      title: "James Kofi Ameyevorwo & 5 Ors v. Herbert Robert Kwaku Deynu",
      traditionalArea: "Somey",
      sittings: "23 Sittings",
      dateFiled: "2016-01-11",
      timePending: calculateTimePending("2016-01-11"),
      directive: "Motion to dismiss for lack of capacity to be moved",
    },
  ];

  // Traditional Councils Judicial Committees Breakdown (27 cases across 13 Councils)
  const traditionalCouncilsData = [
    { council: "Anlo Traditional Council", broughtForward: 6, received: 0, total: 6, sittings: 6, disposed: 1, pending: 5 },
    { council: "Mafi Traditional Council", broughtForward: 5, received: 0, total: 5, sittings: 4, disposed: 0, pending: 5 },
    { council: "Avenor Traditional Council", broughtForward: 3, received: 1, total: 4, sittings: 0, disposed: 0, pending: 4 },
    { council: "Aflao Traditional Council", broughtForward: 4, received: 0, total: 4, sittings: 2, disposed: 1, pending: 3 },
    { council: "Klikor Traditional Council", broughtForward: 2, received: 0, total: 2, sittings: 0, disposed: 0, pending: 2 },
    { council: "Aveme Traditional Council", broughtForward: 0, received: 1, total: 1, sittings: 0, disposed: 0, pending: 1 },
    { council: "Battor Traditional Council", broughtForward: 1, received: 0, total: 1, sittings: 0, disposed: 0, pending: 1 },
    { council: "Havi Traditional Council", broughtForward: 0, received: 1, total: 1, sittings: 0, disposed: 0, pending: 1 },
    { council: "Some' Traditional Council", broughtForward: 0, received: 1, total: 1, sittings: 0, disposed: 0, pending: 1 },
    { council: "Fievie Traditional Council", broughtForward: 1, received: 0, total: 1, sittings: 0, disposed: 0, pending: 1 },
    { council: "Fodome Traditional Council", broughtForward: 1, received: 0, total: 1, sittings: 0, disposed: 0, pending: 1 },
    { council: "Gbledi Traditional Council", broughtForward: 1, received: 0, total: 1, sittings: 0, disposed: 0, pending: 1 },
    { council: "Ziope Traditional Council", broughtForward: 0, received: 1, total: 1, sittings: 1, disposed: 0, pending: 1 },
  ];

  return (
    <main className="cultural-bg-adinkrahene">
      {/* 1. Institutional Welcome Header */}
      <div style={{
        marginBottom: "24px",
        padding: "24px 28px",
        background: "linear-gradient(135deg, #991b1b 0%, #881337 40%, #4c0519 100%)",
        color: "white",
        borderRadius: "var(--radius)",
        boxShadow: "0 8px 24px rgba(153, 27, 27, 0.20)",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderLeft: "5px solid var(--warning)"
      }}>
        <div style={{
          position: "absolute", right: "3%", top: "50%", transform: "translateY(-50%)", fontSize: "90px", opacity: 0.06, fontWeight: 900, pointerEvents: "none", color: "#ffffff"
        }}>
          VRHC
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.2px", background: "rgba(251, 191, 36, 0.2)", color: "#fef08a", padding: "3px 10px", borderRadius: "20px", border: "1px solid rgba(251, 191, 36, 0.3)" }}>
            👑 {dynamicGreeting}
          </span>
        </div>
        
        <h1 style={{ fontSize: "25px", fontWeight: 800, margin: 0, lineHeight: 1.2, color: "#ffffff", letterSpacing: "-0.3px" }}>
          Volta Regional House of Chiefs
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#fecdd3", fontWeight: 500 }}>
          Chieftaincy Judicial & Registry Secretariat ({currentQuarter})
        </p>
        
        <div style={{ marginTop: "18px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", fontWeight: 600, color: "#ffe4e6" }}>
          <span>📅 {todayFormatted}</span>
          <span>🏛️ Venue: VRCC Courtroom, Ho & Regional Secretariat</span>
        </div>
      </div>

      {/* 2. Institutional Operational Inhibiting Factors Alert */}
      <div className="card" style={{
        marginBottom: "24px",
        padding: "16px 20px",
        background: "var(--warning-light)",
        border: "1px solid var(--warning-mid)",
        borderLeft: "4px solid var(--warning)"
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <span style={{ fontSize: "22px" }}>⚠️</span>
          <div>
            <h3 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 700, color: "#92400e" }}>
              Operational Inhibiting Factors ({currentQuarter} Log)
            </h3>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600, color: "#78350f" }}>
                <span>1.</span> Inadequate Staffing across Registry & Judicial Secretariat
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600, color: "#78350f" }}>
                <span>2.</span> Remuneration of Counsel to the Regional House
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Table 1 Metrics: Regional House Q1 Case Summary */}
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--foreground)", marginBottom: "14px" }}>
          Regional House Judicial Committee — {currentQuarter} Performance Summary
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
          {q1SummaryStats.map((stat, i) => (
            <div key={i} className="card stat-card" style={{ borderLeftColor: stat.color, padding: "16px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {stat.label}
              </span>
              <p style={{ margin: "4px 0 0", fontSize: "26px", fontWeight: 800, color: "var(--foreground)", lineHeight: 1.1 }}>
                {stat.value}
              </p>
              <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--muted)" }}>{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Row: Fresh Cases & High-Sittings Matters */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "28px", marginBottom: "36px", alignItems: "start" }}>
        
        {/* Table 2: Cases Received in Reporting Quarter */}
        <div className="card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingBottom: "14px", borderBottom: "1px solid var(--border)" }}>
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>Fresh Cases Received ({currentQuarter})</h2>
              <p style={{ margin: "2px 0 0", fontSize: "13px", color: "var(--muted)" }}>Petitions filed in {currentYear} reporting period</p>
            </div>
            <span className="status-badge status-pending" style={{ fontSize: "12px" }}>2 New Petitions</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {q1ReceivedCases.map((c, i) => (
              <div key={i} style={{
                padding: "16px",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase" }}>
                    {c.traditionalArea} Traditional Area · {c.division}
                  </span>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--muted)", background: "#e2e8f0", padding: "2px 6px", borderRadius: "4px" }}>
                    ⏳ {c.timePending}
                  </span>
                </div>
                <h4 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.4 }}>
                  {c.title}
                </h4>
                <p style={{ margin: 0, fontSize: "13px", color: "var(--muted)", lineHeight: 1.5 }}>
                  <strong style={{ color: "var(--foreground)" }}>Relief Sought:</strong> {c.relief}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "20px", borderTop: "1px solid var(--border)", paddingTop: "14px", textAlign: "right" }}>
            <Link href="/cases" className="link-button" style={{ fontWeight: 700, fontSize: "14px" }}>
              View All 42 Regional Cases →
            </Link>
          </div>
        </div>

        {/* Active Matters with High Sittings (Table 4 Excerpt) */}
        <div className="card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingBottom: "14px", borderBottom: "1px solid var(--border)" }}>
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>Active Hearing Directives</h2>
              <p style={{ margin: "2px 0 0", fontSize: "13px", color: "var(--muted)" }}>High-sitting petitions currently under trial</p>
            </div>
            <span className="status-badge status-progress" style={{ fontSize: "12px" }}>Table 4 Excerpt</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {activeHearings.map((h, i) => (
              <div key={i} style={{
                padding: "14px 16px",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "12px"
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, background: "var(--primary-light)", color: "var(--primary)", padding: "2px 6px", borderRadius: "4px" }}>
                      {h.sittings}
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)" }}>
                      ⏳ {h.timePending}
                    </span>
                  </div>
                  <h4 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 600, color: "var(--foreground)" }}>{h.title}</h4>
                  <p style={{ margin: 0, fontSize: "12px", color: "var(--muted)" }}>
                    📌 <strong style={{ color: "var(--foreground)" }}>Directive:</strong> {h.directive}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "20px", borderTop: "1px solid var(--border)", paddingTop: "14px", textAlign: "right" }}>
            <Link href="/hearings" className="link-button" style={{ fontWeight: 700, fontSize: "14px" }}>
              View Sitting Directives →
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Traditional Councils Breakdown (27 Cases across 13 Councils) */}
      <div className="card" style={{ padding: "28px", marginBottom: "36px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🏛️</span> Cases Before Traditional Councils
            </h2>
            <p style={{ margin: "4px 0 0", fontSize: "14px", color: "var(--muted)" }}>
              Total 27 cases active across 13 Traditional Councils in the Volta Region ({currentQuarter} Log)
            </p>
          </div>
          <span className="status-badge status-done" style={{ fontSize: "13px", padding: "6px 12px" }}>
            27 Total Council Cases
          </span>
        </div>

        <div className="table-wrap" style={{ padding: 0 }}>
          <table className="table">
            <thead>
              <tr>
                <th>Traditional Council</th>
                <th style={{ textAlign: "center" }}>Brought Forward</th>
                <th style={{ textAlign: "center" }}>Received Q1</th>
                <th style={{ textAlign: "center" }}>Total Cases</th>
                <th style={{ textAlign: "center" }}>Sittings Held</th>
                <th style={{ textAlign: "center" }}>Disposed Q1</th>
                <th style={{ textAlign: "center" }}>Pending Cases</th>
              </tr>
            </thead>
            <tbody>
              {traditionalCouncilsData.map((tc, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700, fontSize: "14px", color: "var(--foreground)" }}>{tc.council}</td>
                  <td style={{ textAlign: "center" }}>{tc.broughtForward}</td>
                  <td style={{ textAlign: "center", color: tc.received > 0 ? "var(--warning)" : "inherit", fontWeight: tc.received > 0 ? 700 : 400 }}>{tc.received}</td>
                  <td style={{ textAlign: "center", fontWeight: 700 }}>{tc.total}</td>
                  <td style={{ textAlign: "center" }}>{tc.sittings}</td>
                  <td style={{ textAlign: "center", color: tc.disposed > 0 ? "var(--success)" : "inherit", fontWeight: tc.disposed > 0 ? 700 : 400 }}>{tc.disposed}</td>
                  <td style={{ textAlign: "center", fontWeight: 700, color: "var(--primary)" }}>{tc.pending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
