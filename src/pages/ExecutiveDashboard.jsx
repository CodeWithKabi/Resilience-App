import { motion } from 'framer-motion';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts';
import ChartCard from '../components/ChartCard';
import { revenueData, healthRadar, kpiStats } from '../data/mockData';

const executiveSummary = [
  { label: 'YTD Revenue',     value: '$28.4M',  vs: '+18% vs LY',  good: true  },
  { label: 'EBITDA Margin',   value: '34.2%',   vs: '+2.1pts',     good: true  },
  { label: 'Burn Rate',       value: '$1.2M/mo',vs: '-8% MoM',     good: true  },
  { label: 'Runway',          value: '24 months',vs: '+4mo',       good: true  },
  { label: 'NPS Score',       value: '72',      vs: '+4pts',       good: true  },
  { label: 'Churn Rate',      value: '2.4%',    vs: '+0.3%',      good: false  },
];

export default function ExecutiveDashboard() {
  return (
    <div className="space-y-6">
      {/* Summary strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {executiveSummary.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass p-4"
          >
            <p className="label-sm mb-2">{item.label}</p>
            <p className="font-display text-xl font-bold text-white">{item.value}</p>
            <p className={`text-xs mt-1 ${item.good ? 'text-emerald-400' : 'text-red-400'}`}>{item.vs}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChartCard title="Revenue vs Expenses" subtitle="Monthly performance breakdown">
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}K`} />
              <Tooltip
                contentStyle={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Bar dataKey="expenses" fill="#ef4444" opacity={0.6} radius={[4,4,0,0]} name="Expenses" />
              <Bar dataKey="revenue" fill="#1e9d87" opacity={0.8} radius={[4,4,0,0]} name="Revenue" />
              <Line type="monotone" dataKey="forecast" stroke="#3b82f6" strokeWidth={2} dot={false} name="Forecast" strokeDasharray="5 5" />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Organizational Health Radar" subtitle="6-dimension performance map">
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={healthRadar} cx="50%" cy="50%" outerRadius={90}>
              <PolarGrid stroke="#1f2937" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Radar name="Score" dataKey="A" stroke="#1e9d87" fill="#1e9d87" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Strategic highlights */}
      <ChartCard title="Strategic Priorities" subtitle="Q3 2024 Board Agenda">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'AI-First Product Launch',    status: 'On Track',  progress: 72, color: 'brand' },
            { title: 'APAC Market Expansion',      status: 'At Risk',   progress: 38, color: 'red'   },
            { title: 'Cloud Migration Phase 2',    status: 'On Track',  progress: 85, color: 'brand' },
            { title: 'ESG Compliance Program',     status: 'Completed', progress: 100,color: 'green' },
            { title: 'Talent Density Initiative',  status: 'At Risk',   progress: 44, color: 'yellow'},
            { title: 'Partner Ecosystem Growth',   status: 'On Track',  progress: 61, color: 'brand' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/3 rounded-xl p-4 border border-white/5"
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm font-medium text-white">{item.title}</p>
                <span className={`badge-${item.color === 'brand' ? 'brand' : item.color === 'red' ? 'red' : item.color === 'green' ? 'green' : 'yellow'}`}>
                  {item.status}
                </span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.6, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    item.color === 'brand' ? 'bg-brand-500' :
                    item.color === 'red' ? 'bg-red-500' :
                    item.color === 'green' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
              </div>
              <p className="text-right text-xs text-gray-500 mt-1">{item.progress}%</p>
            </motion.div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
