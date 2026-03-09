// PhotoPreview.tsx
import { useEffect, useState } from 'react';

interface IPhotoPreviewProps {
  file: File;
  alt?: string;
  className?: string;
}

export const PhotoPreview = ({ file, alt, className }: IPhotoPreviewProps) => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setSrc(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  if (!src) return null;

  return <img src={src} alt={alt ?? file.name} className={className} />;
};
