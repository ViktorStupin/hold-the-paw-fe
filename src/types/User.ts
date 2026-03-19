import { USER_ROLE } from "./UserRole";

 interface IUser {
  phone_number: string;
  telegram_nickname: string;
  viber_phone_number: string;
  email: string;
}

export interface IPersonalUser extends IUser {
  role: typeof USER_ROLE.personal;
  full_name: string;
}
export interface IShelterUser extends IUser {
  role: typeof USER_ROLE.shelter;
  tax_id: string;
  company_name: string;
}

export type TUser = IPersonalUser | IShelterUser;