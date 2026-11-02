import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-2xl mb-4">
        404
      </div>
      <h1 className="text-2xl font-black text-white">Page Not Found</h1>
      <p className="text-xs text-slate-400 max-w-sm mt-2 mb-6">
        The route you are looking for does not exist or has been relocated within FitTrack.
      </p>
      <Link to="/dashboard">
        <Button>
          <Home className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
};
