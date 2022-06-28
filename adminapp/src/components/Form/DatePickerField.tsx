import { FC, ReactElement } from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

interface ChildProps {
  name: string;
  label: string;
  variant: 'filled' | 'standard' | 'outlined';
  format: string;
  defaultValue: string;
  rules: any;
  error: boolean;
  setValue?: any;
  control: any;
  helperText: string;
  disabled?: boolean;
}

const DatePickerField: FC<ChildProps> = ({
  name,
  label,
  variant,
  defaultValue,
  format,
  rules,
  error,
  setValue,
  control,
  helperText,
  ...props
}): ReactElement => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        rules={rules}
        render={({ field }) => (
          <DatePicker
            {...field}
            inputFormat={format}
            {...props}
            onChange={(value) => {
              if (value) {
                let dd = value.getDate();
                let mm = value.getMonth() + 1;
                const yyyy = value.getFullYear();
                if (dd < 10) {
                  dd = `0${dd}`;
                }
                if (mm < 10) {
                  mm = `0${mm}`;
                }

                if (yyyy && mm && dd) {
                  const date = `${yyyy}-${mm}-${dd}`;
                  setValue(name, date);
                } else {
                  setValue(name, '');
                }
              } else {
                setValue(name, '');
              }
            }}
            renderInput={(params: any) => {
              return (
                <TextField
                  {...params}
                  fullWidth
                  label={label}
                  error={error}
                  variant={variant}
                  helperText={helperText}
                />
              );
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePickerField;
