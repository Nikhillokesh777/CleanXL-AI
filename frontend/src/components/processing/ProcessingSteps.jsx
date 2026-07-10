import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader } from 'lucide-react';
import { PROCESSING_STEPS } from '../../utils/constants';

const ProcessingSteps = ({ currentStep }) => (
  <div className="w-full max-w-sm mx-auto space-y-3">
    {PROCESSING_STEPS.map((step, i) => {
      const done = currentStep > step.id;
      const active = currentStep === step.id;
      return (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
            done ? 'bg-green-50 border border-green-100' :
            active ? 'bg-blue-50 border border-blue-200 shadow-glow-sm' :
            'bg-slate-50 border border-slate-100 opacity-50'
          }`}
        >
          <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            done ? 'bg-green-500' : active ? 'bg-gradient-primary' : 'bg-slate-200'
          }`}>
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check size={14} className="text-white" />
                </motion.div>
              ) : active ? (
                <motion.div key="spin" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                  <Loader size={14} className="text-white" />
                </motion.div>
              ) : (
                <span className="text-xs text-slate-400 font-medium">{step.id}</span>
              )}
            </AnimatePresence>
          </div>
          <span className={`text-sm font-medium ${done ? 'text-green-700' : active ? 'text-blue-700' : 'text-slate-400'}`}>
            {step.label}
          </span>
          {done && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="ml-auto text-xs text-green-600 font-semibold"
            >
              Done
            </motion.span>
          )}
        </motion.div>
      );
    })}
  </div>
);

export default ProcessingSteps;
