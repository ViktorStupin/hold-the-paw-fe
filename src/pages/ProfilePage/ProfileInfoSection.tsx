// ProfileInfoSection.tsx
import { Separator } from '@/components/ui/separator';
import type { TUser } from '@/types/User';
import { isPersonalUser } from '@/utils/helpers/guards/userType';
import type { TFieldConfig } from './ProfileFields.config';
import { useFormContext } from 'react-hook-form';
import type { TEditProfileFields } from '@/schemas/editProfile.schema';
import { USER_ROLE } from '@/types/UserRole';
import { Field, FieldGroup, FieldLabel, FieldMessage } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

type TProfileInfoSectionProps = {
  title: string;
  user: TUser;
  fields: TFieldConfig[];
  isEdit?: boolean;
};

export const ProfileInfoSection = ({
  title,
  user,
  fields,
  isEdit = false,
}: TProfileInfoSectionProps) => {
  const { formState, register } = useFormContext<TEditProfileFields>();
  const { errors } = formState;

  const visibleFields = fields.filter((f) =>
    isPersonalUser(user) ? f.hideFor !== USER_ROLE.personal : f.hideFor !== USER_ROLE.shelter
  );

  const viewContent = (
    <ul>
      {visibleFields.map((field) => (
        <li
          key={field.getLabel(user)}
          className='flex flex-col py-2 lg:flex-row lg:py-3 lg:justify-between'
        >
          <span className='typo-label'>{field.getLabel(user)}</span>
          <span className='typo-main'>{field.getValue(user)}</span>
          <Separator />
        </li>
      ))}
    </ul>
  );

  const editContent = (
    <FieldGroup>
      {visibleFields.map((field) => {
        if (!field.isEditable || !field.fieldName) return null;

        const fieldName = field.fieldName(user);

        return (
          <li key={fieldName} className='py-2 lg:py-3'>
            <Field>
              <FieldLabel
                text={field.getLabel(user)}
                defaultValue="Ім'я"
                htmlFor='name'
                className='mb-2 typo-h3'
              />
              <Input {...register(fieldName)} />
              <FieldMessage message={errors[fieldName]?.message ?? ''} />
            </Field>
            <Separator />
          </li>
        );
      })}
    </FieldGroup>
  );

  return (
    <div className='px-6 py-4 shadow-default bg-gray-0 rounded-md'>
      <h2 className='typo-h2 mb-4'>{title}</h2>
      {isEdit ? editContent : viewContent}
    </div>
  );
};
