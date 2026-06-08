import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import DataTable from '../components/DataTable';
import { kpiStats, revenueData, recentActivity, revenueSegments } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass px-3 py-2 text-xs">
      <p className="text-gray-400 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }} className="font-mono">
          {p.name}: ${p.value}K
        </p>
      ))}
    </div>
  );
};

const cols = [
  { key: 'event',  label: 'Event' },
  { key: 'user',   label: 'User' },
  { key: 'module', label: 'Module' },
  { key: 'time',   label: 'Time' },
  { key: 'status', label: 'Status' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiStats.map((stat, i) => (
          <StatCard key={stat.id} stat={stat} index={i} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <ChartCard
          title="Revenue Overview"
          subtitle="Monthly revenue vs forecast"
          className="xl:col-span-2"
          action={<span className="badge-brand">Live</span>}
        >
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#1e9d87" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1e9d87" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#1e9d87" fill="url(#rev)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="forecast" name="Forecast" stroke="#3b82f6" fill="url(#fore)" strokeWidth={2} dot={false} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue Mix" subtitle="By customer segment">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={revenueSegments}
                cx="50%" cy="50%"
                innerRadius={60} outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {revenueSegments.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={v => <span className="text-xs text-gray-400">{v}</span>}
              />
              <Tooltip formatter={(v) => [`${v}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Activity table */}
      <ChartCard title="Recent Activity" subtitle="Latest platform events">
        <DataTable columns={cols} rows={recentActivity} />
      </ChartCard>
    </div>
  );
}
