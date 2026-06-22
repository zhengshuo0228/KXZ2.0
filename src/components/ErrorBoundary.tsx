import React from "react";

type State = {
  error?: Error;
};

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = {};

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error("页面渲染失败：", error);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "#F4FBFB" }}>
        <div style={{ width: "100%", maxWidth: 420, padding: 22, borderRadius: 22, background: "#fff", boxShadow: "0 12px 28px rgba(15,23,42,.08)", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>页面加载遇到问题</div>
          <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 16 }}>可能是旧缓存或登录状态异常。请点击下方按钮清理缓存后重新进入。</div>
          <button
            onClick={() => {
              localStorage.clear();
              location.href = "/login";
            }}
            style={{ width: "100%", height: 44, border: 0, borderRadius: 14, background: "#059669", color: "#fff", fontSize: 14, fontWeight: 700 }}
          >
            清理缓存并重新登录
          </button>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", marginTop: 14, fontSize: 11, color: "#94A3B8" }}>{this.state.error.message}</pre>
        </div>
      </div>
    );
  }
}
