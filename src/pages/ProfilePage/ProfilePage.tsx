import { Button } from '@/components/ui/button';
import { FieldMessage } from '@/components/ui/field';
import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { RoutePath } from '@/routes/root.config';
import { logout } from '@/store/auth.store';
import { useUserStore } from '@/store/user.store';
import { PencilLine } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProfileInfoSection } from './ProfileInfoSection';
import { contactsFields, mainFields } from './profileLabes.config';

export const ProfilePage = () => {
  const { fetchMe, user, isLoading, error } = useUserStore();

  useEffect(() => {
    fetchMe();
  }, []);

  if (isLoading || !user) {
    return (
      <div className='flex-1 flex items-center justify-center u-container'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex-1 flex items-center justify-center u-container'>
        <FieldMessage message={error} />
      </div>
    );
  }

  return (
    <div className='flex-1 flex flex-col items-center justify-between gap-10 pt-8 pb-43 lg:py-10 u-container'>
      <div className='flex flex-col gap-6 w-full lg:max-w-165'>
        <ProfileInfoSection title='Головна інформація' user={user} fields={mainFields} />
        <ProfileInfoSection title='Контактні дані' user={user} fields={contactsFields} />
      </div>

      <div className='grid gap-4 w-full fixed bottom-6 inset-x-0 px-4 lg:static lg:px-0 lg:mx-auto lg:max-w-108'>
        <Button asChild>
          <Link to={RoutePath.EditProfile}>
            Редагувати <Icon icon={PencilLine} size={24} />
          </Link>
        </Button>
        <Button onClick={logout} variant='secondary' className='bg-gray-30'>
          Вийти
        </Button>
      </div>
    </div>
  );
};
