import React from "react";

const SAAS_BG = "#F4FBFB";
const CARD_RADIUS = "20px";
const CARD_SHADOW = "0 12px 28px rgba(15, 23, 42, 0.08)";

export const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: SAAS_BG,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  color: "#0F172A",
};

export const containerStyle: React.CSSProperties = {
  maxWidth: 480,
  margin: "0 auto",
  minHeight: "100vh",
  padding: "18px 16px 40px",
};

export interface SaaSCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const SaaSCard: React.FC<SaaSCardProps> = ({ children, style }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: CARD_RADIUS,
      padding: 18,
      boxShadow: CARD_SHADOW,
      border: "1px solid #E2E8F0",
      ...style,
    }}
  >
    {children}
  </div>
);

export const PageTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", lineHeight: 1.2, letterSpacing: 0 }}>{title}</div>
    {subtitle ? <div style={{ fontSize: 13, color: "#64748B", marginTop: 8, lineHeight: 1.55 }}>{subtitle}</div> : null}
  </div>
);

export interface SaaSInputProps {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  style?: React.CSSProperties;
}

export const SaaSInput: React.FC<SaaSInputProps> = ({ placeholder, value, onChange, type = "text", style }) => (
  <input
    placeholder={placeholder}
    value={value}
    type={type}
    onChange={(e) => onChange(e.target.value)}
    style={{
      width: "100%",
      padding: "12px 14px",
      border: "1.5px solid #E2E8F0",
      borderRadius: 14,
      fontSize: 14,
      outline: "none",
      background: "#fff",
      color: "#0F172A",
      transition: "all 0.2s ease",
      ...style,
    }}
    onFocus={(e) => {
      e.target.style.borderColor = "#059669";
      e.target.style.boxShadow = "0 0 0 3px rgba(5,150,105,0.10)";
    }}
    onBlur={(e) => {
      e.target.style.borderColor = "#E2E8F0";
      e.target.style.boxShadow = "none";
    }}
  />
);

export const SaaSLegend: React.FC<{ title: string }> = ({ title }) => (
  <div style={{ fontSize: 13, fontWeight: 700, color: "#475569", marginBottom: 12, letterSpacing: 0.2 }}>{title}</div>
);

export const SaaSFormField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#64748B", marginBottom: 8 }}>{label}</label>
    {children}
  </div>
);

export interface SaaSButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  block?: boolean;
  style?: React.CSSProperties;
}

export const SaaSButton: React.FC<SaaSButtonProps> = ({ children, onClick, block, style }) => (
  <button
    onClick={onClick}
    style={{
      padding: "12px 20px",
      borderRadius: 14,
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.2s ease",
      background: "#059669",
      color: "#fff",
      border: "none",
      width: block ? "100%" : undefined,
      height: block ? 46 : undefined,
      ...style,
    }}
    onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
    onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    {children}
  </button>
);

export interface SaaSOutlineButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
}

export const SaaSOutlineButton: React.FC<SaaSOutlineButtonProps> = ({ children, onClick, style }) => (
  <button
    onClick={onClick}
    style={{
      padding: "10px 14px",
      borderRadius: 14,
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",
      background: "#fff",
      color: "#334155",
      border: "1.5px solid #E2E8F0",
      ...style,
    }}
    onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
    onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    {children}
  </button>
);

export interface SaaSTabProps {
  items: string[];
  active: string;
  onChange: (key: string) => void;
}

export const SaaSTab: React.FC<SaaSTabProps> = ({ items, active, onChange }) => (
  <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 16, paddingBottom: 2, scrollbarWidth: "none" }}>
    {items.map((item) => (
      <div
        key={item}
        onClick={() => onChange(item)}
        style={{
          padding: "9px 15px",
          borderRadius: 14,
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          whiteSpace: "nowrap",
          flexShrink: 0,
          background: active === item ? "linear-gradient(135deg, #059669, #34D399)" : "#fff",
          color: active === item ? "#fff" : "#64748B",
          border: `1.5px solid ${active === item ? "#059669" : "#E2E8F0"}`,
          boxShadow: active === item ? "0 8px 20px rgba(5,150,105,0.18)" : "none",
          transition: "all 0.2s ease",
        }}
      >
        {item}
      </div>
    ))}
  </div>
);

export const EmptyState: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 20px", gap: 12 }}>
    <div style={{ fontSize: 44, opacity: 0.45 }}>{icon}</div>
    <div style={{ fontSize: 14, color: "#94A3B8" }}>{text}</div>
  </div>
);

export const ListItem: React.FC<{ title: React.ReactNode; subtitle?: React.ReactNode; right?: React.ReactNode }> = ({ title, subtitle, right }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      padding: "14px 16px",
      borderBottom: "1px solid #F1F5F9",
    }}
  >
    <div style={{ minWidth: 0, flex: 1 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#0F172A", lineHeight: 1.4, wordBreak: "break-word" }}>{title}</div>
      {subtitle ? <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4, lineHeight: 1.45, wordBreak: "break-word" }}>{subtitle}</div> : null}
    </div>
    {right ? <div style={{ color: "#475569", flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>{right}</div> : null}
  </div>
);

export const SaaSBadge: React.FC<{ count: number; style?: React.CSSProperties }> = ({ count, style }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 20,
      height: 20,
      padding: "0 6px",
      borderRadius: 10,
      fontSize: 11,
      fontWeight: 800,
      background: "#EF4444",
      color: "#fff",
      ...style,
    }}
  >
    {count}
  </span>
);

export const StatusBadge: React.FC<{ text: string; type: "success" | "danger" | "warning" | "info" }> = ({ text, type }) => {
  const colors: Record<string, { bg: string; color: string }> = {
    success: { bg: "#ECFDF5", color: "#059669" },
    danger: { bg: "#FEF2F2", color: "#DC2626" },
    warning: { bg: "#FFFBEB", color: "#D97706" },
    info: { bg: "#EFF6FF", color: "#2563EB" },
  };
  const c = colors[type];
  return <span style={{ display: "inline-flex", padding: "4px 9px", borderRadius: 999, fontSize: 12, fontWeight: 700, background: c.bg, color: c.color }}>{text}</span>;
};

export const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; detail?: string; color: string }> = ({ icon, label, value, detail, color }) => (
  <div style={{ background: "#fff", borderRadius: 18, padding: 16, boxShadow: CARD_SHADOW, border: "1px solid #E2E8F0" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      <div style={{ color }}>{icon}</div>
      <span style={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>{label}</span>
    </div>
    <div style={{ fontSize: 28, fontWeight: 800, color: "#0F172A", lineHeight: 1.1 }}>{value}</div>
    {detail ? <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>{detail}</div> : null}
  </div>
);
