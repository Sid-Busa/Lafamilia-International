import { makeStyles } from '@material-ui/styles';
import { CustomTheme } from 'src/theme/base';

const useStyles = makeStyles((theme: typeof CustomTheme) => ({
	form: {
		'& > *': {
			margin: '10px 0px',
		},
	},
	loginText: {
		textAlign: 'center',
	},
	companyName: {
		color: '#5569FF',
	},
	loginSubmitButton: {
		marginTop: '10px !important',
	},
}));

export default useStyles;
