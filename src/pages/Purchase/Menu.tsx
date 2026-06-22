import { useMemo, useState } from "react";
import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSTab, SaaSInput, SaaSButton, SaaSOutlineButton, EmptyState } from "../../components/saas";
import { CATEGORIES, MENU_ITEMS, SUB_CATEGORIES } from "../../types/presets";

export default function PurchaseMenu() {
  const [category, setCategory] = useState("全部");
  const [subCategory, setSubCategory] = useState("全部");
  const [supplier, setSupplier] = useState("全部供应商");
  const [search, setSearch] = useState("");

  const suppliers = useMemo(() => ["全部供应商", ...new Set(MENU_ITEMS.map((item) => item.supplier))], []);
  const subCategories = category === "全部" ? ["全部"] : ["全部", ...(SUB_CATEGORIES[category] || [])];

  const filtered = MENU_ITEMS.filter((menu) => {
    if (category !== "全部" && menu.category !== category) return false;
    if (subCategory !== "全部" && menu.subCategory !== subCategory) return false;
    if (supplier !== "全部供应商" && menu.supplier !== supplier) return false;
    if (search && !menu.name.includes(search)) return false;
    return true;
  });

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="食材库" subtitle="支持新增、编辑、删除和按供应商筛选" />

        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <SaaSOutlineButton onClick={() => {}}>下载模板</SaaSOutlineButton>
          <SaaSButton onClick={() => {}} style={{ background: "#fff", color: "#334155", border: "1.5px solid #E2E8F0" }}>
            新增食材
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

        <SaaSCard style={{ padding: 0, overflow: "hidden" }}>
          {filtered.length === 0 ? (
            <EmptyState icon="🍃" text="暂无食材" />
          ) : (
            filtered.map((menu) => (
              <div key={menu.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "14px 16px", borderBottom: "1px solid #F1F5F9" }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{menu.name}</div>
                  <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>
                    {menu.category} · {menu.subCategory} · {menu.supplier}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#059669" }}>
                    {menu.defaultQty}
                    {menu.unit}
                  </div>
                  <SaaSButton onClick={() => {}} style={{ background: "#fff", color: "#334155", border: "1.5px solid #E2E8F0", padding: "8px 12px", borderRadius: 12 }}>
                    编辑
                  </SaaSButton>
                  <SaaSButton onClick={() => {}} style={{ background: "#fff", color: "#DC2626", border: "1.5px solid #FEE2E2", padding: "8px 12px", borderRadius: 12 }}>
                    删除
                  </SaaSButton>
                </div>
              </div>
            ))
          )}
        </SaaSCard>
      </div>
    </div>
  );
}
