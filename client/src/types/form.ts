import { registrationSchema, loginSchema } from '../validation/zodSchemas';
import { z } from 'zod';

export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
