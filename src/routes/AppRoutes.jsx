import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ExecutiveDashboard from '../pages/ExecutiveDashboard';
import BusinessHealth from '../pages/BusinessHealth';
import RiskManagement from '../pages/RiskManagement';
import Prediction from '../pages/Prediction';
import Forecasting from '../pages/Forecasting';
import DecisionSupport from '../pages/DecisionSupport';
import Reports from '../pages/Reports';
import Notifications from '../pages/Notifications';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Admin from '../pages/Admin';

function Protected({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <Protected>
            <DashboardLayout />
          </Protected>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard"    element={<Dashboard />} />
        <Route path="executive"    element={<ExecutiveDashboard />} />
        <Route path="health"       element={<BusinessHealth />} />
        <Route path="risk"         element={<RiskManagement />} />
        <Route path="prediction"   element={<Prediction />} />
        <Route path="forecasting"  element={<Forecasting />} />
        <Route path="decisions"    element={<DecisionSupport />} />
        <Route path="reports"      element={<Reports />} />
        <Route path="notifications"element={<Notifications />} />
        <Route path="profile"      element={<Profile />} />
        <Route path="settings"     element={<Settings />} />
        <Route path="admin"        element={<Admin />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
