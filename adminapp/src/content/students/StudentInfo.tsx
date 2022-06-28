import React, { FC, ReactElement, useState, useEffect } from 'react';
import { StudentInfoProp } from './types';
import moment from 'moment';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from 'src/components/Form/TextField';
import Grid from '@mui/material/Grid';
import DatePickerField from 'src/components/Form/DatePickerField';
import LoadingButton from '@mui/lab/LoadingButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import OutlinedInput from '@mui/material/OutlinedInput';
import { green } from '@mui/material/colors';
import { Button } from '@material-ui/core';
import AvatarImage from 'src/components/Form/Avatar';

import API from 'src/api/Api';
import { toast } from 'react-toastify';

import useStyles from './style';

type FormValues = {
  student_name: string;
  birth_date: string;
  mobileNumber?: number;
  email: string;
  instructor: string;
  course: string;
  start_date: any;
  end_date: any;
  isActive: string;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface FeedBackProps {
  studentDetail?: any;
  activityFeedbacks: Array<any>;
  instructorActivityFeedbacks: Array<any>;
}

const schema = yup.object({
  student_name: yup.string().required('Student name is required'),
  birth_date: yup.string().required('Birth date is required')
});

const StudentInfo: FC<StudentInfoProp> = ({
  student,
  setRefreshData
}): ReactElement => {
  const classes = useStyles();
  const [profile, setProfile] = useState<string>('');

  const [moreDetails, setMoreDetails] = useState(false);
  const [tabValue, setTabValue] = React.useState(0);
  const [editable, setEditable] = useState(false);

  const [feedBackData, setFeedBackData] = useState<FeedBackProps>({
    studentDetail: {},
    activityFeedbacks: [],
    instructorActivityFeedbacks: []
  });

  const [instructorActivityFeedbacks, setinstructorActivityFeedbacks] =
    useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { birth_date, email, end_date, start_date, student_name } = data;
    try {
      await API.put(`student/${student._id}`, {
        student_name,
        email,
        profilePhotoUrl: profile,
        birthDate: birth_date,
        startDate: start_date,
        endDate: end_date
      });
      toast.success('Student updated successfully');
      setRefreshData((preState) => !preState);
    } catch (e) {
      toast.error(e.response.data.error);
    }
  };
  useEffect(() => {
    if (student) {
      setProfile(student.profilePhotoUrl);
      setValue('student_name', student.student_name);
      setValue('birth_date', student.birthDate);
      setValue('email', student.email);
      setValue('course', 'foundation-class');
      setValue('phone', student.user_phone);
    }
  }, [student]);

  const handleEditable = () => {
    setEditable((prewState) => !prewState);
  };

  const handleMoreDetailsChange = async () => {
    try {
      const studentFeedBack: any = await API.get(`student/${student._id}`);
      setFeedBackData(studentFeedBack);
      setinstructorActivityFeedbacks(
        studentFeedBack.instructorActivityFeedbacks
      );
      setMoreDetails((preState) => !preState);
    } catch (e) {
      toast.error(e.response.data.error);
    }
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChangeInput = (e, index, feedbackIndex) => {
    const cloneFeedback: any = JSON.parse(
      JSON.stringify(instructorActivityFeedbacks)
    );
    cloneFeedback[index].feedbackForms[feedbackIndex].feedback = e.target.value;
    setinstructorActivityFeedbacks(cloneFeedback);
  };

  const handleChangeOverrollFeedback = (e, index) => {
    const cloneFeedback: any = JSON.parse(
      JSON.stringify(instructorActivityFeedbacks)
    );
    cloneFeedback[index].overallFeedback = e.target.value;
    setinstructorActivityFeedbacks(cloneFeedback);
  };

  const handleSubmitFeedback = async (index) => {
    const instructorActivityFeedback: any = instructorActivityFeedbacks[index];
    try {
      await API.put(
        `course/instructorFeedback/${student._id}/${instructorActivityFeedback._id}`,
        {
          feedbackForms: instructorActivityFeedback.feedbackForms,
          overallFeedback: instructorActivityFeedback.overallFeedback
        }
      );
      toast.success('Feedback update successfully');
    } catch (e) {
      toast.error(e.response.data.error);
    }
  };

  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  };

  return (
    <Paper style={{ marginTop: 10, padding: 15, overflow: 'auto' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={2}>
            <Box style={{ textAlign: 'center' }}>
              <AvatarImage
                profile={profile}
                variant="square"
                setProfile={setProfile}
                showEditIcon={editable}
              />
              <Typography
                className={classes.moreDetailsText}
                onClick={handleMoreDetailsChange}
              >
                More Details
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Box mb={1}>
              {student.instructorDetail && (
                <Typography className={classes.instructor_text}>
                  {student?.instructorDetail?.instructor_name} is the instructor
                  for {student?.student_name}
                </Typography>
              )}

              <Box style={{ textAlign: 'right' }}>
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={handleEditable}
                >
                  Edit
                </Button>
              </Box>
            </Box>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  name="student_name"
                  type="text"
                  defaultValue=""
                  label="Name"
                  rules={{ required: 'Please enter a student name' }}
                  variant="outlined"
                  control={control}
                  error={!!errors.student_name}
                  helperText={
                    errors.student_name ? errors.student_name?.message : ''
                  }
                  disabled={!editable}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <DatePickerField
                  name="birth_date"
                  label="Birth Date"
                  variant="outlined"
                  defaultValue=""
                  format="dd-MM-yyyy"
                  rules={{ required: 'Please enter start date' }}
                  error={!!errors.birth_date}
                  control={control}
                  setValue={setValue}
                  helperText={
                    errors.birth_date ? errors.birth_date?.message : ''
                  }
                  disabled={!editable}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  name="email"
                  type="email"
                  defaultValue=""
                  rules={{ required: 'Please enter email address' }}
                  label="Enter email"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email?.message : ''}
                  control={control}
                  disabled={!editable}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  name="phone"
                  type="number"
                  defaultValue=""
                  rules={{ required: 'Please enter mobile number' }}
                  label="Enter phone"
                  variant="outlined"
                  error={!!errors.phone}
                  helperText={errors.phone ? errors.phone?.message : ''}
                  control={control}
                  disabled={true}
                />
              </Grid>

              {/* <Grid item xs={12} sm={12} md={6}>
                <SelectField
                  name="course"
                  label="Course?"
                  variant="outlined"
                  labelId="instructor"
                  defaultValue=""
                  option={courseOption}
                  rules={{ required: 'Please select Course ' }}
                  error={!!errors.course}
                  control={control}
                  helperText={errors.course ? errors.course?.message : ''}
                  disabled={!editable}
                />
              </Grid> */}
              {/* <Grid item xs={12} sm={12} md={6}>
                <DatePickerField
                  name="start_date"
                  label="Start Date"
                  variant="outlined"
                  defaultValue=""
                  format="dd-MM-yyyy"
                  rules={{ required: 'Please enter start date' }}
                  error={!!errors.start_date}
                  control={control}
                  setValue={setValue}
                  helperText={
                    errors.start_date ? errors.start_date?.message : ''
                  }
                  disabled={!editable}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <DatePickerField
                  name="end_date"
                  label="End Date"
                  variant="outlined"
                  defaultValue=""
                  format="dd-MM-yyyy"
                  rules={{}}
                  error={!!errors.end_date}
                  control={control}
                  setValue={setValue}
                  helperText={errors.end_date ? errors.end_date?.message : ''}
                  disabled={!editable}
                />
              </Grid> */}
              {/* <Grid item xs={12} sm={12} md={6}>
                <SelectField
                  name="isActive"
                  label="is Active ?"
                  variant="outlined"
                  labelId="instructor"
                  defaultValue=""
                  option={isActiveOption}
                  rules={{ required: 'Please select isActive ' }}
                  error={!!errors.isActive}
                  control={control}
                  helperText={errors.isActive ? errors.isActive?.message : ''}
                  disabled={!editable}
                />
              </Grid> */}
            </Grid>
            <Box mt={1}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6}>
                  <Box style={{ width: '100%' }}>
                    <LoadingButton
                      startIcon={<WhatsAppIcon sx={{ color: green[500] }} />}
                      variant="contained"
                      style={{
                        width: '100%',
                        backgroundColor: '#FFF',
                        color: '#000',
                        padding: 10,
                        border: '1px solid black'
                      }}
                    >
                      Whats app to {watch('student_name')}
                    </LoadingButton>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Box style={{ width: '100%' }}>
                    <LoadingButton
                      startIcon={<CallIcon />}
                      variant="contained"
                      style={{
                        width: '100%',
                        backgroundColor: '#FFF',
                        color: '#000',
                        padding: 10,
                        border: '1px solid black'
                      }}
                    >
                      Talk With {watch('student_name')}
                    </LoadingButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Grid container>
              {editable && (
                <Box component="div" mt={1}>
                  <Button
                    variant="contained"
                    type="submit"
                    classes={{ root: classes.button }}
                  >
                    Update Student
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </form>
      {moreDetails && (
        <Box my={3} style={{ overflow: 'auto' }}>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            variant="scrollable"
            scrollButtons
          >
            {feedBackData?.activityFeedbacks.map((_, index) => (
              <Tab label={`Activity ${index + 1}`} {...a11yProps(index)} />
            ))}
          </Tabs>

          {feedBackData?.activityFeedbacks.map((activityFeedBack, index) => (
            <>
              <TabPanel value={tabValue} index={index}>
                <Box>
                  <Typography className={classes.studentFeedback}>
                    Feedback by Student
                  </Typography>
                  <Table className={classes.studentBorderedTable}>
                    <TableHead>
                      <TableCell
                        align="center"
                        style={{ width: 200, maxWidth: 200 }}
                      >
                        Date
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ width: 200, maxWidth: 200 }}
                      >
                        Status
                      </TableCell>
                      <TableCell align="left">Student Feedback</TableCell>
                    </TableHead>
                    <TableBody>
                      {activityFeedBack.feedbackForms.map((studentFeedback) => (
                        <TableRow>
                          <TableCell
                            align="center"
                            style={{ width: 200, maxWidth: 200 }}
                          >
                            {moment(studentFeedback.date).format('LL')}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ width: 200, maxWidth: 200 }}
                          >
                            {studentFeedback.status}
                          </TableCell>
                          <TableCell align="left">
                            {studentFeedback.feedback}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
                <Box my={2}>
                  <Typography className={classes.studentFeedback}>
                    Overrall Self Feedback by Student
                  </Typography>
                  <Typography>{activityFeedBack.overallFeedback}</Typography>
                </Box>
                <Divider style={{ color: '#000' }} />
              </TabPanel>
              {tabValue === index && (
                <Box sx={{ p: 3 }}>
                  <Typography className={classes.studentFeedback}>
                    Feedback by Instructor
                  </Typography>

                  <Table className={classes.borderedTable}>
                    <TableHead>
                      <TableCell
                        align="center"
                        style={{ width: 200, maxWidth: 200 }}
                      >
                        Date
                      </TableCell>

                      <TableCell align="left">Instructor Feedback</TableCell>
                    </TableHead>
                    <TableBody>
                      {instructorActivityFeedbacks[index].feedbackForms.map(
                        (instructorFeedback, feedbackIndex) => (
                          <TableRow>
                            <TableCell
                              align="center"
                              style={{ width: 200, maxWidth: 200 }}
                            >
                              {moment(instructorFeedback.date).format('LL')}
                            </TableCell>
                            <TableCell align="left">
                              <OutlinedInput
                                className={classes.inputField}
                                placeholder="Please enter feedback"
                                multiline
                                name="feedbackForms"
                                onChange={(e) =>
                                  handleChangeInput(e, index, feedbackIndex)
                                }
                                value={instructorFeedback.feedback}
                                rows={3}
                              />
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                  <Box my={2}>
                    <OutlinedInput
                      style={{ width: '100%' }}
                      name="overallFeedback"
                      placeholder="Please enter feedback"
                      onChange={(e) => handleChangeOverrollFeedback(e, index)}
                      value={instructorActivityFeedbacks[index].overallFeedback}
                      multiline
                      rows={3}
                    />
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      className={classes.updateButton}
                      onClick={() => handleSubmitFeedback(index)}
                    >
                      Update
                    </Button>
                  </Box>
                </Box>
              )}
            </>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default StudentInfo;
