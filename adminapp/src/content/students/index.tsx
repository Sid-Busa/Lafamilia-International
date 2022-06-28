import { FC, ReactElement, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { Button, Container } from '@material-ui/core';
import StudentList from './StudentList';
// import FilterPannel from './FilterPannel';
import API from 'src/api/Api';
import useStyles from './style';

import SuspenseLoader from 'src/components/SuspenseLoader';

const StudentsList: FC = (): ReactElement => {
	const classes = useStyles();
	const [studentList, setStudentList] = useState({
		loading: true,
		data: [],
	});
	const [refreshData, setRefreshData] = useState(false);
	useEffect(() => {
		const getAllStudent = async () => {
			try {
				const studentList: any = await API.get(
					'student/getAllStudentWithInstructorDetails'
				);
				setStudentList({
					loading: false,
					data: studentList.items,
				});
			} catch (error) {
				setStudentList({
					loading: false,
					data: [],
				});
			}
		};
		getAllStudent();
	}, [refreshData]);
	if (studentList.loading) {
		return <SuspenseLoader />;
	}
	return (
		<>
			<Helmet>
				<title>Anubhuti - Students</title>
			</Helmet>
			<Container maxWidth='lg'>
				{/* <FilterPannel /> */}

				<Box component='div' style={{ textAlign: 'end', marginRight: 10 }}>
					<Link to='/students/add-student' style={{ textDecoration: 'none' }}>
						<Button
							variant='contained'
							type='submit'
							className={classes.button}
						>
							Add Student
						</Button>
					</Link>
				</Box>

				<StudentList
					studentList={studentList.data}
					setRefreshData={setRefreshData}
				/>
			</Container>
		</>
	);
};

export default StudentsList;
