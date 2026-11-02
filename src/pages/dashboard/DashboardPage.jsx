import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Dumbbell,
  Clock,
  Target,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Award,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorkouts } from '../../context/WorkoutContext';
import { useGoals } from '../../context/GoalContext';
import { Card, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { WorkoutModal } from '../workouts/WorkoutModal';
import { getTodayDateString, formatDate } from '../../utils/dateUtils';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { workouts, addWorkout, getDailyProgress } = useWorkouts();
  const { goals } = useGoals();
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);

  const todayStr = getTodayDateString();
  // Module 3 requirement: automatically calculate by filtering mock Workout state for today's date
  const dailyProgress = getDailyProgress(todayStr);

  // Workouts done today
  const todayWorkoutsList = workouts.filter((w) => w.workout_date === todayStr);

  // Calorie target baseline (e.g. 700 kcal daily burn target)
  const dailyCalorieTarget = 700;
  const caloriePercent = Math.min(100, Math.round((dailyProgress.total_calories / dailyCalorieTarget) * 100));

  return (
    <div className="space-y-8">
      {/* Welcome & Motivational Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border border-emerald-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                FitTrack Intelligence Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ready to crush it today, {user?.name?.split(' ')[0] || 'Athlete'}?
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Track your daily output, keep your streak alive, and monitor how today's sessions push your long-term fitness goals forward.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsWorkoutModalOpen(true)}
              className="shadow-xl shadow-emerald-500/25 whitespace-nowrap"
            >
              <Plus className="w-4 h-4 mr-2" />
              Log Today's Workout
            </Button>
          </div>
        </div>
      </div>

      {/* Module 3: Daily Progress KPI Summary Cards (Calculated dynamically for today's date) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Daily Progress Dashboard
            </h2>
            <p className="text-xs text-slate-400">
              Live metrics filtered strictly for today ({formatDate(todayStr)})
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Today: {todayStr}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* KPI Card 1: Total Workouts Today */}
          <Card className="relative overflow-hidden bg-slate-900/80 border-slate-800 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Workouts Today
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Dumbbell className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-black text-white tracking-tight">
                {dailyProgress.total_workouts}
              </span>
              <span className="text-xs text-slate-400 ml-1.5 font-medium">sessions</span>
            </div>
            <div className="mt-3 text-xs text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {dailyProgress.total_workouts > 0
                  ? `${dailyProgress.total_workouts} completed routines logged`
                  : 'No sessions logged yet today'}
              </span>
            </div>
          </Card>

          {/* KPI Card 2: Calories Burned Today */}
          <Card className="relative overflow-hidden bg-slate-900/80 border-slate-800 hover:border-orange-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Calories Burned Today
              </span>
              <div className="w-9 h-9 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-black text-white tracking-tight">
                {dailyProgress.total_calories}
              </span>
              <span className="text-xs text-slate-400 ml-1.5 font-mono">kcal</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Burn Target: {dailyCalorieTarget} kcal</span>
                <span className="font-semibold text-emerald-400">{caloriePercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${caloriePercent}%` }}
                />
              </div>
            </div>
          </Card>

          {/* KPI Card 3: Active Training Time */}
          <Card className="relative overflow-hidden bg-slate-900/80 border-slate-800 hover:border-blue-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Training Time
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-black text-white tracking-tight">
                {dailyProgress.total_duration}
              </span>
              <span className="text-xs text-slate-400 ml-1.5 font-medium">minutes</span>
            </div>
            <div className="mt-3 text-xs text-slate-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>
                {dailyProgress.total_duration >= 45
                  ? 'Met recommended daily cardio threshold'
                  : 'Aim for 45 min daily active movement'}
              </span>
            </div>
          </Card>

          {/* KPI Card 4: Active Goals on Track */}
          <Card className="relative overflow-hidden bg-slate-900/80 border-slate-800 hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Goals
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-black text-white tracking-tight">
                {goals.length}
              </span>
              <span className="text-xs text-slate-400 ml-1.5 font-medium">targets</span>
            </div>
            <div className="mt-3 text-xs text-emerald-400 flex items-center gap-1.5">
              <Link to="/goals" className="hover:underline flex items-center gap-1 text-xs">
                <span>View all active targets</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Main Grid: Today's Workouts + Active Goals Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Logged Workouts & Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-900/80 border-slate-800">
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-emerald-400" />
                  Today's Recorded Sessions
                </CardTitle>
                <CardDescription>
                  Workouts recorded specifically for today ({todayStr})
                </CardDescription>
              </div>
              <Link
                to="/workouts"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
              >
                <span>View All History</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </CardHeader>

            <div className="space-y-3">
              {todayWorkoutsList.length === 0 ? (
                <div className="py-10 text-center text-slate-500 bg-slate-950/40 rounded-2xl border border-dashed border-slate-800">
                  <p className="text-sm font-semibold text-slate-400">
                    No workouts logged yet for today
                  </p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Record your morning run, gym lifting session, or yoga flow to update today's metrics.
                  </p>
                  <Button
                    onClick={() => setIsWorkoutModalOpen(true)}
                    size="sm"
                    className="mt-4"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Log First Workout
                  </Button>
                </div>
              ) : (
                todayWorkoutsList.map((workout) => (
                  <div
                    key={workout.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-xl bg-slate-800 text-emerald-400">
                        <Dumbbell className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{workout.workout_name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={
                              workout.category === 'Cardio'
                                ? 'info'
                                : workout.category === 'Strength'
                                ? 'primary'
                                : 'purple'
                            }
                          >
                            {workout.category}
                          </Badge>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            {workout.duration} mins
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-emerald-400 font-mono">
                        +{workout.calories_burned} kcal
                      </span>
                      <p className="text-[10px] text-slate-500">Recorded Today</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Goals Quick Progress Spotlight */}
        <div className="space-y-6">
          <Card className="bg-slate-900/80 border-slate-800">
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-400" />
                  Active Goals
                </CardTitle>
                <CardDescription>Track real-time completion</CardDescription>
              </div>
              <Link
                to="/goals"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                Manage
              </Link>
            </CardHeader>

            <div className="space-y-5">
              {goals.slice(0, 3).map((goal) => (
                <div key={goal.id} className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white">{goal.goal_type}</span>
                    <span className="text-[11px] font-mono text-emerald-400">
                      {goal.current_value} / {goal.target_value} {goal.unit}
                    </span>
                  </div>
                  <ProgressBar
                    value={goal.current_value}
                    max={goal.target_value}
                    showPercentage={true}
                    color={
                      goal.goal_type === 'Steps'
                        ? 'blue'
                        : goal.goal_type === 'Weight Loss'
                        ? 'emerald'
                        : 'purple'
                    }
                  />
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 text-center">
              <Link to="/analytics">
                <Button variant="outline" size="sm" className="w-full">
                  <TrendingUp className="w-3.5 h-3.5 mr-2" />
                  View Weekly Analytics
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Log Workout Modal */}
      <WorkoutModal
        isOpen={isWorkoutModalOpen}
        onClose={() => setIsWorkoutModalOpen(false)}
        onSubmit={async (values) => {
          addWorkout(values);
        }}
      />
    </div>
  );
};
