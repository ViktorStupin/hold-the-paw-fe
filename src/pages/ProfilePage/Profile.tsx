import { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { FieldMessage } from '@/components/ui/field';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { RoutePath } from '@/routes/root.config';
import { logout } from '@/store/auth.store';
import { PencilLine } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { contactsFields, mainFields } from './viewFields.config';
import { useGoBack } from '@/utils/helpers/routing/useGoBack';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, type TUser } from '@/schemas/user/user.form.schema';
import { ProfileInfoSectionForm } from './ProfileInfoSectionForm';
import { ProfileInfoSectionView } from './ProfileInfoSectionView';
import { mapUserToForm } from '@/utils/helpers/mappers/mapUserToForm';
import { mapUserToRequest } from '@/utils/helpers/mappers/mapUserToRequest';
import { scrollTop } from '@/utils/helpers/layouts/layouts';
import { useMe } from '@/queries/user/user.queries';
import { useMutateMe } from '@/queries/user/user.mutations';

type IProfileProps = {
  variant: 'view' | 'edit';
};

export const Profile = ({ variant }: IProfileProps) => {
  const { data: user, isFetching, error } = useMe();
  const updateMe = useMutateMe();
  const navigate = useNavigate();
  const goBack = useGoBack();
  const methods = useForm<TUser>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
  });

  const { handleSubmit, formState } = methods;
  const { isValid } = formState;

  const isLightDisabled = isFetching || !isValid || updateMe.isPending;

  useEffect(() => {
    if (!user) return;
    methods.reset(mapUserToForm(user));
  }, [user]);

  const onSubmit = async (data: TUser) => {
    await updateMe.mutateAsync(mapUserToRequest(data));
    methods.reset();
    scrollTop();
    navigate(RoutePath.Profile);
  };

  if (isFetching || !user) {
    return (
      <div className='flex-1 flex items-center justify-center u-container'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex-1 flex items-center justify-center u-container'>
        <FieldMessage message={error.message} />
      </div>
    );
  }

  const viewContent = (
    <div className='flex flex-col gap-6'>
      <ProfileInfoSectionView
        key='Головна інформація'
        title='Головна інформація'
        user={user}
        fields={mainFields}
      />
      <ProfileInfoSectionView
        key='Контактні дані'
        title='Контактні дані'
        user={user}
        fields={contactsFields}
      />
    </div>
  );
  const editContent = (
    <FormProvider {...methods}>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
        <ProfileInfoSectionForm user={user} />
      </form>
    </FormProvider>
  );

  const viewButtons = (
    <>
      <Button asChild onClick={scrollTop}>
        <Link to={RoutePath.EditProfile}>
          Редагувати <Icon icon={PencilLine} size={24} />
        </Link>
      </Button>
      <Button
        onClick={() => {
          logout();
        }}
        variant='secondary'
        className='bg-gray-30'
      >
        Вийти
      </Button>
    </>
  );

  const editButtons = (
    <>
      <Button
        variant={isLightDisabled ? 'lightDisabled' : 'primary'}
        onClick={handleSubmit(onSubmit)}
      >
        {updateMe.isPending && <Spinner />}
        {updateMe.isPending ? 'Збереження' : 'Зберегти'}
      </Button>
      <Button
        onClick={() => {
          goBack();
        }}
        variant='secondary'
        className='bg-gray-30'
      >
        Відмінити
      </Button>
    </>
  );

  return (
    <div className='flex-1 flex flex-col items-center justify-between gap-10 pt-8 pb-43 lg:py-10 u-container'>
      <div className='w-full lg:max-w-165'>{variant === 'view' ? viewContent : editContent}</div>

      <div className='grid gap-4 w-full fixed bottom-6 inset-x-0 px-4 lg:static lg:px-0 lg:mx-auto lg:max-w-108'>
        {variant === 'view' ? viewButtons : editButtons}
      </div>
    </div>
  );
};
