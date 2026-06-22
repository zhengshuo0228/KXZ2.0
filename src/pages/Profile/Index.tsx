import { useNavigate } from "react-router-dom";
import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSInput, SaaSButton, ListItem } from "../../components/saas";
import { useAppStore } from "../../models/appStore";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAppStore();
  const user = currentUser;
  const initial = (user?.realName || user?.username || "U").slice(0, 1).toUpperCase();

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="个人信息" subtitle="查看账号资料并修改密码" />

        <SaaSCard style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 18,
              background: "linear-gradient(135deg, #059669, #34D399)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {initial}
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>{user?.realName || "未设置姓名"}</div>
            <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>{user?.username || "未设置账号"}</div>
          </div>
        </SaaSCard>

        <SaaSCard style={{ marginBottom: 16, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #E2E8F0", fontSize: 13, fontWeight: 700, color: "#64748B", background: "#F8FAFC" }}>基本信息</div>
          {[
            ["用户名", user?.username || ""],
            ["姓名", user?.realName || ""],
            ["门店", user?.storeId || ""],
            ["部门", user?.departmentId || ""],
          ].map(([label, value]) => (
            <ListItem key={label} title={label} subtitle={String(value)} right={<span style={{ fontSize: 14, color: "#0F172A" }}>{value}</span>} />
          ))}
        </SaaSCard>

        <SaaSCard style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>修改密码</div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#64748B", marginBottom: 8 }}>原密码</label>
            <SaaSInput placeholder="请输入原密码" value="" onChange={() => {}} type="password" />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#64748B", marginBottom: 8 }}>新密码</label>
            <SaaSInput placeholder="请输入新密码" value="" onChange={() => {}} type="password" />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#64748B", marginBottom: 8 }}>确认新密码</label>
            <SaaSInput placeholder="请再次输入新密码" value="" onChange={() => {}} type="password" />
          </div>
          <SaaSButton onClick={() => alert("密码已更新")} block>
            保存修改
          </SaaSButton>
        </SaaSCard>

        <SaaSButton
          onClick={() => {
            logout();
            navigate("/login");
          }}
          block
          style={{ background: "#fff", color: "#DC2626", border: "1.5px solid #FEE2E2" }}
        >
          退出登录
        </SaaSButton>
      </div>
    </div>
  );
}
