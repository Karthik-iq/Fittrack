/**
 * Initial Mock Data for FitTrack
 */

import { getTodayDateString } from '../utils/dateUtils';

const today = getTodayDateString();

// Helper to get past dates (days ago)
const getPastDate = (daysAgo) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

export const INITIAL_USER = {
  id: 'usr_98124',
  name: 'Alex Morgan',
  email: 'alex.morgan@fittrack.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Pro Athlete Member',
  joinDate: 'Jan 2024',
};

export const INITIAL_WORKOUTS = [
  {
    id: 'wo_1',
    workout_name: 'Morning HIIT Cardio Blast',
    category: 'Cardio',
    duration: 45,
    calories_burned: 420,
    workout_date: today,
  },
  {
    id: 'wo_2',
    workout_name: 'Upper Body Hypertrophy',
    category: 'Strength',
    duration: 60,
    calories_burned: 510,
    workout_date: today,
  },
  {
    id: 'wo_3',
    workout_name: 'Vinyasa Flow & Deep Stretch',
    category: 'Yoga',
    duration: 35,
    calories_burned: 180,
    workout_date: getPastDate(1),
  },
  {
    id: 'wo_4',
    workout_name: 'Outdoor Trail Run',
    category: 'Cardio',
    duration: 50,
    calories_burned: 560,
    workout_date: getPastDate(2),
  },
  {
    id: 'wo_5',
    workout_name: 'Leg Day & Deadlifts',
    category: 'Strength',
    duration: 65,
    calories_burned: 580,
    workout_date: getPastDate(3),
  },
  {
    id: 'wo_6',
    workout_name: 'Ashtanga Power Yoga',
    category: 'Yoga',
    duration: 40,
    calories_burned: 210,
    workout_date: getPastDate(4),
  },
  {
    id: 'wo_7',
    workout_name: 'Sprint Intervals',
    category: 'Cardio',
    duration: 30,
    calories_burned: 380,
    workout_date: getPastDate(5),
  },
  {
    id: 'wo_8',
    workout_name: 'Chest & Triceps Focus',
    category: 'Strength',
    duration: 55,
    calories_burned: 460,
    workout_date: getPastDate(6),
  },
  {
    id: 'wo_9',
    workout_name: 'Core & Mobility Session',
    category: 'Yoga',
    duration: 30,
    calories_burned: 160,
    workout_date: getPastDate(9),
  },
  {
    id: 'wo_10',
    workout_name: 'Cycling Endurance Ride',
    category: 'Cardio',
    duration: 75,
    calories_burned: 690,
    workout_date: getPastDate(14),
  },
  {
    id: 'wo_11',
    workout_name: 'Back & Biceps Heavy Day',
    category: 'Strength',
    duration: 55,
    calories_burned: 490,
    workout_date: getPastDate(18),
  },
  {
    id: 'wo_12',
    workout_name: 'Evening Restorative Yoga',
    category: 'Yoga',
    duration: 45,
    calories_burned: 190,
    workout_date: getPastDate(24),
  },
];

export const INITIAL_GOALS = [
  {
    id: 'goal_1',
    goal_type: 'Weight Loss',
    target_value: 5, // kg
    current_value: 3.2,
    unit: 'kg',
    deadline: getPastDate(-30), // 30 days in future
  },
  {
    id: 'goal_2',
    goal_type: 'Steps',
    target_value: 12000, // daily steps
    current_value: 9450,
    unit: 'steps',
    deadline: getPastDate(-15),
  },
  {
    id: 'goal_3',
    goal_type: 'Muscle Gain',
    target_value: 4, // kg lean muscle
    current_value: 2.1,
    unit: 'kg',
    deadline: getPastDate(-60),
  },
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    title: 'Daily workout logged!',
    message: 'Great job! Morning HIIT Cardio Blast (420 kcal) was recorded.',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 mins ago
  },
  {
    id: 'notif_2',
    title: 'Goal milestone reached!',
    message: 'You have reached 64% of your Weight Loss goal! Keep going!',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hrs ago
  },
  {
    id: 'notif_3',
    title: 'Weekly Streak Maintained',
    message: '5 consecutive workout days logged this week. You are crushing it!',
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: 'notif_4',
    title: 'Hydration & Recovery Tip',
    message: 'Remember to drink at least 500ml water after intense cardio.',
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
];
