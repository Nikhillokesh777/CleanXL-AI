import { useNavigate } from 'react-router-dom';
import { useUploadContext } from '../context/UploadContext';
import { uploadFile } from '../services/uploadService';
import { validateFile } from '../utils/validators';
import { sleep } from '../utils/helpers';
import { PROCESSING_STEPS } from '../utils/constants';

export const useUpload = () => {
  const navigate = useNavigate();
  const ctx = useUploadContext();

  const processFile = async (file) => {
    const { valid, error } = validateFile(file);
    if (!valid) { ctx.setError(error); return; }

    // Reset everything
    ctx.setError(null);
    ctx.setResults(null);
    ctx.setFile(file);
    ctx.setUploadProgress(0);
    ctx.setProcessingStep(0);
    ctx.setStatus('processing');

    navigate('/processing');

    try {
      // Fire upload in background
      const uploadPromise = uploadFile(file, ctx.setUploadProgress);

      // Animate steps while waiting
      for (let i = 0; i < PROCESSING_STEPS.length; i++) {
        await sleep(600);
        ctx.setProcessingStep(i + 1);
      }

      // Await real response
      const response = await uploadPromise;
      const data = response?.data;

      if (!data?.success) {
        throw new Error(data?.message || 'Unexpected server response.');
      }

      const r = data.report || {};

      ctx.setResults({
        file_id:              data.file_id,
        rows_before:          r.rows_before          ?? 0,
        rows_after:           r.rows_after           ?? 0,
        duplicates_removed:   r.duplicates_removed   ?? 0,
        missing_fixed:        r.missing_values_fixed ?? 0,
        columns_cleaned:      r.columns_renamed      ?? 0,
        time_taken:           r.processing_time      ?? '0s',
        quality_score_before: r.quality_score_before ?? 0,
        quality_score_after:  r.quality_score_after  ?? 0,
      });

      ctx.setStatus('done');
      navigate('/results');

    } catch (err) {
      console.error('[Upload Failed]', err);
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        'Upload failed. Please try again.';
      ctx.setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
      ctx.setStatus('error');
      navigate('/upload');
    }
  };

  return { processFile, ...ctx };
};
