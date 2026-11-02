/**
 * Notification Service (Mock notifications & unread alerts)
 */

import { INITIAL_NOTIFICATIONS } from './mockData';

const NOTIFICATIONS_KEY = 'fittrack_notifications';

const loadNotifications = () => {
  const data = localStorage.getItem(NOTIFICATIONS_KEY);
  if (!data) {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
    return INITIAL_NOTIFICATIONS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_NOTIFICATIONS;
  }
};

const saveNotifications = (notifications) => {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
};

export const notificationService = {
  getAll: () => {
    return loadNotifications();
  },

  getUnreadCount: () => {
    const list = loadNotifications();
    return list.filter((n) => !n.is_read).length;
  },

  add: ({ title, message }) => {
    const list = loadNotifications();
    const newNotification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title,
      message,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    const updated = [newNotification, ...list];
    saveNotifications(updated);
    return newNotification;
  },

  markAsRead: (id) => {
    const list = loadNotifications();
    const updated = list.map((n) => (n.id === id ? { ...n, is_read: true } : n));
    saveNotifications(updated);
    return updated;
  },

  markAllAsRead: () => {
    const list = loadNotifications();
    const updated = list.map((n) => ({ ...n, is_read: true }));
    saveNotifications(updated);
    return updated;
  },

  delete: (id) => {
    const list = loadNotifications();
    const updated = list.filter((n) => n.id !== id);
    saveNotifications(updated);
    return updated;
  },
};
