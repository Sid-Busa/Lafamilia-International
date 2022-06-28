import { FC, ReactElement } from 'react';
import { Controller } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

type ChildProps = {
  name: string;
  label: string;
  error: boolean;
  rules: any;
  control: any;
  helperText: string;
  disabled: boolean;
  onChange?: any;
};

const defaultProps: ChildProps = {
  name: '',
  label: '',
  error: false,
  rules: {},
  control: '',
  helperText: '',
  disabled: false
};

const CheckBox: FC<ChildProps> = ({
  name,
  label,
  error,
  rules,
  control,
  helperText,
  ...props
}): ReactElement => {
  return (
    <FormControl sx={{ ml: 3 }} component="fieldset" variant="standard">
      <FormControlLabel
        control={
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Checkbox
                {...props}
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  props?.onChange && props.onChange(e.target.checked);
                }}
              />
            )}
          />
        }
        label={label}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

CheckBox.defaultProps = defaultProps;

export default CheckBox;
