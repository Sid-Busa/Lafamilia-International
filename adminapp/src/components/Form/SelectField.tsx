import { FC, ReactElement } from 'react';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { makeStyles } from '@mui/styles';

type MyOption = {
  key: string;
  name: string;
  value: string;
};

type ChildProps = {
  name: string;
  label: string;
  variant: 'filled' | 'standard' | 'outlined';
  labelId: string;
  defaultValue: string;
  option: MyOption[];
  rules: any;
  error: boolean;
  control: any;
  helperText: string;
  disabled?: boolean;
};

const useStyles = makeStyles({
  paper: {
    '& .MuiMenu-list': {
      '& .MuiMenuItem-root': {
        padding: '6px 16px',
        display: 'flex',
        justifyContent: 'flex-start'
      }
    }
  }
});

const SelectField: FC<ChildProps> = ({
  name,
  label,
  variant,
  error,
  control,
  labelId,
  rules,
  defaultValue,
  option,
  helperText,
  ...props
}): ReactElement => {
  const classes = useStyles();

  return (
    <FormControl fullWidth variant={variant} error={error}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => (
          <Select
            {...field}
            {...props}
            MenuProps={{
              classes: {
                paper: classes.paper
              }
            }}
            labelId={labelId}
            label={label}
          >
            {option.map(({ key, value, name }) => (
              <MenuItem key={key} value={value}>
                {name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectField;
