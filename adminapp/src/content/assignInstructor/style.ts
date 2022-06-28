import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@mui/system';
const useStyles = makeStyles((theme: Theme) => ({
  instructor_text: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#5569ff',
    textDecoration: 'underline'
  },
  not_instructor_text: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#D8000C',
    textDecoration: 'underline'
  },
  filterPannel: {
    padding: 10,
    marginBottom: 10
  },
  filterTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 6
  },
  button: {
    backgroundColor: '#5569ff',
    color: '#FFF',
    textDecoration: 'none',
    margin:'10px 10px ',
    '&:hover': {
      backgroundColor: '#2634a1'
    }
  },
  unassignButton:{
    backgroundColor: '#f48fb1',
    color: '#FFF',
    textDecoration: 'none',
    margin:'10px 10px ',
    '&:hover': {
      backgroundColor: '#f48fb1'
    }
  },
  csvButtonPositon: {
    textAlign: 'end'
  },
  imageBox: {
    textAlign: 'center'
  }
}));

export default useStyles;
