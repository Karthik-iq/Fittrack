import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Dumbbell,
  Flame,
  Clock,
  Calendar,
  Activity,
  HeartPulse,
} from 'lucide-react';
import { useWorkouts } from '../../context/WorkoutContext';
import { WorkoutModal } from './WorkoutModal';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { formatDate } from '../../utils/dateUtils';

export const WorkoutsPage = () => {
  const { workouts, addWorkout, updateWorkout, deleteWorkout } = useWorkouts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);

  // Filter and search
  const filteredWorkouts = useMemo(() => {
    return workouts.filter((w) => {
      const matchesSearch =
        w.workout_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || w.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [workouts, searchQuery, selectedCategory]);

  const handleOpenAddModal = () => {
    setEditingWorkout(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (workout) => {
    setEditingWorkout(workout);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (values) => {
    if (editingWorkout) {
      updateWorkout(editingWorkout.id, values);
    } else {
      addWorkout(values);
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}"?`)) {
      deleteWorkout(id);
    }
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Cardio':
        return <Badge variant="info">Cardio</Badge>;
      case 'Strength':
        return <Badge variant="primary">Strength</Badge>;
      case 'Yoga':
        return <Badge variant="purple">Yoga & Flow</Badge>;
      default:
        return <Badge>{category}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Dumbbell className="w-7 h-7 text-emerald-400" />
            Workout Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Log, inspect, edit, and organize all your training sessions in real-time.
          </p>
        </div>
        <Button onClick={handleOpenAddModal} className="shadow-lg shadow-emerald-500/20">
          <Plus className="w-4 h-4 mr-2" />
          Log New Workout
        </Button>
      </div>

      {/* Quick Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4 bg-slate-900/60 border-slate-800">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Total Logged</p>
          <p className="text-xl font-bold text-white mt-1">{workouts.length} Sessions</p>
        </Card>
        <Card className="p-4 bg-slate-900/60 border-slate-800">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Cardio Sessions</p>
          <p className="text-xl font-bold text-blue-400 mt-1">
            {workouts.filter((w) => w.category === 'Cardio').length}
          </p>
        </Card>
        <Card className="p-4 bg-slate-900/60 border-slate-800">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Strength Sessions</p>
          <p className="text-xl font-bold text-emerald-400 mt-1">
            {workouts.filter((w) => w.category === 'Strength').length}
          </p>
        </Card>
        <Card className="p-4 bg-slate-900/60 border-slate-800">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Yoga Sessions</p>
          <p className="text-xl font-bold text-purple-400 mt-1">
            {workouts.filter((w) => w.category === 'Yoga').length}
          </p>
        </Card>
      </div>

      {/* Filters and Search Bar */}
      <Card className="p-4 bg-slate-900/80 border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by workout name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-750 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-slate-500 mr-1 hidden sm:block" />
          {['All', 'Cardio', 'Strength', 'Yoga'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Card>

      {/* Workouts Data Table */}
      <Card className="p-0 overflow-hidden bg-slate-900/80 border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-850/60 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                <th className="py-3.5 px-4 sm:px-6">Workout Session</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Burned</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-xs">
              {filteredWorkouts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    <Activity className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                    <p className="font-semibold text-slate-400 text-sm">No workouts found</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {searchQuery
                        ? 'Try clearing your search query'
                        : 'Click "Log New Workout" to record your first routine!'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredWorkouts.map((workout) => (
                  <tr
                    key={workout.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Name */}
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-200">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-slate-800 text-emerald-400 group-hover:scale-105 transition-transform">
                          <HeartPulse className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{workout.workout_name}</p>
                          <p className="text-[10px] text-slate-500 font-mono">ID: {workout.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">{getCategoryBadge(workout.category)}</td>

                    {/* Duration */}
                    <td className="py-3.5 px-4 text-slate-300 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{workout.duration} mins</span>
                      </div>
                    </td>

                    {/* Calories Burned */}
                    <td className="py-3.5 px-4 text-emerald-400 font-semibold font-mono">
                      <div className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400/20" />
                        <span>{workout.calories_burned} kcal</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{formatDate(workout.workout_date)}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(workout)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          title="Edit Workout"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(workout.id, workout.workout_name)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete Workout"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add / Edit Workout Modal */}
      <WorkoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingWorkout}
      />
    </div>
  );
};
