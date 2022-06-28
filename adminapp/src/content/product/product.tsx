import { FC, ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
	Box,
	Button,
	Paper,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	SelectChangeEvent,
	Container,
	Typography,
	Card,
	CardActions,
	CardMedia,
	CardContent,
	Grid,
} from '@mui/material';
import useStyles from './style';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SuspenseLoader from 'src/components/SuspenseLoader';
import API from 'src/api/Api';
const Product: FC = (): ReactElement => {
	const classes = useStyles();
	const navigate = useNavigate();
	const [categories, setAllCategories] = useState<any>([]);
	const [selectedCategory, setSelectCategory] = useState<string>();
	const [loading, setLoading] = useState<boolean>(true);
	const [refresh, setRefresh] = useState<boolean>(false);
	const [product, setAllProduct] = useState<any>([]);

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
		if (selectedCategory) {
			(async () => {
				try {
					const allProduct: any = await API(
						`product/getProductByCategoryId/${selectedCategory}`
					);
					setAllProduct(allProduct?.product || []);
				} catch (error) {
					toast.error(error?.response?.data?.message);
				}
			})();
		}
	}, [selectedCategory, refresh]);

	const handleChange = (event: SelectChangeEvent) => {
		setSelectCategory(event.target.value as string);
	};
	const editProduct = (id) => {
		navigate('/products/modify-product', { state: { id } });
	};
	const deleteProduct = async (id) => {
		setLoading(true);
		try {
			await API.delete(`/product/deleteProduct/${id}`);
			setRefresh((preState) => !preState);
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
		setLoading(false);
	};
	console.log('4--> product', product);
	return (
		<Container>
			<Helmet>
				<title>Lafamilia international - Product</title>
			</Helmet>
			<Typography gutterBottom variant='h3' component='div'>
				All Product
			</Typography>
			<Box className={classes.addCategoryBtnSection}>
				<Button
					variant='contained'
					onClick={() => navigate('/products/modify-product')}
				>
					Add Product
				</Button>
			</Box>

			<Paper className={classes.productListPaper}>
				<Box sx={{ width: 300 }}>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>
							Select category
						</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={selectedCategory}
							label='Age'
							onChange={handleChange}
						>
							{categories.map((category) => (
								<MenuItem value={category.value}>{category.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box my={2}>
					<Grid container spacing={2} alignItems='center'>
						{product.map((product) => (
							<Grid item xs={12} sm={6} md={4}>
								<Card sx={{ maxWidth: 350 }} style={{ margin: 'auto' }}>
									<CardMedia
										component='img'
										height='140'
										image={product.imageUrl}
										alt='green iguana'
									/>
									<CardContent className={classes.contentData}>
										<Typography
											className={classes.wordBreak}
											gutterBottom
											variant='h5'
											component='div'
										>
											<span className={classes.heading}>code:</span>{' '}
											{product?.code || '-'}
										</Typography>
										<Typography
											className={classes.wordBreak}
											gutterBottom
											variant='h5'
											component='div'
										>
											<span className={classes.heading}>sizes:</span>{' '}
											{product?.sizes || '-'}
										</Typography>
										<Typography
											className={classes.wordBreak}
											gutterBottom
											variant='h5'
											component='div'
										>
											<span className={classes.heading}>finishes:</span>{' '}
											{product?.finishes || '-'}
										</Typography>
										<Typography
											className={classes.wordBreak}
											gutterBottom
											variant='h5'
											component='div'
										>
											<span className={classes.heading}>width:</span>{' '}
											{product?.width || '-'}
										</Typography>
										<Typography
											className={classes.wordBreak}
											gutterBottom
											variant='h5'
											component='div'
										>
											<span className={classes.heading}>weight:</span>{' '}
											{product?.weight || '-'}
										</Typography>
										<Typography
											className={classes.wordBreak}
											gutterBottom
											variant='h5'
											component='div'
										>
											<span className={classes.heading}>load_capacity:</span>{' '}
											{product?.load_capacity || '-'}
										</Typography>
										<Typography
											className={classes.wordBreak}
											gutterBottom
											variant='h5'
											component='div'
										>
											<span className={classes.heading}>thickness:</span>{' '}
											{product?.thickness || '-'}
										</Typography>
									</CardContent>
									<CardActions>
										<Button
											size='small'
											onClick={() => editProduct(product._id)}
										>
											Edit
										</Button>
										<Button
											size='small'
											color='error'
											onClick={() => deleteProduct(product._id)}
										>
											Delete
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>
			</Paper>
		</Container>
	);
};

export default Product;
