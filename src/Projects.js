import { useState } from "react";

const projects = [
  {
    title: "E-Commerce Platform",
    desc: "Full-stack shopping app with multi-role auth, cart, wishlist, orders & admin dashboard.",
    tech: ["React", "Node.js", "MySQL"],
    icon: "🛍️",
    details: {
      overview:
        "A production-ready e-commerce web app built with React and Node.js. It supports three distinct user roles — Admin, Courier, and Customer — each with their own dashboard and access controls.",
      features: [
        { icon: "🔐", label: "Multi-Role Auth", text: "Admin login with OTP verification, Google OAuth for users, and role-based route guards." },
        { icon: "🛒", label: "Cart & Wishlist", text: "Persistent cart and wishlist with real-time updates and a smooth checkout flow." },
        { icon: "📦", label: "Order Management", text: "Users place and track orders; couriers get a dedicated dashboard to manage deliveries." },
        { icon: "🛡️", label: "Admin Dashboard", text: "Full control over products, users, and orders from a protected admin panel." },
        { icon: "🔑", label: "Password Recovery", text: "Forgot/reset password flow plus Google sign-in integration." },
        { icon: "📱", label: "Responsive UI", text: "Clean, mobile-friendly design with a shared Navbar and Footer on public pages." },
      ],
      pages: ["Home", "About", "Services", "Contact", "Products", "Cart", "Wishlist", "My Orders", "Profile", "Admin Dashboard", "Courier Dashboard"],
    },
  },
  {
    title: "Event Management",
    desc: "Kanban-style productivity tool with real-time team collaboration.",
    tech: ["Django", "MySQL", "Flutter", "Socket.io"],
    icon: "✅",
    details: {
      overview:
        "A cross-platform event and task management system with a Django REST backend and a Flutter mobile frontend, featuring real-time updates via Socket.io.",
      features: [
        { icon: "📋", label: "Kanban Board", text: "Task management across custom columns and stages." },
        { icon: "⚡", label: "Real-Time Sync", text: "Socket.io-powered live collaboration — changes reflect instantly for all team members." },
        { icon: "📅", label: "Event Scheduling", text: "Create, assign, and track events with deadlines and priority levels." },
        { icon: "👥", label: "Team Roles", text: "Role-based permissions for managers and team members." },
      ],
      pages: ["Dashboard", "Board View", "Calendar", "Team", "Settings"],
    },
  },
  {
    title: "Portfolio Builder",
    desc: "A tool to create stunning portfolios in minutes.",
    tech: ["Vue.js", "Firebase", "Tailwind"],
    icon: "🎨",
    details: {
      overview:
        "A no-code portfolio builder where users customize sections to produce a published portfolio site — backed by Firebase for auth and real-time storage.",
      features: [
        { icon: "🖱️", label: "Visual Editor", text: "Intuitive block-based editor to arrange sections without writing code." },
        { icon: "☁️", label: "Firebase Backend", text: "Real-time database and authentication so portfolios sync instantly across devices." },
        { icon: "🎨", label: "Theme System", text: "Multiple color themes and font pairings to match personal brand." },
        { icon: "🔗", label: "Instant Publish", text: "One-click publish to a shareable public URL." },
      ],
      pages: ["Editor", "Preview", "Themes", "Published View", "Account"],
    },
  },
];

function Modal({ project, onClose }) {
  const d = project.details;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
        animation: "fadeIn 0.2s ease both",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#0f0f1a",
          border: "1px solid rgba(99,102,241,0.25)",
          borderRadius: "20px",
          padding: "2rem",
          maxWidth: "640px",
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          position: "relative",
          animation: "slideUp 0.3s cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "1rem", right: "1rem",
            background: "rgba(255,255,255,0.06)", border: "none",
            borderRadius: "8px", color: "#94a3b8",
            width: "32px", height: "32px", cursor: "pointer",
            fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >✕</button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}>
          <div style={{
            width: "48px", height: "48px", borderRadius: "12px",
            background: "linear-gradient(135deg, #6366f1, #a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", flexShrink: 0,
          }}>{project.icon}</div>
          <div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, margin: 0, color: "#e2e8f0" }}>{project.title}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  background: "rgba(99,102,241,0.12)", color: "#a78bfa",
                  fontSize: "12px", padding: "2px 10px", borderRadius: "999px",
                  border: "1px solid rgba(99,102,241,0.2)",
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Overview */}
        <p style={{ color: "#cbd5e1", lineHeight: 1.8, fontSize: "14px", marginBottom: "1.5rem" }}>
          {d.overview}
        </p>

        {/* Features */}
        <h3 style={{
          fontSize: "12px", fontWeight: 600, color: "#6366f1",
          textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.8rem",
        }}>
          Key Features
        </h3>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "0.75rem", marginBottom: "1.5rem",
        }}>
          {d.features.map(f => (
            <div key={f.label} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "12px", padding: "0.9rem",
            }}>
              <div style={{ fontSize: "18px", marginBottom: "6px" }}>{f.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#e2e8f0", marginBottom: "4px" }}>{f.label}</div>
              <div style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.6 }}>{f.text}</div>
            </div>
          ))}
        </div>

        {/* Pages */}
        <h3 style={{
          fontSize: "12px", fontWeight: 600, color: "#6366f1",
          textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.8rem",
        }}>
          Pages & Screens
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {d.pages.map(pg => (
            <span key={pg} style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "999px", padding: "5px 13px",
              fontSize: "12px", color: "#94a3b8",
            }}>{pg}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <div style={{ animation: "fadeUp 0.5s ease both" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>Projects</h2>
        <p style={{ color: "#64748b", marginBottom: "2.5rem", fontSize: "15px" }}>
          A selection of my recent work — click any card to learn more
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.2rem" }}>
          {projects.map((p, i) => (
            <div
              key={i}
              onClick={() => setSelectedProject(p)}
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                background: hoveredProject === i ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${hoveredProject === i ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: "16px", padding: "1.5rem",
                cursor: "pointer", transition: "all 0.25s",
                transform: hoveredProject === i ? "translateY(-3px)" : "none",
              }}
            >
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1, #a78bfa)",
                marginBottom: "1rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px",
              }}>
                {p.icon}
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>{p.title}</h3>
              <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.6, marginBottom: "1rem" }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1rem" }}>
                {p.tech.map(t => (
                  <span key={t} style={{
                    background: "rgba(99,102,241,0.12)",
                    color: "#a78bfa", fontSize: "12px",
                    padding: "3px 10px", borderRadius: "999px",
                    border: "1px solid rgba(99,102,241,0.2)",
                  }}>{t}</span>
                ))}
              </div>
              <div style={{
                fontSize: "12px", color: "#6366f1", fontWeight: 500,
                opacity: hoveredProject === i ? 1 : 0.4,
                transition: "opacity 0.2s",
              }}>
                View details →
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </>
  );
}