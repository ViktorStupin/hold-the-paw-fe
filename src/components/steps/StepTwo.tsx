// Step2.tsx приклад
import {
  ANIMAL_TYPE_LABEL_UA,
  PET_AGE_LABEL_UA,
  PET_BREED_LABEL_UA,
  PET_SEX_LABEL_UA,
  PET_SIZE_LABEL_UA,
  PET_STATUS_LABEL_UA,
} from '@/constants/pet.labes';
import { OptionGrid } from '../OptionGrid/OptionGrid';
import { ANIMAL_TYPE, PET_AGE, PET_BREED, PET_SEX, PET_SIZE, PET_STATUS } from '@/types/PetFileds';
import { useIsMobile } from '@/utils/hooks/useIsMobile';

export const StepTwo = () => {
  const isMobile = useIsMobile();

  return (
    <div className='grid grid-cols-1 gap-8 lg:gap-6 lg:grid-cols-2'>
      <div className='step-block grid gap-8 lg:gap-6 '>
        <OptionGrid
          name='status'
          options={PET_STATUS}
          labels={PET_STATUS_LABEL_UA}
          layout={isMobile ? 'single' : 'grid-2'}
        />
        <OptionGrid name='sex' options={PET_SEX} labels={PET_SEX_LABEL_UA} layout='grid-2' />
        <OptionGrid name='age' options={PET_AGE} labels={PET_AGE_LABEL_UA} layout='grid-2' />
      </div>
      <div className='step-block grid gap-8 lg:gap-6 '>
        <OptionGrid
          name='breed'
          options={PET_BREED}
          labels={PET_BREED_LABEL_UA}
          layout={isMobile ? 'special-2' : 'grid-3'}
        />
        <OptionGrid
          name='size'
          options={PET_SIZE}
          labels={PET_SIZE_LABEL_UA}
          layout={isMobile ? 'special-2' : 'grid-3'}
        />
        <OptionGrid
          name='animalType'
          options={ANIMAL_TYPE}
          labels={ANIMAL_TYPE_LABEL_UA}
          layout='grid-3'
        />
      </div>
    </div>
  );
};
