// src/schemas/signUp.schema.ts
import { USER_ROLE } from '@/types/UserRole';
import { z } from 'zod';
import { erdpouShema, nameSchema, passwordShema, ukrainianPhoneShema } from './primitives.schema';

const baseSchema = z.object({
  email: z.email('Невірний email'),
  password: passwordShema,
  phone_number: ukrainianPhoneShema,
  terms_accepted: z.boolean().refine((value) => value === true, {
    message: 'Потрібно прийняти умови угоди',
  }),
});

export const personalSchema = {
  role: z.literal(USER_ROLE.personal),
  full_name: nameSchema,
};

export const shelterSchema = {
  role: z.literal(USER_ROLE.shelter),
  company_name: nameSchema,
  tax_id: erdpouShema,
};

const extendedShelterShema = baseSchema.extend(shelterSchema);
const extendedPersonalShema = baseSchema.extend(personalSchema);

export const signUpSchema = z.discriminatedUnion('role', [
  extendedPersonalShema,
  extendedShelterShema,
]);

export type SignUpData = z.infer<typeof signUpSchema>;
