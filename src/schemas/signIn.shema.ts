// src/schemas/signUp.schema.ts
import { z } from 'zod';
import { passwordShema } from './primitives.schema';


export const signInSchema = z.object({
  email: z.email('Невірний email'),
  password: passwordShema,
});

export type SignInData = z.infer<typeof signInSchema>;
