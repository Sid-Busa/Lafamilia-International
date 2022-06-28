import { FC, ReactElement, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, Typography, Button } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';
import Numeric from 'src/components/Form/NumericField';
import TextField from 'src/components/Form/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import API from 'src/api/Api';

import useStyles from './style';

type FormValues = {
	name: string;
	password: string;
};

const schema = yup.object({
	name: yup.string().required('Name is required'),
	password: yup.string().required('Password is required'),
});

const Login: FC = (): ReactElement => {
	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		const { name, password } = data;
		console.log('2--> ', { name, password });

		try {
			const login: any = await API.post('auth/login', { name, password });
			localStorage.setItem('token', login?.token);
			navigate('/categories');
		} catch (e) {
			toast.error(e.response.data.message);
		}
	};

	const classes = useStyles();
	return (
		<Container maxWidth='lg'>
			<Typography variant='h2' paragraph className={classes.loginText}>
				Login With <br />
				<span className={classes.companyName}>
					Lafamilia International Admin Pannel
				</span>
			</Typography>
			<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
				<TextField
					name='name'
					type='text'
					defaultValue=''
					label='Name'
					rules={{}}
					variant='outlined'
					control={control}
					error={!!errors.name}
					helperText={errors.name ? errors.name?.message : ''}
				/>
				<TextField
					name='password'
					type='password'
					defaultValue=''
					label='Password'
					rules={{}}
					variant='outlined'
					control={control}
					error={!!errors.password}
					helperText={errors.password ? errors.password?.message : ''}
				/>
				<Button
					type='submit'
					variant='contained'
					className={classes.loginSubmitButton}
				>
					Login
				</Button>
			</form>
		</Container>
	);
};

export default Login;
