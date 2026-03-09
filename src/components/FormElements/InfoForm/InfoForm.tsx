import { Icon } from '@/components/ui/icon';
import { statusConfig, type Status } from '@/types/Status';
import clsx from 'clsx';
import { TriangleAlert } from 'lucide-react';

interface IInfoFormProps {
  message?: string;
  status?: Status;
  isIcon?: boolean;
}

export const InfoForm: React.FC<IInfoFormProps> = ({
  message = 'Помилка',
  isIcon = true,
  status = 'danger',
}) => {
  return (
    <div className='mt-2 flex items-center'>
      {isIcon && (
        <Icon className='mr-1' icon={TriangleAlert} size={24} color={statusConfig[status].iconColor} />
      )}
      <span className={clsx('type-secondaty', statusConfig[status].textClass)}>{message}</span>
    </div>
  );
};
