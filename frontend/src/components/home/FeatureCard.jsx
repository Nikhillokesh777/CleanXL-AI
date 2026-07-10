import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const FeatureCard = ({ icon, title, desc, index = 0 }) => {
  const Icon = Icons[icon] || Icons.Star;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="card p-6 group cursor-default"
    >
      <div className="w-11 h-11 rounded-xl icon-gradient flex items-center justify-center mb-4 shadow-glow-sm group-hover:scale-110 transition-transform duration-300">
        <Icon size={20} className="text-white" />
      </div>
      <h3 className="font-semibold text-slate-800 mb-2 text-base">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed font-light">{desc}</p>
    </motion.div>
  );
};

export default FeatureCard;
