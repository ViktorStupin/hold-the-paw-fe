import { useQuery } from '@tanstack/react-query';
import { petsKeys } from './pets.keys';
import { petsServices } from '@/utils/api/services/pets.services';
import type { TMyPetCard } from '@/schemas/pet/pet.myCard.shema';
import type { TPetProfile } from '@/schemas/pet/pet.response.shema';

export const useMyPets = (active: boolean) =>
  useQuery<TMyPetCard[]>({
    queryKey: petsKeys.myPetsByStatus(active),
    queryFn: () => petsServices.getMyPets(active),
    staleTime: 1000 * 30,
    meta: { suppressGlobalError: true },
  });

export const usePet = (id: number) =>
  useQuery<TPetProfile>({
    queryKey: petsKeys.petById(id),
    queryFn: () => petsServices.getPet(id),
    enabled: !!id,
    meta: { suppressGlobalError: true },
  });
