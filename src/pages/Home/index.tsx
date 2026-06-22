import type React from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Calendar, CheckCircle2, ChevronRight, Clock, Package, ShoppingCart, Trophy, Users } from "lucide-react";
import ProfileAvatar from "../../components/ProfileAvatar";
import NotificationBell from "../../components/NotificationBell";
import StatsCard from "../../components/StatsCard";
import { getGreeting } from "../../types/presets";
import { useAppStore } from "../../models/appStore";

interface HomeCard {
  key: string;
  label: string;
  icon: React.ReactNode;
  perm?: string;
  route: string;
  span?: number;
  badge?: number;
  gradient?: string;
  white?: boolean;
  borderColor?: string;
  iconColor?: string;
  decorative?: boolean;
}

const HOME_CARDS: HomeCard[] = [
  { key: "submit", label: "申购提交", icon: <ShoppingCart size={26} strokeWidth={1.8} />, perm: "purchase_submit", route: "/submit", span: 2, gradient: "linear-gradient(135deg, #059669 0%, #34D399 100%)", decorative: true },
  { key: "history", label: "申购历史", icon: <Clock size={24} strokeWidth={1.8} />, perm: "purchase_history", route: "/history", gradient: "linear-gradient(135deg, #67E8F9 0%, #67D6CA 100%)" },
  { key: "stats", label: "数据统计", icon: <BarChart3 size={24} strokeWidth={1.8} />, perm: "purchase_summary", route: "/stats", gradient: "linear-gradient(135deg, #34D399 0%, #10B981 100%)" },
  { key: "schedule", label: "考勤排休", icon: <Calendar size={24} strokeWidth={1.8} />, perm: "schedule_view", route: "/schedule", gradient: "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)" },
  { key: "performance", label: "绩效看板", icon: <Trophy size={24} strokeWidth={1.8} />, perm: "performance_view", route: "/performance", gradient: "linear-gradient(135deg, #E9D5FF 0%, #D8B4FE 100%)" },
  { key: "review", label: "申购审核", icon: <CheckCircle2 size={24} strokeWidth={1.8} />, perm: "purchase_review", route: "/review", badge: 9, gradient: "linear-gradient(135deg, #FBCFE8 0%, #F9A8D4 100%)" },
  { key: "summary", label: "采购汇总", icon: <BarChart3 size={24} strokeWidth={1.8} />, perm: "purchase_summary", route: "/summary", gradient: "linear-gradient(135deg, #6EE7B7 0%, #34D399 100%)" },
  { key: "ingredient", label: "食材库", icon: <Package size={24} strokeWidth={1.8} />, perm: "ingredient_manage", route: "/menu", white: true, borderColor: "#059669", iconColor: "#059669" },
  { key: "admin", label: "账号管理", icon: <Users size={24} strokeWidth={1.8} />, perm: "account_manage", route: "/admin/account", white: true, borderColor: "#8B5CF6", iconColor: "#8B5CF6" },
];

const bgBase = "#F4FBFB";

const s = {
  page: { minHeight: "100vh", background: bgBase, color: "#102A43" } as React.CSSProperties,
  inner: { maxWidth: 480, margin: "0 auto", minHeight: "100vh", padding: "16px 16px 40px" } as React.CSSProperties,
  topBar: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 } as React.CSSProperties,
  logoBlock: { display: "flex", alignItems: "center", gap: 10 } as React.CSSProperties,
  logoIcon: { width: 38, height: 38, borderRadius: 14, background: "linear-gradient(135deg, #059669, #34D399)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800 } as React.CSSProperties,
  logoText: { display: "flex", flexDirection: "column" } as React.CSSProperties,
  logoTitle: { fontSize: 16, fontWeight: 800, color: "#0F172A", lineHeight: 1.2 } as React.CSSProperties,
  logoUser: { fontSize: 12, color: "#64748B", lineHeight: 1.35 } as React.CSSProperties,
  rightIcons: { display: "flex", alignItems: "center", gap: 8 } as React.CSSProperties,
  avatarWrap: { width: 38, height: 38 } as React.CSSProperties,
  greeting: { marginBottom: 16, paddingLeft: 2 } as React.CSSProperties,
  greetingHi: { fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 4 } as React.CSSProperties,
  greetingSub: { fontSize: 13, color: "#64748B" } as React.CSSProperties,
  grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 } as React.CSSProperties,
  card: { borderRadius: 22, padding: 20, cursor: "pointer", transition: "transform 0.15s ease", boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)", position: "relative" as const, overflow: "hidden", display: "flex", flexDirection: "column" as const, justifyContent: "space-between", minHeight: 98 } as React.CSSProperties,
  cardLabel: { fontSize: 16, fontWeight: 800, lineHeight: 1.3 } as React.CSSProperties,
  cardIconWrap: { width: 42, height: 42, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" } as React.CSSProperties,
  chevron: { position: "absolute" as const, bottom: 14, right: 16, opacity: 0.35 } as React.CSSProperties,
  badge: { position: "absolute" as const, top: 12, right: 12, background: "#DC2626", color: "#fff", fontSize: 11, fontWeight: 700, borderRadius: 8, padding: "2px 8px" } as React.CSSProperties,
  decoCircle: { position: "absolute" as const, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.18)", right: -18, bottom: -22 } as React.CSSProperties,
  decoCircle2: { position: "absolute" as const, width: 50, height: 50, borderRadius: "50%", background: "rgba(255,255,255,0.12)", right: 30, top: -14 } as React.CSSProperties,
  span2: { gridColumn: "1 / -1" } as React.CSSProperties,
  bottomStats: { marginTop: 16 } as React.CSSProperties,
};

export default function HomePage() {
  const navigate = useNavigate();
  const { currentUser, currentPositions, currentStoreId, stores } = useAppStore();
  const greeting = getGreeting();
  const user = currentUser;
  const storeName = stores.find((store: any) => store.id === currentStoreId)?.name || "未选择门店";

  const getTopPositionName = () => {
    if (!currentPositions?.length) return "";
    const kitchen = currentPositions.filter((position: any) => position.department === "kitchen");
    const dining = currentPositions.filter((position: any) => position.department === "dining");
    if (kitchen.length > 0) return kitchen.reduce((a: any, b: any) => (a.rank <= b.rank ? a : b)).name;
    if (dining.length > 0) return dining.reduce((a: any, b: any) => (a.rank <= b.rank ? a : b)).name;
    return currentPositions[0].name;
  };

  const positionName = getTopPositionName();

  return (
    <div style={s.page}>
      <div style={s.inner}>
        <div style={s.topBar}>
          <div style={s.logoBlock}>
            <div style={s.logoIcon}>开</div>
            <div style={s.logoText}>
              <span style={s.logoTitle}>{storeName}</span>
              <span style={s.logoUser}>{user?.realName || "未登录"} · {positionName || "未设置岗位"}</span>
            </div>
          </div>
          <div style={s.rightIcons}>
            <NotificationBell />
            <div style={s.avatarWrap}>
              <ProfileAvatar />
            </div>
          </div>
        </div>

        <div style={s.greeting}>
          <div style={s.greetingHi}>{greeting}，{user?.realName || "伙伴"} ☀️</div>
          <div style={s.greetingSub}>欢迎使用开小灶 PMS，今天也稳稳出餐。</div>
        </div>

        <div style={s.grid}>
          {HOME_CARDS.map((card) => (
            <div
              key={card.key}
              onClick={() => navigate(card.route)}
              style={{
                ...s.card,
                ...(card.span === 2 ? s.span2 : {}),
                background: card.white ? "#fff" : card.gradient,
                ...(card.white ? { border: `1.5px solid ${card.borderColor}22`, color: "#0F172A" } : { color: "#fff" }),
              }}
            >
              {card.badge ? <span style={s.badge}>{card.badge}</span> : null}
              <div style={{ ...s.cardIconWrap, background: card.white ? `${card.iconColor}14` : "rgba(255,255,255,0.18)" }}>
                <span style={{ color: card.white ? card.iconColor : "#fff" }}>{card.icon}</span>
              </div>
              <span style={s.cardLabel}>{card.label}</span>
              {card.decorative ? <><div style={s.decoCircle} /><div style={s.decoCircle2} /></> : null}
              <ChevronRight size={20} style={{ ...s.chevron, color: card.white ? "#334155" : "#fff" }} />
            </div>
          ))}
        </div>

        <div style={s.bottomStats}>
          <StatsCard />
        </div>
      </div>
    </div>
  );
}
