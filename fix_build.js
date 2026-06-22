const fs = require("fs");
const path = require("path");
const base = __dirname + "/src/pages";

const files = {};

files[path.join(base, "Purchase/Submit.tsx")] = \import { useState } from "react";
import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSButton, SaaSTab } from "../../components/saas";
import { CheckCircle2, Minus, Plus, Trash2 } from "lucide-react";
import { CATEGORIES, MENU_ITEMS } from "../../types/presets";

export default function PurchaseSubmit() {
  const [category, setCategory] = useState("\u5168\u90e8");
  const [items, setItems] = useState([]);
  const [showSelected, setShowSelected] = useState(false);
  const menuItems = MENU_ITEMS.filter((m) => category === "\u5168\u90e8" || m.category === category);

  const addItem = (item) => {
    setItems((prev) => {
      const ex = prev.find((p) => p.menuId === item.id);
      return ex
        ? prev.map((p) => (p.menuId === item.id ? { ...p, qty: p.qty + item.defaultQty } : p))
        : [...prev, { menuId: item.id, name: item.name, qty: item.defaultQty, unit: item.unit }];
    });
  };
  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.menuId !== id));
  const updateQty = (id, qty) => setItems((prev) => prev.map((p) => (p.menuId === id ? { ...p, qty } : p)));
  const selectedCount = items.length;

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="\u7533\u8d2d\u63d0\u4ea4" subtitle="\u9009\u62e9\u98df\u6750\u5e76\u63d0\u4ea4\u7533\u8d2d\u5355" />
        {selectedCount > 0 && (
          <div onClick={() => setShowSelected(!showSelected)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#ECFDF5", borderRadius: 14, padding: "12px 16px", marginBottom: 16, cursor: "pointer", border: "1px solid #A7F3D0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CheckCircle2 size={18} color="#059669" />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#059669" }}>\u5df2\u9009 {selectedCount} \u9879</span>
            </div>
            <div style={{ fontSize: 12, color: "#059669" }}>{showSelected ? "\u6536\u8d77" : "\u5c55\u5f00"}</div>
          </div>
        )}
        {showSelected && selectedCount > 0 && (
          <SaaSCard style={{ marginBottom: 16, padding: 0 }}>
            {items.map((item) => (
              <div key={item.menuId} style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid #F3F4F6" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{item.unit}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div onClick={() => updateQty(item.menuId, Math.max(1, item.qty - 1))} style={{ width: 28, height: 28, borderRadius: "50%", border: "1.5px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Minus size={12} /></div>
                  <span style={{ width: 32, textAlign: "center", fontSize: 14, fontWeight: 600 }}>{item.qty}</span>
                  <div onClick={() => updateQty(item.menuId, item.qty + 1)} style={{ width: 28, height: 28, borderRadius: "50%", background: "#059669", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Plus size={12} /></div>
                  <div onClick={() => removeItem(item.menuId)} style={{ cursor: "pointer", padding: 4 }}><Trash2 size={16} color="#DC2626" /></div>
                </div>
              </div>
            ))}
          </SaaSCard>
        )}
        <SaaSTab items={CATEGORIES} active={category} onChange={setCategory} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 12 }}>
          {menuItems.map((m) => {
            const isInList = items.some((p) => p.menuId === m.id);
            return (
              <div key={m.id} onClick={() => addItem(m)} style={{ padding: "14px 8px", borderRadius: 14, background: isInList ? "#ECFDF5" : "#fff", border: \1.5px solid \\, cursor: "pointer", textAlign: "center", transition: "all 0.2s ease", position: "relative" }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{m.name}</div>
                <div style={{ fontSize: 12, color: "#059669", fontWeight: 600, marginTop: 4 }}>{m.defaultQty}{m.unit}</div>
                {isInList && <div style={{ position: "absolute", top: 6, right: 6, width: 16, height: 16, borderRadius: "50%", background: "#059669", display: "flex", alignItems: "center", justifyContent: "center" }}><CheckCircle2 size={10} color="#fff" /></div>}
              </div>
            );
          })}
        </div>
        <SaaSButton block onClick={() => { if (selectedCount === 0) return; alert(\\u5df2\u63d0\u4ea4 \ \u9879\u7533\u8d2d\); setItems([]); setShowSelected(false); }} style={{ marginTop: 20 }}>\u786e\u8ba4\u63d0\u4ea4 ({selectedCount})</SaaSButton>
      </div>
    </div>
  );
}\;

files[path.join(base, "Admin/Auth.tsx")] = \import { useState } from "react";
import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSTab, ListItem, StatusBadge } from "../../components/saas";
import { ChevronRight } from "lucide-react";

export default function AdminAuth() {
  const [tab, setTab] = useState("\u8de8\u90e8\u95e8\u6388\u6743");
  const tabs = ["\u8de8\u90e8\u95e8\u6388\u6743", "\u8de8\u95e8\u5e97\u6388\u6743"];

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="\u6388\u6743\u7ba1\u7406" subtitle="\u7ba1\u7406\u8de8\u90e8\u95e8/\u8de8\u95e8\u5e97\u8bbf\u95ee\u6743\u9650" />
        <SaaSTab items={tabs} active={tab} onChange={setTab} />
        
        {tab === "\u8de8\u90e8\u95e8\u6388\u6743" && (<>
          <SaaSCard style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>\u65b0\u5efa\u6388\u6743</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div><label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#6B7280", marginBottom: 6 }}>\u9009\u62e9\u5458\u5de5</label><div style={{ padding: "11px 14px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, color: "#6B7280", background: "#F9FAFB" }}>\u8bf7\u9009\u62e9\u5458\u5de5</div></div>
              <div><label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#6B7280", marginBottom: 6 }}>\u6388\u6743\u90e8\u95e8</label><div style={{ padding: "11px 14px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, color: "#6B7280", background: "#F9FAFB" }}>\u8bf7\u9009\u62e9\u76ee\u6807\u90e8\u95e8</div></div>
              <button style={{ padding: "12px 20px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", background: "#4F46E5", color: "#fff", border: "none" }}>\u521b\u5efa\u6388\u6743</button>
            </div>
          </SaaSCard>
          <SaaSCard style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", fontSize: 15, fontWeight: 600, borderBottom: "1px solid #F3F4F6" }}>\u6388\u6743\u5217\u8868</div>
            <ListItem title="\u5f20\u4e09" subtitle="\u53a8\u623f \u2192 \u524d\u5385" right={<><StatusBadge text="\u6709\u6548" type="success" /><ChevronRight size={16} color="#9CA3AF" /></>} />
            <ListItem title="\u6682\u65e0\u66f4\u591a\u6388\u6743" subtitle="\u4ec5\u7ba1\u7406\u5458\u53ef\u64cd\u4f5c" />
          </SaaSCard>
        </>)}

        {tab === "\u8de8\u95e8\u5e97\u6388\u6743" && (<>
          <SaaSCard style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>\u65b0\u5efa\u8de8\u95e8\u5e97\u6388\u6743</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div><label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#6B7280", marginBottom: 6 }}>\u9009\u62e9\u5458\u5de5</label><div style={{ padding: "11px 14px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, color: "#6B7280", background: "#F9FAFB" }}>\u8bf7\u9009\u62e9\u5458\u5de5</div></div>
              <div><label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#6B7280", marginBottom: 6 }}>\u6388\u6743\u95e8\u5e97</label><div style={{ padding: "11px 14px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, color: "#6B7280", background: "#F9FAFB" }}>\u8bf7\u9009\u62e9\u76ee\u6807\u95e8\u5e97</div></div>
              <button style={{ padding: "12px 20px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", background: "#4F46E5", color: "#fff", border: "none" }}>\u521b\u5efa\u6388\u6743</button>
            </div>
          </SaaSCard>
          <SaaSCard style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", fontSize: 15, fontWeight: 600, borderBottom: "1px solid #F3F4F6" }}>\u6388\u6743\u5217\u8868</div>
            <ListItem title="\u6682\u65e0\u8de8\u95e8\u5e97\u6388\u6743" subtitle="\u4ec5\u8d85\u7ea7\u7ba1\u7406\u5458\u53ef\u64cd\u4f5c" />
          </SaaSCard>
        </>)}
      </div>
    </div>
  );
}\;

files[path.join(base, "Performance/Dashboard.tsx")] = \import { useState } from "react";
import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSTab, StatCard, ListItem, StatusBadge } from "../../components/saas";
import { Award, TrendingUp, CheckCircle2, Settings } from "lucide-react";

export default function PerformanceDashboard() {
  const [tab, setTab] = useState("\u6211\u7684\u7ee9\u6548");
  const tabItems = ["\u6211\u7684\u7ee9\u6548", "\u5168\u5458\u8bb0\u5f55", "\u79ef\u5206\u6392\u884c", "\u5f85\u5ba1\u6838", "\u7ee9\u6548\u7ba1\u7406"];

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="\u7ee9\u6548\u770b\u677f" subtitle="\u7ee9\u6548\u8bb0\u5f55\u3001\u7533\u8bf7\u4e0e\u5ba1\u6838\u7ba1\u7406" />
        <SaaSTab items={tabItems} active={tab} onChange={setTab} />

        {tab === "\u6211\u7684\u7ee9\u6548" && (<>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <StatCard icon={<Award size={18} />} label="\u5f53\u524d\u79ef\u5206" value="128" color="#059669" />
            <StatCard icon={<TrendingUp size={18} />} label="\u672c\u6708\u8bc4\u7ea7" value="A" color="#4F46E5" />
          </div>
          <SaaSCard>
            <ListItem title="\u98df\u6750\u8282\u7ea6" subtitle="\u8282\u7ea6\u852c\u83dc\u7c7b 5 \u65a4" right={<span style={{ color: "#059669", fontWeight: 600, fontSize: 14 }}>+10</span>} />
            <ListItem title="\u6309\u65f6\u5230\u5c97" subtitle="\u672c\u6708 22 \u5929\u5168\u52e4" right={<span style={{ color: "#059669", fontWeight: 600, fontSize: 14 }}>+22</span>} />
            <ListItem title="\u536b\u751f\u68c0\u67e5" subtitle="\u4e0d\u5408\u683c\uff0c\u9700\u6574\u6539" right={<span style={{ color: "#DC2626", fontWeight: 600, fontSize: 14 }}>-5</span>} />
          </SaaSCard>
        </>)}

        {tab === "\u5168\u5458\u8bb0\u5f55" && (
          <SaaSCard style={{ padding: 0, overflow: "hidden" }}>
            {[{ name: "\u5f20\u4e09", dept: "\u53a8\u623f", score: "128", level: "A" }, { name: "\u674e\u56db", dept: "\u53a8\u623f", score: "105", level: "B" }].map((u) => (
              <ListItem key={u.name} title={u.name} subtitle={\\ \u00b7 \u79ef\u5206 \\} right={<StatusBadge text={\\u8bc4\u7ea7 \\} type={u.level === "A" ? "success" : "info"} />} />
            ))}
          </SaaSCard>
        )}

        {tab === "\u79ef\u5206\u6392\u884c" && (
          <SaaSCard style={{ padding: 0, overflow: "hidden" }}>
            {[{ rank: 1, name: "\u5f20\u4e09", score: 128 }, { rank: 2, name: "\u738b\u4e94", score: 115 }, { rank: 3, name: "\u674e\u56db", score: 105 }].map((p) => (
              <ListItem key={p.name} title={<div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 24, height: 24, borderRadius: "50%", background: p.rank === 1 ? "#FFD700" : p.rank === 2 ? "#C0C0C0" : "#CD7F32", color: "#fff", fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{p.rank}</span>{p.name}</div>} subtitle={\\u79ef\u5206 \\} right={<span style={{ fontWeight: 600, color: "#059669" }}>{p.score} \u5206</span>} />
            ))}
          </SaaSCard>
        )}

        {tab === "\u5f85\u5ba1\u6838" && (
          <SaaSCard>
            <ListItem title="\u5f20\u4e09 \u00b7 \u7ee9\u6548\u7533\u8bf7" subtitle="\u98df\u6750\u8282\u7ea6 3 \u65a4 \u00b7 2026-06-10" right={<><StatusBadge text="\u5f85\u5ba1\u6838" type="warning" /><span style={{ marginLeft: 8, cursor: "pointer", color: "#059669", fontWeight: 600, fontSize: 13 }}>\u5ba1\u6838</span></>} />
            <ListItem title="\u674e\u56db \u00b7 \u7ee9\u6548\u7533\u8bf7" subtitle="\u8fdf\u5230 2 \u6b21 \u00b7 2026-06-09" right={<><StatusBadge text="\u5f85\u5ba1\u6838" type="warning" /><span style={{ marginLeft: 8, cursor: "pointer", color: "#059669", fontWeight: 600, fontSize: 13 }}>\u5ba1\u6838</span></>} />
          </SaaSCard>
        )}

        {tab === "\u7ee9\u6548\u7ba1\u7406" && (<>
          <SaaSCard>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}><Settings size={16} color="#4F46E5" /> \u9884\u8bbe\u7ba1\u7406</div>
            {[{ name: "\u98df\u6750\u8282\u7ea6", type: "\u52a0\u5206", default: "+10" }, { name: "\u6309\u65f6\u5230\u5c97", type: "\u52a0\u5206", default: "+1" }, { name: "\u536b\u751f\u68c0\u67e5\u4e0d\u5408\u683c", type: "\u6263\u5206", default: "-5" }, { name: "\u8fdf\u5230\u65e9\u9000", type: "\u6263\u5206", default: "-3" }].map((p) => (
              <ListItem key={p.name} title={p.name} subtitle={\\ \u00b7 \u9ed8\u8ba4 \\} right={<StatusBadge text={p.type} type={p.type === "\u52a0\u5206" ? "success" : "danger"} />} />
            ))}
          </SaaSCard>
          <SaaSCard>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}><CheckCircle2 size={16} color="#059669" /> \u8bb0\u5f55\u8c03\u6574</div>
            <div style={{ fontSize: 13, color: "#6B7280", padding: "12px 0" }}>\u7ba1\u7406\u5458\u53ef\u5bf9\u67d0\u5458\u5de5\u7684\u7ee9\u6548\u8bb0\u5f55\u8fdb\u884c\u624b\u52a8\u8c03\u6574\u3002</div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <div style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: "#4F46E5", color: "#fff", textAlign: "center", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>\u65b0\u589e\u8bb0\u5f55</div>
              <div style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: "#fff", color: "#374151", border: "1.5px solid #E5E7EB", textAlign: "center", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>\u8c03\u6574\u8bb0\u5f55</div>
            </div>
          </SaaSCard>
        </>)}
      </div>
    </div>
  );
}\;

files[path.join(base, "Purchase/History.tsx")] = \import { useState } from "react";
import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSTab, EmptyState, ListItem, StatusBadge } from "../../components/saas";
import { Search, ChevronRight } from "lucide-react";

const MOCK_HISTORY = [
  { id: "1", submitter: "\u5f20\u4e09", dept: "\u53a8\u623f", items: "\u9752\u6912 30\u65a4, \u756a\u8304 20\u65a4", status: "completed", time: "2026-06-10 09:30" },
  { id: "2", submitter: "\u674e\u56db", dept: "\u53a8\u623f", items: "\u725b\u8169 10\u65a4, \u9e21\u817f 15\u65a4", status: "reviewing", time: "2026-06-10 10:15" },
  { id: "3", submitter: "\u738b\u4e94", dept: "\u524d\u5385", items: "\u77ff\u6cc9\u6c34 5\u7bb1", status: "approved", time: "2026-06-09 16:00" },
];

export default function PurchaseHistory() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("\u5168\u90e8");
  const tabs = ["\u5168\u90e8", "\u5f85\u5ba1\u6838", "\u5df2\u901a\u8fc7", "\u5df2\u9a73\u56de"];

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="\u7533\u8d2d\u8bb0\u5f55" subtitle="\u67e5\u770b\u5386\u53f2\u7533\u8d2d\u5355\u636e" />
        <SaaSCard style={{ padding: 12, marginBottom: 16 }}>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
            <input placeholder="\u641c\u7d22\u63d0\u4ea4\u4eba\u3001\u98df\u6750\u2026" value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: "100%", padding: "10px 14px 10px 36px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, outline: "none" }} onFocus={(e) => { e.target.style.borderColor = "#4F46E5"; e.target.style.boxShadow = "0 0 0 3px rgba(79,70,229,0.1)"; }} onBlur={(e) => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }} />
          </div>
        </SaaSCard>
        <SaaSTab items={tabs} active={tab} onChange={setTab} />
        <SaaSCard style={{ padding: 0, overflow: "hidden" }}>
          {MOCK_HISTORY.map((h) => (
            <ListItem key={h.id} title={h.submitter} subtitle={\\ \u00b7 \ \u00b7 \\} right={<><StatusBadge text={h.status === "completed" || h.status === "approved" ? "\u5df2\u5b8c\u6210" : h.status === "reviewing" ? "\u5ba1\u6838\u4e2d" : "\u5df2\u9a73\u56de"} type={h.status === "completed" || h.status === "approved" ? "success" : h.status === "reviewing" ? "warning" : "danger"} /><ChevronRight size={16} color="#9CA3AF" /></>} />
          ))}
          {MOCK_HISTORY.length === 0 && <EmptyState icon="\ud83d\udccb" text="\u6682\u65e0\u7533\u8d2d\u8bb0\u5f55" />}
        </SaaSCard>
      </div>
    </div>
  );
}\;

for (const [p, c] of Object.entries(files)) {
  fs.writeFileSync(p, c, "utf8");
  console.log("OK:", path.relative(base, p));
}