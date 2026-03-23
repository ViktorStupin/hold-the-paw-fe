// schemas/pet.create.ts
import { basePetSchema } from './pet.base.shema';
import { photoSchema } from '../primitives.schema';
import z from 'zod';

export const MAX_PHOTOS = 6;

export const photosSchema = z
  .array(photoSchema)
  .min(1, 'Завантажте хоча б 1 фото')
  .max(MAX_PHOTOS, 'Максимум 6 фото');

export const createPetShema = basePetSchema.extend({
  photos: photosSchema,
});

export type TCreatePet = z.infer<typeof createPetShema>;

export const ReqeustPetShema = basePetSchema.extend({
  main_image: photoSchema,
  additional_images: z.array(photoSchema).default([]),
  is_sterilized: z.boolean(),
  is_active: z.boolean(),
  is_helped: z.boolean(),
});

export type TRequestPet = z.infer<typeof ReqeustPetShema>;
