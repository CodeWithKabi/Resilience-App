import { motion } from 'framer-motion';

export default function ChartCard({ title, subtitle, children, action, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`glass p-6 flex flex-col gap-4 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="section-title">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="flex-1">{children}</div>
    </motion.div>
  );
}
