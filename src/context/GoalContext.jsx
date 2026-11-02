import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { goalService } from '../services/goalService';
import { useNotifications } from './NotificationContext';

const GoalContext = createContext(null);

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  const refreshGoals = () => {
    const list = goalService.getAll();
    setGoals([...list]);
  };

  useEffect(() => {
    refreshGoals();
    setLoading(false);
  }, []);

  const addGoal = (goalData) => {
    const newGoal = goalService.create(goalData);
    refreshGoals();
    toast.success('New fitness goal established!', {
      style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
    });
    return newGoal;
  };

  const updateGoalProgress = (id, incrementAmount) => {
    const { updatedGoal, milestoneReached } = goalService.updateProgress(id, incrementAmount);
    refreshGoals();

    if (milestoneReached) {
      addNotification(
        'Goal milestone reached! 🎉',
        `Congratulations! You've achieved your target of ${updatedGoal.target_value} ${updatedGoal.unit} for ${updatedGoal.goal_type}!`
      );
    } else {
      toast.success(`Progress updated: +${incrementAmount} ${updatedGoal.unit}`, {
        style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
      });
    }

    return updatedGoal;
  };

  const deleteGoal = (id) => {
    goalService.delete(id);
    refreshGoals();
    toast.success('Goal deleted', {
      style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
    });
  };

  const value = {
    goals,
    loading,
    addGoal,
    updateGoalProgress,
    deleteGoal,
    refreshGoals,
  };

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
};

export const useGoals = () => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
};
