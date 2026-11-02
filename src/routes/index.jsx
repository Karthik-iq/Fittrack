import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layout & Protected Route Wrapper
import { AppLayout } from '../components/layout/AppLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { GuestRoute } from '../components/auth/GuestRoute';

// Module 1: Auth Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';

// Module 2 & 3: Workouts & Daily Dashboard
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { WorkoutsPage } from '../pages/workouts/WorkoutsPage';

// Module 4: Goals
import { GoalsPage } from '../pages/goals/GoalsPage';

// Module 5: Analytics
import { AnalyticsPage } from '../pages/analytics/AnalyticsPage';

// Settings & Fallback
import { SettingsPage } from '../pages/settings/SettingsPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  // Public / Guest Auth Routes (redirects to /dashboard if mock JWT exists)
  {
    path: '/login',
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
  },

  // Protected Dashboard Application Shell Routes
  // ProtectedRoute inspects localStorage for mocked JWT token ('fittrack_token'), redirecting to /login if absent
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'workouts',
        element: <WorkoutsPage />,
      },
      {
        path: 'goals',
        element: <GoalsPage />,
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },

  // 404 Catch-All Route
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
