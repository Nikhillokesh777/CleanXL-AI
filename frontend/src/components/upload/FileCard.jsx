import { FileSpreadsheet, X } from 'lucide-react';
import { formatFileSize } from '../../utils/helpers';

const FileCard = ({ file, onRemove }) => {
  if (!file) return null;
  return (
    <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
      <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
        <FileSpreadsheet size={20} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate">{file.name}</p>
        <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
      </div>
      {onRemove && (
        <button
          onClick={onRemove}
          className="p-1.5 rounded-lg hover:bg-red-100 text-slate-400 hover:text-red-500 transition-colors"
          aria-label="Remove file"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default FileCard;
