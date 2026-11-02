import React, { useState } from 'react';
import { PlusCircle, TrendingUp, CheckCircle } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';

export const UpdateProgressModal = ({ isOpen, onClose, goal, onUpdateProgress }) => {
  const [increment, setIncrement] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!goal) return null;

  const currentVal = Number(goal.current_value) || 0;
  const targetVal = Number(goal.target_value) || 1;
  const incVal = Number(increment) || 0;
  const projectedVal = Math.min(targetVal, currentVal + incVal);
  const isGoalFinished = projectedVal >= targetVal;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!incVal || incVal <= 0) return;

    setIsSubmitting(true);
    try {
      await onUpdateProgress(goal.id, incVal);
      setIncrement('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickPresets = goal.goal_type === 'Steps'
    ? [1000, 2500, 5000]
    : [0.25, 0.5, 1.0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Update Progress: ${goal.goal_type}`}
      description="Record progress increment towards your target value."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current status preview */}
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-750">
          <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
            <span>Current Status</span>
            <span className="font-bold text-white font-mono">
              {currentVal} / {targetVal} {goal.unit}
            </span>
          </div>
          <ProgressBar
            value={projectedVal}
            max={targetVal}
            showPercentage={true}
            color="emerald"
          />
        </div>

        {/* Quick increment presets */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Quick Add Preset
          </label>
          <div className="grid grid-cols-3 gap-2">
            {quickPresets.map((val) => (
              <button
                type="button"
                key={val}
                onClick={() => setIncrement(val.toString())}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-emerald-400 transition-all flex items-center justify-center gap-1 active:scale-95"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                +{val} {goal.unit}
              </button>
            ))}
          </div>
        </div>

        {/* Custom increment input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Custom Increment Amount ({goal.unit})
          </label>
          <input
            type="number"
            step="any"
            min="0.01"
            required
            placeholder={`e.g. ${goal.goal_type === 'Steps' ? '3000' : '0.5'}`}
            value={increment}
            onChange={(e) => setIncrement(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {isGoalFinished && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-2 text-xs">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>This increment will achieve 100% completion of your goal! 🎉</span>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting} disabled={!incVal || incVal <= 0}>
            <TrendingUp className="w-4 h-4 mr-1.5" />
            Apply Increment
          </Button>
        </div>
      </form>
    </Modal>
  );
};
