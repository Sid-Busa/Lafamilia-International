import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  logoWrapper: {
    border: 0,
    borderRadius: 3,
    color: 'black',
    width: '100%',
    textAlign: 'center',
    textDecoration: 'none'
  },
  logoText: {
    fontSize: '20px !important',
    fontWeight: 'bold !important'
  }
}));

export default useStyles;
