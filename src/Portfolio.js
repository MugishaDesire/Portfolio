import { useState, useEffect } from "react";

const projects = [
  {
    title: "E-Commerce Platform",
    desc: "Full-stack shopping app with cart, payments & admin dashboard.",
    tech: ["React", "Node.js", "MySQL"],
    color: "#1a1a2e",
  },
  // {
  //   title: "Weather Dashboard",
  //   desc: "Real-time weather app with beautiful animated data visualizations.",
  //   tech: ["React", "D3.js", "OpenWeather API"],
  //   color: "#16213e",
  // },
  {
    title: "Event Managment",
    desc: "Kanban-style productivity tool with drag & drop and team collaboration.",
    tech: ["Djongo", "MySQL","fulter", "Socket.io"],
    color: "#0f3460",
  },
  {
    title: "Portfolio Builder",
    desc: "Drag-and-drop tool to create stunning portfolios in minutes.",
    tech: ["Vue.js", "Firebase", "Tailwind"],
    color: "#533483",
  },
];

const skills = [
  { name: "React / Next.js", level: 92 },
  { name: "Node.js / Express", level: 90 },
  { name: "TypeScript", level: 80 },
  { name: "UI/UX Design", level: 80 },
  { name: "PostgreSQL / MySQL", level: 90 },
];

const navLinks = ["About", "Skills", "Projects", "Contact"];

function SkillBar({ name, level, visible }) {
  return (
    <div style={{ marginBottom: "1.4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "14px", fontWeight: 500, color: "#e2e8f0" }}>{name}</span>
        <span style={{ fontSize: "13px", color: "#94a3b8" }}>{level}%</span>
      </div>
      <div style={{
        height: "6px", background: "rgba(255,255,255,0.08)",
        borderRadius: "999px", overflow: "hidden"
      }}>
        <div style={{
          height: "100%",
          width: visible ? `${level}%` : "0%",
          background: "linear-gradient(90deg, #6366f1, #a78bfa)",
          borderRadius: "999px",
          transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)"
        }} />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (active === "Skills") {
      const t = setTimeout(() => setSkillsVisible(true), 100);
      return () => clearTimeout(t);
    } else {
      setSkillsVisible(false);
    }
  }, [active]);

  const handleSend = () => {
    if (formData.name && formData.email && formData.message) {
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    }
  };

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
            dev Desire
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

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 2rem", position: "relative", zIndex: 1 }}>

        {/* About */}
        {active === "About" && (
          <div style={{ animation: "fadeUp 0.5s ease both" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "3rem", flexWrap: "wrap" }}>
              <div style={{
                width: "100px", height: "100px", borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #a78bfa)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "40px", flexShrink: 0,
                boxShadow: "0 0 40px rgba(99,102,241,0.3)"
              }}>
                👨‍💻
              </div>
              <div>
                <p style={{ color: "#6366f1", fontSize: "14px", fontWeight: 500, margin: "0 0 4px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Full-Stack Developer
                </p>
                <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, margin: "0 0 8px", lineHeight: 1.1 }}>
                  Desire MUGISHA
                </h1>
                <p style={{ color: "#94a3b8", margin: 0, fontSize: "15px" }}>
                  Based in  Kigali RWANDA
                </p>
              </div>
            </div>

            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px", padding: "2rem", marginBottom: "2rem"
            }}>
              <p style={{ lineHeight: 1.8, color: "#cbd5e1", margin: 0, fontSize: "16px" }}>
                I build fast, beautiful, and accessible web applications. With 3+ years of experience, I specialize in React ecosystems and backend services. I care deeply about clean code, great UX, and shipping products people love.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
              {[
                { label: "Projects Shipped", value: "10+" },
                { label: "Years Experience", value: "3+" },
                { label: "Happy Clients", value: "10" },
                { label: "Open Source Stars", value: "1.2k" },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  background: "rgba(99,102,241,0.06)",
                  border: "1px solid rgba(99,102,241,0.15)",
                  borderRadius: "12px", padding: "1.2rem",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "28px", fontWeight: 700, color: "#a78bfa" }}>{value}</div>
                  <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {active === "Skills" && (
          <div style={{ animation: "fadeUp 0.5s ease both" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>Skills</h2>
            <p style={{ color: "#64748b", marginBottom: "2.5rem", fontSize: "15px" }}>
              Technologies I work with daily
            </p>
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px", padding: "2rem"
            }}>
              {skills.map(s => (
                <SkillBar key={s.name} {...s} visible={skillsVisible} />
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "2rem" }}>
              {["Git", "Docker", "AWS", "Figma", "GraphQL", "Redis", "Jest", "CI/CD"].map(tag => (
                <span key={tag} style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "999px", padding: "6px 14px",
                  fontSize: "13px", color: "#94a3b8"
                }}>{tag}</span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {active === "Projects" && (
          <div style={{ animation: "fadeUp 0.5s ease both" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>Projects</h2>
            <p style={{ color: "#64748b", marginBottom: "2.5rem", fontSize: "15px" }}>
              A selection of my recent work
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.2rem" }}>
              {projects.map((p, i) => (
                <div key={i}
                  onMouseEnter={() => setHoveredProject(i)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    background: hoveredProject === i ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${hoveredProject === i ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.07)"}`,
                    borderRadius: "16px", padding: "1.5rem",
                    cursor: "pointer", transition: "all 0.25s",
                    transform: hoveredProject === i ? "translateY(-3px)" : "none"
                  }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "10px",
                    background: "linear-gradient(135deg, #6366f1, #a78bfa)",
                    marginBottom: "1rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "18px"
                  }}>
                    {["🛍️", "🌤️", "✅", "🎨"][i]}
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>{p.title}</h3>
                  <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.6, marginBottom: "1rem" }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {p.tech.map(t => (
                      <span key={t} style={{
                        background: "rgba(99,102,241,0.12)",
                        color: "#a78bfa", fontSize: "12px",
                        padding: "3px 10px", borderRadius: "999px",
                        border: "1px solid rgba(99,102,241,0.2)"
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact */}
        {active === "Contact" && (
          <div style={{ animation: "fadeUp 0.5s ease both" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>Contact</h2>
            <p style={{ color: "#64748b", marginBottom: "2.5rem", fontSize: "15px" }}>
              Let's build something together
            </p>
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px", padding: "2rem", maxWidth: "520px"
            }}>
              {["name", "email", "message"].map(field => (
                <div key={field} style={{ marginBottom: "1.2rem" }}>
                  <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px", textTransform: "capitalize" }}>
                    {field}
                  </label>
                  {field === "message" ? (
                    <textarea rows={4} value={formData[field]}
                      onChange={e => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                      placeholder={`Your ${field}...`}
                      style={{
                        width: "100%", background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px", padding: "10px 14px",
                        color: "#e2e8f0", fontSize: "14px", resize: "vertical",
                        outline: "none", boxSizing: "border-box",
                        fontFamily: "inherit"
                      }} />
                  ) : (
                    <input type={field === "email" ? "email" : "text"} value={formData[field]}
                      onChange={e => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                      placeholder={`Your ${field}...`}
                      style={{
                        width: "100%", background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px", padding: "10px 14px",
                        color: "#e2e8f0", fontSize: "14px",
                        outline: "none", boxSizing: "border-box",
                        fontFamily: "inherit"
                      }} />
                  )}
                </div>
              ))}
              <button onClick={handleSend} style={{
                background: "linear-gradient(135deg, #6366f1, #a78bfa)",
                border: "none", borderRadius: "10px",
                padding: "11px 28px", color: "#fff",
                fontSize: "14px", fontWeight: 600,
                cursor: "pointer", transition: "opacity 0.2s"
              }}>
                {sent ? "✓ Sent!" : "Send Message"}
              </button>
            </div>
          </div>
        )}
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