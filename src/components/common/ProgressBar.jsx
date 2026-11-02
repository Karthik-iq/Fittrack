import React from 'react';
import { cn } from '../../utils/cn';

export const ProgressBar = ({
  value = 0,
  max = 100,
  showPercentage = true,
  color = 'emerald',
  height = 'md',
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100))) || 0;

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colors = {
    emerald: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    blue: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    amber: 'bg-gradient-to-r from-amber-500 to-orange-400',
    purple: 'bg-gradient-to-r from-purple-500 to-indigo-400',
  };

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      <div className={cn('w-full bg-slate-700/60 rounded-full overflow-hidden p-0.5', heights[height])}>
        <div
          className={cn('rounded-full transition-all duration-500 ease-out h-full', colors[color] || colors.emerald)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
          <span>{percentage}% completed</span>
          <span>{value} / {max}</span>
        </div>
      )}
    </div>
  );
};
