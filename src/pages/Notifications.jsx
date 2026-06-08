import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiAlertTriangle, FiInfo, FiCheckCircle, FiCheck } from 'react-icons/fi';
import { notifications as notifData } from '../data/mockData';

const typeConfig = {
  critical: { icon: FiAlertCircle,   color: 'text-red-400',     bg: 'bg-red-500/10 border-red-500/20'       },
  warning:  { icon: FiAlertTriangle, color: 'text-amber-400',   bg: 'bg-amber-500/10 border-amber-500/20'   },
  info:     { icon: FiInfo,          color: 'text-blue-400',    bg: 'bg-blue-500/10 border-blue-500/20'     },
  success:  { icon: FiCheckCircle,   color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20'},
};

export default function Notifications() {
  const [items, setItems] = useState(notifData);
  const [filter, setFilter] = useState('all');

  const markRead = id => setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAll  = () => setItems(prev => prev.map(n => ({ ...n, read: true })));

  const filtered = filter === 'all' ? items : filter === 'unread' ? items.filter(n => !n.read) : items.filter(n => n.type === filter);
  const unread = items.filter(n => !n.read).length;

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {['all', 'unread', 'critical', 'warning', 'info', 'success'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                filter === f ? 'bg-brand-500 text-white' : 'glass text-gray-400 hover:text-white'
              }`}
            >
              {f === 'unread' && unread > 0 ? `Unread (${unread})` : f}
            </button>
          ))}
        </div>
        <button onClick={markAll} className="btn-ghost text-xs flex items-center gap-1.5">
          <FiCheck className="w-3.5 h-3.5" /> Mark all read
        </button>
      </div>

      {/* Notification list */}
      <div className="space-y-2">
        {filtered.map((n, i) => {
          const cfg = typeConfig[n.type];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => markRead(n.id)}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer
                          ${n.read ? 'glass border-white/5 opacity-60' : `${cfg.bg} border`}
                          hover:opacity-100`}
            >
              <div className={`mt-0.5 ${cfg.color} shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-medium text-white">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />}
                </div>
                <p className="text-sm text-gray-400">{n.body}</p>
              </div>
              <span className="text-xs text-gray-600 shrink-0">{n.time}</span>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div className="glass p-12 text-center">
            <FiCheckCircle className="w-12 h-12 text-emerald-500/40 mx-auto mb-3" />
            <p className="text-gray-500">No notifications to show</p>
          </div>
        )}
      </div>
    </div>
  );
}
