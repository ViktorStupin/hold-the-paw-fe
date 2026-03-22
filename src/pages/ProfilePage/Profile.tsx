// pages/ProfileLayout/ProfileLayout.tsx
import { useUserStore } from '@/store/user.store';

import { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { FieldMessage } from '@/components/ui/field';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { RoutePath } from '@/routes/root.config';
import { logout } from '@/store/auth.store';
import { PencilLine } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ProfileInfoSection } from './ProfileInfoSection';
import { contactsFields, mainFields } from './ProfileFields.config';
import { useGoBack } from '@/utils/helpers/routing/useGoBack';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  editProfileSchema,
  type TEditableFieldName,
  type TEditProfileFields,
} from '@/schemas/editProfile.schema';
import { isPersonalUser, isShelterUser } from '@/utils/helpers/guards/userType';
import { profileServices } from '@/utils/api/services/profile.services';
import { getServerErrorMessage } from '@/utils/errors/getServerErrorMessage';
import type { TUser } from '@/types/User';

type IProfileProps = {
  variant: 'view' | 'edit';
};

export const Profile = ({ variant }: IProfileProps) => {
  const { fetchMe, user, isLoading, error } = useUserStore();
  const navigate = useNavigate();
  const goBack = useGoBack();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

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

  const methods = useForm<TEditProfileFields>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      role: user.role,
      phone_number: user?.phone_number ?? '',
      viber_phone_number: user?.viber_phone_number ?? '',
      telegram_nickname: user?.telegram_nickname ?? '',
      ...(isPersonalUser(user!)
        ? { full_name: user.full_name }
        : { company_name: user!.company_name, tax_id: user!.tax_id }),
    },
  });

  const { handleSubmit, setError, formState, watch, clearErrors } = methods;
  const { isSubmitting, isValid } = formState;

  const isLightDisabled = isSubmitting || isValid;

  useEffect(() => {
    const subscription = watch(() => {
      if (formState.errors.root) {
        clearErrors('root');
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, formState.errors.root, clearErrors]);

  const onClickSubmit = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;
    handleSubmit(onSubmit)();
  };

  const onSubmit = async (data: TEditProfileFields) => {
    try {
      const payload: Partial<TUser> = {
        phone_number: data.phone_number,
        viber_phone_number: data.viber_phone_number,
        telegram_nickname: data.telegram_nickname,
      };

      if (isShelterUser(data)) {
        payload.company_name = data.company_name;
        payload.tax_id = data.tax_id;
      } else {
        payload.full_name = data.full_name;
      }
      await profileServices.updateMe(payload);
    } catch (error) {
      setError('root', { message: getServerErrorMessage(error) });
    }
  };

  const viewContent = (
    <>
      <ProfileInfoSection title='Головна інформація' user={user} fields={mainFields} />
      <ProfileInfoSection title='Контактні дані' user={user} fields={contactsFields} />
    </>
  );
  const editContent = (
    <FormProvider {...methods}>
      <form onSubmit={onClickSubmit}>
        <ProfileInfoSection
          title='Головна інформація'
          user={user}
          fields={mainFields}
          isEdit={true}
        />
        <ProfileInfoSection
          title='Контактні дані'
          user={user}
          fields={contactsFields}
          isEdit={true}
        />
      </form>
    </FormProvider>
  );

  const viewButtons = (
    <>
      <Button asChild>
        <Link to={RoutePath.EditProfile}>
          Редагувати <Icon icon={PencilLine} size={24} />
        </Link>
      </Button>
      <Button
        onClick={() => {
          navigate(RoutePath.Default, { replace: true });
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
        onClick={onClickSubmit}
      ></Button>
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
      <div className='flex flex-col gap-6 w-full lg:max-w-165'>
        {variant === 'view' ? viewContent : editContent}
      </div>

      <div className='grid gap-4 w-full fixed bottom-6 inset-x-0 px-4 lg:static lg:px-0 lg:mx-auto lg:max-w-108'>
        {variant === 'view' ? viewButtons : editButtons}
      </div>
    </div>
  );
};
