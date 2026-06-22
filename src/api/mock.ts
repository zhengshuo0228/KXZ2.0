import type { Department, NotificationItem, Position, Store, User } from "../types";

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

const basePermissions = {
  食材申购: ["purchase_submit", "purchase_review", "purchase_summary", "ingredient_manage"],
  绩效考核: ["performance_view", "performance_apply", "performance_review", "performance_manage"],
  考勤排休: ["schedule_view", "schedule_manage"],
  账号管理: ["account_manage", "account_create", "registration_approve"],
  授权管理: ["authorization_manage"],
  系统管理: ["position_manage"],
};

export const MOCK_POSITIONS: Position[] = [
  { id: "k1", name: "厨师长", department: "kitchen", isPreset: true, rank: 1, permissions: { ...basePermissions }, adminPermissions: ["admin"], createdAt: "2024-01-01" },
  { id: "k2", name: "副厨师长", department: "kitchen", isPreset: true, rank: 2, permissions: { ...basePermissions }, adminPermissions: ["admin"], createdAt: "2024-01-01" },
  { id: "k3", name: "主配", department: "kitchen", isPreset: true, rank: 3, permissions: { ...basePermissions }, adminPermissions: [], createdAt: "2024-01-01" },
  { id: "k4", name: "炉台", department: "kitchen", isPreset: true, rank: 4, permissions: { ...basePermissions }, adminPermissions: [], createdAt: "2024-01-01" },
  { id: "k5", name: "配菜", department: "kitchen", isPreset: true, rank: 5, permissions: { ...basePermissions }, adminPermissions: [], createdAt: "2024-01-01" },
  { id: "k6", name: "冷菜", department: "kitchen", isPreset: true, rank: 6, permissions: { ...basePermissions }, adminPermissions: [], createdAt: "2024-01-01" },
  { id: "k7", name: "煲档", department: "kitchen", isPreset: true, rank: 7, permissions: { ...basePermissions }, adminPermissions: [], createdAt: "2024-01-01" },
  { id: "k8", name: "洗杀", department: "kitchen", isPreset: true, rank: 8, permissions: { ...basePermissions }, adminPermissions: [], createdAt: "2024-01-01" },
  { id: "d1", name: "店长", department: "dining", isPreset: true, rank: 1, permissions: { ...basePermissions }, adminPermissions: ["admin", "super_admin"], createdAt: "2024-01-01" },
  { id: "d2", name: "主管", department: "dining", isPreset: true, rank: 2, permissions: { ...basePermissions }, adminPermissions: ["admin"], createdAt: "2024-01-01" },
  { id: "d3", name: "收银员", department: "dining", isPreset: true, rank: 3, permissions: { ...basePermissions }, adminPermissions: [], createdAt: "2024-01-01" },
  { id: "d4", name: "领班", department: "dining", isPreset: true, rank: 4, permissions: { ...basePermissions }, adminPermissions: [], createdAt: "2024-01-01" },
  { id: "d5", name: "服务员", department: "dining", isPreset: true, rank: 5, permissions: { ...basePermissions }, adminPermissions: [], createdAt: "2024-01-01" },
  { id: "d6", name: "传菜员", department: "dining", isPreset: true, rank: 6, permissions: { ...basePermissions }, adminPermissions: [], createdAt: "2024-01-01" },
];

export const MOCK_USERS: User[] = [
  { id: "u1", username: "admin", password: "123456", email: "admin@miaoda.app", realName: "管理员", storeId: "s1", departmentId: "d_kitchen", positionIds: ["k1"], status: "active" },
  { id: "u2", username: "user", password: "123456", email: "user@miaoda.app", realName: "测试员工", storeId: "s1", departmentId: "d_kitchen", positionIds: ["k4"], status: "active" },
  { id: "u3", username: "manager", password: "123456", email: "manager@miaoda.app", realName: "店长", storeId: "s2", departmentId: "d_dining2", positionIds: ["d1"], status: "active" },
  { id: "u000", username: "000", password: "123456", email: "super@kxzs.xyz", realName: "系统超管", storeId: "s1", departmentId: "d_kitchen", positionIds: ["d1"], status: "active" },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: "n1", type: "purchase_review", title: "申购审核", content: "你的申购单「青椒30斤」已批准", linkType: "purchase", linkId: "o1", read: false, createdAt: new Date(Date.now() - 180000).toISOString() },
  { id: "n2", type: "purchase_submit", title: "申购确认", content: "你的申购单「番茄20斤」已提交成功", linkType: "history", linkId: "o2", read: false, createdAt: new Date(Date.now() - 300000).toISOString() },
  { id: "n3", type: "performance_review", title: "绩效审批", content: "你的绩效加分申请「加班」已通过", linkType: "performance", linkId: "p1", read: true, createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: "n4", type: "announcement", title: "系统公告", content: "【系统公告】本周门店盘点通知", linkType: "announcement", linkId: "a1", read: false, createdAt: new Date(Date.now() - 600000).toISOString() },
];

export const MENU_ITEMS = [
  { id: "m1", category: "蔬菜", subCategory: "叶菜类", name: "青椒", defaultQty: 30, unit: "斤" },
  { id: "m2", category: "蔬菜", subCategory: "叶菜类", name: "菠菜", defaultQty: 20, unit: "斤" },
  { id: "m3", category: "蔬菜", subCategory: "根茎类", name: "土豆", defaultQty: 50, unit: "斤" },
  { id: "m4", category: "禽肉", subCategory: "鸡肉", name: "鸡腿", defaultQty: 20, unit: "斤" },
  { id: "m5", category: "禽肉", subCategory: "猪肉", name: "五花肉", defaultQty: 15, unit: "斤" },
  { id: "m6", category: "河鲜", subCategory: "淡水鱼", name: "草鱼", defaultQty: 25, unit: "斤" },
  { id: "m7", category: "冻品", subCategory: "冷冻蔬菜", name: "玉米粒", defaultQty: 10, unit: "斤" },
  { id: "m8", category: "干货调料", subCategory: "调味品", name: "生抽", defaultQty: 5, unit: "瓶" },
  { id: "m9", category: "蔬菜", subCategory: "菌菇类", name: "香菇", defaultQty: 10, unit: "斤" },
  { id: "m10", category: "其它", subCategory: "耗材", name: "打包盒", defaultQty: 100, unit: "个" },
];

export const PURCHASE_ORDERS = [
  { id: "o1", userId: "u2", storeId: "s1", items: [{ menuId: "m1", name: "青椒", qty: 30, unit: "斤" }], status: "approved", createdAt: "2024-06-10T08:00:00" },
  { id: "o2", userId: "u2", storeId: "s1", items: [{ menuId: "m2", name: "菠菜", qty: 20, unit: "斤" }], status: "pending", createdAt: "2024-06-10T09:00:00" },
];
