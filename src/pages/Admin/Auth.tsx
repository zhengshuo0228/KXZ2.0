import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSTab, ListItem, StatusBadge, SaaSButton } from "../../components/saas";

export default function AdminAuth() {
  const [tab, setTab] = useState("跨部门授权");
  const tabs = ["跨部门授权", "跨门店授权"];

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="授权管理" subtitle="管理跨部门与跨门店访问权限" />
        <SaaSTab items={tabs} active={tab} onChange={setTab} />

        {tab === "跨部门授权" ? (
          <>
            <SaaSCard style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>新建授权</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ padding: "12px 14px", border: "1.5px solid #E2E8F0", borderRadius: 14, color: "#64748B", background: "#F8FAFC" }}>请选择员工</div>
                <div style={{ padding: "12px 14px", border: "1.5px solid #E2E8F0", borderRadius: 14, color: "#64748B", background: "#F8FAFC" }}>请选择目标部门</div>
                <SaaSButton onClick={() => {}} block>
                  创建授权
                </SaaSButton>
              </div>
            </SaaSCard>

            <SaaSCard style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#64748B", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>授权列表</div>
              <ListItem
                title="张三"
                subtitle="厨房 -> 前厅"
                right={
                  <>
                    <StatusBadge text="有效" type="success" />
                    <ChevronRight size={16} color="#94A3B8" />
                  </>
                }
              />
              <ListItem title="暂无更多授权" subtitle="仅管理员可维护跨部门访问权限" />
            </SaaSCard>
          </>
        ) : (
          <>
            <SaaSCard style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>新建跨门店授权</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ padding: "12px 14px", border: "1.5px solid #E2E8F0", borderRadius: 14, color: "#64748B", background: "#F8FAFC" }}>请选择员工</div>
                <div style={{ padding: "12px 14px", border: "1.5px solid #E2E8F0", borderRadius: 14, color: "#64748B", background: "#F8FAFC" }}>请选择目标门店</div>
                <SaaSButton onClick={() => {}} block>
                  创建授权
                </SaaSButton>
              </div>
            </SaaSCard>

            <SaaSCard style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#64748B", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>授权列表</div>
              <ListItem
                title="暂无跨门店授权"
                subtitle="仅超级管理员可维护跨门店访问权限"
                right={
                  <>
                    <StatusBadge text="空" type="info" />
                    <ChevronRight size={16} color="#94A3B8" />
                  </>
                }
              />
            </SaaSCard>
          </>
        )}
      </div>
    </div>
  );
}
