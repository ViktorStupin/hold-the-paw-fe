import { Icon, type IconVariant } from '@/components/ui/icon';
import { statusConfig, type Status } from '@/types/Status';
import clsx from 'clsx';

type Props = {
  message?: string;
  status?: Status;
  iconType?: IconVariant;
};

export const InfoForm: React.FC<Props> = ({
  message = 'Помилка',
  iconType,
  status = 'danger',
}) => {
  return (
    <div className='mt-2 flex items-center'>
      {iconType && <Icon className='mr-1' variant={iconType} size='lg' />}
      <span className={clsx('type-secondaty', statusConfig[status].color)}>{message}</span>
    </div>
  );
};
