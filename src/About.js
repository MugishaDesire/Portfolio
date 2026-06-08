import { useState } from "react";
import photo from "./Assets/ProfilePhoto.jpeg";
import { useColors } from "./ThemeContext";

const STACK = [
  { label: "React",        color: "#61dafb", bg: "rgba(97,218,251,0.08)"  },
  { label: "Next.js",      color: "#ffffff", bg: "rgba(255,255,255,0.07)" },
  { label: "Node.js",      color: "#84cc16", bg: "rgba(132,204,22,0.08)"  },
  { label: "Express",      color: "#94a3b8", bg: "rgba(148,163,184,0.08)" },
  { label: "Django",       color: "#06d6a0", bg: "rgba(6,214,160,0.08)"   },
  { label: "React Native", color: "#61dafb", bg: "rgba(97,218,251,0.06)"  },
  { label: "Flutter",      color: "#54c5f8", bg: "rgba(84,197,248,0.08)"  },
  { label: "PostgreSQL",   color: "#a78bfa", bg: "rgba(167,139,250,0.08)" },
  { label: "MySQL",        color: "#f59e0b", bg: "rgba(245,158,11,0.08)"  },
  { label: "MongoDB",      color: "#4ade80", bg: "rgba(74,222,128,0.08)"  },
  { label: "TypeScript",   color: "#60a5fa", bg: "rgba(96,165,250,0.08)"  },
  { label: "Tailwind",     color: "#38bdf8", bg: "rgba(56,189,248,0.08)"  },
];

function TechPill({ label, color, bg }) {
  const c = useColors();
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "8px 18px",
        borderRadius: "999px",
        background: hov ? bg : c.cardBg,
        border: `1px solid ${hov ? color + "55" : c.border}`,
        color: hov ? color : c.textSubtle,
        fontSize: "13px", fontWeight: 500,
        cursor: "default",
        transition: "all 0.2s",
        transform: hov ? "translateY(-2px)" : "none",
      }}
    >
      {label}
    </div>
  );
}

export default function About() {
  const c = useColors();

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>

      {/* ── Avatar + Name ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: "2rem",
        marginBottom: "3rem", flexWrap: "wrap",
      }}>
        <img
          src={photo}
          alt="Desire Mugisha"
          style={{
            width: "100px", height: "100px",
            borderRadius: "50%", objectFit: "cover", flexShrink: 0,
            boxShadow: "0 0 40px rgba(99,102,241,0.3)",
            border: "2px solid rgba(99,102,241,0.4)",
          }}
        />
        <div>
          <p style={{
            color: c.accent, fontSize: "14px", fontWeight: 500,
            margin: "0 0 4px", letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            Full-Stack Developer
          </p>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700,
            margin: "0 0 8px", lineHeight: 1.1, color: c.text,
          }}>
            Desire MUGISHA
          </h1>
          <p style={{ color: c.textMuted, margin: 0, fontSize: "15px" }}>
            Based in Kigali, Rwanda
          </p>
        </div>
      </div>

      {/* ── Bio ── */}
      <div style={{
        background: c.cardBg,
        border: `1px solid ${c.border}`,
        borderRadius: "16px", padding: "2rem", marginBottom: "2rem",
        transition: "background 0.35s ease, border-color 0.35s ease",
      }}>
        <p style={{ lineHeight: 1.8, color: c.textMuted, margin: 0, fontSize: "16px" }}>
          I build fast, beautiful, and accessible web applications. With 2.5+ years of experience,
          I specialize in React ecosystems and backend services. I care deeply about clean code,
          great UX, and shipping products people love.
        </p>
      </div>

      {/* ── Stats ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "1rem",
        marginBottom: "3rem",
      }}>
        {[
          { label: "Projects Shipped",  value: "10+"  },
          { label: "Happy Clients",     value: "10"   },
          { label: "Open Source Stars", value: "1.2k" },
        ].map(({ label, value }) => (
          <div key={label} style={{
            background: c.badgeBg,
            border: `1px solid ${c.badgeBorder}`,
            borderRadius: "12px", padding: "1.2rem",
            textAlign: "center",
            transition: "background 0.35s ease, border-color 0.35s ease",
          }}>
            <div style={{ fontSize: "28px", fontWeight: 700, color: c.accentSoft }}>{value}</div>
            <div style={{ fontSize: "12px", color: c.textSubtle, marginTop: "4px" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* ── Tech Stack ── */}
      <div>
        <p style={{
          fontSize: "12px", color: c.accent, letterSpacing: "0.15em",
          fontWeight: 600, textTransform: "uppercase", marginBottom: "0.5rem",
        }}>
          Technologies
        </p>
        <h2 style={{
          fontSize: "1.5rem", fontWeight: 700,
          margin: "0 0 1.25rem", color: c.text,
        }}>
          My Tech Stack
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          {STACK.map(({ label, color, bg }) => (
            <TechPill key={label} label={label} color={color} bg={bg} />
          ))}
        </div>
      </div>

    </div>
  );
}