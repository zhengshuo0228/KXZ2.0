// 权限标识
export type FunctionPermission =
  | "purchase_submit"
  | "purchase_review"
  | "purchase_summary"
  | "purchase_history"
  | "ingredient_manage"
  | "performance_view"
  | "performance_apply"
  | "performance_review"
  | "performance_manage"
  | "schedule_view"
  | "schedule_manage"
  | "account_manage"
  | "account_create"
  | "registration_approve"
  | "authorization_manage"
  | "position_manage";

export type AdminPermission = "admin" | "super_admin";

export interface Position {
  id: string;
  name: string;
  department: "kitchen" | "dining";
  isPreset: boolean;
  rank: number;
  permissions: Record<string, string[]>;
  adminPermissions: AdminPermission[];
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  storeId: string;
  isPreset: boolean;
  createdAt: string;
}

export interface Store {
  id: string;
  name: string;
  city: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  realName: string;
  storeId: string;
  departmentId: string;
  positionIds: string[];
  status: "active" | "pending" | "rejected";
}

export interface NotificationItem {
  id: string;
  type:
    | "purchase_review"
    | "performance_review"
    | "schedule_review"
    | "account_review"
    | "purchase_submit"
    | "performance_adjust"
    | "schedule_adjust"
    | "announcement";
  title: string;
  content: string;
  recipientId?: string;
  linkType?: string;
  linkId?: string;
  read: boolean;
  createdAt: string;
}
