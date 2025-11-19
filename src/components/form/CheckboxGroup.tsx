import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import { FormError } from './FormError';

export interface CheckboxGroupProps {
  id?: string;
  label: string;
  options: { value: string; label: string }[];
  values: string[];
  onChange: (values: string[]) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  showError?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export const CheckboxGroup = ({
  id,
  label,
  options,
  values,
  onChange,
  onBlur,
  error,
  touched,
  showError,
  required,
  disabled,
}: CheckboxGroupProps) => {
  const errorId = id ? `${id}-error` : undefined;
  const hasError = showError && touched && !!error;

  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...values, optionValue]);
    } else {
      onChange(values.filter((v) => v !== optionValue));
    }
  };

  return (
    <FormControl
      component="fieldset"
      fullWidth
      error={hasError}
      required={required}
      disabled={disabled}
      aria-describedby={hasError ? errorId : undefined}
    >
      <Typography variant="subtitle1" component="legend" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={values.includes(option.value)}
                onChange={(e) => handleChange(option.value, e.target.checked)}
                onBlur={onBlur}
                size="small"
                color="secondary"
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      {hasError && <FormError error={error} id={errorId} />}
    </FormControl>
  );
};

