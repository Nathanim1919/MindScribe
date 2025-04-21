import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../validation/zodSchemas';
import { Input } from '../ui/Input';
import { MdNavigateNext } from 'react-icons/md';
import { authClient } from '../../lib/authClient';
import { useCallback, useState } from 'react';
import { LoginFormData } from '../../types/form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

export const LoginForm: React.FC = () => {
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        setSubmitError('');
        const res = await authClient.signIn.email(data);

        if (res?.error) {
          setSubmitError(res.error.message || 'Failed to sign up.');
          return;
        }

        console.log('✅ Login successful:', res);

        // Navigate to dashboard
        navigate({ to: '/in/home' });
      } catch (error: any) {
        console.error('❌ Error during registration:', error);
        setSubmitError(
          error?.message || 'Something went wrong. Please try again.',
        );
      }
    },
    [navigate],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[80%] flex flex-col gap-4 p-10 rounded-lg"
    >
      <div>
        <h2 className="text-4xl font-bold mb-2">Welcome back</h2>
        <p className="dark:text-light-50/70">Continue your reflective journey</p>
      </div>

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

      {submitError && (
        <p className="text-red-500 text-sm text-center">{submitError}</p>
      )}

      <div className="flex justify-between items-center text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="accent-violet-500" />
          Remember me
        </label>
        <a href="#" className="text-violet-500 hover:underline">
          Forgot password?
        </a>
      </div>

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
            Signing In...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            Sign In
            <MdNavigateNext className="transition-all duration-300 ml-2 text-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1" />
          </div>
        )}
      </button>

      <p className="text-center text-sm mt-4">
        Don't have an account?{' '}
        <Link
          to={'/register'}
          className="text-violet-500 hover:underline font-medium"
        >
          Create one
        </Link>
      </p>
    </form>
  );
};
