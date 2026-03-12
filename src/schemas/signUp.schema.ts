// src/schemas/signUp.schema.ts
import { USER_ROLE } from '@/types/UserRole';
import { z } from 'zod';

const ukrainianPhone = z.string().regex(/^\+380\d{9}$/, 'Невірний формат. Приклад: +380991234567');

const baseSchema = z.object({
  email: z.email('Невірний email'),
  password: z.string().min(8, 'Мінімум 8 символів').max(32, 'Максимум 32 символа'),
  phone_number: ukrainianPhone,
  terms_accepted: z.boolean().refine((value) => value === true, {
    message: 'Потрібно прийняти умови угоди',
  }),
});

const personalSchema = baseSchema.extend({
  role: z.literal(USER_ROLE.personal),
  full_name: z.string().min(2, 'ПІБ мінімум 2 символи').max(32, 'Максимум 32 символа'),
});

const shelterSchema = baseSchema.extend({
  role: z.literal(USER_ROLE.shelter),
  company_name: z
    .string()
    .min(2, 'Назва компанії мінімум 2 символи')
    .max(32, 'Максимум 32 символа'),
  edrpou: z.string().regex(/^\d{8}$/, 'ЄДРПОУ повинен містити 8 цифр'),
});

export const signUpSchema = z.discriminatedUnion('role', [personalSchema, shelterSchema]);

export type SignUpData = z.infer<typeof signUpSchema>;
