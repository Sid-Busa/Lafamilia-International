import { FC, ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SuspenseLoader from 'src/components/SuspenseLoader';
import API from 'src/api/Api';

import useStyles from './style';

const Category: FC = (): ReactElement => {
	const classes = useStyles();
	const navigate = useNavigate();
	const [categories, setAllCategories] = useState([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [refresh, setRefresh] = useState<boolean>(false);
	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const allCategory: any = await API('category/getAllCategory');
				setAllCategories(allCategory?.category || []);
			} catch (error) {
				toast.error(error?.response?.data?.message);
			}
			setLoading(false);
		})();
	}, [refresh]);

	const editCategory = (id) => {
		navigate('/categories/modify-category', { state: { id } });
	};
	const deleteCategory = async (id) => {
		setLoading(true);
		try {
			await API.delete(`/category/deleteCategoryById/${id}`);
			setRefresh((preState) => !preState);
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
		setLoading(false);
	};
	if (loading) {
		return <SuspenseLoader />;
	}
	return (
		<Container>
			<Helmet>
				<title>Lafamilia international - Category</title>
			</Helmet>
			<Typography gutterBottom variant='h3' component='div'>
				All Category
			</Typography>
			<Box className={classes.addCategoryBtnSection}>
				<Button
					variant='contained'
					onClick={() => navigate('/categories/modify-category')}
				>
					Add category
				</Button>
			</Box>
			<Grid container spacing={2}>
				{categories.map((category) => (
					<Grid item xs={12} sm={6} md={4}>
						<Card sx={{ maxWidth: 350 }} style={{ margin: 'auto' }}>
							<CardMedia
								component='img'
								height='140'
								image={category.imageUrl}
								alt='green iguana'
							/>
							<CardContent>
								<Typography gutterBottom variant='h5' component='div'>
									{category.name}
								</Typography>
							</CardContent>
							<CardActions>
								<Button size='small' onClick={() => editCategory(category._id)}>
									Edit
								</Button>
								<Button
									size='small'
									color='error'
									onClick={() => deleteCategory(category._id)}
								>
									Delete
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Category;
