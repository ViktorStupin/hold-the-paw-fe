import { USER_ROLE } from '@/types/UserRole';
import type { TUser } from '@/schemas/user/user.form.schema';

export const isPersonalUser = (user: TUser) => user.role === USER_ROLE.personal;

export const isShelterUser = (user: TUser) => user.role === USER_ROLE.shelter;
