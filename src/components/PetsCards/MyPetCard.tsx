import { Button } from '@/components/ui/button'; // або твій компонент
import type { IMyPetCard } from '@/types/Pet';
import { useIsMobile } from '@/utils/helpers/layouts/useIsMobile';
import { MapPin, Eye, Phone } from 'lucide-react';
import { Icon } from '../ui/icon';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { getPath } from '@/routes/root.config';

export const MyPetCard = ({
  pet: { main_image, location, is_active, status, name, id },
}: {
  pet: IMyPetCard;
}) => {
  const isMobile = useIsMobile();

  const image = (
    <div
      className={cn(
        'aspect-square shrink-0 overflow-hidden rounded-md',
        isMobile ? 'w-29.75' : 'w-58.5'
      )}
    >
      <img className='w-full h-full object-cover' src={main_image} alt={name} />
    </div>
  );

  const info = (
    <div className='grid gap-2'>
      <h3 className={isMobile ? 'typo-h3' : 'typo-h1'}>{name}</h3>
      <div className='flex items-center gap-1'>
        <Icon icon={MapPin} color='var(--gray-80)' />
        <span className='typo-main'>{location ?? 'Локація'}</span>
      </div>
    </div>
  );

  const stats = (
    <div className='flex items-center gap-4'>
      <div className='flex items-center gap-1'>
        <Icon icon={Eye} color='var(--gray-80)' /> <span>0</span>
      </div>
      <div className='flex items-center gap-1'>
        <Icon icon={Phone} color='var(--gray-80)' /> <span>0</span>
      </div>
    </div>
  );

  const buttons = (
    <div className={isMobile ? 'grid gap-4' : 'grid grid-cols-2 gap-4'}>
      <Button variant='secondary'>Деактивувати</Button>
      <Button variant='primary' asChild>
        <Link to={getPath.editPetProfile(id)}>Редагувати</Link>
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <div className='bg-gray-0 shadow-default p-4 rounded-md grid gap-2'>
        <div className='flex gap-6'>
          {image}
          <div className='flex flex-col flex-1 gap-2'>
            {info}
            {stats}
          </div>
        </div>
        {buttons}
      </div>
    );
  }

  return (
    <div className='bg-gray-0 shadow-default p-4 rounded-md flex gap-8'>
      {image}
      <div className='flex-1 flex flex-col justify-between gap-6'>
        {info}
        <div className='grid gap-2'>
          {stats}
          {buttons}
        </div>
      </div>
    </div>
  );
};
