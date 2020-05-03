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
  const handleThisIsMe = () => {
    props.handleNext()
  }

  return (
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
            {rows.map((row) => (
              <TableRow key={row.name}>
                {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
                <TableCell align="right">{row.firstname}</TableCell>
                <TableCell align="right">{row.lastname}</TableCell>
                <TableCell align="right">{row.apptTime}</TableCell>
                <TableCell align="right">{row.doctorName}</TableCell>
                <TableCell align="right"><Button variant="contained" color="primary" onClick={() => { handleThisIsMe(row._id) }}>This is me</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Button disabled={props.activeStep === 0} onClick={props.handleBack} className={classes.button}>
          Back
              </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={props.handleNext}
          className={classes.button}
        >
          {props.activeStep === props.steps.length - 1 ? 'Comfirm' : 'Next'}
        </Button>
      </div>
    </div>
  );
}