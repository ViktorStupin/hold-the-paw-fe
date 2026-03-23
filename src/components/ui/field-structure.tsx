import { Icon } from '@/components/ui/icon';
import { Eye, EyeClosed } from 'lucide-react';
import { useController, useFormContext } from 'react-hook-form';
import { Input, type InputProps } from './input';
import { ToggleSwitcher } from './toggle-group';
import type { toggleVariants } from './toggle';
import type { VariantProps } from 'class-variance-authority';
import { useState } from 'react';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './input-group';
import { Checkbox } from './checkbox';

interface INormalizedInputFieldProps extends InputProps {
  name: string;
  normalize?: (value: string) => string;
}

export const NormalizedInputField = ({
  name,
  id,
  normalize,
  ...inputProps
}: INormalizedInputFieldProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  return (
    <Input
      {...inputProps}
      {...field}
      id={id ?? name}
      onChange={(e) => field.onChange(normalize ? normalize(e.target.value) : e.target.value)}
      aria-invalid={!!fieldState.error}
    />
  );
};

interface ISwitcherFieldProps<TValue extends string> extends VariantProps<typeof toggleVariants> {
  name: string;
  options: readonly TValue[];
  labels: Record<string, string>;
  className?: string;
  itemClassName?: string;
}

export const SwitcherField = <TValue extends string>({
  options,
  labels,
  name,
  variant,
  size,
  className,
  itemClassName,
}: ISwitcherFieldProps<TValue>) => {
  const { control } = useFormContext();
  const { field } = useController({ control, name });

  return (
    <ToggleSwitcher
      {...field}
      options={options}
      labels={labels}
      variant={variant}
      size={size}
      className={className}
      itemClassName={itemClassName}
    />
  );
};

interface IPasswordFieldProps extends InputProps {
  name: string;
}

export const PasswordField = ({
  name,
  id,
  placeholder = 'Введіть пароль',
  bg,
  size,
}: IPasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { control } = useFormContext();
  const { field, fieldState } = useController({ control, name });

  return (
    <InputGroup>
      <InputGroupInput
        {...field}
        id={id ?? name}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        aria-invalid={!!fieldState.error}
        autoComplete='current-password'
        bg={bg}
        size={size}
      />
      <InputGroupAddon align='inline-end'>
        <InputGroupButton
          type='button'
          aria-label='toggle password'
          onClick={() => setShowPassword((p) => !p)}
        >
          <Icon icon={showPassword ? Eye : EyeClosed} color='var(--gray-80)' />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};

interface ICheckBoxFieldProps {
  name: string;
  id?: string;
}

export const CheckBoxField = ({ name, id }: ICheckBoxFieldProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  return (
    <Checkbox
      aria-invalid={!!fieldState.error}
      id={id ?? name}
      checked={field.value}
      onCheckedChange={field.onChange}
      ref={field.ref}
      name={field.name}
      onBlur={field.onBlur}
    />
  );
};
