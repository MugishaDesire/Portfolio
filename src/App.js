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

// function ThemeToggle() {
//   const { isDark, toggle } = useTheme();
//   const c = useColors();
//   const [hover, setHover] = useState(false);

//   return (
//     <button
//       onClick={toggle}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       aria-label="Toggle theme"
//       title={isDark ? "Switch to light mode" : "Switch to dark mode"}
//       style={{
//         display: "inline-flex", alignItems: "center", justifyContent: "center",
//         width: "34px", height: "34px", borderRadius: "50%",
//         background: hover ? c.badgeBg : c.cardBg,
//         border: `1px solid ${c.borderAccent}`,
//         cursor: "pointer",
//         transition: "all 0.25s",
//         userSelect: "none", flexShrink: 0,
//         padding: 0,
//       }}
//     >
//       <span style={{
//         fontSize: "16px", display: "inline-block", lineHeight: 1,
//         transition: "transform 0.4s ease",
//         transform: hover ? "rotate(25deg)" : "rotate(0deg)",
//       }}>
//         {isDark ? "☀️" : "🌙"}
//       </span>
//     </button>
//   );
// }


function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="toggle-wrapper">
      <input
        className="toggle-checkbox"
        type="checkbox"
        checked={isDark}
        onChange={toggle}
        aria-label="Toggle theme"
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      />
      <div className="toggle-container">
        <div className="toggle-track">
          {/* Sun icon for light mode */}
          <svg
            className="toggle-icon sun-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          
          {/* Moon icon for dark mode */}
          <svg
            className="toggle-icon moon-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>
        <div className="toggle-thumb">
          <div className="toggle-thumb-shine" />
        </div>
      </div>

      <style>{`
        .toggle-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 4px;
          border-radius: 50px;
          background: linear-gradient(145deg, #e0e0e0, #f5f5f5);
          box-shadow: 
            0 4px 15px rgba(0, 0, 0, 0.1),
            inset 0 1px 2px rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .toggle-wrapper:hover {
          box-shadow: 
            0 6px 20px rgba(0, 0, 0, 0.15),
            inset 0 1px 2px rgba(255, 255, 255, 0.8);
          transform: scale(1.02);
        }

        .toggle-wrapper:active {
          transform: scale(0.95);
        }

        .toggle-checkbox {
          appearance: none;
          position: absolute;
          z-index: 2;
          width: 100%;
          height: 100%;
          border-radius: 50px;
          cursor: pointer;
          opacity: 0;
          margin: 0;
        }

        .toggle-container {
          position: relative;
          width: 64px;
          height: 34px;
          border-radius: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.2),
            inset 0 -2px 4px rgba(255, 255, 255, 0.1);
          transition: background 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .toggle-checkbox:checked + .toggle-container {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .toggle-track {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 8px;
          z-index: 0;
        }

        .toggle-icon {
          width: 16px;
          height: 16px;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
        }

        .toggle-thumb {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.2),
            inset 0 -2px 4px rgba(0, 0, 0, 0.05),
            inset 0 2px 4px rgba(255, 255, 255, 0.8);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
        }

        .toggle-checkbox:checked + .toggle-container .toggle-thumb {
          left: calc(100% - 31px);
          background: linear-gradient(135deg, #2d3436 0%, #000000 100%);
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.4),
            inset 0 -2px 4px rgba(255, 255, 255, 0.1),
            inset 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .toggle-thumb-shine {
          position: absolute;
          top: 4px;
          left: 6px;
          width: 8px;
          height: 6px;
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, transparent 100%);
          opacity: 0.6;
          transition: all 0.3s ease;
        }

        .toggle-checkbox:checked + .toggle-container .toggle-thumb-shine {
          opacity: 0.2;
          left: 4px;
          top: 6px;
          width: 6px;
          height: 4px;
        }

        /* Optional: Add ripple effect on click */
        .toggle-wrapper::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50px;
          background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c);
          background-size: 300% 300%;
          opacity: 0;
          z-index: -1;
          animation: gradientShift 3s ease infinite;
          transition: opacity 0.3s ease;
        }

        .toggle-wrapper:hover::after {
          opacity: 0.3;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .toggle-container {
            width: 56px;
            height: 30px;
          }
          .toggle-thumb {
            width: 24px;
            height: 24px;
            top: 3px;
            left: 3px;
          }
          .toggle-checkbox:checked + .toggle-container .toggle-thumb {
            left: calc(100% - 27px);
          }
          .toggle-icon {
            width: 14px;
            height: 14px;
          }
          .toggle-track {
            padding: 0 6px;
          }
        }
      `}</style>
    </div>
  );
}