// Step2.tsx приклад
import {
  PET_TYPE_LABEL_UA,
  PET_AGE_LABEL_UA,
  PET_BREED_LABEL_UA,
  PET_SEX_LABEL_UA,
  PET_SIZE_LABEL_UA,
  PET_STATUS_LABEL_UA,
} from '@/constants/pet.labes';
import { OptionGrid, type LayoutType } from '../OptionGrid/OptionGrid';
import { PET_TYPE, PET_AGE, PET_BREED, PET_GENDER, PET_SIZE, PET_STATUS } from '@/types/PetFileds';
import { useIsMobile } from '@/utils/helpers/layouts/useIsMobile';

import clsx from 'clsx';
import type { TCreatePet } from '@/schemas/pet/pet.create.shema';

export const StepTwo = ({ isEdit = false }: { isEdit?: boolean }) => {
  const isMobile = useIsMobile();

  const LEFT_GRIDS = [
    {
      name: 'status' as keyof TCreatePet,
      options: PET_STATUS,
      labels: PET_STATUS_LABEL_UA,
      layout: isMobile ? 'single' : ('grid-2' as LayoutType),
    },
    {
      name: 'gender' as keyof TCreatePet,
      options: PET_GENDER,
      labels: PET_SEX_LABEL_UA,
      layout: 'grid-2' as LayoutType,
    },
    {
      name: 'age' as keyof TCreatePet,
      options: PET_AGE,
      labels: PET_AGE_LABEL_UA,
      layout: 'grid-2' as LayoutType,
    },
  ];

  const RIGHT_GRIDS = [
    {
      name: 'breed' as keyof TCreatePet,
      options: PET_BREED,
      labels: PET_BREED_LABEL_UA,
      layout: isMobile ? 'special-2' : ('grid-3' as LayoutType),
    },
    {
      name: 'size' as keyof TCreatePet,
      options: PET_SIZE,
      labels: PET_SIZE_LABEL_UA,
      layout: isMobile ? 'special-2' : ('grid-3' as LayoutType),
    },
    {
      name: 'pet_type' as keyof TCreatePet,
      options: PET_TYPE,
      labels: PET_TYPE_LABEL_UA,
      layout: 'grid-3' as LayoutType,
    },
  ];

  return (
    <div className={clsx('grid grid-cols-1 gap-6 lg:gap-6 lg:grid-cols-2', { 'lg:gap-x-18': isEdit })}>
      <div className={clsx({ 'step-block': !isEdit }, 'items-start grid gap-8 lg:gap-6')}>
        {LEFT_GRIDS.map((grid) => (
          <OptionGrid key={grid.name} {...grid} />
        ))}
      </div>
      <div className={clsx({ 'step-block': !isEdit }, 'items-start grid gap-8 lg:gap-6')}>
        {RIGHT_GRIDS.map((grid) => (
          <OptionGrid key={grid.name} {...grid} />
        ))}
      </div>
    </div>
  );
};
