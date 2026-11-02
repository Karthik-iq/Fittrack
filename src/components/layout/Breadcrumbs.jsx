import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const routeNameMap = {
    dashboard: 'Dashboard',
    workouts: 'Workouts',
    goals: 'Goals & Milestones',
    analytics: 'Analytics & Reports',
    settings: 'Settings',
  };

  return (
    <nav className="flex items-center space-x-2 text-xs font-medium text-slate-400" aria-label="Breadcrumb">
      <Link
        to="/dashboard"
        className="flex items-center text-slate-400 hover:text-emerald-400 transition-colors"
      >
        <Home className="w-3.5 h-3.5 mr-1" />
        <span>FitTrack</span>
      </Link>

      {pathnames.map((segment, index) => {
        const isLast = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const name = routeNameMap[segment.toLowerCase()] || segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            {isLast ? (
              <span className="text-slate-100 font-semibold">{name}</span>
            ) : (
              <Link to={to} className="hover:text-emerald-400 transition-colors">
                {name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
