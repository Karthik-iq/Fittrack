import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { notificationService } from '../services/notificationService';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const refreshNotifications = () => {
    const list = notificationService.getAll();
    setNotifications([...list]);
  };

  useEffect(() => {
    refreshNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const addNotification = (title, message, showToast = true) => {
    const newNotif = notificationService.add({ title, message });
    refreshNotifications();
    if (showToast) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-slate-800 border border-emerald-500/30 shadow-2xl rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4`}
        >
          <div className="flex-1 w-0">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <div className="h-9 w-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  ⚡
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="mt-1 text-xs text-slate-300">{message}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-slate-700 pl-3 ml-3">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-xs text-slate-400 hover:text-white focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      ), { duration: 4000 });
    }
    return newNotif;
  };

  const markAsRead = (id) => {
    notificationService.markAsRead(id);
    refreshNotifications();
  };

  const markAllAsRead = () => {
    notificationService.markAllAsRead();
    refreshNotifications();
    toast.success('All notifications marked as read', {
      style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
    });
  };

  const deleteNotification = (id) => {
    notificationService.delete(id);
    refreshNotifications();
  };

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refreshNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
