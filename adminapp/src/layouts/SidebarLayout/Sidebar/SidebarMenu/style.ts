import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) => ({
  menuWrapper: {
    marginBottom: theme.spacing(1),
    padding: 0,

    ' & > .MuiList-root': {
      padding: `0 ${theme.spacing(2)} ${theme.spacing(2)}`
    }
  }
}));

export default useStyles;
