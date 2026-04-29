// hooks/useEditPetGuard.ts
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '@/routes/root.config';
import { usePet } from '@/queries/pets/pets.queries';
import { urlToFile } from '../convertors/urlToFile';
import { getServerErrorMessage } from '@/utils/errors/getServerErrorMessage';
import type { TCreatePet } from '@/schemas/pet/pet.create.shema';
import { usePetOwner } from './usePetOwner';

export const useEditPetGuard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const petId = Number(id);

  const [petFormValues, setPetFormValues] = useState<TCreatePet | null>(null);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
  const [photosError, setPhotosError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || isNaN(petId)) {
      navigate(RoutePath.NotFound, { replace: true });
    }
  }, [id]);

  const { data: pet, isPending, error: petError } = usePet(petId);
  const isOwner = usePetOwner(pet?.author.id);

  useEffect(() => {
    if (!pet) return;          
    if (isOwner === false) {   
      navigate('/403', { replace: true });
    }
  }, [pet, isOwner]);

  useEffect(() => {
    if (!pet || isOwner !== true) return;

    const loadPhotos = async () => {
      try {
        setIsLoadingPhotos(true);
        const photos = await Promise.all(pet.photos.map(urlToFile));
        setPetFormValues({
          ...pet,
          about: pet.about || '',
          story: pet.story || '',
          photos,
        });
      } catch (err) {
        setPhotosError(getServerErrorMessage(err));
      } finally {
        setIsLoadingPhotos(false);
      }
    };

    loadPhotos();
  }, [pet, isOwner]);

  return {
    petFormValues,
    isLoading: isPending || isLoadingPhotos,
    error: petError?.message || photosError,
  };
};