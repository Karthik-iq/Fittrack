/**
 * Workout Service (Mock CRUD & Aggregations with LocalStorage persistence)
 */

import { INITIAL_WORKOUTS } from './mockData';
import { getTodayDateString, getLast7Days, getLast30Days } from '../utils/dateUtils';

const WORKOUTS_KEY = 'fittrack_workouts';

const loadWorkouts = () => {
  const data = localStorage.getItem(WORKOUTS_KEY);
  if (!data) {
    localStorage.setItem(WORKOUTS_KEY, JSON.stringify(INITIAL_WORKOUTS));
    return INITIAL_WORKOUTS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_WORKOUTS;
  }
};

const saveWorkouts = (workouts) => {
  localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
};

export const workoutService = {
  getAll: () => {
    return loadWorkouts();
  },

  getById: (id) => {
    const workouts = loadWorkouts();
    return workouts.find((w) => w.id === id) || null;
  },

  create: (workoutData) => {
    const workouts = loadWorkouts();
    const newWorkout = {
      id: `wo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      workout_name: workoutData.workout_name,
      category: workoutData.category,
      duration: Number(workoutData.duration),
      calories_burned: Number(workoutData.calories_burned),
      workout_date: workoutData.workout_date || getTodayDateString(),
    };
    const updated = [newWorkout, ...workouts];
    saveWorkouts(updated);
    return newWorkout;
  },

  update: (id, workoutData) => {
    const workouts = loadWorkouts();
    let updatedWorkout = null;
    const updatedList = workouts.map((w) => {
      if (w.id === id) {
        updatedWorkout = {
          ...w,
          ...workoutData,
          duration: Number(workoutData.duration),
          calories_burned: Number(workoutData.calories_burned),
        };
        return updatedWorkout;
      }
      return w;
    });
    saveWorkouts(updatedList);
    return updatedWorkout;
  },

  delete: (id) => {
    const workouts = loadWorkouts();
    const updated = workouts.filter((w) => w.id !== id);
    saveWorkouts(updated);
    return true;
  },

  // Module 3: Daily Progress calculation dynamically computed from workouts
  getDailyProgress: (date = getTodayDateString()) => {
    const workouts = loadWorkouts();
    const todayWorkouts = workouts.filter((w) => w.workout_date === date);
    const total_workouts = todayWorkouts.length;
    const total_calories = todayWorkouts.reduce((sum, w) => sum + (Number(w.calories_burned) || 0), 0);
    const total_duration = todayWorkouts.reduce((sum, w) => sum + (Number(w.duration) || 0), 0);

    return {
      date,
      total_workouts,
      total_calories,
      total_duration,
    };
  },

  // Module 5: Weekly Workout Summary (Calories burned per day over last 7 days)
  getWeeklySummary: () => {
    const workouts = loadWorkouts();
    const last7Days = getLast7Days();

    return last7Days.map(({ date, day }) => {
      const dayWorkouts = workouts.filter((w) => w.workout_date === date);
      const calories = dayWorkouts.reduce((sum, w) => sum + (Number(w.calories_burned) || 0), 0);
      const minutes = dayWorkouts.reduce((sum, w) => sum + (Number(w.duration) || 0), 0);
      const count = dayWorkouts.length;
      return {
        date,
        day,
        calories,
        minutes,
        count,
      };
    });
  },

  // Module 5: Monthly Progress Report (Workout duration over last 30 days)
  getMonthlyProgress: () => {
    const workouts = loadWorkouts();
    const last30Days = getLast30Days();

    return last30Days.map(({ date, label }) => {
      const dayWorkouts = workouts.filter((w) => w.workout_date === date);
      const duration = dayWorkouts.reduce((sum, w) => sum + (Number(w.duration) || 0), 0);
      const calories = dayWorkouts.reduce((sum, w) => sum + (Number(w.calories_burned) || 0), 0);
      return {
        date,
        label,
        duration,
        calories,
      };
    });
  },

  // Category breakdown for analytics
  getCategoryBreakdown: () => {
    const workouts = loadWorkouts();
    const breakdown = {
      Cardio: 0,
      Strength: 0,
      Yoga: 0,
    };

    workouts.forEach((w) => {
      if (breakdown[w.category] !== undefined) {
        breakdown[w.category] += 1;
      }
    });

    return Object.entries(breakdown).map(([name, value]) => ({ name, value }));
  },
};
