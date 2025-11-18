import { FormHelperText } from '@mui/material';

export interface FormErrorProps {
  error?: string;
  id?: string;
}

export const FormError = ({ error, id }: FormErrorProps) => {
  if (!error) return null;

  return (
    <FormHelperText error id={id} sx={{ mt: 0.5 }}>
      {error}
    </FormHelperText>
  );
};

