import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export default async function CaseDetailsPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { tab = "overview" } = await searchParams;

  const caseInfo = {
    id,
    caseNumber: "VRHC-JC-2026-0004",
    title: "Togbe Afede XIV & Ors v. Paramount Stool Claimant",
    type: "Stool Dispute",
    traditionalArea: "Asogli Traditional Area",
    district: "Ho Municipal District",
    filingDate: "2026-04-12",
    status: "HEARINGS",
    description: "A petition challenging the eligibility criteria applied by the kingmakers in selecting the successor to the Asogli paramount stool, alleging violations of customary succession procedures and traditional rites.",
    panel: "Judicial Committee Panel B (Nene Kojo III, Togbe Dzaba IV)",
  };

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "parties", label: "Parties Involved" },
    { key: "documents", label: "Documents (3)" },
    { key: "hearings", label: "Hearings Schedule" },
    { key: "judgments", label: "Judgment & Ruling" },
    { key: "appeals", label: "Appeals Tracking" },
  ];

  return (
    <main>
      {/* Back to list */}
      <Link href="/cases" className="back-link">
        <span style={{ fontSize: "16px" }}>←</span> Back to Cases List
      </Link>

      {/* 1. Header Folder Title */}
      <div style={{ marginBottom: "36px", paddingBottom: "24px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
          <span style={{
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "var(--primary)",
            background: "var(--primary-light)",
            padding: "4px 10px",
            borderRadius: "4px"
          }}>
            {caseInfo.caseNumber}
          </span>
          <span className="status-badge status-progress">{caseInfo.status}</span>
        </div>
        <h1 className="page-title" style={{ fontSize: "28px", fontWeight: 700 }}>{caseInfo.title}</h1>
        <p className="page-subtitle" style={{ marginTop: "6px" }}>
          Paramountcy jurisdiction: <strong>{caseInfo.traditionalArea}</strong> · Filed on {caseInfo.filingDate}
        </p>
      </div>

      {/* 2. Visual Case Folder Tab Headers */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border)", gap: "8px", marginBottom: "28px", overflowX: "auto", paddingBottom: "1px" }}>
        {tabs.map((t) => {
          const active = tab === t.key;
          return (
            <Link
              key={t.key}
              href={`?tab=${t.key}`}
              style={{
                padding: "12px 20px",
                fontWeight: 600,
                fontSize: "16px",
                color: active ? "var(--primary)" : "var(--muted)",
                borderBottom: active ? "3px solid var(--primary)" : "3px solid transparent",
                marginBottom: "-1px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "var(--transition)"
              }}
            >
              {t.label}
            </Link>
          );
        })}
      </div>

      {/* 3. Tab Contents */}
      <div className="card" style={{ padding: "32px" }}>
        {tab === "overview" && (
          <div>
            <h3 style={{ margin: "0 0 16px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>Petition Case Overview</h3>
            <p style={{ fontSize: "17px", color: "var(--foreground)", lineHeight: 1.6, marginBottom: "24px" }}>
              {caseInfo.description}
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
              <div>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Dispute Nature</span>
                <p style={{ margin: "4px 0 0", fontSize: "17px", fontWeight: 600 }}>{caseInfo.type}</p>
              </div>
              <div>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Traditional Area</span>
                <p style={{ margin: "4px 0 0", fontSize: "17px", fontWeight: 600 }}>{caseInfo.traditionalArea} ({caseInfo.district})</p>
              </div>
              <div>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Assigned Judicial Panel</span>
                <p style={{ margin: "4px 0 0", fontSize: "17px", fontWeight: 600 }}>{caseInfo.panel}</p>
              </div>
            </div>
          </div>
        )}

        {tab === "parties" && (
          <div>
            <h3 style={{ margin: "0 0 16px", fontSize: "20px", fontWeight: 700 }}>Litigant Parties</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div className="card" style={{ background: "#f8fafc", padding: "20px 24px" }}>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase" }}>Petitioners (Claimants)</span>
                <h4 style={{ margin: "8px 0 4px", fontSize: "19px", fontWeight: 700 }}>Togbe Afede XIV & Elders</h4>
                <p style={{ margin: 0, fontSize: "15px", color: "var(--muted)" }}>Asogli Stool Palace, Ho West District</p>
              </div>
              <div className="card" style={{ background: "#f8fafc", padding: "20px 24px" }}>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--warning)", textTransform: "uppercase" }}>Respondents (Defendants)</span>
                <h4 style={{ margin: "8px 0 4px", fontSize: "19px", fontWeight: 700 }}>Stool Claimant Nominee & Kingmakers Council</h4>
                <p style={{ margin: 0, fontSize: "15px", color: "var(--muted)" }}>Asogli Paramount Secretariat, Ho</p>
              </div>
            </div>
          </div>
        )}

        {tab === "documents" && (
          <div>
            <h3 style={{ margin: "0 0 16px", fontSize: "20px", fontWeight: 700 }}>Attached Filing Documents</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "17px" }}>Original_Petition_Asogli_Stool.pdf</div>
                  <div style={{ fontSize: "14px", color: "var(--muted)" }}>1.4 MB · Uploaded by Registrar on 2026-04-12</div>
                </div>
                <button className="button secondary-button" style={{ padding: "6px 14px", fontSize: "14px" }}>Download</button>
              </div>
              <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "17px" }}>Customary_Succession_Declaration_1984.pdf</div>
                  <div style={{ fontSize: "14px", color: "var(--muted)" }}>840 KB · Uploaded by Petitioner on 2026-04-19</div>
                </div>
                <button className="button secondary-button" style={{ padding: "6px 14px", fontSize: "14px" }}>Download</button>
              </div>
            </div>
          </div>
        )}

        {tab === "hearings" && (
          <div>
            <h3 style={{ margin: "0 0 16px", fontSize: "20px", fontWeight: 700 }}>Hearings & Panel Sittings</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="card" style={{ borderLeft: "4px solid var(--warning)", paddingLeft: "20px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--warning)", textTransform: "uppercase" }}>Scheduled Sitting</span>
                <h4 style={{ margin: "4px 0", fontSize: "18px", fontWeight: 700 }}>Hearing Session: Customary Arguments</h4>
                <p style={{ margin: 0, fontSize: "15px", color: "var(--muted)" }}>August 24, 2026 at 10:00 AM · VRHC Courtroom, Ho</p>
              </div>
              <div className="card" style={{ borderLeft: "4px solid var(--success)", paddingLeft: "20px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--success)", textTransform: "uppercase" }}>Concluded Sitting</span>
                <h4 style={{ margin: "4px 0", fontSize: "18px", fontWeight: 700 }}>Preliminary Objections Ruling</h4>
                <p style={{ margin: 0, fontSize: "15px", color: "var(--muted)" }}>May 18, 2026 · Minutes attached</p>
              </div>
            </div>
          </div>
        )}

        {tab === "judgments" && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <span style={{ fontSize: "40px" }}>⚖️</span>
            <h3 style={{ marginTop: "16px", fontSize: "20px", fontWeight: 700 }}>No Judgment Recorded</h3>
            <p style={{ color: "var(--muted)", maxWidth: "480px", margin: "8px auto 0", fontSize: "16px", lineHeight: 1.5 }}>
              This case is currently ongoing in sittings. Rulings will be uploaded once they are finalized by the Judicial Panel.
            </p>
          </div>
        )}

        {tab === "appeals" && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <span style={{ fontSize: "40px" }}>🏛️</span>
            <h3 style={{ marginTop: "16px", fontSize: "20px", fontWeight: 700 }}>No Appeals Lodged</h3>
            <p style={{ color: "var(--muted)", maxWidth: "480px", margin: "8px auto 0", fontSize: "16px", lineHeight: 1.5 }}>
              No appeal filings have been registered for this stool dispute. Appeals can only be entered following the release of the final judgment ruling.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
