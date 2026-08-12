import Link from "next/link";

export default async function RegistryPage() {
  const stats = [
    { label: "Total Filings", value: "142", desc: "Received files" },
    { label: "Pending Review", value: "8", desc: "Awaiting action" },
    { label: "Indexed Records", value: "128", desc: "Attached to cases" },
    { label: "Dispatched", value: "6", desc: "Outbound letters" },
  ];

  const mockRecords = [
    {
      id: "reg-1",
      referenceNumber: "VRHC-REG-2026-0042",
      senderName: "Law Offices of Kwami & Co",
      recipientName: "Registrar, VRHC",
      title: "Notice of Motion - Substitution of Parties",
      status: "PENDING",
      dateReceived: "2026-08-01",
    },
    {
      id: "reg-2",
      referenceNumber: "VRHC-REG-2026-0038",
      senderName: "Ministry of Chieftaincy & Religious Affairs",
      recipientName: "Registrar, VRHC",
      title: "Gazette Notification Confirmation",
      status: "RESOLVED",
      dateReceived: "2026-07-28",
    },
    {
      id: "reg-3",
      referenceNumber: "VRHC-REG-2026-0035",
      senderName: "Asogli Traditional Council Secretariat",
      recipientName: "Registrar, VRHC",
      title: "Minutes of Stool Dispute Arbitration Committee",
      status: "RESOLVED",
      dateReceived: "2026-07-15",
    },
  ];

  return (
    <main>
      {/* Header */}
      <div className="row-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "24px", marginBottom: "36px" }}>
        <div>
          <h1 className="page-title">Registry & Mail</h1>
          <p className="page-subtitle">Log incoming letters, trace paper trails, index documents, and manage traditional council archives.</p>
        </div>
        <button className="button" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span>＋</span> Log Correspondence
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        {stats.map((stat, i) => (
          <div key={i} className="card stat-card" style={{ borderLeftColor: i === 1 ? "var(--warning)" : "var(--primary-mid)" }}>
            <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--muted)", textTransform: "uppercase" }}>{stat.label}</span>
            <p style={{ margin: "4px 0 0", fontSize: "32px", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.1 }}>{stat.value}</p>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--muted)" }}>{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Main Registry Table */}
      <div className="card table-wrap" style={{ padding: "0" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Reference ID</th>
              <th>Document Description / Title</th>
              <th>Sender</th>
              <th>Recipient</th>
              <th>Date Logged</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockRecords.map((r) => (
              <tr key={r.id}>
                <td style={{ fontWeight: 700, fontSize: "14px", color: "var(--primary)" }}>{r.referenceNumber}</td>
                <td style={{ fontWeight: 600, fontSize: "14px" }}>{r.title}</td>
                <td>{r.senderName}</td>
                <td>{r.recipientName}</td>
                <td>{r.dateReceived}</td>
                <td>
                  <span className={`status-badge ${r.status === "PENDING" ? "status-pending" : "status-done"}`}>
                    {r.status}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button className="link-button" style={{ fontSize: "13px", fontWeight: 600 }}>
                    Index Record
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
