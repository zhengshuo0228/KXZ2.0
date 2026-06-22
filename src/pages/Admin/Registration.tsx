import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { pageStyle, containerStyle, PageTitle, SaaSCard, ListItem, StatusBadge, EmptyState } from "../../components/saas";
import { approveRegistration, getDepartments, getPositions, getRegistrations, getStores } from "../../api/mockApi";
import type { Department, Position, Store } from "../../types";

type Registration = { id: string; username: string; realName: string; storeId: string; departmentId: string; positionId: string; remark?: string; status: "pending" | "approved" | "rejected"; createdAt: string };

export default function AdminRegistration() {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    try {
      const [registrationResult, storeResult, departmentResult, positionResult] = await Promise.all([getRegistrations(), getStores(), getDepartments(), getPositions()]);
      if (registrationResult.code === 0) setRegistrations(registrationResult.data as Registration[]);
      if (storeResult.code === 0) setStores(storeResult.data);
      if (departmentResult.code === 0) setDepartments(departmentResult.data);
      if (positionResult.code === 0) setPositions(positionResult.data);
    } finally { setLoading(false); }
  };
  useEffect(() => { reload(); }, []);

  const maps = useMemo(() => ({ store: new Map(stores.map((store) => [store.id, store.name])), department: new Map(departments.map((department) => [department.id, department.name])), position: new Map(positions.map((position) => [position.id, position.name])) }), [stores, departments, positions]);
  const handleApprove = async (id: string, approved: boolean) => {
    if (!confirm(approved ? "??????????" : "??????????")) return;
    try { await approveRegistration(id, approved); await reload(); alert(approved ? "????????????" : "???"); } catch (error: any) { alert(error?.response?.data?.message || "??????????"); }
  };
  const pendingList = registrations.filter((registration) => registration.status === "pending");
  const doneList = registrations.filter((registration) => registration.status !== "pending").slice(0, 10);
  const renderRegistration = (registration: Registration) => {
    const statusText = registration.status === "pending" ? "???" : registration.status === "approved" ? "???" : "???";
    const statusType = registration.status === "pending" ? "warning" : registration.status === "approved" ? "success" : "danger";
    return <SaaSCard key={registration.id} style={{ marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 12 }}><div><div style={{ fontSize: 16, fontWeight: 800 }}>{registration.realName}</div><div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>???{registration.username}</div></div><StatusBadge text={statusText} type={statusType} /></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}><div style={metaStyle}>???{maps.store.get(registration.storeId) || registration.storeId}</div><div style={metaStyle}>???{maps.department.get(registration.departmentId) || registration.departmentId}</div><div style={metaStyle}>???{maps.position.get(registration.positionId) || registration.positionId}</div><div style={metaStyle}>???{new Date(registration.createdAt).toLocaleString()}</div></div>{registration.remark ? <div style={{ fontSize: 12, color: "#64748B", padding: "8px 12px", background: "#F8FAFC", borderRadius: 12, marginBottom: 12 }}>{registration.remark}</div> : null}{registration.status === "pending" ? <div style={{ display: "flex", gap: 8 }}><button onClick={() => handleApprove(registration.id, true)} style={approveButtonStyle}>??</button><button onClick={() => handleApprove(registration.id, false)} style={rejectButtonStyle}>??</button></div> : null}</SaaSCard>;
  };

  return <div style={pageStyle}><div style={containerStyle}><PageTitle title="????" subtitle="????????????????????" />{loading ? <SaaSCard>???...</SaaSCard> : null}{!loading && pendingList.length === 0 ? <SaaSCard><EmptyState icon="??" text="?????????" /></SaaSCard> : null}{!loading && pendingList.map(renderRegistration)}{!loading && doneList.length > 0 ? <><div style={{ fontSize: 13, fontWeight: 800, color: "#64748B", margin: "18px 2px 10px" }}>?????</div>{doneList.map(renderRegistration)}</> : null}<SaaSCard style={{ padding: 0, overflow: "hidden", marginTop: 12, position: "relative" }}><ListItem title="??????" subtitle="????????????????" right={<ChevronRight size={16} color="#94A3B8" />} /><div onClick={() => navigate("/admin/account")} style={{ position: "absolute", inset: 0, cursor: "pointer" }} /></SaaSCard></div></div>;
}
const metaStyle: React.CSSProperties = { fontSize: 12, color: "#64748B" };
const approveButtonStyle: React.CSSProperties = { flex: 1, padding: "11px 0", borderRadius: 14, background: "#059669", color: "#fff", border: 0, fontSize: 13, fontWeight: 700, cursor: "pointer" };
const rejectButtonStyle: React.CSSProperties = { flex: 1, padding: "11px 0", borderRadius: 14, background: "#fff", color: "#DC2626", border: "1.5px solid #FEE2E2", fontSize: 13, fontWeight: 700, cursor: "pointer" };
