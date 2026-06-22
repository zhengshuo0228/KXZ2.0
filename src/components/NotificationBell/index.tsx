import { useEffect, useState } from "react";
import type React from "react";
import { Popup } from "antd-mobile";
import { Bell } from "lucide-react";
import { useAppStore } from "../../models/appStore";
import { NOTIFICATION_ORDER } from "../../types/presets";
import { getNotifications, markAllNotificationsRead, markNotificationRead } from "../../api/mockApi";
import type { NotificationItem } from "../../types";

export default function NotificationBell() {
  const { notifications, setNotifications } = useAppStore();
  const [visible, setVisible] = useState(false);
  const safeNotifications = Array.isArray(notifications) ? notifications : [];

  useEffect(() => {
    getNotifications().then((result) => {
      if (result.code === 0) setNotifications(Array.isArray(result.data) ? result.data : []);
    });
  }, [setNotifications]);

  const unreadCount = safeNotifications.filter((notification) => !notification.read).length;
  const sortedNotifications = [...safeNotifications].sort((a, b) => {
    const aIdx = NOTIFICATION_ORDER.indexOf(a.type);
    const bIdx = NOTIFICATION_ORDER.indexOf(b.type);
    if (aIdx !== bIdx) return aIdx - bIdx;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const grouped = sortedNotifications.reduce<Record<string, NotificationItem[]>>((accumulator, notification) => {
    const key = notification.title || "通知";
    if (!accumulator[key]) accumulator[key] = [];
    accumulator[key].push(notification);
    return accumulator;
  }, {});

  const handleRead = async (id: string) => {
    await markNotificationRead(id);
    setNotifications(safeNotifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)));
  };

  const handleReadAll = async () => {
    await markAllNotificationsRead();
    setNotifications(safeNotifications.map((notification) => ({ ...notification, read: true })));
  };

  return (
    <>
      <div onClick={() => setVisible(true)} style={bellStyle}>
        <Bell size={18} />
        {unreadCount > 0 ? <span style={dotStyle} /> : null}
      </div>

      <Popup visible={visible} onMaskClick={() => setVisible(false)} bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16, maxHeight: "70vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>通知</div>
          <div onClick={handleReadAll} style={{ fontSize: 13, color: "#059669", cursor: "pointer" }}>全部已读</div>
        </div>

        {Object.entries(grouped).map(([title, items]) => (
          <div key={title}>
            <div style={{ fontSize: 13, color: "#64748B", marginBottom: 6 }}>{title}</div>
            {items.map((notification) => (
              <div key={notification.id} onClick={() => handleRead(notification.id)} style={{ padding: "10px 12px", borderRadius: 10, marginBottom: 6, background: notification.read ? "#F8FAFC" : "#ECFDF5", cursor: "pointer", borderLeft: notification.read ? "3px solid #CBD5E1" : "3px solid #059669" }}>
                <div style={{ fontSize: 14 }}>{notification.content}</div>
                <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>{new Date(notification.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        ))}

        {sortedNotifications.length === 0 ? <div style={{ textAlign: "center", padding: 40, color: "#94A3B8" }}>暂无通知</div> : null}
      </Popup>
    </>
  );
}

const bellStyle: React.CSSProperties = {
  width: 38,
  height: 38,
  borderRadius: "50%",
  background: "#fff",
  border: "1px solid #E2E8F0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  position: "relative",
  boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
  color: "#334155",
};

const dotStyle: React.CSSProperties = {
  position: "absolute",
  top: -2,
  right: -2,
  width: 10,
  height: 10,
  borderRadius: "50%",
  background: "#EF4444",
};
