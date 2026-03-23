import { Separator } from '@/components/ui/separator';
import { Field, FieldGroup, FieldLabel, FieldMessage } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { NormalizedInputField } from '@/components/ui/field-structure';

import { useFormContext } from 'react-hook-form';
import { isPersonalUser } from '@/utils/helpers/guards/userType';
import type { TUser } from '@/schemas/user/user.form.schema';
import { normalizeEDRPOU, normalizeUaPhone } from '@/utils/helpers/convertors/fieldsConvertors';

type Props = {
  user: TUser;
};

export const ProfileInfoSectionForm = ({ user }: Props) => {
  const { register, formState } = useFormContext<TUser>();
  const { errors } = formState;

  return (
    <>
      <div className='px-6 py-4 shadow-default bg-gray-0 rounded-md'>
        <h2 className='typo-h2 mb-4'>Головна інформація</h2>

        <FieldGroup className='py-2 lg:py-3'>
          <Field>
            <FieldLabel text={isPersonalUser(user) ? 'ПІБ' : 'Назва компанії'} />

            {isPersonalUser(user) ? (
              <>
                <Input {...register('full_name')} placeholder='Введіть ПІБ' />
                <FieldMessage
                  message={'full_name' in errors ? errors.full_name?.message : undefined}
                />
              </>
            ) : (
              <>
                <Input {...register('company_name')} placeholder='Введіть назву компанії' />
                <FieldMessage
                  message={'company_name' in errors ? errors.company_name?.message : undefined}
                />
              </>
            )}
          </Field>
        </FieldGroup>

        <Separator />

        {!isPersonalUser(user) && (
          <>
            <FieldGroup className='py-2 lg:py-3'>
              <Field>
                <FieldLabel htmlFor='tax_id' text='ЄДРПОУ' />
                <NormalizedInputField
                  name='tax_id'
                  normalize={normalizeEDRPOU}
                  placeholder='12345678'
                />
                <FieldMessage message={'tax_id' in errors ? errors.tax_id?.message : undefined} />
              </Field>
            </FieldGroup>
          </>
        )}
      </div>

      <div className='px-6 py-4 shadow-default bg-gray-0 rounded-md'>
        <h2 className='typo-h2 mb-4'>Головна інформація</h2>

        <FieldGroup className='py-2 lg:py-3'>
          <Field>
            <FieldLabel text='Номер телефону' />
            <NormalizedInputField
              name='phone_number'
              normalize={normalizeUaPhone}
              type='tel'
              placeholder='+380 (__) ____ ___'
            />
            <FieldMessage message={errors.phone_number?.message} />
          </Field>
        </FieldGroup>

        <Separator />

        <FieldGroup className='py-2 lg:py-3'>
          <Field>
            <FieldLabel text='Вайбер' />
            <NormalizedInputField
              name='viber_phone_number'
              normalize={normalizeUaPhone}
              type='tel'
              placeholder='+380 (__) ____ ___'
            />
            <FieldMessage message={errors.viber_phone_number?.message} />
          </Field>
        </FieldGroup>

        <Separator />

        <FieldGroup className='py-2 lg:py-3'>
          <Field>
            <FieldLabel text='Телеграм' />
            <Input {...register('telegram_nickname')} placeholder='Нікнейм телеграма' />
            <FieldMessage message={errors.telegram_nickname?.message} />
          </Field>
        </FieldGroup>
      </div>
    </>
  );
};
