import { petsKeys } from '@/queries/pets/pets.keys';
import type { TRequestPet } from '@/schemas/pet/pet.create.shema';
import type { TUpdatePet } from '@/schemas/pet/pet.update.shema';
import { petsServices } from '@/utils/api/services/pets.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSetActive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, is_active }: { id: number; is_active: boolean }) =>
      petsServices.editPet({ is_active }, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: petsKeys.myPets() });
    },
  });
};

export const useSetHelped = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, is_helped }: { id: number; is_helped: boolean }) =>
      petsServices.editPet({ is_helped }, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: petsKeys.myPets() });
    },
  });
};

export const useCreatePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TRequestPet) => petsServices.createPet(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: petsKeys.myPets() });
    },
  });
};

export const useEditPet = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<TUpdatePet>) => petsServices.editPet(payload, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: petsKeys.myPets() });
      queryClient.invalidateQueries({ queryKey: petsKeys.petById(id) });
    },
  });
};
