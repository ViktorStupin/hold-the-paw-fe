// schemas/pet.response.ts
import { z } from 'zod';
import { basePetSchema } from './pet.base.shema';
import { USER_ROLE } from '@/types/UserRole';

export const petResponseSchema = basePetSchema.extend({
  id: z.number(),
  is_active: z.boolean(),
  is_helped: z.boolean(),
  photos: z.array(z.string()),
  author: z.object({
    id: z.number(),
    email: z.string(),
    phone_number: z.string(),
    telegram_nickname: z.string(),
    role: z.enum(USER_ROLE),
  }),
});

export type TPetProfile = z.infer<typeof petResponseSchema>;
