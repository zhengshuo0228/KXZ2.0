import { useState } from "react";

export default function StatsCard() {
  const [date, setDate] = useState("today");

  const stats = {
    purchases: { total: 12, approved: 10, rejected: 2 },
    summary: { total: 8 },
    performance: { applied: 3, approved: 2 },
    schedule: { onLeave: 3, onDuty: 12 },
  };

  return (
    <div className="pms-card ripple-container" style={{ background: "#22D9AE", marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 700 }}>📊 数据统计</div>
        <div style={{ display: "flex", gap: 6 }}>
          {[
            { key: "today", label: "今天" },
            { key: "yesterday", label: "昨天" },
          ].map((item) => (
            <div
              key={item.key}
              onClick={() => setDate(item.key)}
              style={{
                padding: "4px 10px",
                borderRadius: 12,
                fontSize: 12,
                cursor: "pointer",
                background: date === item.key ? "#fff" : "rgba(255,255,255,0.6)",
                fontWeight: date === item.key ? 700 : 400,
              }}
            >
              {item.label}
            </div>
          ))}
          <div style={{ padding: "4px 10px", borderRadius: 12, fontSize: 12, background: "rgba(255,255,255,0.6)", cursor: "pointer" }}>
            📅 自定义
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div style={{ background: "rgba(255,255,255,0.8)", borderRadius: 12, padding: 12 }}>
          <div style={{ fontSize: 12, color: "#555" }}>📋 申购单数</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{stats.purchases.total}</div>
          <div style={{ fontSize: 12, color: "#05A882" }}>✅ 通过 {stats.purchases.approved}</div>
          <div style={{ fontSize: 12, color: "#d94444" }}>❌ 驳回 {stats.purchases.rejected}</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.8)", borderRadius: 12, padding: 12 }}>
          <div style={{ fontSize: 12, color: "#555" }}>📦 采购汇总</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{stats.summary.total}</div>
          <div style={{ fontSize: 12, color: "#555", marginTop: 8 }}>🏅 绩效详情</div>
          <div style={{ fontSize: 12, color: "#05A882" }}>申请 {stats.performance.applied} 通过 {stats.performance.approved}</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.8)", borderRadius: 12, padding: 12, gridColumn: "span 2" }}>
          <div style={{ fontSize: 12, color: "#555" }}>🌤 考勤排休</div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>
            😴 休假 {stats.schedule.onLeave} 人 &nbsp;|&nbsp; ✅ 出勤 {stats.schedule.onDuty} 人
          </div>
        </div>
      </div>
    </div>
  );
}
