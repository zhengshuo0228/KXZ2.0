import { PushNotifications } from "@capacitor/push-notifications";
import { Preferences } from "@capacitor/preferences";

export async function registerPush() {
  const perm = await PushNotifications.checkPermissions();
  if (perm.receive !== "granted") {
    await PushNotifications.requestPermissions();
  }

  await PushNotifications.register();

  PushNotifications.addListener("pushNotificationReceived", async (notification) => {
    const title = (notification as any).title || "";
    const body = (notification as any).body || "";
    const type = (notification as any).data?.type || "announcement";

    const raw = await Preferences.get({ key: "notifications" });
    const notifications = raw.value ? JSON.parse(raw.value) : [];
    notifications.unshift({
      id: `push_${Date.now()}`,
      type,
      title,
      content: body,
      read: false,
      createdAt: new Date().toISOString(),
    });
    await Preferences.set({ key: "notifications", value: JSON.stringify(notifications) });
  });
}

export async function registerWebPush() {
  if (!("Notification" in window)) return false;
  const result = await Notification.requestPermission();
  return result === "granted";
}

export function showLocalNotification(title: string, body: string) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body });
  }
}
