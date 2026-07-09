import { useState, useEffect, useRef } from "react";
import Home from "./Home";
import About from "./About";
import Skills from "./Skills&Services";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import { ThemeProvider, useTheme, useColors } from "./ThemeContext";

const navLinks = ["Home", "About", "Skills&Services", "Projects", "Contact"];

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

function AppInner() {
  const c = useColors();

  const [active, setActive]     = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const sectionMap = {
    Home:     <Home onNavigate={handleNav} />,
    About:    <About />,
    "Skills&Services":   <Skills />,
    Projects: <Projects />,
    Contact:  <Contact />,
  };

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    if (menuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

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
      background: c.pageBg,
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: c.text,
      transition: "background 0.35s ease, color 0.35s ease",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* Ambient glow */}
      <div style={{
        position: "fixed", top: "-200px", left: "50%", transform: "translateX(-50%)",
        width: "min(600px, 100vw)", height: "400px",
        background: `radial-gradient(ellipse, ${c.orb1} 0%, transparent 70%)`,
        pointerEvents: "none", zIndex: 0,
        transition: "background 0.35s ease",
      }} />

      {/* Nav */}
      <nav ref={menuRef} style={{
        position: "sticky", top: 0, zIndex: 100,
        background: c.navBg,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${c.navBorder}`,
        padding: "0 1.25rem",
        transition: "background 0.35s ease, border-color 0.35s ease",
      }}>
        <div style={{
          maxWidth: "900px", margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: "60px",
        }}>

          {/* Left: icon toggle + logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <ThemeToggle />
            <span style={{
              fontWeight: 700, fontSize: "18px",
              background: c.logoGradient,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              MUGISHA Developer
            </span>
          </div>

          {/* Desktop links */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {navLinks.map(link => (
              <NavBtn key={link} link={link} active={active} onNav={handleNav} />
            ))}
          </div>

          {/* Mobile: hamburger only */}
          <div className="mobile-controls" style={{ display: "none", alignItems: "center", gap: "8px" }}>
            <HamburgerBtn menuOpen={menuOpen} onToggle={() => setMenuOpen(o => !o)} />
          </div>
        </div>

        {/* Mobile dropdown */}
        <div className="mobile-menu" style={{
          display: menuOpen ? "flex" : "none",
          flexDirection: "column", gap: "4px",
          padding: "0.5rem 0 1rem",
          maxWidth: "900px", margin: "0 auto",
        }}>
          {navLinks.map(link => (
            <NavBtn key={link} link={link} active={active} onNav={handleNav} mobile />
          ))}
        </div>
      </nav>

      <main style={{
        maxWidth: "900px", margin: "0 auto", width: "100%",
        padding: "2rem 1.25rem", position: "relative", zIndex: 1,
        flex: 1,
      }}>
        {sectionMap[active]}
      </main>

      <Footer onNavigate={handleNav} />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea, input { font-family: inherit; }
        @media (max-width: 599px) {
          .desktop-nav     { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

function NavBtn({ link, active, onNav, mobile = false }) {
  const c = useColors();
  const isActive = active === link;
  return (
    <button onClick={() => onNav(link)} style={{
      background:   isActive ? c.badgeBg : "transparent",
      border:       isActive ? `1px solid ${c.borderAccent}` : `1px solid ${mobile ? c.border : "transparent"}`,
      color:        isActive ? c.accentSoft : c.textMuted,
      borderRadius: "8px",
      padding:      mobile ? "10px 16px" : "6px 14px",
      cursor: "pointer",
      fontSize:     mobile ? "15px" : "14px",
      fontWeight: 500,
      transition: "all 0.2s",
      textAlign: "left",
      width: mobile ? "100%" : "auto",
    }}>
      {link}
    </button>
  );
}

function HamburgerBtn({ menuOpen, onToggle }) {
  const c = useColors();
  return (
    <button
      className="hamburger"
      onClick={onToggle}
      aria-label="Toggle menu"
      style={{
        background: "transparent",
        border: `1px solid ${c.border}`,
        borderRadius: "8px", padding: "6px 10px",
        cursor: "pointer", color: c.textMuted,
        display: "flex", flexDirection: "column",
        gap: "4px", alignItems: "center", justifyContent: "center",
        transition: "border-color 0.35s ease",
      }}
    >
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          display: "block", width: "18px", height: "2px",
          background: menuOpen ? c.accentSoft : c.textMuted,
          borderRadius: "2px", transition: "all 0.2s",
          transform: menuOpen
            ? i === 0 ? "translateY(6px) rotate(45deg)"
              : i === 2 ? "translateY(-6px) rotate(-45deg)"
              : "scaleX(0)"
            : "none",
        }} />
      ))}
    </button>
  );
}

function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  const c = useColors();
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={toggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: "34px", height: "34px", borderRadius: "50%",
        background: hover ? c.badgeBg : c.cardBg,
        border: `1px solid ${c.borderAccent}`,
        cursor: "pointer",
        transition: "all 0.25s",
        userSelect: "none", flexShrink: 0,
        padding: 0,
      }}
    >
      <span style={{
        fontSize: "16px", display: "inline-block", lineHeight: 1,
        transition: "transform 0.4s ease",
        transform: hover ? "rotate(25deg)" : "rotate(0deg)",
      }}>
        {isDark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}