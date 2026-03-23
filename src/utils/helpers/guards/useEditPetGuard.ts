// hooks/useEditPetGuard.ts
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { petsServices } from '@/utils/api/services/pets.services';
import { getServerErrorMessage } from '@/utils/errors/getServerErrorMessage';
import { useAuthStore } from '@/store/auth.store';
import { RoutePath } from '@/routes/root.config';
import type { TCreatePet } from '@/schemas/pet/pet.create.shema';
// import { urlToFile } from '../convertors/urlToFile';

export const useEditPetGuard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = useAuthStore((s) => s.userId);

  const [petFormValues, setPetFormValues] = useState<TCreatePet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const petId = Number(id);

    if (!id || isNaN(petId)) {
      navigate(RoutePath.NotFound, { replace: true });
      return;
    }

    const init = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const petData = await petsServices.getPet(petId);

        if (petData.author.id !== userId) {
          navigate('/403', { replace: true });
          return;
        }

        // const photos = await Promise.all(petData.images.map(urlToFile));

        // console.log(photos)

        setPetFormValues({
          ...petData,
          about: petData.about || '',
          story: petData.story || '',
          photos: [],
          // photos,
        });
      } catch (err) {
        setError(getServerErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [id]);

  return { petFormValues, isLoading, error };
};
