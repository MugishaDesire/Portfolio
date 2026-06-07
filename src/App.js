import { useState, useEffect, useRef } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 600) setMenuOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleNav(link) {
    setActive(link);
    setMenuOpen(false);
  }

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
        width: "min(600px, 100vw)", height: "400px",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0
      }} />

      {/* Nav */}
      <nav ref={menuRef} style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 1.25rem"
      }}>
        <div style={{
          maxWidth: "900px", margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: "60px"
        }}>
          <span style={{
            fontWeight: 700, fontSize: "18px",
            background: "linear-gradient(135deg, #6366f1, #a78bfa)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            flexShrink: 0
          }}>
            MugishaDev
          </span>

          {/* Desktop nav links */}
          <div className="desktop-nav" style={{ display: "flex", gap: "4px" }}>
            {navLinks.map(link => (
              <button key={link} onClick={() => handleNav(link)} style={{
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

          {/* Hamburger button — mobile only */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "6px 10px",
              cursor: "pointer",
              color: "#94a3b8",
              flexDirection: "column",
              gap: "4px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Three lines icon */}
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: "18px", height: "2px",
                background: menuOpen ? "#a78bfa" : "#94a3b8",
                borderRadius: "2px",
                transition: "all 0.2s",
                transform: menuOpen
                  ? i === 0 ? "translateY(6px) rotate(45deg)"
                    : i === 2 ? "translateY(-6px) rotate(-45deg)"
                    : "scaleX(0)"
                  : "none"
              }} />
            ))}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <div className="mobile-menu" style={{
          display: menuOpen ? "flex" : "none",
          flexDirection: "column",
          gap: "4px",
          padding: "0.5rem 0 1rem",
          maxWidth: "900px",
          margin: "0 auto"
        }}>
          {navLinks.map(link => (
            <button key={link} onClick={() => handleNav(link)} style={{
              background: active === link ? "rgba(99,102,241,0.15)" : "transparent",
              border: active === link ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.05)",
              color: active === link ? "#a78bfa" : "#94a3b8",
              borderRadius: "8px", padding: "10px 16px",
              cursor: "pointer", fontSize: "15px", fontWeight: 500,
              transition: "all 0.2s", textAlign: "left"
            }}>
              {link}
            </button>
          ))}
        </div>
      </nav>

      <main style={{
        maxWidth: "900px", margin: "0 auto",
        padding: "2rem 1.25rem", position: "relative", zIndex: 1
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

        @media (max-width: 599px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </div>
  );
}