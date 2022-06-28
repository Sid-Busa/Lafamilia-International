import { FC, ReactElement, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Paper, Typography, Grid, Button } from '@mui/material';
import { Box } from '@mui/system';
import TextField from 'src/components/Form/TextField';
import AvatarImage from 'src/components/Form/Avatar';
import { useNavigate, useLocation } from 'react-router-dom';

import API from 'src/api/Api';
import useStyles from './style';
import { CodeSharp } from '@material-ui/icons';

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

const AddCategory: FC = (): ReactElement => {
	const navigate = useNavigate();
	const [profile, setProfile] = useState<any>('');
	const [profileError, setProfileError] = useState<boolean>(false);

	const location: any = useLocation();

	const {
		control,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (profile !== '') {
			setProfileError(false);
		}
	}, [profile]);
	const clearForm = () => {
		reset({
			name: '',
		});
		setProfile('');
	};

	console.log('3--> location', location);

	useEffect(() => {
		if (location?.state?.id) {
			(async () => {
				try {
					const categoryData: any = await API.get(
						`/category/getCategoryById/${location?.state?.id}`
					);
					console.log('3--> categoryData', categoryData);
					if (!categoryData.category) {
						toast.error('Data not fount');
						navigate('/categories');
						return;
					}
					setValue('name', categoryData.category.name);
					setProfile(categoryData.category.imageUrl);
				} catch (e) {
					toast.error('Inavalid Data');
					navigate('/categories');
				}
			})();
		}
	}, location?.state?.id);

	const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
		const { name } = data;
		if (!profileError) {
			if (location?.state?.id) {
				try {
					await API.put(`category/updateCategory`, {
						id: location?.state?.id,
						imageUrl: profile,
						name,
					});
					toast.success('Category update successfully');
					navigate('/categories');
					clearForm();
				} catch (e) {
					toast.error(e?.response?.data?.message);
				}
				return;
			}

			try {
				await API.post(`category/createCategory`, {
					imageUrl: profile,
					name,
				});
				toast.success('Category added successfully');
				clearForm();
			} catch (e) {
				toast.error(e?.response?.data?.message);
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
		<Box>
			<Button onClick={() => navigate('/categories')}> Back </Button>

			<Paper style={{ padding: 20, margin: 10 }}>
				<Typography
					variant='h2'
					gutterBottom
					component='div'
					style={{ textAlign: 'center' }}
				>
					{location?.state?.id ? 'Update' : 'Add'} Category
				</Typography>

				<Box>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Box className={classes.avatarSecion}>
							<AvatarImage profile={profile} setProfile={setProfile} />
						</Box>
						{profileError && (
							<Typography
								className={classes.error}
								variant='body1'
								gutterBottom
							>
								Please select profile
							</Typography>
						)}
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} md={12}>
								<TextField
									name='name'
									type='text'
									defaultValue=''
									label='Name'
									rules={{ required: 'Please enter a name' }}
									variant='outlined'
									control={control}
									error={!!errors.name}
									helperText={errors.name ? errors.name?.message : ''}
								/>
							</Grid>
						</Grid>
						<Box my={2}>
							<Button onClick={handleClick} variant='contained' type='submit'>
								{location?.state?.id ? 'Update' : 'Add'} Category
							</Button>
						</Box>
					</form>
				</Box>
			</Paper>
		</Box>
	);
};

export default AddCategory;
