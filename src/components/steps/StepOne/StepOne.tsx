import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import type { PetProfileFormValues } from '@/schemas/pet.schema';
import { InputGroup } from '@/components/ui/InputGroup';
import { PhotoGrid } from './PhotoGrid';
import { usePetPhotos } from './usePetPhotos';
import { LabelForm } from '@/components/FormElements/LabelForm/LabelForm';
import { InfoForm } from '@/components/FormElements/InfoForm/InfoForm';
import { MapPin } from 'lucide-react';
import { Icon } from '@/components/ui/icon';

export const StepOne = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const {
    register,
    formState: { errors },
  } = useFormContext<PetProfileFormValues>();

  const { photos, photosHint, firstEmptyIndex, addPhotos, makeMainPhoto, removePhoto } =
    usePetPhotos();

  return (
    <div className='step-block'>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <div>
          <LabelForm name='name' defaultValue="Ім'я" />
          <Input
            id='name'
            aria-invalid={!!errors.name}
            size='md'
            bg='gray30'
            placeholder='Наприклад: Зірочка'
            {...register('name')}
          />
          {errors.name && <InfoForm message={errors.name.message} status='danger' />}
        </div>

        <div>
          <LabelForm name='location' defaultValue='Локація' />
          <InputGroup
            endIcon={<Icon icon={MapPin} size={24} color='var(--gray-80)'/>}
            inputProps={{
              id: 'location',
              placeholder: 'Локація',
              bg: 'gray30',
              'aria-invalid': !!errors.location,
              ...register('location'),
            }}
          />
          {errors.location && <InfoForm message={errors.location.message} status='danger' />}
        </div>
      </div>

      <div className='mt-6'>
        <LabelForm name='photos' defaultValue='Оберіть головне фото та 5 додаткових' />

        <input
          ref={inputRef}
          type='file'
          accept='image/jpeg,image/png,image/heic,image/heif'
          multiple
          className='hidden'
          onChange={async (e) => {
            const input = e.currentTarget;
            const files = input.files ? Array.from(input.files) : [];
            input.value = '';

            await addPhotos(files);
          }}
        />

        <PhotoGrid
          photos={photos}
          firstEmptyIndex={firstEmptyIndex}
          onAddClick={() => inputRef.current?.click()}
          onMakeMain={makeMainPhoto}
          onRemove={removePhoto}
        />

        {errors.photos && <InfoForm message={errors.photos.message} status='danger' />}

        {!errors.photos && photosHint && <InfoForm message={photosHint} status='warning' />}
      </div>
    </div>
  );
};
