import { ReactNode } from 'react';
import BottomNav from './BottomNav';

interface MobileLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

export default function MobileLayout({ children, showBottomNav = true }: MobileLayoutProps) {
  return (
    <div className="flex justify-center w-full min-h-screen bg-gray-200">
      <div className="relative flex flex-col w-full max-w-[400px] h-[100dvh] bg-background shadow-2xl overflow-hidden">
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          {children}
        </main>
        {showBottomNav && <BottomNav />}
      </div>
    </div>
  );
}
