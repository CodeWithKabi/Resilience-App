import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiActivity,
         FiAlertTriangle, FiCpu, FiUsers, FiBell } from 'react-icons/fi';

const icons = {
  revenue: FiDollarSign,
  health:  FiActivity,
  risk:    FiAlertTriangle,
  ai:      FiCpu,
  clients: FiUsers,
  alerts:  FiBell,
};

const colorMap = {
  brand:  { bg: 'bg-brand-500/10',  icon: 'text-brand-400',  glow: 'shadow-brand-500/10' },
  green:  { bg: 'bg-emerald-500/10',icon: 'text-emerald-400',glow: 'shadow-emerald-500/10'},
  red:    { bg: 'bg-red-500/10',    icon: 'text-red-400',    glow: 'shadow-red-500/10'   },
  blue:   { bg: 'bg-blue-500/10',   icon: 'text-blue-400',   glow: 'shadow-blue-500/10'  },
  yellow: { bg: 'bg-amber-500/10',  icon: 'text-amber-400',  glow: 'shadow-amber-500/10' },
};

export default function StatCard({ stat, index = 0 }) {
  const Icon = icons[stat.icon] || FiActivity;
  const c = colorMap[stat.color] || colorMap.brand;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="glass p-5 flex flex-col gap-4 cursor-default"
    >
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${c.icon}`} />
        </div>
        <span className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
          {stat.up ? <FiTrendingUp className="w-3.5 h-3.5" /> : <FiTrendingDown className="w-3.5 h-3.5" />}
          {stat.change}
        </span>
      </div>
      <div>
        <p className="label-sm mb-1">{stat.label}</p>
        <p className="stat-value">{stat.value}</p>
      </div>
    </motion.div>
  );
}
