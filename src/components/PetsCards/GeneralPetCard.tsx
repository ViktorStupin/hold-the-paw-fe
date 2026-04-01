import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { BASE_URL } from '@/constants/env';

type GeneralPetCardGender = 'male' | 'female';

export interface IGeneralPetCard {
  id: number;
  name: string;
  location: string;
  ageLabel: string;
  image?: string;
  gender: GeneralPetCardGender;
  isHighlighted?: boolean;
}

type GeneralPetCardProps = {
  pet: IGeneralPetCard;
};

export const GeneralPetCard = ({ pet }: GeneralPetCardProps) => {
  const { name, location, ageLabel, image, gender, isHighlighted } = pet;
  const genderIconSrc = `${BASE_URL}icons/${gender === 'male' ? 'boy.png' : 'girl.png'}`;
  const locationIconSrc = `${BASE_URL}icons/location.svg`;
  const calendarIconSrc = `${BASE_URL}icons/calendar.png`;

  return (
    <article
      className={cn(
        'group relative h-(--find-card-height) w-(--find-card-width) overflow-hidden rounded-md border border-gray-0 bg-gray-0 p-1 shadow-[0_4px_12px_rgba(31,32,34,0.12)]',
        isHighlighted && 'border-primary-40 ring-2 ring-primary-40/40'
      )}
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className='h-full w-full rounded-2xl object-cover'
          loading='lazy'
        />
      ) : (
        <div className='h-full w-full rounded-2xl-gray-50' />
      )}

      {isHighlighted ? (
        <button
          type='button'
          aria-label='Прибрати зі списку'
          className='absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-full bg-gray-100/45 text-gray-0 backdrop-blur-sm'
        >
          <X size={16} />
        </button>
      ) : null}

      <div className='pointer-events-none absolute inset-x-1 bottom-1 rounded-b-2xl bg-linear-to-t from-gray-100/75 via-gray-100/35 to-transparent px-4 pt-10 pb-4 text-gray-0'>
        <h3 className='typo-h3 flex items-center gap-1 text-gray-0'>
          <span>{name}</span>
          <img src={genderIconSrc} alt='' aria-hidden='true' className='size-4 object-contain' />
        </h3>

        <div className='mt-2 flex items-center gap-1.5 text-[13px] leading-[130%] text-gray-0/95'>
          <img src={locationIconSrc} alt='' aria-hidden='true' className='size-3.5 object-contain' />
          <span>{location}</span>
        </div>

        <div className='mt-1 flex items-center gap-1.5 text-[13px] leading-[130%] text-gray-0/95'>
          <img src={calendarIconSrc} alt='' aria-hidden='true' className='size-3.5 object-contain' />
          <span>{ageLabel}</span>
        </div>
      </div>
    </article>
  );
};
