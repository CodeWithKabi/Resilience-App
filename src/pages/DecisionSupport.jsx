import { motion } from 'framer-motion';
import { FiCheckSquare, FiArrowUp, FiInfo } from 'react-icons/fi';
import ChartCard from '../components/ChartCard';
import { decisions } from '../data/mockData';

const scoreColor = s => s >= 80 ? 'text-emerald-400' : s >= 65 ? 'text-brand-400' : 'text-amber-400';
const riskColor  = r => r === 'Low' ? 'badge-green' : r === 'Medium' ? 'badge-yellow' : 'badge-red';
const statusColor= s => s === 'Recommended' ? 'badge-green' : 'badge-yellow';

export default function DecisionSupport() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass p-5 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-2xl bg-blue-500/15 flex items-center justify-center">
          <FiCheckSquare className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <p className="font-medium text-white">AI Decision Engine</p>
          <p className="text-sm text-gray-500">Analyzes 40+ variables including risk, ROI, market conditions, and capacity constraints</p>
        </div>
      </motion.div>

      {/* Decision cards */}
      <div className="space-y-4">
        {decisions.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass p-6 hover:border-white/15 transition-all border border-white/5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Score ring */}
              <div className="relative w-16 h-16 shrink-0">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="#1f2937" strokeWidth="5" />
                  <motion.circle
                    cx="32" cy="32" r="26" fill="none"
                    stroke={d.score >= 80 ? '#10b981' : d.score >= 65 ? '#1e9d87' : '#f59e0b'}
                    strokeWidth="5" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 26}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 26 * (1 - d.score / 100) }}
                    transition={{ duration: 0.8, delay: i * 0.08 + 0.3, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-sm font-mono font-bold ${scoreColor(d.score)}`}>{d.score}</span>
                </div>
              </div>

              {/* Main info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={statusColor(d.status)}>{d.status}</span>
                  <span className={riskColor(d.risk)}>{d.risk} Risk</span>
                  {d.priority === 1 && <span className="badge bg-purple-500/20 text-purple-400 border border-purple-500/30">Priority 1</span>}
                </div>
                <p className="font-medium text-white text-sm mb-1">{d.title}</p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                  <span>ROI: <span className="text-emerald-400 font-mono font-medium">{d.roi}</span></span>
                  <span>Timeline: <span className="text-gray-300">{d.timeline}</span></span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <button className="btn-ghost text-xs py-2">Details</button>
                <button className="btn-primary text-xs py-2 flex items-center gap-1.5">
                  <FiArrowUp className="w-3 h-3" /> Approve
                </button>
              </div>
            </div>

            {/* Score breakdown */}
            <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-4 gap-4">
              {[
                { label: 'Strategic Fit', score: Math.round(d.score * 0.95 + Math.random() * 5) },
                { label: 'Financial',     score: Math.round(d.score * 0.9 + Math.random() * 10) },
                { label: 'Risk Adj.',     score: Math.round(d.score * (d.risk === 'Low' ? 1.05 : d.risk === 'High' ? 0.85 : 0.95)) },
                { label: 'Timing',        score: Math.round(d.score * 0.92 + Math.random() * 8) },
              ].map(f => (
                <div key={f.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">{f.label}</span>
                    <span className="text-xs font-mono text-gray-400">{Math.min(f.score, 99)}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full">
                    <div
                      className="h-full rounded-full bg-brand-500"
                      style={{ width: `${Math.min(f.score, 99)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
