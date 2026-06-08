import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import ChartCard from '../components/ChartCard';
import { forecastData } from '../data/mockData';

const scenarios = ['Base', 'Optimistic', 'Pessimistic'];

export default function Forecasting() {
  const [scenario, setScenario] = useState('Base');
  const [horizon, setHorizon] = useState('6M');

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="glass p-1 flex gap-1 rounded-xl">
          {scenarios.map(s => (
            <button
              key={s}
              onClick={() => setScenario(s)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                scenario === s ? 'bg-brand-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="glass p-1 flex gap-1 rounded-xl">
          {['3M', '6M', '12M'].map(h => (
            <button
              key={h}
              onClick={() => setHorizon(h)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                horizon === h ? 'bg-brand-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Main forecast chart */}
      <ChartCard title="Revenue Forecast" subtitle={`${scenario} scenario • ${horizon} horizon`}>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={forecastData}>
            <defs>
              <linearGradient id="optGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="pesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="period" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}K`} />
            <Tooltip
              contentStyle={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 12, fontSize: 12 }}
              labelStyle={{ color: '#9ca3af' }}
            />
            <Legend formatter={v => <span className="text-xs text-gray-400 capitalize">{v}</span>} />
            <Area type="monotone" dataKey="optimistic" name="Optimistic" stroke="#10b981" fill="url(#optGrad)" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
            <Area type="monotone" dataKey="pessimistic" name="Pessimistic" stroke="#ef4444" fill="url(#pesGrad)" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
            <Line type="monotone" dataKey="base" name="Base" stroke="#1e9d87" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="actual" name="Actual" stroke="#f59e0b" strokeWidth={2.5} dot={{ fill: '#f59e0b', r: 4 }} connectNulls={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Scenario comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Pessimistic', value: '$6.2M', growth: '28%', probability: '15%', color: 'red',   grad: 'from-red-500/10 to-transparent' },
          { name: 'Base',        value: '$7.0M', growth: '45%', probability: '65%', color: 'brand', grad: 'from-brand-500/15 to-transparent' },
          { name: 'Optimistic',  value: '$7.8M', growth: '62%', probability: '20%', color: 'green', grad: 'from-emerald-500/10 to-transparent' },
        ].map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass bg-gradient-to-b ${s.grad} p-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <p className={`label-sm`}>{s.name} Case</p>
              <span className={`badge-${s.color === 'brand' ? 'brand' : s.color === 'red' ? 'red' : 'green'}`}>{s.probability} prob.</span>
            </div>
            <p className={`font-display text-3xl font-bold text-white mb-1`}>{s.value}</p>
            <p className={`text-sm ${s.color === 'red' ? 'text-red-400' : 'text-emerald-400'}`}>+{s.growth} YoY</p>
            <p className="text-xs text-gray-600 mt-3">H2 2024 Revenue</p>
          </motion.div>
        ))}
      </div>

      {/* AI insights */}
      <ChartCard title="Forecast Drivers" subtitle="AI-identified key variables">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { driver: 'New Product Launch', impact: '+12%', direction: 'up' },
            { driver: 'Market Competition', impact: '-4%',  direction: 'down' },
            { driver: 'Customer Expansion', impact: '+8%',  direction: 'up' },
            { driver: 'Macro Headwinds',    impact: '-3%',  direction: 'down' },
            { driver: 'Partnership Revenue',impact: '+6%',  direction: 'up' },
            { driver: 'Cost Optimization',  impact: '+5%',  direction: 'up' },
          ].map((d, i) => (
            <div key={d.driver} className="flex items-center justify-between bg-white/3 rounded-xl px-4 py-3">
              <span className="text-sm text-gray-300">{d.driver}</span>
              <span className={`font-mono font-bold text-sm ${d.direction === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                {d.impact}
              </span>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
