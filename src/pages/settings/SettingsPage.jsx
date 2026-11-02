import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Key,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  Database,
  Cloud,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useWorkouts } from '../../context/WorkoutContext';
import { useGoals } from '../../context/GoalContext';
import { useNotifications } from '../../context/NotificationContext';
import { Card, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { INITIAL_WORKOUTS, INITIAL_GOALS, INITIAL_NOTIFICATIONS } from '../../services/mockData';

export const SettingsPage = () => {
  const { user } = useAuth();
  const { refreshWorkouts } = useWorkouts();
  const { refreshGoals } = useGoals();
  const { refreshNotifications } = useNotifications();

  const [copiedToken, setCopiedToken] = useState(false);
  const token = localStorage.getItem('fittrack_token') || 'No active JWT token found.';

  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
    setCopiedToken(true);
    toast.success('Mock JWT copied to clipboard!');
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all mock workouts, goals, and notifications back to initial demo seeds?')) {
      localStorage.setItem('fittrack_workouts', JSON.stringify(INITIAL_WORKOUTS));
      localStorage.setItem('fittrack_goals', JSON.stringify(INITIAL_GOALS));
      localStorage.setItem('fittrack_notifications', JSON.stringify(INITIAL_NOTIFICATIONS));

      refreshWorkouts();
      refreshGoals();
      refreshNotifications();

      toast.success('Mock data restored to default demo state!');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
          <SettingsIcon className="w-7 h-7 text-emerald-400" />
          Settings & Environment
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review authenticated user credentials, inspect mocked JWT payload, and manage local storage cache.
        </p>
      </div>

      {/* User Profile Card */}
      <Card className="bg-slate-900/80 border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-400" />
            Authenticated Athlete Profile
          </CardTitle>
          <CardDescription>Current user session details</CardDescription>
        </CardHeader>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt="Avatar"
            className="w-20 h-20 rounded-2xl object-cover ring-2 ring-emerald-500/40"
          />
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-white">{user?.name}</h3>
              <span className="text-xs bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-semibold self-center sm:self-auto">
                {user?.role || 'Pro Member'}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">{user?.email}</p>
            <p className="text-xs text-slate-500">Member since {user?.joinDate || 'Jan 2024'}</p>
          </div>
        </div>
      </Card>

      {/* Mock JWT Token Inspector */}
      <Card className="bg-slate-900/80 border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-emerald-400" />
            Mock JWT Token Storage
          </CardTitle>
          <CardDescription>
            Stored in localStorage key <code className="text-emerald-400">fittrack_token</code> for Protected Route validation
          </CardDescription>
        </CardHeader>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              Base64 Encoded (Header.Payload.Signature)
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyToken}
              className="text-xs"
            >
              {copiedToken ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  Copy Token
                </>
              )}
            </Button>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-[11px] text-slate-300 break-all select-all leading-relaxed max-h-32 overflow-y-auto">
            {token}
          </div>
        </div>
      </Card>

      {/* Reset Mock Data & Deployment Readiness */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="bg-slate-900/80 border-slate-800 flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-orange-400" />
                Data Reset Utility
              </CardTitle>
              <CardDescription>Restore original mock workouts & goals</CardDescription>
            </CardHeader>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              If you modified, edited, or deleted records during testing and want to revert to the initial seed state, use this button.
            </p>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={handleResetData}
            className="w-full"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-2" />
            Restore Initial Mock Data
          </Button>
        </Card>

        <Card className="bg-slate-900/80 border-slate-800 flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-blue-400" />
                Deployment Architecture
              </CardTitle>
              <CardDescription>Ready for Vercel & Netlify</CardDescription>
            </CardHeader>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Configured with SPA client-side routing fallback rewrites in <code className="text-blue-400">vercel.json</code> and <code className="text-blue-400">netlify.toml</code>.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>Zero build errors & ready for immediate production deploy</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
