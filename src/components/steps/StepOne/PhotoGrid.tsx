import clsx from 'clsx';
import { MAX_PHOTOS } from '@/schemas/pet.schema';
import { PhotoSlot } from './PhotoSlot';

interface IPhotoGridProps {
  photos: File[];
  firstEmptyIndex: number;
  onAddClick: () => void;
  onMakeMain: (index: number) => void;
  onRemove: (index: number) => void;
}

export const PhotoGrid = ({
  photos,
  firstEmptyIndex,
  onAddClick,
  onMakeMain,
  onRemove,
}: IPhotoGridProps) => {
  return (
    <div className={clsx('grid grid-cols-3 gap-2 lg:grid-cols-6 lg:gap-6')}>
      {Array.from({ length: MAX_PHOTOS }).map((_, index) => {
        const file = photos[index];

        return (
          <PhotoSlot
            key={index}
            file={file}
            isMain={index === 0}
            isAddButtonSlot={index === firstEmptyIndex}
            onAddClick={onAddClick}
            onMakeMain={() => onMakeMain(index)}
            onRemove={() => onRemove(index)}
          />
        );
      })}
    </div>
  );
};
