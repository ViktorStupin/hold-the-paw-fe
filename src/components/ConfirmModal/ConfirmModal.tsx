// components/ConfirmModal/ConfirmModal.tsx
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useIsMobile } from '@/utils/helpers/layouts/useIsMobile';

interface IConfirmModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  declineLabel?: string;
  onConfirm: () => void;
  onDecline: () => void;
  onClose: () => void;
}

export const ConfirmModal = ({
  isOpen,
  title,
  description,
  confirmLabel = 'Так',
  declineLabel = 'Ні',
  onConfirm,
  onDecline,
  onClose,
}: IConfirmModalProps) => {
  const isMobile = useIsMobile();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='flex flex-col gap-6' isMobileFullWidth={isMobile}>
        <DialogTitle className='text-center typo-h3'>{title}</DialogTitle>

        {description && (
          <DialogDescription className='text-center typo-main'>{description}</DialogDescription>
        )}

        <div className='grid grid-cols-2 gap-4'>
          <Button variant='secondary' onClick={onDecline}>
            {declineLabel}
          </Button>
          <Button variant='primary' onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
