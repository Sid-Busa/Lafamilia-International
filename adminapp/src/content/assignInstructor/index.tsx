import { FC, ReactElement, useState, useEffect } from 'react';
import { Container, Paper } from '@mui/material';
import AssignInstructor from './AssignInstructor';
import FilterPannel from './FilterPannel';
import API from 'src/api/Api';
import SuspenseLoader from 'src/components/SuspenseLoader';

const AssignInstructorContainer: FC = (): ReactElement => {
  const [studentList, setStudentList] = useState({
    loading: true,
    studentData: [],
    instructorData: []
  });
  const [refreshData, setRefreshData] = useState(false);
  useEffect(() => {
    const getAllStudentWithInstructor = async () => {
      try {
        const [studentList, instructorList]: any = await Promise.all([
          API.get('student/getAllStudentWithInstructorDetails'),
          API.get('instructor')
        ]);
        setStudentList({
          loading: false,
          studentData: studentList.items,
          instructorData: instructorList.items
        });
      } catch (error) {
        setStudentList({
          loading: false,
          studentData: [],
          instructorData: []
        });
      }
    };
    getAllStudentWithInstructor();
  }, [refreshData]);
  if (studentList.loading) {
    return <SuspenseLoader />;
  }
  return (
    <Container maxWidth="lg">
      {/*   <FilterPannel /> */}
      {studentList.studentData.map((student, index) => (
        <Paper style={{ padding: 15, marginTop: 10 }} key={index + 1}>
          <AssignInstructor
            student={student}
            instructorList={studentList.instructorData}
            setRefreshData={setRefreshData}
          />
        </Paper>
      ))}
    </Container>
  );
};

export default AssignInstructorContainer;
