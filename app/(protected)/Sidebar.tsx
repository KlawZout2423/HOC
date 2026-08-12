"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SessionPayload } from "../lib/auth";
import { logout } from "../actions/logout";

interface SidebarProps {
  user: SessionPayload;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const username = user.email.split("@")[0];

  return (
    <aside className="sidebar" style={{ position: "relative" }}>
      {/* 1. Header Group (Logo + Jurisdiction) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingBottom: "16px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
        {/* Logo Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 className="brand">
            <span className="brand-accent">V</span>
            VRHC
          </h2>
          <span style={{ fontSize: "14px", color: "#475569", cursor: "pointer" }} title="Collapse Menu">
            🗕
          </span>
        </div>

        {/* Jurisdiction Selector Card */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#475569", letterSpacing: "1.2px", textTransform: "uppercase" }}>
            Jurisdiction
          </span>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "var(--transition)"
          }}>
            {/* Circular Gold Crest Symbol */}
            <div style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--warning) 0%, #b45309 100%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
              flexShrink: 0
            }}>
              A
            </div>
            {/* Jurisdiction Name */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#f8fafc", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Asogli Paramountcy
              </span>
              <span style={{ fontSize: "10px", fontWeight: 500, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Active Area
              </span>
            </div>
            {/* Chevron Dropdown */}
            <span style={{ fontSize: "10px", color: "#64748b", fontWeight: 700 }}>▼</span>
          </div>
        </div>
      </div>

      {/* 2. Navigation Links */}
      <nav className="nav-list">
        <span className="nav-section-label">General</span>
        
        <Link href="/dashboard" className={`nav-item ${pathname === "/dashboard" ? "active-nav" : ""}`}>
          <span style={{ fontSize: "16px", width: "22px", textAlign: "center", flexShrink: 0 }}>⊞</span>
          <span style={{ flex: 1 }}>Dashboard</span>
        </Link>

        <span className="nav-section-label" style={{ marginTop: "12px" }}>Case Management</span>
        
        <Link 
          href="/cases" 
          className={`nav-item ${
            pathname === "/cases" || 
            (pathname.startsWith("/cases") && pathname !== "/cases/create") 
              ? "active-nav" 
              : ""
          }`}
          style={{ paddingLeft: "36px" }}
        >
          <span style={{ fontSize: "16px", width: "22px", textAlign: "center", flexShrink: 0 }}>☰</span>
          <span style={{ flex: 1 }}>Case List</span>
        </Link>

        <Link 
          href="/cases/create" 
          className={`nav-item ${pathname === "/cases/create" ? "active-nav" : ""}`}
          style={{ paddingLeft: "36px" }}
        >
          <span style={{ fontSize: "16px", width: "22px", textAlign: "center", flexShrink: 0 }}>＋</span>
          <span style={{ flex: 1 }}>New Case</span>
        </Link>

        <span className="nav-section-label" style={{ marginTop: "12px" }}>Registry & Sittings</span>

        <Link href="/registry" className={`nav-item ${pathname.startsWith("/registry") ? "active-nav" : ""}`}>
          <span style={{ fontSize: "16px", width: "22px", textAlign: "center", flexShrink: 0 }}>📥</span>
          <span style={{ flex: 1 }}>Registry</span>
          <span style={{ background: "rgba(147, 197, 253, 0.15)", color: "#93c5fd", padding: "1px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: 700 }}>
            8
          </span>
        </Link>

        <Link href="/hearings" className={`nav-item ${pathname.startsWith("/hearings") ? "active-nav" : ""}`}>
          <span style={{ fontSize: "16px", width: "22px", textAlign: "center", flexShrink: 0 }}>📅</span>
          <span style={{ flex: 1 }}>Hearings</span>
          <span style={{ background: "rgba(251, 191, 36, 0.15)", color: "#fbbf24", padding: "1px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: 700 }}>
            2
          </span>
        </Link>

        <Link href="/judgments" className={`nav-item ${pathname.startsWith("/judgments") ? "active-nav" : ""}`}>
          <span style={{ fontSize: "16px", width: "22px", textAlign: "center", flexShrink: 0 }}>⚖️</span>
          <span style={{ flex: 1 }}>Judgments</span>
        </Link>

        <Link href="/appeals" className={`nav-item ${pathname.startsWith("/appeals") ? "active-nav" : ""}`}>
          <span style={{ fontSize: "16px", width: "22px", textAlign: "center", flexShrink: 0 }}>🏛️</span>
          <span style={{ flex: 1 }}>Appeals</span>
          <span style={{ background: "rgba(239, 68, 68, 0.15)", color: "#f87171", padding: "1px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: 700 }}>
            1
          </span>
        </Link>

        <Link href="/reports" className={`nav-item ${pathname.startsWith("/reports") ? "active-nav" : ""}`}>
          <span style={{ fontSize: "16px", width: "22px", textAlign: "center", flexShrink: 0 }}>📊</span>
          <span style={{ flex: 1 }}>Reports</span>
        </Link>
      </nav>

      {/* 4. Bottom Zone: User Profile Footer */}
      <div style={{
        marginTop: "auto",
        paddingTop: "16px",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%"
      }}>
        {/* User Circle Avatar initials */}
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: 700,
          flexShrink: 0
        }}>
          {username[0].toUpperCase()}
        </div>
        {/* Details stack */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#f8fafc", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {username.charAt(0).toUpperCase() + username.slice(1)}
          </span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--warning)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {user.role}
          </span>
        </div>
        {/* Inline exit logout trigger */}
        <form action={logout} style={{ margin: 0, display: "flex" }}>
          <button
            type="submit"
            style={{
              background: "transparent",
              border: "none",
              color: "#64748b",
              cursor: "pointer",
              fontSize: "18px",
              padding: "6px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "var(--transition)"
            }}
            title="Sign Out"
          >
            ↪
          </button>
        </form>
      </div>
    </aside>
  );
}
