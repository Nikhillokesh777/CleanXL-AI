import { motion } from 'framer-motion';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'text-slate-600 font-semibold rounded-xl px-6 py-3 hover:bg-slate-100 transition-all duration-200',
  danger: 'bg-red-500 text-white font-semibold rounded-xl px-6 py-3 hover:bg-red-600 transition-all duration-200',
};

const Button = ({ children, variant = 'primary', className = '', disabled, loading, icon: Icon, ...props }) => (
  <motion.button
    whileTap={{ scale: 0.97 }}
    disabled={disabled || loading}
    className={`${variants[variant]} inline-flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {loading ? (
      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    ) : Icon && <Icon size={18} />}
    {children}
  </motion.button>
);

export default Button;
