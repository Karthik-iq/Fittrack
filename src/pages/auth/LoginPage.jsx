import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, Flame, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

// Strict validation schema using Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long'),
});

export const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'alex.morgan@fittrack.io',
      password: 'password123',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await login(data);
      toast.success('Welcome back, Athlete!', {
        style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
      });
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Login failed. Please verify credentials.', {
        style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setValue('email', 'alex.morgan@fittrack.io');
    setValue('password', 'password123');
    toast('Demo credentials auto-filled', { icon: '✨' });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glowing spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-xl shadow-emerald-500/20 mb-4">
          <Flame className="w-8 h-8 text-slate-950 fill-slate-950" />
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Sign In to FitTrack
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Enter your credentials to access your fitness metrics
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-slate-900/90 border border-slate-800 py-8 px-6 shadow-2xl rounded-3xl sm:px-10 backdrop-blur-xl">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <Input
              label="Email Address"
              type="email"
              placeholder="athlete@example.com"
              leftIcon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              {...register('email')}
            />

            {/* Password Field */}
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center text-slate-400 select-none cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-800 mr-2"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Fill Demo Creds
              </button>
            </div>

            <Button
              type="submit"
              className="w-full text-base py-3"
              isLoading={isSubmitting}
            >
              Sign In to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* Security note */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Mock JWT token stored securely in localStorage</span>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-slate-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
