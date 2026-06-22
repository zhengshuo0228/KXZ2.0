import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../models/appStore";

export default function ProfileAvatar() {
  const navigate = useNavigate();
  const { currentUser } = useAppStore();

  return (
    <div
      onClick={() => navigate("/profile")}
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #059669, #34D399)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        fontWeight: 700,
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {currentUser?.realName?.charAt(0) || "用"}
    </div>
  );
}
