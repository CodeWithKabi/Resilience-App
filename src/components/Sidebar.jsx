import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid, FiBarChart2, FiActivity, FiAlertTriangle, FiCpu,
  FiTrendingUp, FiCheckSquare, FiFileText, FiBell, FiUser,
  FiSettings, FiShield, FiChevronLeft, FiZap
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Dashboard',      path: '/dashboard',           icon: FiGrid        },
  { label: 'Executive',      path: '/executive',           icon: FiBarChart2   },
  { label: 'Business Health',path: '/health',              icon: FiActivity    },
  { label: 'Risk Mgmt',      path: '/risk',                icon: FiAlertTriangle},
  { label: 'AI Prediction',  path: '/prediction',          icon: FiCpu         },
  { label: 'Forecasting',    path: '/forecasting',         icon: FiTrendingUp  },
  { label: 'Decisions',      path: '/decisions',           icon: FiCheckSquare },
  { label: 'Reports',        path: '/reports',             icon: FiFileText    },
];

const bottomItems = [
  { label: 'Notifications',  path: '/notifications',       icon: FiBell        },
  { label: 'Profile',        path: '/profile',             icon: FiUser        },
  { label: 'Settings',       path: '/settings',            icon: FiSettings    },
  { label: 'Admin',          path: '/admin',               icon: FiShield      },
];

export default function Sidebar({ collapsed, onCollapse }) {
  const { user } = useAuth();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen z-40 flex flex-col
                 bg-surface-dark border-r border-white/5 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5 shrink-0">
        <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center shrink-0">
          <FiZap className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="font-display font-bold text-white text-sm whitespace-nowrap overflow-hidden"
            >
              ResilienceAI
            </motion.span>
          )}
        </AnimatePresence>
        <motion.button
          onClick={onCollapse}
          className="ml-auto p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors shrink-0"
          animate={{ rotate: collapsed ? 180 : 0 }}
        >
          <FiChevronLeft className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 overflow-y-auto space-y-0.5">
        {!collapsed && <p className="label-sm px-3 py-2 mb-1">Core</p>}
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`
            }
            title={collapsed ? item.label : ''}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="border-t border-white/5 py-3 px-2 space-y-0.5 shrink-0">
        {!collapsed && <p className="label-sm px-3 py-2">Account</p>}
        {bottomItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`
            }
            title={collapsed ? item.label : ''}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}

        {/* Avatar */}
        <div className={`flex items-center gap-3 px-3 py-2.5 mt-2 border-t border-white/5 pt-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-emerald-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
            {user?.name?.[0] || 'K'}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden">
                <p className="text-xs font-medium text-white truncate max-w-[120px]">{user?.name}</p>
                <p className="text-[11px] text-gray-500 truncate max-w-[120px]">{user?.role}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
