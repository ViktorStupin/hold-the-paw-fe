import type { PetProfileFormValues } from '@/schemas/pet.schema';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '../ui/textarea';
import { LabelForm } from '../FormElements/LabelForm/LabelForm';
import { InfoForm } from '../FormElements/InfoForm/InfoForm';

export const StepFour = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PetProfileFormValues>();

  return (
    <div className='grid grid-cols-1 gap-8 lg:gap-6 lg:grid-cols-2'>
      <div className='step-block'>
        <LabelForm name='story' defaultValue='Історія' />
        <Textarea
          placeholder='Наприклад: Мене звати Бонька. Мене знайшли восени в покинутому садку, де я ховалася під листям. Я ще зовсім молода і мрію лише про одне — стати частиною вашої родини та дарувати вам своє мурчання щодня.'
          maxLength={1024}
          aria-invalid={!!errors.story}
          id='story'
          {...register('story')}
        />
        {errors.story && <InfoForm message={errors.story?.message} iconType='dangerAlert' />}
      </div>
      <div className='step-block'>
        <LabelForm name='about' defaultValue='Про тварину' />
        <Textarea
          placeholder='Наприклад: я маю коротку шерсть, тож вам буде комфортно зі мною жити! Я привчена до лотка, люблю гуляти на вулиці. Чудово спілкуюсь з іншими тваринками та дітьми.'
          maxLength={1024}
          aria-invalid={!!errors.about}
          id='about'
          {...register('about')}
        />
        {errors.about && <InfoForm message={errors.about?.message} iconType='dangerAlert' />}{' '}
      </div>
    </div>
  );
};
