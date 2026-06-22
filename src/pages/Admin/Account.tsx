import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSInput, SaaSButton, SaaSTab, ListItem, StatusBadge } from "../../components/saas";
import { createAdminUser, getAdminUsers, getDepartments, getPositions, getStores, updateUserPositions } from "../../api/mockApi";
import type { Department, Position, Store } from "../../types";

type AdminUser = {
  id: string;
  username: string;
  realName: string;
  storeId: string;
  departmentId: string;
  storeName?: string;
  departmentName?: string;
  status: string;
  positions: Position[];
};

type CreateForm = {
  username: string;
  password: string;
  realName: string;
  storeId: string;
  departmentId: string;
  positionId: string;
};

const emptyForm: CreateForm = {
  username: "",
  password: "123456",
  realName: "",
  storeId: "",
  departmentId: "",
  positionId: "",
};

function departmentKey(name?: string) {
  return name === "前厅" ? "dining" : "kitchen";
}

export default function AdminAccount() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("账号列表");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [form, setForm] = useState<CreateForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const tabs = ["账号列表", "新建账号", "注册审批", "授权管理"];

  const reload = async () => {
    setLoading(true);
    try {
      const [userResult, storeResult, departmentResult, positionResult] = await Promise.all([
        getAdminUsers(),
        getStores(),
        getDepartments(),
        getPositions(),
      ]);
      if (userResult.code === 0) setUsers(userResult.data as AdminUser[]);
      if (storeResult.code === 0) {
        setStores(storeResult.data);
        setForm((current) => ({ ...current, storeId: current.storeId || storeResult.data[0]?.id || "" }));
      }
      if (departmentResult.code === 0) setDepartments(departmentResult.data);
      if (positionResult.code === 0) setPositions(positionResult.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const currentDepartments = departments.filter((department) => department.storeId === form.storeId);
  const selectedDepartment = departments.find((department) => department.id === form.departmentId);
  const currentPositions = useMemo(() => {
    if (!selectedDepartment) return positions;
    return positions.filter((position) => position.department === departmentKey(selectedDepartment.name));
  }, [positions, selectedDepartment]);

  useEffect(() => {
    if (!form.storeId) return;
    const firstDepartment = departments.find((department) => department.storeId === form.storeId);
    if (firstDepartment && !currentDepartments.some((department) => department.id === form.departmentId)) {
      setForm((current) => ({ ...current, departmentId: firstDepartment.id, positionId: "" }));
    }
  }, [form.storeId, form.departmentId, departments]);

  const chooseFromList = (title: string, items: { id: string; name: string }[], onPick: (id: string) => void) => {
    if (items.length === 0) return alert(`暂无可选${title}`);
    const choice = prompt(`请选择${title}：${items.map((item) => item.name).join("、")}`);
    const found = items.find((item) => item.name === choice || item.id === choice);
    if (found) onPick(found.id);
  };

  const handleCreate = async () => {
    if (!form.username || !form.password || !form.realName || !form.storeId || !form.departmentId || !form.positionId) {
      alert("请填写完整账号信息");
      return;
    }
    try {
      await createAdminUser({
        username: form.username,
        password: form.password,
        realName: form.realName,
        storeId: form.storeId,
        departmentId: form.departmentId,
        positionIds: [form.positionId],
      });
      alert("账号创建成功");
      setForm((current) => ({ ...emptyForm, storeId: current.storeId, departmentId: current.departmentId }));
      setTab("账号列表");
      await reload();
    } catch (error: any) {
      alert(error?.response?.data?.message || "账号创建失败");
    }
  };

  const handleChangePosition = async (user: AdminUser) => {
    if (user.username === "000") return alert("内置超管账号不可修改");
    const positionId = prompt(`请输入新岗位名称或ID：${positions.map((position) => position.name).join("、")}`);
    const found = positions.find((position) => position.id === positionId || position.name === positionId);
    if (!found) return;
    try {
      await updateUserPositions(user.id, [found.id]);
      alert("岗位已更新");
      await reload();
    } catch (error: any) {
      alert(error?.response?.data?.message || "岗位更新失败");
    }
  };

  const label = {
    store: stores.find((store) => store.id === form.storeId)?.name || "请选择门店",
    department: departments.find((department) => department.id === form.departmentId)?.name || "请选择部门",
    position: positions.find((position) => position.id === form.positionId)?.name || "请选择岗位",
  };

  const accounts = (
    <SaaSCard style={{ padding: 0, overflow: "hidden" }}>
      {loading ? <div style={{ padding: 18, color: "#94A3B8", textAlign: "center" }}>加载中...</div> : null}
      {!loading && users.map((user) => (
        <ListItem
          key={user.id}
          title={user.realName}
          subtitle={`${user.username} · ${user.storeName || user.storeId} · ${user.departmentName || user.departmentId} · ${user.positions.map((position) => position.name).join("、") || "未设置岗位"}`}
          right={
            <>
              <StatusBadge text={user.status === "active" ? "正常" : user.status} type={user.status === "active" ? "success" : "warning"} />
              <button onClick={() => handleChangePosition(user)} style={{ border: 0, background: "transparent", color: "#059669", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>改岗位</button>
            </>
          }
        />
      ))}
    </SaaSCard>
  );

  const create = (
    <SaaSCard>
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>新建账号</div>
      {[
        { label: "门店", value: label.store, action: () => chooseFromList("门店", stores, (storeId) => setForm((current) => ({ ...current, storeId, departmentId: "", positionId: "" }))) },
        { label: "部门", value: label.department, action: () => chooseFromList("部门", currentDepartments, (departmentId) => setForm((current) => ({ ...current, departmentId, positionId: "" }))) },
        { label: "岗位", value: label.position, action: () => chooseFromList("岗位", currentPositions, (positionId) => setForm((current) => ({ ...current, positionId }))) },
      ].map((item) => (
        <div key={item.label} style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#64748B", marginBottom: 8 }}>{item.label}</label>
          <div onClick={item.action} style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #E2E8F0", borderRadius: 14, fontSize: 14, background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
            <span>{item.value}</span>
            <ChevronRight size={16} color="#94A3B8" />
          </div>
        </div>
      ))}
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#64748B", marginBottom: 8 }}>账号名</label>
        <SaaSInput placeholder="请输入账号名" value={form.username} onChange={(username) => setForm((current) => ({ ...current, username }))} />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#64748B", marginBottom: 8 }}>初始密码</label>
        <SaaSInput placeholder="默认 123456" value={form.password} onChange={(password) => setForm((current) => ({ ...current, password }))} type="password" />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#64748B", marginBottom: 8 }}>姓名</label>
        <SaaSInput placeholder="真实姓名" value={form.realName} onChange={(realName) => setForm((current) => ({ ...current, realName }))} />
      </div>
      <SaaSButton onClick={handleCreate} block>
        创建账号
      </SaaSButton>
    </SaaSCard>
  );

  const approval = (
    <SaaSCard style={{ padding: 0, overflow: "hidden" }}>
      <ListItem
        title="注册审批"
        subtitle="查看首页注册申请，通过后员工即可登录"
        right={<><StatusBadge text="去处理" type="warning" /><ChevronRight size={16} color="#94A3B8" /></>}
      />
      <div style={{ padding: "0 16px 16px" }}>
        <SaaSButton onClick={() => navigate("/admin/registration")} block>
          打开注册审批
        </SaaSButton>
      </div>
    </SaaSCard>
  );

  const auth = (
    <SaaSCard style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#64748B", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>授权管理</div>
      <ListItem title="跨部门授权" subtitle="门店管理员及以上可设置" right={<ChevronRight size={16} color="#94A3B8" />} />
      <ListItem title="跨门店授权" subtitle="仅超级管理员可设置" right={<ChevronRight size={16} color="#94A3B8" />} />
    </SaaSCard>
  );

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <PageTitle title="账号管理" subtitle="维护门店员工账号、岗位与权限" />
        <SaaSTab items={tabs} active={tab} onChange={setTab} />
        {tab === "账号列表" && accounts}
        {tab === "新建账号" && create}
        {tab === "注册审批" && approval}
        {tab === "授权管理" && auth}
      </div>
    </div>
  );
}
