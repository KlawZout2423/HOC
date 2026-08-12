import { loginUser } from "../actions/auth";

export default function LoginPage() {
  return (
    <main className="login-split-container" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", background: "#f8fafc" }}>
      
      {/* Responsive stylesheet to collapse layout on small viewports */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .login-split-container {
            grid-template-columns: 1fr !important;
          }
          .login-art-panel {
            display: none !important;
          }
        }
      `}} />

      {/* Left Column: Traditional Art Panel */}
      <div className="login-art-panel cultural-geometric-pat" style={{
        background: "#0d2c18", /* Deep forest green matching the custom emblem background */
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        position: "relative",
        borderRight: "1px solid rgba(255, 255, 255, 0.05)"
      }}>
        {/* Subtle glowing overlay pattern */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, rgba(251, 191, 36, 0.04) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        
        {/* Crest Art Image */}
        <div style={{ position: "relative", width: "100%", maxWidth: "420px", aspectRatio: "1 / 1" }}>
          <img
            src="/login-art.png"
            alt="Volta Regional House of Chiefs Emblem Art"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))"
            }}
          />
        </div>
        
        {/* Context caption */}
        <div style={{ marginTop: "32px", textAlign: "center", maxWidth: "420px", zIndex: 1 }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#fbbf24", margin: "0 0 8px", letterSpacing: "-0.3px" }}>
            Institutional Wisdom & Order
          </h2>
          <p style={{ margin: 0, fontSize: "14px", color: "#a7f3d0", lineHeight: 1.5, opacity: 0.85 }}>
            Preserving chieftaincy heritage, traditional dispute resolution records, customary laws, and judicial precedents of the Volta Region.
          </p>
        </div>
      </div>

      {/* Right Column: Sleek Form Panel */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        background: "#f8fafc"
      }}>
        <div className="auth-card" style={{ padding: "40px", border: "none", boxShadow: "none", background: "transparent", width: "100%", maxWidth: "420px" }}>
          
          {/* Sleek Minimal Header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            {/* Logo badge: a small gold-gradient circle */}
            <div style={{ display: "inline-flex", marginBottom: "16px" }}>
              <span style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
                color: "white",
                fontSize: "20px",
                fontWeight: 800,
                boxShadow: "0 4px 12px rgba(30,58,138,0.2)"
              }}>V</span>
            </div>

            <h1 style={{ margin: "0 0 6px", fontSize: "24px", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.5px" }}>
              Sign In
            </h1>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--muted)", fontWeight: 400 }}>
              Volta Regional House of Chiefs Registry
            </p>
          </div>

          {/* Action Form */}
          <form action={loginUser} className="form" style={{ gap: "20px" }}>
            <div>
              <label htmlFor="email" className="form-label" style={{ fontSize: "13px", fontWeight: 500, color: "var(--muted)", marginBottom: "6px", display: "block" }}>
                Work Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input"
                style={{ fontSize: "14px", padding: "10px 12px" }}
                placeholder="name@vrhc.gov.gh"
                defaultValue="admin@vrhc.gov.gh"
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label" style={{ fontSize: "13px", fontWeight: 500, color: "var(--muted)", marginBottom: "6px", display: "block" }}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input"
                style={{ fontSize: "14px", padding: "10px 12px" }}
                placeholder="••••••••"
                defaultValue="adminpassword"
              />
            </div>

            <button type="submit" className="button" style={{ width: "100%", marginTop: "8px", padding: "10px", fontSize: "14px", fontWeight: 600 }}>
              Sign In to Workspace
            </button>
          </form>
          
          {/* Sleek Minimal Hint Callout */}
          <div style={{
            marginTop: "24px",
            padding: "12px 14px",
            background: "#ffffff",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            textAlign: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
          }}>
            <p style={{ margin: 0, fontSize: "12px", color: "var(--muted)", lineHeight: 1.5 }}>
              Registrar Credentials: <strong style={{ color: "var(--foreground)" }}>admin@vrhc.gov.gh</strong> / <strong style={{ color: "var(--foreground)" }}>adminpassword</strong>
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
