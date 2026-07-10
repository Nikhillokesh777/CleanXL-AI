import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { formatNumber } from '../../utils/formatter';

const StatisticsCard = ({ label, value, icon, color = 'blue', index = 0, suffix = '' }) => {
  const Icon = Icons[icon] || Icons.BarChart2;
  const colors = {
    blue: { bg: 'bg-blue-50', icon: 'bg-gradient-primary', text: 'text-blue-600' },
    green: { bg: 'bg-green-50', icon: 'bg-gradient-success', text: 'text-green-600' },
    yellow: { bg: 'bg-yellow-50', icon: 'bg-gradient-to-br from-yellow-400 to-orange-400', text: 'text-yellow-600' },
    purple: { bg: 'bg-purple-50', icon: 'bg-gradient-to-br from-purple-500 to-indigo-500', text: 'text-purple-600' },
    cyan: { bg: 'bg-cyan-50', icon: 'bg-gradient-accent', text: 'text-cyan-600' },
  };
  const c = colors[color] || colors.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card p-5"
    >
      <div className={`w-10 h-10 rounded-xl ${c.icon} flex items-center justify-center mb-4 shadow-glow-sm`}>
        <Icon size={18} className="text-white" />
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-1">
        {typeof value === 'number' ? formatNumber(value) : value}{suffix}
      </p>
      <p className="text-sm text-slate-500 font-medium">{label}</p>
    </motion.div>
  );
};

export default StatisticsCard;
