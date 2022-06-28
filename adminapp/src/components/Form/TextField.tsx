import { FC, ReactElement } from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

type ChildProps = {
  name: string;
  defaultValue: string;
  label: string;
  variant: 'filled' | 'standard' | 'outlined';
  error: boolean;
  control: any;
  rules: any;
  type: string;
  helperText: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  onChange?: any;
};

const defaultProps: ChildProps = {
  name: '',
  defaultValue: '',
  label: '',
  variant: 'outlined',
  error: false,
  control: '',
  rules: {},
  type: 'text',
  helperText: 'string',
  disabled: false,
  multiline: false,
  rows: 4
};

const Text: FC<ChildProps> = ({
  name,
  defaultValue,
  label,
  variant,
  control,
  error,
  rules,
  type,
  helperText,
  multiline,
  rows,
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
          {...props}
          {...field}
          fullWidth
          type={type}
          label={label}
          variant={variant}
          error={error}
          helperText={helperText}
          multiline={multiline}
          rows={rows}
          onChange={(value) => {
            field.onChange(value);
            props?.onChange && props?.onChange(value);
          }}
        />
      )}
    />
  );
};
Text.defaultProps = defaultProps as Partial<ChildProps>;

export default Text;
