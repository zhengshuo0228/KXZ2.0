import { useAppStore } from "../models/appStore";

export function usePermission() {
  const hasPermission = useAppStore((s) => s.hasPermission);
  return hasPermission;
}

export function useCurrentUserInfo() {
  return useAppStore((s) => ({
    user: s.currentUser,
    positions: s.currentPositions,
    storeId: s.currentStoreId,
  }));
}
