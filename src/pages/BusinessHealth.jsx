import { motion } from 'framer-motion';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import ChartCard from '../components/ChartCard';
import { healthMetrics, healthRadar } from '../data/mockData';

const scoreColor = s => s >= 85 ? 'text-emerald-400' : s >= 70 ? 'text-brand-400' : s >= 55 ? 'text-amber-400' : 'text-red-400';
const barColor  = s => s >= 85 ? 'bg-emerald-500' : s >= 70 ? 'bg-brand-500' : s >= 55 ? 'bg-amber-500' : 'bg-red-500';

export default function BusinessHealth() {
  const overall = Math.round(healthMetrics.reduce((a,m) => a + m.score * m.weight / 100, 0));

  return (
    <div className="space-y-6">
      {/* Overall score hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 flex flex-col sm:flex-row items-center gap-8"
      >
        <div className="relative flex items-center justify-center">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#1f2937" strokeWidth="10" />
            <motion.circle
              cx="60" cy="60" r="50" fill="none"
              stroke="#1e9d87" strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - overall / 100) }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            />
          </svg>
          <div className="absolute text-center">
            <p className="font-display text-3xl font-bold text-white">{overall}</p>
            <p className="text-xs text-gray-500">/ 100</p>
          </div>
        </div>
        <div>
          <p className="label-sm mb-2">Overall Business Health Score</p>
          <p className="font-display text-4xl font-bold text-gradient-brand mb-2">{overall} / 100</p>
          <p className="text-gray-400 text-sm max-w-md">
            Your business health is <strong className="text-emerald-400">Good</strong>. Strong compliance and customer satisfaction offset moderate market share concerns.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Metrics breakdown */}
        <ChartCard title="Health Dimensions" subtitle="Weighted scorecard">
          <div className="space-y-4">
            {healthMetrics.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{m.name}</span>
                    <span className={`badge-${m.status === 'Excellent' ? 'green' : m.status === 'Good' ? 'brand' : m.status === 'Fair' ? 'yellow' : 'red'}`}>
                      {m.status}
                    </span>
                  </div>
                  <span className={`font-mono text-sm font-bold ${scoreColor(m.score)}`}>{m.score}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.score}%` }}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.7, ease: 'easeOut' }}
                    className={`h-full rounded-full ${barColor(m.score)}`}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">Weight: {m.weight}%</p>
              </motion.div>
            ))}
          </div>
        </ChartCard>

        {/* Radar */}
        <ChartCard title="Health Radar" subtitle="Multi-dimensional view">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={healthRadar} cx="50%" cy="50%" outerRadius={100}>
              <PolarGrid stroke="#1f2937" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Radar dataKey="A" stroke="#1e9d87" fill="#1e9d87" fillOpacity={0.3} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recommendations */}
      <ChartCard title="AI Recommendations" subtitle="Actions to improve health score">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { area: 'Market Share', action: 'Launch targeted acquisition campaign in Tier-2 cities', impact: '+6pts', effort: 'High' },
            { area: 'Employee NPS', action: 'Implement flexible work policy and career laddering', impact: '+4pts', effort: 'Medium' },
            { area: 'Innovation', action: 'Establish dedicated R&D sprint budget ($200K Q3)', impact: '+3pts', effort: 'Low' },
            { area: 'Cash Flow', action: 'Accelerate receivables collection cycle by 7 days', impact: '+2pts', effort: 'Low' },
          ].map((rec, i) => (
            <motion.div
              key={rec.area}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white/3 border border-white/5 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="badge-blue">{rec.area}</span>
                <span className="text-xs text-emerald-400 font-mono font-bold">{rec.impact}</span>
              </div>
              <p className="text-sm text-gray-300 mb-3">{rec.action}</p>
              <p className="text-xs text-gray-600">Effort: <span className="text-gray-400">{rec.effort}</span></p>
            </motion.div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
