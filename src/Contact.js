import { useState } from "react";
import { useColors } from "./ThemeContext";

const CONTACT_INFO = [
  {
    icon: "✉️",
    label: "Email",
    value: "mugishadf08@gmail.com",
    href: "mailto:mugishadf08@gmail.com",
    action: "Send email",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+250 781 539 501",
    href: "tel:+250781539501",
    action: "Call now",
  },
  {
    icon: "💬",
    label: "WhatsApp",
    value: "+250 781 539 501",
    href: "https://wa.me/250781539501",
    action: "Chat on WhatsApp",
  },
];

function ContactCard({ icon, label, value, href, action }) {
  const c = useColors();
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        background: c.cardBg,
        border: `1px solid ${hovered ? "#6366f1" : c.border}`,
        borderRadius: "14px",
        padding: "1rem 1.25rem",
        textDecoration: "none",
        transition: "border-color 0.25s ease, transform 0.25s ease, background 0.35s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        cursor: "pointer",
      }}
    >
      {/* Icon badge */}
      <div style={{
        width: "42px",
        height: "42px",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #6366f122, #a78bfa22)",
        border: "1px solid #6366f133",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        flexShrink: 0,
      }}>
        {icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "11px", color: c.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>
          {label}
        </div>
        <div style={{ fontSize: "14px", fontWeight: 600, color: c.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {value}
        </div>
      </div>

      {/* Arrow */}
      <span style={{
        fontSize: "12px",
        color: hovered ? "#a78bfa" : c.textMuted,
        transition: "color 0.25s ease, transform 0.25s ease",
        transform: hovered ? "translateX(3px)" : "translateX(0)",
        flexShrink: 0,
      }}>
        →
      </span>
    </a>
  );
}

export default function Contact() {
  const c = useColors();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent]         = useState(false);
  const [error, setError]       = useState("");
  const [hover, setHover]       = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSend = () => {
    const { name, email, message } = formData;

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in all fields before sending.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    // Open mailto with pre-filled subject + body
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.open(`mailto:mugishadf08@gmail.com?subject=${subject}&body=${body}`, "_blank");

    setSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle = (field) => ({
    width: "100%",
    background: c.inputBg,
    border: `1px solid ${focusedField === field ? "#6366f1" : c.border}`,
    borderRadius: "10px",
    padding: "10px 14px",
    color: c.text,
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "background 0.35s ease, border-color 0.25s ease, color 0.35s ease",
  });

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>

      {/* Header */}
      <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.5rem", color: c.text }}>
        Contact
      </h2>
      <p style={{ color: c.textSubtle, marginBottom: "2.5rem", fontSize: "15px" }}>
        Let's build something together
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
        alignItems: "start",
      }}>

        {/* ── Left: contact info ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ fontSize: "14px", color: c.textMuted, lineHeight: "1.7", marginBottom: "0.5rem" }}>
            Have a project in mind or just want to say hello? Reach out directly via any of the channels below, or send a message using the form.
          </p>
          {CONTACT_INFO.map(info => (
            <ContactCard key={info.label} {...info} />
          ))}
        </div>

        {/* ── Right: form ── */}
        <div style={{
          background: c.cardBg,
          border: `1px solid ${c.border}`,
          borderRadius: "16px",
          padding: "1.75rem",
          transition: "background 0.35s ease, border-color 0.35s ease",
        }}>
          {/* Validation error */}
          {error && (
            <div style={{
              background: "#ef444418",
              border: "1px solid #ef444455",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "13px",
              color: "#f87171",
              marginBottom: "1.2rem",
            }}>
              {error}
            </div>
          )}

          {/* Success banner */}
          {sent && (
            <div style={{
              background: "#22c55e18",
              border: "1px solid #22c55e55",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "13px",
              color: "#4ade80",
              marginBottom: "1.2rem",
            }}>
              ✓ Message prepared — your mail client should open shortly.
            </div>
          )}

          {[
            { field: "name",    type: "text",  placeholder: "Your name" },
            { field: "email",   type: "email", placeholder: "your@email.com" },
            { field: "message", type: null,    placeholder: "What's on your mind..." },
          ].map(({ field, type, placeholder }) => (
            <div key={field} style={{ marginBottom: "1.2rem" }}>
              <label style={{
                display: "block",
                fontSize: "13px",
                color: c.textMuted,
                marginBottom: "6px",
                textTransform: "capitalize",
              }}>
                {field}
              </label>
              {field === "message" ? (
                <textarea
                  rows={4}
                  value={formData[field]}
                  onChange={e => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                  onFocus={() => setFocusedField(field)}
                  onBlur={() => setFocusedField(null)}
                  placeholder={placeholder}
                  style={{ ...inputStyle(field), resize: "vertical" }}
                />
              ) : (
                <input
                  type={type}
                  value={formData[field]}
                  onChange={e => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                  onFocus={() => setFocusedField(field)}
                  onBlur={() => setFocusedField(null)}
                  placeholder={placeholder}
                  style={inputStyle(field)}
                />
              )}
            </div>
          ))}

          <button
            onClick={handleSend}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #6366f1, #a78bfa)",
              border: "none",
              borderRadius: "10px",
              padding: "12px 28px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.25s",
              opacity: hover ? 0.88 : 1,
              transform: hover ? "translateY(-1px)" : "none",
              boxShadow: hover ? "0 6px 20px rgba(99,102,241,0.35)" : "none",
            }}
          >
            {sent ? "✓ Sent!" : "Send Message"}
          </button>
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}