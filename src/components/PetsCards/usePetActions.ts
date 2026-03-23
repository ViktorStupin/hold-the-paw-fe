// hooks/usePetActions.ts
import { petsServices } from '@/utils/api/services/pets.services';
import { getServerErrorMessage } from '@/utils/errors/getServerErrorMessage';
import { toast } from 'sonner';

export const usePetActions = () => {
  const toggleActive = async (id: number, is_active: boolean) => {
    try {
      const data = await petsServices.toggleActive(is_active, id);
      console.log(data)
    } catch (err) {
      const message = getServerErrorMessage(err);
      toast.error(message);
      throw err;
    }
  };

  const setHelped = async (id: number, is_helped: boolean) => {
    try {
      await petsServices.toggleHelped(is_helped, id);
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