import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="text-9xl font-black gradient-text mb-6 leading-none"
      >
        404
      </motion.div>
      <h1 className="text-3xl font-bold text-slate-900 mb-3">Page not found</h1>
      <p className="text-slate-500 font-light mb-8 max-w-sm mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4 justify-center">
        <Link to="/">
          <Button variant="primary" icon={Home}>Go Home</Button>
        </Link>
        <button onClick={() => window.history.back()}>
          <Button variant="secondary" icon={ArrowLeft}>Go Back</Button>
        </button>
      </div>
    </motion.div>
  </div>
);

export default NotFound;
