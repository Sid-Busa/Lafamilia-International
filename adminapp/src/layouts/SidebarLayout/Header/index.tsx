import { useContext, FC, ReactElement } from 'react';
import { Box, Hidden, IconButton, Tooltip } from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from 'src/contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import HeaderUserbox from './Userbox';
// import Logo from 'src/components/Logo';
import useStyles from './style';

const Header: FC = (): ReactElement => {
  const classes = useStyles();
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

  return (
    <Box className={classes.headerWrapper} display="flex" alignItems="center">
      <Box display="flex" alignItems="center">
        {/* <Hidden lgUp>
          <Logo />
        </Hidden> */}
      </Box>
      <Box display="flex" alignItems="center">
        <HeaderUserbox />
        <Hidden lgUp>
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
            </IconButton>
          </Tooltip>
        </Hidden>
      </Box>
    </Box>
  );
};

export default Header;
