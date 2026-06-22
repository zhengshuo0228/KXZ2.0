import { useState } from "react";
import { ChevronRight, Shield } from "lucide-react";
import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSTab, ListItem, StatusBadge } from "../../components/saas";

const POSITIONS = [
  {
    group: "厨房组",
    positions: ["厨师长", "副厨师长", "主配", "炉台", "配菜", "冷菜", "打荷", "洗切"],
    level: 1,
  },
  {
    group: "前厅组",
    positions: ["店长", "主管", "收银员", "领班", "服务员", "传菜员"],
    level: 2,
  },
];

const PERMISSIONS = ["purchase_submit", "purchase_review", "purchase_summary", "purchase_history", "ingredient_manage", "performance_view", "performance_apply", "schedule_view", "schedule_manage", "account_manage", "position_manage"];

export default function AdminPosition() {
  const [group, setGroup] = useState(POSITIONS[0].group);
  const selectedGroup = POSITIONS.find((item) => item.group === group) ?? POSITIONS[0];

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="岗位管理" subtitle="维护岗位分组、层级与权限映射" />
        <SaaSTab items={POSITIONS.map((item) => item.group)} active={group} onChange={setGroup} />

        <SaaSCard style={{ padding: 0, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#64748B", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>{selectedGroup.group}</div>
          {selectedGroup.positions.map((position) => (
            <ListItem
              key={position}
              title={position}
              subtitle={`岗位层级 ${selectedGroup.level}`}
              right={
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Shield size={14} color="#94A3B8" />
                  <ChevronRight size={16} color="#94A3B8" />
                </div>
              }
            />
          ))}
        </SaaSCard>

        <SaaSCard>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>权限分配 - {selectedGroup.group}</div>
          <div style={{ fontSize: 13, color: "#64748B", marginBottom: 12 }}>选择该岗位拥有的功能权限</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {PERMISSIONS.map((perm, index) => (
              <StatusBadge key={perm} text={perm} type={index % 3 === 0 ? "success" : index % 3 === 1 ? "info" : "warning"} />
            ))}
          </div>
        </SaaSCard>
      </div>
    </div>
  );
}
