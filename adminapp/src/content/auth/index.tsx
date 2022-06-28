import { FC,ReactElement } from 'react';
import { Box, Paper } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Login from './Login';

const  Overview:FC = ():ReactElement => {

  return (
    <Box  display="flex" justifyContent="center" alignItems="center" style={{height:'100%'}}>
      <Helmet>
        <title>Anubhuti</title>
      </Helmet>
      <Paper style={{width: '40%',padding:20}}>
        <Login />
      </Paper>
    </Box>
  );
}

export default Overview;
