import { useMemo, useState } from "react";
import { CheckCircle2, Minus, Plus, Trash2, ChevronDown } from "lucide-react";
import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSButton, SaaSTab, SaaSInput } from "../../components/saas";
import { CATEGORIES, MENU_ITEMS, SUB_CATEGORIES, type MenuItem } from "../../types/presets";

type SelectedItem = { menuId: string; name: string; supplier: string; qty: number; unit: string };

export default function PurchaseSubmit() {
  const [category, setCategory] = useState("全部");
  const [supplier, setSupplier] = useState("全部供应商");
  const [subCategory, setSubCategory] = useState("全部");
  const [items, setItems] = useState<SelectedItem[]>([]);
  const [showSelected, setShowSelected] = useState(false);
  const [search, setSearch] = useState("");

  const suppliers = useMemo(() => ["全部供应商", ...new Set(MENU_ITEMS.map((item) => item.supplier))], []);
  const subCategories = category === "全部" ? ["全部"] : ["全部", ...(SUB_CATEGORIES[category] || [])];

  const menuItems = MENU_ITEMS.filter((menu) => {
    if (category !== "全部" && menu.category !== category) return false;
    if (subCategory !== "全部" && menu.subCategory !== subCategory) return false;
    if (supplier !== "全部供应商" && menu.supplier !== supplier) return false;
    if (search && !menu.name.includes(search)) return false;
    return true;
  });

  const addItem = (item: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((entry) => entry.menuId === item.id);
      return existing
        ? prev.map((entry) => (entry.menuId === item.id ? { ...entry, qty: entry.qty + item.defaultQty } : entry))
        : [...prev, { menuId: item.id, name: item.name, supplier: item.supplier, qty: item.defaultQty, unit: item.unit }];
    });
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((entry) => entry.menuId !== id));
  const updateQty = (id: string, qty: number) => setItems((prev) => prev.map((entry) => (entry.menuId === id ? { ...entry, qty } : entry)));

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="申购提交" subtitle="按分类、子分类和供应商筛选食材后提交申购单" />

        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <SaaSButton onClick={() => {}} style={{ background: "#fff", color: "#334155", border: "1.5px solid #E2E8F0", flex: 1 }}>
            新增食材
          </SaaSButton>
          <SaaSButton onClick={() => {}} style={{ background: "#fff", color: "#334155", border: "1.5px solid #E2E8F0", flex: 1 }}>
            批量上传
          </SaaSButton>
        </div>

        <SaaSInput placeholder="搜索食材名称" value={search} onChange={setSearch} style={{ marginBottom: 12 }} />
        <SaaSTab items={CATEGORIES} active={category} onChange={setCategory} />

        <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 12 }}>
          {suppliers.map((item) => (
            <div
              key={item}
              onClick={() => setSupplier(item)}
              style={{
                padding: "8px 14px",
                borderRadius: 14,
                whiteSpace: "nowrap",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                border: `1.5px solid ${supplier === item ? "#059669" : "#E2E8F0"}`,
                background: supplier === item ? "#ECFDF5" : "#fff",
                color: supplier === item ? "#059669" : "#64748B",
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {category !== "全部" && subCategories.length > 1 ? (
          <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 16 }}>
            {subCategories.map((item) => (
              <div
                key={item}
                onClick={() => setSubCategory(item)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 14,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  border: `1.5px solid ${subCategory === item ? "#059669" : "#E2E8F0"}`,
                  background: subCategory === item ? "#ECFDF5" : "#fff",
                  color: subCategory === item ? "#059669" : "#64748B",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        ) : null}

        {items.length > 0 && (
          <SaaSCard style={{ background: "#ECFDF5", borderColor: "#A7F3D0", marginBottom: 16, cursor: "pointer" }}>
            <div onClick={() => setShowSelected(!showSelected)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CheckCircle2 size={18} color="#059669" />
                <span style={{ fontSize: 14, fontWeight: 700, color: "#059669" }}>已选 {items.length} 项</span>
              </div>
              <div style={{ fontSize: 12, color: "#059669", display: "flex", alignItems: "center", gap: 4 }}>
                {showSelected ? "收起" : "展开"} <ChevronDown size={14} />
              </div>
            </div>
          </SaaSCard>
        )}

        {showSelected && items.length > 0 && (
          <SaaSCard style={{ marginBottom: 16, padding: 0, overflow: "hidden" }}>
            {items.map((item) => (
              <div key={item.menuId} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "14px 16px", borderBottom: "1px solid #F1F5F9" }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>{item.supplier} · {item.unit}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div onClick={() => updateQty(item.menuId, Math.max(1, item.qty - 1))} style={{ width: 30, height: 30, borderRadius: "50%", border: "1.5px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "#fff" }}><Minus size={12} /></div>
                  <span style={{ width: 32, textAlign: "center", fontSize: 14, fontWeight: 700 }}>{item.qty}</span>
                  <div onClick={() => updateQty(item.menuId, item.qty + 1)} style={{ width: 30, height: 30, borderRadius: "50%", background: "#059669", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Plus size={12} /></div>
                  <div onClick={() => removeItem(item.menuId)} style={{ cursor: "pointer", padding: 4 }}><Trash2 size={16} color="#DC2626" /></div>
                </div>
              </div>
            ))}
          </SaaSCard>
        )}

        <SaaSCard style={{ padding: 0, overflow: "hidden" }}>
          {menuItems.length === 0 ? (
            <div style={{ padding: 24, textAlign: "center", color: "#94A3B8", fontSize: 13 }}>暂无符合条件的食材</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, padding: 12 }}>
              {menuItems.map((menu) => {
                const isSelected = items.some((entry) => entry.menuId === menu.id);
                return (
                  <div
                    key={menu.id}
                    onClick={() => addItem(menu)}
                    style={{ padding: 12, borderRadius: 16, background: isSelected ? "#ECFDF5" : "#fff", border: `1.5px solid ${isSelected ? "#A7F3D0" : "#E2E8F0"}`, cursor: "pointer", textAlign: "center", position: "relative" }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", lineHeight: 1.3 }}>{menu.name}</div>
                    <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>{menu.supplier}</div>
                    <div style={{ fontSize: 12, color: "#059669", fontWeight: 700, marginTop: 6 }}>
                      {menu.defaultQty}
                      {menu.unit}
                    </div>
                    {isSelected ? (
                      <div style={{ position: "absolute", top: 6, right: 6, width: 16, height: 16, borderRadius: "50%", background: "#059669", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <CheckCircle2 size={10} color="#fff" />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </SaaSCard>

        <SaaSButton
          block
          onClick={() => {
            if (items.length === 0) return;
            alert(`已提交 ${items.length} 项申购`);
            setItems([]);
            setShowSelected(false);
          }}
          style={{ marginTop: 20 }}
        >
          确认提交 ({items.length})
        </SaaSButton>
      </div>
    </div>
  );
}
