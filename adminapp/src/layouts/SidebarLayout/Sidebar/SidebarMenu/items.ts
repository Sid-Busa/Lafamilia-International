import { ReactNode } from 'react';

import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupsIcon from '@mui/icons-material/Groups';

export interface MenuItem {
	link?: string;
	icon?: ReactNode;
	badge?: string;
	items?: MenuItem[];
	name: string;
}

export interface MenuItems {
	items: MenuItem[];
}

const menuItems: MenuItems[] = [
	{
		items: [
			{
				name: 'All Category',
				link: '/categories',
				icon: PersonIcon,
			},

			{
				name: 'All Products',
				link: '/products',
				icon: ManageAccountsIcon,
			},
		],
	},
];

export default menuItems;
