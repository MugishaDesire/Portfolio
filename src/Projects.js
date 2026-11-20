import { useState } from "react";
import { useColors } from "./ThemeContext";

const projects = [
  {
    title: "MyShop – E-Commerce Platform",
    desc: "Full-stack shopping app with multi-role auth, cart, wishlist, orders & admin dashboard.",
    tech: ["React", "Node.js", "MySQL"],
    icon: "🛍️",
    link: "https://myshop-plum-six.vercel.app/",
    details: {
      overview:
        "MyShop is a production-ready e-commerce web app built with React and Node.js. It supports three distinct user roles — Admin, Courier, and Customer — each with their own dashboard and access controls. Every screen was designed with a clean, modern aesthetic: a dark-toned palette, smooth micro-animations, and a responsive layout that works seamlessly across desktop and mobile.",

      uiux: {
        heading: "UI / UX Design Highlights",
        description:
          "MyShop was built with a strong focus on visual consistency and intuitive user flows. The design follows a dark-first theme with indigo accent colors, card-based layouts, and clear visual hierarchy across all three user roles.",
        principles: [
          {
            icon: "🎨",
            label: "Design System",
            text: "Unified color palette (deep navy backgrounds, indigo-purple accents, slate typography) applied consistently across all pages. Custom reusable components — buttons, badges, input fields, modals — keep the UI cohesive.",
          },
          {
            icon: "🧭",
            label: "Navigation & Routing",
            text: "Role-aware navigation: the Navbar only appears on public pages. Protected routes redirect based on user role — couriers go to their dashboard, regular users to theirs, admins to the admin panel.",
          },
          {
            icon: "✨",
            label: "Micro-Animations",
            text: "Subtle hover lifts on product cards, fade-in modals, and slide-up transitions on content reveal. Animations use CSS keyframes (fadeIn, slideUp, fadeUp) for smooth, performant motion without layout jank.",
          },
          {
            icon: "📱",
            label: "Responsive Layout",
            text: "Fully mobile-friendly. Grid layouts use auto-fit with minmax to adapt from 1-column mobile views to multi-column desktop grids. Touch targets are appropriately sized and accessible.",
          },
          {
            icon: "🔄",
            label: "User Flows",
            text: "Streamlined 3-step checkout. Cart and wishlist update in real-time with instant UI feedback. Order tracking provides clear status labels. Password recovery is a simple 2-screen email → reset flow.",
          },
          {
            icon: "🛡️",
            label: "Auth UX",
            text: "Admins go through a 2-step OTP verification flow. Google OAuth offers one-click sign-in for customers. Session state is persisted intelligently: admin sessions use sessionStorage for security, user sessions use localStorage for convenience.",
          },
        ],
        screens: [
          { name: "Product Listing",     desc: "Grid of cards with image, name, price, and quick-add-to-cart. Filters and category tabs at the top." },
          { name: "Product Detail",      desc: "Full image, description, size/variant selector, add to cart/wishlist CTAs, and related products below." },
          { name: "Cart Page",           desc: "Line items with quantity stepper, remove option, subtotal calculation, and a prominent checkout button." },
          { name: "Checkout / Order Form", desc: "Delivery address form, order summary panel, and payment section in a clean 2-column layout." },
          { name: "User Dashboard",      desc: "Welcome banner, recent orders list, quick links to Profile, Wishlist, and My Orders." },
          { name: "Admin Dashboard",     desc: "Data tables for products, users, and orders with CRUD actions. Stats overview at the top." },
          { name: "Courier Dashboard",   desc: "Assigned deliveries list with status update controls and order detail drawers." },
          { name: "Auth Screens",        desc: "Minimal centered card layout for Login, Signup, OTP verify, and Forgot/Reset password flows." },
        ],
      },

      features: [
        { icon: "🔐", label: "Multi-Role Auth",    text: "Admin login with OTP verification, Google OAuth for users, and role-based route guards." },
        { icon: "🛒", label: "Cart & Wishlist",    text: "Persistent cart and wishlist with real-time updates and a smooth checkout flow." },
        { icon: "📦", label: "Order Management",   text: "Users place and track orders; couriers get a dedicated dashboard to manage deliveries." },
        { icon: "🛡️", label: "Admin Dashboard",   text: "Full control over products, users, and orders from a protected admin panel." },
        { icon: "🔑", label: "Password Recovery",  text: "Forgot/reset password flow plus Google sign-in integration." },
        { icon: "📱", label: "Responsive UI",      text: "Clean, mobile-friendly design with a shared Navbar and Footer on public pages." },
      ],
      pages: [
        "Home", "About", "Services", "Contact", "Products", "Product Detail",
        "Cart", "Checkout", "Wishlist", "My Orders", "Profile",
        "User Dashboard", "Admin Dashboard", "Courier Dashboard",
        "Login", "Signup", "Verify OTP", "Forgot Password", "Reset Password",
      ],
    },
  },
  {
    title: "Pesa – Budgeting App",
    desc: "Mobile budgeting app: pay your savings first, budget what is left, and count an expense only once it is paid.",
    tech: ["React Native", "Expo", "TypeScript"],
    icon: "💰",
    status: "In development",
    details: {
      overview:
        "Pesa helps people protect their savings before they spend. Each month the user sets how much they have and how much to save, pays the savings through mobile money, and only then unlocks budgets for what is left. Expenses are recorded against a budget only after the payment is confirmed. The app has a green, card-based design with a full light and dark mode.",
      features: [
        { icon: "🏦", label: "Savings First",      text: "Budgets stay locked until the month's savings are paid, so savings are never spent by accident." },
        { icon: "🥧", label: "Category Budgets",   text: "Split what is left across categories, with live warnings when a budget is nearly or fully used." },
        { icon: "📲", label: "Pay-then-Record",    text: "Expenses count against a budget only after the mobile money payment is confirmed." },
        { icon: "📊", label: "Reports",            text: "Monthly report with a preview before the CSV download." },
        { icon: "🌙", label: "Light & Dark Mode",  text: "Theme switch in Profile, remembered between visits." },
        { icon: "🔐", label: "OTP Sign-in",        text: "Sign up, OTP verification and a forgot-password email flow." },
      ],
      pages: [
        "Login", "Create Account", "Verify OTP", "Forgot Password",
        "Dashboard", "Budgets", "Expenses", "Add Expense", "Reports", "Profile",
      ],
    },
  },
  {
    title: "GS Kigeme A – School Website",
    desc: "The official website for GS Kigeme A school, with a staff dashboard to manage everything the public sees.",
    tech: ["Web"], // TODO: replace with the real stack (e.g. "HTML", "CSS", "PHP")
    icon: "🏫",
    link: "http://gs-kigeme-a.rf.gd/",
    details: {
      overview:
        "A public website for GS Kigeme A that gives parents, students and visitors a single place to learn about the school and get in touch. Behind it is a staff dashboard where school staff set and update all the information shown on the website, so no developer is needed for day-to-day changes.",
      features: [
        { icon: "🛠️", label: "Staff Dashboard", text: "School staff log in to add, edit and remove all the information that is visible on the website." },
        { icon: "🌐", label: "Public Website",  text: "Live online and open to parents, students and the community, always showing what staff have published." },
        { icon: "📰", label: "School Info",     text: "Information about the school and its activities in one place." },
        { icon: "📞", label: "Contact",         text: "Easy ways for visitors to reach the school." },
        { icon: "📱", label: "Mobile Friendly", text: "Readable on phones, where most visitors browse." },
      ],
      // TODO: replace with the real pages of the site
      pages: ["Home", "About", "News", "Contact", "Staff Login", "Staff Dashboard"],
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
        { icon: "📋", label: "Kanban Board",     text: "Task management across custom columns and stages." },
        { icon: "⚡", label: "Real-Time Sync",   text: "Socket.io-powered live collaboration — changes reflect instantly for all team members." },
        { icon: "📅", label: "Event Scheduling", text: "Create, assign, and track events with deadlines and priority levels." },
        { icon: "👥", label: "Team Roles",       text: "Role-based permissions for managers and team members." },
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
        { icon: "🖱️", label: "Visual Editor",   text: "Intuitive block-based editor to arrange sections without writing code." },
        { icon: "☁️", label: "Firebase Backend", text: "Real-time database and authentication so portfolios sync instantly across devices." },
        { icon: "🎨", label: "Theme System",     text: "Multiple color themes and font pairings to match personal brand." },
        { icon: "🔗", label: "Instant Publish",  text: "One-click publish to a shareable public URL." },
      ],
      pages: ["Editor", "Preview", "Themes", "Published View", "Account"],
    },
  },
];

// ── Modal ────────────────────────────────────────────────────
function Modal({ project, onClose }) {
  const c = useColors();
  const d = project.details;
  const [activeTab, setActiveTab] = useState("uiux");

  const tabStyle = (tab) => ({
    padding: "6px 16px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    transition: "all 0.2s",
    background: activeTab === tab ? c.badgeBg : "transparent",
    color: activeTab === tab ? c.accentSoft : c.textSubtle,
  });

  const sectionHeading = {
    fontSize: "12px", fontWeight: 600, color: c.accent,
    textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.8rem",
  };

  const cardStyle = {
    background: c.cardBg,
    border: `1px solid ${c.border}`,
    borderRadius: "12px", padding: "0.9rem",
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
        animation: "fadeIn 0.2s ease both",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: c.pageBg,
          border: `1px solid ${c.borderAccent}`,
          borderRadius: "20px",
          padding: "2rem",
          maxWidth: "680px",
          width: "100%",
          maxHeight: "88vh",
          overflowY: "auto",
          position: "relative",
          animation: "slideUp 0.3s cubic-bezier(0.16,1,0.3,1) both",
          transition: "background 0.35s ease",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "1rem", right: "1rem",
            background: c.cardBg, border: `1px solid ${c.border}`,
            borderRadius: "8px", color: c.textMuted,
            width: "32px", height: "32px", cursor: "pointer",
            fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
        >✕</button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <div style={{
            width: "48px", height: "48px", borderRadius: "12px",
            background: "linear-gradient(135deg, #6366f1, #a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", flexShrink: 0,
          }}>{project.icon}</div>
          <div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, margin: 0, color: c.text }}>{project.title}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  background: c.badgeBg, color: c.accentSoft,
                  fontSize: "12px", padding: "2px 10px", borderRadius: "999px",
                  border: `1px solid ${c.badgeBorder}`,
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Live link / status */}
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block", marginBottom: "1.2rem",
              padding: "8px 18px", borderRadius: "999px",
              background: "linear-gradient(135deg, #6366f1, #a78bfa)",
              color: "#fff", fontSize: "13px", fontWeight: 600, textDecoration: "none",
            }}
          >Visit live site ↗</a>
        ) : project.status ? (
          <span style={{
            display: "inline-block", marginBottom: "1.2rem",
            padding: "6px 14px", borderRadius: "999px",
            background: c.badgeBg, color: c.accentSoft,
            border: `1px solid ${c.badgeBorder}`, fontSize: "12px", fontWeight: 600,
          }}>{project.status}</span>
        ) : null}

        {/* Overview */}
        <p style={{ color: c.textMuted, lineHeight: 1.8, fontSize: "14px", marginBottom: "1.5rem" }}>
          {d.overview}
        </p>

        {/* ── Tabs (MyShop only) ── */}
        {d.uiux && (
          <>
            <div style={{
              display: "flex", gap: "4px", marginBottom: "1.5rem",
              background: c.cardBg,
              borderRadius: "999px", padding: "4px",
              border: `1px solid ${c.border}`,
              width: "fit-content",
            }}>
              <button style={tabStyle("uiux")}     onClick={() => setActiveTab("uiux")}>UI / UX</button>
              <button style={tabStyle("features")} onClick={() => setActiveTab("features")}>Features</button>
              <button style={tabStyle("pages")}    onClick={() => setActiveTab("pages")}>Pages</button>
            </div>

            {/* UI/UX tab */}
            {activeTab === "uiux" && (
              <div style={{ animation: "fadeIn 0.2s ease both" }}>
                <p style={{ color: c.textMuted, fontSize: "14px", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  {d.uiux.description}
                </p>

                <h3 style={sectionHeading}>Design Principles</h3>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                  gap: "0.75rem", marginBottom: "1.8rem",
                }}>
                  {d.uiux.principles.map(p => (
                    <div key={p.label} style={cardStyle}>
                      <div style={{ fontSize: "18px", marginBottom: "6px" }}>{p.icon}</div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: c.text, marginBottom: "4px" }}>{p.label}</div>
                      <div style={{ fontSize: "12px", color: c.textSubtle, lineHeight: 1.6 }}>{p.text}</div>
                    </div>
                  ))}
                </div>

                <h3 style={sectionHeading}>Screen Walkthrough</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {d.uiux.screens.map((s, i) => (
                    <div key={s.name} style={{
                      display: "flex", gap: "1rem", alignItems: "flex-start",
                      padding: "0.75rem 1rem",
                      background: c.cardBg,
                      border: `1px solid ${c.border}`,
                      borderRadius: "10px",
                    }}>
                      <div style={{
                        minWidth: "22px", height: "22px",
                        borderRadius: "6px",
                        background: c.badgeBg,
                        color: c.accentSoft,
                        fontSize: "11px", fontWeight: 700,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        {i + 1}
                      </div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 600, color: c.text, marginBottom: "3px" }}>
                          {s.name}
                        </div>
                        <div style={{ fontSize: "12px", color: c.textSubtle, lineHeight: 1.6 }}>
                          {s.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features tab */}
            {activeTab === "features" && (
              <div style={{ animation: "fadeIn 0.2s ease both" }}>
                <h3 style={sectionHeading}>Key Features</h3>
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "0.75rem",
                }}>
                  {d.features.map(f => (
                    <div key={f.label} style={cardStyle}>
                      <div style={{ fontSize: "18px", marginBottom: "6px" }}>{f.icon}</div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: c.text, marginBottom: "4px" }}>{f.label}</div>
                      <div style={{ fontSize: "12px", color: c.textSubtle, lineHeight: 1.6 }}>{f.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pages tab */}
            {activeTab === "pages" && (
              <div style={{ animation: "fadeIn 0.2s ease both" }}>
                <h3 style={sectionHeading}>Pages & Screens</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {d.pages.map(pg => (
                    <span key={pg} style={{
                      background: c.cardBg,
                      border: `1px solid ${c.border}`,
                      borderRadius: "999px", padding: "5px 13px",
                      fontSize: "12px", color: c.textMuted,
                    }}>{pg}</span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Fallback (Event Management, Portfolio Builder) */}
        {!d.uiux && (
          <>
            <h3 style={sectionHeading}>Key Features</h3>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "0.75rem", marginBottom: "1.5rem",
            }}>
              {d.features.map(f => (
                <div key={f.label} style={cardStyle}>
                  <div style={{ fontSize: "18px", marginBottom: "6px" }}>{f.icon}</div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: c.text, marginBottom: "4px" }}>{f.label}</div>
                  <div style={{ fontSize: "12px", color: c.textSubtle, lineHeight: 1.6 }}>{f.text}</div>
                </div>
              ))}
            </div>

            <h3 style={sectionHeading}>Pages & Screens</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {d.pages.map(pg => (
                <span key={pg} style={{
                  background: c.cardBg,
                  border: `1px solid ${c.border}`,
                  borderRadius: "999px", padding: "5px 13px",
                  fontSize: "12px", color: c.textMuted,
                }}>{pg}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Projects page ────────────────────────────────────────────
export default function Projects() {
  const c = useColors();
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <div style={{ animation: "fadeUp 0.5s ease both" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.5rem", color: c.text }}>
          Projects
        </h2>
        <p style={{ color: c.textSubtle, marginBottom: "2.5rem", fontSize: "15px" }}>
          A selection of my recent work — click any card to learn more
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.2rem",
        }}>
          {projects.map((p, i) => (
            <div
              key={i}
              onClick={() => setSelectedProject(p)}
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                background: hoveredProject === i ? c.cardBgHover : c.cardBg,
                border: `1px solid ${hoveredProject === i ? c.borderAccent : c.border}`,
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

              <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px", color: c.text }}>
                {p.title}
              </h3>
              <p style={{ fontSize: "14px", color: c.textMuted, lineHeight: 1.6, marginBottom: "1rem" }}>
                {p.desc}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1rem" }}>
                {p.tech.map(t => (
                  <span key={t} style={{
                    background: c.badgeBg,
                    color: c.accentSoft, fontSize: "12px",
                    padding: "3px 10px", borderRadius: "999px",
                    border: `1px solid ${c.badgeBorder}`,
                  }}>{t}</span>
                ))}
              </div>

              <div style={{
                fontSize: "12px", color: c.accent, fontWeight: 500,
                opacity: hoveredProject === i ? 1 : 0.4,
                transition: "opacity 0.2s",
              }}>
                View details →
              </div>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    display: "inline-block", marginTop: "0.8rem",
                    fontSize: "12px", fontWeight: 600, color: c.accent, textDecoration: "none",
                  }}
                >Visit site ↗</a>
              )}
              {p.status && !p.link && (
                <div style={{ marginTop: "0.8rem", fontSize: "12px", color: c.textSubtle }}>{p.status}</div>
              )}
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
        @keyframes fadeUp  { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </>
  );
}