import { z } from 'zod';
import {
  ANIMAL_TYPE,
  PET_AGE,
  PET_BREED,
  PET_COLOR,
  PET_SEX,
  PET_SIZE,
  PET_STATUS,
} from '../types/PetFileds';

const NAME_REGEX = /^[\p{L}\s\-’']+$/u;
const MAX_20MB = 20 * 1024 * 1024;
export const MAX_PHOTOS = 6;


export const ALLOWED_IMAGE_MIME = [
  'image/jpeg',
  'image/png',
  'image/heic',
  'image/heif',
] as const;

function optionalStringWithMin(min: number, message: string) {
  return z
    .string()
    .optional()
    .transform((val) => (val === '' ? undefined : val))
    .pipe(z.string().min(min, message).max(1024, 'Максимум 1024').optional());
}

const nameSchema = z
  .string()
  .trim()
  .min(2, 'Введіть мінмум 2 символи')
  .max(32, 'Максимум 32 символи')
  .regex(NAME_REGEX, 'Лише літери, пробіли, дефіс або апостроф');

const locationSchema = z
  .string()
  .trim()
  .min(2, 'Мінімум 2 символи')
  .max(32, 'Максимум 32 символи');

export const photoSchema = z
  .instanceof(File)
  .refine((f) => ALLOWED_IMAGE_MIME.includes(f.type as (typeof ALLOWED_IMAGE_MIME)[number]), 'Дозволено: JPG/PNG/HEIC/HEIF')
  .refine((f) => f.size <= MAX_20MB, 'Максимальний розмір 20MB');

export const photosSchema = z
  .array(photoSchema)
  .min(1, 'Завантажте хоча б 1 фото')
  .max(MAX_PHOTOS, 'Максимум 6 фото');

export const PetProfileSchema = z.object({
  name: nameSchema,
  location: locationSchema,
  photos: photosSchema,

  status: z.enum(PET_STATUS, { message: 'Оберіть статус' }),
  sex: z.enum(PET_SEX, { message: 'Оберіть стать' }),
  age: z.enum(PET_AGE, { message: 'Оберіть вік' }),
  breed: z.enum(PET_BREED, { message: 'Оберіть породу' }),
  size: z.enum(PET_SIZE, { message: 'Оберіть розмір' }),
  animalType: z.enum(ANIMAL_TYPE, { message: 'Оберіть тип тварини' }),

  color: z.enum(PET_COLOR, { message: 'Оберіть окрас' }),
  special_needs: z.boolean({ message: 'Оберіть чи є особливі потреби' }),
  has_passport: z.boolean({ message: 'Оберіть чи є паспорт' }),
  is_vaccinated: z.boolean({ message: 'Оберіть чи вакцинована' }),

  story: optionalStringWithMin(2, 'Мінімум 2 символи'),
  about: optionalStringWithMin(2, 'Мінімум 2 символи'),
});

export type PetProfileFormValues = z.infer<typeof PetProfileSchema>;
