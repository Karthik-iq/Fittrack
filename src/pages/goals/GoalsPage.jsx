import React, { useState } from 'react';
import {
  Target,
  Plus,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Trash2,
  Sparkles,
  Footprints,
  Flame,
  Award,
} from 'lucide-react';
import { useGoals } from '../../context/GoalContext';
import { AddGoalModal } from './AddGoalModal';
import { UpdateProgressModal } from './UpdateProgressModal';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { formatDate } from '../../utils/dateUtils';

export const GoalsPage = () => {
  const { goals, addGoal, updateGoalProgress, deleteGoal } = useGoals();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [updatingGoal, setUpdatingGoal] = useState(null);

  const completedGoals = goals.filter((g) => Number(g.current_value) >= Number(g.target_value));
  const activeGoals = goals.filter((g) => Number(g.current_value) < Number(g.target_value));

  const getGoalIcon = (type) => {
    switch (type) {
      case 'Steps':
        return <Footprints className="w-5 h-5 text-blue-400" />;
      case 'Weight Loss':
        return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Muscle Gain':
        return <Award className="w-5 h-5 text-purple-400" />;
      default:
        return <Target className="w-5 h-5 text-emerald-400" />;
    }
  };

  const handleDelete = (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type} goal?`)) {
      deleteGoal(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Target className="w-7 h-7 text-emerald-400" />
            Goal Setting & Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Establish fitness milestones, compare targets against real output, and increment progress.
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="shadow-lg shadow-emerald-500/20">
          <Plus className="w-4 h-4 mr-2" />
          Set New Goal
        </Button>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-slate-900/80 border-slate-800 p-5">
          <span className="text-[11px] font-semibold uppercase text-slate-400">Total Targets</span>
          <p className="text-2xl font-black text-white mt-1">{goals.length}</p>
          <p className="text-xs text-slate-400 mt-1">All time created</p>
        </Card>
        <Card className="bg-slate-900/80 border-slate-800 p-5">
          <span className="text-[11px] font-semibold uppercase text-slate-400">In Progress</span>
          <p className="text-2xl font-black text-emerald-400 mt-1">{activeGoals.length}</p>
          <p className="text-xs text-slate-400 mt-1">Actively tracking towards completion</p>
        </Card>
        <Card className="bg-slate-900/80 border-slate-800 p-5">
          <span className="text-[11px] font-semibold uppercase text-slate-400">Completed Milestones</span>
          <p className="text-2xl font-black text-teal-400 mt-1">{completedGoals.length}</p>
          <p className="text-xs text-slate-400 mt-1">100% targets conquered</p>
        </Card>
      </div>

      {/* Active Goals Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          Active Targets & Visual Progress Bars
        </h2>

        {goals.length === 0 ? (
          <Card className="p-12 text-center bg-slate-900/60 border-slate-800">
            <Target className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No fitness goals configured</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-5">
              Target setting helps keep you accountable. Create a weight loss, muscle gain, or daily steps target now.
            </p>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Define Your First Goal
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {goals.map((goal) => {
              const current = Number(goal.current_value) || 0;
              const target = Number(goal.target_value) || 1;
              const isCompleted = current >= target;
              const percent = Math.min(100, Math.round((current / target) * 100));

              return (
                <Card
                  key={goal.id}
                  className={`bg-slate-900/90 border transition-all flex flex-col justify-between ${
                    isCompleted
                      ? 'border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    {/* Goal Card Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/60">
                          {getGoalIcon(goal.goal_type)}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white">{goal.goal_type}</h3>
                          <span className="text-[11px] text-slate-400 font-mono">
                            Goal ID: {goal.id}
                          </span>
                        </div>
                      </div>

                      {isCompleted ? (
                        <Badge variant="success" className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Achieved
                        </Badge>
                      ) : (
                        <Badge variant="default">In Progress</Badge>
                      )}
                    </div>

                    {/* Progress Bar & Value Display */}
                    <div className="mt-6 space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-semibold uppercase text-slate-400">
                          Progress
                        </span>
                        <span className="text-base font-bold text-white font-mono">
                          {current}{' '}
                          <span className="text-xs text-slate-400 font-normal">
                            / {target} {goal.unit}
                          </span>
                        </span>
                      </div>

                      <ProgressBar
                        value={current}
                        max={target}
                        showPercentage={true}
                        color={
                          goal.goal_type === 'Steps'
                            ? 'blue'
                            : goal.goal_type === 'Weight Loss'
                            ? 'emerald'
                            : 'purple'
                        }
                        height="md"
                      />
                    </div>

                    {/* Deadline info */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>Deadline: {formatDate(goal.deadline)}</span>
                      </div>
                      <span className="font-semibold text-slate-300">{percent}%</span>
                    </div>
                  </div>

                  {/* Actions: Update Progress & Delete */}
                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <Button
                      variant={isCompleted ? 'secondary' : 'primary'}
                      size="sm"
                      onClick={() => setUpdatingGoal(goal)}
                      className="flex-1"
                    >
                      <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                      {isCompleted ? 'Add Surplus' : 'Update Progress'}
                    </Button>

                    <button
                      onClick={() => handleDelete(goal.id, goal.goal_type)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete Goal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Goal Modal */}
      <AddGoalModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGoal={async (data) => {
          addGoal(data);
        }}
      />

      {/* Update Progress Modal */}
      <UpdateProgressModal
        isOpen={Boolean(updatingGoal)}
        onClose={() => setUpdatingGoal(null)}
        goal={updatingGoal}
        onUpdateProgress={async (id, inc) => {
          updateGoalProgress(id, inc);
        }}
      />
    </div>
  );
};
