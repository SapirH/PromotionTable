import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    tableContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        flexDirection: 'column',
        height: '80vh!important',
        width: '92vw!important',
    },
    tableHead: {
        backgroundColor: 'black',
    },
    tableBody: {
        height: '100%',
        width: '100%',   
        backgroundColor:'#cfcaca',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    cell:{
        width: '15vw',
        marginLeft: '1vw',
        display: 'flex',
    },
    title:{
        fontWeight:'bold',
        color: '#d8d0d0'
    },
    icon:{
        color:'black',
    },
    checkbox: {
        width: '1vw',
        display: 'flex',
        justifyContent: 'space-around',
    },
    swal: {
        fontFamily: 'system-ui'
    },
})
export default useStyles;