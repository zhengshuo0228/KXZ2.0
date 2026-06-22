import { useState } from "react";
import { SaaSCard, SaaSTab, StatCard, PageTitle, pageStyle, containerStyle } from "../../components/saas";

export default function PurchaseSummary() {
  const [range, setRange] = useState("今天");
  const ranges = ["今天", "昨天", "本周", "本月"];

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="采购汇总" subtitle="查看申购与采购统计" />
        <SaaSTab items={ranges} active={range} onChange={setRange} />

        <SaaSCard>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <StatCard icon={"📋"} label="申购总数" value="12" detail="较上周 +3" color="#059669" />
            <StatCard icon={"✅"} label="已采购" value="8" detail="完成率 67%" color="#4F46E5" />
            <StatCard icon={"⏳"} label="待采购" value="4" detail="预计明天" color="#D97706" />
            <StatCard icon={"❌"} label="已驳回" value="2" detail="驳回率 17%" color="#DC2626" />
          </div>
        </SaaSCard>
      </div>
    </div>
  );
}
