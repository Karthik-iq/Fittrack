import React from 'react';
import { cn } from '../../utils/cn';

export const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'bg-slate-700/60 text-slate-300 border-slate-600/40',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    primary: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    info: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    danger: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide',
        variants[variant] || variants.default,
        className
      )}
    >
      {children}
    </span>
  );
};
