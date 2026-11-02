# FitTrack - Fitness & Workout Management Platform 🏋️‍♂️

A modern, production-grade Single Page Application (SPA) frontend built with **React**, **Vite**, **Tailwind CSS**, **Recharts**, and **React Hook Form + Zod**.

## 🚀 Features & Modules

- **Global Layout Shell**: Responsive sidebar navigation (Dashboard, Workouts, Goals, Analytics, Settings), top bar with dynamic breadcrumbs, notification bell with unread badge counter, and authenticated user profile dropdown with sign-out.
- **Module 1: Authentication**: Register and Login pages validated with **Zod**, generating simulated JWT tokens saved directly to `localStorage` (`fittrack_token`), guarded by `ProtectedRoute`.
- **Module 2: Workout Management**: Full CRUD data table, category tags (`Cardio`, `Strength`, `Yoga`), search and filtering, and add/edit modal forms with immediate global state persistence.
- **Module 3: Daily Progress Dashboard**: KPI summary cards automatically calculated by filtering mock workout data for today's date (`Total Workouts Today`, `Calories Burned Today`, `Active Training Time`).
- **Module 4: Goal Setting System**: Target tracking with visual progress bars (`Weight Loss`, `Muscle Gain`, `Steps`), target deadline countdowns, and an **Update Progress** increment modal that fires milestone alerts when target values are reached.
- **Module 5: Reports & Analytics**: Interactive visual analytics powered by **Recharts**, featuring a 7-day Weekly Workout Summary Bar Chart (Calories Burned), a 30-day Monthly Progress Line Chart (Workout Duration), and a Category Breakdown Donut Chart.
- **Module 6: Notifications System**: Reactive notification badge in top bar, drop-down notification log, and integrated **React Hot Toast** popups on key user actions (workout logged, milestone reached, data synced).
- **Deployment Ready**: Out-of-the-box SPA configuration for **Vercel** (`vercel.json`) and **Netlify** (`netlify.toml`).

## 🛠️ Tech Stack

- **Framework**: React 18 (Vite)
- **Routing**: React Router DOM (v6) with nested routes & Protected Route guards
- **Styling**: Tailwind CSS with custom dark athlete theme
- **Icons**: Lucide React
- **Forms & Validation**: React Hook Form + Zod (`@hookform/resolvers/zod`)
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **Storage**: Browser LocalStorage Mock Data Engine

## 💻 Quick Start

```bash
# Navigate to project directory
cd fittrack

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔐 Demo Credentials
- **Email**: `alex.morgan@fittrack.io`
- **Password**: `password123`
*(Or click "Fill Demo Creds" on the Login screen for instant 1-click test)*
