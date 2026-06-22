import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { pageStyle, containerStyle, PageTitle, SaaSCard, SaaSInput, SaaSButton, SaaSTab, ListItem, StatusBadge } from "../../components/saas";
import { createAdminUser, getAdminUsers, getDepartments, getPositions, getStores, updateUserPositions } from "../../api/mockApi";
import type { Department, Position, Store } from "../../types";

type AdminUser = { id: string; username: string; realName: string; storeId: string; departmentId: string; storeName?: string; departmentName?: string; status: string; positions: Position[] };
type CreateForm = { username: string; password: string; realName: string; storeId: string; departmentId: string; positionId: string };
const emptyForm: CreateForm = { username: "", password: "123456", realName: "", storeId: "", departmentId: "", positionId: "" };
function departmentKey(name?: string) { return name === "??" ? "dining" : "kitchen"; }

export default function AdminAccount() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("????");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [form, setForm] = useState<CreateForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const tabs = ["????", "????", "????", "????"];

  const reload = async () => {
    setLoading(true);
    try {
      const [userResult, storeResult, departmentResult, positionResult] = await Promise.all([getAdminUsers(), getStores(), getDepartments(), getPositions()]);
      if (userResult.code === 0) setUsers(userResult.data as AdminUser[]);
      if (storeResult.code === 0) { setStores(storeResult.data); setForm((current) => ({ ...current, storeId: current.storeId || storeResult.data[0]?.id || "" })); }
      if (departmentResult.code === 0) setDepartments(departmentResult.data);
      if (positionResult.code === 0) setPositions(positionResult.data);
    } finally { setLoading(false); }
  };
  useEffect(() => { reload(); }, []);

  const currentDepartments = departments.filter((department) => department.storeId === form.storeId);
  const selectedDepartment = departments.find((department) => department.id === form.departmentId);
  const currentPositions = useMemo(() => selectedDepartment ? positions.filter((position) => position.department === departmentKey(selectedDepartment.name)) : positions, [positions, selectedDepartment]);
  useEffect(() => {
    if (!form.storeId) return;
    const firstDepartment = departments.find((department) => department.storeId === form.storeId);
    if (firstDepartment && !currentDepartments.some((department) => department.id === form.departmentId)) setForm((current) => ({ ...current, departmentId: firstDepartment.id, positionId: "" }));
  }, [form.storeId, form.departmentId, departments]);

  const chooseFromList = (title: string, items: { id: string; name: string }[], onPick: (id: string) => void) => {
    if (items.length === 0) return alert(`????${title}`);
    const choice = prompt(`???${title}?${items.map((item) => item.name).join("?")}`);
    const found = items.find((item) => item.name === choice || item.id === choice);
    if (found) onPick(found.id);
  };
  const handleCreate = async () => {
    if (!form.username || !form.password || !form.realName || !form.storeId || !form.departmentId || !form.positionId) return alert("?????????");
    try {
      await createAdminUser({ username: form.username, password: form.password, realName: form.realName, storeId: form.storeId, departmentId: form.departmentId, positionIds: [form.positionId] });
      alert("??????"); setForm((current) => ({ ...emptyForm, storeId: current.storeId, departmentId: current.departmentId })); setTab("????"); await reload();
    } catch (error: any) { alert(error?.response?.data?.message || "??????"); }
  };
  const handleChangePosition = async (user: AdminUser) => {
    if (user.username === "000") return alert("??????????");
    const positionId = prompt(`?????????ID?${positions.map((position) => position.name).join("?")}`);
    const found = positions.find((position) => position.id === positionId || position.name === positionId);
    if (!found) return;
    try { await updateUserPositions(user.id, [found.id]); alert("?????"); await reload(); } catch (error: any) { alert(error?.response?.data?.message || "??????"); }
  };

  const label = { store: stores.find((store) => store.id === form.storeId)?.name || "?????", department: departments.find((department) => department.id === form.departmentId)?.name || "?????", position: positions.find((position) => position.id === form.positionId)?.name || "?????" };
  const accounts = <SaaSCard style={{ padding: 0, overflow: "hidden" }}>{loading ? <div style={{ padding: 18, color: "#94A3B8", textAlign: "center" }}>???...</div> : null}{!loading && users.map((user) => <ListItem key={user.id} title={user.realName} subtitle={`${user.username} ? ${user.storeName || user.storeId} ? ${user.departmentName || user.departmentId} ? ${user.positions.map((position) => position.name).join("?") || "?????"}`} right={<><StatusBadge text={user.status === "active" ? "??" : user.status} type={user.status === "active" ? "success" : "warning"} /><button onClick={() => handleChangePosition(user)} style={linkButtonStyle}>???</button></>} />)}</SaaSCard>;
  const create = <SaaSCard><div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>????</div>{[{ label: "??", value: label.store, action: () => chooseFromList("??", stores, (storeId) => setForm((current) => ({ ...current, storeId, departmentId: "", positionId: "" }))) }, { label: "??", value: label.department, action: () => chooseFromList("??", currentDepartments, (departmentId) => setForm((current) => ({ ...current, departmentId, positionId: "" }))) }, { label: "??", value: label.position, action: () => chooseFromList("??", currentPositions, (positionId) => setForm((current) => ({ ...current, positionId }))) }].map((item) => <div key={item.label} style={{ marginBottom: 14 }}><label style={fieldLabelStyle}>{item.label}</label><div onClick={item.action} style={selectStyle}><span>{item.value}</span><ChevronRight size={16} color="#94A3B8" /></div></div>)}<div style={{ marginBottom: 14 }}><label style={fieldLabelStyle}>???</label><SaaSInput placeholder="??????" value={form.username} onChange={(username) => setForm((current) => ({ ...current, username }))} /></div><div style={{ marginBottom: 14 }}><label style={fieldLabelStyle}>????</label><SaaSInput placeholder="?? 123456" value={form.password} onChange={(password) => setForm((current) => ({ ...current, password }))} type="password" /></div><div style={{ marginBottom: 14 }}><label style={fieldLabelStyle}>??</label><SaaSInput placeholder="????" value={form.realName} onChange={(realName) => setForm((current) => ({ ...current, realName }))} /></div><SaaSButton onClick={handleCreate} block>????</SaaSButton></SaaSCard>;
  const approval = <SaaSCard style={{ padding: 0, overflow: "hidden" }}><ListItem title="????" subtitle="??????????????????" right={<><StatusBadge text="???" type="warning" /><ChevronRight size={16} color="#94A3B8" /></>} /><div style={{ padding: "0 16px 16px" }}><SaaSButton onClick={() => navigate("/admin/registration")} block>??????</SaaSButton></div></SaaSCard>;
  const auth = <SaaSCard style={{ padding: 0, overflow: "hidden" }}><div style={sectionHeaderStyle}>????</div><ListItem title="?????" subtitle="???????????" right={<ChevronRight size={16} color="#94A3B8" />} /><ListItem title="?????" subtitle="?????????" right={<ChevronRight size={16} color="#94A3B8" />} /><div style={{ padding: "0 16px 16px" }}><SaaSButton onClick={() => navigate("/admin/auth")} block>??????</SaaSButton></div></SaaSCard>;

  return <div style={pageStyle}><div style={containerStyle}><PageTitle title="????" subtitle="??????????????" /><SaaSTab items={tabs} active={tab} onChange={setTab} />{tab === "????" && accounts}{tab === "????" && create}{tab === "????" && approval}{tab === "????" && auth}</div></div>;
}
const fieldLabelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, color: "#64748B", marginBottom: 8 };
const selectStyle: React.CSSProperties = { width: "100%", padding: "12px 14px", border: "1.5px solid #E2E8F0", borderRadius: 14, fontSize: 14, background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" };
const linkButtonStyle: React.CSSProperties = { border: 0, background: "transparent", color: "#059669", fontSize: 12, fontWeight: 700, cursor: "pointer" };
const sectionHeaderStyle: React.CSSProperties = { padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#64748B", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" };
