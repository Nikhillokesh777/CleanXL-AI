import { FileSpreadsheet } from 'lucide-react';
import { formatFileSize } from '../../utils/helpers';
import Badge from '../common/Badge';

const FilePreview = ({ file }) => {
  if (!file) return null;
  const ext = file.name.split('.').pop().toUpperCase();
  return (
    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-card">
      <div className="w-12 h-12 rounded-xl icon-gradient flex items-center justify-center">
        <FileSpreadsheet size={22} className="text-white" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-slate-800 text-sm">{file.name}</p>
        <p className="text-xs text-slate-500 mt-0.5">{formatFileSize(file.size)}</p>
      </div>
      <Badge color="blue">{ext}</Badge>
    </div>
  );
};

export default FilePreview;
