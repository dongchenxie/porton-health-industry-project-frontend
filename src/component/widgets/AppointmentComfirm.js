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
const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 650,
  },
  textCenter: {
    textAlign: "center",
    marginBottom:theme.spacing(1)
    },
    tableStyle:{
        maxWidth:"100%"
    }
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('First name',"Kimo"),
  createData('Last Name',"Liang"),
  createData('Phone Number', "(778)-888-8888"),
  createData('Dr.\'s name', "Dr. Strange"),
  createData('Check in Time',"2020 May 22, 19:30"),
];

export default function SimpleTable(props) {
  const classes = useStyles();

  return (
    <div>
    <TableContainer >
         <Typography variant="h5" component="h6" className={classes.textCenter}>You Have Checked In</Typography>
      <Table className={classes.table} aria-label="simple table" className={classes.tableStyle} component={Paper}>
        
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="left">{row.fat}</TableCell>
              <TableCell align="left">{row.carbs}</TableCell>
              <TableCell align="left">{row.protein}</TableCell>
            </TableRow>
          ))}
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
  );
}
