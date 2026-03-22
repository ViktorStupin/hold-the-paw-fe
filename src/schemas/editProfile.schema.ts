import z from 'zod';
import { telegramNameShema, ukrainianPhoneShema } from './primitives.schema';
import { personalSchema, shelterSchema } from './signUp.schema';

const baseEditFields = z.object({
  phone_number: ukrainianPhoneShema,
  viber_phone_number: ukrainianPhoneShema.optional(),
  telegram_nickname: telegramNameShema.optional(),
});

const extendedShelterEditShema = baseEditFields.extend(shelterSchema);
const extendedPersonalEditShema = baseEditFields.extend(personalSchema);

export const editProfileSchema = z.discriminatedUnion('role', [
  extendedPersonalEditShema,
  extendedShelterEditShema,
]);

export type TEditProfileFields = z.infer<typeof editProfileSchema>;

type PersonalKeys = keyof z.infer<typeof extendedPersonalEditShema>;
type ShelterKeys = keyof z.infer<typeof extendedShelterEditShema>;

export type TEditableFieldName = PersonalKeys | ShelterKeys;
