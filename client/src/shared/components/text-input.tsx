import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';

import { TextField, type TextFieldProps } from '@mui/material';

type Props<T extends FieldValues> = {
  error?: boolean;
} & UseControllerProps<T> &
  TextFieldProps;

export default function TextInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });

  return (
    <TextField
      {...props}
      {...field}
      value={field.value ?? ''}
      fullWidth
      variant="outlined"
      error={!!fieldState.error || props?.error}
      helperText={fieldState.error?.message}
      onChange={field.onChange}
    />
  );
}
