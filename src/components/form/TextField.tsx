import { TextField as MuiTextField } from '@mui/material';
import type { ComponentProps } from 'react';
import { FormError } from './FormError';

type MuiTextFieldProps = ComponentProps<typeof MuiTextField>;

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'error' | 'helperText'> {
  error?: string;
  touched?: boolean;
  showError?: boolean;
}

export const TextField = ({
  error,
  touched,
  showError,
  id,
  label,
  ...props
}: TextFieldProps) => {
  const errorId = id ? `${id}-error` : undefined;
  const hasError = showError && touched && !!error;

  return (
    <>
      <MuiTextField
        {...props}
        id={id}
        label={label}
        error={hasError}
        aria-describedby={hasError ? errorId : undefined}
        fullWidth
        margin="normal"
      />
      {hasError && <FormError error={error} id={errorId} />}
    </>
  );
};

