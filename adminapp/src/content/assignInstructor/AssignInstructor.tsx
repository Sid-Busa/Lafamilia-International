import { FC, ReactElement, useMemo } from 'react';
import { AssignInstructorProps } from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import { Grid, Avatar, Typography } from '@mui/material';
import SelectField from 'src/components/Form/SelectField';
import DatePickerField from 'src/components/Form/DatePickerField';
import AvatarImage from 'src/components/Form/Avatar';
import { Button } from '@material-ui/core';
import useStyles from 'src/content/assignInstructor/style';
import API from 'src/api/Api';
import { toast } from 'react-toastify';

const schema = yup.object({
  instructor: yup.string().required('Instructor  is required'),
  start_date: yup.string().required('Start date is required')
});

const AssignInstructor: FC<AssignInstructorProps> = ({
  student,
  instructorList,
  setRefreshData
}): ReactElement => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const instructors = useMemo(() => {
    const instructor = instructorList.map((instructor) => {
      return {
        key: instructor._id,
        name: instructor.instructor_name,
        value: instructor._id
      };
    });
    return instructor;
  }, [instructorList]);

  const onSubmit = async (data) => {
    const { instructor, start_date } = data;

    try {
      await API.post(`instructor/${instructor}/${student._id}/assign`, {
        startDate: start_date
      });
      toast.success('Instructor assign successfully');
      setRefreshData((preState: boolean) => !preState);
    } catch (e) {
      toast.error(e.response.data.error);
    }
  };

  const unassignInstructor = async () => {
    const { instructorDetail } = student;
    try {
      await API.post(
        `instructor/${instructorDetail.user_id}/${student._id}/unassign`,
        {
          endDate: new Date()
        }
      );
      toast.success('Instructor unassign successfully');
      setRefreshData((preState: boolean) => !preState);
    } catch (e) {
      toast.error(e.response.data.error);
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item sm={6}>
            <Box className={classes.imageBox}>
              <AvatarImage
                profile={student?.profilePhotoUrl}
                showEditIcon={false}
              />
            </Box>
            <Box
              mt={1}
              style={{
                textAlign: 'center',
                border: '1px solid black',
                fontWeight: 'bold',
                padding: 6
              }}
            >
              {student?.student_name}
            </Box>
          </Grid>
          {student.instructorDetail && (
            <Grid item sm={6}>
              <Box className={classes.imageBox}>
                <AvatarImage
                  profile={student?.instructorDetail?.profilePhotoUrl}
                  showEditIcon={false}
                />
              </Box>
              <Box
                mt={1}
                style={{
                  textAlign: 'center',
                  border: '1px solid black',
                  fontWeight: 'bold',
                  padding: 6
                }}
              >
                {student?.instructorDetail?.instructor_name}
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        {student.instructorDetail ? (
          <Typography variant="h4" className={classes.instructor_text}>
            {student?.instructorDetail?.instructor_name} is the instructor for{' '}
            {student?.student_name}
          </Typography>
        ) : (
          <Typography variant="h4" className={classes.not_instructor_text}>
            No instructor assign to {student?.student_name}
          </Typography>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <SelectField
              name="instructor"
              label="Select/Update Instructor"
              variant="outlined"
              labelId="instructor"
              defaultValue={student?.instructorDetail?.instructor_id || ''}
              option={instructors}
              rules={{}}
              error={!!errors.instructor}
              control={control}
              helperText={errors.instructor ? errors.instructor?.message : ''}
            />
          </Box>
          <Box mt={1}>
            <DatePickerField
              name="start_date"
              label="Start Date"
              variant="outlined"
              defaultValue={student?.instructorDetail?.startDate || ''}
              format="dd-MM-yyyy"
              rules={{ required: 'Please enter start date' }}
              error={!!errors.start_date}
              control={control}
              setValue={setValue}
              helperText={errors.start_date ? errors.start_date?.message : ''}
              disabled={false}
            />
          </Box>

          <Box component="div" mt={1}>
            <Button
              variant="contained"
              type="submit"
              classes={{ root: classes.button }}
            >
              Assign Instructor
            </Button>
            {student.instructorDetail && (
              <Button
                variant="contained"
                onClick={unassignInstructor}
                classes={{ root: classes.unassignButton }}
              >
                Unassign Instructor
              </Button>
            )}
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};

export default AssignInstructor;
