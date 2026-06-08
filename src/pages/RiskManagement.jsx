import { motion } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ChartCard from '../components/ChartCard';
import { riskData, riskMatrix } from '../data/mockData';

const severityColor = {
  Critical: 'badge-red',
  High:     'badge-yellow',
  Medium:   'badge-blue',
  Low:      'badge-green',
};

const severityDot = {
  Critical: '#ef4444',
  High:     '#f59e0b',
  Medium:   '#3b82f6',
  Low:      '#10b981',
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="glass px-3 py-2 text-xs">
      <p className="text-white font-medium mb-1">{d.name}</p>
      <p className="text-gray-400">Probability: {d.probability}%</p>
      <p className="text-gray-400">Impact: {d.impact}%</p>
    </div>
  );
};

export default function RiskManagement() {
  const criticalCount = riskData.filter(r => r.severity === 'Critical').length;
  const highCount = riskData.filter(r => r.severity === 'High').length;

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Risks',   value: riskData.length, color: 'text-white'        },
          { label: 'Critical',      value: criticalCount,   color: 'text-red-400'      },
          { label: 'High',          value: highCount,       color: 'text-amber-400'    },
          { label: 'Mitigated',     value: 8,               color: 'text-emerald-400'  },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass p-5"
          >
            <p className="label-sm mb-2">{s.label}</p>
            <p className={`font-display text-3xl font-bold ${s.color}`}>{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Risk scores */}
        <ChartCard title="Risk Category Scores" subtitle="Current risk exposure by domain">
          <div className="space-y-4">
            {riskData.map((r, i) => (
              <motion.div
                key={r.category}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{r.category}</span>
                    <span className={severityColor[r.severity]}>{r.severity}</span>
                  </div>
                  <span className={`font-mono text-sm font-bold ${
                    r.score >= 80 ? 'text-red-400' : r.score >= 60 ? 'text-amber-400' : 'text-emerald-400'
                  }`}>{r.score}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${r.score}%` }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.7, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      r.score >= 80 ? 'bg-red-500' : r.score >= 60 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>

        {/* Risk matrix scatter */}
        <ChartCard title="Risk Matrix" subtitle="Probability vs Impact">
          {/* Quadrant labels */}
          <div className="relative">
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis
                  type="number" dataKey="probability" domain={[0,100]}
                  tick={{ fill: '#6b7280', fontSize: 11 }} name="Probability"
                  label={{ value: 'Probability %', position: 'insideBottom', offset: -5, fill: '#6b7280', fontSize: 11 }}
                />
                <YAxis
                  type="number" dataKey="impact" domain={[0,100]}
                  tick={{ fill: '#6b7280', fontSize: 11 }} name="Impact"
                  label={{ value: 'Impact %', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter data={riskMatrix} shape="circle">
                  {riskMatrix.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.probability > 60 && entry.impact > 70 ? '#ef4444' :
                            entry.probability > 40 || entry.impact > 60 ? '#f59e0b' : '#10b981'}
                      opacity={0.85}
                      r={10}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Risk register table */}
      <ChartCard title="Risk Register" subtitle="Active risk items requiring attention">
        <div className="space-y-2">
          {riskMatrix.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between bg-white/3 rounded-xl px-4 py-3 border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: r.probability > 60 && r.impact > 70 ? '#ef4444' : r.probability > 40 || r.impact > 60 ? '#f59e0b' : '#10b981' }}
                />
                <span className="text-sm font-medium text-white">{r.name}</span>
                <span className="badge-blue text-xs">{r.category}</span>
              </div>
              <div className="flex items-center gap-6 text-xs text-gray-500">
                <span>P: <span className="text-white font-mono">{r.probability}%</span></span>
                <span>I: <span className="text-white font-mono">{r.impact}%</span></span>
                <button className="btn-ghost py-1 px-3 text-xs">Mitigate</button>
              </div>
            </motion.div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
