import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiBriefcase, FiMapPin, FiEdit2, FiSave } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name:     user?.name || 'Kabilan Kumar',
    email:    user?.email || 'kabilan@resilienceai.io',
    role:     'Admin',
    company:  'ResilienceAI Corp',
    location: 'Salem, Tamil Nadu, India',
    bio:      'Full-stack developer and MCA graduate focused on AI-driven business intelligence solutions. Building resilient systems at the intersection of ML and enterprise software.',
  });

  const stats = [
    { label: 'Reports Created',   value: '47' },
    { label: 'Analyses Run',      value: '128' },
    { label: 'Decisions Made',    value: '23' },
    { label: 'Days Active',       value: '184' },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      {/* Profile hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8"
      >
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-400 to-emerald-600 flex items-center justify-center text-3xl font-bold text-white shrink-0">
            {form.name[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-bold text-white">{form.name}</h2>
                <p className="text-gray-500 text-sm mt-0.5">{form.role} · {form.company}</p>
              </div>
              <button
                onClick={() => setEditing(e => !e)}
                className={editing ? 'btn-primary flex items-center gap-1.5' : 'btn-ghost flex items-center gap-1.5'}
              >
                {editing ? <><FiSave className="w-3.5 h-3.5" /> Save</> : <><FiEdit2 className="w-3.5 h-3.5" /> Edit</>}
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-3">{form.bio}</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/5">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Edit form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass p-6 space-y-5"
      >
        <h3 className="section-title">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { key: 'name',     label: 'Full Name',  icon: FiUser     },
            { key: 'email',    label: 'Email',      icon: FiMail     },
            { key: 'role',     label: 'Role',       icon: FiBriefcase},
            { key: 'company',  label: 'Company',    icon: FiBriefcase},
            { key: 'location', label: 'Location',   icon: FiMapPin   },
          ].map(f => (
            <div key={f.key} className="space-y-1.5">
              <label className="label-sm">{f.label}</label>
              <div className="relative">
                <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type="text"
                  value={form[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  disabled={!editing}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white
                             placeholder:text-gray-600 focus:outline-none focus:border-brand-500/60 transition-all
                             disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          ))}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="label-sm">Bio</label>
            <textarea
              value={form.bio}
              onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
              disabled={!editing}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white
                         placeholder:text-gray-600 focus:outline-none focus:border-brand-500/60 transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed resize-none"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
