import type { Position } from "./index";

const purchasePermissions = ["purchase_submit", "purchase_review", "purchase_summary", "purchase_history", "ingredient_manage"];
const performancePermissions = ["performance_view", "performance_apply", "performance_review", "performance_manage"];
const schedulePermissions = ["schedule_view", "schedule_manage"];
const accountPermissions = ["account_manage", "account_create", "registration_approve"];

const fullPermissions = {
  食材申购: purchasePermissions,
  绩效考核: performancePermissions,
  考勤排休: schedulePermissions,
  账号管理: accountPermissions,
  授权管理: ["authorization_manage"],
  系统管理: ["position_manage"],
};

const submitOnly = {
  食材申购: ["purchase_submit", "purchase_history"],
  绩效考核: ["performance_view"],
  考勤排休: ["schedule_view"],
  账号管理: [],
  授权管理: [],
  系统管理: [],
};

export const PRESET_POSITIONS_KITCHEN: Position[] = [
  { id: "k1", name: "厨师长", department: "kitchen", isPreset: true, rank: 1, permissions: fullPermissions, adminPermissions: ["admin"], createdAt: "2024-01-01" },
  { id: "k2", name: "副厨师长", department: "kitchen", isPreset: true, rank: 2, permissions: fullPermissions, adminPermissions: ["admin"], createdAt: "2024-01-01" },
  { id: "k3", name: "主配", department: "kitchen", isPreset: true, rank: 3, permissions: { ...submitOnly, 食材申购: ["purchase_submit", "purchase_history", "ingredient_manage"] }, adminPermissions: [], createdAt: "2024-01-01" },
  { id: "k4", name: "炉台", department: "kitchen", isPreset: true, rank: 4, permissions: submitOnly, adminPermissions: [], createdAt: "2024-01-01" },
  { id: "k5", name: "配菜", department: "kitchen", isPreset: true, rank: 5, permissions: submitOnly, adminPermissions: [], createdAt: "2024-01-01" },
  { id: "k6", name: "冷菜", department: "kitchen", isPreset: true, rank: 6, permissions: submitOnly, adminPermissions: [], createdAt: "2024-01-01" },
  { id: "k7", name: "煲档", department: "kitchen", isPreset: true, rank: 7, permissions: submitOnly, adminPermissions: [], createdAt: "2024-01-01" },
  { id: "k8", name: "洗杀", department: "kitchen", isPreset: true, rank: 8, permissions: submitOnly, adminPermissions: [], createdAt: "2024-01-01" },
];

export const PRESET_POSITIONS_DINING: Position[] = [
  { id: "d1", name: "店长", department: "dining", isPreset: true, rank: 1, permissions: fullPermissions, adminPermissions: ["admin", "super_admin"], createdAt: "2024-01-01" },
  { id: "d2", name: "主管", department: "dining", isPreset: true, rank: 2, permissions: fullPermissions, adminPermissions: ["admin"], createdAt: "2024-01-01" },
  { id: "d3", name: "收银员", department: "dining", isPreset: true, rank: 3, permissions: { ...submitOnly, 食材申购: [] }, adminPermissions: [], createdAt: "2024-01-01" },
  { id: "d4", name: "领班", department: "dining", isPreset: true, rank: 4, permissions: { ...submitOnly, 考勤排休: schedulePermissions }, adminPermissions: [], createdAt: "2024-01-01" },
  { id: "d5", name: "服务员", department: "dining", isPreset: true, rank: 5, permissions: submitOnly, adminPermissions: [], createdAt: "2024-01-01" },
  { id: "d6", name: "传菜员", department: "dining", isPreset: true, rank: 6, permissions: submitOnly, adminPermissions: [], createdAt: "2024-01-01" },
];

export const ALL_POSITIONS: Position[] = [...PRESET_POSITIONS_KITCHEN, ...PRESET_POSITIONS_DINING];

export const CATEGORIES = ["全部", "蔬菜", "禽肉", "河鲜", "冻品", "干货调料", "其它"];

export const SUB_CATEGORIES: Record<string, string[]> = {
  全部: [],
  蔬菜: ["叶菜类", "根茎类", "菌菇类", "瓜茄类"],
  禽肉: ["鸡肉", "鸭肉", "猪肉", "牛肉"],
  河鲜: ["淡水鱼", "虾", "蟹", "贝类"],
  冻品: ["冷冻蔬菜", "冷冻肉", "冷冻海鲜", "速冻面点"],
  干货调料: ["香料", "调味品", "酱料", "干货"],
  其它: ["清洁用品", "耗材", "其它"],
};

export interface MenuItem {
  id: string;
  category: string;
  subCategory: string;
  supplier: string;
  name: string;
  defaultQty: number;
  unit: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { id: "m1", category: "蔬菜", subCategory: "叶菜类", supplier: "德康", name: "青椒", defaultQty: 30, unit: "斤" },
  { id: "m2", category: "蔬菜", subCategory: "叶菜类", supplier: "德康", name: "菠菜", defaultQty: 20, unit: "斤" },
  { id: "m3", category: "蔬菜", subCategory: "根茎类", supplier: "新地", name: "土豆", defaultQty: 50, unit: "斤" },
  { id: "m4", category: "禽肉", subCategory: "鸡肉", supplier: "金福", name: "鸡腿", defaultQty: 20, unit: "斤" },
  { id: "m5", category: "禽肉", subCategory: "猪肉", supplier: "金福", name: "五花肉", defaultQty: 15, unit: "斤" },
  { id: "m6", category: "河鲜", subCategory: "淡水鱼", supplier: "海盛", name: "草鱼", defaultQty: 25, unit: "斤" },
  { id: "m7", category: "冻品", subCategory: "冷冻蔬菜", supplier: "海盛", name: "玉米粒", defaultQty: 10, unit: "斤" },
  { id: "m8", category: "干货调料", subCategory: "调味品", supplier: "云仓", name: "生抽", defaultQty: 5, unit: "瓶" },
  { id: "m9", category: "蔬菜", subCategory: "菌菇类", supplier: "新地", name: "香菇", defaultQty: 10, unit: "斤" },
  { id: "m10", category: "其它", subCategory: "耗材", supplier: "云仓", name: "打包盒", defaultQty: 100, unit: "个" },
];

export const WELCOME_MESSAGES = [
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

export function getRandomWelcomeMessage() {
  const day = Math.floor(Date.now() / 86400000);
  return WELCOME_MESSAGES[day % WELCOME_MESSAGES.length];
}

export function getGreeting() {
  const h = new Date().getHours();
  if (h < 9) return "早上好";
  if (h < 12) return "上午好";
  if (h < 14) return "中午好";
  if (h < 17) return "下午好";
  if (h < 19) return "傍晚好";
  return "晚上好";
}

export const PERMISSION_CATEGORIES = [
  { key: "食材申购", icon: "🍳", permissions: purchasePermissions },
  { key: "绩效考核", icon: "🏅", permissions: performancePermissions },
  { key: "考勤排休", icon: "📅", permissions: schedulePermissions },
  { key: "账号管理", icon: "👤", permissions: accountPermissions },
  { key: "授权管理", icon: "🔐", permissions: ["authorization_manage"] },
  { key: "系统管理", icon: "⚙️", permissions: ["position_manage"] },
];

export const PERMISSION_LABELS: Record<string, string> = {
  purchase_submit: "申购提交",
  purchase_review: "申购审核",
  purchase_summary: "采购汇总",
  purchase_history: "申购记录",
  ingredient_manage: "食材库管理",
  performance_view: "绩效看板",
  performance_apply: "绩效申请",
  performance_review: "绩效审核",
  performance_manage: "绩效管理",
  schedule_view: "考勤排休",
  schedule_manage: "排休管理",
  account_manage: "账号管理",
  account_create: "新建账号",
  registration_approve: "注册审批",
  authorization_manage: "跨部门/跨门店授权",
  position_manage: "岗位管理",
};

export const NOTIFICATION_TYPES: Record<string, { label: string; icon: string }> = {
  purchase_review: { label: "申购审核", icon: "📋" },
  performance_review: { label: "绩效审批", icon: "🏅" },
  schedule_review: { label: "排休审批", icon: "📅" },
  account_review: { label: "账号审批", icon: "👤" },
  purchase_submit: { label: "申购确认", icon: "✅" },
  performance_adjust: { label: "绩效调整", icon: "📝" },
  schedule_adjust: { label: "排休调整", icon: "📝" },
  announcement: { label: "系统公告", icon: "📢" },
};

export const NOTIFICATION_ORDER = ["announcement", "purchase_review", "purchase_submit", "performance_review", "performance_adjust", "schedule_review", "schedule_adjust", "account_review"];
