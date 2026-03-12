// src/schemas/signUp.schema.ts
import { z } from 'zod';


export const signInSchema = z.object({
  email: z.email('Невірний email'),
  password: z.string().min(8, 'Мінімум 8 символів').max(32, 'Максимум 32 символа'),
});

export type SignInData = z.infer<typeof signInSchema>;
