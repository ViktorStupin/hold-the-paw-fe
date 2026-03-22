import { isPersonalUser, isShelterUser } from '@/utils/helpers/guards/userType';
import { USER_ROLE_LABEL_UA } from '@/constants/role.labes';
import type { TUser } from '@/types/User';
import { USER_ROLE, type TUserRole } from '@/types/UserRole';
import type { TEditableFieldName } from '@/schemas/editProfile.schema';

export type TFieldConfig = {
  getLabel: (user: TUser) => string;
  getValue: (user: TUser) => string;
  fieldName?: (user: TUser) => TEditableFieldName;
  hideFor?: TUserRole;
  isEditable?: boolean;
};

export const allProfileFields: TFieldConfig[] = [
  {
    getLabel: () => 'Роль',
    getValue: (user) => USER_ROLE_LABEL_UA[user.role],
    fieldName: () => 'role',
    isEditable: false,
  },
  {
    getLabel: (user) => (isPersonalUser(user) ? 'ПІБ' : 'Назва компанії'),
    getValue: (user) => (isPersonalUser(user) ? user.full_name : user.company_name),
    fieldName: (user) => (isPersonalUser(user) ? 'full_name' : 'company_name'),
    isEditable: true,
  },
  {
    getLabel: () => 'Пошта',
    getValue: (user) => user.email,
    isEditable: false,
  },
  {
    getLabel: () => 'ЄДРПОУ',
    getValue: (user) => (isShelterUser(user) ? user.tax_id : '—'),
    fieldName: () => 'tax_id',
    hideFor: USER_ROLE.personal,
    isEditable: true,
  },

  {
    getLabel: () => 'Номер телефону',
    getValue: (user) => user.phone_number,
    fieldName: () => 'phone_number',
    isEditable: true,
  },
  {
    getLabel: () => 'Вайбер',
    getValue: (user) => user.viber_phone_number ?? '-',
    fieldName: () => 'viber_phone_number',
    isEditable: true,
  },
  {
    getLabel: () => 'Телеграм',
    getValue: (user) => user.telegram_nickname ?? '-',
    fieldName: () => 'telegram_nickname',
    isEditable: true,
  },
];

export const mainFields = allProfileFields.slice(0, 4);
export const contactsFields = allProfileFields.slice(4);
