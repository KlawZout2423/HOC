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
    description:
      "A petition challenging the eligibility criteria applied by the kingmakers in selecting the successor to the Asogli paramount stool, alleging violations of customary succession procedures and traditional rites.",
    panel: "Judicial Committee Panel B (Nene Kojo III, Togbe Dzaba IV)",
  };

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "parties", label: "Parties" },
    { key: "documents", label: "Documents (3)" },
    { key: "hearings", label: "Hearings" },
    { key: "orders", label: "Orders" },
    { key: "judgments", label: "Judgment" },
    { key: "appeals", label: "Appeals" },
    { key: "timeline", label: "Timeline" },
  ];

  const statusColorMap: Record<string, string> = {
    HEARINGS: "status-progress",
    FILED: "status-pending",
    AWAITING_JUDGMENT: "status-pending",
    DECIDED: "status-done",
    ARCHIVED: "status-archived",
    APPEALED: "status-danger",
  };

  return (
    <main>
      {/* Back to list */}
      <Link href="/cases" className="back-link">
        <span style={{ fontSize: "16px" }}>←</span> Back to Cases List
      </Link>

      {/* 1. Header — Case Folder Title */}
      <div
        style={{
          marginBottom: "36px",
          paddingBottom: "24px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            marginBottom: "12px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "var(--primary)",
              background: "var(--primary-light)",
              padding: "4px 10px",
              borderRadius: "4px",
              border: "1px solid var(--primary-mid)",
            }}
          >
            {caseInfo.caseNumber}
          </span>
          <span className={`status-badge ${statusColorMap[caseInfo.status] ?? "status-pending"}`}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "currentColor",
                display: "inline-block",
              }}
            />
            {caseInfo.status.replace("_", " ")}
          </span>
        </div>
        <h1 className="page-title" style={{ fontSize: "26px", fontWeight: 700, marginBottom: "6px" }}>
          {caseInfo.title}
        </h1>
        <p className="page-subtitle" style={{ marginTop: "4px" }}>
          Paramountcy jurisdiction:{" "}
          <strong style={{ color: "var(--foreground)" }}>{caseInfo.traditionalArea}</strong> ·
          Filed on {caseInfo.filingDate} · {caseInfo.type}
        </p>

        {/* Quick action strip */}
        <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
          <Link
            href="/hearings/create"
            className="button"
            style={{ padding: "8px 18px", fontSize: "14px", display: "flex", gap: "6px", alignItems: "center" }}
          >
            <span>📅</span> Schedule Sitting
          </Link>
          <Link
            href="/registry/create"
            className="button secondary-button"
            style={{ padding: "8px 18px", fontSize: "14px", display: "flex", gap: "6px", alignItems: "center" }}
          >
            <span>📄</span> Upload Document
          </Link>
          <Link
            href="/judgments/create"
            className="button secondary-button"
            style={{ padding: "8px 18px", fontSize: "14px", display: "flex", gap: "6px", alignItems: "center" }}
          >
            <span>⚖️</span> Record Judgment
          </Link>
        </div>
      </div>

      {/* 2. Tab Navigation */}
      <div
        style={{
          display: "flex",
          borderBottom: "2px solid var(--border)",
          gap: "0",
          marginBottom: "28px",
          overflowX: "auto",
          paddingBottom: "0",
        }}
      >
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
                transition: "var(--transition)",
                background: active ? "var(--primary-light)" : "transparent",
                borderRadius: "8px 8px 0 0",
              }}
            >
              {t.label}
            </Link>
          );
        })}
      </div>

      {/* 3. Tab Contents */}
      <div className="card" style={{ padding: "32px" }}>
        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <div>
            <h3 style={{ margin: "0 0 16px", fontSize: "20px", fontWeight: 700, color: "var(--foreground)" }}>
              Petition Case Overview
            </h3>
            <p style={{ fontSize: "16px", color: "var(--foreground)", lineHeight: 1.7, marginBottom: "28px" }}>
              {caseInfo.description}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "20px",
                borderTop: "1px solid var(--border)",
                paddingTop: "24px",
              }}
            >
              {[
                { label: "Dispute Nature", value: caseInfo.type },
                { label: "Traditional Area", value: `${caseInfo.traditionalArea} (${caseInfo.district})` },
                { label: "Judicial Panel", value: caseInfo.panel },
                { label: "Filing Date", value: caseInfo.filingDate },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    {label}
                  </span>
                  <p style={{ margin: "6px 0 0", fontSize: "15px", fontWeight: 600, lineHeight: 1.4 }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PARTIES ── */}
        {tab === "parties" && (
          <div>
            <h3 style={{ margin: "0 0 20px", fontSize: "20px", fontWeight: 700 }}>Litigant Parties</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div
                className="card"
                style={{ background: "var(--primary-light)", padding: "20px 24px", border: "1px solid var(--primary-mid)" }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--primary)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Petitioners (Claimants)
                </span>
                <h4 style={{ margin: "10px 0 4px", fontSize: "18px", fontWeight: 700 }}>Togbe Afede XIV & Elders</h4>
                <p style={{ margin: "0 0 12px", fontSize: "14px", color: "var(--muted)" }}>
                  Asogli Stool Palace, Ho West District
                </p>
                <div style={{ fontSize: "13px", color: "var(--muted)" }}>
                  <div>📞 Contact: +233 362 800 XXX</div>
                  <div>📍 Role: CLAIMANT</div>
                </div>
              </div>
              <div
                className="card"
                style={{ background: "var(--warning-light)", padding: "20px 24px", border: "1px solid var(--warning-mid)" }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--warning)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Respondents (Defendants)
                </span>
                <h4 style={{ margin: "10px 0 4px", fontSize: "18px", fontWeight: 700 }}>
                  Stool Claimant Nominee & Kingmakers
                </h4>
                <p style={{ margin: "0 0 12px", fontSize: "14px", color: "var(--muted)" }}>
                  Asogli Paramount Secretariat, Ho
                </p>
                <div style={{ fontSize: "13px", color: "var(--muted)" }}>
                  <div>📞 Contact: Through Counsel</div>
                  <div>📍 Role: RESPONDENT</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── DOCUMENTS ── */}
        {tab === "documents" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 700 }}>Attached Filing Documents</h3>
              <Link
                href="/registry/create"
                className="button"
                style={{ padding: "8px 18px", fontSize: "14px", display: "flex", gap: "6px", alignItems: "center" }}
              >
                <span>＋</span> Upload New Document
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "Original_Petition_Asogli_Stool.pdf", size: "1.4 MB", uploaded: "Registrar · 2026-04-12", type: "PETITION" },
                { name: "Customary_Succession_Declaration_1984.pdf", size: "840 KB", uploaded: "Petitioner · 2026-04-19", type: "EXHIBIT" },
                { name: "Kingmakers_Response_Brief.pdf", size: "620 KB", uploaded: "Respondent Counsel · 2026-05-03", type: "RESPONSE" },
              ].map((doc, i) => (
                <div
                  key={i}
                  className="card"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 24px",
                    gap: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span style={{ fontSize: "28px" }}>📄</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "15px" }}>{doc.name}</div>
                      <div style={{ fontSize: "13px", color: "var(--muted)", marginTop: "2px" }}>
                        {doc.size} · Uploaded by {doc.uploaded}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        background: "var(--primary-light)",
                        color: "var(--primary)",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        textTransform: "uppercase",
                      }}
                    >
                      {doc.type}
                    </span>
                    <button className="button secondary-button" style={{ padding: "6px 14px", fontSize: "13px" }}>
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── HEARINGS ── */}
        {tab === "hearings" && (
          <div>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}
            >
              <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 700 }}>Hearings & Panel Sittings</h3>
              <Link
                href="/hearings/create"
                className="button"
                style={{ padding: "8px 18px", fontSize: "14px", display: "flex", gap: "6px", alignItems: "center" }}
              >
                <span>📅</span> Schedule Sitting
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="card" style={{ borderLeft: "4px solid var(--warning)", paddingLeft: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "var(--warning)",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      🟡 Scheduled Sitting
                    </span>
                    <h4 style={{ margin: "6px 0 4px", fontSize: "17px", fontWeight: 700 }}>
                      Trial Sitting: Cross-Examination of Parties
                    </h4>
                    <p style={{ margin: 0, fontSize: "14px", color: "var(--muted)" }}>
                      August 24, 2026 at 10:00 AM · VRHC Courtroom, Ho · Panel B
                    </p>
                  </div>
                  <span className="status-badge status-pending" style={{ fontSize: "12px", flexShrink: 0 }}>
                    SCHEDULED
                  </span>
                </div>
              </div>
              <div className="card" style={{ borderLeft: "4px solid var(--success)", paddingLeft: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "var(--success)",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      ✅ Concluded Sitting
                    </span>
                    <h4 style={{ margin: "6px 0 4px", fontSize: "17px", fontWeight: 700 }}>
                      Preliminary Objections Ruling
                    </h4>
                    <p style={{ margin: "0 0 8px", fontSize: "14px", color: "var(--muted)" }}>
                      May 18, 2026 · VRHC Courtroom, Ho · Minutes attached
                    </p>
                  </div>
                  <span className="status-badge status-done" style={{ fontSize: "12px", flexShrink: 0 }}>
                    COMPLETED
                  </span>
                </div>
                <button className="link-button" style={{ fontSize: "13px", marginTop: "4px" }}>
                  📋 View Sitting Minutes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── ORDERS ── */}
        {tab === "orders" && (
          <div>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}
            >
              <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 700 }}>Interlocutory Orders & Directives</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                {
                  orderRef: "ORD-2026-0014-A",
                  date: "2026-05-18",
                  type: "Interim Order",
                  summary:
                    "The Judicial Panel orders both parties to maintain the status quo regarding the use and occupation of the Asogli Stool Palace pending the determination of this matter.",
                  panel: "Panel B",
                  status: "ACTIVE",
                },
                {
                  orderRef: "ORD-2026-0014-B",
                  date: "2026-06-02",
                  type: "Directions Order",
                  summary:
                    "Parties directed to exchange all written evidence and exhibits within 14 days. Petitioner's counsel to file supplementary witness statements by June 20, 2026.",
                  panel: "Panel B",
                  status: "COMPLIED",
                },
              ].map((order, i) => (
                <div
                  key={i}
                  className="card"
                  style={{
                    borderLeft: `4px solid ${order.status === "ACTIVE" ? "var(--primary)" : "var(--success)"}`,
                    paddingLeft: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "10px",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "var(--muted)",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        {order.orderRef} · {order.date}
                      </span>
                      <h4 style={{ margin: "4px 0", fontSize: "16px", fontWeight: 700 }}>{order.type}</h4>
                    </div>
                    <span
                      className={`status-badge ${order.status === "ACTIVE" ? "status-progress" : "status-done"}`}
                      style={{ fontSize: "12px", flexShrink: 0 }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p style={{ margin: "0 0 10px", fontSize: "14px", color: "var(--foreground)", lineHeight: 1.6 }}>
                    {order.summary}
                  </p>
                  <span style={{ fontSize: "12px", color: "var(--muted)" }}>Issued by {order.panel}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── JUDGMENT ── */}
        {tab === "judgments" && (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <span style={{ fontSize: "44px" }}>⚖️</span>
            <h3 style={{ marginTop: "16px", fontSize: "20px", fontWeight: 700 }}>No Judgment Recorded</h3>
            <p
              style={{
                color: "var(--muted)",
                maxWidth: "480px",
                margin: "10px auto 24px",
                fontSize: "15px",
                lineHeight: 1.6,
              }}
            >
              This case is currently ongoing in sittings. Rulings will be uploaded once finalized by the Judicial
              Panel. You may record a judgment once all arguments are concluded.
            </p>
            <Link
              href="/judgments/create"
              className="button"
              style={{ padding: "10px 24px", display: "inline-flex", gap: "8px", alignItems: "center" }}
            >
              <span>⚖️</span> Record Judgment
            </Link>
          </div>
        )}

        {/* ── APPEALS ── */}
        {tab === "appeals" && (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <span style={{ fontSize: "44px" }}>🏛️</span>
            <h3 style={{ marginTop: "16px", fontSize: "20px", fontWeight: 700 }}>No Appeals Lodged</h3>
            <p
              style={{
                color: "var(--muted)",
                maxWidth: "480px",
                margin: "10px auto 24px",
                fontSize: "15px",
                lineHeight: 1.6,
              }}
            >
              No appeal filings have been registered for this stool dispute. Appeals can only be entered following
              the release of the final judgment ruling.
            </p>
            <Link
              href="/appeals/create"
              className="button secondary-button"
              style={{ padding: "10px 24px", display: "inline-flex", gap: "8px", alignItems: "center" }}
            >
              <span>🏛️</span> File Appeal Record
            </Link>
          </div>
        )}

        {/* ── TIMELINE ── */}
        {tab === "timeline" && (
          <div>
            <h3 style={{ margin: "0 0 24px", fontSize: "20px", fontWeight: 700 }}>Case Activity Timeline</h3>
            <div style={{ position: "relative", paddingLeft: "28px" }}>
              {/* Vertical timeline line */}
              <div
                style={{
                  position: "absolute",
                  left: "9px",
                  top: "0",
                  bottom: "0",
                  width: "2px",
                  background: "var(--border)",
                }}
              />

              {[
                {
                  date: "2026-04-12",
                  time: "09:14 AM",
                  event: "Case Filed & Registered",
                  detail: "Petition received by Registrar. Case number VRHC-JC-2026-0004 assigned. Initial documents indexed.",
                  icon: "📁",
                  color: "var(--primary)",
                },
                {
                  date: "2026-04-19",
                  time: "02:30 PM",
                  event: "Documents Indexed",
                  detail: "Customary Succession Declaration (1984) filed by Petitioner and indexed to case folder.",
                  icon: "📄",
                  color: "var(--muted)",
                },
                {
                  date: "2026-05-18",
                  time: "10:00 AM",
                  event: "First Sitting — Preliminary Objections",
                  detail: "Panel B convened for preliminary objections. Respondent's counsel raised jurisdictional objections. Overruled.",
                  icon: "🏛️",
                  color: "var(--success)",
                },
                {
                  date: "2026-05-18",
                  time: "11:45 AM",
                  event: "Interim Order Issued (ORD-2026-0014-A)",
                  detail: "Status quo order issued — parties to maintain current occupancy of the Asogli Stool Palace.",
                  icon: "📜",
                  color: "var(--warning)",
                },
                {
                  date: "2026-06-02",
                  time: "03:00 PM",
                  event: "Directions Order Issued (ORD-2026-0014-B)",
                  detail: "Exchange of evidence directed. Petitioner to file supplementary witness statements by June 20.",
                  icon: "📋",
                  color: "var(--primary)",
                },
                {
                  date: "2026-08-24",
                  time: "10:00 AM",
                  event: "Next Scheduled Sitting",
                  detail: "Trial sitting: Cross-examination of key witnesses. Panel B presiding at VRHC Courtroom, Ho.",
                  icon: "📅",
                  color: "var(--warning)",
                  upcoming: true,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    marginBottom: "24px",
                    paddingLeft: "20px",
                    opacity: item.upcoming ? 0.7 : 1,
                  }}
                >
                  {/* Timeline dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-19px",
                      top: "4px",
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: item.upcoming ? "var(--warning-light)" : item.color,
                      border: item.upcoming ? `2px dashed var(--warning)` : `2px solid ${item.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "9px",
                      zIndex: 1,
                    }}
                  />

                  <div
                    style={{
                      background: item.upcoming ? "var(--warning-light)" : "var(--bg)",
                      border: `1px solid ${item.upcoming ? "var(--warning-mid)" : "var(--border)"}`,
                      borderRadius: "var(--radius-sm)",
                      padding: "14px 18px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "6px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "16px" }}>{item.icon}</span>
                        <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--foreground)" }}>
                          {item.event}
                        </span>
                        {item.upcoming && (
                          <span
                            style={{
                              fontSize: "10px",
                              fontWeight: 700,
                              background: "var(--warning)",
                              color: "white",
                              padding: "2px 6px",
                              borderRadius: "20px",
                              textTransform: "uppercase",
                            }}
                          >
                            Upcoming
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: "12px", color: "var(--muted)", flexShrink: 0 }}>
                        {item.date} · {item.time}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
