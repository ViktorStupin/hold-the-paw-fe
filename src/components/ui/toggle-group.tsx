// toggle-group.tsx
'use client';

import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';
import { toggleVariants } from '@/components/ui/toggle';

type ToggleVariantProps = VariantProps<typeof toggleVariants>;

const ToggleGroupContext = React.createContext<ToggleVariantProps & { spacing?: number }>({
  size: 'default',
  variant: 'default',
  spacing: 0,
});

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  ToggleVariantProps & {
    spacing?: number;
  }) {
  return (
    <ToggleGroupContext.Provider value={{ variant, size, spacing }}>
      <ToggleGroupPrimitive.Root
        data-slot='toggle-group'
        data-variant={variant}
        data-size={size}
        data-spacing={spacing}
        className={cn('flex items-center', className)}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Root>
    </ToggleGroupContext.Provider>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & ToggleVariantProps) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot='toggle-group-item'
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

interface IToggleSwitcherProps<T extends string | boolean> extends ToggleVariantProps {
  value?: T;
  onChange?: (value: T) => void;
  options: readonly T[];
  labels?: Record<string, string>;
  className?: string;
  itemClassName?: string;
}

function ToggleSwitcher<T extends string | boolean>({
  value,
  onChange,
  options,
  labels,
  variant = 'switcher',
  size = 'switcher',
  className,
  itemClassName,
}: IToggleSwitcherProps<T>) {
  return (
    <ToggleGroup
      type='single'
      value={String(value)}
      variant={variant}
      size={size}
      onValueChange={(val) => {
        if (val) onChange?.(val as T);
      }}
      className={cn('rounded-full border-2 border-gray-80 bg-white p-1', className)}
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={String(option)}
          value={String(option)}
          className={cn('data-[state=off]:cursor-pointer', itemClassName)}
        >
          {labels?.[String(option)] ?? option}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export { ToggleGroup, ToggleGroupItem, ToggleSwitcher };
