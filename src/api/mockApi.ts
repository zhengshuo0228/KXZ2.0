import api from "./http";
import {
  MENU_ITEMS,
  MOCK_DEPARTMENTS,
  MOCK_NOTIFICATIONS,
  MOCK_POSITIONS,
  MOCK_STORES,
  MOCK_USERS,
  PURCHASE_ORDERS,
} from "./mock";
import { getRandomWelcomeMessage as getPresetWelcomeMessage } from "../types/presets";
import type { User } from "../types";

type ApiResponse<T> = {
  code: number;
  message?: string;
  data: T;
};

type LoginPayload = {
  username: string;
  password: string;
};

type LoginResult = {
  token?: string;
  user: User;
  positions: typeof MOCK_POSITIONS;
};

type RegisterPayload = {
  username: string;
  password: string;
  realName: string;
  storeId: string;
  departmentId: string;
  positionId: string;
  remark?: string;
};

type CreateUserPayload = {
  username: string;
  password: string;
  realName: string;
  storeId: string;
  departmentId: string;
  positionIds: string[];
};

const ok = <T>(data: T): ApiResponse<T> => ({ code: 0, data });
const realApi = api as any;

function unwrapApiData<T>(response: any): T {
  if (response && typeof response === "object" && "code" in response && "data" in response) {
    return response.data as T;
  }
  return response as T;
}

async function realOrMock<T>(request: () => Promise<T>, fallback: () => T | Promise<T>): Promise<ApiResponse<T>> {
  try {
    const data = await request();
    return ok(unwrapApiData<T>(data));
  } catch (error) {
    console.warn("真实 API 不可用，已切换本地 Mock：", error);
    return ok(await fallback());
  }
}

function normalizeLoginResult(data: any): LoginResult {
  if (data?.user && data?.positions) return data;
  return data?.data ?? data;
}

export async function login(payload: LoginPayload): Promise<ApiResponse<LoginResult>> {
  try {
    const data = await realApi.post("/login", payload);
    return ok(normalizeLoginResult(data));
  } catch (error) {
    const user = MOCK_USERS.find((item) => item.username === payload.username && item.password === payload.password);
    if (!user) throw error;
    const positions = MOCK_POSITIONS.filter((position) => user.positionIds.includes(position.id));
    return ok({ token: "mock-token", user, positions });
  }
}

export async function logout() {
  return realOrMock(() => realApi.post("/logout"), () => true);
}

export async function getUserInfo() {
  return realOrMock(() => realApi.get("/user/info"), () => null);
}

export async function changePassword(oldPassword: string, newPassword: string) {
  return realOrMock(() => realApi.put("/user/password", { oldPassword, newPassword }), () => true);
}

export async function register(payload: RegisterPayload) {
  return realOrMock(() => realApi.post("/register", payload), () => ({ ...payload, id: `mock_${Date.now()}`, status: "pending" }));
}

export async function getStores() {
  return realOrMock(() => realApi.get("/stores"), () => MOCK_STORES);
}

export async function getDepartments(storeId?: string) {
  return realOrMock(
    () => realApi.get("/departments", { params: storeId ? { storeId } : undefined }),
    () => (storeId ? MOCK_DEPARTMENTS.filter((department) => department.storeId === storeId) : MOCK_DEPARTMENTS)
  );
}

export async function getPositions() {
  return realOrMock(() => realApi.get("/positions"), () => MOCK_POSITIONS);
}

export async function getStatsSummary(range = "today") {
  return realOrMock(() => realApi.get("/stats/summary", { params: { range } }), () => ({
    range,
    purchase: { total: 0, approved: 0, rejected: 0, pending: 0, completionRate: 0 },
    ingredient: { total: MENU_ITEMS.length },
    account: { activeUsers: MOCK_USERS.length },
    notification: { unread: MOCK_NOTIFICATIONS.filter((item) => !item.read).length },
    performance: { applied: 1, approved: 1 },
    schedule: { onLeave: 1, onDuty: MOCK_USERS.length - 1 },
  }));
}

export async function getNotifications() {
  return realOrMock(() => realApi.get("/notifications"), () => MOCK_NOTIFICATIONS);
}

export async function markNotificationRead(id: string) {
  return realOrMock(() => realApi.put(`/notifications/${id}/read`), () => true);
}

export async function markAllNotificationsRead() {
  return realOrMock(() => realApi.put("/notifications/read-all"), () => true);
}

export async function getMenu() {
  return realOrMock(() => realApi.get("/purchase/menu"), () => MENU_ITEMS);
}

export function getMenuTemplateUrl() {
  return "/api/purchase/menu/template";
}

export async function uploadMenuItems(items: Array<{ category: string; subCategory: string; name: string; defaultQty: number; unit: string }>) {
  return realOrMock(() => realApi.post("/purchase/menu/upload", { items }), () => ({ count: items.length, warnings: [], items }));
}

export async function getOrders(status?: string) {
  return realOrMock(
    () => realApi.get("/purchase/orders", { params: status ? { status } : undefined }),
    () => (status ? PURCHASE_ORDERS.filter((order) => order.status === status) : PURCHASE_ORDERS)
  );
}

export async function submitPurchaseOrder(items: Array<{ menuId?: string; name: string; qty: number; unit: string }>) {
  return realOrMock(() => realApi.post("/purchase/orders", { items }), () => ({
    id: `mock_order_${Date.now()}`,
    items,
    status: "pending",
    createdAt: new Date().toISOString(),
  }));
}

export async function reviewPurchaseOrder(id: string, approved: boolean) {
  return realOrMock(() => realApi.put(`/purchase/orders/${id}`, { approved }), () => ({ id, status: approved ? "approved" : "rejected" }));
}

export async function getRegistrations() {
  return realOrMock(() => realApi.get("/admin/registrations"), () => []);
}

export async function getAdminUsers() {
  return realOrMock(() => realApi.get("/admin/users"), () => []);
}

export async function createAdminUser(payload: CreateUserPayload) {
  return realOrMock(() => realApi.post("/admin/users", payload), () => ({ ...payload, id: `mock_user_${Date.now()}`, status: "active" }));
}

export async function updateUserPositions(id: string, positionIds: string[]) {
  return realOrMock(() => realApi.put(`/admin/users/${id}/positions`, { positionIds }), () => ({ id, positionIds }));
}

export async function approveRegistration(id: string, approved: boolean) {
  return realOrMock(() => realApi.put(`/admin/registrations/${id}`, { approved }), () => ({ id, status: approved ? "approved" : "rejected" }));
}

export async function getCrossDepartmentAuthorizations() {
  return realOrMock(() => realApi.get("/admin/auth/cross-dept"), () => []);
}

export async function createCrossDepartmentAuthorization(payload: { userId: string; targetId: string }) {
  return realOrMock(() => realApi.post("/admin/auth/cross-dept", payload), () => []);
}

export async function deleteCrossDepartmentAuthorization(id: string) {
  return realOrMock(() => realApi.delete(`/admin/auth/cross-dept/${id}`), () => true);
}

export async function getCrossStoreAuthorizations() {
  return realOrMock(() => realApi.get("/admin/auth/cross-store"), () => []);
}

export async function createCrossStoreAuthorization(payload: { userId: string; targetId: string }) {
  return realOrMock(() => realApi.post("/admin/auth/cross-store", payload), () => []);
}

export async function deleteCrossStoreAuthorization(id: string) {
  return realOrMock(() => realApi.delete(`/admin/auth/cross-store/${id}`), () => true);
}

export async function getMyPerformance() {
  return realOrMock(
    () => realApi.get("/performance/my"),
    () => ({
      total: 27,
      records: [
        { id: "mock_perf_1", title: "食材节约", type: "加分", points: 10, status: "approved", remark: "", createdAt: new Date().toISOString() },
        { id: "mock_perf_2", title: "卫生检查", type: "扣分", points: -5, status: "approved", remark: "需整改", createdAt: new Date(Date.now() - 86400000).toISOString() },
      ],
    })
  );
}

export async function getAllPerformance() {
  return realOrMock(
    () => realApi.get("/performance/all"),
    () => [
      { id: "mock_perf_1", title: "食材节约", type: "加分", points: 10, status: "approved", createdAt: new Date().toISOString(), user: { realName: "张三" } },
      { id: "mock_perf_2", title: "迟到", type: "扣分", points: -3, status: "approved", createdAt: new Date(Date.now() - 86400000).toISOString(), user: { realName: "李四" } },
    ]
  );
}

export async function getPerformanceRanking() {
  return realOrMock(
    () => realApi.get("/performance/ranking"),
    () => [
      { user: { realName: "张三" }, score: 128 },
      { user: { realName: "王五" }, score: 115 },
      { user: { realName: "李四" }, score: 105 },
    ]
  );
}

export async function getPendingPerformance() {
  return realOrMock(
    () => realApi.get("/performance/pending"),
    () => [
      { id: "mock_pending_1", title: "食材节约", type: "加分", points: 3, status: "pending", createdAt: new Date().toISOString(), user: { realName: "张三" } },
    ]
  );
}

export async function createPerformanceRecord(payload: { userId?: string; title: string; type: string; points: number; remark?: string }) {
  return realOrMock(
    () => realApi.post("/performance/records", payload),
    () => ({ ...payload, id: `mock_perf_${Date.now()}`, status: "approved", createdAt: new Date().toISOString() })
  );
}

export async function getScheduleMonthly() {
  return realOrMock(
    () => realApi.get("/schedule/monthly"),
    () => [
      { id: "mock_schedule_1", date: new Date().toISOString(), type: "出勤", status: "approved", user: { realName: "张三" } },
      { id: "mock_schedule_2", date: new Date(Date.now() - 86400000).toISOString(), type: "休假", status: "approved", user: { realName: "李四" } },
    ]
  );
}

export async function getScheduleAttendance() {
  return realOrMock(() => realApi.get("/schedule/attendance"), () => ({ onDuty: MOCK_USERS.length - 1, onLeave: 1 }));
}

export async function createScheduleRecord(payload: { userId?: string; date: string; type: string; remark?: string }) {
  return realOrMock(
    () => realApi.post("/schedule", payload),
    () => ({ ...payload, id: `mock_schedule_${Date.now()}`, status: "approved", createdAt: new Date().toISOString() })
  );
}

export function getRandomWelcomeMessage() {
  return getPresetWelcomeMessage();
}
