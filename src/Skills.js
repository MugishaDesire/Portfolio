import { useState, useEffect } from "react";
import { useColors } from "./ThemeContext";

const skills = [
  { name: "React / Next.js",    level: 92 },
  { name: "Node.js / Express",  level: 90 },
  { name: "TypeScript",         level: 80 },
  { name: "UI/UX Design",       level: 80 },
  { name: "PostgreSQL / MySQL", level: 90 },
];

function SkillBar({ name, level, visible }) {
  const c = useColors();
  return (
    <div style={{ marginBottom: "1.4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "14px", fontWeight: 500, color: c.text }}>{name}</span>
        <span style={{ fontSize: "13px", color: c.textMuted }}>{level}%</span>
      </div>
      <div style={{
        height: "6px",
        background: c.cardBg,
        borderRadius: "999px",
        overflow: "hidden",
        border: `1px solid ${c.border}`,
      }}>
        <div style={{
          height: "100%",
          width: visible ? `${level}%` : "0%",
          background: "linear-gradient(90deg, #6366f1, #a78bfa)",
          borderRadius: "999px",
          transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }} />
      </div>
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
      <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.5rem", color: c.text }}>
        Skills
      </h2>
      <p style={{ color: c.textSubtle, marginBottom: "2.5rem", fontSize: "15px" }}>
        Technologies I work with daily
      </p>

      <div style={{
        background: c.cardBg,
        border: `1px solid ${c.border}`,
        borderRadius: "16px",
        padding: "2rem",
        transition: "background 0.35s ease, border-color 0.35s ease",
      }}>
        {skills.map(s => (
          <SkillBar key={s.name} {...s} visible={skillsVisible} />
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "2rem" }}>
        {["Git", "Docker", "AWS", "Figma", "GraphQL", "Redis", "Jest", "CI/CD"].map(tag => (
          <span key={tag} style={{
            background: c.cardBg,
            border: `1px solid ${c.border}`,
            borderRadius: "999px", padding: "6px 14px",
            fontSize: "13px", color: c.textMuted,
            transition: "background 0.35s ease, border-color 0.35s ease",
          }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}