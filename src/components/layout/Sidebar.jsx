import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Dumbbell,
  Target,
  BarChart3,
  Settings,
  Flame,
  X,
} from 'lucide-react';
import { cn } from '../../utils/cn';

const navigationLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Workouts', path: '/workouts', icon: Dumbbell },
  { name: 'Goals', path: '/goals', icon: Target },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const content = (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800/80 px-4 py-5 select-none">
      {/* Brand Logo */}
      <div className="flex items-center justify-between px-2 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Flame className="w-6 h-6 text-slate-950 fill-slate-950" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-white tracking-tight flex items-center gap-1.5">
              FitTrack
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">
                PRO
              </span>
            </span>
            <p className="text-[11px] text-slate-400 font-medium">Fitness Management</p>
          </div>
        </div>

        {/* Mobile close button */}
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 space-y-1.5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
          Menu
        </p>
        {navigationLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group',
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      'w-5 h-5 transition-colors',
                      isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'
                    )}
                  />
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Promo / System status banner */}
      <div className="mt-auto pt-4 border-t border-slate-800/80">
        <div className="rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-850 p-3.5 border border-slate-700/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-white mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Local Sync Active</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            All workouts, goals, and metrics are securely synced to browser mock storage.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop permanent sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 z-30">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] z-50">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
