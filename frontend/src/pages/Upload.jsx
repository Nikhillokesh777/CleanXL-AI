import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CloudUpload, FileSpreadsheet, AlertCircle, CheckCircle,
  Download, RefreshCw, X, Sparkles
} from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// ── Steps ─────────────────────────────────────────────────────────────────────
const STEPS = [
  'Reading File',
  'Detecting Problems',
  'Removing Duplicates',
  'Cleaning Missing Values',
  'Formatting Columns',
  'Creating Excel',
];

const SUPPORTED = ['.csv', '.xls', '.xlsx'];
const MAX_MB = 50;

// ── Sub-components ────────────────────────────────────────────────────────────

const StepItem = ({ label, index, currentStep }) => {
  const done   = currentStep > index + 1;
  const active = currentStep === index + 1;
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all ${
        done   ? 'bg-green-50 border-green-100' :
        active ? 'bg-blue-50 border-blue-200 shadow-sm' :
                 'bg-slate-50 border-slate-100 opacity-40'
      }`}
    >
      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
        done   ? 'bg-green-500 text-white' :
        active ? 'bg-gradient-primary text-white' :
                 'bg-slate-200 text-slate-400'
      }`}>
        {done ? <CheckCircle size={13} /> : index + 1}
      </div>
      <span className={`text-sm font-medium ${
        done ? 'text-green-700' : active ? 'text-blue-700' : 'text-slate-400'
      }`}>{label}</span>
      {done && <span className="ml-auto text-xs text-green-600 font-semibold">Done</span>}
    </motion.div>
  );
};

const StatCard = ({ label, value, color }) => {
  const colors = {
    blue:   'bg-blue-50 text-blue-700',
    green:  'bg-green-50 text-green-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    purple: 'bg-purple-50 text-purple-700',
    cyan:   'bg-cyan-50 text-cyan-700',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-4 text-center ${colors[color] || colors.blue}`}
    >
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs font-medium mt-1 opacity-80">{label}</p>
    </motion.div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────

const Upload = () => {
  const [phase, setPhase]       = useState('idle');    // idle | processing | done | error
  const [step, setStep]         = useState(0);
  const [error, setError]       = useState('');
  const [results, setResults]   = useState(null);
  const [filename, setFilename] = useState('');

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const processFile = async (file) => {
    setError('');
    setResults(null);
    setFilename(file.name);
    setStep(0);
    setPhase('processing');

    try {
      // Start upload
      const form = new FormData();
      form.append('file', file);

      const uploadPromise = axios.post(`${API_BASE_URL}/api/upload`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 120000,
      });

      // Animate steps while upload runs
      for (let i = 0; i < STEPS.length; i++) {
        await sleep(600);
        setStep(i + 1);
      }

      // Wait for real response
      const { data } = await uploadPromise;

      if (!data?.success) throw new Error(data?.message || 'Server error');

      const r = data.report || {};
      setResults({
        file_id:            data.file_id,
        rows_before:        r.rows_before          ?? 0,
        rows_after:         r.rows_after           ?? 0,
        duplicates_removed: r.duplicates_removed   ?? 0,
        missing_fixed:      r.missing_values_fixed ?? 0,
        columns_cleaned:    r.columns_renamed      ?? 0,
        time_taken:         r.processing_time      ?? '0s',
        score_before:       r.quality_score_before ?? 0,
        score_after:        r.quality_score_after  ?? 0,
      });
      setPhase('done');

    } catch (err) {
      console.error('[Upload Error]', err);
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        'Upload failed. Please try again.';
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
      setPhase('error');
    }
  };

  const onDrop = useCallback((accepted, rejected) => {
    if (rejected?.length) {
      setError(`Invalid file. Use ${SUPPORTED.join(', ')} under ${MAX_MB}MB.`);
      return;
    }
    if (accepted[0]) processFile(accepted[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxSize: MAX_MB * 1024 * 1024,
    multiple: false,
    disabled: phase === 'processing',
  });

  const reset = () => {
    setPhase('idle');
    setStep(0);
    setError('');
    setResults(null);
    setFilename('');
  };

  const progress = Math.round((step / STEPS.length) * 100);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-400/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-400/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <Sparkles size={12} /> Smart Data Cleaning
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            {phase === 'done'
              ? <><span className="gradient-text">Cleaning Complete!</span></>
              : <>Upload Your <span className="gradient-text">Excel File</span></>
            }
          </h1>
          <p className="text-slate-500 font-light text-lg">
            {phase === 'done'
              ? 'Your file has been cleaned and is ready to download.'
              : "Drop your file below and we'll clean it automatically in seconds."
            }
          </p>
        </motion.div>

        {/* ── IDLE / ERROR — show dropzone ── */}
        <AnimatePresence mode="wait">
          {(phase === 'idle' || phase === 'error') && (
            <motion.div key="dropzone" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div
                {...getRootProps()}
                className={`relative rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden
                  ${isDragActive ? 'border-blue-500 bg-blue-50/80' : 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/40'}`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl icon-gradient flex items-center justify-center shadow-glow">
                      <CloudUpload size={36} className="text-white" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-blue-500/20 animate-ping" style={{ animationDuration: '2s' }} />
                  </div>
                  <p className="text-xl font-semibold text-slate-800 mb-2">
                    {isDragActive ? 'Drop your file here!' : 'Drag & drop your file here'}
                  </p>
                  <p className="text-slate-500 text-sm mb-6">
                    or <span className="text-blue-600 font-semibold">browse to upload</span>
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {SUPPORTED.map(f => (
                      <span key={f} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        <FileSpreadsheet size={11} />{f.toUpperCase()}
                      </span>
                    ))}
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">Max {MAX_MB}MB</span>
                  </div>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-start gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600"
                >
                  <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="flex-1">{error}</span>
                  <button onClick={() => setError('')}><X size={14} /></button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── PROCESSING ── */}
          {phase === 'processing' && (
            <motion.div key="processing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-card p-8"
            >
              {/* Spinner */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
                <motion.div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600"
                  animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                <motion.div className="absolute inset-3 rounded-full border-4 border-transparent border-t-indigo-400"
                  animate={{ rotate: -360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} />
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-1 text-center">Cleaning Your Data</h2>
              <p className="text-sm text-slate-500 text-center mb-1 truncate">{filename}</p>
              <p className="text-blue-600 font-medium text-sm text-center mb-5">
                {STEPS[step - 1] || 'Initializing...'}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 mb-6 overflow-hidden">
                <motion.div className="h-full rounded-full bg-gradient-primary"
                  animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
              </div>
              <p className="text-xs text-slate-400 text-center mb-6">{progress}% complete</p>

              {/* Steps */}
              <div className="space-y-2">
                {STEPS.map((label, i) => <StepItem key={label} label={label} index={i} currentStep={step} />)}
              </div>
            </motion.div>
          )}

          {/* ── DONE — Results ── */}
          {phase === 'done' && results && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

              {/* Success icon */}
              <div className="flex justify-center mb-8">
                <div className="relative w-20 h-20">
                  <motion.div className="absolute inset-0 rounded-full bg-green-400/20"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity }} />
                  <motion.div className="absolute inset-2 rounded-full bg-gradient-success flex items-center justify-center shadow-lg"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                    <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none">
                      <motion.path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.3 }} />
                    </svg>
                  </motion.div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <StatCard label="Rows Before"         value={results.rows_before}        color="blue"   />
                <StatCard label="Rows After"          value={results.rows_after}         color="green"  />
                <StatCard label="Duplicates Removed"  value={results.duplicates_removed} color="yellow" />
                <StatCard label="Missing Values Fixed" value={results.missing_fixed}     color="purple" />
                <StatCard label="Columns Cleaned"     value={results.columns_cleaned}    color="cyan"   />
                <StatCard label="Time Taken"          value={results.time_taken}         color="blue"   />
              </div>

              {/* Quality score */}
              <div className="bg-gradient-primary rounded-2xl p-5 text-white text-center mb-6">
                <p className="text-sm font-medium opacity-80 mb-1">Data Quality Score</p>
                <p className="text-4xl font-bold">{results.score_before}% → {results.score_after}%</p>
              </div>

              {/* Download button — direct browser link, no axios */}
              <div className="flex flex-col gap-3">
                <a
                  href={`${API_BASE_URL}/api/download/${results.file_id}`}
                  download="cleaned_data.xlsx"
                  className="btn-primary flex items-center justify-center gap-2 py-4 text-base rounded-2xl no-underline"
                >
                  <Download size={20} />
                  Download Cleaned Excel
                </a>
                <button onClick={reset}
                  className="btn-secondary flex items-center justify-center gap-2 py-4 text-base rounded-2xl"
                >
                  <RefreshCw size={18} />
                  Upload Another File
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Upload;
