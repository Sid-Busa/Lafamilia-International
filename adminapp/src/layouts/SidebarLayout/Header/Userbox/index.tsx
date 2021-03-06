import { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
	Avatar,
	Box,
	Button,
	Divider,
	Hidden,
	lighten,
	List,
	Popover,
	Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import useAvatar from 'src/images/userAvatar.png';
import useRolePermission from 'src/hook/useRolePermission';

const UserBoxButton = styled(Button)(
	({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
	({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
	({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
	({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
	({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
	const navigate = useNavigate();
	const user = {
		name: 'Catherine Pike',
		avatar: '/static/images/avatars/1.jpg',
		jobtitle: 'Project Manager',
	};

	const ref = useRef<any>(null);
	const [isOpen, setOpen] = useState<boolean>(false);
	const role = useRolePermission();
	const handleOpen = (): void => {
		setOpen(true);
	};

	const handleClose = (): void => {
		setOpen(false);
	};

	const logout = () => {
		localStorage.clear();
		navigate('/');
	};

	return (
		<>
			<UserBoxButton color='secondary' ref={ref} onClick={handleOpen}>
				<Avatar variant='rounded' alt={user.name} src={useAvatar} />
				<Hidden mdDown>
					<UserBoxText>
						{/* <UserBoxLabel variant="body1"> {role} </UserBoxLabel> */}
						{/* <UserBoxDescription variant="body2">ADMIN</UserBoxDescription> */}
					</UserBoxText>
				</Hidden>
				<Hidden smDown>
					<ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
				</Hidden>
			</UserBoxButton>
			<Popover
				anchorEl={ref.current}
				onClose={handleClose}
				open={isOpen}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				{/* <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt={user.name} src={user.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox> */}
				{/* <Divider sx={{ mb: 0 }} /> */}
				<List sx={{ p: 1 }} component='nav'>
					{/* <ListItem button to="/management/profile/details" component={NavLink}>
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary="My Profile" />
          </ListItem>
          <ListItem
            button
            to="/dashboards/messenger"
            component={NavLink}
          >
            <InboxTwoToneIcon fontSize="small" />
            <ListItemText primary="Messenger" />
          </ListItem>
          <ListItem
            button
            to="/management/profile/settings"
            component={NavLink}
          >
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary="Account Settings" />
          </ListItem> */}
				</List>
				{/* <Divider /> */}
				<Box sx={{ m: 1 }} onClick={logout}>
					<Button color='primary' fullWidth>
						<LockOpenTwoToneIcon sx={{ mr: 1 }} />
						Sign out
					</Button>
				</Box>
			</Popover>
		</>
	);
}

export default HeaderUserbox;
