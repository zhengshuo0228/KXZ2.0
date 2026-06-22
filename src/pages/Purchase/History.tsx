import { useEffect, useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSTab, EmptyState, ListItem, StatusBadge } from "../../components/saas";
import { getOrders } from "../../api/mockApi";

type PurchaseOrder = {
  id: string;
  status: "pending" | "approved" | "rejected" | string;
  createdAt: string;
  user?: { realName?: string; department?: { name?: string } };
  items: Array<{ name: string; qty: number; unit: string }>;
};

const tabs = ["全部", "待审核", "已通过", "已驳回"];
const statusMap: Record<string, string | undefined> = {
  全部: undefined,
  待审核: "pending",
  已通过: "approved",
  已驳回: "rejected",
};

export default function PurchaseHistory() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("全部");
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getOrders()
      .then((result) => {
        if (result.code === 0) setOrders(result.data as PurchaseOrder[]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = orders.filter((order) => {
    const targetStatus = statusMap[tab];
    if (targetStatus && order.status !== targetStatus) return false;
    const itemText = order.items.map((item) => `${item.name}${item.qty}${item.unit}`).join("，");
    const submitter = order.user?.realName || "我";
    return !search || itemText.includes(search) || submitter.includes(search);
  });

  const getStatus = (status: string) => {
    if (status === "approved") return { text: "已通过", type: "success" as const };
    if (status === "rejected") return { text: "已驳回", type: "danger" as const };
    return { text: "待审核", type: "warning" as const };
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="申购记录" subtitle="查看已提交的申购单据和审核状态" />

        <SaaSCard style={{ padding: 12, marginBottom: 16 }}>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
            <input
              placeholder="搜索提交人、食材"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              style={{ width: "100%", padding: "10px 14px 10px 36px", border: "1.5px solid #E2E8F0", borderRadius: 12, fontSize: 14, outline: "none" }}
              onFocus={(event) => { event.target.style.borderColor = "#059669"; event.target.style.boxShadow = "0 0 0 3px rgba(5,150,105,0.10)"; }}
              onBlur={(event) => { event.target.style.borderColor = "#E2E8F0"; event.target.style.boxShadow = "none"; }}
            />
          </div>
        </SaaSCard>

        <SaaSTab items={tabs} active={tab} onChange={setTab} />

        <SaaSCard style={{ padding: 0, overflow: "hidden" }}>
          {loading ? <div style={{ padding: 24, color: "#94A3B8", textAlign: "center" }}>加载中...</div> : null}
          {!loading && filteredOrders.map((order) => {
            const status = getStatus(order.status);
            const itemText = order.items.map((item) => `${item.name} ${item.qty}${item.unit}`).join("，");
            return (
              <ListItem
                key={order.id}
                title={order.user?.realName || "我的申购"}
                subtitle={`${itemText} · ${new Date(order.createdAt).toLocaleString()}`}
                right={
                  <>
                    <StatusBadge text={status.text} type={status.type} />
                    <ChevronRight size={16} color="#94A3B8" />
                  </>
                }
              />
            );
          })}
          {!loading && filteredOrders.length === 0 ? <EmptyState icon="📋" text="暂无申购记录" /> : null}
        </SaaSCard>
      </div>
    </div>
  );
}
