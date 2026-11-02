import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { WorkoutProvider } from './context/WorkoutContext';
import { GoalProvider } from './context/GoalContext';

export function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <WorkoutProvider>
          <GoalProvider>
            {/* Global SPA Router */}
            <RouterProvider router={router} />

            {/* React Hot Toast integration for Module 6 */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: {
                  background: '#0f172a',
                  color: '#f8fafc',
                  border: '1px solid #1e293b',
                  fontSize: '13px',
                  borderRadius: '12px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                },
                success: {
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#0f172a',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#f43f5e',
                    secondary: '#0f172a',
                  },
                },
              }}
            />
          </GoalProvider>
        </WorkoutProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
