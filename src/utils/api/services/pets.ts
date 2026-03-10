import { client } from '../axiosClient';

export const getPets = <T>(sourse: string) => {
  return client.get<T[]>(sourse);
};
