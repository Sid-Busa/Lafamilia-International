import { makeStyles } from '@material-ui/styles';
import { CustomTheme } from 'src/theme/base';

const useStyles = makeStyles((theme: typeof CustomTheme) => ({
	form: {
		'& > *': {
			margin: '10px 0px',
		},
	},
	error: {
		color: '#FF1943',
		fontSize: 13,
		fontWeight: 'bold',
	},
	instructorText: {
		color: '#5569ff',
		marginBottom: 10,
	},
	button: {
		backgroundColor: '#5569ff',
		color: '#FFF',
		textDecoration: 'none',
		'&:hover': {
			backgroundColor: '#2634a1',
		},
	},
	filterPannel: {
		padding: 10,
		marginBottom: 10,
	},
	filterTitle: {
		display: 'flex',
		alignItems: 'center',
		gap: 6,
	},
	checkBoxPosition: {
		textAlign: 'center',
	},
	csvButtonPositon: {
		textAlign: 'end',
	},
	instructor_text: {
		fontWeight: 'bold',
		color: '#5569ff',
		textDecoration: 'underline',
		textAlign: 'center',
		fontSize: 18,
	},
	moreDetailsText: {
		marginTop: 10,
		cursor: 'pointer',
		color: '#EF7F1A',
		fontWeight: 600,
	},
	studentFeedback: {
		fontWeight: 'bolder',
		margin: '10px 0px',
		fontSize: 16,
	},
	inputField: {
		width: '100%',
		minWidth: 200,
		'& fieldset': {
			border: 'none',
		},
	},
	studentBorderedTable: {
		'& th': {
			border: '1px solid black',
			borderCollapse: 'collapse',
		},
		'& td': {
			border: '1px solid black',
			borderCollapse: 'collapse',
		},
	},

	borderedTable: {
		'& th': {
			border: '1px solid black',
			borderCollapse: 'collapse',
			padding: 10,
		},
		'& td': {
			border: '1px solid black',
			borderCollapse: 'collapse',
			padding: 0,
		},
	},
	updateButton: {
		backgroundColor: '#5569ff',
		color: '#FFF',
		'&:hover': {
			backgroundColor: '#5569ff',
		},
	},
}));

export default useStyles;
