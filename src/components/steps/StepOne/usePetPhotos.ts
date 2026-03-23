import React from 'react';
import { useFormContext } from 'react-hook-form';
import { photoSchema } from '@/schemas/primitives.schema';
import { MAX_PHOTOS, type TCreatePet } from '@/schemas/pet/pet.create.shema';

export const usePetPhotos = () => {
  const [photosHint, setPhotosHint] = React.useState('');

  const { setValue, watch } = useFormContext<TCreatePet>();

  const photos = watch('photos') ?? [];
  const firstEmptyIndex = photos.length < MAX_PHOTOS ? photos.length : -1;

  const syncPhotos = (nextPhotos: File[]) => {
    setPhotosHint('');

    setValue('photos', nextPhotos, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const addPhotos = (incomingFiles: File[]) => {
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

    syncPhotos(nextPhotos);

    if (invalidNames.length > 0 || incomingFiles.length > remainingSlots) {
      setPhotosHint(
        'Деякі фотографії були пропущені. Можливі причини: непідтримуваний формат, розмір більше 20MB або перевищено ліміт у 6 фото'
      );
    }
  };

  const makeMainPhoto = (index: number) => {
    if (index <= 0 || !photos[index]) return;

    const selected = photos[index];
    const reordered = [selected, ...photos.filter((_, i) => i !== index)];

    syncPhotos(reordered);
  };

  const removePhoto = (index: number) => {
    const nextPhotos = photos.filter((_, i) => i !== index);
    syncPhotos(nextPhotos);
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
