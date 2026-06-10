import { useState, useEffect } from "react";
import { useColors } from "./ThemeContext";

const skills = [
  { name: "React / Next.js",    level: 92 },
  { name: "Node.js / Express",  level: 90 },
  { name: "TypeScript",         level: 80 },
  { name: "UI/UX Design",       level: 80 },
  { name: "PostgreSQL / MySQL", level: 90 },
];

const services = [
  {
    icon: "🌐",
    title: "Web Development",
    description:
      "Building fast, scalable, and responsive full-stack web applications using modern frameworks like React and Next.js.",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description:
      "Crafting intuitive, pixel-perfect interfaces with a focus on user experience, accessibility, and clean aesthetics.",
  },
  {
    icon: "⚙️",
    title: "Backend Development",
    description:
      "Designing and building robust server-side systems, REST APIs, and microservices with Node.js, Express, and Django.",
  },
  {
    icon: "🔌",
    title: "API Integration",
    description:
      "Seamlessly connecting third-party services, payment gateways, and external APIs into existing or new platforms.",
  },
  {
    icon: "🗄️",
    title: "Database Design",
    description:
      "Architecting efficient relational and non-relational database schemas optimised for performance and scalability.",
  },
];

const techTags = [
  "Git", "Docker", "AWS", "Figma", "GraphQL",
  "Redis", "Jest", "CI/CD", "Django", "Flutter", "MySQL",
];

function SkillBar({ name, level, visible }) {
  const c = useColors();
  return (
    <div style={{ marginBottom: "1.4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "14px", fontWeight: 500, color: c.text }}>{name}</span>
        <span style={{ fontSize: "13px", color: c.textMuted }}>{level}%</span>
      </div>
      <div
        style={{
          height: "6px",
          background: c.cardBg,
          borderRadius: "999px",
          overflow: "hidden",
          border: `1px solid ${c.border}`,
        }}
      >
        <div
          style={{
            height: "100%",
            width: visible ? `${level}%` : "0%",
            background: "linear-gradient(90deg, #6366f1, #a78bfa)",
            borderRadius: "999px",
            transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, description }) {
  const c = useColors();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: c.cardBg,
        border: `1px solid ${hovered ? "#6366f1" : c.border}`,
        borderRadius: "16px",
        padding: "1.5rem",
        transition: "background 0.35s ease, border-color 0.25s ease, transform 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #6366f122, #a78bfa22)",
          border: "1px solid #6366f133",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          marginBottom: "1rem",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: "15px",
          fontWeight: 600,
          color: c.text,
          marginBottom: "0.5rem",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "13px", color: c.textMuted, lineHeight: "1.6", margin: 0 }}>
        {description}
      </p>
    </div>
  );
}

export default function Skills() {
  const c = useColors();
  const [skillsVisible, setSkillsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSkillsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>

      {/* ── Section header ── */}
      <h2
        style={{
          fontSize: "1.8rem",
          fontWeight: 700,
          marginBottom: "0.5rem",
          color: c.text,
        }}
      >
        Skills &amp; Services
      </h2>
      <p style={{ color: c.textSubtle, marginBottom: "2.5rem", fontSize: "15px" }}>
        What I do and the technologies I work with daily
      </p>

      {/* ── Services grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
          marginBottom: "3rem",
        }}
      >
        {services.map((s) => (
          <ServiceCard key={s.title} {...s} />
        ))}
      </div>

      {/* ── Skill bars ── */}
      <h3
        style={{
          fontWeight: 600,
          color: c.text,
          marginBottom: "1.25rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontSize: "12px",
        }}
      >
        Proficiency
      </h3>
      <div
        style={{
          background: c.cardBg,
          border: `1px solid ${c.border}`,
          borderRadius: "16px",
          padding: "2rem",
          transition: "background 0.35s ease, border-color 0.35s ease",
          marginBottom: "2rem",
        }}
      >
        {skills.map((s) => (
          <SkillBar key={s.name} {...s} visible={skillsVisible} />
        ))}
      </div>

      {/* ── Tech tags ── */}
      <h3
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color: c.text,
          marginBottom: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        Tools &amp; Technologies
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {techTags.map((tag) => (
          <span
            key={tag}
            style={{
              background: c.cardBg,
              border: `1px solid ${c.border}`,
              borderRadius: "999px",
              padding: "6px 14px",
              fontSize: "13px",
              color: c.textMuted,
              transition: "background 0.35s ease, border-color 0.35s ease",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}