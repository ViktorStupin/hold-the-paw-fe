import { useFormContext, useController } from 'react-hook-form';
import type { PetProfileFormValues } from '@/schemas/pet.schema';
import { Button } from '../ui/button';
import { LabelForm } from '../FormElements/LabelForm/LabelForm';
import { InfoForm } from '../FormElements/InfoForm/InfoForm';
interface OptionGridProps<T extends string | boolean> {
  name: keyof PetProfileFormValues;
  options: readonly T[];
  labels: Record<string, string>;
  layout?: 'single' | 'grid-2' | 'grid-3' | 'special-2';
}

export const OptionGrid = <T extends string | boolean>({
  name,
  options,
  labels,
  layout = 'grid-2',
}: OptionGridProps<T>) => {
  const { control } = useFormContext<PetProfileFormValues>();
  const { field, fieldState } = useController({ name, control });

  const isSelected = (value: T) => field.value === value;

  const gridClass = {
    single: 'grid grid-cols-1 gap-4 lg:gap-6',
    'grid-2': 'grid grid-cols-2 gap-4 lg:gap-6',
    'grid-3': 'grid grid-cols-3 gap-4 lg:gap-6',
    'special-2': 'grid grid-cols-2 gap-4 lg:gap-6 [&>*:last-child:nth-child(odd)]:col-span-2',
  }[layout];

  return (
    <div>
      <LabelForm name={name} />
      <fieldset id={name} className={gridClass}>
        {options.map((option) => (
          <Button
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
      </fieldset>

      {fieldState.error && <InfoForm message={fieldState.error.message} iconType='dangerAlert' />}
    </div>
  );
};
