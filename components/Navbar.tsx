
import React, { useState } from 'react';
import { User, Role } from '../types';

interface NavbarProps {
  user: User | null;
  currentView: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onViewChange: (view: 'DASHBOARD' | 'PROGRAMS' | 'RESEARCH' | 'HOME') => void;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  currentView, 
  searchQuery, 
  onSearchChange, 
  onViewChange, 
  onLoginClick, 
  onLogout 
}) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleLogoClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
      onViewChange(user ? 'DASHBOARD' : 'HOME');
    }, 300);
  };

  const NavItem = ({ label, view }: { label: string, view: 'DASHBOARD' | 'PROGRAMS' | 'RESEARCH' | 'HOME' }) => (
    <button
      onClick={() => onViewChange(view)}
      className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all px-3 py-1.5 rounded-lg ${
        currentView === view 
          ? 'text-black bg-gray-100/80' 
          : 'text-gray-400 hover:text-black hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <nav className="bg-white/80 backdrop-blur-3xl border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1700px] mx-auto px-10">
        <div className="flex justify-between h-20 items-center gap-8">
          {/* Logo Section */}
          <div className="flex items-center gap-10 shrink-0">
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={handleLogoClick}
            >
              <div 
                className={`w-11 h-11 bg-black rounded-2xl flex items-center justify-center text-white font-black text-2xl transition-transform duration-300 ease-in-out shadow-xl shadow-black/10 ${isRotating ? 'rotate-[360deg]' : 'group-hover:scale-105'}`}
              >
                M
              </div>
              <div className="ml-4 hidden sm:block">
                <span className="text-xl font-black text-[#1D1D1F] tracking-tighter block leading-none">MGCC</span>
                <p className="text-[8px] font-black uppercase text-gray-400 tracking-[0.3em] mt-1">Academic Suite</p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-2">
              <NavItem label="Home" view="HOME" />
              {user && <NavItem label="Dashboard" view="DASHBOARD" />}
              <NavItem label="Programs" view="PROGRAMS" />
              <NavItem label="Research" view="RESEARCH" />
            </div>
          </div>

          {/* Search Bar Section */}
          <div className="flex-1 max-w-xl relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search programs, research articles..."
              className="w-full bg-gray-100/50 border border-transparent focus:bg-white focus:border-gray-200 pl-12 pr-6 py-3 rounded-2xl text-xs font-bold placeholder-gray-400 outline-none transition-all shadow-sm group-hover:bg-gray-100"
            />
          </div>

          {/* User Auth Section */}
          <div className="flex items-center gap-6 shrink-0">
            {user ? (
              <div className="flex items-center gap-6">
                <div className="text-right hidden xl:block">
                  <p className="text-xs font-black text-[#1D1D1F] leading-none mb-1">{user.name}</p>
                  <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-none">{user.role}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="bg-gray-100 hover:bg-black hover:text-white text-gray-600 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-black text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
