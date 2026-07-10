import { motion } from 'framer-motion';
import ProgressBar from '../common/ProgressBar';

const UploadProgress = ({ progress, filename }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full max-w-2xl mx-auto mt-6 p-5 bg-white rounded-2xl border border-slate-100 shadow-card"
  >
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm font-semibold text-slate-700 truncate max-w-xs">{filename}</p>
      <span className="text-sm font-bold gradient-text">{progress}%</span>
    </div>
    <ProgressBar value={progress} showLabel={false} />
    <p className="text-xs text-slate-400 mt-2">
      {progress < 100 ? 'Uploading...' : 'Upload complete!'}
    </p>
  </motion.div>
);

export default UploadProgress;
