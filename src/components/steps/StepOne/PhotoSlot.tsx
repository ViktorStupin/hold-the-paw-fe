import clsx from 'clsx';
import { Icon } from '@/components/ui/icon';
import { PhotoPreview } from './PhotoPreview';
import { CirclePlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mainPhotoBadgeClassName = clsx(
  'absolute bottom-0 left-1/2 -translate-x-1/2',
  'px-1 py-1 lg:px-4',
  'rounded-tl-md rounded-tr-md',
  'border-t border-l border-r'
);

interface IPhotoSlotProps {
  file?: File;
  isMain: boolean;
  isAddButtonSlot: boolean;
  onAddClick: () => void;
  onMakeMain: () => void;
  onRemove: () => void;
}

export const PhotoSlot = ({
  file,
  isMain,
  isAddButtonSlot,
  onAddClick,
  onMakeMain,
  onRemove,
}: IPhotoSlotProps) => {
  return (
    <div
      className={clsx('relative h-37 overflow-hidden rounded-sm bg-gray-30 lg:h-66.75', {
        'border-4 border-solid border-primary-40': isMain && file,
        'border-2 border-primary-40': isAddButtonSlot,
        'border border-transparent': !isMain && !isAddButtonSlot,
      })}
    >
      {file ? (
        <>
          <button type='button' onClick={onMakeMain} className='block h-full w-full cursor-pointer'>
            <PhotoPreview
              file={file}
              alt={file.name}
              className='block h-full w-full object-cover'
            />
          </button>

          <Button
            type='button'
            variant='round'
            size='round-md'
            onClick={onRemove}
            className='absolute right-2 top-2 lg:size-10'
            aria-label='Видалити фото'
          >
            <Icon icon={X} size={24} color='var(--gray-0)' />
          </Button>

          {isMain && (
            <div
              className={clsx(
                mainPhotoBadgeClassName,
                'bg-primary-40 typo-secondary box-content whitespace-nowrap border-gray-0 text-[14px] text-gray-0'
              )}
            >
              Головне фото
            </div>
          )}
        </>
      ) : (
        <>
          {isAddButtonSlot && (
            <button
              type='button'
              onClick={onAddClick}
              className='flex h-full w-full cursor-pointer items-center justify-center'
              aria-label='Додати фото'
            >
              <Icon icon={CirclePlus} size={48} color='var(--primary-40)' strokeWidth={1} />
            </button>
          )}

          {isMain && (
            <div
              className={clsx(
                mainPhotoBadgeClassName,
                'bg-light-opacity typo-secondary box-content whitespace-nowrap border-gray-80 text-[14px] text-gray-80'
              )}
            >
              Головне фото
            </div>
          )}
        </>
      )}
    </div>
  );
};
