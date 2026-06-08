import { motion } from 'framer-motion';

const statusColors = {
  Completed:   'badge-green',
  Active:      'badge-blue',
  Warning:     'badge-yellow',
  'In Progress':'badge-brand',
  Error:       'badge-red',
};

export default function DataTable({ columns, rows, onRowClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5">
            {columns.map(col => (
              <th key={col.key} className="label-sm text-left py-3 px-4 font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={row.id || i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => onRowClick?.(row)}
              className="border-b border-white/5 hover:bg-white/3 transition-colors cursor-default group"
            >
              {columns.map(col => (
                <td key={col.key} className="py-3 px-4 text-gray-300 group-hover:text-white transition-colors">
                  {col.render ? col.render(row[col.key], row) : (
                    col.key === 'status'
                      ? <span className={statusColors[row[col.key]] || 'badge-blue'}>{row[col.key]}</span>
                      : row[col.key]
                  )}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
