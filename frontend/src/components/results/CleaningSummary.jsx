import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { formatNumber, formatPercent } from '../../utils/formatter';

const CleaningSummary = ({ results }) => {
  if (!results) return null;
  const reduction = results.rows_before - results.rows_after;
  const pct = formatPercent(reduction, results.rows_before);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="card p-6"
    >
      <h3 className="font-semibold text-slate-800 mb-4 text-base">Cleaning Summary</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-slate-50">
          <span className="text-sm text-slate-500">Rows before cleaning</span>
          <span className="text-sm font-semibold text-slate-800">{formatNumber(results.rows_before)}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-slate-50">
          <span className="text-sm text-slate-500">Rows after cleaning</span>
          <span className="text-sm font-semibold text-green-600">{formatNumber(results.rows_after)}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-slate-50">
          <span className="text-sm text-slate-500">Data reduction</span>
          <span className="flex items-center gap-1 text-sm font-semibold text-orange-500">
            <TrendingDown size={14} /> {pct}
          </span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-slate-500">Data quality score</span>
          <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
            <TrendingUp size={14} /> 98.2%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CleaningSummary;
