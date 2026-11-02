/**
 * Authentication Service (Mock API & Storage)
 */

import { INITIAL_USER } from './mockData';

const TOKEN_KEY = 'fittrack_token';
const USER_KEY = 'fittrack_user';

// Helper to generate a realistic JWT mock token
const generateFakeJWT = (user) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      name: user.name,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
    })
  );
  const signature = btoa('mock-fittrack-signature-secret-key-2026');
  return `${header}.${payload}.${signature}`;
};

export const authService = {
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  isAuthenticated: () => {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },

  login: async ({ email, password }) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Simple mock validation check
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const user = {
      ...INITIAL_USER,
      email,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    };

    const token = generateFakeJWT(user);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return { user, token };
  },

  register: async ({ name, email, password }) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const user = {
      id: `usr_${Date.now()}`,
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=16a34a,10b981`,
      role: 'Member Athlete',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    const token = generateFakeJWT(user);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return { user, token };
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
