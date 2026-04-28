import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (formData.name && formData.email && formData.message) {
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    }
  };

  return (
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
            <label style={{
              display: "block", fontSize: "13px", color: "#94a3b8",
              marginBottom: "6px", textTransform: "capitalize"
            }}>
              {field}
            </label>
            {field === "message" ? (
              <textarea
                rows={4}
                value={formData[field]}
                onChange={e => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                placeholder={`Your ${field}...`}
                style={{
                  width: "100%", background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px", padding: "10px 14px",
                  color: "#e2e8f0", fontSize: "14px", resize: "vertical",
                  outline: "none", boxSizing: "border-box", fontFamily: "inherit"
                }}
              />
            ) : (
              <input
                type={field === "email" ? "email" : "text"}
                value={formData[field]}
                onChange={e => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                placeholder={`Your ${field}...`}
                style={{
                  width: "100%", background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px", padding: "10px 14px",
                  color: "#e2e8f0", fontSize: "14px",
                  outline: "none", boxSizing: "border-box", fontFamily: "inherit"
                }}
              />
            )}
          </div>
        ))}
        <button
          onClick={handleSend}
          style={{
            background: "linear-gradient(135deg, #6366f1, #a78bfa)",
            border: "none", borderRadius: "10px",
            padding: "11px 28px", color: "#fff",
            fontSize: "14px", fontWeight: 600,
            cursor: "pointer", transition: "opacity 0.2s"
          }}
        >
          {sent ? "✓ Sent!" : "Send Message"}
        </button>
      </div>
    </div>
  );
}
