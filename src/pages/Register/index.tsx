import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSInput, SaaSButton } from "../../components/saas";
import { getStores } from "../../api/mockApi";
import { ALL_POSITIONS } from "../../types/presets";
import { UserPlus, ChevronRight } from "lucide-react";

const DEPARTMENTS = ["厨房", "前厅"];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", realName: "", storeId: "", department: "", position: "", remark: "" });
  const [stores, setStores] = useState<any[]>([]);

  useEffect(() => {
    getStores().then((res: any) => {
      if (res.code === 0) setStores(res.data);
    });
  }, []);

  const selectLabel: Record<string, Record<string, string>> = { storeId: {}, department: {}, position: {} };
  stores.forEach((store) => (selectLabel.storeId[store.id] = store.name));
  DEPARTMENTS.forEach((department) => (selectLabel.department[department] = department));
  ALL_POSITIONS.forEach((position) => (selectLabel.position[position.id] = position.name));

  const handleSelect = (field: string) => {
    const labels: Record<string, string> = selectLabel[field] || {};
    const choice = prompt(`请选择：${Object.values(labels).join("、")}`);
    const found = Object.entries(labels).find(([, value]) => value === choice);
    if (found) setForm((current) => ({ ...current, [field]: found[0], ...(field === "department" ? { position: "" } : {}) }));
  };

  const handleSubmit = () => {
    if (!form.username || !form.password || !form.realName) return alert("请填写必填项");
    if (form.password.length < 6) return alert("密码至少 6 位");
    if (!form.department) return alert("请选择部门");
    if (!form.position) return alert("请选择岗位");
    alert("注册申请已提交，等待管理员审批");
    navigate("/login");
  };

  const renderSelect = (label: string, field: string, placeholder: string) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#6B7280", marginBottom: 6 }}>
        {label} <span style={{ color: "#DC2626" }}>*</span>
      </label>
      <div
        onClick={() => handleSelect(field)}
        style={{
          width: "100%",
          padding: "11px 14px",
          border: "1.5px solid #E5E7EB",
          borderRadius: 10,
          fontSize: 14,
          background: form[field as keyof typeof form] ? "#fff" : "#F9FAFB",
          color: form[field as keyof typeof form] ? "#1F2937" : "#9CA3AF",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{selectLabel[field]?.[form[field as keyof typeof form]] || placeholder}</span>
        <ChevronRight size={16} color="#9CA3AF" />
      </div>
    </div>
  );

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="创建账号" subtitle="注册后需管理员审批" />

        <SaaSCard style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <UserPlus size={16} color="#4F46E5" /> 基本信息
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#6B7280", marginBottom: 6 }}>用户名 *</label>
            <SaaSInput placeholder="用户名" value={form.username} onChange={(v: string) => setForm((current) => ({ ...current, username: v }))} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#6B7280", marginBottom: 6 }}>密码 *</label>
            <SaaSInput placeholder="至少 6 位" value={form.password} onChange={(v: string) => setForm((current) => ({ ...current, password: v }))} type="password" />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#6B7280", marginBottom: 6 }}>姓名 *</label>
            <SaaSInput placeholder="真实姓名" value={form.realName} onChange={(v: string) => setForm((current) => ({ ...current, realName: v }))} />
          </div>
        </SaaSCard>

        <SaaSCard style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>门店与岗位</div>
          {renderSelect("申请门店", "storeId", "请选择门店")}
          {renderSelect("申请部门", "department", "请选择部门")}
          {renderSelect("申请岗位", "position", "请选择岗位")}
        </SaaSCard>

        <SaaSCard style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>备注</div>
          <SaaSInput placeholder="申请说明（可选）" value={form.remark} onChange={(v: string) => setForm((current) => ({ ...current, remark: v }))} />
        </SaaSCard>

        <SaaSButton onClick={handleSubmit} block>
          提交注册
        </SaaSButton>
      </div>
    </div>
  );
}
