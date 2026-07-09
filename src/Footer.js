import React from "react";
import { useColors } from "./ThemeContext";

export default function Footer({ onNavigate }) {
  const c = useColors();
  const year = new Date().getFullYear();

  return React.createElement("footer", {
    style: {
      position: "relative", zIndex: 1,
      borderTop: `1px solid ${c.navBorder}`,
      background: c.navBg,
      backdropFilter: "blur(12px)",
      transition: "background 0.35s ease, border-color 0.35s ease",
    }
  },
    React.createElement("div", {
      style: {
        maxWidth: "900px", margin: "0 auto", padding: "1.5rem 1.25rem",
        display: "flex", flexWrap: "wrap",
        justifyContent: "space-between", alignItems: "center", gap: "1rem",
      }
    },
      // Brand
      React.createElement("div", {
        style: { display: "flex", flexDirection: "column", gap: "4px" }
      },
        React.createElement("span", {
          style: {
            fontWeight: 700, fontSize: "17px",
            background: c.logoGradient,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }
        }, "MUGISHA Developer"),
        React.createElement("span", {
          style: { fontSize: "13px", color: c.textMuted }
        }, `© ${year} Mugisha Desire. All rights reserved.`)
      ),

      // Social links
      React.createElement("div", { style: { display: "flex", gap: "10px" } },
        [
          { label: "GitHub",   href: "https://github.com/" },
          { label: "LinkedIn", href: "https://linkedin.com/" },
          { label: "Email",    href: "mailto:your@email.com" },
        ].map(({ label, href }) =>
          React.createElement("a", {
            key: label,
            href: href,
            target: "_blank",
            rel: "noopener noreferrer",
            style: {
              fontSize: "13px", color: c.textMuted,
              textDecoration: "none",
              border: `1px solid ${c.border}`,
              borderRadius: "8px", padding: "5px 12px",
              transition: "all 0.2s", display: "inline-block",
            },
            onMouseEnter: e => {
              e.currentTarget.style.color = c.accentSoft;
              e.currentTarget.style.borderColor = c.borderAccent;
              e.currentTarget.style.background = c.badgeBg;
            },
            onMouseLeave: e => {
              e.currentTarget.style.color = c.textMuted;
              e.currentTarget.style.borderColor = c.border;
              e.currentTarget.style.background = "transparent";
            },
          }, label)
        )
      )
    )
  );
}