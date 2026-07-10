import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Sarah Chen', role: 'Data Analyst @ TechCorp', text: 'Saved me hours every week. The duplicate detection is incredibly accurate.', avatar: 'SC' },
  { name: 'Marcus Rivera', role: 'Business Intelligence Lead', text: 'The cleanest output I\'ve seen from any automated tool. Highly recommended.', avatar: 'MR' },
  { name: 'Priya Patel', role: 'Operations Manager', text: 'Our team went from spending 3 hours on data prep to under 5 minutes.', avatar: 'PP' },
];

const Testimonials = () => (
  <section className="py-20 bg-slate-50/60">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Loved by data professionals</h2>
        <p className="text-slate-500 font-light">Join thousands of analysts who trust SmartExcel Cleaner</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card p-6"
          >
            <div className="flex gap-0.5 mb-4">
              {Array(5).fill(0).map((_, j) => (
                <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-5 font-light">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full icon-gradient flex items-center justify-center text-white text-xs font-bold">
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
