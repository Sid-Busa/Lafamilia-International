import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
	(
		<Suspense fallback={<SuspenseLoader />}>
			<Component {...props} />
		</Suspense>
	);

// Pages
const Auth = Loader(lazy(() => import('src/content/auth')));

// Category

const Category = Loader(lazy(() => import('src/content/category')));
const AddCategory = Loader(
	lazy(() => import('src/content/category/addCategory'))
);

//product
const Product = Loader(lazy(() => import('src/content/product')));
const AddProduct = Loader(lazy(() => import('src/content/product/addProduct')));

// Status

const Status404 = Loader(lazy(() => import('src/content/status/Status404')));
const Status500 = Loader(lazy(() => import('src/content/status/Status500')));
const StatusComingSoon = Loader(
	lazy(() => import('src/content/status/ComingSoon'))
);
const StatusMaintenance = Loader(
	lazy(() => import('src/content/status/Maintenance'))
);

const routes: PartialRouteObject[] = [
	{
		path: '*',
		element: <BaseLayout />,
		children: [
			{
				path: '/',
				element: <Auth />,
			},
			{
				path: 'login',
				element: <Navigate to='/' replace />,
			},
			{
				path: 'status',
				children: [
					{
						path: '/',
						element: <Navigate to='404' replace />,
					},
					{
						path: '404',
						element: <Status404 />,
					},
					{
						path: '500',
						element: <Status500 />,
					},
					{
						path: 'maintenance',
						element: <StatusMaintenance />,
					},
					{
						path: 'coming-soon',
						element: <StatusComingSoon />,
					},
				],
			},
			{
				path: '*',
				element: <Status404 />,
			},
		],
	},
	{
		path: 'categories',
		element: <SidebarLayout />,
		children: [
			{
				path: '',
				element: <Category />,
			},
			{
				path: '/modify-category',
				element: <AddCategory />,
			},
		],
	},
	{
		path: 'products',
		element: <SidebarLayout />,
		children: [
			{
				path: '',
				element: <Product />,
			},
			{
				path: 'modify-product',
				element: <AddProduct />,
			},
		],
	},
];

export default routes;
