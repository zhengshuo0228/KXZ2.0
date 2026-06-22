import type { Department, NotificationItem, Position, Store, User } from "../types";
import { ALL_POSITIONS, MENU_ITEMS as PRESET_MENU_ITEMS } from "../types/presets";

export const MOCK_STORES: Store[] = [
  { id: "s1", name: "开小灶总店", city: "北京" },
  { id: "s2", name: "开小灶分店A", city: "上海" },
  { id: "s3", name: "开小灶分店B", city: "广州" },
];

export const MOCK_DEPARTMENTS: Department[] = [
  { id: "d_kitchen", name: "厨房", storeId: "s1", isPreset: true, createdAt: "2024-01-01" },
  { id: "d_dining", name: "前厅", storeId: "s1", isPreset: true, createdAt: "2024-01-01" },
  { id: "d_kitchen2", name: "厨房", storeId: "s2", isPreset: true, createdAt: "2024-01-01" },
  { id: "d_dining2", name: "前厅", storeId: "s2", isPreset: true, createdAt: "2024-01-01" },
  { id: "d_kitchen3", name: "厨房", storeId: "s3", isPreset: true, createdAt: "2024-01-01" },
  { id: "d_dining3", name: "前厅", storeId: "s3", isPreset: true, createdAt: "2024-01-01" },
];

export const MOCK_POSITIONS: Position[] = ALL_POSITIONS;

export const MOCK_USERS: User[] = [
  { id: "u1", username: "admin", password: "123456", email: "admin@kxzs.xyz", realName: "管理员", storeId: "s1", departmentId: "d_kitchen", positionIds: ["k1"], status: "active" },
  { id: "u2", username: "user", password: "123456", email: "user@kxzs.xyz", realName: "测试员工", storeId: "s1", departmentId: "d_kitchen", positionIds: ["k4"], status: "active" },
  { id: "u3", username: "manager", password: "123456", email: "manager@kxzs.xyz", realName: "店长", storeId: "s2", departmentId: "d_dining2", positionIds: ["d1"], status: "active" },
  { id: "u000", username: "000", password: "000000", email: "super@kxzs.xyz", realName: "系统超管", storeId: "s1", departmentId: "d_kitchen", positionIds: ["d1"], status: "active" },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: "n1", type: "purchase_review", title: "申购审核", content: "你的申购单「青椒 30斤」已批准", linkType: "purchase", linkId: "o1", read: false, createdAt: new Date(Date.now() - 180000).toISOString() },
  { id: "n2", type: "purchase_submit", title: "申购确认", content: "你的申购单「菠菜 20斤」已提交成功", linkType: "history", linkId: "o2", read: false, createdAt: new Date(Date.now() - 300000).toISOString() },
  { id: "n3", type: "performance_review", title: "绩效审批", content: "你的绩效加分申请「加班」已通过", linkType: "performance", linkId: "p1", read: true, createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: "n4", type: "announcement", title: "系统公告", content: "【系统公告】本周门店盘点通知", linkType: "announcement", linkId: "a1", read: false, createdAt: new Date(Date.now() - 600000).toISOString() },
];

export const MENU_ITEMS = PRESET_MENU_ITEMS.map(({ supplier: _supplier, ...item }) => item);

export const PURCHASE_ORDERS = [
  { id: "o1", userId: "u2", storeId: "s1", user: { realName: "测试员工" }, items: [{ menuId: "m1", name: "青椒", qty: 30, unit: "斤" }], status: "approved", createdAt: "2024-06-10T08:00:00" },
  { id: "o2", userId: "u2", storeId: "s1", user: { realName: "测试员工" }, items: [{ menuId: "m2", name: "菠菜", qty: 20, unit: "斤" }], status: "pending", createdAt: "2024-06-10T09:00:00" },
];
