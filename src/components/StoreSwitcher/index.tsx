import { useState } from "react";
import { Popup, Toast } from "antd-mobile";
import { useAppStore } from "../../models/appStore";

interface StoreSwitcherProps {
  stores: { id: string; name: string }[];
}

export default function StoreSwitcher({ stores }: StoreSwitcherProps) {
  const { currentUser, currentStoreId, setCurrentStore } = useAppStore();
  const [visible, setVisible] = useState(false);

  if (!stores || stores.length <= 1) return null;

  const user = currentUser;
  if (!user) return null;

  return (
    <>
      <div
        onClick={() => setVisible(true)}
        style={{
          padding: "8px 12px",
          background: "#fff",
          borderRadius: 8,
          fontSize: 13,
          cursor: "pointer",
          border: "1px solid #e0e0e0",
          whiteSpace: "nowrap",
        }}
      >
        📍 门店
      </div>

      <Popup
        visible={visible}
        onMaskClick={() => setVisible(false)}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16 }}
      >
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>选择门店</div>
        {stores.map((s) => (
          <div
            key={s.id}
            onClick={() => {
              setCurrentStore(s.id);
              setVisible(false);
              Toast.show({ content: `已切换到${s.name}`, icon: "success" });
            }}
            style={{
              padding: "12px 16px",
              borderRadius: 10,
              marginBottom: 8,
              background: s.id === currentStoreId ? "#E8F8F4" : "#fff",
              border: s.id === currentStoreId ? "2px solid #05A882" : "1px solid #e0e0e0",
              cursor: "pointer",
            }}
          >
            {s.name}
          </div>
        ))}
      </Popup>
    </>
  );
}



