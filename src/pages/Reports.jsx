import { motion } from 'framer-motion';
import { FiDownload, FiEye, FiFileText } from 'react-icons/fi';
import ChartCard from '../components/ChartCard';
import { reports } from '../data/mockData';

const typeColor = {
  Executive:  'badge-brand',
  Risk:       'badge-red',
  Financial:  'badge-green',
  Health:     'badge-blue',
  AI:         'badge-yellow',
  Compliance: 'badge-brand',
};

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Reports', value: '142' },
          { label: 'Generated This Month', value: '18' },
          { label: 'Scheduled Reports', value: '7' },
          { label: 'Shared Externally', value: '4' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass p-5"
          >
            <p className="label-sm mb-2">{s.label}</p>
            <p className="font-display text-3xl font-bold text-white">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Generate new report */}
      <ChartCard title="Generate Report" subtitle="Create a new custom report">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {['Executive', 'Financial', 'Risk', 'Health', 'AI/ML', 'Compliance'].map((type, i) => (
            <motion.button
              key={type}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white/5 border border-white/10 hover:border-brand-500/50 hover:bg-brand-500/10
                         rounded-xl p-4 text-center transition-all group"
            >
              <FiFileText className="w-5 h-5 text-gray-500 group-hover:text-brand-400 mx-auto mb-2 transition-colors" />
              <p className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">{type}</p>
            </motion.button>
          ))}
        </div>
      </ChartCard>

      {/* Recent reports list */}
      <ChartCard title="Recent Reports" subtitle="Generated reports library">
        <div className="space-y-2">
          {reports.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-4 bg-white/3 border border-white/5 rounded-xl px-5 py-4
                         hover:border-white/10 hover:bg-white/5 transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0">
                <FiFileText className="w-4 h-4 text-brand-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{report.title}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className={typeColor[report.type]}>{report.type}</span>
                  <span className="text-xs text-gray-600">{report.pages} pages • {report.size}</span>
                </div>
              </div>
              <span className="text-xs text-gray-600 hidden sm:block shrink-0">{report.date}</span>
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Preview">
                  <FiEye className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-brand-500/20 text-gray-400 hover:text-brand-400 transition-colors" title="Download">
                  <FiDownload className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
