import { registrationSchema } from "../validation/zodSchemas";
import { z } from "zod";


export type RegistrationFormData = z.infer<typeof registrationSchema>;