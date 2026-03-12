// toggle.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Toggle as TogglePrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';

const toggleVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium outline-none transition-[color,box-shadow,background-color] disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-[3px]',
  {
    variants: {
      variant: {
        default: 'rounded-md bg-nature',
        outline:
          'rounded-md border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground',
        switcher:
          'typo-main rounded-full bg-transparent text-gray-80 hover:bg-transparent hover:text-gray-80 data-[state=on]:bg-primary-40 data-[state=on]:text-gray-0',
      },
      size: {
        default: 'h-13.5 px-4',
        sm: 'h-8 min-w-8 px-1.5',
        lg: 'h-10 min-w-10 px-2.5',
        switcher: 'h-11.5 flex-1 px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root className={cn(toggleVariants({ variant, size }), className)} {...props} />
  );
}

export { Toggle, toggleVariants };
