// src/features/auth/ui/SignUpForm.tsx
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ROLE_OPTIONS, USER_ROLE } from '@/types/UserRole';

import { Input } from '@/components/ui/input';
import {
  SwitcherField,
  PasswordField,
  CheckBoxField,
  NormalizedInputField,
} from '@/components/ui/field-structure';
import { Button } from '@/components/ui/button';
import { USER_ROLE_LABEL_UA } from '@/constants/role.labes';
import { normalizeEDRPOU, normalizeUaPhone } from '@/utils/helpers/convertors/fieldsConvertors';
import { Field, FieldGroup, FieldLabel, FieldMessage } from '@/components/ui/field';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePath } from '@/routes/root.config';
import { authServices } from '@/utils/api/services/auth.services';
import { setLoading, setTokens, useAuthStore } from '@/store/auth.store';
import { getServerErrorMessage } from '@/utils/errors/getServerErrorMessage';
import { useEffect } from 'react';
import { scrollTop } from '@/utils/helpers/layouts/layouts';
import { signUpSchema, type TSignUpFields } from '@/schemas/auth/register/payload.schema';

export function SignUpForm() {
  const navigate = useNavigate();
  const { isLoading, returnURL, setReturnUrl } = useAuthStore();

  const methods = useForm<TSignUpFields>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      role: USER_ROLE.shelter,
      email: '',
      password: '',
      phone_number: '',
      company_name: '',
      tax_id: '',
      terms_accepted: false,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = methods;

  const role = watch('role');

  useEffect(() => {
    const subscription = watch(() => {
      if (errors.root) {
        clearErrors('root');
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, errors.root, clearErrors]);

  const onSubmit = async (data: TSignUpFields) => {
    try {
      setLoading(true);
      await authServices.register(data);
      const tokens = await authServices.login({
        email: data.email,
        password: data.password,
      });

      setTokens(tokens.access, tokens.refresh);
      navigate(returnURL || RoutePath.Home);
      setReturnUrl(null);
      scrollTop();
    } catch (error) {
      setError('root', { message: getServerErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto w-full lg:w-120 px-6 py-8 flex flex-1 flex-col justify-between'
      >
        <div>
          <h1 className='mb-2 text-center typo-h1'>Створіть свій профіль</h1>
          <p className='mb-8 typo-main text-center text-gray-90'>
            Допоможіть знайти дім кожному! Створюйте 20+ профілів тварин, щоб про вашу місію
            дізналося якнайбільше людей
          </p>
          <FieldGroup className='grid gap-4'>
            <SwitcherField
              name='role'
              options={ROLE_OPTIONS}
              labels={USER_ROLE_LABEL_UA}
              variant='switcher'
              size='switcher'
            />

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

            <Field>
              <FieldLabel htmlFor='phone_number'>Номер телефону</FieldLabel>
              <NormalizedInputField
                name='phone_number'
                normalize={normalizeUaPhone}
                type='tel'
                placeholder='+380 (__) ____ ___'
              />
              <FieldMessage message={errors.phone_number?.message} />
            </Field>

            {role === 'personal' && (
              <Field>
                <FieldLabel htmlFor='full_name'>ПІБ</FieldLabel>
                <Input
                  id='full_name'
                  type='text'
                  size='md'
                  bg='gray30'
                  placeholder='ПІБ'
                  {...register('full_name')}
                />
                <FieldMessage
                  message={'full_name' in errors ? errors.full_name?.message : undefined}
                />
              </Field>
            )}

            {role === 'shelter' && (
              <>
                <Field>
                  <FieldLabel htmlFor='company_name'>Назва компанії</FieldLabel>
                  <Input
                    id='company_name'
                    type='text'
                    size='md'
                    bg='gray30'
                    placeholder='Назва компанії'
                    {...register('company_name')}
                  />
                  <FieldMessage
                    message={'company_name' in errors ? errors.company_name?.message : undefined}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor='tax_id'>ЄДРПОУ</FieldLabel>

                  <NormalizedInputField
                    name='tax_id'
                    normalize={normalizeEDRPOU}
                    placeholder='12345678'
                  />
                  <FieldMessage message={'tax_id' in errors ? errors.tax_id?.message : undefined} />
                </Field>
              </>
            )}

            <div>
              <Field orientation='horizontal' className='gap-2'>
                <CheckBoxField name='terms_accepted' />
                <FieldLabel htmlFor='terms_accepted' className='cursor-pointer'>
                  Я приймаю{' '}
                  <Link target='_blank' className='typo-main typo-link' to={RoutePath.TermsAndContitions}>
                    умови угоди
                  </Link>
                </FieldLabel>
              </Field>

              <FieldMessage className='mt-2' message={errors.terms_accepted?.message} />
            </div>
          </FieldGroup>
          {errors.root && <FieldMessage className='mt-2' message={errors.root.message} />}
        </div>
        <div>
          <Button
            className='mt-15 w-full'
            type='submit'
            variant={isValid ? 'primary' : 'lightDisabled'}
          >
            {isLoading ? 'Реєстрація...' : 'Зареєструватися'}
          </Button>
          <div className='mt-4 flex gap-2 items-center justify-center'>
            <p className='typo-main text-gray-80'>Вже маєте акаунт?</p>
            <Link className='typo-main typo-link' to={`../${RoutePath.SignIn}`}>
              Увійти
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
