import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiBell, FiSun, FiMoon, FiLogOut, FiMenu } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { notifications } from '../data/mockData';

const routeTitles = {
  '/dashboard': 'Dashboard',
  '/executive': 'Executive Dashboard',
  '/health': 'Business Health',
  '/risk': 'Risk Management',
  '/prediction': 'AI Prediction',
  '/forecasting': 'Forecasting',
  '/decisions': 'Decision Support',
  '/reports': 'Reports',
  '/notifications': 'Notifications',
  '/profile': 'Profile',
  '/settings': 'Settings',
  '/admin': 'Admin Panel',
};

export default function Navbar({ onMenuToggle }) {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();
  const { toggle, isDark } = useTheme();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const unread = notifications.filter(n => !n.read).length;

  return (
    <header className="h-14 flex items-center gap-4 px-6 border-b border-white/5 bg-surface-dark/80 backdrop-blur-xl shrink-0">
      {/* Mobile menu */}
      <button onClick={onMenuToggle} className="lg:hidden p-1.5 rounded-lg hover:bg-white/5 text-gray-400">
        <FiMenu className="w-5 h-5" />
      </button>

      {/* Page title */}
      <h1 className="font-display font-bold text-white text-base hidden sm:block">
        {routeTitles[pathname] || 'ResilienceAI'}
      </h1>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <div className="relative hidden md:flex items-center">
        <FiSearch className="absolute left-3 w-4 h-4 text-gray-500 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search modules..."
          className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-1.5 text-sm text-gray-300
                     placeholder:text-gray-600 focus:outline-none focus:border-brand-500/50 focus:bg-white/8
                     transition-all w-48 focus:w-64"
        />
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggle}
        className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
        title="Toggle theme"
      >
        {isDark ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
      </button>

      {/* Notifications */}
      <button
        onClick={() => navigate('/notifications')}
        className="relative p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
      >
        <FiBell className="w-4 h-4" />
        {unread > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold"
          >
            {unread}
          </motion.span>
        )}
      </button>

      {/* Logout */}
      <button
        onClick={() => { logout(); navigate('/login'); }}
        className="p-2 rounded-xl hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
        title="Logout"
      >
        <FiLogOut className="w-4 h-4" />
      </button>
    </header>
  );
}
