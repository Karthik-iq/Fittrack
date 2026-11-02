import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Target, Calendar, Award } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { getTodayDateString } from '../../utils/dateUtils';

const goalSchema = z.object({
  goal_type: z.enum(['Weight Loss', 'Muscle Gain', 'Steps'], {
    errorMap: () => ({ message: 'Please select a valid goal type' }),
  }),
  target_value: z
    .number({ invalid_type_error: 'Target value must be a number' })
    .min(0.1, 'Target must be greater than 0'),
  current_value: z
    .number({ invalid_type_error: 'Current value must be a number' })
    .min(0, 'Current value cannot be negative'),
  unit: z.string().min(1, 'Unit is required'),
  deadline: z.string().min(1, 'Target deadline is required'),
});

export const AddGoalModal = ({ isOpen, onClose, onAddGoal }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      goal_type: 'Weight Loss',
      target_value: 5,
      current_value: 0,
      unit: 'kg',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  });

  const selectedType = watch('goal_type');

  // Auto-adjust default unit based on selected goal type
  const handleTypeChange = (e) => {
    const type = e.target.value;
    setValue('goal_type', type);
    if (type === 'Steps') {
      setValue('unit', 'steps');
      setValue('target_value', 10000);
    } else {
      setValue('unit', 'kg');
      setValue('target_value', 5);
    }
  };

  const handleFormSubmit = async (values) => {
    await onAddGoal(values);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Fitness Target"
      description="Define an achievable fitness milestone and track your steady progression."
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Goal Type */}
        <div className="w-full space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Goal Category
          </label>
          <select
            className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
            {...register('goal_type')}
            onChange={handleTypeChange}
          >
            <option value="Weight Loss">Weight Loss (Fat reduction)</option>
            <option value="Muscle Gain">Muscle Gain (Hypertrophy / Lean mass)</option>
            <option value="Steps">Daily Steps (Movement consistency)</option>
          </select>
          {errors.goal_type && (
            <p className="text-xs text-rose-400 font-medium">{errors.goal_type.message}</p>
          )}
        </div>

        {/* Target and Current Value */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Target Value"
            type="number"
            step="any"
            placeholder={selectedType === 'Steps' ? '10000' : '5.0'}
            leftIcon={<Target className="w-4 h-4" />}
            error={errors.target_value?.message}
            {...register('target_value', { valueAsNumber: true })}
          />

          <Input
            label="Current Value (Starting)"
            type="number"
            step="any"
            placeholder="0"
            leftIcon={<Award className="w-4 h-4" />}
            error={errors.current_value?.message}
            {...register('current_value', { valueAsNumber: true })}
          />
        </div>

        {/* Measurement Unit */}
        <Input
          label="Unit of Measurement"
          placeholder="e.g. kg, lbs, steps"
          error={errors.unit?.message}
          {...register('unit')}
        />

        {/* Target Deadline */}
        <Input
          label="Target Deadline"
          type="date"
          min={getTodayDateString()}
          leftIcon={<Calendar className="w-4 h-4" />}
          error={errors.deadline?.message}
          {...register('deadline')}
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            Establish Goal
          </Button>
        </div>
      </form>
    </Modal>
  );
};
