import { FC, ReactElement, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Paper, Typography, Grid, Button } from '@mui/material';
import { Box } from '@mui/system';
import TextField from 'src/components/Form/TextField';
import SelectField from 'src/components/Form/SelectField';
import AvatarImage from 'src/components/Form/Avatar';
import { useNavigate, useLocation } from 'react-router-dom';

import API from 'src/api/Api';
import useStyles from './style';

const AddProduct: FC = (): ReactElement => {
	const navigate = useNavigate();
	const [profile, setProfile] = useState<any>('');
	const [profileError, setProfileError] = useState<boolean>(false);
	const [categories, setAllCategories] = useState([]);

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
			code: '',
			sizes: '',
			finishes: '',
			width: '',
			weight: '',
			load_capacity: '',
			thickness: '',
			category_id: '',
		});
		setProfile('');
	};

	useEffect(() => {
		(async () => {
			try {
				const allCategory: any = await API('category/getAllCategory');
				setAllCategories(
					allCategory.category.map((category) => ({
						key: category._id,
						name: category.name,
						value: category._id,
					}))
				);
			} catch (error) {
				toast.error(error?.response?.data?.message);
			}
		})();
	}, []);

	useEffect(() => {
		if (location?.state?.id) {
			(async () => {
				try {
					const productData: any = await API.get(
						`/product/getProductById/${location?.state?.id}`
					);

					if (!productData.product) {
						toast.error('Data not fount');
						navigate('/products');
						return;
					}
					setValue('code', productData.product.code);
					setValue('sizes', productData.product.sizes);
					setValue('finishes', productData.product.finishes);
					setValue('width', productData.product.width);
					setValue('weight', productData.product.weight);
					setValue('load_capacity', productData.product.load_capacity);
					setValue('thickness', productData.product.thickness);
					setValue('category_id', productData.product.category_id);
					setProfile(productData.product.imageUrl);
				} catch (e) {
					toast.error('Inavalid Data');
					navigate('/products');
				}
			})();
		}
	}, location?.state?.id);

	const onSubmit = async (data: any) => {
		const {
			code,
			sizes,
			finishes,
			width,
			weight,
			load_capacity,
			thickness,
			category_id,
		} = data;
		if (!profileError) {
			if (location?.state?.id) {
				try {
					await API.put(`product/updateProduct`, {
						id: location?.state?.id,
						imageUrl: profile,
						code,
						sizes,
						finishes,
						width,
						weight,
						load_capacity,
						thickness,
						category_id,
					});
					toast.success('Product update successfully');
					navigate('/products');
					clearForm();
				} catch (e) {
					toast.error(e?.response?.data?.message);
				}
				return;
			}

			try {
				await API.post(`product/createProduct`, {
					imageUrl: profile,
					code,
					sizes,
					finishes,
					width,
					weight,
					load_capacity,
					thickness,
					category_id,
				});
				toast.success('Product added successfully');
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
			<Button onClick={() => navigate('/products')}> Back </Button>

			<Paper style={{ padding: 20, margin: 10 }}>
				<Typography
					variant='h2'
					gutterBottom
					component='div'
					style={{ textAlign: 'center' }}
				>
					{location?.state?.id ? 'Update' : 'Add'} Product
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
							<Grid item xs={12} sm={12} md={6}>
								<SelectField
									name='category_id'
									label='Select/Update category id'
									variant='outlined'
									labelId='instructor'
									defaultValue={''}
									option={categories}
									rules={{ required: 'Please select category id ' }}
									error={!!errors.category_id}
									control={control}
									helperText={
										errors.category_id ? errors.category_id?.message : ''
									}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<TextField
									name='code'
									type='text'
									defaultValue=''
									label='Code'
									rules={{ required: 'Please enter a code' }}
									variant='outlined'
									control={control}
									error={!!errors.code}
									helperText={errors.code ? errors.code?.message : ''}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<TextField
									name='sizes'
									type='text'
									defaultValue=''
									label='Sizes'
									rules={{ required: 'Please enter a sizes' }}
									variant='outlined'
									control={control}
									error={!!errors.sizes}
									helperText={errors.sizes ? errors.sizes?.message : ''}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<TextField
									name='finishes'
									type='text'
									defaultValue=''
									label='Finishes'
									rules={{ required: 'Please enter a finishes' }}
									variant='outlined'
									control={control}
									error={!!errors.finishes}
									helperText={errors.finishes ? errors.finishes?.message : ''}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<TextField
									name='width'
									type='text'
									defaultValue=''
									label='Width'
									rules={{}}
									variant='outlined'
									control={control}
									error={!!errors.width}
									helperText={errors.width ? errors.width?.message : ''}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<TextField
									name='weight'
									type='text'
									defaultValue=''
									label='Weight'
									rules={{}}
									variant='outlined'
									control={control}
									error={!!errors.weight}
									helperText={errors.weight ? errors.name?.message : ''}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<TextField
									name='load_capacity'
									type='text'
									defaultValue=''
									label='Load capacity'
									rules={{}}
									variant='outlined'
									control={control}
									error={!!errors.load_capacity}
									helperText={
										errors.load_capacity ? errors.load_capacity?.message : ''
									}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<TextField
									name='thickness'
									type='text'
									defaultValue=''
									label='Thickness'
									rules={{}}
									variant='outlined'
									control={control}
									error={!!errors.thickness}
									helperText={errors.thickness ? errors.thickness?.message : ''}
								/>
							</Grid>
						</Grid>
						<Box my={2}>
							<Button onClick={handleClick} variant='contained' type='submit'>
								{location?.state?.id ? 'Update' : 'Add'} Product
							</Button>
						</Box>
					</form>
				</Box>
			</Paper>
		</Box>
	);
};

export default AddProduct;
