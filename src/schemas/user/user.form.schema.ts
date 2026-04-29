import z from 'zod';
import { personalShema, shelterShema } from '../auth/register/payload.schema';
import {
  nullableNormalizedSchema,
  telegramNameShema,
  ukrainianPhoneShema,
} from '../primitives.schema';

const baseUserSchema = z.object({
  phone_number: ukrainianPhoneShema,
  email: z.email(),
  viber_phone_number: nullableNormalizedSchema(ukrainianPhoneShema),
  telegram_nickname: nullableNormalizedSchema(telegramNameShema),
});

export const extendedShelterSchema = baseUserSchema.extend(shelterShema);
export const extendedPersonalSchema = baseUserSchema.extend(personalShema);

export const userSchema = z.discriminatedUnion('role', [
  extendedShelterSchema,
  extendedPersonalSchema,
]);

export type TUser = z.infer<typeof userSchema>;

type PersonalKeys = keyof z.infer<typeof extendedPersonalSchema>;
type ShelterKeys = keyof z.infer<typeof extendedShelterSchema>;

export type TUserFieldsName = PersonalKeys | ShelterKeys;
