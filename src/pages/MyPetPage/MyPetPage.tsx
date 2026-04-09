import { useState } from 'react';
import { MyPetCard } from '@/components/PetsCards/MyPetCard';
import { ToggleSwitcher } from '@/components/ui/toggle-group';
import { Loader } from 'lucide-react';
import { FieldMessage } from '@/components/ui/field';
import { useMyPets } from '@/queries/pets/pets.queries';

const ACTIVE_STATES = ['active', 'inactive'] as const;
type ActiveState = (typeof ACTIVE_STATES)[number];

export const MyPetPage = () => {
  const [activeState, setActiveState] = useState<ActiveState>('active');
  const isActive = activeState === 'active';

  const { data: myPets = [], isFetching, error } = useMyPets(isActive);

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

  let content;
  if (isFetching) {
    content = (
      <div className='flex flex-1 items-center justify-center'>
        <Loader className='animate-spin' />
      </div>
    );
  } else if (error) {
    content = <FieldMessage message={error.message} />;
  } else if (myPets.length === 0) {
    content = plug;
  } else {
    content = (
      <ul className='grid gap-6 grid-cols-1 lg:grid-cols-2'>
        {myPets.map((pet) => (
          <li key={pet.id}>
            <MyPetCard pet={pet} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className='flex-1 flex flex-col u-container'>
      <section className='flex flex-1 flex-col pt-4 pb-6 lg:py-10'>
        <div className='flex justify-center mb-6 lg:mb-8'>
          <ToggleSwitcher
            className='w-full lg:max-w-165'
            options={ACTIVE_STATES}
            labels={{ active: 'Активовані', inactive: 'Деактивовані' }}
            value={activeState}
            variant='switcher'
            size='switcher'
            onChange={setActiveState}
          />
        </div>
        {content}
      </section>
    </div>
  );
};
