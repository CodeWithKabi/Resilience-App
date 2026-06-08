import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

function Toggle({ value, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${value ? 'bg-brand-500' : 'bg-white/10'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${value ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  );
}

export default function Settings() {
  const { toggle, isDark } = useTheme();
  const [settings, setSettings] = useState({
    emailAlerts:    true,
    pushNotifs:     false,
    weeklyDigest:   true,
    aiInsights:     true,
    compactView:    false,
    autoRefresh:    true,
    twoFactor:      false,
    apiAccess:      true,
    dataRetention:  '12',
    language:       'en',
    timezone:       'Asia/Kolkata',
  });

  const set = key => val => setSettings(p => ({ ...p, [key]: val }));

  const sections = [
    {
      title: 'Appearance',
      items: [
        <Toggle key="dark" value={isDark} onChange={toggle} label="Dark Mode" description="Toggle between dark and light themes" />,
        <Toggle key="compact" value={settings.compactView} onChange={set('compactView')} label="Compact View" description="Reduce padding and spacing in the dashboard" />,
        <Toggle key="refresh" value={settings.autoRefresh} onChange={set('autoRefresh')} label="Auto Refresh" description="Refresh dashboard data every 5 minutes" />,
      ]
    },
    {
      title: 'Notifications',
      items: [
        <Toggle key="email" value={settings.emailAlerts} onChange={set('emailAlerts')} label="Email Alerts" description="Receive critical alerts via email" />,
        <Toggle key="push" value={settings.pushNotifs} onChange={set('pushNotifs')} label="Push Notifications" description="Browser push notifications" />,
        <Toggle key="digest" value={settings.weeklyDigest} onChange={set('weeklyDigest')} label="Weekly Digest" description="Summary report every Monday morning" />,
        <Toggle key="ai" value={settings.aiInsights} onChange={set('aiInsights')} label="AI Insights" description="Get notified when AI detects new predictions" />,
      ]
    },
    {
      title: 'Security',
      items: [
        <Toggle key="2fa" value={settings.twoFactor} onChange={set('twoFactor')} label="Two-Factor Auth" description="Add an extra layer of security" />,
        <Toggle key="api" value={settings.apiAccess} onChange={set('apiAccess')} label="API Access" description="Allow external API integrations" />,
      ]
    },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      {sections.map((section, i) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass p-6 space-y-5"
        >
          <h3 className="section-title border-b border-white/5 pb-3">{section.title}</h3>
          <div className="space-y-5">
            {section.items}
          </div>
        </motion.div>
      ))}

      {/* Data settings */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass p-6 space-y-5"
      >
        <h3 className="section-title border-b border-white/5 pb-3">Data & Regional</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { key: 'dataRetention', label: 'Data Retention (months)', type: 'select', opts: ['3','6','12','24','36'] },
            { key: 'language',      label: 'Language',                type: 'select', opts: ['en','ta','hi','fr','de'] },
            { key: 'timezone',      label: 'Timezone',                type: 'select', opts: ['Asia/Kolkata','UTC','America/New_York','Europe/London'] },
          ].map(f => (
            <div key={f.key} className="space-y-1.5">
              <label className="label-sm">{f.label}</label>
              <select
                value={settings[f.key]}
                onChange={e => setSettings(p => ({ ...p, [f.key]: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white
                           focus:outline-none focus:border-brand-500/60 transition-all appearance-none"
              >
                {f.opts.map(o => <option key={o} value={o} className="bg-gray-900">{o}</option>)}
              </select>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-end gap-3"
      >
        <button className="btn-ghost">Reset Defaults</button>
        <button className="btn-primary">Save Settings</button>
      </motion.div>
    </div>
  );
}
