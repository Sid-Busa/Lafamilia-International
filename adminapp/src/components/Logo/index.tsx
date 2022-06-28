import { FC, ReactElement } from 'react';

import { Hidden, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './style';

const Logo: FC = (): ReactElement => {
  const classes = useStyles();

  return (
    <Link className={classes.logoWrapper} to="/students">
      <Hidden>
        <Typography className={classes.logoText}> Anubhuti </Typography>
      </Hidden>
    </Link>
  );
};

export default Logo;
