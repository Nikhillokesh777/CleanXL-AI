export const formatNumber = (n) =>
  n?.toLocaleString('en-US') ?? '0';

export const formatPercent = (value, total) =>
  total > 0 ? `${((value / total) * 100).toFixed(1)}%` : '0%';
