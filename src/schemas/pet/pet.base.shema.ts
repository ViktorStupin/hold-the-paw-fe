// schemas/pet.base.ts
import { z } from 'zod';
import {
  PET_TYPE,
  PET_BREED,
  PET_AGE,
  PET_GENDER,
  PET_SIZE,
  PET_COLOR,
  PET_STATUS,
} from '@/types/PetFileds';
import { locationSchema, nameSchema, optionalStringWithMin } from '../primitives.schema';

export const basePetSchema = z.object({
  name: nameSchema,
  location: locationSchema,
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
