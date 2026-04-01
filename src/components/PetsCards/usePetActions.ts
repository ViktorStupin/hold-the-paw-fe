// hooks/usePetActions.ts
import { petsServices } from '@/utils/api/services/pets.services';
import { getServerErrorMessage } from '@/utils/errors/getServerErrorMessage';
import { toast } from 'sonner';

export const usePetActions = () => {
  const toggleActive = async (id: number, is_active: boolean) => {
    try {
      console.log(is_active)
      await petsServices.editPet({ is_active }, id);
    } catch (err) {
      const message = getServerErrorMessage(err);
      toast.error(message);
      throw err;
    }
  };

  const setHelped = async (id: number, is_helped: boolean) => {
    try {
      await petsServices.editPet({ is_helped }, id);
    } catch (err) {
      const message = getServerErrorMessage(err);
      toast.error(message);
      throw err;
    }
  };

  return {
    toggleActive,
    setHelped,
  };
};
