import { Calendar, MapPin, Mars, Venus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { getPath } from '@/routes/root.config';
import type { PetAge } from '@/types/PetFileds';

type GeneralPetCardGender = 'male' | 'female';

export interface IGeneralPetCard {
  id: number;
  name: string;
  location: string;
  ageLabel: string;
  age?: PetAge;
  image?: string;
  gender: GeneralPetCardGender;
  isHighlighted?: boolean;
}

type GeneralPetCardProps = {
  pet: IGeneralPetCard;
};

export const GeneralPetCard = ({ pet }: GeneralPetCardProps) => {
  const { name, location, ageLabel, image, gender, isHighlighted } = pet;
  const GenderIcon = gender === 'male' ? Mars : Venus;
  const genderIconColor = gender === 'male' ? 'var(--primary-60)' : 'var(--info)';

  return (
    <Link to={getPath.pet(pet.id)} aria-label={`Відкрити профіль тваринки ${name}`}>
      <article
        className={cn(
          'group relative h-(--find-card-height-mobile) w-(--find-card-width-mobile) overflow-hidden rounded-[20px] border-[8px] border-gray-0 bg-gray-0 shadow-[0_4px_12px_rgba(31,32,34,0.12)] transition-colors duration-200 hover:border-primary-60 md:h-(--find-card-height) md:w-(--find-card-width)',
          isHighlighted && 'border-primary-60'
        )}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className='h-full w-full rounded-[12px] object-cover'
            loading='lazy'
          />
        ) : (
          <div className='h-full w-full rounded-[12px] bg-gray-50' />
        )}

        {isHighlighted ? (
          <span
            aria-hidden='true'
            className='absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-full bg-gray-100/45 text-gray-0 backdrop-blur-sm'
          >
            <X size={16} />
          </span>
        ) : null}

        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 bottom-0 h-[58%] rounded-b-[12px] bg-linear-to-t from-gray-70/85 via-gray-70/45 to-transparent backdrop-blur-[2px]'
        />

        <div className='pointer-events-none absolute inset-x-0 bottom-0 rounded-b-[12px] px-4 pt-10 pb-4 text-gray-0'>
          <h3 className='typo-h3 flex items-center gap-1 text-gray-0'>
            <span>{name}</span>
            <GenderIcon size={16} color={genderIconColor} />
          </h3>

          <div className='mt-2 flex items-center gap-1.5 text-[13px] leading-[130%] text-gray-0/95'>
            <MapPin size={14} color='var(--gray-0)' />
            <span>{location}</span>
          </div>

          <div className='mt-1 flex items-center gap-1.5 text-[13px] leading-[130%] text-gray-0/95'>
            <Calendar size={14} color='var(--gray-0)' />
            <span>{ageLabel}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};
