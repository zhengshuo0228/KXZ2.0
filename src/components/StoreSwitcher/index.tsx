import { useState } from "react";
import { Popup, Toast } from "antd-mobile";
import { useAppStore } from "../../models/appStore";

interface StoreSwitcherProps {
  stores: { id: string; name: string }[];
}

export default function StoreSwitcher({ stores }: StoreSwitcherProps) {
  const { currentUser, currentStoreId, setCurrentStore } = useAppStore();
  const [visible, setVisible] = useState(false);

  if (!currentUser || stores.length <= 1) return null;

  const visibleStores = currentUser.username === "000" ? stores : stores.filter((store) => store.id === currentUser.storeId);
  if (visibleStores.length <= 1) return null;

  return (
    <>
      <div
        onClick={() => setVisible(true)}
        style={{
          padding: "7px 10px",
          background: "#fff",
          borderRadius: 12,
          fontSize: 12,
          fontWeight: 700,
          cursor: "pointer",
          border: "1px solid #E2E8F0",
          whiteSpace: "nowrap",
          color: "#059669",
        }}
      >
        📍 切换门店
      </div>

      <Popup
        visible={visible}
        onMaskClick={() => setVisible(false)}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16 }}
      >
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>选择门店</div>
        {visibleStores.map((store) => (
          <div
            key={store.id}
            onClick={() => {
              setCurrentStore(store.id);
              setVisible(false);
              Toast.show({ content: `已切换到${store.name}`, icon: "success" });
            }}
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              marginBottom: 8,
              background: store.id === currentStoreId ? "#ECFDF5" : "#fff",
              border: store.id === currentStoreId ? "2px solid #059669" : "1px solid #E2E8F0",
              cursor: "pointer",
            }}
          >
            {store.name}
          </div>
        ))}
      </Popup>
    </>
  );
}
