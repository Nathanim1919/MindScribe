// utils/zodSchemas.ts
import { z } from 'zod';

export const registrationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm Password is required'),
});
export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email'),
});
export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });
export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, 'Old Password is required'),
    newPassword: z.string().min(6, 'New Password is required'),
    confirmPassword: z.string().min(6, 'Confirm Password is required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
  });
