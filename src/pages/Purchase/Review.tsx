import { useState } from "react";
import { SaaSCard, SaaSTab, SaaSButton, SaaSOutlineButton, EmptyState, StatusBadge, pageStyle, containerStyle, PageTitle } from "../../components/saas";

export default function PurchaseReview() {
  const [tab, setTab] = useState("待审核");
  const tabs = ["待审核", "已审核", "操作日志"];
  const pendingOrders = [
    { id: "PO-20240101", name: "青椒 30 斤", submitter: "小李", date: "2024-01-10" },
    { id: "PO-20240102", name: "鸡腿 20 斤", submitter: "小王", date: "2024-01-10" },
  ];
  const approvedOrders = [
    { id: "PO-20240098", name: "土豆 50 斤", submitter: "小李", date: "2024-01-09" },
    { id: "PO-20240099", name: "生抽 5 瓶", submitter: "小张", date: "2024-01-09" },
  ];

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="申购审核" subtitle="对申购单进行审批与记录查看" />
        <SaaSTab items={tabs} active={tab} onChange={setTab} />

        {tab === "待审核" && (
          pendingOrders.length === 0 ? (
            <SaaSCard><EmptyState icon="📋" text="暂无待审核申购" /></SaaSCard>
          ) : pendingOrders.map((order) => (
            <SaaSCard key={order.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{order.id}</span>
                <StatusBadge text="待审核" type="warning" />
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: "#0F172A" }}>{order.name}</div>
              <div style={{ fontSize: 12, color: "#64748B", marginBottom: 12 }}>申请人：{order.submitter} · {order.date}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <SaaSButton onClick={() => alert(`已通过: ${order.id}`)} style={{ flex: 1 }}>通过</SaaSButton>
                <SaaSOutlineButton onClick={() => alert(`已驳回: ${order.id}`)} style={{ flex: 1 }}>驳回</SaaSOutlineButton>
              </div>
            </SaaSCard>
          ))
        )}

        {tab === "已审核" && (
          approvedOrders.length === 0 ? (
            <SaaSCard><EmptyState icon="📦" text="暂无已审核申购" /></SaaSCard>
          ) : approvedOrders.map((order) => (
            <SaaSCard key={order.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{order.id}</span>
                <StatusBadge text="已通过" type="success" />
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: "#0F172A" }}>{order.name}</div>
              <div style={{ fontSize: 12, color: "#64748B" }}>申请人：{order.submitter} · {order.date}</div>
            </SaaSCard>
          ))
        )}

        {tab === "操作日志" && <SaaSCard><EmptyState icon="📝" text="暂无操作日志" /></SaaSCard>}
      </div>
    </div>
  );
}
