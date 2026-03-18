// src/features/auth/ui/SignUpForm.tsx
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { PasswordField } from '@/components/ui/field-structure';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldMessage } from '@/components/ui/field';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePath } from '@/routes/root.config';
import { signInSchema, type SignInData } from '@/schemas/signIn';
import { logout, setAuthLoading, setTokens, useAuthStore } from '@/store/auth.store';
import { getServerErrorMessage } from '@/utils/errors/getServerErrorMessage';
import { authServices } from '@/utils/api/services/auth.services';
import { Spinner } from '@/components/ui/spinner';
import { useEffect } from 'react';
import { scrollTop } from '@/utils/helpers/layouts/layouts';

export function SignInForm() {
  const navigate = useNavigate();
  const { isLoading, returnURL, setReturnUrl } = useAuthStore();

  const methods = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    formState: { errors, isValid },
  } = methods;

  useEffect(() => {
    const subscription = watch(() => {
      if (errors.root) {
        clearErrors('root');
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, errors.root, clearErrors]);

  const onSubmit = async (data: SignInData) => {
    try {
      logout();
      setAuthLoading(true);
      const tokens = await authServices.login({ ...data });
      setTokens(tokens.access, tokens.refresh);
      navigate(returnURL || RoutePath.Home);
      setReturnUrl(null);
      scrollTop();
    } catch (error) {
      setError('root', { message: getServerErrorMessage(error) });
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto w-full lg:w-120 px-6 py-8 flex flex-1 flex-col justify-between'
      >
        <div>
          <h1 className='mb-2 text-center typo-h1'>Раді бачити вас знову!</h1>
          <p className='mb-8 typo-main text-center text-gray-90'>
            Увійдіть, щоб керувати профілями тварин та відстежувати вашу місію.
          </p>
          <FieldGroup className='grid gap-4'>
            <Field>
              <FieldLabel htmlFor='email'>Пошта</FieldLabel>
              <Input
                id='email'
                aria-invalid={!!errors.email}
                size='md'
                bg='gray30'
                placeholder='Ваша пошта'
                autoComplete='email'
                {...register('email')}
              />
              <FieldMessage message={errors.email?.message} />
            </Field>

            <Field>
              <FieldLabel htmlFor='password'>Пароль</FieldLabel>

              <PasswordField name='password' placeholder='Введіть пароль' id='password' />

              <FieldMessage message={errors.password?.message} />
            </Field>
          </FieldGroup>
          {errors.root && <FieldMessage className='mt-2' message={errors.root.message} />}
        </div>

        <div>
          <Button
            className='mt-15 w-full'
            type='submit'
            variant={isValid ? 'primary' : 'lightDisabled'}
          >
            {isLoading && <Spinner />}
            {isLoading ? 'Вхід...' : 'Увійти'}
          </Button>
          <div className='mt-4 flex gap-2 items-center justify-center'>
            <p className='typo-main text-gray-80'>Не маєте акаунта?</p>
            <Link className='type-main type-link' to={`../${RoutePath.SignUp}`}>
              Зареєструватися
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
