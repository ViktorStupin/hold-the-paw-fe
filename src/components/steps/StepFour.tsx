import type { PetProfileFormValues } from '@/schemas/pet.schema';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '../ui/textarea';
import { PET_OPTION_LABELS_UA } from '@/constants/pet.labes';
import { Field, FieldLabel, FieldMessage } from '../ui/field';
import clsx from 'clsx';

export const StepFour = ({ isEdit = false }: { isEdit?: boolean }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PetProfileFormValues>();

  return (
    <div className={clsx('grid grid-cols-1 gap-6 lg:gap-6 lg:grid-cols-2', { 'lg:gap-x-18': isEdit })}>
      <div className={clsx({ 'step-block': !isEdit })}>
        <Field>
          <FieldLabel
            className='mb-2 typo-h3'
            text={PET_OPTION_LABELS_UA['story']}
            defaultValue='Історія'
            htmlFor='story'
          />
          <Textarea
            placeholder='Наприклад: Мене звати Бонька. Мене знайшли восени в покинутому садку, де я ховалася під листям. Я ще зовсім молода і мрію лише про одне — стати частиною вашої родини та дарувати вам своє мурчання щодня.'
            maxLength={1024}
            aria-invalid={!!errors.story}
            id='story'
            {...register('story')}
          />
          <FieldMessage message={errors.story?.message} status='danger' />{' '}
        </Field>
      </div>
      <div className={clsx({ 'step-block': !isEdit })}>
        <Field>
          <FieldLabel
            className='mb-2 typo-h3'
            text={PET_OPTION_LABELS_UA['about']}
            defaultValue='Про тварину'
            htmlFor='about'
          />
          <Textarea
            placeholder='Наприклад: я маю коротку шерсть, тож вам буде комфортно зі мною жити! Я привчена до лотка, люблю гуляти на вулиці. Чудово спілкуюсь з іншими тваринками та дітьми.'
            maxLength={1024}
            aria-invalid={!!errors.about}
            id='about'
            {...register('about')}
          />
          <FieldMessage message={errors.about?.message} status='danger' />
        </Field>
      </div>
    </div>
  );
};
