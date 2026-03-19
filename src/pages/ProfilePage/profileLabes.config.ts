// у ProfilePage.tsx або окремому файлі
import { isPersonalUser, isShelterUser } from '@/utils/helpers/guards/userType';
import type { TFieldConfig } from './ProfileInfoSection';
import { USER_ROLE_LABEL_UA } from '@/constants/role.labes';

export const mainFields: TFieldConfig[] = [
  {
    getLabel: () => 'Роль',
    getValue: (user) => USER_ROLE_LABEL_UA[user.role],
  },
  {
    getLabel: (user) => (isPersonalUser(user) ? 'ПІБ' : 'Назва компанії'),
    getValue: (user) => (isPersonalUser(user) ? user.full_name : user.company_name),
  },
  {
    getLabel: () => 'Пошта',
    getValue: (user) => user.email,
  },
  {
    getLabel: () => 'ЄДРПОУ',
    getValue: (user) => (isShelterUser(user) ? user.tax_id : '—'),
    hideFor: 'personal',
  },
];

export const contactsFields: TFieldConfig[] = [
  {
    getLabel: () => 'Номер телефону',
    getValue: (user) => user.phone_number,
  },
  {
    getLabel: () => 'Вайбер',
    getValue: (user) => user.viber_phone_number ?? '-',
  },
  {
    getLabel: () => 'Телеграм',
    getValue: (user) => user.telegram_nickname ?? '-',
  },
];
