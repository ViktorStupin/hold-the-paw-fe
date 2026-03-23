import z from 'zod';

const NAME_REGEX = /^[\p{L}\s\-’']+$/u;
const MAX_20MB = 20 * 1024 * 1024;

export const ALLOWED_IMAGE_MIME = ['image/jpeg', 'image/png', 'image/heic', 'image/heif'] as const;

export const ukrainianPhoneShema = z
  .string()
  .regex(/^\+380\d{9}$/, 'Невірний формат. Приклад: +380991234567');

export const telegramNameShema = z.string().regex(/^@[\w]{3,}$/, 'Формат: @username');

export const passwordShema = z.string().min(8, 'Мінімум 8 символів').max(32, 'Максимум 32 символа');

export function optionalStringWithMin(min: number, message: string) {
  return z
    .string()
    .optional()
    .transform((val) => (val === '' ? undefined : val))
    .pipe(z.string().min(min, message).max(1024, 'Максимум 1024').optional());
}

export function optionalNormalizedSchema(schema: z.ZodString) {
  return z
    .string()
    .optional()
    .transform((val) => (val === '' ? undefined : val))
    .pipe(schema.optional());
}

export const nameSchema = z
  .string()
  .trim()
  .min(2, 'Введіть мінімум 2 символи')
  .max(32, 'Максимум 32 символи')
  .regex(NAME_REGEX, 'Лише літери, пробіли, дефіс або апостроф');

export const locationSchema = z
  .string()
  .trim()
  .min(2, 'Введіть мінімум 2 символи')
  .max(32, 'Максимум 32 символи');

export const photoSchema = z
  .instanceof(File)
  .refine(
    (f) => ALLOWED_IMAGE_MIME.includes(f.type as (typeof ALLOWED_IMAGE_MIME)[number]),
    'Дозволено: JPG/PNG/HEIC/HEIF'
  )
  .refine((f) => f.size <= MAX_20MB, 'Максимальний розмір 20MB');

export const erdpouShema = z.string().regex(/^\d{8}$/, 'ЄДРПОУ повинен містити 8 цифр');
