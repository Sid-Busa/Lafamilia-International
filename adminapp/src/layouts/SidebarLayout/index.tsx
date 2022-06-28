import { FC, ReactNode, ReactElement, useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';

import { Navigate } from 'react-router-dom';
import useRolePermission from 'src/hook/useRolePermission';
import useStyles from './style';
interface SidebarLayoutProps {
	children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = (): ReactElement => {
	const classes = useStyles();
	const auth = useRolePermission();

	// if (!auth) {
	// 	return <Navigate to='/login' />;
	// }
	return (
		<>
			<Sidebar />
			<Box className={classes.mainWrapper}>
				<Header />
				<Box className={classes.mainContent}>
					<Outlet />
				</Box>
			</Box>
		</>
	);
};

export default SidebarLayout;
