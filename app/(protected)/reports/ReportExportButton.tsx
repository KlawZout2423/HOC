"use client";

import { useState } from "react";

interface ReportExportButtonProps {
  currentQuarter: string;
  currentYear: number;
}

export function ReportExportButton({ currentQuarter, currentYear }: ReportExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportWordDoc = () => {
    setIsExporting(true);

    const docHeader = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>VRHC ${currentQuarter} Chieftaincy Cases Report ${currentYear}</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; color: #1e293b; line-height: 1.4; margin: 20pt; }
          h1 { color: #1e3a8a; font-size: 18pt; font-weight: bold; text-align: center; text-transform: uppercase; margin-bottom: 4pt; }
          h2 { color: #0f172a; font-size: 13pt; font-weight: bold; margin-top: 16pt; margin-bottom: 6pt; border-bottom: 2pt solid #1e3a8a; padding-bottom: 2pt; }
          .subtitle { text-align: center; font-size: 12pt; font-weight: bold; color: #475569; margin-bottom: 16pt; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 16pt; font-size: 10pt; }
          th { background-color: #1e3a8a; color: #ffffff; font-weight: bold; padding: 6pt; text-align: left; border: 1pt solid #cbd5e1; }
          td { padding: 6pt; border: 1pt solid #cbd5e1; vertical-align: top; }
          tr:nth-child(even) { background-color: #f8fafc; }
          .stat-table th { background-color: #334155; }
          .alert-box { background-color: #fef3c7; border: 1pt solid #fcd34d; border-left: 4pt solid #d97706; padding: 10pt; margin-bottom: 16pt; }
          .alert-title { color: #92400e; font-weight: bold; font-size: 11pt; margin-bottom: 4pt; }
          .badge-petition { color: #1e3a8a; font-weight: bold; }
          .badge-appeal { color: #d97706; font-weight: bold; }
        </style>
      </head>
      <body>
    `;

    const docBody = `
      <h1>VOLTA REGIONAL HOUSE OF CHIEFS — SECRETARIAT</h1>
      <div className="subtitle">${currentQuarter} REPORTING ON CHIEFTAINCY CASES (${currentYear})</div>

      <h2>SUMMARY OF CHIEFTAINCY DISPUTES (${currentQuarter})</h2>
      <table border="1" cellspacing="0" cellpadding="6">
        <thead>
          <tr>
            <th>NUMBER OF CASES BROUGHT FORWARD FROM PREVIOUS YEAR (${currentYear - 1})</th>
            <th>NUMBER OF CASES RECEIVED IN REPORTING QUARTER</th>
            <th>TOTAL NUMBER OF CASES</th>
            <th>NUMBER OF JUDICIAL COMMITTEE SITTINGS HELD</th>
            <th>NUMBER OF CASES DISPOSED OFF</th>
            <th>NUMBER OF CASES PENDING</th>
          </tr>
        </thead>
        <tbody>
          <tr style="text-align: center; font-weight: bold; font-size: 12pt;">
            <td>40</td>
            <td>2</td>
            <td>42</td>
            <td>-</td>
            <td>0 (Nil)</td>
            <td>42</td>
          </tr>
        </tbody>
      </table>

      <div class="alert-box">
        <div class="alert-title">N:B INHIBITING FACTORS LOGGED IN REPORTING PERIOD:</div>
        <ol style="margin-top: 4pt; margin-bottom: 0; padding-left: 20pt; font-weight: bold; color: #78350f;">
          <li>INADEQUATE STAFFING ACROSS SECRETARIAT</li>
          <li>REMUNERATION OF COUNSEL TO THE HOUSE</li>
        </ol>
      </div>

      <h2>TABLE 2: CASES RECEIVED IN THE REPORTING PERIOD (${currentQuarter})</h2>
      <table border="1" cellspacing="0" cellpadding="6">
        <thead>
          <tr>
            <th style="width: 22%;">TITLE OF CASE</th>
            <th style="width: 10%;">TRAD AREA</th>
            <th style="width: 10%;">DIVISION & TOWN</th>
            <th style="width: 8%;">NATURE OF CASE</th>
            <th style="width: 12%;">IF APPEAL STATE DECISION OF TRAD. COUNCIL</th>
            <th style="width: 10%;">DATE FILED</th>
            <th style="width: 20%;">RELIEFS SOUGHT BY PETITIONER OR APPELLANT</th>
            <th style="width: 8%;">REMARKS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>JOHN H.M. NYONATOR & 2 ORS</b><br>VRS<br><b>TOGBE ADZA KWADZO III</b></td>
            <td>ZIAVI</td>
            <td>ZIAVI</td>
            <td><span class="badge-petition">PETITION</span></td>
            <td>N/A</td>
            <td>23/01/${currentYear}</td>
            <td>A declaration that the purported letter written by the respondent to delete the name of Togbe Wu Adza-Wugah III from National Register of Chiefs is void and no legal effect.</td>
            <td style="color: #d97706; font-weight: bold;">Date yet to be fixed</td>
          </tr>
          <tr>
            <td><b>EMMANUEL KWASI NORGBEY & 4 ORS</b><br>VRS<br><b>GEORGE KOFI AGBAGBA & 1 OR</b></td>
            <td>ZIAVI</td>
            <td>ZIAVI</td>
            <td><span class="badge-petition">PETITION</span></td>
            <td>N/A</td>
            <td>06/02/${currentYear}</td>
            <td>A declaration that Tsadaviefe Royal clan of Ziavi Dzogbe is the original, exclusive royal family of Ziavi Paramount Stool with sole authority to nominate, elect and enstool a Paramount Chief.</td>
            <td style="color: #d97706; font-weight: bold;">Date yet to be fixed</td>
          </tr>
        </tbody>
      </table>

      <h2>TABLE 4: FOCUS ON CASES HEARD BUT PENDING (${currentQuarter})</h2>
      <table border="1" cellspacing="0" cellpadding="6">
        <thead>
          <tr>
            <th style="width: 25%;">TITLE OF CASE</th>
            <th style="width: 12%;">TRAD AREA</th>
            <th style="width: 10%;">NATURE</th>
            <th style="width: 10%;">DATE FILED</th>
            <th style="width: 8%; text-align: center;">SITTINGS</th>
            <th style="width: 35%;">LAST DIRECTIVE / DECISION TAKEN BY COMMITTEE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>Emil Agbeteti & 3 Ors v. Stephen Kofi Howusu & 8 Ors</b></td>
            <td>Akpini (Kpando)</td>
            <td>PETITION</td>
            <td>26/01/2022</td>
            <td style="text-align: center; font-weight: bold;">9</td>
            <td>Ruling on motion to dismiss suit for lack of capacity to be delivered on 04/11/2025</td>
          </tr>
          <tr>
            <td><b>Hlortator Dawusu Amezugbe Jonathan & 3 Ors v. John Kofi Avusu & 3 Ors</b></td>
            <td>Torgorme</td>
            <td>PETITION</td>
            <td>27/11/2024</td>
            <td style="text-align: center; font-weight: bold;">5</td>
            <td>Petitioners directed to amend petition pursuant to order granted joining 4 others</td>
          </tr>
          <tr>
            <td><b>Christian Kobla Tettey & 4 Ors v. Togbi Zewu IV & 3 Ors</b></td>
            <td>Anlo (Lashibi)</td>
            <td>APPEAL</td>
            <td>10/05/2024</td>
            <td style="text-align: center; font-weight: bold;">2</td>
            <td>Judgment to be delivered on 24/10/2025</td>
          </tr>
          <tr>
            <td><b>Togbe Korbla Adzoyi & 6 Ors v. Tator Agbodemegbe & 4 Ors</b></td>
            <td>Agave</td>
            <td>PETITION</td>
            <td>10/12/2013</td>
            <td style="text-align: center; font-weight: bold; color: #b91c1c;">62</td>
            <td>Continuation of Trial</td>
          </tr>
          <tr>
            <td><b>Godson Kwaku Amekah of Gorkpo-Dofor v. Togbe Akitisu Tette & 4 Ors</b></td>
            <td>Doffor</td>
            <td>PETITION</td>
            <td>30/01/2015</td>
            <td style="text-align: center; font-weight: bold; color: #b91c1c;">43</td>
            <td>Continuation of trial on 05/11/2025</td>
          </tr>
          <tr>
            <td><b>Togbe Kungabi V & 3 Ors v. George Prika & 4 Ors</b></td>
            <td>Sovie</td>
            <td>PETITION</td>
            <td>15/10/2015</td>
            <td style="text-align: center; font-weight: bold;">26</td>
            <td>Proceedings to be adopted following reconstitution of Judicial Committee</td>
          </tr>
        </tbody>
      </table>

      <h2>TABLE 5: CASES BEFORE TRADITIONAL COUNCILS JUDICIAL COMMITTEES</h2>
      <table border="1" cellspacing="0" cellpadding="6">
        <thead>
          <tr>
            <th>TRADITIONAL COUNCIL</th>
            <th style="text-align: center;">BROUGHT FORWARD</th>
            <th style="text-align: center;">RECEIVED Q1</th>
            <th style="text-align: center;">TOTAL CASES</th>
            <th style="text-align: center;">SITTINGS HELD</th>
            <th style="text-align: center;">DISPOSED Q1</th>
            <th style="text-align: center;">PENDING CASES</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Anlo Traditional Council</td><td align="center">6</td><td align="center">0</td><td align="center"><b>6</b></td><td align="center">6</td><td align="center">1</td><td align="center"><b>5</b></td></tr>
          <tr><td>Mafi Traditional Council</td><td align="center">5</td><td align="center">0</td><td align="center"><b>5</b></td><td align="center">4</td><td align="center">0</td><td align="center"><b>5</b></td></tr>
          <tr><td>Avenor Traditional Council</td><td align="center">3</td><td align="center">1</td><td align="center"><b>4</b></td><td align="center">0</td><td align="center">0</td><td align="center"><b>4</b></td></tr>
          <tr><td>Aflao Traditional Council</td><td align="center">4</td><td align="center">0</td><td align="center"><b>4</b></td><td align="center">2</td><td align="center">1</td><td align="center"><b>3</b></td></tr>
          <tr><td>Klikor Traditional Council</td><td align="center">2</td><td align="center">0</td><td align="center"><b>2</b></td><td align="center">0</td><td align="center">0</td><td align="center"><b>2</b></td></tr>
        </tbody>
      </table>

      <div style="margin-top: 30pt; font-size: 10pt; color: #64748b; border-top: 1pt solid #cbd5e1; padding-top: 8pt; text-align: right;">
        Report Generated by Volta Regional House of Chiefs Judicial & Registry Secretariat (VRHC-JRMS)
      </div>
    `;

    const docFooter = `</body></html>`;
    const sourceHTML = docHeader + docBody + docFooter;

    const blob = new Blob(["\ufeff" + sourceHTML], {
      type: "application/msword;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `VRHC_Chieftaincy_Cases_Report_${currentQuarter}_${currentYear}.doc`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    setTimeout(() => setIsExporting(false), 800);
  };

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <button
        type="button"
        onClick={handleExportWordDoc}
        disabled={isExporting}
        className="button"
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          background: "linear-gradient(135deg, #1e3a8a 0%, #172554 100%)",
          fontSize: "14px",
          padding: "9px 18px"
        }}
      >
        <span>📄</span> {isExporting ? "Generating Word Document..." : `Export ${currentQuarter} Word Report (.doc)`}
      </button>

      <button
        type="button"
        onClick={() => window.print()}
        className="button secondary-button"
        style={{ fontSize: "14px", padding: "9px 16px" }}
        title="Print or Save as PDF"
      >
        🖨️ Print / Save PDF
      </button>
    </div>
  );
}
