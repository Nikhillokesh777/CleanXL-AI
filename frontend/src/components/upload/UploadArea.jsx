import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudUpload, FileSpreadsheet, AlertCircle, X } from 'lucide-react';
import { SUPPORTED_FORMATS, MAX_FILE_SIZE } from '../../utils/constants';
import { useUpload } from '../../hooks/useUpload';
import Badge from '../common/Badge';

const UploadArea = () => {
  const { processFile, error, status, setError } = useUpload();

  // Disable while processing OR uploading
  const isDisabled = status === 'processing' || status === 'uploading';

  const onDrop = useCallback((accepted, rejected) => {
    if (rejected?.length > 0) {
      const reason = rejected[0]?.errors?.[0]?.message || 'Invalid file.';
      setError(reason);
      return;
    }
    if (accepted[0]) processFile(accepted[0]);
  }, [processFile, setError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    disabled: isDisabled,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`relative rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden
          ${isDragActive
            ? 'border-blue-500 bg-blue-50/80 scale-[1.01]'
            : 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/40'
          } ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />

        {isDragActive && (
          <div className="absolute inset-0 rounded-3xl animated-border opacity-20 pointer-events-none" />
        )}

        <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
          <motion.div
            animate={{ y: isDragActive ? -8 : 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="relative mb-6"
          >
            <div className="w-20 h-20 rounded-2xl icon-gradient flex items-center justify-center shadow-glow">
              <CloudUpload size={36} className="text-white" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-blue-500/20 animate-ping" style={{ animationDuration: '2s' }} />
          </motion.div>

          <AnimatePresence mode="wait">
            {isDragActive ? (
              <motion.div key="drag" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p className="text-xl font-semibold text-blue-600 mb-2">Drop your file here!</p>
                <p className="text-slate-500 text-sm">Release to start cleaning</p>
              </motion.div>
            ) : (
              <motion.div key="idle" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p className="text-xl font-semibold text-slate-800 mb-2">
                  Drag & drop your file here
                </p>
                <p className="text-slate-500 text-sm mb-6">
                  or <span className="text-blue-600 font-semibold hover:underline">browse to upload</span>
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {SUPPORTED_FORMATS.map((fmt) => (
                    <Badge key={fmt} color="blue" className="flex items-center gap-1">
                      <FileSpreadsheet size={11} />
                      {fmt.toUpperCase()}
                    </Badge>
                  ))}
                  <Badge color="gray">Max 50MB</Badge>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Error banner — shows exact error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-start gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600"
          >
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            <span className="flex-1">{error}</span>
            <button onClick={() => setError(null)} className="flex-shrink-0 hover:text-red-800">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadArea;
