import React from 'react';
import { cn } from '@/lib/utils'; // twMerge(clsx)

type IconSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type IconVariant = 'check';

interface IconProps {
  variant: IconVariant;
  size?: IconSize;
  className?: string;
  hoverScale?: boolean;
  rotate?: '90' | '-90' | '180' | '-180';
}

const ICON_MAP: Record<IconVariant, string> = {
  check: 'src/assets/icons/check.svg',
};

export const Icon: React.FC<IconProps> = ({
  variant,
  size = 'md',
  className,
  hoverScale = true,
  rotate,
}) => {
  return (
    <div
      className={cn(
        'icon',
        `icon-${size}`,
        hoverScale && 'icon-hover-scale',
        rotate && `icon-rotate-${rotate}`,
        className
      )}
      style={{ backgroundImage: `url(${ICON_MAP[variant]})` }}
    />
  );
};
