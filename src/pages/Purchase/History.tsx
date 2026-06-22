import { useState } from "react";
import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSTab, EmptyState, ListItem, StatusBadge } from "../../components/saas";
import { Search, ChevronRight } from "lucide-react";

const MOCK_HISTORY = [
  { id: "1", submitter: "张三", dept: "厨房", items: "青椒 30 斤，番茄 20 斤", status: "completed", time: "2026-06-10 09:30" },
  { id: "2", submitter: "李四", dept: "厨房", items: "牛腩 10 斤，鸡腿 15 斤", status: "reviewing", time: "2026-06-10 10:15" },
  { id: "3", submitter: "王五", dept: "前厅", items: "矿泉水 5 箱", status: "approved", time: "2026-06-09 16:00" },
];

export default function PurchaseHistory() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("全部");
  const tabs = ["全部", "待审核", "已通过", "已驳回"];

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="申购记录" subtitle="查看历史申购单据" />

        <SaaSCard style={{ padding: 12, marginBottom: 16 }}>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
            <input
              placeholder="搜索提交人、食材"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "10px 14px 10px 36px", border: "1.5px solid #E2E8F0", borderRadius: 12, fontSize: 14, outline: "none" }}
              onFocus={(e) => { e.target.style.borderColor = "#059669"; e.target.style.boxShadow = "0 0 0 3px rgba(5,150,105,0.10)"; }}
              onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none"; }}
            />
          </div>
        </SaaSCard>

        <SaaSTab items={tabs} active={tab} onChange={setTab} />

        <SaaSCard style={{ padding: 0, overflow: "hidden" }}>
          {MOCK_HISTORY.map((history) => (
            <ListItem
              key={history.id}
              title={history.submitter}
              subtitle={`${history.dept} · ${history.items} · ${history.time}`}
              right={
                <>
                  <StatusBadge
                    text={history.status === "completed" || history.status === "approved" ? "已完成" : history.status === "reviewing" ? "审核中" : "已驳回"}
                    type={history.status === "completed" || history.status === "approved" ? "success" : history.status === "reviewing" ? "warning" : "danger"}
                  />
                  <ChevronRight size={16} color="#94A3B8" />
                </>
              }
            />
          ))}
          {MOCK_HISTORY.length === 0 ? <EmptyState icon="📋" text="暂无申购记录" /> : null}
        </SaaSCard>
      </div>
    </div>
  );
}
