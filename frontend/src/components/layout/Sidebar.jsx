import { Link, useLocation } from 'react-router-dom';
import { Home, Upload, BarChart2, Info } from 'lucide-react';

const links = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Upload, label: 'Upload', href: '/upload' },
  { icon: BarChart2, label: 'Results', href: '/results' },
  { icon: Info, label: 'About', href: '/about' },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <aside className="w-60 bg-white border-r border-slate-100 min-h-screen p-4 flex flex-col gap-1">
      {links.map(({ icon: Icon, label, href }) => (
        <Link
          key={label}
          to={href}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            pathname === href ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <Icon size={18} />
          {label}
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
