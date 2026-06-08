import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sidebarW = collapsed ? 72 : 240;

  return (
    <div className="flex h-screen overflow-hidden bg-surface-dark">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} onCollapse={() => setCollapsed(c => !c)} />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        className="flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-250"
        style={{ marginLeft: sidebarW }}
      >
        <Navbar onMenuToggle={() => setMobileOpen(o => !o)} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
