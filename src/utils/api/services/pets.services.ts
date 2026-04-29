import { client } from '../axiosClient';
import { toFormData } from '@/utils/helpers/convertors/toFormData';
import { type TMyPetCard } from '@/schemas/pet/pet.myCard.shema';
// import { safeRequest } from '@/utils/helpers/api/safeRequest';
import { type TPetProfile } from '@/schemas/pet/pet.response.shema';
import type { TRequestPet } from '@/schemas/pet/pet.create.shema';
import type { TUpdatePet } from '@/schemas/pet/pet.update.shema';

type TPetsListResponse = TPetProfile[] | { results: TPetProfile[] };

/** Значення для `ordering` у DRF (уточни в Swagger, якщо поле не `created_at`). */
export const PETS_LIST_ORDERING = {
  newestFirst: '-created_at',
  oldestFirst: 'created_at',
} as const;

export type TPetsListOrdering = (typeof PETS_LIST_ORDERING)[keyof typeof PETS_LIST_ORDERING];

export type TGetPetsParams = {
  ordering?: TPetsListOrdering;
};

export const petsServices = {
  getPet: async (id: number) => {
    return await client.get<TPetProfile>(`/api/v1/pets/listings/${id}/`);
  },

  getPets: async (params?: TGetPetsParams): Promise<TPetsListResponse> => {
    const searchParams = new URLSearchParams();
    if (params?.ordering) searchParams.set('ordering', params.ordering);
    const query = searchParams.toString();
    const url = query ? `/api/v1/pets/listings/?${query}` : '/api/v1/pets/listings/';
    return await client.get<TPetsListResponse>(url);
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
