import { motion } from 'framer-motion';
import { PROCESSING_STEPS } from '../../utils/constants';

const ProgressTimeline = ({ currentStep }) => {
  const progress = (currentStep / PROCESSING_STEPS.length) * 100;
  return (
    <div className="w-full max-w-sm mx-auto mb-6">
      <div className="flex justify-between text-xs text-slate-500 mb-2">
        <span>Processing</span>
        <span className="font-semibold gradient-text">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default ProgressTimeline;
