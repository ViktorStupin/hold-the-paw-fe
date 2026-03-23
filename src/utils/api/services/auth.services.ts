import type { TSignUpFields } from '@/schemas/auth/register/payload.schema';
import { client } from '../axiosClient';

import { tokenSchema, type TTokenResponse } from '@/schemas/auth/token.schema';

import { USER_ROLE } from '@/types/UserRole';
import { safeRequest } from '@/utils/helpers/api/safeRequest';
import type { TCredentials } from '@/schemas/auth/credentials.shema';
import { mapSignUpToRequest } from '@/utils/helpers/mappers/mapSignUpToReqeust';
import type {
  TRegisterPersonalResponse,
  TRegisterShelterResponse,
} from '@/schemas/auth/register/response.schema';

export const authServices = {
  register: (data: TSignUpFields) => {
    const payload = mapSignUpToRequest(data);

    if (data.role === USER_ROLE.personal) {
      return client.post<TRegisterPersonalResponse>('/api/v1/users/register/personal/', payload);
      // return safeRequest(
      //   client.post('/api/v1/users/register/personal/', payload),
      //   registerPersonalResponseSchema
      // );
    }
    return client.post<TRegisterShelterResponse>('/api/v1/users/register/shelter/', payload);
    // return safeRequest(
    //   client.post('/api/v1/users/register/shelter/', payload),
    //   registerShelterResponseSchema
    // );
  },

  login: (payload: TCredentials) => {
    return safeRequest(client.post('/api/v1/token/', payload), tokenSchema);
  },

  refreshToken: (refresh: string) => {
    return client.post<TTokenResponse>('/api/v1/token/refresh/', { refresh });
    // return safeRequest(client.post('/api/v1/token/refresh/', { refresh }), tokenSchema);
  },
};
