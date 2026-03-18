import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import type { PetProfileFormValues } from '@/schemas/pet.schema';
import { PhotoGrid } from './PhotoGrid';
import { usePetPhotos } from './usePetPhotos';
import { MapPin } from 'lucide-react';
import { Icon } from '@/components/ui/icon';
import { PET_OPTION_LABELS_UA } from '@/constants/pet.labes';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Field, FieldGroup, FieldLabel, FieldMessage } from '@/components/ui/field';

import clsx from 'clsx';

export const StepOne = ({ isEdit = false }: { isEdit?: boolean }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const {
    register,
    formState: { errors },
  } = useFormContext<PetProfileFormValues>();

  const { photos, photosHint, firstEmptyIndex, addPhotos, makeMainPhoto, removePhoto } =
    usePetPhotos();

  return (
    <div className={clsx({ 'step-block': !isEdit })}>
      <FieldGroup
        className={clsx('grid grid-cols-1 gap-6 lg:grid-cols-2')}
      >
        <Field>
          <FieldLabel
            text={PET_OPTION_LABELS_UA['name']}
            defaultValue="Ім'я"
            htmlFor='name'
            className='mb-2 typo-h3'
          />
          <Input
            id='name'
            aria-invalid={!!errors.name}
            size='md'
            bg='gray30'
            placeholder='Наприклад: Зірочка'
            {...register('name')}
          />
          <FieldMessage message={errors.name?.message} status='danger' />
        </Field>

        <Field>
          <FieldLabel
            text={PET_OPTION_LABELS_UA['location']}
            defaultValue='Локація'
            htmlFor='location'
            className='mb-2 typo-h3'
          />

          <InputGroup>
            <InputGroupInput
              id='location'
              {...register('location')}
              type='text'
              placeholder='Локація'
              aria-invalid={!!errors.location}
            />

            <InputGroupAddon align='inline-end'>
              <Icon icon={MapPin} size={24} color='var(--gray-80)' />
            </InputGroupAddon>
          </InputGroup>

          <FieldMessage message={errors.location?.message} status='danger' />
        </Field>
      </FieldGroup>

      <Field className='mt-6'>
        <FieldLabel
          text={PET_OPTION_LABELS_UA['photos']}
          defaultValue='Оберіть головне фото та 5 додаткових'
          className='mb-2 typo-h3'
        />

        <input
          ref={inputRef}
          type='file'
          accept='image/jpeg,image/png,image/heic,image/heif'
          multiple
          className='hidden'
          onChange={(e) => {
            const input = e.currentTarget;
            const files = input.files ? Array.from(input.files) : [];
            input.value = '';

            addPhotos(files);
          }}
        />

        <PhotoGrid
          photos={photos}
          firstEmptyIndex={firstEmptyIndex}
          onAddClick={() => inputRef.current?.click()}
          onMakeMain={makeMainPhoto}
          onRemove={removePhoto}
        />

        <FieldMessage message={errors.photos?.message} status='danger' />
        <FieldMessage message={photosHint} status='warning' />
      </Field>
    </div>
  );
};
