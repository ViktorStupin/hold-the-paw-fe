import clsx from 'clsx';
import { Icon } from '@/components/ui/icon';
import { PhotoPreview } from './PhotoPreview';
import { CirclePlus, X } from 'lucide-react';

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
      className={clsx('relative h-37 rounded-sm bg-gray-30 lg:h-66.75', {
        'border-4 border-solid border-primary-40': isMain && file,
        'border-2 border-primary-40': isAddButtonSlot,
        'border border-transparent': !isMain && !isAddButtonSlot,
      })}
    >
      {file ? (
        <>
          <button type='button' onClick={onMakeMain} className='h-full w-full cursor-pointer'>
            <PhotoPreview
              file={file}
              alt={file.name}
              className='h-full w-full rounded-sm object-cover'
            />
          </button>

          <button
            type='button'
            onClick={onRemove}
            className='absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-light-opacity backdrop-blur-[15px] focus:border focus:border-gray-0 lg:h-10 lg:w-10'
            aria-label='Видалити фото'
          >
            <Icon icon={X} size={24} color='var(--gray-0)' />
          </button>

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
              <Icon icon={CirclePlus} size={32} color='--primary-40' />
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
