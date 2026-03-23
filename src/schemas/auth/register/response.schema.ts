// schemas/auth/register.response.schema.ts
import { z } from 'zod';
import { basePayload, personalShema, shelterShema } from './payload.schema';

const baseRegisterResponseSchema = basePayload
  .pick({
    email: true,
    phone_number: true,
  })
  .extend({
    id: z.number(),
  });

export const registerPersonalResponseSchema = baseRegisterResponseSchema.extend(personalShema);

export const registerShelterResponseSchema = baseRegisterResponseSchema.extend(shelterShema);

export type TRegisterPersonalResponse = z.infer<typeof registerPersonalResponseSchema>;
export type TRegisterShelterResponse = z.infer<typeof registerShelterResponseSchema>;
