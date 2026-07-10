import { useState } from 'react';
import { downloadCleanedFile } from '../services/downloadService';

export const useDownload = () => {
  const [downloading, setDownloading] = useState(false);

  const download = async (fileId, filename) => {
    setDownloading(true);
    try {
      await downloadCleanedFile(fileId, filename);
    } finally {
      setDownloading(false);
    }
  };

  return { download, downloading };
};
