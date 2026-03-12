// src/features/auth/ui/SignUpForm.tsx
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { PasswordField } from '@/components/ui/field-structure';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldMessage } from '@/components/ui/field';
import { Link } from 'react-router-dom';
import { RoutePath } from '@/routes/root.config';
import { signInSchema, type SignInData } from '@/schemas/signIn';

export function SignInForm() {
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
    formState: { errors, isValid },
  } = methods;

  const onSubmit = async (data: SignInData) => {
    console.log(data);
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
        </div>
        <div>
          <Button
            className='mt-15 w-full'
            type='submit'
            variant={isValid ? 'primary' : 'lightDisabled'}
          >
            Увійти
          </Button>
          <div className='mt-4 flex gap-2 items-center justify-center'>
            <p className='typo-main text-gray-80'>Не маєте акаунт?</p>
            <Link className='p-3 text-gray-90'to={`../${RoutePath.SignUp}`}>
              Зарєеструватися
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
