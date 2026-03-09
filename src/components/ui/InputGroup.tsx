import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input, type InputProps } from './input';

type InputGroupProps = {
  className?: string;
  endIcon?: React.ReactNode;
  endAction?: React.ReactNode;
  inputProps?: InputProps;
};

export function InputGroup({ className, endIcon, endAction, inputProps }: InputGroupProps) {
  const hasEnd = !!endIcon || !!endAction;

  return (
    <div className={cn('relative w-full', className)}>
      <Input {...inputProps} className={cn(inputProps?.className, hasEnd && 'pe-12')} />

      {endIcon && (
        <div className='pointer-events-none absolute  inset-y-0 inset-e-4 flex items-center'>
          {endIcon}
        </div>
      )}

      {endAction && (
        <div className='absolute inset-y-0 inset-e-4 flex items-center'>{endAction}</div>
      )}
    </div>
  );
}
