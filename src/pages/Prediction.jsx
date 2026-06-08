import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiChevronDown, FiChevronUp, FiArrowRight } from 'react-icons/fi';
import ChartCard from '../components/ChartCard';
import { predictionItems } from '../data/mockData';

const impactColor = {
  Critical: 'badge-red',
  High:     'badge-yellow',
  Medium:   'badge-blue',
  Low:      'badge-green',
};

function PredictionCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="glass border border-white/5 hover:border-white/10 transition-all overflow-hidden"
    >
      <div
        className="p-5 flex items-start justify-between cursor-pointer"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="badge-brand">{item.category}</span>
            <span className={impactColor[item.impact]}>{item.impact}</span>
            <span className="text-xs text-gray-500">in {item.timeframe}</span>
          </div>
          <p className="text-sm font-medium text-white">{item.title}</p>
        </div>
        <div className="flex items-center gap-4 ml-4 shrink-0">
          {/* Confidence ring */}
          <div className="flex flex-col items-center">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="18" fill="none" stroke="#1f2937" strokeWidth="4" />
                <motion.circle
                  cx="24" cy="24" r="18" fill="none"
                  stroke={item.confidence >= 80 ? '#1e9d87' : item.confidence >= 65 ? '#f59e0b' : '#3b82f6'}
                  strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 18}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 18 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 18 * (1 - item.confidence / 100) }}
                  transition={{ duration: 0.8, delay: index * 0.07 + 0.3, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-mono font-bold text-white">{item.confidence}%</span>
              </div>
            </div>
            <span className="text-[10px] text-gray-600 mt-0.5">conf.</span>
          </div>
          {expanded ? <FiChevronUp className="w-4 h-4 text-gray-500" /> : <FiChevronDown className="w-4 h-4 text-gray-500" />}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/5 px-5 py-4 bg-white/2"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label-sm mb-1">Recommended Action</p>
                <p className="text-sm text-gray-300">{item.action}</p>
              </div>
              <button className="btn-primary shrink-0 flex items-center gap-1.5">
                Act Now <FiArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Prediction() {
  return (
    <div className="space-y-6">
      {/* AI engine status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass p-5 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-2xl bg-brand-500/15 flex items-center justify-center">
          <FiCpu className="w-6 h-6 text-brand-400" />
        </div>
        <div>
          <p className="font-medium text-white">AI Prediction Engine</p>
          <p className="text-sm text-gray-500">Model v4.2 • Trained on 18 months of data • 94.2% accuracy</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm text-emerald-400 font-medium">Live</span>
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Predictions',   value: predictionItems.length, sub: 'Active'       },
          { label: 'Avg Confidence',value: '76%',                  sub: 'This month'   },
          { label: 'Resolved',      value: '23',                   sub: 'Last 30 days' },
          { label: 'Accuracy',      value: '94.2%',                sub: 'Model score'  },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass p-4"
          >
            <p className="label-sm mb-1">{s.label}</p>
            <p className="font-display text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-gray-600 mt-0.5">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Predictions list */}
      <ChartCard title="Active Predictions" subtitle="AI-generated risk forecasts with recommended actions">
        <div className="space-y-3">
          {predictionItems.map((item, i) => (
            <PredictionCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
