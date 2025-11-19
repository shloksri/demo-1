import { Alert } from '@mui/material';

export interface FormErrorProps {
  error?: string;
  id?: string;
}

export const FormError = ({ error, id }: FormErrorProps) => {
  if (!error) return null;

  return (
    <Alert severity="error" variant="outlined" role="alert" id={id} sx={{ mt: 0.5 }}>
      {error}
    </Alert>
  );
};

