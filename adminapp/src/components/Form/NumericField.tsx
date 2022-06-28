import { FC, ReactElement } from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

type ChildProps = {
  name: string;
  defaultValue: string;
  label: string;
  variant: 'filled' | 'standard' | 'outlined';
  error: boolean;
  rules: any;
  control: any;
  helperText: string;
  disabled?: boolean;
};

const defaultProps: ChildProps = {
  name: '',
  defaultValue: '',
  label: '',
  variant: 'outlined',
  error: false,
  rules: {},
  control: '',
  helperText: 'string',
  disabled: false
};

const NumericField: FC<ChildProps> = ({
  name,
  defaultValue,
  label,
  variant,
  control,
  error,
  rules,
  helperText,
  ...props
}): ReactElement => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant={variant}
          error={error}
          helperText={helperText}
          inputProps={{ inputMode: 'numeric' }}
          fullWidth
          {...props}
        />
      )}
    />
  );
};

NumericField.defaultProps = defaultProps;

export default NumericField;
