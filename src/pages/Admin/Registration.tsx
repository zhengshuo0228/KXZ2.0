import { pageStyle, containerStyle, PageTitle, SaaSCard, ListItem, StatusBadge } from "../../components/saas";
import { ChevronRight } from "lucide-react";

const MOCK_REGISTRATIONS = [
  { id: "1", name: "张三", store: "开小灶总店", dept: "厨房", position: "厨师长", remark: "申请新账号", time: "2026-06-10 08:30" },
  { id: "2", name: "李四", store: "开小灶分店A", dept: "前厅", position: "服务员", remark: "", time: "2026-06-09 14:00" },
];

export default function AdminRegistration() {
  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="注册审批" subtitle="管理员审核用户注册申请" />

        {MOCK_REGISTRATIONS.map((registration) => (
          <SaaSCard key={registration.id} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{registration.name}</div>
              <StatusBadge text="待审批" type="warning" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: "#64748B" }}>门店: {registration.store}</div>
              <div style={{ fontSize: 12, color: "#64748B" }}>部门: {registration.dept}</div>
              <div style={{ fontSize: 12, color: "#64748B" }}>岗位: {registration.position}</div>
              <div style={{ fontSize: 12, color: "#64748B" }}>时间: {registration.time}</div>
            </div>
            {registration.remark ? <div style={{ fontSize: 12, color: "#64748B", padding: "8px 12px", background: "#F8FAFC", borderRadius: 12, marginBottom: 12 }}>{registration.remark}</div> : null}
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, padding: "11px 0", borderRadius: 14, background: "#059669", color: "#fff", textAlign: "center", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>通过</div>
              <div style={{ flex: 1, padding: "11px 0", borderRadius: 14, background: "#fff", color: "#DC2626", border: "1.5px solid #FEE2E2", textAlign: "center", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>驳回</div>
            </div>
          </SaaSCard>
        ))}

        <SaaSCard>
          <ListItem title="账号管理入口" subtitle="进入账号列表和岗位管理" right={<ChevronRight size={16} color="#94A3B8" />} />
        </SaaSCard>
      </div>
    </div>
  );
}
