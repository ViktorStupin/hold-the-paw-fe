import { Back } from '@/components/Back/Back';
import { MyPetCard } from '@/components/PetsCards/MyPetCard';
import { FieldMessage } from '@/components/ui/field';
import { ToggleSwitcher } from '@/components/ui/toggle-group';
import { usePetsStore } from '@/store/myPets.store';
import { useIsMobile } from '@/utils/helpers/layouts/useIsMobile';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';

const ACTIVE_STATES = ['active', 'inactive'] as const;
type ActiveState = (typeof ACTIVE_STATES)[number];

const ACTIVE_LABELS: Record<ActiveState, string> = {
  active: 'Активовані профілі',
  inactive: 'Деактивовані профілі',
};

const ACTIVE_LABELS_MOBILE: Record<ActiveState, string> = {
  active: 'Активовані',
  inactive: 'Деактивовані',
};

export const MyPetPage = () => {
  const isMobile = useIsMobile();
  const [activeState, setActiveState] = useState<ActiveState>('active');
  const { myPets, isLoading, error, fetchMyPets } = usePetsStore();

  useEffect(() => {
    fetchMyPets();
  }, []);

  const isActive = activeState === 'active';
  const filteredPets = myPets.filter((pet) => pet.is_active === isActive);
  // const filteredPets = [...myPets];

  const plug = (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <h3 className='typo-h3 text-center'>
        {isActive
          ? 'Активовані профілі тваринок будуть відображатись тут після їх створення'
          : 'Деактивовані профілі тваринок будуть відображатись тут'}
      </h3>
      <p className='typo-main text-center'>
        {isActive
          ? 'Ці профілі доступні всім. Ви зможете в будь-який момент їх деактивувати.'
          : 'Ці профілі приховані від інших користувачів.'}
      </p>
    </div>
  );

  let content = (
    <div className='flex-1 flex flex-col'>
      <div className='flex justify-center mb-6 lg:mb-8'>
        <ToggleSwitcher
          className='w-full lg:max-w-165'
          options={ACTIVE_STATES}
          labels={isMobile ? ACTIVE_LABELS_MOBILE : ACTIVE_LABELS}
          value={activeState}
          variant={'switcher'}
          size={'switcher'}
          onChange={setActiveState}
        />
      </div>

      {filteredPets.length === 0 ? (
        <>{plug}</>
      ) : (
        <ul className='grid gap-6 grid-cols-1 lg:grid-cols-2'>
          {filteredPets.map((pet) => (
            <li key={pet.id}>
              <MyPetCard pet={pet} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  if (isLoading) {
    content = (
      <div className='flex flex-1 items-center justify-center'>
        <Loader className='animate-spin' />
      </div>
    );
  }

  if (error) {
    content = (
      <div className='flex flex-1 items-center justify-center'>
        <FieldMessage message={error} />
      </div>
    );
  }

  return (
    <div className='flex-1 flex flex-col u-container'>
      {isMobile && <Back />}
      <section className='flex flex-1 flex-col pt-4 pb-6 lg:py-10'>{content}</section>
    </div>
  );
};
