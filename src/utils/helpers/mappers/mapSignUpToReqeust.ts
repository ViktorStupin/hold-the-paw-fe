import type { TSignUpFields } from '@/schemas/auth/register/payload.schema';
import { USER_ROLE } from '@/types/UserRole';

export function mapSignUpToRequest(data: TSignUpFields) {
  if (data.role === USER_ROLE.personal) {

    return {
      email: data.email,
      password: data.password,
      phone_number: data.phone_number,
      first_name: data.full_name,
      last_name: 'temp'
    };
  }

  return {
    email: data.email,
    password: data.password,
    phone_number: data.phone_number,
    company_name: data.company_name,
    tax_id: data.tax_id,
  };
}