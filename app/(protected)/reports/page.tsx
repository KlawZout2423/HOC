import Link from "next/link";
import { getCurrentQuarter, getCurrentYear } from "../../lib/dateUtils";
import { ReportExportButton } from "./ReportExportButton";

export default async function ReportsPage() {
  const currentYear = getCurrentYear();
  const currentQuarter = getCurrentQuarter();

  const summaryStats = [
    { label: `Brought Forward (${currentYear - 1})`, value: "40", desc: `Cases from ${currentYear - 1}`, color: "var(--primary)" },
    { label: `Received in ${currentQuarter}`, value: "2", desc: "Fresh petitions filed", color: "var(--warning)" },
    { label: "Total Active Cases", value: "42", desc: "Regional House docket", color: "#1e3a8a" },
    { label: `Disposed in ${currentQuarter}`, value: "0", desc: "No cases disposed", color: "var(--muted)" },
    { label: "Pending Regional Cases", value: "42", desc: "Under active hearing", color: "var(--danger)" },
    { label: "Traditional Council Cases", value: "27", desc: "Across 13 Councils", color: "var(--success)" },
  ];

  const q1ReceivedCases = [
    {
      title: "John H.M. Nyonator & 2 Ors v. Togbe Adza Kwadzo III",
      traditionalArea: "Ziavi",
      division: "Ziavi",
      nature: "PETITION",
      dateFiled: `23/01/${currentYear}`,
      relief: "A declaration that letter written to delete Togbe Wu Adza-Wugah III from National Register of Chiefs is void & breaches natural justice.",
      remarks: "Date yet to be fixed"
    },
    {
      title: "Emmanuel Kwasi Norgbey & 4 Ors v. George Kofi Agbagba & 1 Or",
      traditionalArea: "Ziavi",
      division: "Ziavi",
      nature: "PETITION",
      dateFiled: `06/02/${currentYear}`,
      relief: "Declaration that Tsadaviefe Royal clan is original, exclusive royal family of Ziavi Paramount Stool with sole authority to enstool.",
      remarks: "Date yet to be fixed"
    },
  ];

  const q1PendingHeardCases = [
    { title: "Emil Agbeteti & 3 Ors v. Stephen Kofi Howusu & 8 Ors", area: "Akpini (Kpando)", nature: "PETITION", filed: "26/01/2022", sittings: 9, directive: "Ruling on motion to dismiss suit for lack of capacity to be delivered on 04/11/2025" },
    { title: "Hlortator Dawusu Amezugbe Jonathan & 3 Ors v. John Kofi Avusu & 3 Ors", area: "Torgorme", nature: "PETITION", filed: "27/11/2024", sittings: 5, directive: "Petitioners directed to amend petition pursuant to order granted joining 4 others" },
    { title: "Christian Kobla Tettey & 4 Ors v. Togbi Zewu IV & 3 Ors", area: "Anlo (Lashibi)", nature: "APPEAL", filed: "10/05/2024", sittings: 2, directive: "Judgment to be delivered on 24/10/2025" },
    { title: "Fiator Cletus Kuzagbe & 2 Ors v. Torgbi Adzei & 2 Ors", area: "Anlo (Dekpor)", nature: "APPEAL", filed: "25/08/2024", sittings: 3, directive: "Hearing of appeal records in progress" },
    { title: "Ametsitsia Robert Kwame Adzudzor & 2 Ors v. Delali Kofi Nutsukpo & 1 Or", area: "Holuta", nature: "PETITION", filed: "16/06/2023", sittings: 9, directive: "Continuation of trial" },
    { title: "Mensah Mawuse Komlatse & 2 Ors v. Zikpuitor Frank Gasese & 2 Ors", area: "Ziope", nature: "PETITION", filed: "16/02/2023", sittings: 8, directive: "Directions on witness statements" },
    { title: "Togbe Korbla Adzoyi & 6 Ors v. Tator Agbodemegbe & 4 Ors", area: "Agave", nature: "PETITION", filed: "10/12/2013", sittings: 62, directive: "Continuation of Trial" },
    { title: "James Kofi Ameyevorwo & 5 Ors v. Herbert Robert Kwaku Deynu & 3 Ors", area: "Somey", nature: "PETITION", filed: "11/01/2016", sittings: 23, directive: "A motion to dismiss the suit for lack of capacity to be moved" },
    { title: "Togbe Kungabi V & 3 Ors v. George Prika & 4 Ors", area: "Sovie", nature: "PETITION", filed: "15/10/2015", sittings: 26, directive: "Proceedings to be adopted following reconstitution of Judicial Committee" },
    { title: "Togbui Agboka Sowu IV & 3 Ors v. Togbui Ahiabor Gamor V", area: "Ave-Havi", nature: "PETITION", filed: "11/04/2023", sittings: 11, directive: "Continuation of trial" },
    { title: "Torgui Attah Kofi VII v. Torgbui Nyamekor Glakpe V & Mamaga Sotsimede Adziwe Sashikpe III v. Torgbui Atta Kofi VII", area: "Ave-Dakpa", nature: "PETITION", filed: "15/10/2020", sittings: 12, directive: "Application for direction and issues to be set down for trial" },
    { title: "Torgbui Dzoku V & 2 Ors v. John Xorlali Adorvlo & 5 Ors", area: "Dzodze", nature: "PETITION", filed: "31/10/2022", sittings: 8, directive: "Parties are to file their memorandum of issues" },
    { title: "Zikpuitor Yao Tornyo & 2 Ors v. Torgbui Adzofia V & 1 Or", area: "Dzodze", nature: "PETITION", filed: "19/08/2020", sittings: 13, directive: "Petitioners to amend petition pursuant to order for joinder granted" },
    { title: "Togbe Zogah II & 2 Ors v. Mishida Lagla & 2 Ors", area: "Sokpoe", nature: "PETITION", filed: "21/02/2019", sittings: 26, directive: "Continuation of trial" },
    { title: "Godson Kwaku Amekah of Gorkpo-Dofor & 5 Ors v. Togbe Akitisu Tette of Tsikpoe-Dofor & 4 Ors", area: "Doffor", nature: "PETITION", filed: "30/01/2015", sittings: 43, directive: "Continuation of trial on 05/11/2025" },
    { title: "Toegbui Addo VIII & 2 Ors v. Awoamefia Torgbui Sri III & 2 Ors", area: "Anloga", nature: "PETITION", filed: "04/09/2023", sittings: 9, directive: "Trial to commence on 06/11/2025" },
    { title: "Christoph Kobla Ahiagba & 3 Ors v. Kodzo Gamadi & 1 Or", area: "Aflao", nature: "PETITION", filed: "05/05/2023", sittings: 8, directive: "Continuation of trial on 06/11/2025" },
    { title: "Midao Soworda Tsefote & 5 Ors v. Gabriel Kofi Kuma Glogo & 4 Ors", area: "Weta", nature: "PETITION", filed: "13/08/2018", sittings: 16, directive: "Continuation of trial on 3rd and 4th December, 2025" },
    { title: "Torgbui Hogbe Ezor II & 4 Ors v. Torgbui Addo VIII & 7 Ors", area: "Klikor", nature: "PETITION", filed: "04/09/2024", sittings: 2, directive: "Ruling to be delivered on the question of jurisdiction on 05/11/2025" },
    { title: "Alormatu Aziaku IV & 4 Ors v. Zikpuitor Besa Ditsa & 3 Ors & Togbega Agbekpo Assem IV v. Daniel Kwasi Blepony", area: "Mafi", nature: "PETITION", filed: "27/02/2015", sittings: 10, directive: "Case adjourned sine-die; date fixed for return on 05/11/2025" },
    { title: "Dr. Michael Gbordzoe & 2 Ors v. Abusuapanyin Napoleon Mawusi & 3 Ors", area: "Awate", nature: "APPEAL", filed: "10/09/2021", sittings: 8, directive: "Judicial Committee directed that Appeal records be remitted back to Traditional Council for corrections" },
    { title: "Felix Osei v. Daniel Osei & 3 Ors", area: "Awate", nature: "PETITION", filed: "05/08/2021", sittings: 6, directive: "Mediator requested to mediate between parties; extension granted" },
    { title: "Togbe Aku Dompey XI & 3 Ors v. Togbe Kofi Dzede & 2 Ors", area: "Kpeve", nature: "PETITION", filed: "25/01/2024", sittings: 6, directive: "Parties to return to court on 04/11/2025 for further directions" },
  ];

  const traditionalCouncils = [
    { name: "Anlo Traditional Council", bf: 6, rec: 0, total: 6, sittings: 6, disposed: 1, pending: 5 },
    { name: "Mafi Traditional Council", bf: 5, rec: 0, total: 5, sittings: 4, disposed: 0, pending: 5 },
    { name: "Aveme Traditional Council", bf: 0, rec: 1, total: 1, sittings: 0, disposed: 0, pending: 1 },
    { name: "Avenor Traditional Council", bf: 3, rec: 1, total: 4, sittings: 0, disposed: 0, pending: 4 },
    { name: "Aflao Traditional Council", bf: 4, rec: 0, total: 4, sittings: 2, disposed: 1, pending: 3 },
    { name: "Battor Traditional Council", bf: 1, rec: 0, total: 1, sittings: 0, disposed: 0, pending: 1 },
    { name: "Havi Traditional Council", bf: 0, rec: 1, total: 1, sittings: 0, disposed: 0, pending: 1 },
    { name: "Some' Traditional Council", bf: 0, rec: 1, total: 1, sittings: 0, disposed: 0, pending: 1 },
    { name: "Klikor Traditional Council", bf: 2, rec: 0, total: 2, sittings: 0, disposed: 0, pending: 2 },
    { name: "Fievie Traditional Council", bf: 1, rec: 0, total: 1, sittings: 0, disposed: 0, pending: 1 },
    { name: "Fodome Traditional Council", bf: 1, rec: 0, total: 1, sittings: 0, disposed: 0, pending: 1 },
    { name: "Gbledi Traditional Council", bf: 1, rec: 0, total: 1, sittings: 0, disposed: 0, pending: 1 },
    { name: "Ziope Traditional Council", bf: 0, rec: 1, total: 1, sittings: 1, disposed: 0, pending: 1 },
  ];

  return (
    <main>
      {/* Header */}
      <div className="row-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "24px", marginBottom: "36px" }}>
        <div>
          <h1 className="page-title">{currentQuarter} Chieftaincy Cases Report</h1>
          <p className="page-subtitle">
            Official Judicial Reporting & Cases Breakdown — Volta Regional House of Chiefs & Traditional Councils ({currentYear})
          </p>
        </div>
        <ReportExportButton currentQuarter={currentQuarter} currentYear={currentYear} />
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "18px", marginBottom: "40px" }}>
        {summaryStats.map((stat, i) => (
          <div key={i} className="card stat-card" style={{ borderLeftColor: stat.color, padding: "18px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {stat.label}
            </span>
            <p style={{ margin: "4px 0 0", fontSize: "30px", fontWeight: 800, color: "var(--foreground)", lineHeight: 1.1 }}>
              {stat.value}
            </p>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--muted)" }}>{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Inhibiting Factors */}
      <div className="card" style={{ marginBottom: "36px", padding: "20px 24px", background: "#fffbeb", border: "1px solid #fef3c7", borderLeft: "5px solid var(--warning)" }}>
        <h3 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: 700, color: "#92400e" }}>
          N:B INHIBITING FACTORS LOGGED IN {currentQuarter}
        </h3>
        <ol style={{ margin: 0, paddingLeft: "20px", color: "#78350f", fontWeight: 600, fontSize: "14px", lineHeight: 1.6 }}>
          <li>INADEQUATE STAFFING</li>
          <li>REMUNERATION OF COUNSEL TO THE HOUSE</li>
        </ol>
      </div>

      {/* TABLE 2 — Cases Received in Reporting Period */}
      <div className="card" style={{ marginBottom: "36px", padding: "24px" }}>
        <div style={{ marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>
            TABLE 2: Cases Received in the Reporting Period ({currentQuarter})
          </h2>
        </div>
        <div className="table-wrap" style={{ padding: 0 }}>
          <table className="table">
            <thead>
              <tr>
                <th>Title of Case</th>
                <th>Trad Area / Division</th>
                <th>Nature</th>
                <th>Date Filed</th>
                <th>Reliefs Sought by Petitioner</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {q1ReceivedCases.map((c, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700, fontSize: "14px", color: "var(--foreground)" }}>{c.title}</td>
                  <td>{c.traditionalArea} ({c.division})</td>
                  <td><span className="status-badge status-pending">{c.nature}</span></td>
                  <td>{c.dateFiled}</td>
                  <td style={{ maxWidth: "340px", fontSize: "13px" }}>{c.relief}</td>
                  <td style={{ fontSize: "13px", fontWeight: 600, color: "var(--warning)" }}>{c.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TABLE 4 — Cases Heard But Pending */}
      <div className="card" style={{ marginBottom: "36px", padding: "24px" }}>
        <div style={{ marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>
              FOCUS: Cases Heard but Pending in Reporting Quarter ({currentQuarter})
            </h2>
            <p style={{ margin: "2px 0 0", fontSize: "13px", color: "var(--muted)" }}>
              No case was disposed of in the reporting period (0 Disposed)
            </p>
          </div>
          <span className="status-badge status-progress">23 Active Petitions/Appeals</span>
        </div>
        <div className="table-wrap" style={{ padding: 0 }}>
          <table className="table">
            <thead>
              <tr>
                <th>Title of Case</th>
                <th>Trad Area</th>
                <th>Nature</th>
                <th>Date Filed</th>
                <th style={{ textAlign: "center" }}>Sittings</th>
                <th>Last Directive / Decision Taken by Committee</th>
              </tr>
            </thead>
            <tbody>
              {q1PendingHeardCases.map((c, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, fontSize: "14px", maxWidth: "280px" }}>{c.title}</td>
                  <td>{c.area}</td>
                  <td>
                    <span className={`status-badge ${c.nature === "PETITION" ? "status-pending" : "status-progress"}`}>
                      {c.nature}
                    </span>
                  </td>
                  <td style={{ fontSize: "13px" }}>{c.filed}</td>
                  <td style={{ textAlign: "center", fontWeight: 800 }}>{c.sittings}</td>
                  <td style={{ maxWidth: "320px", fontSize: "13px", color: "#92400e" }}>
                    📌 {c.directive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TABLE 5 — Cases Before Traditional Councils */}
      <div className="card" style={{ padding: "24px" }}>
        <div style={{ marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>
              CASES BEFORE TRADITIONAL COUNCILS JUDICIAL COMMITTEES
            </h2>
            <p style={{ margin: "2px 0 0", fontSize: "13px", color: "var(--muted)" }}>
              Total number of Traditional Council cases in the Volta Region: 27 ({currentQuarter})
            </p>
          </div>
          <span className="status-badge status-done">27 Total Cases</span>
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
              {traditionalCouncils.map((tc, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700, fontSize: "14px" }}>{tc.name}</td>
                  <td style={{ textAlign: "center" }}>{tc.bf}</td>
                  <td style={{ textAlign: "center", fontWeight: tc.rec > 0 ? 700 : 400, color: tc.rec > 0 ? "var(--warning)" : "inherit" }}>{tc.rec}</td>
                  <td style={{ textAlign: "center", fontWeight: 700 }}>{tc.total}</td>
                  <td style={{ textAlign: "center" }}>{tc.sittings}</td>
                  <td style={{ textAlign: "center", fontWeight: tc.disposed > 0 ? 700 : 400, color: tc.disposed > 0 ? "var(--success)" : "inherit" }}>{tc.disposed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Judicial Performance Index (JPI) */}
      <div className="card" style={{ marginTop: "36px", padding: "24px", background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)", color: "#ffffff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 800, margin: 0, color: "#ffffff" }}>
              ⚡ Judicial Performance Index (JPI) Review — {currentQuarter}
            </h2>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#94a3b8" }}>
              Secretariat Performance Analytics & Judicial Committee Efficiency Tracking
            </p>
          </div>
          <span className="status-badge" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}>
            Quarterly Index: 88.4%
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          <div style={{ background: "rgba(255,255,255,0.06)", padding: "16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#cbd5e1", textTransform: "uppercase" }}>Notice Dispatch Rate</span>
            <p style={{ fontSize: "26px", fontWeight: 800, margin: "6px 0 0", color: "#38bdf8" }}>98.2%</p>
            <p style={{ fontSize: "12px", color: "#94a3b8", margin: "4px 0 0" }}>Dispatched 14+ days prior to sitting</p>
          </div>

          <div style={{ background: "rgba(255,255,255,0.06)", padding: "16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#cbd5e1", textTransform: "uppercase" }}>Average Sittings per Suit</span>
            <p style={{ fontSize: "26px", fontWeight: 800, margin: "6px 0 0", color: "#fbbf24" }}>12.4 Sittings</p>
            <p style={{ fontSize: "12px", color: "#94a3b8", margin: "4px 0 0" }}>Ranging from 2 to 62 sittings</p>
          </div>

          <div style={{ background: "rgba(255,255,255,0.06)", padding: "16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#cbd5e1", textTransform: "uppercase" }}>Primary Inhibiting Factor</span>
            <p style={{ fontSize: "18px", fontWeight: 700, margin: "6px 0 0", color: "#f87171" }}>Inadequate Counsel Remuneration</p>
            <p style={{ fontSize: "12px", color: "#94a3b8", margin: "4px 0 0" }}>Delayed sitting reconstitutions</p>
          </div>

          <div style={{ background: "rgba(255,255,255,0.06)", padding: "16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#cbd5e1", textTransform: "uppercase" }}>Traditional Area Coverage</span>
            <p style={{ fontSize: "26px", fontWeight: 800, margin: "6px 0 0", color: "#34d399" }}>13 Councils</p>
            <p style={{ fontSize: "12px", color: "#94a3b8", margin: "4px 0 0" }}>Active jurisdiction & reporting</p>
          </div>
        </div>
      </div>
    </main>
  );
}
