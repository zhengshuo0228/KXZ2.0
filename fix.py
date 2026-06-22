import os

base = r"D:\開小灶app\kxzs-pms\src\pages"

files = {}

files[os.path.join(base, r"Purchase\Submit.tsx")] = "".join([
'import { useState } from "react";\n',
'import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSButton, SaaSTab } from "../../components/saas";\n',
'import { CheckCircle2, Minus, Plus, Trash2 } from "lucide-react";\n',
'import { CATEGORIES, MENU_ITEMS } from "../../types/presets";\n\n',
'export default function PurchaseSubmit() {\n',
'  const [category, setCategory] = useState("全部");\n',
'  const [items, setItems] = useState<{ menuId: string; name: string; qty: number; unit: string }[]>([]);\n',
'  const [showSelected, setShowSelected] = useState(false);\n',
'  const menuItems = MENU_ITEMS.filter((m) => category === "全部" || m.category === category);\n\n',
'  const addItem = (item: typeof MENU_ITEMS[0]) => {\n',
'    setItems((prev) => {\n',
'      const ex = prev.find((p) => p.menuId === item.id);\n',
'      return ex ? prev.map((p) => (p.menuId === item.id ? { ...p, qty: p.qty + item.defaultQty } : p)) : [...prev, { menuId: item.id, name: item.name, qty: item.defaultQty, unit: item.unit }];\n',
'    });\n',
'  };\n',
'  const removeItem = (id: string) => setItems((prev) => prev.filter((p) => p.menuId !== id));\n',
'  const updateQty = (id: string, qty: number) => setItems((prev) => prev.map((p) => (p.menuId === id ? { ...p, qty } : p)));\n',
'  const selectedCount = items.length;\n\n',
'  function selBar() {\n',
'    return (<div onClick={() => setShowSelected(!showSelected)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#ECFDF5", borderRadius: 14, padding: "12px 16px", marginBottom: 16, cursor: "pointer", border: "1px solid #A7F3D0" }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><CheckCircle2 size={18} color="#059669" /><span style={{ fontSize: 14, fontWeight: 600, color: "#059669" }}>已选 {selectedCount} 项</span></div><div style={{ fontSize: 12, color: "#059669" }}>{showSelected ? "收起" : "展开"}</div></div>);\n',
'  }\n',
'  return (<div style={pageStyle}><div style={containerStyle}><PageTitle title="申购提交" subtitle="选择食材并提交申购单" />{selectedCount > 0 && selBar()}{showSelected && selectedCount > 0 && (<SaaSCard style={{ marginBottom: 16, padding: 0 }}>{items.map((item) => (<div key={item.menuId} style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid #F3F4F6" }}><div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</div><div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{item.unit}</div></div><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div onClick={() => updateQty(item.menuId, Math.max(1, item.qty - 1))} style={{ width: 28, height: 28, borderRadius: "50%", border: "1.5px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Minus size={12} /></div><span style={{ width: 32, textAlign: "center", fontSize: 14, fontWeight: 600 }}>{item.qty}</span><div onClick={() => updateQty(item.menuId, item.qty + 1)} style={{ width: 28, height: 28, borderRadius: "50%", background: "#059669", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Plus size={12} /></div><div onClick={() => removeItem(item.menuId)} style={{ cursor: "pointer", padding: 4 }}><Trash2 size={16} color="#DC2626" /></div></div></div>))}</SaaSCard>)}\n<SaaSTab items={CATEGORIES} active={category} onChange={setCategory} /><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 12 }}>{menuItems.map((m) => { const isInList = items.some((p) => p.menuId === m.id); return (<div key={m.id} onClick={() => addItem(m)} style={{ padding: "14px 8px", borderRadius: 14, background: isInList ? "#ECFDF5" : "#fff", border: `1.5px solid ${isInList ? "#A7F3D0" : "#E5E7EB"}`, cursor: "pointer", textAlign: "center", transition: "all 0.2s ease", position: "relative" }}><div style={{ fontWeight: 600, fontSize: 14 }}>{m.name}</div><div style={{ fontSize: 12, color: "#059669", fontWeight: 600, marginTop: 4 }}>{m.defaultQty}{m.unit}</div>{isInList && <div style={{ position: "absolute", top: 6, right: 6, width: 16, height: 16, borderRadius: "50%", background: "#059669", display: "flex", alignItems: "center", justifyContent: "center" }}><CheckCircle2 size={10} color="#fff" /></div>}</div>); })}</div><SaaSButton block onClick={() => { if (selectedCount === 0) return; alert(`已提交 ${selectedCount} 项申购`); setItems([]); setShowSelected(false); }} style={{ marginTop: 20 }}>确认提交 ({selectedCount})</SaaSButton></div></div>);\n',
'}\n',
])

files[os.path.join(base, r"Admin\Auth.tsx")] = "".join([
'import { useState } from "react";\n',
'import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSTab, ListItem, StatusBadge } from "../../components/saas";\n',
'import { ChevronRight } from "lucide-react";\n\n',
'export default function AdminAuth() {\n',
'  const [tab, setTab] = useState("跨部门授权");\n',
'  const tabs = ["跨部门授权", "跨门店授权"];\n\n',
'  return (<div style={pageStyle}><div style={containerStyle}><PageTitle title="授权管理" subtitle="管理跨部门/跨门店访问权限" /><SaaSTab items={tabs} active={tab} onChange={setTab} />\n',
'    {tab === "跨部门授权" && (<><SaaSCard style={{ marginBottom: 16 }}><div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>新建授权</div><div style={{ display: "flex", flexDirection: "column", gap: 12 }}><div><label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#6B7280", marginBottom: 6 }}>选择员工</label><div style={{ padding: "11px 14px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, color: "#6B7280", background: "#F9FAFB" }}>请选择员工</div></div><div><label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#6B7280", marginBottom: 6 }}>授权部门</label><div style={{ padding: "11px 14px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, color: "#6B7280", background: "#F9FAFB" }}>请选择目标部门</div></div><button style={{ padding: "12px 20px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", background: "#4F46E5", color: "#fff", border: "none" }}>创建授权</button></div></SaaSCard><SaaSCard style={{ padding: 0, overflow: "hidden" }}><div style={{ padding: "12px 16px", fontSize: 15, fontWeight: 600, borderBottom: "1px solid #F3F4F6" }}>授权列表</div><ListItem title="张三" subtitle="厨房 → 前厅" right={<><StatusBadge text="有效" type="success" /><ChevronRight size={16} color="#9CA3AF" /></>} /><ListItem title="暂无更多授权" subtitle="仅管理员可操作" /></SaaSCard></>)}\n',
'    {tab === "跨门店授权" && (<><SaaSCard style={{ marginBottom: 16 }}><div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>新建跨门店授权</div><div style={{ display: "flex", flexDirection: "column", gap: 12 }}><div><label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#6B7280", marginBottom: 6 }}>选择员工</label><div style={{ padding: "11px 14px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, color: "#6B7280", background: "#F9FAFB" }}>请选择员工</div></div><div><label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#6B7280", marginBottom: 6 }}>授权门店</label><div style={{ padding: "11px 14px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, color: "#6B7280", background: "#F9FAFB" }}>请选择目标门店</div></div><button style={{ padding: "12px 20px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", background: "#4F46E5", color: "#fff", border: "none" }}>创建授权</button></div></SaaSCard><SaaSCard style={{ padding: 0, overflow: "hidden" }}><div style={{ padding: "12px 16px", fontSize: 15, fontWeight: 600, borderBottom: "1px solid #F3F4F6" }}>授权列表</div><ListItem title="暂无跨门店授权" subtitle="仅超级管理员可操作" /></SaaSCard></>)}\n',
'  </div></div>);\n',
'}\n',
])

files[os.path.join(base, r"Performance\Dashboard.tsx")] = "".join([
'import { useState } from "react";\n',
'import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSTab, StatCard, ListItem, StatusBadge } from "../../components/saas";\n',
'import { Award, TrendingUp, CheckCircle2, Settings } from "lucide-react";\n\n',
'export default function PerformanceDashboard() {\n',
'  const [tab, setTab] = useState("我的绩效");\n',
'  const tabItems = ["我的绩效", "全员记录", "积分排行", "待审核", "绩效管理"];\n\n',
'  return (<div style={pageStyle}><div style={containerStyle}><PageTitle title="绩效看板" subtitle="绩效记录、申请与审核管理" /><SaaSTab items={tabItems} active={tab} onChange={setTab} />\n',
'    {tab === "我的绩效" && (<><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}><StatCard icon={<Award size={18} />} label="当前积分" value="128" color="#059669" /><StatCard icon={<TrendingUp size={18} />} label="本月评级" value="A" color="#4F46E5" /></div><SaaSCard><ListItem title="食材节约" subtitle="节约蔬菜类 5 斤" right={<span style={{ color: "#059669", fontWeight: 600, fontSize: 14 }}>+10</span>} /><ListItem title="按时到岗" subtitle="本月 22 天全勤" right={<span style={{ color: "#059669", fontWeight: 600, fontSize: 14 }}>+22</span>} /><ListItem title="卫生检查" subtitle="不合格，需整改" right={<span style={{ color: "#DC2626", fontWeight: 600, fontSize: 14 }}>-5</span>} /></SaaSCard></>)}\n',
'    {tab === "全员记录" && (<SaaSCard style={{ padding: 0, overflow: "hidden" }}>{[{ name: "张三", dept: "厨房", score: "128", level: "A" }, { name: "李四", dept: "厨房", score: "105", level: "B" }].map((u) => (<ListItem key={u.name} title={u.name} subtitle={`${u.dept} · 积分 ${u.score}`} right={<StatusBadge text={`评级 ${u.level}`} type={u.level === "A" ? "success" : "info"} />} />))}</SaaSCard>)}\n',
'    {tab === "积分排行" && (<SaaSCard style={{ padding: 0, overflow: "hidden" }}>{[{ rank: 1, name: "张三", score: 128 }, { rank: 2, name: "王五", score: 115 }, { rank: 3, name: "李四", score: 105 }].map((p) => (<ListItem key={p.name} title={<div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 24, height: 24, borderRadius: "50%", background: p.rank === 1 ? "#FFD700" : p.rank === 2 ? "#C0C0C0" : "#CD7F32", color: "#fff", fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{p.rank}</span>{p.name}</div>} subtitle={`积分 ${p.score}`} right={<span style={{ fontWeight: 600, color: "#059669" }}>{p.score} 分</span>} />))}</SaaSCard>)}\n',
'    {tab === "待审核" && (<SaaSCard><ListItem title="张三 · 绩效申请" subtitle="食材节约 3 斤 · 2026-06-10" right={<><StatusBadge text="待审核" type="warning" /><span style={{ marginLeft: 8, cursor: "pointer", color: "#059669", fontWeight: 600, fontSize: 13 }}>审核</span></>} /><ListItem title="李四 · 绩效申请" subtitle="迟到 2 次 · 2026-06-09" right={<><StatusBadge text="待审核" type="warning" /><span style={{ marginLeft: 8, cursor: "pointer", color: "#059669", fontWeight: 600, fontSize: 13 }}>审核</span></>} /></SaaSCard>)}\n',
'    {tab === "绩效管理" && (<><SaaSCard><div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}><Settings size={16} color="#4F46E5" /> 预设管理</div>{[{ name: "食材节约", type: "加分", default: "+10" }, { name: "按时到岗", type: "加分", default: "+1" }, { name: "卫生检查不合格", type: "扣分", default: "-5" }, { name: "迟到早退", type: "扣分", default: "-3" }].map((p) => (<ListItem key={p.name} title={p.name} subtitle={`${p.type} · 默认 ${p.default}`} right={<StatusBadge text={p.type} type={p.type === "加分" ? "success" : "danger"} />} />))}</SaaSCard><SaaSCard><div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}><CheckCircle2 size={16} color="#059669" /> 记录调整</div><div style={{ fontSize: 13, color: "#6B7280", padding: "12px 0" }}>管理员可对某员工的绩效记录进行手动调整。</div><div style={{ display: "flex", gap: 8, marginTop: 8 }}><div style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: "#4F46E5", color: "#fff", textAlign: "center", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>新增记录</div><div style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: "#fff", color: "#374151", border: "1.5px solid #E5E7EB", textAlign: "center", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>调整记录</div></div></SaaSCard></>)}\n',
'  </div></div>);\n',
'}\n',
])

files[os.path.join(base, r"Purchase\History.tsx")] = "".join([
'import { useState } from "react";\n',
'import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSTab, EmptyState, ListItem, StatusBadge } from "../../components/saas";\n',
'import { Search, ChevronRight } from "lucide-react";\n\n',
'const MOCK_HISTORY = [\n',
'  { id: "1", submitter: "张三", dept: "厨房", items: "青椒 30斤, 番茄 20斤", status: "completed", time: "2026-06-10 09:30" },\n',
'  { id: "2", submitter: "李四", dept: "厨房", items: "牛腩 10斤, 鸡腿 15斤", status: "reviewing", time: "2026-06-10 10:15" },\n',
'  { id: "3", submitter: "王五", dept: "前厅", items: "矿泉水 5箱", status: "approved", time: "2026-06-09 16:00" },\n',
'];\n\n',
'export default function PurchaseHistory() {\n',
'  const [search, setSearch] = useState("");\n',
'  const [tab, setTab] = useState("全部");\n',
'  const tabs = ["全部", "待审核", "已通过", "已驳回"];\n\n',
'  return (<div style={pageStyle}><div style={containerStyle}><PageTitle title="申购记录" subtitle="查看历史申购单据" /><SaaSCard style={{ padding: 12, marginBottom: 16 }}><div style={{ position: "relative" }}><Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} /><input placeholder="搜索提交人、食材…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: "100%", padding: "10px 14px 10px 36px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, outline: "none" }} onFocus={(e) => { e.target.style.borderColor = "#4F46E5"; e.target.style.boxShadow = "0 0 0 3px rgba(79,70,229,0.1)"; }} onBlur={(e) => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }} /></div></SaaSCard>\n<SaaSTab items={tabs} active={tab} onChange={setTab} /><SaaSCard style={{ padding: 0, overflow: "hidden" }}>{MOCK_HISTORY.map((h) => (<ListItem key={h.id} title={h.submitter} subtitle={`${h.dept} · ${h.items} · ${h.time}`} right={<><StatusBadge text={h.status === "completed" || h.status === "approved" ? "已完成" : h.status === "reviewing" ? "审核中" : "已驳回"} type={h.status === "completed" || h.status === "approved" ? "success" : h.status === "reviewing" ? "warning" : "danger"} /><ChevronRight size={16} color="#9CA3AF" /></>} />))}{MOCK_HISTORY.length === 0 && <EmptyState icon="📋" text="暂无申购记录" />}</SaaSCard></div></div>);\n',
'}\n',
])

for p, c in files.items():
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w", encoding="utf-8") as f:
        f.write(c)
    print(f"OK: {os.path.basename(os.path.dirname(p))}/{os.path.basename(p)}")