// schemas/auth/register.payload.schema.ts
import { z } from 'zod';
import { ukrainianPhoneShema, nameSchema, erdpouShema } from '../../primitives.schema';
import { credentialsSchema } from '../credentials.shema';
import { USER_ROLE } from '@/types/UserRole';

export const basePayload = credentialsSchema.extend({
  phone_number: ukrainianPhoneShema,
  terms_accepted: z.boolean().refine((value) => value === true, {
    message: 'Потрібно прийняти умови угоди',
  }),
});

export const personalShema = {
  role: z.literal(USER_ROLE.personal),
  full_name: nameSchema,
};

export const shelterShema = {
  role: z.literal(USER_ROLE.shelter),
  company_name: nameSchema,
  tax_id: erdpouShema,
};

export const registerPersonalPayloadSchema = basePayload.extend({
  ...personalShema,
});

export const registerShelterPayloadSchema = basePayload.extend({
  ...shelterShema,
});

export type TRegisterPersonalPayload = z.infer<typeof registerPersonalPayloadSchema>;
export type TRegisterShelterPayload = z.infer<typeof registerShelterPayloadSchema>;

export const signUpSchema = z.discriminatedUnion('role', [
  registerPersonalPayloadSchema,
  registerShelterPayloadSchema,
]);

export type TSignUpFields = z.infer<typeof signUpSchema>;
