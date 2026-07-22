import { NavLink } from 'react-router-dom';
import { Home, FolderOpen, BarChart2, User } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/projects', icon: FolderOpen, label: 'Projects' },
    { to: '/score', icon: BarChart2, label: 'Analytics' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="bg-white border-t border-gray-200 flex justify-around items-center h-16 w-full shrink-0 relative z-10 pb-safe">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
            }`
          }
        >
          <item.icon size={24} strokeWidth={2} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
}
