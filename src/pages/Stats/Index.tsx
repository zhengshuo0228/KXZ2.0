import { useState } from "react";
import { SaaSTab, StatCard, pageStyle, containerStyle, PageTitle, SaaSCard, ListItem } from "../../components/saas";
import { BarChart3, ShoppingCart, Trophy, Clock3 } from "lucide-react";

export default function StatsPage() {
  const [range, setRange] = useState("本月");
  const [tab, setTab] = useState("申购");

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="数据统计" subtitle="查看门店申购、采购、绩效与排休概览" />
        <SaaSTab items={["今天", "本周", "本月", "本季"]} active={range} onChange={setRange} />
        <SaaSTab items={["申购", "采购", "绩效", "排休"]} active={tab} onChange={setTab} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 4 }}>
          <StatCard icon={<ShoppingCart size={18} />} label="申购单数" value="12" detail="通过 10 · 驳回 2" color="#059669" />
          <StatCard icon={<BarChart3 size={18} />} label="采购汇总" value="8" detail="已审核完成" color="#6366F1" />
          <StatCard icon={<Trophy size={18} />} label="今日绩效" value="3" detail="申请 3 · 通过 2" color="#D97706" />
          <StatCard icon={<Clock3 size={18} />} label="排休人数" value="15" detail="休假 3 · 出勤 12" color="#8B5CF6" />
        </div>

        <SaaSCard style={{ marginTop: 16, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#64748B", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>本月概览</div>
          <ListItem title="申购完成率" subtitle="83%" right={<span style={{ fontSize: 14, fontWeight: 700, color: "#059669" }}>上升 5%</span>} />
          <ListItem title="采购到货率" subtitle="96%" right={<span style={{ fontSize: 14, fontWeight: 700, color: "#059669" }}>上升 2%</span>} />
          <ListItem title="绩效通过率" subtitle="67%" right={<span style={{ fontSize: 14, fontWeight: 700, color: "#D97706" }}>持平</span>} />
        </SaaSCard>
      </div>
    </div>
  );
}
