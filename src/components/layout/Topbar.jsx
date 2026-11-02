import React from 'react';
import { Menu } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';
import { UserProfileDropdown } from './UserProfileDropdown';
import { NotificationDropdown } from './NotificationDropdown';

export const Topbar = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 sm:px-6 backdrop-blur-md">
      {/* Left side: Hamburger (mobile) + Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Breadcrumbs />
      </div>

      {/* Right side: Notification Bell + User Profile */}
      <div className="flex items-center gap-3">
        <NotificationDropdown />
        <div className="h-6 w-px bg-slate-800 mx-1 hidden sm:block" />
        <UserProfileDropdown />
      </div>
    </header>
  );
};
