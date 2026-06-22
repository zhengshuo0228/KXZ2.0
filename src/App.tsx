import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd-mobile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PurchaseMenu from "./pages/Purchase/Menu";
import PurchaseSubmit from "./pages/Purchase/Submit";
import PurchaseReview from "./pages/Purchase/Review";
import PurchaseSummary from "./pages/Purchase/Summary";
import PurchaseHistory from "./pages/Purchase/History";
import StatsPage from "./pages/Stats/Index";
import PerformanceDashboard from "./pages/Performance/Dashboard";
import Schedule from "./pages/Schedule/Index";
import Profile from "./pages/Profile/Index";
import AdminAccount from "./pages/Admin/Account";
import AdminPosition from "./pages/Admin/Position";
import AdminRegistration from "./pages/Admin/Registration";
import AdminAuth from "./pages/Admin/Auth";

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<PurchaseMenu />} />
          <Route path="/submit" element={<PurchaseSubmit />} />
          <Route path="/review" element={<PurchaseReview />} />
          <Route path="/summary" element={<PurchaseSummary />} />
          <Route path="/history" element={<PurchaseHistory />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/performance" element={<PerformanceDashboard />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/account" element={<AdminAccount />} />
          <Route path="/admin/position" element={<AdminPosition />} />
          <Route path="/admin/registration" element={<AdminRegistration />} />
          <Route path="/admin/auth" element={<AdminAuth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;

