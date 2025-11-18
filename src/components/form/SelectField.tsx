import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { FormError } from './FormError';

export interface SelectFieldProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: { value: string; label: string }[];
  error?: string;
  touched?: boolean;
  showError?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export const SelectField = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  options,
  error,
  touched,
  showError,
  required,
  disabled,
}: SelectFieldProps) => {
  const errorId = id ? `${id}-error` : undefined;
  const hasError = showError && touched && !!error;

  return (
    <FormControl
      fullWidth
      margin="normal"
      error={hasError}
      required={required}
      disabled={disabled}
    >
      <InputLabel id={id ? `${id}-label` : undefined}>{label}</InputLabel>
      <Select
        labelId={id ? `${id}-label` : undefined}
        id={id}
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-describedby={hasError ? errorId : undefined}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {hasError && <FormError error={error} id={errorId} />}
    </FormControl>
  );
};

