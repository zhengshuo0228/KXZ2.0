import { useState } from "react";
import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSTab, ListItem, StatusBadge } from "../../components/saas";

export default function SchedulePage() {
  const [tab, setTab] = useState("考勤");
  const tabs = ["考勤", "月度排休"];

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="考勤排休" subtitle="考勤记录与月度排休管理" />
        <SaaSTab items={tabs} active={tab} onChange={setTab} />

        {tab === "考勤" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <SaaSCard style={{ textAlign: "center", padding: 16 }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#059669" }}>22</div>
                <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>本月出勤</div>
              </SaaSCard>
              <SaaSCard style={{ textAlign: "center", padding: 16 }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#8B5CF6" }}>3</div>
                <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>本月休假</div>
              </SaaSCard>
            </div>

            <SaaSCard>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>考勤记录</div>
              {[
                { date: "6/10", status: "出勤", type: "success" as const },
                { date: "6/9", status: "出勤", type: "success" as const },
                { date: "6/8", status: "休假", type: "info" as const },
                { date: "6/7", status: "出勤", type: "success" as const },
              ].map((record) => (
                <ListItem key={record.date} title={record.date} subtitle={record.status} right={<StatusBadge text={record.status} type={record.type} />} />
              ))}
            </SaaSCard>
          </>
        )}

        {tab === "月度排休" && (
          <SaaSCard>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>6 月排休表</div>
            <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>本页仅展示排休概览，后续可接入编辑与审批。</div>
          </SaaSCard>
        )}
      </div>
    </div>
  );
}
