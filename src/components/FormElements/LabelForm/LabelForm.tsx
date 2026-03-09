import { PET_OPTION_LABELS_UA } from '@/constants/pet.labes';
import type { PetProfileFormValues } from '@/schemas/pet.schema';

interface ILabelFormProps  {
  name: keyof PetProfileFormValues;
  defaultValue?: string;
};

export const LabelForm = ({ name, defaultValue = 'Ваші дані' }: ILabelFormProps) => {
  return (
    <label htmlFor={name} className='typo-h3 mb-4 block'>
      {PET_OPTION_LABELS_UA[name] || defaultValue}
    </label>
  );
};
