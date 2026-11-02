/**
 * Goal Service (Mock CRUD & Progress tracking with LocalStorage persistence)
 */

import { INITIAL_GOALS } from './mockData';

const GOALS_KEY = 'fittrack_goals';

const loadGoals = () => {
  const data = localStorage.getItem(GOALS_KEY);
  if (!data) {
    localStorage.setItem(GOALS_KEY, JSON.stringify(INITIAL_GOALS));
    return INITIAL_GOALS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_GOALS;
  }
};

const saveGoals = (goals) => {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
};

export const goalService = {
  getAll: () => {
    return loadGoals();
  },

  create: (goalData) => {
    const goals = loadGoals();
    const newGoal = {
      id: `goal_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      goal_type: goalData.goal_type,
      target_value: Number(goalData.target_value),
      current_value: Number(goalData.current_value) || 0,
      unit: goalData.unit || (goalData.goal_type === 'Steps' ? 'steps' : 'kg'),
      deadline: goalData.deadline,
    };
    const updated = [newGoal, ...goals];
    saveGoals(updated);
    return newGoal;
  },

  updateProgress: (id, incrementAmount) => {
    const goals = loadGoals();
    let updatedGoal = null;
    let milestoneReached = false;

    const updatedList = goals.map((g) => {
      if (g.id === id) {
        const prevValue = Number(g.current_value);
        const newValue = Math.min(Number(g.target_value), Number((prevValue + Number(incrementAmount)).toFixed(2)));
        if (newValue >= Number(g.target_value) && prevValue < Number(g.target_value)) {
          milestoneReached = true;
        }
        updatedGoal = {
          ...g,
          current_value: newValue,
        };
        return updatedGoal;
      }
      return g;
    });

    saveGoals(updatedList);
    return { updatedGoal, milestoneReached };
  },

  delete: (id) => {
    const goals = loadGoals();
    const updated = goals.filter((g) => g.id !== id);
    saveGoals(updated);
    return true;
  },
};
