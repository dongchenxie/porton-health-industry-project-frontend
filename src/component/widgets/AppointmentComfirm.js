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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('First name', "Kimo"),
  createData('Last Name', "Liang"),
  createData('Phone Number', "(778)-888-8888"),
  createData('Dr.\'s name', "Dr. Strange"),
  createData('Check in Time', "2020 May 22, 19:30"),
];

export default function SimpleTable(props) {
  React.useEffect(() => {
    console.log("final")
    console.log(props.userInfo)
  }, [])
  const classes = useStyles();

  return (

    <div>
      {props.userInfo.appointmentData ?
        <div>
          <TableContainer >
            <Typography variant="h5" component="h6" className={classes.textCenter}>You Have Checked In</Typography>
            <Table className={classes.table} aria-label="simple table" className={classes.tableStyle} component={Paper}>

              <TableBody>
                
                <TableRow >
                  <TableCell component="th" scope="row">
                    First name
                   </TableCell>
                  <TableCell align="left">{props.userInfo.appointmentData.patient.firstName}</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row">
                    Last name
                   </TableCell>
                  <TableCell align="left">{props.userInfo.appointmentData.patient.lastName}</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row">
                    Date of Birth
                   </TableCell>
                  <TableCell align="left">{props.userInfo.appointmentData.patient.dateOfBirth}</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row">
                    Doctor's name
                   </TableCell>
                  <TableCell align="left">{props.userInfo.appointmentData.doctorName}</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component="th" scope="row">
                    Appointment TIme
                   </TableCell>
                  <TableCell align="left">{new Date(props.userInfo.appointmentData.appointmentTime).toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div>


            <Button
              variant="contained"
              color="primary"
              onClick={props.handleNext}
              className={classes.button}
            >
              {props.activeStep === props.steps.length - 1 ? 'Done' : 'Next'}
            </Button>
          </div>
        </div>
        : "appointment error"}
    </div>
  );
}
