import { useState } from "react";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";

const navLinks = ["About", "Skills", "Projects", "Contact"];

const sectionMap = {
  About: <About />,
  Skills: <Skills />,
  Projects: <Projects />,
  Contact: <Contact />,
};

export default function App() {
  const [active, setActive] = useState("About");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#e2e8f0"
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "fixed", top: "-200px", left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "400px",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0
      }} />

      {/* Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 2rem"
      }}>
        <div style={{
          maxWidth: "900px", margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: "60px"
        }}>
          <span style={{
            fontWeight: 700, fontSize: "18px",
            background: "linear-gradient(135deg, #6366f1, #a78bfa)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            MugishaDev
          </span>
          <div style={{ display: "flex", gap: "4px" }}>
            {navLinks.map(link => (
              <button key={link} onClick={() => setActive(link)} style={{
                background: active === link ? "rgba(99,102,241,0.15)" : "transparent",
                border: active === link ? "1px solid rgba(99,102,241,0.4)" : "1px solid transparent",
                color: active === link ? "#a78bfa" : "#94a3b8",
                borderRadius: "8px", padding: "6px 14px",
                cursor: "pointer", fontSize: "14px", fontWeight: 500,
                transition: "all 0.2s"
              }}>
                {link}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main style={{
        maxWidth: "900px", margin: "0 auto",
        padding: "3rem 2rem", position: "relative", zIndex: 1
      }}>
        {sectionMap[active]}
      </main>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea, input { font-family: inherit; }
      `}</style>
    </div>
  );
}