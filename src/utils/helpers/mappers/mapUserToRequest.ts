import type { TUser } from '@/schemas/user/user.form.schema';
import type { TUserRequest } from '@/schemas/user/user.request.shema';

export function mapUserToRequest(data: TUser): TUserRequest {
  if (data.role === 'shelter') {
    return {
      role: 'shelter',
      phone_number: data.phone_number,
      viber_phone_number: data.viber_phone_number,
      telegram_nickname: data.telegram_nickname,
      company_name: data.company_name,
      tax_id: data.tax_id,
    };
  }

  return {
    role: 'personal',
    phone_number: data.phone_number,
    viber_phone_number: data.viber_phone_number,
    telegram_nickname: data.telegram_nickname,
    full_name: data.full_name,
  };
}
