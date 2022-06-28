import { makeStyles } from '@mui/styles';
import { CustomTheme } from 'src/theme/base';

const useStyles = makeStyles((theme: typeof CustomTheme) => ({
  mainWrapper: {
    flex: '1 1 auto',
    display: 'flex',
    height: '100%',

    [theme.breakpoints.up(960)]: {
      marginLeft: theme.sidebar.width
    }
  },
  mainContent: {
    marginTop: theme.header.height,
    flex: '1 1 auto',
    overflow: 'auto'
  }
}));

export default useStyles;
