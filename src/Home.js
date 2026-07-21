import { useState, useEffect, useRef } from "react";
import { useTheme, useColors } from "./ThemeContext";
import cv from "./Assets/Desire_MUGISHA_CV.pdf";

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let delay = deleting ? speed / 2 : speed;
    if (!deleting && charIdx === current.length) delay = pause;
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

export default function Home({ onNavigate }) {
  const { isDark } = useTheme();
  const c = useColors();

  const typed = useTypewriter([
    "Full-Stack Developer",
    "React & Node.js Engineer",
    "Django & REST API Builder",
    "Open to Remote Work",
  ]);

  const [cvHover, setCvHover]     = useState(false);
  const [workHover, setWorkHover] = useState(false);
  const canvasRef = useRef(null);

  // Accent used by the canvas particle field — a touch darker/denser in
  // light mode so the dots and connecting lines stay visible against a
  // pale background, and brighter/glowier in dark mode.
  const dotRGB = isDark ? "129,140,248" : "79,70,229";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 55 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width)  d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotRGB},${c.dotOpacity})`;
        ctx.fill();
      });
      dots.forEach((a, i) => dots.slice(i + 1).forEach(b => {
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${dotRGB},${c.lineOpacity * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }));
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [isDark, c.dotOpacity, c.lineOpacity, dotRGB]);

  return (
    <div style={{
      minHeight: "100vh",
      background: c.heroBg,
      color: c.text,
      colorScheme: isDark ? "dark" : "light",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      overflowX: "hidden",
      transition: "background 0.35s ease, color 0.35s ease",
    }}>
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center" }}>

        <canvas ref={canvasRef} style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none",
        }} />

        {/* Glow orbs — softer & lower-opacity in light mode so they read as
            a subtle tint instead of a washed-out haze */}
        <div style={{
          position: "absolute", top: "-10%", left: "20%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: `radial-gradient(circle, ${c.orb1} 0%, transparent 70%)`,
          filter: isDark ? "blur(40px)" : "blur(60px)",
          opacity: isDark ? 1 : 0.7,
          pointerEvents: "none",
          transition: "background 0.35s ease, opacity 0.35s ease",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", right: "10%",
          width: "350px", height: "350px", borderRadius: "50%",
          background: `radial-gradient(circle, ${c.orb2} 0%, transparent 70%)`,
          filter: isDark ? "blur(40px)" : "blur(60px)",
          opacity: isDark ? 1 : 0.7,
          pointerEvents: "none",
          transition: "background 0.35s ease, opacity 0.35s ease",
        }} />

        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${c.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${c.gridLine} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          transition: "background-image 0.35s ease",
        }} />

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: "900px", margin: "0 auto",
          padding: "80px 2rem 0",
        }}>

          {/* Status badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: c.badgeBg, border: `1px solid ${c.badgeBorder}`,
            borderRadius: "999px", padding: "6px 16px",
            fontSize: "13px", color: c.badgeColor,
            marginBottom: "2rem",
            boxShadow: isDark ? "none" : "0 1px 3px rgba(15,23,42,0.06)",
            animation: "fadeDown 0.6s ease both",
            transition: "background 0.35s ease, border-color 0.35s ease, color 0.35s ease, box-shadow 0.35s ease",
          }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: "#22c55e",
              boxShadow: isDark ? "0 0 6px #22c55e" : "0 0 4px rgba(34,197,94,0.6)",
              display: "inline-block", animation: "pulse 2s infinite",
            }} />
            Available for work — Remote &amp; Kigali
          </div>

          {/* Greeting */}
          <p style={{
            fontSize: "18px", color: c.textSubtle, fontWeight: 400,
            marginBottom: "0.4rem", letterSpacing: "0.04em",
            animation: "fadeUp 0.6s ease 0.1s both",
            transition: "color 0.35s ease",
          }}>
            Hi, I'm
          </p>

          {/* Name */}
          <h1 style={{
            fontSize: "clamp(2.8rem, 6vw, 4.8rem)", fontWeight: 800,
            margin: "0 0 0.2rem", lineHeight: 1.05, letterSpacing: "-0.02em",
            animation: "fadeUp 0.6s ease 0.2s both",
          }}>
            <span key={isDark ? "name-dark" : "name-light"} style={{
              background: c.nameGradient,
              backgroundClip: "text",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}>
              MUGISHA Desire
            </span>
          </h1>

          {/* Typewriter */}
          <div style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            color: c.accent, fontWeight: 600,
            marginBottom: "1.8rem", height: "2rem",
            display: "flex", alignItems: "center", gap: "2px",
            animation: "fadeUp 0.6s ease 0.3s both",
            transition: "color 0.35s ease",
          }}>
            {typed}
            <span style={{
              display: "inline-block", width: "2px", height: "1.2em",
              background: c.accent, marginLeft: "2px",
              animation: "blink 1s step-end infinite",
              transition: "background 0.35s ease",
            }} />
          </div>

          {/* Location */}
          <p style={{
            fontSize: "15px", color: c.textSubtle, marginBottom: "1.6rem",
            animation: "fadeUp 0.6s ease 0.35s both", transition: "color 0.35s ease",
          }}>
            📍 Full-Stack Developer based in{" "}
            <span style={{ color: c.textMuted }}>Kigali</span> and{" "}
            <span style={{ color: c.textMuted }}>Remote</span>.
          </p>

          {/* Description */}
          <p style={{
            fontSize: "16px", lineHeight: 1.85,
            color: c.textMuted, maxWidth: "620px", marginBottom: "2.5rem",
            animation: "fadeUp 0.6s ease 0.4s both", transition: "color 0.35s ease",
          }}>
            I am a full-stack developer from Kigali, Rwanda with{" "}
            <span style={{ color: c.text, fontWeight: 500 }}>2 years of experience</span> in building
            both front-end and back-end web applications. I work with{" "}
            <span style={{ color: c.accentSoft }}>React, Next.js, Node.js, MongoDB, Express, Django, PostgreSQL, and MySQL</span>,
            delivering projects that span client-side interfaces and server-side architecture.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: "flex", gap: "1rem", flexWrap: "wrap",
            marginBottom: "3.5rem",
            animation: "fadeUp 0.6s ease 0.5s both",
          }}>
            <a
              href={cv}
              download="Desire_MUGISHA_CV.pdf"
              onMouseEnter={() => setCvHover(true)}
              onMouseLeave={() => setCvHover(false)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "13px 28px", borderRadius: "12px",
                background: cvHover
                  ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
                  : "linear-gradient(135deg, #6366f1, #a78bfa)",
                color: "#fff", fontWeight: 600, fontSize: "15px",
                textDecoration: "none",
                // Light mode needs a darker, tighter shadow to separate the
                // button from a bright page background; dark mode keeps the
                // soft colored glow.
                boxShadow: isDark
                  ? (cvHover ? "0 8px 30px rgba(99,102,241,0.45)" : "0 4px 20px rgba(99,102,241,0.25)")
                  : (cvHover ? "0 10px 24px rgba(79,70,229,0.35)" : "0 6px 16px rgba(79,70,229,0.22)"),
                transition: "all 0.25s",
                transform: cvHover ? "translateY(-2px)" : "none",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download CV
            </a>

            <button
              onMouseEnter={() => setWorkHover(true)}
              onMouseLeave={() => setWorkHover(false)}
              onClick={() => onNavigate("Projects")}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "13px 28px", borderRadius: "12px",
                background: workHover ? c.cardBgHover : "transparent",
                border: `1px solid ${c.borderAccent}`,
                color: c.accentSoft, fontWeight: 600, fontSize: "15px",
                cursor: "pointer", transition: "all 0.25s",
                transform: workHover ? "translateY(-2px)" : "none",
              }}
            >
              View My Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
          color: c.scrollText, fontSize: "11px", letterSpacing: "0.1em",
          animation: "fadeIn 1s ease 1.5s both", transition: "color 0.35s ease",
        }}>
          <span>SCROLL</span>
          <div style={{
            width: "1px", height: "32px", background: c.scrollLine,
            animation: "scrollLine 1.8s ease infinite", transition: "background 0.35s ease",
          }} />
        </div>
      </section>

      <style>{`
        @keyframes fadeDown  { from { opacity:0; transform:translateY(-12px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeUp    { from { opacity:0; transform:translateY(20px)  } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeIn    { from { opacity:0 } to { opacity:1 } }
        @keyframes blink     { 0%,100% { opacity:1 } 50% { opacity:0 } }
        @keyframes pulse     { 0%,100% { box-shadow:0 0 6px #22c55e } 50% { box-shadow:0 0 14px #22c55e } }
        @keyframes scrollLine { 0% { transform:scaleY(0); transform-origin:top } 50% { transform:scaleY(1); transform-origin:top } 51% { transform:scaleY(1); transform-origin:bottom } 100% { transform:scaleY(0); transform-origin:bottom } }
      `}</style>
    </div>
  );
}
