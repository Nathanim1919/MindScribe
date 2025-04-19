import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from '../../validation/zodSchemas';
import { Input } from '../ui/Input';
import { MdNavigateNext } from 'react-icons/md';
import { authClient } from '../../lib/authClient';
import { useCallback, useState } from 'react';
import { RegistrationFormData } from '../../types/form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from '@tanstack/react-router';

export const RegistrationForm: React.FC = () => {
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = useCallback(
    async (data: RegistrationFormData) => {
      try {
        setSubmitError('');
        const res = await authClient.signUp.email(data);

        if (res?.error) {
          setSubmitError(res.error.message || 'Failed to sign up.');
          return;
        }

        console.log('✅ Registration successful:', res);

        // Navigate to dashboard
        navigate({ to: '/in/home' });
      } catch (error: any) {
        console.error('❌ Error during registration:', error);
        setSubmitError(error?.message || 'Something went wrong. Please try again.');
      }
    },
    [navigate]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[80%] flex flex-col gap-4 p-10 rounded-lg"
    >
      <div>
        <h2 className="text-4xl font-bold mb-2">Create your account</h2>
        <p className="text-light-50/70">Begin your reflective journey</p>
      </div>

      <Input
        label="Full Name"
        id="name"
        placeholder="Enter your Full Name"
        autoComplete="off"
        autoFocus
        {...register('name')}
        error={errors.name?.message}
      />

      <Input
        label="Email"
        id="email"
        placeholder="Enter your email"
        autoComplete="off"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        id="password"
        placeholder="••••••••"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />

      <Input
        label="Confirm Password"
        id="confirmPassword"
        placeholder="••••••••"
        type="password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />

      {submitError && (
        <p className="text-red-500 text-sm text-center">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`bg-violet-500 group cursor-pointer text-light-50 flex items-center justify-center rounded-md p-2 w-full hover:bg-violet-600 transition-all duration-300 ${
          isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
            Signing up...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            Sign Up
            <MdNavigateNext className="transition-all duration-300 ml-2 text-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1" />
          </div>
        )}
      </button>

      <p className="text-center text-sm mt-4">
        Already have an account?{' '}
        <a
          href="/login"
          className="text-violet-500 hover:underline font-medium"
        >
          Sign In
        </a>
      </p>
    </form>
  );
};
