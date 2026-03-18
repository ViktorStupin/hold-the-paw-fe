import type {
  ICreateEditPetRequest,
  ICreateEditPetResponse,
  IMyPetCard,
  IPetProfile,
} from '@/types/Pet';
import { client } from '../axiosClient';
import { toFormData } from '@/utils/helpers/convertors/toFormData';
// import { wait } from '@/utils/helpers/api/wait';

export const petsServices = {
  createPet: (payload: ICreateEditPetRequest) => {
    return client.post<ICreateEditPetResponse, FormData>(
      '/api/v1/pets/listings/',
      toFormData(payload)
    );
  },

  editPet: (payload: ICreateEditPetRequest, id: number) => {
    return client.patch<ICreateEditPetResponse, FormData>(
      `/api/v1/pets/listings/${id}/`,
      toFormData(payload)
    );
  },

  getMyPets:  async() => {
    // await wait(3000)
    return client.get<IMyPetCard[]>('/api/v1/pets/my_listings/');
  },

  getPet: async (id: number) => {
    // await wait(5000);
    return client.get<IPetProfile>(`/api/v1/pets/listings/${id}/`);
  },
};
