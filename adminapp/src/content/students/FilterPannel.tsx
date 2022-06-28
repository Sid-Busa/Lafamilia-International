import { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Paper, Typography, Grid, Button } from '@mui/material';
import { Box } from '@mui/system';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TextField from 'src/components/Form/TextField';
import CheckBox from 'src/components/Form/CheckBox';

import useStyles from './style';

const FilterPannel: FC = (): ReactElement => {
  const classes = useStyles();
  const { control, watch } = useForm();
  return (
    <Paper className={classes.filterPannel}>
      <Box component={'div'}>
        <Typography variant="h4" className={classes.filterTitle}>
          <FilterAltIcon /> Filer Student
        </Typography>
      </Box>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item sm={4}>
          <TextField
            name="student_name"
            type="text"
            defaultValue=""
            label="Name"
            rules={{ required: 'Please enter a student name' }}
            variant="outlined"
            control={control}
            onChange={(text: any) => {}}
            error={false}
            helperText={''}
          />
        </Grid>
        <Grid item sm={6} className={classes.checkBoxPosition}>
          <CheckBox
            name="foundation"
            label="Foundation"
            error={false}
            rules={{}}
            control={control}
            helperText=""
            disabled={false}
            onChange={(e) => {}}
          />
          <CheckBox
            name="adavance"
            label="Adavance class"
            error={false}
            rules={{}}
            control={control}
            helperText=""
            disabled={false}
            onChange={(e) => {}}
          />
        </Grid>
        <Grid item sm={2} className={classes.csvButtonPositon}>
          <Button variant="contained" className={classes.button}>
            download CSV
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterPannel;
