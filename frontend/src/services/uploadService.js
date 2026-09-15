import api from './api';

export const uploadFile = (file, onProgress) => {
  const form = new FormData();
  form.append('file', file);
  return api.post('/api/upload', form, {
    onUploadProgress: (e) => {
      if (e.total) {
        onProgress?.(Math.round((e.loaded * 100) / e.total));
      }
    },
  });
};
