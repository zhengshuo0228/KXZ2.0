import { MOCK_USERS, MOCK_POSITIONS, MOCK_NOTIFICATIONS, MOCK_STORES, MOCK_DEPARTMENTS, MENU_ITEMS, PURCHASE_ORDERS } from "./mock";
import type { LoginRequest, LoginResponse, ApiResponse } from "./types";
import type { User, Position, Department, Store } from "../types";

export async function login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
  const user = MOCK_USERS.find((item) => item.username === data.username && item.password === data.password);
  if (!user) throw new Error("账号或密码错误");
  const positions = MOCK_POSITIONS.filter((position) => user.positionIds.includes(position.id));
  return { code: 0, data: { token: "mock-token-" + user.id, user: user as User, positions }, message: "ok" };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
}

export async function getStores(): Promise<ApiResponse<Store[]>> {
  return { code: 0, data: MOCK_STORES, message: "ok" };
}

export async function getDepartments(storeId?: string): Promise<ApiResponse<Department[]>> {
  const list = storeId ? MOCK_DEPARTMENTS.filter((department) => department.storeId === storeId) : MOCK_DEPARTMENTS;
  return { code: 0, data: list, message: "ok" };
}

export async function getPositions(): Promise<ApiResponse<Position[]>> {
  return { code: 0, data: MOCK_POSITIONS, message: "ok" };
}

export async function getNotifications(): Promise<ApiResponse<import("../types").NotificationItem[]>> {
  return { code: 0, data: MOCK_NOTIFICATIONS, message: "ok" };
}

export async function markNotificationRead(id: string): Promise<ApiResponse> {
  const notification = MOCK_NOTIFICATIONS.find((item) => item.id === id);
  if (notification) notification.read = true;
  return { code: 0, data: null, message: "ok" };
}

export async function markAllNotificationsRead(): Promise<ApiResponse> {
  MOCK_NOTIFICATIONS.forEach((notification) => {
    notification.read = true;
  });
  return { code: 0, data: null, message: "ok" };
}

export async function getMenu(): Promise<ApiResponse<typeof MENU_ITEMS>> {
  return { code: 0, data: MENU_ITEMS, message: "ok" };
}

export async function getOrders(status?: string): Promise<ApiResponse<typeof PURCHASE_ORDERS>> {
  const list = status ? PURCHASE_ORDERS.filter((order) => order.status === status) : PURCHASE_ORDERS;
  return { code: 0, data: list, message: "ok" };
}

export function getRandomWelcomeMessage() {
  const msgs = [
    "今天也要加油呀",
    "新的一天，新的开始",
    "辛苦了，注意休息",
    "效率满满的一天",
    "保持好状态",
    "好好吃饭，好好工作",
    "今天也很棒！",
    "一起努力吧",
    "元气满满",
    "今天也要认真哦",
  ];
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return msgs[dayOfYear % msgs.length];
}
