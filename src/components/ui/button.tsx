/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-circle border border-solid transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none  aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          'bg-primary-40 text-gray-0 border-none hover:bg-primary-60 hover:shadow-[-4px_4px_10px_0px_#0000001A] active:bg-primary-20 disabled:bg-gray-50',
        secondary:
          'text-gray-90 border-gray-90 hover:bg-gray-30 hover:border-gray-100 hover:text-gray-100 hover:shadow-[-4px_4px_10px_0px_#0000001A] active:text-gray-80 active:border-gray-80 active:bg-gray-50 disabled:border-gray-70 disabled:text-gray-70',
        tertiary:
          'bg-light-opacity text-gray-0 hover:border-gray-0 hover:shadow-[-4px_4px_10px_0px_#0000001A] active:text-gray-50 active:border-gray-50 disabled:border-gray-70 disabled:text-gray-70',
        choise:
          'typo-main bg-gray-30 text-gray-90 border-none hover:text-primary-60 hover:border-1 hover:border-solid active:bg-primary-20 active:border-primary-60 active:border-1 active: border-solid disabled:bg-gray-30 disabled:text-gray-50 disabled:border-gray-50 disabled: border-1 disabled: border-solid',
        lightDisabled: 'bg-gray-50 text-gray-0 border-none',
        transparent:
          'border-none bg-transparent shadow-none hover:bg-transparent active:bg-transparent focus-visible:ring-0 focus-visible:border-transparent',
        round:
          'bg-light-opacity text-gray-0 border-none shadow-default hover:border hover:border-gray-90 active:bg-gray-30',
      },
      size: {
        default: 'h-12.5 px-4 has-[>svg]:px-3',
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        auto: 'h-auto w-auto p-0',
        'round-md': 'size-8 rounded-full',
        'round-lg': 'size-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'primary',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot='button'
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
