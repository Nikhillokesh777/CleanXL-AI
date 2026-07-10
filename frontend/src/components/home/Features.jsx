import { motion } from 'framer-motion';
import { FEATURES } from '../../utils/constants';
import FeatureCard from './FeatureCard';

const Features = () => (
  <section id="features" className="py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
          Features
        </span>
        <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          Everything you need to{' '}
          <span className="gradient-text">clean your data</span>
        </h2>
        <p className="text-slate-500 text-lg max-w-xl mx-auto font-light">
          Powerful cleaning operations that handle the most common data quality issues automatically.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} {...f} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Features;
