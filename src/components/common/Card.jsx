import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({ className, children, hover = false, ...props }) => {
  return (
    <div
      className={cn(
        'bg-slate-800/80 border border-slate-750/70 rounded-2xl p-6 shadow-sm backdrop-blur-md',
        hover && 'transition-all duration-200 hover:border-slate-600 hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }) => {
  return (
    <div className={cn('flex items-center justify-between pb-4 border-b border-slate-700/60 mb-5', className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3 className={cn('text-base font-semibold text-white tracking-tight', className)} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ className, children, ...props }) => {
  return (
    <p className={cn('text-xs text-slate-400 mt-1', className)} {...props}>
      {children}
    </p>
  );
};
