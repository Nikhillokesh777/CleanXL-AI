import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Upload, Play, Sparkles, CheckCircle, TrendingUp, Zap } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

const FloatingCard = ({ className, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    style={{ animation: `float ${5 + delay}s ease-in-out ${delay}s infinite` }}
    className={`absolute glass rounded-2xl shadow-card p-3 ${className}`}
  >
    {children}
  </motion.div>
);

const SpreadsheetIllustration = () => (
  <div className="relative w-full h-80 flex items-center justify-center">
    {/* Main card */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative w-72 bg-white rounded-2xl shadow-card-hover border border-slate-100 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-primary px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((c, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
          ))}
        </div>
        <span className="text-white text-xs font-medium ml-2">data_cleaned.xlsx</span>
      </div>
      {/* Table */}
      <div className="p-3">
        {[
          ['Name', 'Email', 'Score'],
          ['Alice', 'alice@co.com', '98'],
          ['Bob', 'bob@co.com', '87'],
          ['Carol', 'carol@co.com', '92'],
          ['David', 'david@co.com', '76'],
        ].map((row, ri) => (
          <div key={ri} className={`grid grid-cols-3 gap-1 mb-1 ${ri === 0 ? 'font-semibold' : ''}`}>
            {row.map((cell, ci) => (
              <div key={ci} className={`text-xs px-2 py-1 rounded ${ri === 0 ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-600'}`}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>

    {/* Floating badges */}
    <FloatingCard className="top-4 -right-4 flex items-center gap-2" delay={0.5}>
      <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center">
        <CheckCircle size={14} className="text-green-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-800">34 Duplicates</p>
        <p className="text-[10px] text-slate-500">Removed</p>
      </div>
    </FloatingCard>

    <FloatingCard className="bottom-8 -left-6 flex items-center gap-2" delay={1}>
      <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
        <TrendingUp size={14} className="text-blue-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-800">98.2% Clean</p>
        <p className="text-[10px] text-slate-500">Data quality</p>
      </div>
    </FloatingCard>

    <FloatingCard className="top-16 -left-8 flex items-center gap-2" delay={1.5}>
      <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center">
        <Zap size={14} className="text-purple-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-800">2.4s</p>
        <p className="text-[10px] text-slate-500">Processing time</p>
      </div>
    </FloatingCard>
  </div>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
    {/* Background glows */}
    <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
    <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge color="blue" className="mb-6 text-xs px-3 py-1">
              <Sparkles size={11} /> AI-Powered Data Cleaning
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-6"
          >
            Transform Messy{' '}
            <span className="gradient-text">Excel Files</span>{' '}
            into Clean Data
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-500 leading-relaxed mb-10 max-w-lg font-light"
          >
            Automatically clean duplicates, missing values, formatting issues, and inconsistent data with a single click.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/upload">
              <Button variant="primary" icon={Upload} className="text-base px-7 py-3.5">
                Upload File
              </Button>
            </Link>
            <Button variant="secondary" icon={Play} className="text-base px-7 py-3.5">
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-6 mt-10"
          >
            {[['10K+', 'Files Cleaned'], ['99.9%', 'Accuracy'], ['2s', 'Avg. Time']].map(([val, label]) => (
              <div key={label}>
                <p className="text-2xl font-bold gradient-text">{val}</p>
                <p className="text-xs text-slate-500 font-medium">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:flex justify-center"
        >
          <SpreadsheetIllustration />
        </motion.div>
      </div>
    </div>
  </section>
);

export default Hero;
