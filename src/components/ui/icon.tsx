import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const iconVariants = cva(
  'block aspect-square bg-no-repeat bg-cover shrink-0 transition-transform',
  {
    variants: {
      variant: {
        check: "bg-[url('/src/assets/icons/check.svg')]",
        location: "bg-[url('/src/assets/icons/location.svg')]",
        dangerAlert: 'bg-[url("/src/assets/icons/danger-alert.svg")]',
        plus: 'bg-[url("/src/assets/icons/plus.svg")]',
        cross: 'bg-[url("/src/assets/icons/cross.svg")]',
      },
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
        xxl: 'h-12 w-12',
      },
      rotate: {
        '90': 'rotate-90',
        '-90': '-rotate-90',
        '180': 'rotate-180',
        '-180': '-rotate-180',
      },
      hoverScale: {
        true: 'hover:scale-110',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      hoverScale: true,
    },
  }
);

export type IconVariant = NonNullable<VariantProps<typeof iconVariants>['variant']>;

type IconProps = VariantProps<typeof iconVariants> & {
  className?: string;
};

export function Icon({ variant, size, rotate, hoverScale = false, className }: IconProps) {
  return <span className={cn(iconVariants({ variant, size, rotate, hoverScale }), className)} />;
}
