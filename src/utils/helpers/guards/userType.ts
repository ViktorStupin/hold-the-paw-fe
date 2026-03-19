import { USER_ROLE } from '@/types/UserRole';
import type { TUser, IPersonalUser, IShelterUser, } from '@/types/User';

export const isPersonalUser = (user: TUser): user is IPersonalUser =>
  user.role === USER_ROLE.personal;

export const isShelterUser = (user: TUser): user is IShelterUser =>
  user.role === USER_ROLE.shelter;
