import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dumbbell, Flame, Clock, Calendar, Tag } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { getTodayDateString } from '../../utils/dateUtils';

const workoutSchema = z.object({
  workout_name: z.string().min(2, 'Workout name must be at least 2 characters'),
  category: z.enum(['Cardio', 'Strength', 'Yoga'], {
    errorMap: () => ({ message: 'Please select a valid category' }),
  }),
  duration: z
    .number({ invalid_type_error: 'Duration is required and must be a number' })
    .min(1, 'Duration must be at least 1 minute')
    .max(600, 'Duration cannot exceed 600 minutes'),
  calories_burned: z
    .number({ invalid_type_error: 'Calories burned is required and must be a number' })
    .min(1, 'Calories must be at least 1')
    .max(5000, 'Calories cannot exceed 5000'),
  workout_date: z.string().min(1, 'Workout date is required'),
});

export const WorkoutModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const isEditing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      workout_name: '',
      category: 'Strength',
      duration: 45,
      calories_burned: 350,
      workout_date: getTodayDateString(),
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        workout_name: initialData.workout_name,
        category: initialData.category,
        duration: Number(initialData.duration),
        calories_burned: Number(initialData.calories_burned),
        workout_date: initialData.workout_date,
      });
    } else {
      reset({
        workout_name: '',
        category: 'Strength',
        duration: 45,
        calories_burned: 350,
        workout_date: getTodayDateString(),
      });
    }
  }, [initialData, reset, isOpen]);

  const handleFormSubmit = async (values) => {
    await onSubmit(values);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Workout Session' : 'Log New Workout'}
      description={
        isEditing
          ? 'Update the parameters and metrics for this workout.'
          : 'Record your completed training session to update daily progress.'
      }
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Workout Name */}
        <Input
          label="Workout Name"
          placeholder="e.g. Upper Body Hypertrophy or 5K Morning Run"
          leftIcon={<Dumbbell className="w-4 h-4" />}
          error={errors.workout_name?.message}
          {...register('workout_name')}
        />

        {/* Category Select */}
        <div className="w-full space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Category
          </label>
          <div className="relative">
            <select
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none"
              {...register('category')}
            >
              <option value="Cardio">Cardio (Running, Cycling, HIIT)</option>
              <option value="Strength">Strength (Weightlifting, Calisthenics)</option>
              <option value="Yoga">Yoga & Mobility (Vinyasa, Pilates)</option>
            </select>
            <Tag className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
          </div>
          {errors.category && (
            <p className="text-xs text-rose-400 font-medium">{errors.category.message}</p>
          )}
        </div>

        {/* Duration & Calories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Duration (minutes)"
            type="number"
            placeholder="45"
            leftIcon={<Clock className="w-4 h-4" />}
            error={errors.duration?.message}
            {...register('duration', { valueAsNumber: true })}
          />

          <Input
            label="Calories Burned (kcal)"
            type="number"
            placeholder="350"
            leftIcon={<Flame className="w-4 h-4" />}
            error={errors.calories_burned?.message}
            {...register('calories_burned', { valueAsNumber: true })}
          />
        </div>

        {/* Workout Date */}
        <Input
          label="Date of Workout"
          type="date"
          leftIcon={<Calendar className="w-4 h-4" />}
          error={errors.workout_date?.message}
          {...register('workout_date')}
        />

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {isEditing ? 'Save Changes' : 'Log Workout'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
