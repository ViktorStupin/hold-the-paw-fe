// import { wait } from '@/utils/helpers/api/wait';
import { client } from '../axiosClient';

interface ITokenResponse {
  access: string;
  refresh: string;
}

interface IRegisterResponse {
  id: number;
  email: string;
  phone_number: string;
}

interface IRegisterPersonalPayload {
  email: string;
  password: string;
  phone_number: string;
  first_name: string;
  last_name: string;
}

interface IRegisterShelterPayload {
  email: string;
  password: string;
  phone_number: string;
  tax_id: string;
  company_name: string;
}

interface ILoginPayload {
  email: string;
  password: string;
}

interface IRefreshTokenPayload {
  refresh: string;
}

export const authServices = {
  registerShelter: async (payload: IRegisterShelterPayload) => {
    // await wait(5000);
    return client.post<IRegisterResponse, IRegisterShelterPayload>(
      '/api/v1/users/register/shelter/',
      payload
    );
  },

  registerPersonal: (payload: IRegisterPersonalPayload) => {
    return client.post<IRegisterResponse, IRegisterPersonalPayload>(
      '/api/v1/users/register/personal/',
      payload
    );
  },

  login: async (payload: ILoginPayload) => {
    // await wait(5000);
    return client.post<ITokenResponse, ILoginPayload>('/api/v1/token/', payload);
  },

  refreshToken: (payload: IRefreshTokenPayload) => {
    return client.post<ITokenResponse, IRefreshTokenPayload>('/api/v1/token/refresh/', payload)
  },
};
