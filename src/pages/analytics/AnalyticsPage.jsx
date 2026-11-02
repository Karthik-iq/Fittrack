import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Flame,
  Clock,
  PieChart as PieIcon,
  Activity,
  Calendar,
} from 'lucide-react';
import { useWorkouts } from '../../context/WorkoutContext';
import { Card, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import { getLast7Days, getLast30Days } from '../../utils/dateUtils';

export const AnalyticsPage = () => {
  const { workouts } = useWorkouts();

  // Module 5 Requirement 1: Weekly Workout Summary
  // Bar chart for calories burned over the last 7 days derived by aggregating mock workouts state
  const weeklyData = useMemo(() => {
    const days = getLast7Days();
    return days.map(({ date, day }) => {
      const dayWorkouts = workouts.filter((w) => w.workout_date === date);
      const calories = dayWorkouts.reduce((sum, w) => sum + (Number(w.calories_burned) || 0), 0);
      const duration = dayWorkouts.reduce((sum, w) => sum + (Number(w.duration) || 0), 0);
      const count = dayWorkouts.length;
      return {
        date,
        day,
        calories,
        duration,
        count,
      };
    });
  }, [workouts]);

  // Module 5 Requirement 2: Monthly Progress Report
  // Line chart for workout duration over the last 30 days derived by aggregating mock workouts state
  const monthlyData = useMemo(() => {
    const days = getLast30Days();
    return days.map(({ date, label }) => {
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
  }, [workouts]);

  // Category Distribution for pie/donut chart
  const categoryData = useMemo(() => {
    const categories = {
      Cardio: 0,
      Strength: 0,
      Yoga: 0,
    };
    workouts.forEach((w) => {
      if (categories[w.category] !== undefined) {
        categories[w.category] += 1;
      }
    });

    return [
      { name: 'Cardio', value: categories.Cardio, color: '#38bdf8' },
      { name: 'Strength', value: categories.Strength, color: '#22c55e' },
      { name: 'Yoga', value: categories.Yoga, color: '#c084fc' },
    ];
  }, [workouts]);

  // High level aggregated stats
  const totalCaloriesAllTime = workouts.reduce((s, w) => s + (Number(w.calories_burned) || 0), 0);
  const totalDurationAllTime = workouts.reduce((s, w) => s + (Number(w.duration) || 0), 0);
  const weeklyTotalCalories = weeklyData.reduce((s, d) => s + d.calories, 0);
  const weeklyTotalDuration = weeklyData.reduce((s, d) => s + d.duration, 0);

  // Custom tooltips for Recharts
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-750 p-3 rounded-xl shadow-xl text-xs">
          <p className="font-bold text-white mb-1">{payload[0]?.payload?.day} ({payload[0]?.payload?.date})</p>
          <p className="text-emerald-400 flex items-center gap-1.5 font-semibold">
            <Flame className="w-3.5 h-3.5" />
            Calories: {payload[0]?.value} kcal
          </p>
          <p className="text-slate-400 flex items-center gap-1.5 mt-0.5">
            <Clock className="w-3.5 h-3.5" />
            Duration: {payload[0]?.payload?.duration} mins
          </p>
          <p className="text-slate-400 mt-0.5">
            Sessions: {payload[0]?.payload?.count}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLineTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-750 p-3 rounded-xl shadow-xl text-xs">
          <p className="font-bold text-white mb-1">{payload[0]?.payload?.label}</p>
          <p className="text-blue-400 flex items-center gap-1.5 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            Duration: {payload[0]?.value} mins
          </p>
          <p className="text-emerald-400 flex items-center gap-1.5 mt-0.5">
            <Flame className="w-3.5 h-3.5" />
            Calories: {payload[0]?.payload?.calories} kcal
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
          <BarChart3 className="w-7 h-7 text-emerald-400" />
          Reports & Analytics Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Aggregated visual reports derived in real-time from your workout log history using Recharts.
        </p>
      </div>

      {/* Aggregate Overview KPI summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/80 border-slate-800 p-4">
          <span className="text-[11px] font-semibold uppercase text-slate-400">7-Day Burn</span>
          <p className="text-xl font-bold text-emerald-400 mt-1">{weeklyTotalCalories} kcal</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Past 7 days aggregated</p>
        </Card>
        <Card className="bg-slate-900/80 border-slate-800 p-4">
          <span className="text-[11px] font-semibold uppercase text-slate-400">7-Day Active Time</span>
          <p className="text-xl font-bold text-blue-400 mt-1">{weeklyTotalDuration} mins</p>
          <p className="text-[10px] text-slate-500 mt-0.5">{(weeklyTotalDuration / 60).toFixed(1)} training hours</p>
        </Card>
        <Card className="bg-slate-900/80 border-slate-800 p-4">
          <span className="text-[11px] font-semibold uppercase text-slate-400">All-Time Calories</span>
          <p className="text-xl font-bold text-orange-400 mt-1">{totalCaloriesAllTime} kcal</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Total energy expended</p>
        </Card>
        <Card className="bg-slate-900/80 border-slate-800 p-4">
          <span className="text-[11px] font-semibold uppercase text-slate-400">Total Workouts</span>
          <p className="text-xl font-bold text-white mt-1">{workouts.length} Sessions</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Logged in repository</p>
        </Card>
      </div>

      {/* Primary Chart 1: Weekly Workout Summary (Calories Burned - Bar Chart) */}
      <Card className="bg-slate-900/80 border-slate-800">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" />
              Weekly Workout Summary (Last 7 Days)
            </CardTitle>
            <CardDescription>
              Calories burned per day aggregated from the workout state
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <span>Weekly Burn: {weeklyTotalCalories} kcal</span>
          </div>
        </CardHeader>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="day" stroke="#64748b" tickLine={false} fontSize={12} />
              <YAxis stroke="#64748b" tickLine={false} fontSize={12} />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar
                dataKey="calories"
                name="Calories Burned (kcal)"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Grid: Monthly Progress (Line Chart) + Category Breakdown (Pie Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Progress Report (Line Chart for workout duration) */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-900/80 border-slate-800 h-full">
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Monthly Progress Report (Last 30 Days)
                </CardTitle>
                <CardDescription>
                  Workout duration (minutes) aggregated across the 30-day timeline
                </CardDescription>
              </div>
            </CardHeader>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="label"
                    stroke="#64748b"
                    tickLine={false}
                    fontSize={10}
                    interval={5}
                  />
                  <YAxis stroke="#64748b" tickLine={false} fontSize={12} />
                  <Tooltip content={<CustomLineTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="duration"
                    name="Duration (mins)"
                    stroke="#38bdf8"
                    strokeWidth={3}
                    dot={{ fill: '#0284c7', r: 3 }}
                    activeDot={{ r: 6, fill: '#38bdf8' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Workout Category Distribution (Donut Chart) */}
        <div>
          <Card className="bg-slate-900/80 border-slate-800 h-full flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieIcon className="w-5 h-5 text-purple-400" />
                Category Split
              </CardTitle>
              <CardDescription>Distribution across workout types</CardDescription>
            </CardHeader>

            <div className="h-56 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend indicators */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-slate-300 font-medium">{cat.name}</span>
                  </div>
                  <span className="font-bold text-white font-mono">{cat.value} sessions</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
