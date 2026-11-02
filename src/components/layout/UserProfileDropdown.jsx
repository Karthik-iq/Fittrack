import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, ShieldCheck, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate('/login');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 pl-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700/60 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
      >
        <div className="flex flex-col text-right hidden sm:block">
          <span className="text-xs font-semibold text-slate-100 leading-tight">
            {user?.name || 'Athlete'}
          </span>
          <span className="text-[10px] text-emerald-400 font-medium">
            {user?.role || 'Pro Member'}
          </span>
        </div>
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
          alt={user?.name || 'User Avatar'}
          className="w-8 h-8 rounded-lg object-cover ring-2 ring-emerald-500/40"
        />
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-750 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-3 border-b border-slate-800">
            <p className="text-sm font-semibold text-white">{user?.name}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md w-fit">
              <ShieldCheck className="w-3 h-3" />
              <span>JWT Session Authenticated</span>
            </div>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/settings');
              }}
              className="w-full flex items-center px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Settings className="w-4 h-4 mr-2.5 text-slate-400" />
              Account Settings
            </button>
          </div>

          <div className="border-t border-slate-800 pt-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2.5" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
