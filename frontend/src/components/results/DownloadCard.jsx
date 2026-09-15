import { motion } from 'framer-motion';
import { Download, FileSpreadsheet, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { apiUrl } from '../../services/api';

const DownloadCard = ({ fileId, filename = 'cleaned_data.xlsx' }) => {
  const downloadUrl = apiUrl(`/api/download/${fileId}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="card p-6 text-center"
    >
      <div className="w-14 h-14 rounded-2xl icon-gradient flex items-center justify-center mx-auto mb-4 shadow-glow">
        <FileSpreadsheet size={26} className="text-white" />
      </div>
      <h3 className="font-semibold text-slate-800 mb-1">Your file is ready!</h3>
      <p className="text-sm text-slate-500 mb-6 font-light">{filename}</p>

      <div className="flex flex-col gap-3">
        {/* Direct browser download — no axios, no CORS issues */}
        <a href={downloadUrl} download={filename}>
          <button className="btn-primary w-full flex items-center justify-center gap-2 py-3">
            <Download size={18} />
            Download Cleaned Excel
          </button>
        </a>

        <Link to="/upload">
          <Button variant="secondary" icon={RefreshCw} className="w-full justify-center">
            Upload Another File
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default DownloadCard;
