import { createContext, useContext, useState } from 'react';

const UploadContext = createContext(null);

export const UploadProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState(0);
  const [results, setResults] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | uploading | processing | done | error
  const [error, setError] = useState(null);

  const reset = () => {
    setFile(null);
    setUploadProgress(0);
    setProcessingStep(0);
    setResults(null);
    setStatus('idle');
    setError(null);
  };

  return (
    <UploadContext.Provider value={{
      file, setFile,
      uploadProgress, setUploadProgress,
      processingStep, setProcessingStep,
      results, setResults,
      status, setStatus,
      error, setError,
      reset,
    }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUploadContext = () => {
  const ctx = useContext(UploadContext);
  if (!ctx) throw new Error('useUploadContext must be used within UploadProvider');
  return ctx;
};
