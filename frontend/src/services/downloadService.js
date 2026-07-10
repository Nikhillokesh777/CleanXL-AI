import api from './api';

export const downloadCleanedFile = async (fileId, filename = 'cleaned_data.xlsx') => {
  const res = await api.get(`/api/download/${fileId}`, { responseType: 'blob' });
  const url = URL.createObjectURL(new Blob([res.data]));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
