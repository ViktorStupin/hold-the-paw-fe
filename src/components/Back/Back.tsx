// import { useCallback } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Icon } from '../ui/icon';
import { useGoBack } from '@/utils/helpers/routing/useGoBack';

interface IBackProps {
  onBack?: () => void;
  label?: string;
}

export const Back = ({ onBack, label = 'Назад' }: IBackProps) => {
  const goBack = useGoBack();
  
  const handleClick = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  return (
    <div className='flex gap-2 p-3 items-start w-fit' onClick={handleClick}>
      <Icon icon={ChevronLeft} size={24} color='var(--gray-80)'/>
      <span className='typo-main'>{label}</span>
    </div>
  );
};
