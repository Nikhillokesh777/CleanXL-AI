import { Link } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 mt-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl icon-gradient flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="font-bold text-white text-lg">Smart<span className="gradient-text">Excel</span> Cleaner</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Transform messy spreadsheets into clean, analysis-ready data in seconds with AI-powered cleaning.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a href="https://github.com/Nikhillokesh777" target="_blank" rel="noreferrer" aria-label="GitHub"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all text-xs font-medium">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/nikhil-lokesh-562b022b7/" target="_blank" rel="noreferrer" aria-label="LinkedIn"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all text-xs font-medium">
              LinkedIn
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
          <ul className="space-y-2.5 text-sm">
            {[['Home', '/'], ['Features', '/#features'], ['Upload', '/upload'], ['About', '/about']].map(([label, href]) => (
              <li key={label}><Link to={href} className="hover:text-white transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
          <ul className="space-y-2.5 text-sm">
            {[['Privacy Policy', '#'], ['Terms of Service', '#'], ['Contact', '/contact']].map(([label, href]) => (
              <li key={label}><Link to={href} className="hover:text-white transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <p>© {new Date().getFullYear()} SmartExcel Cleaner. All rights reserved.</p>
        <p className="flex items-center gap-1.5">Made with <Heart size={12} className="text-red-400 fill-red-400" /> by <span className="text-white font-semibold">Nikhil Lokesh</span> for data professionals</p>
      </div>
    </div>
  </footer>
);

export default Footer;
