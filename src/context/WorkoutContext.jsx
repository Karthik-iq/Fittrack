import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { workoutService } from '../services/workoutService';
import { useNotifications } from './NotificationContext';
import { getTodayDateString } from '../utils/dateUtils';

const WorkoutContext = createContext(null);

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  const refreshWorkouts = () => {
    const list = workoutService.getAll();
    setWorkouts([...list]);
  };

  useEffect(() => {
    refreshWorkouts();
    setLoading(false);
  }, []);

  const addWorkout = (workoutData) => {
    const newWorkout = workoutService.create(workoutData);
    refreshWorkouts();

    // Trigger Notification and Toast (Module 6 integration)
    addNotification(
      'Daily workout logged!',
      `Logged "${newWorkout.workout_name}" (${newWorkout.calories_burned} kcal burned)`
    );

    return newWorkout;
  };

  const updateWorkout = (id, workoutData) => {
    const updated = workoutService.update(id, workoutData);
    refreshWorkouts();
    toast.success('Workout updated successfully!', {
      style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
    });
    return updated;
  };

  const deleteWorkout = (id) => {
    workoutService.delete(id);
    refreshWorkouts();
    toast.success('Workout removed', {
      style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
    });
  };

  // Module 3: Daily progress automatically computed by filtering workouts for today's date
  const getDailyProgress = (date = getTodayDateString()) => {
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
  };

  const value = {
    workouts,
    loading,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    getDailyProgress,
    refreshWorkouts,
  };

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
};

export const useWorkouts = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkouts must be used within a WorkoutProvider');
  }
  return context;
};
