// ProfileInfoSection.tsx
import { Separator } from '@/components/ui/separator';
import type { TUser } from '@/types/User';
import type { TUserRole } from '@/types/UserRole';
import { isPersonalUser } from '@/utils/helpers/guards/userType';

export type TFieldConfig = {
  getLabel: (user: TUser) => string;
  getValue: (user: TUser) => string;
  hideFor?: TUserRole;
};

type Props = {
  title: string;
  user: TUser;
  fields: TFieldConfig[];
};

export const ProfileInfoSection = ({ title, user, fields }: Props) => {
  const visibleFields = fields.filter((f) =>
    isPersonalUser(user) ? f.hideFor !== 'personal' : f.hideFor !== 'shelter'
  );

  return (
    <>
      <div className='px-6 py-4 shadow-default bg-gray-0 rounded-md'>
        <h2 className='typo-h2 mb-4'>{title}</h2>

        <ul>
          {visibleFields.map((field) => (
            <div key={field.getLabel(user)}>
              <li className='flex flex-col py-2 lg:justify-between lg:py-3 lg:flex-row'>
                <span className='typo-label'>{field.getLabel(user)}</span>
                <span className='typo-main'>{field.getValue(user)}</span>
              </li>
              <Separator />
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};
