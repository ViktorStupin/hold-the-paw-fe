// src/features/auth/ui/SignUpForm.tsx
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signUpSchema, type SignUpData } from '@/schemas/signUp.schema';
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
import { normalizeEDRPOU, normalizeUaPhone } from '@/utils/helpers/helpers';
import { Field, FieldGroup, FieldLabel, FieldMessage } from '@/components/ui/field';
import { Link } from 'react-router-dom';
import { RoutePath } from '@/routes/root.config';

export function SignUpForm() {
  const methods = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      role: USER_ROLE.shelter,
      email: '',
      password: '',
      phone_number: '',
      company_name: '',
      edrpou: '',
      terms_accepted: false,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = methods;

  const role = watch('role');

  const onSubmit = async (data: SignUpData) => {
    if (data.role === 'personal') {
      const { role, email, password, phone_number, full_name } = data;
      const payload = { role, email, password, phone_number, full_name };
      console.log(payload);
    } else {
      const { role, email, password, phone_number, company_name, edrpou } = data;
      const payload = { role, email, password, phone_number, company_name, edrpou };
      console.log(payload);
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

            <FieldGroup className='grid  gap-4 grid-cols-1 lg:grid-cols-2'>
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

            <Field>
              <FieldLabel htmlFor='phone_number'>Номер телефона</FieldLabel>
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
                  <FieldLabel htmlFor='edrpou'>ЄДРПОУ</FieldLabel>

                  <NormalizedInputField
                    name='edrpou'
                    normalize={normalizeEDRPOU}
                    placeholder='12345678'
                  />
                  <FieldMessage message={'edrpou' in errors ? errors.edrpou?.message : undefined} />
                </Field>
              </>
            )}

            <div>
              <Field orientation='horizontal' className='gap-2'>
                <CheckBoxField name='terms_accepted' />
                <FieldLabel htmlFor='terms_accepted' className='cursor-pointer'>
                  Я приймаю <Link to={RoutePath.TermsAndContitions}>умови угоди</Link>
                </FieldLabel>
              </Field>

              <FieldMessage className='mt-2' message={errors.terms_accepted?.message} />
            </div>
          </FieldGroup>
        </div>
        <div>
          <Button
            className='mt-15 w-full'
            type='submit'
            variant={isValid ? 'primary' : 'lightDisabled'}
          >
            Зареєструватись
          </Button>
          <div className='mt-4 flex gap-2 items-center justify-center'>
            <p className='typo-main text-gray-80'>Вже маєте акаунт?</p>
            <Link className='p-3 text-gray-90' to={`../${RoutePath.SignIn}`}>
              Увійти
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
