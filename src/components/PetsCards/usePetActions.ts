// hooks/usePetActions.ts
import { usePetsStore } from '@/store/myPets.store';
import { petsServices } from '@/utils/api/services/pets.services';
import { getServerErrorMessage } from '@/utils/errors/getServerErrorMessage';
import { toast } from "sonner";

export const usePetActions = () => {
  const { myPets, setPets } = usePetsStore();

  const updatePet = async (
    id: number,
    changes: Partial<{ is_active: boolean; is_helped: boolean }>
  ) => {
    const petIndex = myPets.findIndex((p) => p.id === id);
    if (petIndex === -1) return;

    const oldPet = { ...myPets[petIndex] };
    setPets((prev) => {
      const copy = [...prev];
      copy[petIndex] = { ...copy[petIndex], ...changes };
      return copy;
    });

    try {
      if ('is_active' in changes) {
        await petsServices.toggleActive(changes.is_active!, id);
      }
      if ('is_helped' in changes) {
        await petsServices.toggleHelped(changes.is_helped!, id);
      }
    } catch (err) {
      setPets((prev) => {
        const copy = [...prev];
        copy[petIndex] = oldPet; // rollback
        return copy;
      });
      toast.error(getServerErrorMessage(err));
    }
  };

  const toggleActive = (id: number) => {
    const pet = myPets.find((p) => p.id === id);
    if (!pet) return;
    return updatePet(id, { is_active: !pet.is_active });
  };

  const setHelped = (id: number, status: boolean) => updatePet(id, { is_helped: status });

  return { toggleActive, setHelped };
};
