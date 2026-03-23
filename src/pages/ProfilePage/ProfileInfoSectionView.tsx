// ProfileInfoSectionView.tsx
import { Separator } from '@/components/ui/separator';
import { isPersonalUser } from '@/utils/helpers/guards/userType';
import { USER_ROLE } from '@/types/UserRole';
import type { TUser } from '@/schemas/user/user.form.schema';
import type { TViewFieldConfig } from './viewFields.config';

type Props = {
  title: string;
  user: TUser;
  fields: TViewFieldConfig[];
};

export const ProfileInfoSectionView = ({ title, user, fields }: Props) => {
  const visibleFields = fields.filter((f) =>
    isPersonalUser(user) ? f.hideFor !== USER_ROLE.personal : f.hideFor !== USER_ROLE.shelter
  );

  return (
    <div className='px-6 py-4 shadow-default bg-gray-0 rounded-md'>
      <h2 className='typo-h2 mb-4'>{title}</h2>

      <ul>
        {visibleFields.map((field, index) => (
          <div key={field.getLabel(user)}>
            <li className='flex flex-col py-2 lg:items-center lg:flex-row lg:py-3 lg:justify-between'>
              <span className='typo-secondary'>{field.getLabel(user)}</span>
              <span className='typo-main'>{field.getValue(user)}</span>
            </li>
            {index !== visibleFields.length - 1 && <Separator className='mt-1' />}
          </div>
        ))}
      </ul>
    </div>
  );
};
