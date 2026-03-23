// schemas/pet.myCard.ts
import { z } from 'zod';
import { petResponseSchema } from './pet.response.shema.ts';

export const myPetCardSchema = petResponseSchema.pick({
  id: true,
  name: true,
  location: true,
  status: true,
}).extend({
  main_image: z.string(),
  is_active: z.boolean(),
  is_helped: z.boolean(),
});

export type TMyPetCard = z.infer<typeof myPetCardSchema>;
