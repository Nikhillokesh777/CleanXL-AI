import { motion } from 'framer-motion';

const SuccessAnimation = () => (
  <div className="relative w-24 h-24 mx-auto mb-6">
    {/* Outer glow ring */}
    <motion.div
      className="absolute inset-0 rounded-full bg-green-400/20"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    {/* Circle */}
    <motion.div
      className="absolute inset-2 rounded-full bg-gradient-success flex items-center justify-center shadow-lg"
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
    >
      {/* Checkmark SVG */}
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
        <motion.path
          d="M5 13l4 4L19 7"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
      </svg>
    </motion.div>
  </div>
);

export default SuccessAnimation;
