import { motion } from 'framer-motion';
import { Sparkles, Target, Zap, Shield } from 'lucide-react';

const values = [
  { icon: Target, title: 'Accuracy First', desc: 'Every cleaning operation is designed to preserve data integrity while removing noise.' },
  { icon: Zap, title: 'Speed Matters', desc: 'Process thousands of rows in seconds, not minutes. Your time is valuable.' },
  { icon: Shield, title: 'Privacy by Design', desc: 'Files are processed in memory and never stored permanently on our servers.' },
];

const About = () => (
  <div className="min-h-screen pt-28 pb-20 px-4">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          <Sparkles size={12} /> About Us
        </div>
        <h1 className="text-5xl font-bold text-slate-900 mb-5 tracking-tight">
          Built for <span className="gradient-text">Data Professionals</span>
        </h1>
        <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto leading-relaxed">
          SmartExcel Cleaner was built to solve the most tedious part of data analysis — cleaning raw, messy spreadsheets.
          We automate the repetitive work so you can focus on insights.
        </p>
      </motion.div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card p-6 text-center"
          >
            <div className="w-12 h-12 rounded-2xl icon-gradient flex items-center justify-center mx-auto mb-4 shadow-glow-sm">
              <v.icon size={22} className="text-white" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">{v.title}</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Built with modern technology</h2>
        <p className="text-slate-500 font-light mb-6">
          A React + FastAPI stack designed for performance, reliability, and scalability.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {['React', 'FastAPI', 'Python', 'Pandas', 'Tailwind CSS', 'Framer Motion'].map((tech) => (
            <span key={tech} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-semibold">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default About;
