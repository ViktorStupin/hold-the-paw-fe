import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/utils/helpers/layouts/useIsMobile';
import { MapPin } from 'lucide-react';
import { Icon } from '../ui/icon';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { getPath } from '@/routes/root.config';
import type { TMyPetCard } from '@/schemas/pet/pet.myCard.shema';
import { useState } from 'react';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { usePetActions } from './usePetActions';
import { usePetsStore } from '@/store/myPets.store';
export const MyPetCard = ({
  pet: { main_image, location, is_active, status, name, id },
}: {
  pet: TMyPetCard;
}) => {
  const isMobile = useIsMobile();
  const { toggleActive, setHelped } = usePetActions();
  const { fetchMyPets } = usePetsStore();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const handleConfirm = async () => {
    setIsConfirmOpen(false);
    await toggleActive(id, false);
    await setHelped(id, true);
    await fetchMyPets();
  };

  const handleDecline = async () => {
    setIsConfirmOpen(false);
    await toggleActive(id, false);
    await setHelped(id, false);
    await fetchMyPets();
  };

  const handleActivate = async () => {
    await toggleActive(id, true);
    await setHelped(id, false);
  };

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
  const statusLabel = is_active ? (
    <div className='w-fit bg-primary-0 rounded-sm px-6 py-1 border border-solid border-primary-80'>
      <p className='typo-main text-primary-80'>{status || 'Статус'}</p>
    </div>
  ) : (
    <div className='w-fit bg-gray-30 rounded-sm px-6 py-1 border border-solid border-gray-70'>
      <p className='typo-main text-gray-70'>Деактивовано</p>
    </div>
  );
  const info = (
    <div className='grid gap-2'>
      <div className='flex items-center justify-between'>
        <h3 className={isMobile ? 'typo-h3' : 'typo-h1'}>{name}</h3> {!isMobile && statusLabel}
      </div>
      <div className='flex items-center gap-1'>
        <Icon icon={MapPin} color='var(--gray-80)' />
        <span className='typo-main'>{location ?? 'Локація'}</span>
      </div>
    </div>
  );
  const buttons = (
    <div className={isMobile ? 'grid gap-4' : 'grid grid-cols-2 gap-4'}>
      <Button
        variant='secondary'
        onClick={() => (is_active ? setIsConfirmOpen(true) : handleActivate())}
      >
        {is_active ? 'Деактивувати' : 'Активувати'}
      </Button>
      <Button variant='primary' asChild>
        <Link to={getPath.editPetProfile(id)}>Редагувати</Link>
      </Button>
      <ConfirmModal
        isOpen={isConfirmOpen}
        title='Вдалось допомогти тваринці?'
        description='Ми збираємо статистику, щоб знати, скільком тваринам вдалось допомогти завдяки сервісу. Будь ласка, вкажіть причину деактивації.'
        onConfirm={handleConfirm}
        onDecline={handleDecline}
        onClose={() => setIsConfirmOpen(false)}
      />
    </div>
  );
  if (isMobile) {
    return (
      <div className='bg-gray-0 shadow-default p-4 rounded-md grid gap-2'>
        <div className='flex gap-6'>
          {image}
          <div className='flex flex-col justify-between flex-1 gap-2'>
            {info} {isMobile && statusLabel}{' '}
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
        {info} <div className='grid gap-2'>{buttons}</div>
      </div>
    </div>
  );
};
