export const SUPPORTED_FORMATS = ['.csv', '.xls', '.xlsx'];
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const PROCESSING_STEPS = [
  { id: 1, label: 'Reading File', icon: 'FileText' },
  { id: 2, label: 'Detecting Problems', icon: 'Search' },
  { id: 3, label: 'Removing Duplicates', icon: 'Copy' },
  { id: 4, label: 'Cleaning Missing Values', icon: 'Eraser' },
  { id: 5, label: 'Formatting Columns', icon: 'AlignLeft' },
  { id: 6, label: 'Creating Excel', icon: 'FileSpreadsheet' },
];

export const FEATURES = [
  { icon: 'Copy', title: 'Remove Duplicates', desc: 'Automatically detect and eliminate duplicate rows to ensure data integrity.' },
  { icon: 'Eraser', title: 'Handle Missing Values', desc: 'Smart imputation and flagging of empty cells and null values.' },
  { icon: 'AlignLeft', title: 'Standardize Columns', desc: 'Normalize column names and ensure consistent formatting across datasets.' },
  { icon: 'Calendar', title: 'Fix Date Formats', desc: 'Parse and standardize all date formats into a unified structure.' },
  { icon: 'Rows', title: 'Clean Empty Rows', desc: 'Remove blank rows and trailing whitespace that pollute your data.' },
  { icon: 'RefreshCw', title: 'Convert Data Types', desc: 'Automatically detect and convert columns to their correct data types.' },
  { icon: 'Scissors', title: 'Trim Extra Spaces', desc: 'Strip leading, trailing, and extra whitespace from all text fields.' },
  { icon: 'Download', title: 'Generate Clean Excel', desc: 'Export a polished, ready-to-use Excel file with one click.' },
];

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/#features' },
  { label: 'Upload', href: '/upload' },
  { label: 'About', href: '/about' },
];

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
