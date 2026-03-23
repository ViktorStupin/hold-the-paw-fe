import { useFormContext, useController } from 'react-hook-form';
import { Button } from '../ui/button';
import { PET_OPTION_LABELS_UA } from '@/constants/pet.labes';
import { Field, FieldLabel, FieldMessage, FieldSet } from '../ui/field';
import type { TCreatePet } from '@/schemas/pet/pet.create.shema';

export type LayoutType = 'single' | 'grid-2' | 'grid-3' | 'special-2';

interface IOptionGridProps<T extends string | boolean> {
  name: keyof TCreatePet;
  options: readonly T[];
  labels: Record<string, string>;
  layout?: 'single' | 'grid-2' | 'grid-3' | 'special-2';
}

export const OptionGrid = <T extends string | boolean>({
  name,
  options,
  labels,
  layout = 'grid-2',
}: IOptionGridProps<T>) => {
  const { control } = useFormContext<TCreatePet>();
  const { field, fieldState } = useController({ name, control });

  const isSelected = (value: T) => field.value === value;

  const gridClass = {
    single: 'grid grid-cols-1 gap-4 lg:gap-6',
    'grid-2': 'grid grid-cols-2 gap-4 lg:gap-6',
    'grid-3': 'grid grid-cols-3 gap-4 lg:gap-6',
    'special-2': 'grid grid-cols-2 gap-4 lg:gap-6 [&>*:last-child:nth-child(odd)]:col-span-2',
  }[layout];

  return (
    <Field>
      <FieldLabel className='mb-2 typo-h3' text={PET_OPTION_LABELS_UA[name]} htmlFor={name} />
      <FieldSet id={name} className={gridClass}>
        {options.map((option) => (
          <Button
            role='radio'
            key={String(option)}
            type='button'
            size='default'
            variant='choise'
            onClick={() => field.onChange(option)}
            className={`
            ${isSelected(option) ? 'border-primary-100 bg-primary-0 text-primary-100' : ''}
          `}
          >
            {labels[String(option)]}
          </Button>
        ))}
      </FieldSet>

      <FieldMessage message={fieldState.error?.message} status='danger' />
    </Field>
  );
};
