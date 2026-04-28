import photo from "./Assets/ProfilePhoto.jpeg"; // 👈 update this path to your actual image

export default function About() {
  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "3rem", flexWrap: "wrap" }}>

        {/* ── Avatar ── */}
        <img
          src={photo}
          alt="Desire Mugisha"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
            boxShadow: "0 0 40px rgba(99,102,241,0.3)",
            border: "2px solid rgba(99,102,241,0.4)",
          }}
        />

        {/* ── Name & title ── */}
        <div>
          <p style={{
            color: "#6366f1", fontSize: "14px", fontWeight: 500,
            margin: "0 0 4px", letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            Full-Stack Developer
          </p>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700,
            margin: "0 0 8px", lineHeight: 1.1,
          }}>
            Desire MUGISHA
          </h1>
          <p style={{ color: "#94a3b8", margin: 0, fontSize: "15px" }}>
            Based in Kigali RWANDA
          </p>
        </div>
      </div>

      {/* ── Bio ── */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px", padding: "2rem", marginBottom: "2rem",
      }}>
        <p style={{ lineHeight: 1.8, color: "#cbd5e1", margin: 0, fontSize: "16px" }}>
          I build fast, beautiful, and accessible web applications. With 3+ years of experience,
          I specialize in React ecosystems and backend services. I care deeply about clean code,
          great UX, and shipping products people love.
        </p>
      </div>

      {/* ── Stats ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "1rem",
      }}>
        {[
          { label: "Projects Shipped", value: "10+" },
          { label: "Years Experience", value: "3+" },
          { label: "Happy Clients",    value: "10"  },
          { label: "Open Source Stars", value: "1.2k" },
        ].map(({ label, value }) => (
          <div key={label} style={{
            background: "rgba(99,102,241,0.06)",
            border: "1px solid rgba(99,102,241,0.15)",
            borderRadius: "12px", padding: "1.2rem",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "#a78bfa" }}>{value}</div>
            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}