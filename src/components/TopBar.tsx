import React from 'react';
import { Menu, Search, MoreVertical } from 'lucide-react';

interface TopBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightActions?: React.ReactNode;
}

export default function TopBar({ title, showBack = false, onBack, rightActions }: TopBarProps) {
  return (
    <div className="bg-primary text-white flex items-center justify-between px-4 h-14 shrink-0 shadow-sm relative z-10 pt-safe">
      <div className="flex items-center space-x-3">
        {showBack ? (
          <button onClick={onBack} className="p-1 -ml-1 active:bg-white/10 rounded-full transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
        ) : (
          <button className="p-1 -ml-1 active:bg-white/10 rounded-full transition-colors">
            <Menu size={24} />
          </button>
        )}
        <h1 className="text-[17px] font-medium leading-none">{title}</h1>
      </div>
      <div className="flex items-center space-x-2">
        {rightActions || (
          <>
            <button className="p-1 active:bg-white/10 rounded-full transition-colors">
              <Search size={20} />
            </button>
            <button className="p-1 -mr-1 active:bg-white/10 rounded-full transition-colors">
              <MoreVertical size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
