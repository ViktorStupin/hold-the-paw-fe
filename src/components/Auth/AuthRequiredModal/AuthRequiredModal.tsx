import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/routes/root.config';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useIsMobile } from '@/utils/helpers/layouts/useIsMobile';

interface IAuthRequiredModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AuthRequiredModal = ({ message, isOpen, onClose }: IAuthRequiredModalProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const handleSignIn = () => {
    onClose();
    navigate(`${RoutePath.Auth}/${RoutePath.SignIn}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='flex flex-col gap-13.5' isMobileFullWidth={isMobile}>
        <span />
        <DialogDescription className='sr-only'>{message}</DialogDescription>

        <DialogTitle className='text-center typo-h3'>{message}</DialogTitle>

        <Button variant='primary' className='w-full' onClick={handleSignIn}>
          Авторизивуватися
        </Button>
      </DialogContent>
    </Dialog>
  );
};
