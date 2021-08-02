import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    btn:{
        margin: 'auto',
        display: 'flex',
        marginTop: '2vh',
        marginBottom: '1vh',
    },
    container: {
        fontFamily: 'system-ui',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    title:{
        color: '#b02020',
        fontSize: '28px',
        marginBottom: '2vh',
    },
})
export default useStyles;