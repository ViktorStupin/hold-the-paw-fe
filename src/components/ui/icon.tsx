import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconVariants = cva('shrink-0 transition-transform', {
  variants: {
    rotate: {
      0: '',
      90: 'rotate-90',
      '-90': '-rotate-90',
      180: 'rotate-180',
      '-180': '-rotate-180',
    },
    scale: {
      100: '',
      110: 'scale-110',
      125: 'scale-125',
    },
    hoverScale: {
      true: 'hover:scale-110',
      false: '',
    },
  },
  defaultVariants: {
    rotate: 0,
    scale: 100,
    hoverScale: false,
  },
});

type IconSize = 16 | 20 | 24 | 32 | 48;

type IconProps = VariantProps<typeof iconVariants> & {
  icon: LucideIcon;
  size?: IconSize;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  className?: string;
};

export function Icon({
  icon: LucideIcon,
  size = 24,
  color = 'var(--gray-0)',
  strokeWidth = 2,
  absoluteStrokeWidth,
  rotate,
  scale,
  hoverScale,
  className,
}: IconProps) {
  return (
    <LucideIcon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      absoluteStrokeWidth={absoluteStrokeWidth}
      className={cn(iconVariants({ rotate, scale, hoverScale }), className)}
    />
  );
}
