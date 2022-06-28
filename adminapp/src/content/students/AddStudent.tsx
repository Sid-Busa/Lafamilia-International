import { FC, ReactElement, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Paper, Typography, Grid, Button } from '@mui/material';
import { Box } from '@mui/system';
import TextField from 'src/components/Form/TextField';
import AvatarImage from 'src/components/Form/Avatar';
import DatePickerField from 'src/components/Form/DatePickerField';

import API from 'src/api/Api';
import useStyles from './style';

type FormValues = {
	student_name: string;
	age?: number;
	mobileNumber?: number;
	email: string;
	instructor: string;
	course: string;
	start_date: any;
	end_date: any;
	isActive: string;
};

const AddStudent: FC = (): ReactElement => {
	const [profile, setProfile] = useState<string>('');
	const [profileError, setProfileError] = useState<boolean>(false);
	const {
		control,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (profile !== '') {
			setProfileError(false);
		}
	}, [profile]);

	const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
		const { birth_date, email, mobileNumber, student_name } = data;
		const userId = localStorage.getItem('userId');
		if (!profileError) {
			try {
				await API.post(`student/register/${userId}`, {
					user_phone: mobileNumber,
					student_name,
					email,
					profilePhotoUrl: profile,
					birthDate: birth_date,
				});
				toast.success('Student added successfully');
			} catch (e) {
				toast.error(e.response.data.error);
			}
		}
	};

	const handleClick = () => {
		if (profile === '' || profileError) {
			setProfileError(true);
			return;
		}
	};

	const classes = useStyles();

	return (
		<Paper style={{ padding: 10, margin: 10 }}>
			<Typography variant='h2' gutterBottom component='div'>
				Add Student
			</Typography>

			<Box>
				<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
					<AvatarImage profile={profile} setProfile={setProfile} />
					{profileError && (
						<Typography className={classes.error} variant='body1' gutterBottom>
							Please select profile
						</Typography>
					)}
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12} md={6}>
							<TextField
								name='student_name'
								type='text'
								defaultValue=''
								label='Name'
								rules={{ required: 'Please enter a student name' }}
								variant='outlined'
								control={control}
								error={!!errors.student_name}
								helperText={
									errors.student_name ? errors.student_name?.message : ''
								}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={6}>
							<DatePickerField
								name='birth_date'
								label='Birth Date'
								variant='outlined'
								defaultValue=''
								format='dd/MM/yyyy'
								rules={{ required: 'Please enter email address' }}
								error={!!errors.birth_date}
								control={control}
								setValue={setValue}
								helperText={errors.birth_date ? errors.birth_date?.message : ''}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={6}>
							<TextField
								name='mobileNumber'
								type='number'
								defaultValue=''
								rules={{
									required: 'Please enter mobile number',
									validate: (value) =>
										value.length !== 10
											? 'Mobile Number Must be 10 digit'
											: undefined,
								}}
								label='Enter Mobile Number'
								variant='outlined'
								error={!!errors.mobileNumber}
								helperText={
									errors.mobileNumber ? errors.mobileNumber?.message : ''
								}
								control={control}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={6}>
							<TextField
								name='email'
								type='email'
								defaultValue=''
								rules={{}}
								label='Enter email'
								variant='outlined'
								error={!!errors.email}
								helperText={errors.email ? errors.email?.message : ''}
								control={control}
							/>
						</Grid>
					</Grid>
					<Button onClick={handleClick} variant='contained' type='submit'>
						Add Student
					</Button>
				</form>
			</Box>
		</Paper>
	);
};

export default AddStudent;
