// schemas/pet.card.ts
import { z } from 'zod';
import { petResponseSchema } from './pet.response.shema.ts';

export const petCardSchema = petResponseSchema.pick({
  id: true,
  name: true,
  gender: true,
  age: true,
}).extend({
  main_image: z.string(),
  is_active: z.boolean(),
});

export type TPetCard = z.infer<typeof petCardSchema>;
