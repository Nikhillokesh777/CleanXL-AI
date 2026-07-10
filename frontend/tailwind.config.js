/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        primary: { from: '#2563EB', to: '#4F46E5' },
        accent: { from: '#06B6D4', to: '#3B82F6' },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        bg: '#F8FAFC',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2563EB, #4F46E5)',
        'gradient-accent': 'linear-gradient(135deg, #06B6D4, #3B82F6)',
        'gradient-success': 'linear-gradient(135deg, #22C55E, #16A34A)',
        'gradient-hero': 'radial-gradient(ellipse at top left, rgba(37,99,235,0.12) 0%, transparent 60%), radial-gradient(ellipse at bottom right, rgba(79,70,229,0.10) 0%, transparent 60%)',
      },
      boxShadow: {
        card: '0 4px 24px rgba(37,99,235,0.07), 0 1px 4px rgba(0,0,0,0.04)',
        'card-hover': '0 12px 40px rgba(37,99,235,0.15), 0 2px 8px rgba(0,0,0,0.06)',
        glow: '0 0 24px rgba(37,99,235,0.25)',
        'glow-sm': '0 0 12px rgba(37,99,235,0.18)',
      },
      borderRadius: { '2xl': '20px', '3xl': '28px' },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'dash': 'dash 2s linear infinite',
        'gradient': 'gradient 4s ease infinite',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-up': 'slideUp 0.5s ease forwards',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        dash: { to: { strokeDashoffset: 0 } },
        gradient: { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
