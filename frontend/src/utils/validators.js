import { SUPPORTED_FORMATS, MAX_FILE_SIZE } from './constants';
import { getFileExtension } from './helpers';

export const validateFile = (file) => {
  if (!file) return { valid: false, error: 'No file selected.' };
  if (!SUPPORTED_FORMATS.includes(getFileExtension(file.name)))
    return { valid: false, error: `Unsupported format. Use: ${SUPPORTED_FORMATS.join(', ')}` };
  if (file.size > MAX_FILE_SIZE)
    return { valid: false, error: 'File exceeds 50MB limit.' };
  return { valid: true, error: null };
};
