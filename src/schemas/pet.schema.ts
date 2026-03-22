import { z } from 'zod';
import {
  PET_TYPE,
  PET_AGE,
  PET_BREED,
  PET_COLOR,
  PET_GENDER,
  PET_SIZE,
  PET_STATUS,
} from '../types/PetFileds';
import { locationSchema, nameSchema, optionalStringWithMin, photoSchema } from './primitives.schema';

export const MAX_PHOTOS = 6;

export const photosSchema = z
  .array(photoSchema)
  .min(1, 'Завантажте хоча б 1 фото')
  .max(MAX_PHOTOS, 'Максимум 6 фото');

export const PetProfileSchema = z.object({
  name: nameSchema,
  location: locationSchema,
  photos: photosSchema,

  status: z.enum(PET_STATUS, { message: 'Оберіть статус' }),
  gender: z.enum(PET_GENDER, { message: 'Оберіть стать' }),
  age: z.enum(PET_AGE, { message: 'Оберіть вік' }),
  breed: z.enum(PET_BREED, { message: 'Оберіть породу' }),
  size: z.enum(PET_SIZE, { message: 'Оберіть розмір' }),
  pet_type: z.enum(PET_TYPE, { message: 'Оберіть тип тварини' }),

  color: z.enum(PET_COLOR, { message: 'Оберіть окрас' }),
  special_needs: z.boolean({ message: 'Оберіть чи є особливі потреби' }),
  has_passport: z.boolean({ message: 'Оберіть чи є паспорт' }),
  is_vaccinated: z.boolean({ message: 'Оберіть чи вакцинована' }),

  story: optionalStringWithMin(20, 'Введіть мінімум 20 символи'),
  about: optionalStringWithMin(20, 'Введіть мінімум 20 символи'),
});

export type PetProfileFormValues = z.infer<typeof PetProfileSchema>;
