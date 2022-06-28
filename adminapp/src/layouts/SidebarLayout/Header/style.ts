import { makeStyles } from '@mui/styles';
// import { Theme } from '@mui/system';
import { CustomTheme } from 'src/theme/base';

const useStyles = makeStyles((theme: typeof CustomTheme) => ({
  headerWrapper: {
    height: 60,
    color: theme.header.textColor,
    padding: theme.spacing(0, 2),
    right: 0,
    zIndex: 5,
    backgroundColor: theme.header.background,
    boxShadow: theme.header.boxShadow,
    position: 'fixed',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.up(960)]: {
      left: theme.sidebar.width,
      width: 'auto'
    }
    // `@media (min-width: ${theme.breakpoints.values.lg}px)`: {
    //     left: theme.sidebar.width,
    //     width: 'auto',
    // }
  }
}));

export default useStyles;
