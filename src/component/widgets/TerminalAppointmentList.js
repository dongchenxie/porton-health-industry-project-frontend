import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AuthContext from "../../data/AuthContext";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  textCenter: {
    textAlign: "center",
    marginBottom: theme.spacing(1)
  },
  tableStyle: {
    maxWidth: "100%"
  }
}));

function createData(_id, firstname, lastname, apptTime, doctorName) {
  return { _id, firstname, lastname, apptTime, doctorName };
}

const rows = [
  createData("123", 'Kimo', "Liang", "2020-05-05 14:00 AM", "Dr. Strange"),
  createData("123", 'Kimo', "Liang", "2020-05-05 14:00 AM", "Dr. Strange"),
  createData("123", 'Kimo', "Liang", "2020-05-05 14:00 AM", "Dr. Strange"),
  createData("123", 'Kimo', "Liang", "2020-05-05 14:00 AM", "Dr. Strange"),
  createData("123", 'Kimo', "Liang", "2020-05-05 14:00 AM", "Dr. Strange"),
];

export default function SimpleTable(props) {
  const classes = useStyles();
  const [data, setData] = React.useState(null)
  const [page,setPage]=React.useState(1)
  const [enabled, setEnabled] = React.useState(true)
  const handleThisIsMe = (id) => {
    console.log(id)
   
    props.setUserInfo((state)=>{
      return {...state,appointmentId:id}
    })
    props.handleNext()
  }
  const authContext = React.useContext(AuthContext)
  const getAppointments = async (min_ahead,thisPage , thisPerPage) => {
    console.log("refresh")
    const result = await authContext.API.TerminalGetAppointments(min_ahead,thisPage, thisPerPage)
    if (result.status === 401) {
      alert("failure to login")
      localStorage.removeItem("terminal-token")
      props.setIsAuthed(false)
    } else if (result.status === 200) {
      
      setData(result.data)
    } else {
      setEnabled(false)
    }
    console.log(result)
  }
  React.useEffect(()=>{
    console.log(page)
    getAppointments(15, page, 5)
    const interval = setInterval(()=>{getAppointments(15, page, 5)}, 30000);
    props.setUserInfo({}) 
    return ()=>{
      clearInterval(interval)
    }
  },[])
  React.useEffect(() => {
    getAppointments(15, page, 5)  
  }, [page])
  const dataMask = (data = "loading") => {
    let result = ''
    for (let i = 0; i < data.length; i++) {
      if (i == 0 || i == data.length - 1) {
        result += data[i]
      } else {
        result += "*"
      }
    }
    return result
  }

  return (
    <div>
      {setEnabled&&data ?
        <div>
          <TableContainer >
            <Typography variant="h5" component="h6" className={classes.textCenter}>Please Comfirm Your Check-in Details</Typography>
            <Table className={classes.table} aria-label="simple table" className={classes.tableStyle} component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Appt. Time</TableCell>
                  <TableCell>Doctor's Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data ?
                  data.data.map((row) => (
                    <TableRow key={row.name}>
                      {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
                      <TableCell align="left">{dataMask(row.patient[0].firstName)}</TableCell>
                      <TableCell align="left">{dataMask(row.patient[0].lastName)}</TableCell>
                      <TableCell align="left">{new Date(row.appointmentTime).toLocaleString()}</TableCell>
                      <TableCell align="left">{row.doctorName}</TableCell>
                      <TableCell align="left"><Button variant="contained" color="primary" onClick={() => { handleThisIsMe(row._id) }}>This is me</Button></TableCell>
                    </TableRow>
                  )) : "loading"}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            <Button disabled={!data.metadata.prevPage} onClick={()=>{setPage((state)=>{return state-1})}} className={classes.button}>
              Prev Page
              </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={()=>{setPage((state)=>{return state+1})}}
              className={classes.button}
              disabled={!data.metadata.nextPage}
            >
              Next Page
        </Button>
          </div></div> : "This terminal has been disabled or lost connection"}
    </div>
  );
}