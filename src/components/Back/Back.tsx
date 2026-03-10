import { useNavigate } from 'react-router-dom';
// import { useCallback } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Icon } from '../ui/icon';

interface IBackProps {
  onBack?: () => void;
  label?: string;
}

export const Back = ({ onBack, label = 'Назад' }: IBackProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className='inline-flex gap-2 pt-3 items-start' onClick={handleClick}>
      <Icon icon={ChevronLeft} size={24} color='var(--gray-80)'/>
      <span className='typo-main'>{label}</span>
    </div>
  );
};
