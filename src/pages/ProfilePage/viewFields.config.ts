import { isPersonalUser, isShelterUser } from '@/utils/helpers/guards/userType';
import { USER_ROLE_LABEL_UA } from '@/constants/role.labes';
import { USER_ROLE, type TUserRole } from '@/types/UserRole';
import type { TUser } from '@/schemas/user/user.form.schema';

export type TViewFieldConfig = {
  getLabel: (user: TUser) => string;
  getValue: (user: TUser) => string;
  hideFor?: TUserRole;
};

export const allProfileFields: TViewFieldConfig[] = [
  {
    getLabel: () => 'Роль',
    getValue: (user) => USER_ROLE_LABEL_UA[user.role],
  },

  {
    getLabel: (user) => (isPersonalUser(user) ? 'ПІБ' : 'Назва компанії'),
    getValue: (user) =>
      isPersonalUser(user) ? user.full_name : user.company_name,
  },

  {
    getLabel: () => 'Пошта',
    getValue: (user) => user.email,
  },

  {
    getLabel: () => 'ЄДРПОУ',
    getValue: (user) => (isShelterUser(user) ? user.tax_id : '—'),
    hideFor: USER_ROLE.personal,
  },

  {
    getLabel: () => 'Номер телефону',
    getValue: (user) => user.phone_number,
  },

  {
    getLabel: () => 'Вайбер',
    getValue: (user) => user.viber_phone_number || '-',
  },

  {
    getLabel: () => 'Телеграм',
    getValue: (user) => user.telegram_nickname || '-',
  },
];

export const mainFields = allProfileFields.slice(0, 4);
export const contactsFields = allProfileFields.slice(4);