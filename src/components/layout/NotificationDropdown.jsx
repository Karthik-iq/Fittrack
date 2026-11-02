import React, { useState, useRef, useEffect } from 'react';
import { Bell, CheckCheck, Trash2, Clock, Check } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { formatTime } from '../../utils/dateUtils';

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700/60 text-slate-300 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950 animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-750 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white">Notifications</h4>
              {unreadCount > 0 && (
                <span className="text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs">
                No notifications right now.
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 hover:bg-slate-800/50 transition-colors flex items-start gap-3 ${
                    !item.is_read ? 'bg-slate-800/30' : ''
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      !item.is_read ? 'bg-emerald-400 shadow-sm shadow-emerald-400' : 'bg-transparent'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs ${!item.is_read ? 'font-semibold text-white' : 'font-medium text-slate-300'}`}>
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      {item.message}
                    </p>
                    <span className="text-[10px] text-slate-500 mt-1 inline-flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {formatTime(item.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 opacity-80 hover:opacity-100">
                    {!item.is_read && (
                      <button
                        onClick={() => markAsRead(item.id)}
                        className="p-1 text-slate-400 hover:text-emerald-400 transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(item.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
