import { client } from '../axiosClient';
import { toFormData } from '@/utils/helpers/convertors/toFormData';
import { type TMyPetCard } from '@/schemas/pet/pet.myCard.shema';
// import { safeRequest } from '@/utils/helpers/api/safeRequest';
import { type TPetProfile } from '@/schemas/pet/pet.response.shema';
import type { TRequestPet } from '@/schemas/pet/pet.create.shema';
import type { TUpdatePet } from '@/schemas/pet/pet.update.shema';

type TPetsListResponse = TPetProfile[] | { results: TPetProfile[] };

export const petsServices = {
  getPet: async (id: number) => {
    return await client.get<TPetProfile>(`/api/v1/pets/listings/${id}/`);
  },

  getPets: async (): Promise<TPetsListResponse> => {
    return await client.get<TPetsListResponse>('/api/v1/pets/listings/');
  },

  getMyPets: async (status?: boolean): Promise<TMyPetCard[]> => {
    let link = '/api/v1/pets/my_listings/';

    if (status !== undefined) {
      link += `?is_active=${status}`;
    }
    return await client.get<TMyPetCard[]>(link);
  },

  createPet: async (payload: TRequestPet) => {
    return client.post<TPetProfile>(`/api/v1/pets/listings/`, toFormData(payload));
  },

  editPet: async (payload: Partial<TUpdatePet>, id: number) => {
    return client.patch<TPetProfile>(`/api/v1/pets/listings/${id}/`, toFormData(payload));
  },
};

//TODO ADD SAFE REQUEST
// return await safeRequest(client.get(`/api/v1/pets/listings/${id}/`), petResponseSchema);
// return safeRequest(client.get('/api/v1/pets/my_listings/'), myPetCardSchema.array());
// return await safeRequest(
//   client.post(`/api/v1/pets/listings/`, toFormData(payload)),
//   petResponseSchema
// );
// return await safeRequest(
//   client.patch(`/api/v1/pets/listings/${id}/`, toFormData(payload)),
//   updatePetSchema
// );
