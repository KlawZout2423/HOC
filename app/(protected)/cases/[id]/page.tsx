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
    caseNumber: "VRHC-JC-2026-0001",
    title: "John H.M. Nyonator & 2 Ors v. Togbe Adza Kwadzo III",
    nature: "PETITION",
    traditionalArea: "Ziavi Traditional Area",
    division: "Ziavi Town",
    district: "Ho Municipal District",
    filingDate: "2026-01-23",
    status: "FILED",
    sittings: 0,
    directive: "Date yet to be fixed for preliminary directions sitting",
    reliefs: [
      "A declaration that the purported letter written by the respondent to delete the name of Togbe Wu Adza-Wugah III from National Register of Chiefs is void and no legal effect.",
      "A declaration that the purported letter written by respondent unilaterally to delete the name of Togbe Wu Adza-Wugah III from Register of Chiefs breaches the rules of natural justice."
    ],
    panel: "Judicial Committee Panel A (Togbe Hodo IV Presiding)",
    petitioners: "John H.M. Nyonator & 2 Ors (Ziavi Royal Family)",
    respondent: "Togbe Adza Kwadzo III (Ziavi Paramount Stool Claimant)"
  };

  const tabs = [
    { key: "overview", label: "Overview & Reliefs" },
    { key: "parties", label: "Parties & Panel" },
    { key: "documents", label: "Filing Documents (2)" },
    { key: "hearings", label: "Sittings & Directives" },
    { key: "orders", label: "Interlocutory Orders" },
    { key: "judgments", label: "Judgment Ruling" },
    { key: "appeals", label: "Appeals Record" },
  ];

  return (
    <main>
      {/* Back to list */}
      <Link href="/cases" className="back-link">
        <span style={{ fontSize: "16px" }}>←</span> Back to Regional Cases List
      </Link>

      {/* Header — Case Folder Title */}
      <div style={{ marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px", flexWrap: "wrap" }}>
          <span style={{
            fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "var(--primary)", background: "var(--primary-light)", padding: "4px 10px", borderRadius: "4px", border: "1px solid var(--primary-mid)"
          }}>
            {caseInfo.caseNumber}
          </span>
          <span style={{
            fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "var(--warning)", background: "var(--warning-light)", padding: "4px 10px", borderRadius: "4px"
          }}>
            NATURE: {caseInfo.nature}
          </span>
          <span className="status-badge status-pending">
            STATUS: {caseInfo.status}
          </span>
          <span style={{
            fontSize: "12px", fontWeight: 800, color: "var(--foreground)", background: "var(--bg)", padding: "4px 10px", borderRadius: "4px", border: "1px solid var(--border)"
          }}>
            SITTINGS HELD: {caseInfo.sittings}
          </span>
        </div>

        <h1 className="page-title" style={{ fontSize: "24px", fontWeight: 800, marginBottom: "6px", color: "var(--foreground)" }}>
          {caseInfo.title}
        </h1>
        <p className="page-subtitle" style={{ marginTop: "4px" }}>
          Paramountcy: <strong style={{ color: "var(--foreground)" }}>{caseInfo.traditionalArea}</strong> ({caseInfo.division}) ·
          Filed on {caseInfo.filingDate}
        </p>

        {/* Committee Directive Banner */}
        <div style={{
          marginTop: "16px",
          padding: "14px 18px",
          background: "#fef3c7",
          border: "1px solid #fde68a",
          borderLeft: "4px solid var(--warning)",
          borderRadius: "var(--radius-sm)",
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <span style={{ fontSize: "20px" }}>📌</span>
          <div>
            <span style={{ fontSize: "11px", fontWeight: 800, color: "#92400e", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Last Committee Directive / Decision
            </span>
            <p style={{ margin: "2px 0 0", fontSize: "14px", fontWeight: 600, color: "#78350f" }}>
              {caseInfo.directive}
            </p>
          </div>
        </div>

        {/* Quick action strip */}
        <div style={{ display: "flex", gap: "10px", marginTop: "18px", flexWrap: "wrap" }}>
          <Link href="/hearings/create" className="button" style={{ padding: "8px 18px", fontSize: "14px", display: "flex", gap: "6px", alignItems: "center" }}>
            <span>📅</span> Schedule Sitting
          </Link>
          <Link href="/registry/create" className="button secondary-button" style={{ padding: "8px 18px", fontSize: "14px", display: "flex", gap: "6px", alignItems: "center" }}>
            <span>📄</span> Index Filing Document
          </Link>
          <Link href="/judgments/create" className="button secondary-button" style={{ padding: "8px 18px", fontSize: "14px", display: "flex", gap: "6px", alignItems: "center" }}>
            <span>⚖️</span> Record Ruling
          </Link>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: "flex", borderBottom: "2px solid var(--border)", gap: "0", marginBottom: "28px", overflowX: "auto" }}>
        {tabs.map((t) => {
          const active = tab === t.key;
          return (
            <Link
              key={t.key}
              href={`?tab=${t.key}`}
              style={{
                padding: "12px 20px",
                fontWeight: active ? 700 : 500,
                fontSize: "14px",
                color: active ? "var(--primary)" : "var(--muted)",
                borderBottom: active ? "2px solid var(--primary)" : "2px solid transparent",
                marginBottom: "-2px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                background: active ? "var(--primary-light)" : "transparent",
                borderRadius: "8px 8px 0 0",
              }}
            >
              {t.label}
            </Link>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="card" style={{ padding: "32px" }}>
        {tab === "overview" && (
          <div>
            <h3 style={{ margin: "0 0 16px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>
              Reliefs Sought by Petitioner / Appellant
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              {caseInfo.reliefs.map((relief, i) => (
                <div key={i} style={{
                  padding: "16px",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start"
                }}>
                  <span style={{ fontSize: "16px", fontWeight: 800, color: "var(--primary)", minWidth: "24px" }}>
                    {i + 1}.
                  </span>
                  <p style={{ margin: 0, fontSize: "15px", fontWeight: 500, color: "var(--foreground)", lineHeight: 1.6 }}>
                    {relief}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
              {[
                { label: "Nature of Case", value: caseInfo.nature },
                { label: "Traditional Area / Town", value: `${caseInfo.traditionalArea} (${caseInfo.division})` },
                { label: "Presiding Judicial Panel", value: caseInfo.panel },
                { label: "Filing Date", value: caseInfo.filingDate },
                { label: "Sittings Held to Date", value: `${caseInfo.sittings} Sittings` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px" }}>
                    {label}
                  </span>
                  <p style={{ margin: "6px 0 0", fontSize: "15px", fontWeight: 600, lineHeight: 1.4 }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "parties" && (
          <div>
            <h3 style={{ margin: "0 0 20px", fontSize: "20px", fontWeight: 700 }}>Litigant Parties & Presiding Committee</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div className="card" style={{ background: "var(--primary-light)", padding: "20px 24px", border: "1px solid var(--primary-mid)" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "1px" }}>
                  🟦 Petitioner(s) / Appellant(s)
                </span>
                <h4 style={{ margin: "10px 0 4px", fontSize: "18px", fontWeight: 700 }}>{caseInfo.petitioners}</h4>
                <p style={{ margin: "0 0 12px", fontSize: "14px", color: "var(--muted)" }}>Ziavi Traditional Area</p>
              </div>
              <div className="card" style={{ background: "var(--warning-light)", padding: "20px 24px", border: "1px solid var(--warning-mid)" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--warning)", textTransform: "uppercase", letterSpacing: "1px" }}>
                  🟠 Respondent(s) / Defendant(s)
                </span>
                <h4 style={{ margin: "10px 0 4px", fontSize: "18px", fontWeight: 700 }}>{caseInfo.respondent}</h4>
                <p style={{ margin: "0 0 12px", fontSize: "14px", color: "var(--muted)" }}>Ziavi Paramount Secretariat</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
