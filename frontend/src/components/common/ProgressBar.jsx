import { motion } from 'framer-motion';

const ProgressBar = ({ value = 0, className = '', showLabel = true, color = 'primary' }) => {
  const colors = {
    primary: 'bg-gradient-primary',
    success: 'bg-gradient-success',
    accent: 'bg-gradient-accent',
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between mb-1.5">
        {showLabel && (
          <span className="text-sm font-medium text-slate-600">{Math.round(value)}%</span>
        )}
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colors[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
