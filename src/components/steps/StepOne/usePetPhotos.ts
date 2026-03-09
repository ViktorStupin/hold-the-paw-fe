import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { PetProfileFormValues } from '@/schemas/pet.schema';
import { MAX_PHOTOS, photoSchema } from '@/schemas/pet.schema';

export const usePetPhotos = () => {
  const [photosHint, setPhotosHint] = React.useState('');

  const {
    setValue,
    trigger,
    watch,
  } = useFormContext<PetProfileFormValues>();

  const photos = watch('photos') ?? [];
  const firstEmptyIndex = photos.length < MAX_PHOTOS ? photos.length : -1;

  const syncPhotos = async (nextPhotos: File[]) => {
    setPhotosHint('');

    setValue('photos', nextPhotos, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    await trigger('photos');
  };

  const addPhotos = async (incomingFiles: File[]) => {
    const remainingSlots = MAX_PHOTOS - photos.length;

    const validFiles: File[] = [];
    const invalidNames: string[] = [];

    for (const file of incomingFiles) {
      const result = photoSchema.safeParse(file);

      if (result.success) {
        validFiles.push(file);
      } else {
        invalidNames.push(file.name);
      }
    }

    const nextPhotos = [...photos, ...validFiles].slice(0, MAX_PHOTOS);

    await syncPhotos(nextPhotos);

    if (invalidNames.length > 0 || incomingFiles.length > remainingSlots) {
      setPhotosHint(
        'Деякі фотографії були пропущені. Можливі причини: непідтримуваний формат, розмір більше 20MB або перевищено ліміт у 6 фото'
      );
    }
  };

  const makeMainPhoto = async (index: number) => {
    if (index <= 0 || !photos[index]) return;

    const selected = photos[index];
    const reordered = [selected, ...photos.filter((_, i) => i !== index)];

    await syncPhotos(reordered);
  };

  const removePhoto = async (index: number) => {
    const nextPhotos = photos.filter((_, i) => i !== index);
    await syncPhotos(nextPhotos);
  };

  return {
    photos,
    photosHint,
    firstEmptyIndex,
    addPhotos,
    makeMainPhoto,
    removePhoto,
  };
};
