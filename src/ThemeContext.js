import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);
  const toggle = () => setIsDark(d => !d);
  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Call this hook in ANY component to get isDark + toggle
export function useTheme() {
  return useContext(ThemeContext);
}

// ── Shared color tokens ──────────────────────────────────────
// Import this in every page/component that needs themed colors.
export function useColors() {
  const { isDark } = useTheme();
  return isDark ? dark : light;
}

const dark = {
  // Backgrounds
  pageBg:        "#0a0a0f",
  heroBg:        "#070710",
  cardBg:        "rgba(255,255,255,0.03)",
  cardBgHover:   "rgba(99,102,241,0.07)",
  inputBg:       "rgba(255,255,255,0.04)",

  // Text
  text:          "#e2e8f0",
  textMuted:     "#94a3b8",
  textSubtle:    "#64748b",

  // Accent
  accent:        "#6366f1",
  accentSoft:    "#a78bfa",
  accentHover:   "#4f46e5",

  // Nav
  navBg:         "rgba(10,10,15,0.85)",
  navBorder:     "rgba(255,255,255,0.06)",

  // Badge / tag
  badgeBg:       "rgba(99,102,241,0.1)",
  badgeBorder:   "rgba(99,102,241,0.25)",
  badgeColor:    "#a78bfa",

  // Borders / dividers
  border:        "rgba(255,255,255,0.07)",
  borderAccent:  "rgba(99,102,241,0.35)",

  // Glow / particles
  orb1:          "rgba(99,102,241,0.12)",
  orb2:          "rgba(167,139,250,0.08)",
  gridLine:      "rgba(99,102,241,0.03)",
  dotOpacity:    0.45,
  lineOpacity:   0.12,

  // Misc
  scrollText:    "#334155",
  scrollLine:    "rgba(99,102,241,0.3)",
  shadow:        "rgba(0,0,0,0.4)",
  nameGradient:  "linear-gradient(135deg, #e2e8f0 30%, #a78bfa 100%)",
  logoGradient:  "linear-gradient(135deg, #6366f1, #a78bfa)",
};

const light = {
  // Backgrounds
  pageBg:        "#f8f9ff",
  heroBg:        "#f8f9ff",
  cardBg:        "rgba(99,102,241,0.04)",
  cardBgHover:   "rgba(99,102,241,0.09)",
  inputBg:       "rgba(99,102,241,0.05)",

  // Text
  text:          "#1e1b4b",
  textMuted:     "#475569",
  textSubtle:    "#64748b",

  // Accent
  accent:        "#4f46e5",
  accentSoft:    "#6366f1",
  accentHover:   "#3730a3",

  // Nav
  navBg:         "rgba(248,249,255,0.92)",
  navBorder:     "rgba(99,102,241,0.12)",

  // Badge / tag
  badgeBg:       "rgba(99,102,241,0.08)",
  badgeBorder:   "rgba(99,102,241,0.2)",
  badgeColor:    "#4f46e5",

  // Borders / dividers
  border:        "rgba(99,102,241,0.1)",
  borderAccent:  "rgba(99,102,241,0.3)",

  // Glow / particles
  orb1:          "rgba(99,102,241,0.07)",
  orb2:          "rgba(167,139,250,0.05)",
  gridLine:      "rgba(99,102,241,0.04)",
  dotOpacity:    0.25,
  lineOpacity:   0.07,

  // Misc
  scrollText:    "#94a3b8",
  scrollLine:    "rgba(99,102,241,0.2)",
  shadow:        "rgba(99,102,241,0.1)",
  nameGradient:  "linear-gradient(135deg, #1e1b4b 30%, #6366f1 100%)",
  logoGradient:  "linear-gradient(135deg, #6366f1, #a78bfa)",
};
