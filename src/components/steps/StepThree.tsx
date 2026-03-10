import { PET_BOOLEAN_FIELDS, PET_COLOR } from '@/types/PetFileds';
import { OptionGrid } from '../OptionGrid/OptionGrid';
import { useIsMobile } from '@/utils/hooks/useIsMobile';
import {
  PET_COLOR_LABEL_UA,
  PET_HAS_PASSPORT_LABEL_UA,
  PET_IS_VACCINATED_LABEL_UA,
  PET_SPECIAL_NEEDS_LABEL_UA,
} from '@/constants/pet.labes';

export const StepThree = () => {
  const isMobile = useIsMobile();

  return (
    <div className='grid grid-cols-1 gap-8 lg:gap-6 lg:grid-cols-2'>
      <div className='step-block grid gap-8 lg:gap-6 lg:order-2'>
        <OptionGrid
          name='has_passport'
          layout={isMobile ? 'single' : 'grid-2'}
          options={PET_BOOLEAN_FIELDS}
          labels={PET_HAS_PASSPORT_LABEL_UA}
        />
        <OptionGrid
          name='is_vaccinated'
          layout='grid-2'
          options={PET_BOOLEAN_FIELDS}
          labels={PET_IS_VACCINATED_LABEL_UA}
        />
        <OptionGrid
          name='special_needs'
          layout='grid-2'
          options={PET_BOOLEAN_FIELDS}
          labels={PET_SPECIAL_NEEDS_LABEL_UA}
        />
      </div>
      <div className='step-block lg:order-1'>
        <OptionGrid
          name='color'
          options={PET_COLOR}
          labels={PET_COLOR_LABEL_UA}
          layout={isMobile ? 'grid-2' : 'grid-3'}
        />
      </div>
    </div>
  );
};
