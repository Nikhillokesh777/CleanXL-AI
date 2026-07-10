import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Upload, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const CTA = () => (
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gradient-primary p-12 text-center shadow-glow"
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Ready to clean your data?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-md mx-auto font-light">
            Upload your Excel or CSV file and get a clean, analysis-ready dataset in seconds.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/upload">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.03]" icon={Upload}>
                Upload Now — It's Free
              </Button>
            </Link>
            <Link to="/about">
              <button className="flex items-center gap-2 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/30 hover:bg-white/10 transition-all">
                Learn More <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTA;
