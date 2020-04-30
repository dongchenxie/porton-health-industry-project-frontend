import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    useHistory,
    useLocation,
  } from "react-router-dom";
  import AuthContext from "../../data/AuthContext";
  import AuthAPI from "../../data/DataAccessService";
  //import { useLocation } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import { green} from '@material-ui/core/colors';
import CssBaseline from "@material-ui/core/CssBaseline";
import AssignmentIcon from '@material-ui/icons/Assignment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme)=>({
    root: {
        width: '100%',
    },
  table: {
   // minWidth: 750,
   margin: 'auto',
   alignItems: 'center',
   padding: 'auto'
  },
  paperStyle: {
    padding: theme.spacing(2),
},
  textCenter: {
    textAlign: "center",
    marginBottom:theme.spacing(1)
    },
    tableStyle:{
        //maxWidth:"100%",
        margin: 'auto',
       alignItems : 'center'
    },
    green: {
        color: '#fff',
        backgroundColor: green[500],
      },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('First name',"Vibha"),
  createData('Last Name',"Rana"),

  createData('Dr.\'s name', "Dr. Strange"),
  createData('Appointment Time'," 9:30"),
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
      <div className={classes.root}>
    <TableContainer >
         <Typography variant="h4" component="h6" className={classes.textCenter}  style={{
                            
                            textAlign: 'center',
                            color: 'deeppink',
                            fontSize:'40px',
                            fontVariant: 'outlined'
                          }}>Appointment Information</Typography>
                          <br></br>
                          <hr></hr>
      <Table className={classes.table} aria-label="simple table" className={classes.tableStyle} component={Paper} style={{}}  >
        
        <TableBody style={{}}>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" >
                {row.name} 
              </TableCell>
              <TableCell align="center" style={{fontSize: '20px', color: '#3498db'}} >{row.calories}</TableCell>
              <TableCell align="center" style={{}}>{row.fat}</TableCell>
              <TableCell align="center" style={{}}>{row.carbs}</TableCell>
              <TableCell align="center" style={{}}>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      
      <Typography variant="h5" component="h5" className={classes.textCenter}
       style={{
                           textAlign: 'center',
                          color: 'deeppink'
                          }}>
                           <Avatar className={classes.green} style={{margin : 'auto'}}>
                          <AssignmentIcon />
                          </Avatar>
                          <h5>You are checked in, please wait for instructions</h5>
                          
                          </Typography>
                         
    </TableContainer>
    </div>
    
  );
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Porton Health
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
 
}

