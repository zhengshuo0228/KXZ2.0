import { create } from "zustand";
import type { User, Position, Store, Department, NotificationItem, AdminPermission } from "../types";

interface AppState {
  // Auth
  currentUser: User | null;
  currentPositions: Position[];
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, positions: Position[], token?: string) => void;
  logout: () => void;

  // Store
  currentStoreId: string;
  stores: Store[];
  departments: Department[];
  setCurrentStore: (id: string) => void;
  setStores: (stores: Store[]) => void;
  setDepartments: (departments: Department[]) => void;

  // Notifications
  notifications: NotificationItem[];
  setNotifications: (n: NotificationItem[]) => void;

  // Permission helper
  hasPermission: (perm: string) => boolean;
  getVisibleScope: () => { stores: Set<string>; departments: Set<string> };
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  currentPositions: [],
  token: null,
  isAuthenticated: false,
  currentStoreId: "",
  stores: [],
  departments: [],
  notifications: [],

  login: (user, positions, token = localStorage.getItem("token") || "mock-token") => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("currentPositions", JSON.stringify(positions));
    localStorage.setItem("token", token);
    set({ currentUser: user, currentPositions: positions, token, isAuthenticated: true, currentStoreId: user.storeId || "" });
  },

  logout: () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentPositions");
    localStorage.removeItem("token");
    localStorage.removeItem("currentStore");
    set({ currentUser: null, currentPositions: [], token: null, isAuthenticated: false, currentStoreId: "" });
  },

  setCurrentStore: (id) => {
    localStorage.setItem("currentStore", id);
    set({ currentStoreId: id });
  },

  setStores: (stores) => set({ stores }),

  setDepartments: (departments) => set({ departments }),

  setNotifications: (n) => set({ notifications: n }),

  hasPermission: (perm) => {
    const { currentUser, currentPositions } = get();
    if (!currentUser) return false;
    if (currentUser.username === "000") return true;
    for (const pos of currentPositions) {
      const permissions = pos?.permissions || {};
      for (const category of Object.values(permissions)) {
        if (Array.isArray(category) && category.includes(perm)) return true;
      }
      if (Array.isArray(pos?.adminPermissions) && pos.adminPermissions.includes(perm as AdminPermission)) return true;
    }
    return false;
  },

  getVisibleScope: () => {
    const { currentUser, stores } = get();
    if (!currentUser || currentUser.username === "000") {
      return { stores: new Set(stores.map((s) => s.id)), departments: new Set() };
    }
    const s = new Set([currentUser.storeId]);
    return { stores: s, departments: new Set([currentUser.departmentId]) };
  },
}));

// Init from localStorage
if (typeof window !== "undefined") {
  const savedUser = localStorage.getItem("currentUser");
  const savedPositions = localStorage.getItem("currentPositions");
  const savedStore = localStorage.getItem("currentStore");
  if (savedUser) {
    try {
      const parsedUser = JSON.parse(savedUser);
      const parsedPositions = savedPositions ? JSON.parse(savedPositions) : [];
      const s = useAppStore.getState();
      s.login(parsedUser, Array.isArray(parsedPositions) ? parsedPositions : []);
      if (savedStore) s.setCurrentStore(savedStore);
    } catch (error) {
      console.warn("本地登录缓存异常，已清理：", error);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("currentPositions");
      localStorage.removeItem("token");
      localStorage.removeItem("currentStore");
    }
  }
}
