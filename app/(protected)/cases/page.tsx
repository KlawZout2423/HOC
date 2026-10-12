"use client";

import { useState } from "react";
import Link from "next/link";
import { getCurrentQuarter, getCurrentYear, calculateTimePending } from "../../lib/dateUtils";

interface CaseItem {
  id: string;
  caseNumber: string;
  title: string;
  traditionalArea: string;
  division: string;
  nature: string;
  filingDate: string;
  sittings: number;
  directive: string;
  status: string;
  relief: string;
}

export default function CasesPage() {
  const currentYear = getCurrentYear();
  const currentQuarter = getCurrentQuarter();

  const [selectedCaseForSittings, setSelectedCaseForSittings] = useState<CaseItem | null>(null);

  const stats = [
    { label: `Brought Forward (${currentYear - 1})`, value: "40", desc: `Regional cases from ${currentYear - 1}` },
    { label: `Received in ${currentQuarter}`, value: "2", desc: "Fresh petitions filed" },
    { label: "Active Cases", value: "42", desc: "Pending Regional docket" },
    { label: "Traditional Council Cases", value: "27", desc: "Across 13 Traditional Councils" },
  ];

  const reportCases: CaseItem[] = [
    {
      id: "case-q1-01",
      caseNumber: "VRHC/JC/2026/0001",
      title: "John H.M. Nyonator & 2 Ors v. Togbe Adza Kwadzo III",
      traditionalArea: "Ziavi",
      division: "Ziavi",
      nature: "PETITION",
      filingDate: `${currentYear}-01-23`,
      sittings: 0,
      directive: "Fresh Petition · Date yet to be fixed",
      status: "FILED",
      relief: "Declaration that letter written to delete Togbe Wu Adza-Wugah III from National Register of Chiefs is void & breaches natural justice."
    },
    {
      id: "case-q1-02",
      caseNumber: "VRHC/JC/2026/0002",
      title: "Emmanuel Kwasi Norgbey & 4 Ors v. George Kofi Agbagba & 1 Or",
      traditionalArea: "Ziavi",
      division: "Ziavi",
      nature: "PETITION",
      filingDate: `${currentYear}-02-06`,
      sittings: 0,
      directive: "Fresh Petition · Date yet to be fixed",
      status: "FILED",
      relief: "Declaration that Tsadaviefe Royal clan is original, exclusive royal family of Ziavi Paramount Stool with sole authority to enstool."
    },
    {
      id: "case-q1-03",
      caseNumber: "VRHC/JC/2022/0004",
      title: "Emil Agbeteti & 3 Ors v. Stephen Kofi Howusu & 8 Ors",
      traditionalArea: "Akpini",
      division: "Kpando",
      nature: "PETITION",
      filingDate: "2022-01-26",
      sittings: 9,
      directive: "Ruling on motion to dismiss suit for lack of capacity to be delivered on 04/11/2025",
      status: "HEARINGS",
      relief: "Declaration that Respondents lack capacity to initiate moves for Paramount Chief installation & meeting at Dagadu Palace is void."
    },
    {
      id: "case-q1-04",
      caseNumber: "VRHC/JC/2024/0018",
      title: "Hlortator Dawusu Amezugbe Jonathan & 3 Ors v. John Kofi Avusu & 3 Ors",
      traditionalArea: "Torgorme",
      division: "Torgorme",
      nature: "PETITION",
      filingDate: "2024-11-27",
      sittings: 5,
      directive: "Petitioners directed to amend petition pursuant to order joining 4 others",
      status: "HEARINGS",
      relief: "Declaration that 4th Respondent's installation as Paramount Chief is null and void; perpetual injunction."
    },
    {
      id: "case-q1-05",
      caseNumber: "VRHC/JC/2024/0011",
      title: "Christian Kobla Tettey & 4 Ors v. Togbi Zewu IV & 3 Ors",
      traditionalArea: "Anlo",
      division: "Lashibi",
      nature: "APPEAL",
      filingDate: "2024-05-10",
      sittings: 2,
      directive: "Judgment to be delivered on 24/10/2025",
      status: "AWAITING_JUDGMENT",
      relief: "Appeal against Traditional Council decision regarding Lashibi stool succession."
    },
    {
      id: "case-q1-06",
      caseNumber: "VRHC/JC/2024/0014",
      title: "Fiator Cletus Kuzagbe & 2 Ors v. Torgbi Adzei & 2 Ors",
      traditionalArea: "Anlo",
      division: "Dekpor",
      nature: "APPEAL",
      filingDate: "2024-08-25",
      sittings: 3,
      directive: "Hearing of appeal records in progress",
      status: "HEARINGS",
      relief: "Appeal against Traditional Council ruling."
    },
    {
      id: "case-q1-07",
      caseNumber: "VRHC/JC/2023/0009",
      title: "Ametsitsia Robert Kwame Adzudzor & 2 Ors v. Delali Kofi Nutsukpo & 1 Or",
      traditionalArea: "Holuta",
      division: "Holuta",
      nature: "PETITION",
      filingDate: "2023-06-16",
      sittings: 9,
      directive: "Continuation of trial",
      status: "HEARINGS",
      relief: "Declaration that 1st Respondent is not Paramount Chief of Holuta and proper Chief must hail from appropriate lineage."
    },
    {
      id: "case-q1-08",
      caseNumber: "VRHC/JC/2023/0003",
      title: "Mensah Mawuse Komlatse & 2 Ors v. Zikpuitor Frank Gasese & 2 Ors",
      traditionalArea: "Ziope",
      division: "Ziope",
      nature: "PETITION",
      filingDate: "2023-02-16",
      sittings: 8,
      directive: "Directions on witness statements",
      status: "HEARINGS",
      relief: "Declaration that Respondents lack capacity under customary law to initiate moves for Paramount Chief installation."
    },
    {
      id: "case-q1-09",
      caseNumber: "VRHC/JC/2013/0001",
      title: "Togbe Korbla Adzoyi & 6 Ors v. Tator Agbodemegbe & 4 Ors",
      traditionalArea: "Agave",
      division: "Agave",
      nature: "PETITION",
      filingDate: "2013-12-10",
      sittings: 62,
      directive: "Continuation of Trial",
      status: "HEARINGS",
      relief: "Declaration that attempted installation of Hlilabo IV is void & Awuyibor family is rightful family to enstool."
    },
    {
      id: "case-q1-10",
      caseNumber: "VRHC/JC/2016/0002",
      title: "James Kofi Ameyevorwo & 5 Ors v. Herbert Robert Kwaku Deynu & 3 Ors",
      traditionalArea: "Somey",
      division: "Somey",
      nature: "PETITION",
      filingDate: "2016-01-11",
      sittings: 23,
      directive: "Motion to dismiss suit for lack of capacity to be moved",
      status: "HEARINGS",
      relief: "Order restraining Respondents from installing occupant to vacant Somey Paramount Stool without Petitioners."
    },
    {
      id: "case-q1-11",
      caseNumber: "VRHC/JC/2015/0008",
      title: "Togbe Kungabi V & 3 Ors v. George Prika & 4 Ors",
      traditionalArea: "Sovie",
      division: "Sovie",
      nature: "PETITION",
      filingDate: "2015-10-15",
      sittings: 26,
      directive: "Proceedings to be adopted following reconstitution of Judicial Committee",
      status: "HEARINGS",
      relief: "Declaration that 1st Respondent is not duly installed Paramount Chief & perpetual injunction on gazette notification."
    },
    {
      id: "case-q1-12",
      caseNumber: "VRHC/JC/2023/0006",
      title: "Togbui Agboka Sowu IV & 3 Ors v. Togbui Ahiabor Gamor V",
      traditionalArea: "Ave-Havi",
      division: "Ave-Havi",
      nature: "PETITION",
      filingDate: "2023-04-11",
      sittings: 11,
      directive: "Continuation of trial",
      status: "HEARINGS",
      relief: "Declaration that 1st Respondent's claim as Chief of Havi is false and 1st Petitioner is rightful Paramount Chief."
    },
    {
      id: "case-q1-13",
      caseNumber: "VRHC/JC/2020/0012",
      title: "Torgui Attah Kofi VII v. Torgbui Nyamekor Glakpe V & Mamaga Sotsimede Adziwe Sashikpe III v. Torgbui Atta Kofi VII",
      traditionalArea: "Ave-Dakpa",
      division: "Ave-Dakpa",
      nature: "PETITION",
      filingDate: "2020-10-15",
      sittings: 12,
      directive: "Application for direction and issues to be set down for trial",
      status: "HEARINGS",
      relief: "Declaration that succession to Paramount Chief/Queen Mother is by lineage & 1st Petitioner is substantive Paramount Queen."
    },
    {
      id: "case-q1-14",
      caseNumber: "VRHC/JC/2022/0015",
      title: "Torgbui Dzoku V & 2 Ors v. John Xorlali Adorvlo & 5 Ors",
      traditionalArea: "Dzodze",
      division: "Dzodze",
      nature: "PETITION",
      filingDate: "2022-10-31",
      sittings: 8,
      directive: "Parties are to file their memorandum of issues",
      status: "HEARINGS",
      relief: "Declaration that Togbui Dzoku V has been validly enstooled on Royal Dzoku Stool which is not available for installations."
    },
    {
      id: "case-q1-15",
      caseNumber: "VRHC/JC/2020/0007",
      title: "Zikpuitor Yao Tornyo & 2 Ors v. Torgbui Adzofia V & 1 Or",
      traditionalArea: "Dzodze",
      division: "Dzodze",
      nature: "PETITION",
      filingDate: "2020-08-19",
      sittings: 13,
      directive: "Petitioners to amend petition pursuant to joinder order granted",
      status: "HEARINGS",
      relief: "Declaration that Adisre Stool is senior stool with right to Fiaga status of Dzodze."
    },
    {
      id: "case-q1-16",
      caseNumber: "VRHC/JC/2019/0003",
      title: "Togbe Zogah II & 2 Ors v. Mishida Lagla & 2 Ors",
      traditionalArea: "Sokpoe",
      division: "Sokpoe",
      nature: "PETITION",
      filingDate: "2019-02-21",
      sittings: 26,
      directive: "Continuation of trial",
      status: "HEARINGS",
      relief: "Declaration that Fiaga stool of Sokpoe is Paramount Stool & 1st Petitioner is lawful Chief of Sokpoe."
    },
    {
      id: "case-q1-17",
      caseNumber: "VRHC/JC/2015/0002",
      title: "Godson Kwaku Amekah of Gorkpo-Dofor & 5 Ors v. Togbe Akitisu Tette of Tsikpoe-Dofor & 4 Ors",
      traditionalArea: "Doffor",
      division: "Doffor",
      nature: "PETITION",
      filingDate: "2015-01-30",
      sittings: 43,
      directive: "Continuation of trial on 05/11/2025",
      status: "HEARINGS",
      relief: "Declaration that nomination of Newton Anafi Dudgbor is void & Amekati family to enstool Togbega Kodey IV on Black Stool."
    },
    {
      id: "case-q1-18",
      caseNumber: "VRHC/JC/2023/0014",
      title: "Toegbui Addo VIII & 2 Ors v. Awoamefia Torgbui Sri III & 2 Ors",
      traditionalArea: "Anloga",
      division: "Anloga",
      nature: "PETITION",
      filingDate: "2023-09-04",
      sittings: 9,
      directive: "Trial to commence on 06/11/2025",
      status: "HEARINGS",
      relief: "Declaration that Dutor Torgbui Wenya I was leader of Anlo Ewes & customary overlord of Anloga and Anlo State/Kingdom."
    },
    {
      id: "case-q1-19",
      caseNumber: "VRHC/JC/2023/0007",
      title: "Christoph Kobla Ahiagba & 3 Ors v. Kodzo Gamadi & 1 Or",
      traditionalArea: "Aflao",
      division: "Aflao",
      nature: "PETITION",
      filingDate: "2023-05-05",
      sittings: 8,
      directive: "Continuation of trial on 06/11/2025",
      status: "HEARINGS",
      relief: "Declaration that Afla Royal Family Stool stands as Fiaga and Paramount Stool of Aflao & Togbuiga Afla Awunor Detu IX is true occupant."
    },
    {
      id: "case-q1-20",
      caseNumber: "VRHC/JC/2018/0010",
      title: "Midao Soworda Tsefote & 5 Ors v. Gabriel Kofi Kuma Glogo & 4 Ors",
      traditionalArea: "Weta",
      division: "Weta",
      nature: "PETITION",
      filingDate: "2018-08-13",
      sittings: 16,
      directive: "Continuation of trial on 3rd and 4th December, 2025",
      status: "HEARINGS",
      relief: "Declaration that 4th Defendant being descendant of female is not entitled to ascend to Ashiakpor Stool."
    },
    {
      id: "case-q1-21",
      caseNumber: "VRHC/JC/2024/0015",
      title: "Torgbui Hogbe Ezor II & 4 Ors v. Torgbui Addo VIII & 7 Ors",
      traditionalArea: "Klikor",
      division: "Adekpuigakope",
      nature: "PETITION",
      filingDate: "2024-09-04",
      sittings: 2,
      directive: "Ruling to be delivered on the question of jurisdiction on 05/11/2025",
      status: "HEARINGS",
      relief: "Injunction restraining Respondents from confinement/installation of 3rd Respondent as Divisional Chief of Adekpuigakope-Klikor."
    },
    {
      id: "case-q1-22",
      caseNumber: "VRHC/JC/2015/0004",
      title: "Alormatu Aziaku IV & 4 Ors v. Zikpuitor Besa Ditsa & 3 Ors & Togbega Agbekpo Assem IV v. Daniel Kwasi Blepony",
      traditionalArea: "Mafi",
      division: "Mafi",
      nature: "PETITION",
      filingDate: "2015-02-27",
      sittings: 10,
      directive: "Case adjourned sine-die; date fixed for return on 05/11/2025",
      status: "HEARINGS",
      relief: "Declaration that Torfi Kekpo clan is entitled to nominate/install candidate on paramount stool of Mafi & Bometsule Stool is installation stool."
    },
    {
      id: "case-q1-23",
      caseNumber: "VRHC/JC/2021/0011",
      title: "Dr. Michael Gbordzoe & 2 Ors v. Abusuapanyin Napoleon Mawusi & 3 Ors",
      traditionalArea: "Awate",
      division: "Awate",
      nature: "APPEAL",
      filingDate: "2021-09-10",
      sittings: 8,
      directive: "Judicial Committee directed that Appeal records be remitted back to Traditional Council for corrections under Act 759 section 57(1)",
      status: "HEARINGS",
      relief: "Appeal that lower Traditional Council judgment be set aside and judgment entered in favor of Defendants."
    },
    {
      id: "case-q1-24",
      caseNumber: "VRHC/JC/2021/0008",
      title: "Felix Osei v. Daniel Osei & 3 Ors",
      traditionalArea: "Awate",
      division: "Awate",
      nature: "PETITION",
      filingDate: "2021-08-05",
      sittings: 6,
      directive: "Mediator requested to mediate between parties; extension granted for amicable settlement",
      status: "HEARINGS",
      relief: "Declaration that as Zikpuitor/stool father of Noagbesenu Stool, Petitioner has authority to install candidate; Injunction."
    },
    {
      id: "case-q1-25",
      caseNumber: "VRHC/JC/2024/0002",
      title: "Togbe Aku Dompey XI & 3 Ors v. Togbe Kofi Dzede & 2 Ors",
      traditionalArea: "Kpeve",
      division: "Kpeve",
      nature: "PETITION",
      filingDate: "2024-01-25",
      sittings: 6,
      directive: "Parties are to return to court on 04/11/2025 for further directions",
      status: "HEARINGS",
      relief: "Declaration that 1st Petitioner is Paramount Chief of Kpeve Traditional Area & only Petitioner can install occupant on Gborxome divisional stool."
    },
  ];

  return (
    <main>
      {/* 1. Welcome Header */}
      <div className="row-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "24px", marginBottom: "36px" }}>
        <div>
          <h1 className="page-title">Judicial Cases Registry</h1>
          <p className="page-subtitle">
            Volta Regional House of Chiefs Judicial Docket ({currentQuarter} Active Cases Log)
          </p>
        </div>
        
        <Link href="/cases/create" className="button" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span>＋</span> Register New Case
        </Link>
      </div>

      {/* 2. Context Summary Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        {stats.map((stat, i) => (
          <div key={i} className="card stat-card" style={{ borderLeftColor: i === 0 ? "var(--primary)" : i === 1 ? "var(--warning)" : i === 2 ? "#1e3a8a" : "var(--success)" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.label}</span>
            <p style={{ margin: "4px 0 0", fontSize: "32px", fontWeight: 800, color: "var(--foreground)", lineHeight: 1.1 }}>{stat.value}</p>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--muted)" }}>{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* 3. Smart Filters */}
      <div className="card" style={{ marginBottom: "28px", padding: "20px 24px" }}>
        <form style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: 2, minWidth: "260px" }}>
            <input placeholder="Search by suit title, traditional area, division or relief..." className="input" style={{ width: "100%", background: "#fff" }} />
          </div>
          <div style={{ flex: 1, minWidth: "160px" }}>
            <select className="input" style={{ background: "#fff" }}>
              <option value="">All Nature (Petition / Appeal)</option>
              <option value="PETITION">PETITION</option>
              <option value="APPEAL">APPEAL</option>
            </select>
          </div>
          <div style={{ flex: 1, minWidth: "160px" }}>
            <select className="input" style={{ background: "#fff" }}>
              <option value="">All Traditional Areas</option>
              <option value="Ziavi">Ziavi</option>
              <option value="Akpini">Akpini (Kpando)</option>
              <option value="Anlo">Anlo</option>
              <option value="Torgorme">Torgorme</option>
              <option value="Holuta">Holuta</option>
              <option value="Ziope">Ziope</option>
              <option value="Agave">Agave</option>
              <option value="Somey">Somey</option>
              <option value="Sovie">Sovie</option>
              <option value="Ave-Havi">Ave-Havi</option>
              <option value="Ave-Dakpa">Ave-Dakpa</option>
              <option value="Dzodze">Dzodze</option>
              <option value="Sokpoe">Sokpoe</option>
              <option value="Doffor">Doffor</option>
              <option value="Anloga">Anloga</option>
              <option value="Aflao">Aflao</option>
              <option value="Weta">Weta</option>
              <option value="Klikor">Klikor</option>
              <option value="Mafi">Mafi</option>
              <option value="Awate">Awate</option>
              <option value="Kpeve">Kpeve</option>
            </select>
          </div>
          <button type="submit" className="button secondary-button" style={{ padding: "11px 20px" }}>
            Apply Filters
          </button>
        </form>
      </div>

      {/* 4. Main Table with Clickable Sittings Count Drawer */}
      <div className="card table-wrap" style={{ padding: "0" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Suit Number & Title</th>
              <th>Trad Area / Division</th>
              <th>Nature</th>
              <th>Filing Date & Age</th>
              <th style={{ textAlign: "center" }}>Sittings (Click to view)</th>
              <th>Reliefs Sought / Directive</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportCases.map((c) => {
              const timePending = calculateTimePending(c.filingDate);
              return (
                <tr key={c.id}>
                  <td style={{ maxWidth: "280px" }}>
                    <div style={{ fontWeight: 700, fontSize: "13px", color: "var(--primary)" }}>{c.caseNumber}</div>
                    <div style={{ fontWeight: 700, fontSize: "14px", color: "var(--foreground)", marginTop: "2px", lineHeight: 1.3 }}>{c.title}</div>
                  </td>
                  <td style={{ minWidth: "130px" }}>
                    <div style={{ fontWeight: 700, fontSize: "14px", color: "var(--foreground)" }}>{c.traditionalArea}</div>
                    <div style={{ fontSize: "12px", color: "var(--muted)" }}>Town: {c.division}</div>
                  </td>
                  <td>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "3px 8px",
                      borderRadius: "4px",
                      background: c.nature === "PETITION" ? "var(--primary-light)" : "var(--warning-light)",
                      color: c.nature === "PETITION" ? "var(--primary)" : "var(--warning)",
                    }}>
                      {c.nature}
                    </span>
                  </td>
                  <td style={{ fontSize: "13px", whiteSpace: "nowrap" }}>
                    <div style={{ fontWeight: 600, color: "var(--foreground)" }}>{c.filingDate}</div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--muted)", background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px", marginTop: "2px", display: "inline-block" }}>
                      ⏳ {timePending}
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      type="button"
                      onClick={() => setSelectedCaseForSittings(c)}
                      title="Click to view all sitting dates & minutes log"
                      style={{
                        background: c.sittings > 20 ? "var(--danger-light)" : "var(--primary-light)",
                        color: c.sittings > 20 ? "var(--danger)" : "var(--primary)",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        border: `1px solid ${c.sittings > 20 ? "var(--danger-mid)" : "var(--primary-mid)"}`,
                        cursor: "pointer",
                        fontWeight: 800,
                        fontSize: "12px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <span>📅</span> {c.sittings} sittings
                    </button>
                  </td>
                  <td style={{ maxWidth: "320px", fontSize: "13px" }}>
                    <div style={{ color: "var(--foreground)", lineHeight: 1.4, marginBottom: "4px" }}>
                      <strong style={{ color: "var(--primary)" }}>Relief:</strong> {c.relief}
                    </div>
                    <div style={{ fontSize: "12px", color: "#92400e", background: "#fef3c7", padding: "4px 8px", borderRadius: "4px", display: "inline-block" }}>
                      📌 {c.directive}
                    </div>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <Link href={`/cases/${c.id}`} className="link-button" style={{ fontSize: "13px", fontWeight: 700 }}>
                      Open Folder →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Interactive Sittings Log Modal Drawer ("Click on 10 and all sittings show") */}
      {selectedCaseForSittings && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(4px)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", padding: "20px"
        }}>
          <div className="card" style={{ maxWidth: "640px", width: "100%", maxHeight: "85vh", overflowY: "auto", padding: "28px", animation: "fadeInUp 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "1px" }}>
                  {selectedCaseForSittings.caseNumber} · {selectedCaseForSittings.traditionalArea}
                </span>
                <h3 style={{ margin: "4px 0 0", fontSize: "18px", fontWeight: 700, color: "var(--foreground)" }}>
                  Sittings Log ({selectedCaseForSittings.sittings} Sittings Held)
                </h3>
              </div>
              <button
                type="button"
                className="button secondary-button"
                style={{ padding: "4px 10px", fontSize: "14px" }}
                onClick={() => setSelectedCaseForSittings(null)}
              >
                ✕ Close
              </button>
            </div>

            <div style={{ marginBottom: "16px", background: "var(--bg)", padding: "12px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--foreground)" }}>{selectedCaseForSittings.title}</div>
              <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "4px" }}>
                <strong>Current Directive:</strong> {selectedCaseForSittings.directive}
              </div>
            </div>

            {selectedCaseForSittings.sittings === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0", color: "var(--muted)" }}>
                <span style={{ fontSize: "36px", display: "block", marginBottom: "8px" }}>📅</span>
                No sittings held yet. Fresh petition filed on {selectedCaseForSittings.filingDate}.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Historical Sittings & Panel Minutes Breakdown:
                </div>
                {Array.from({ length: Math.min(selectedCaseForSittings.sittings, 6) }).map((_, idx) => {
                  const sittingNum = selectedCaseForSittings.sittings - idx;
                  return (
                    <div key={idx} style={{
                      padding: "12px 16px",
                      background: "#fff",
                      border: "1px solid var(--border)",
                      borderLeft: `4px solid ${idx === 0 ? "var(--warning)" : "var(--primary)"}`,
                      borderRadius: "var(--radius-sm)",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--foreground)" }}>
                          Sitting #{sittingNum} — VRCC Courtroom, Ho
                        </span>
                        <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)" }}>
                          {idx === 0 ? "Latest Sitting" : `Sitting Record ${sittingNum}`}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: "12px", color: "var(--muted)", lineHeight: 1.5 }}>
                        {idx === 0
                          ? `Directive logged: "${selectedCaseForSittings.directive}". Panel presided at VRCC Courtroom.`
                          : `Sitting held before Judicial Committee Panel. Witness examination and legal arguments recorded.`}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            <div style={{ marginTop: "24px", paddingTop: "14px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                className="button"
                onClick={() => setSelectedCaseForSittings(null)}
                style={{ padding: "8px 20px" }}
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
