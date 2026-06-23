import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "antd-mobile";
import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSInput, SaaSButton, ListItem } from "../../components/saas";
import { changePassword, getDepartments, getStores, getUserInfo, logout as apiLogout } from "../../api/mockApi";
import { useAppStore } from "../../models/appStore";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, currentPositions, stores, departments, login, logout, setStores, setDepartments } = useAppStore();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([getUserInfo(), getStores(), getDepartments()]).then(([infoResult, storeResult, departmentResult]) => {
      const data = infoResult.data as any;
      if (infoResult.code === 0 && data?.user && data?.positions) login(data.user, data.positions);
      if (storeResult.code === 0) setStores(Array.isArray(storeResult.data) ? storeResult.data : []);
      if (departmentResult.code === 0) setDepartments(Array.isArray(departmentResult.data) ? departmentResult.data : []);
    });
  }, [login, setStores, setDepartments]);

  const user = currentUser;
  const safePositions = Array.isArray(currentPositions) ? currentPositions : [];
  const safeStores = Array.isArray(stores) ? stores : [];
  const safeDepartments = Array.isArray(departments) ? departments : [];
  const initial = (user?.realName || user?.username || "我").slice(0, 1).toUpperCase();
  const positionText = safePositions.map((position) => position.name).join("、") || "未设置岗位";
  const storeName = safeStores.find((store) => store.id === user?.storeId)?.name || user?.storeId || "";
  const departmentName = safeDepartments.find((department) => department.id === user?.departmentId)?.name || user?.departmentId || "";

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) return Toast.show("请填写完整密码信息");
    if (newPassword.length < 6) return Toast.show("新密码至少 6 位");
    if (newPassword !== confirmPassword) return Toast.show("两次输入的新密码不一致");

    setSaving(true);
    try {
      await changePassword(oldPassword, newPassword);
      Toast.show({ content: "密码已更新，请使用新密码重新登录", icon: "success" });
      logout();
      navigate("/login");
    } catch (error: any) {
      Toast.show(error?.response?.data?.message || "密码修改失败");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await apiLogout();
    logout();
    navigate("/login");
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="个人信息" subtitle="查看账号资料、修改密码和退出登录" />

        <SaaSCard style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 60, height: 60, borderRadius: 18, background: "linear-gradient(135deg, #059669, #34D399)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, flexShrink: 0 }}>
            {initial}
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>{user?.realName || "未设置姓名"}</div>
            <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>{user?.username || "未登录"}</div>
          </div>
        </SaaSCard>

        <SaaSCard style={{ marginBottom: 16, padding: 0, overflow: "hidden" }}>
          <div style={sectionHeaderStyle}>基本信息</div>
          {[["用户名", user?.username || ""], ["姓名", user?.realName || ""], ["门店", storeName], ["部门", departmentName], ["岗位", positionText]].map(([label, value]) => (
            <ListItem key={label} title={label} subtitle={String(value)} />
          ))}
        </SaaSCard>

        <SaaSCard style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>修改密码</div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>原密码</label>
            <SaaSInput placeholder="请输入原密码" value={oldPassword} onChange={setOldPassword} type="password" />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>新密码</label>
            <SaaSInput placeholder="至少 6 位" value={newPassword} onChange={setNewPassword} type="password" />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>确认新密码</label>
            <SaaSInput placeholder="请再次输入新密码" value={confirmPassword} onChange={setConfirmPassword} type="password" />
          </div>
          <SaaSButton onClick={handleChangePassword} block>{saving ? "保存中..." : "保存修改"}</SaaSButton>
        </SaaSCard>

        <SaaSButton onClick={handleLogout} block style={{ background: "#fff", color: "#DC2626", border: "1.5px solid #FEE2E2" }}>退出登录</SaaSButton>
      </div>
    </div>
  );
}

const sectionHeaderStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderBottom: "1px solid #E2E8F0",
  fontSize: 13,
  fontWeight: 700,
  color: "#64748B",
  background: "#F8FAFC",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "#64748B",
  marginBottom: 8,
};
