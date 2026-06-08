import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiUserPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';
import ChartCard from '../components/ChartCard';
import { users } from '../data/mockData';

const roleColor = {
  Admin:   'badge-red',
  Manager: 'badge-brand',
  Analyst: 'badge-blue',
  Viewer:  'badge-yellow',
};

export default function Admin() {
  const [userList, setUserList] = useState(users);

  const systemStats = [
    { label: 'Total Users',     value: userList.length },
    { label: 'Active Sessions', value: 4 },
    { label: 'API Calls Today', value: '2,847' },
    { label: 'Storage Used',    value: '42 GB' },
    { label: 'Uptime',          value: '99.97%' },
    { label: 'Model Requests',  value: '1,203' },
  ];

  return (
    <div className="space-y-6">
      {/* System stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {systemStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass p-4"
          >
            <p className="label-sm mb-2">{s.label}</p>
            <p className="font-display text-xl font-bold text-white">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* User management */}
      <ChartCard
        title="User Management"
        subtitle="Manage platform access and roles"
        action={
          <button className="btn-primary flex items-center gap-1.5 text-xs">
            <FiUserPlus className="w-3.5 h-3.5" /> Add User
          </button>
        }
      >
        <div className="space-y-2">
          {userList.map((u, i) => (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-4 bg-white/3 rounded-xl px-4 py-3 border border-white/5 hover:border-white/10 transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-blue-500 flex items-center justify-center text-sm font-bold text-white shrink-0">
                {u.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium text-white">{u.name}</p>
                  <span className={roleColor[u.role]}>{u.role}</span>
                  <span className={u.status === 'Active' ? 'badge-green' : 'badge-yellow'}>{u.status}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{u.email} · Last login: {u.lastLogin}</p>
              </div>
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors">
                  <FiEdit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setUserList(l => l.filter(x => x.id !== u.id))}
                  className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </ChartCard>

      {/* System health */}
      <ChartCard title="System Health" subtitle="Infrastructure monitoring">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { service: 'API Gateway',       status: 'Healthy',  latency: '42ms',   uptime: '99.99%' },
            { service: 'ML Prediction Engine',status: 'Healthy', latency: '128ms',  uptime: '99.95%' },
            { service: 'Database Cluster',  status: 'Healthy',  latency: '8ms',    uptime: '100%'   },
            { service: 'Data Pipeline',     status: 'Warning',  latency: '340ms',  uptime: '98.2%'  },
            { service: 'Auth Service',      status: 'Healthy',  latency: '22ms',   uptime: '100%'   },
            { service: 'Report Generator',  status: 'Healthy',  latency: '550ms',  uptime: '99.8%'  },
          ].map((svc, i) => (
            <motion.div
              key={svc.service}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between bg-white/3 rounded-xl px-4 py-3 border border-white/5"
            >
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${svc.status === 'Healthy' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                <span className="text-sm text-white">{svc.service}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="font-mono">{svc.latency}</span>
                <span className={svc.uptime === '100%' ? 'text-emerald-400' : svc.uptime.startsWith('99.9') ? 'text-brand-400' : 'text-amber-400'}>
                  {svc.uptime}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
