import type { TUser } from '@/schemas/user/user.form.schema';

export function mapUserToForm(user: TUser): TUser {
  if (user.role === 'personal') {
    return {
      ...user,
      full_name: user.full_name ?? '',
      viber_phone_number: user.viber_phone_number ?? '',
      telegram_nickname: user.telegram_nickname ?? '',
    };
  }

  return {
    ...user,
    company_name: user.company_name ?? '',
    tax_id: user.tax_id ?? '',
    viber_phone_number: user.viber_phone_number ?? '',
    telegram_nickname: user.telegram_nickname ?? '',
  };
}
