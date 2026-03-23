import { client } from '../axiosClient';
import { toFormData } from '@/utils/helpers/convertors/toFormData';
import { type TMyPetCard } from '@/schemas/pet/pet.myCard.shema';
// import { safeRequest } from '@/utils/helpers/api/safeRequest';
import { type TPetProfile } from '@/schemas/pet/pet.response.shema';
import type { TRequestPet } from '@/schemas/pet/pet.create.shema';
import type { TUpdatePet } from '@/schemas/pet/pet.update.shema';

export const petsServices = {
  getPet: async (id: number) => {
    return await client.get<TPetProfile>(`/api/v1/pets/listings/${id}/`);
    // return await safeRequest(client.get(`/api/v1/pets/listings/${id}/`), petResponseSchema);
  },

  getMyPets: async (): Promise<TMyPetCard[]> => {
    return await client.get<TMyPetCard[]>('/api/v1/pets/my_listings/');
    // return safeRequest(client.get('/api/v1/pets/my_listings/'), myPetCardSchema.array());
  },

  createPet: async (payload: TRequestPet) => {
    return client.post<TPetProfile>(`/api/v1/pets/listings/`, toFormData(payload));
    // return await safeRequest(
    //   client.post(`/api/v1/pets/listings/`, toFormData(payload)),
    //   petResponseSchema
    // );
  },

  editPet: async (payload: TUpdatePet, id: number) => {
    return client.patch<TPetProfile>(`/api/v1/pets/listings/${id}/`, toFormData(payload));

    // return await safeRequest(
    //   client.patch(`/api/v1/pets/listings/${id}/`, toFormData(payload)),
    //   updatePetSchema
    // );
  },

  toggleActive: async (status: boolean, id: number) => {
    return client.patch(`/api/v1/pets/listings/${id}/`, { is_active: status });
  },
  toggleHelped: async (status: boolean, id: number) => {
    return client.patch(`/api/v1/pets/listings/${id}/`, { is_helped: status });
  },
};
