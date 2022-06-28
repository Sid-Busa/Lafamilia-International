import { FC, ReactElement } from 'react';
import { StudentListProp } from './types';
import StudentInfo from './StudentInfo';
import { Box, Paper } from '@mui/material';

const StudentList: FC<StudentListProp> = ({
  studentList,
  setRefreshData
}): ReactElement => {
  return studentList.length > 0 ? (
    studentList.map((student, index) => (
      <Box key={index + 1}>
        <StudentInfo
          key={student._id}
          student={student}
          setRefreshData={setRefreshData}
        />
      </Box>
    ))
  ) : (
    <Box mt={3}>
      <Paper>
        <Box p={2} style={{ textAlign: 'center' }}>
          No Record Available
        </Box>
      </Paper>
    </Box>
  );
};

export default StudentList;
