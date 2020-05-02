import React from "react";
import AuthContext from "../../../data/AuthContext"
import { Link, useRouteMatch } from "react-router-dom";

//material-ui components:
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MuiTableSortLabel  from '@material-ui/core/TableSortLabel';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
      width: '100%',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    container: {
      marginTop: '2%',
      maxHeight: '100%',
    },
  }));


export default function AppointmentList() {
  const classes = useStyles();
  let { url } = useRouteMatch();

  const authContext = React.useContext(AuthContext)
  const [error, setError] = React.useState(null);
  const [appointments, setAppoitnments] = React.useState(null);
  const [initialApiResult, setinitialApiResult] = React.useState(null);
  const [meta, setMeta] = React.useState(null);
  const [initialSort, setInitialSort] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [direction, setDirection] = React.useState("asc")
  const [page, setPage] = React.useState(1);
  const [searchToggle, setSearchToggle] = React.useState(null);

  let today = new Date()
  const [dateA, setDateA] = React.useState(today);
  const [dateB, setDateB] = React.useState(today);

  React.useEffect(() => {
    const start = async () => {
      let data = await authContext.API.getClientAppointments()
      // dummy data...
      //let data = {"data": { "metadata": {totalPages: 1}, "data": [{patient: "john smith", appointmentTime: '2020-04-11T03:36:57.292Z', doctorName: 'john doe', status: 'Pending', comments: "", reason: "Flu", _id: 1}, {patient: "ralph wiggum", appointmentTime: '2020-04-11T03:36:57.292Z', doctorName: 'john doe', status: 'comfiremd', comments: '', reason: 'injury', _id: 2}, {patient: "henry jones", appointmentTime: '2020-04-11T03:36:57.292Z', doctorName: 'doctor B', status: 'cancled', comments: '', reason: 'covid-19', _id: 3}, {patient: "sam doe", appointmentTime: '2020-04-11T03:36:57.292Z', doctorName: 'doctor C', status: 'pending', comments: '', reason: 'check-up', _id: 4}]}}
      //console.log(data)
      console.log(data)

      if (data === undefined){
        console.log("error")
        setError("Error grabbing data from the server.")
      } else if (data === undefined){
        console.log("error")
        setError("Error grabbing data from the server.")
      } else {
        authContext.API.readToken(authContext.authState).then(function(result){
          if (result.role !== 'CLIENT_ADMIN'){
           return setError("404. Please try again.")
          } else {
            if(data.data.metadata.totalResults === 0){
              setError("No current appointments")
            } else {
            setMeta(data.data.metadata)
        //    setinitialApiResult(formatDates(data.data.data))
            setAppoitnments(formatAppoitments(data.data.data))
            setInitialSort(data.data.data)
            }
          }
        })
      }
    }
    start()
  }, [])
  
  
const formatAppoitments = (aptObj) => {
  let localObj = []
  aptObj.forEach(appointment => {    
     appointment.appointmentVal = appointment.appointmentTime
     let parseDate = appointment.appointmentTime.split('T')[0]
     let parseTime = appointment.appointmentTime.split('T')[1].substr(0, 5)

     let fullName = `${appointment.patient[0].firstName} ${appointment.patient[0].lastName}`
     appointment.patient = fullName

    appointment.appointmentTime = `${parseDate} ${parseTime}`

    localObj.push(appointment)
  });

  return localObj
}

  const columns = [
    { id: 'patient', label: 'Patient', minWidth: 120 },
    { id: 'appointmentTime', label: 'Apt. Time', minWidth: 120 },
    { id: 'doctorName', label: 'Doctor', minWidth: 120 },
    { id: 'status', label: 'Status', minWidth: 120 },
    { id: 'action', label: 'Action', minWidth: 150 } ] 

      //create top header 
      const createData = (patient, appointmentTime, doctorName, status, action, id ) => {
        return { patient, appointmentTime, doctorName, status, action, id };
      }

      const renderAction = (appointment) => {
        return(<Link to={`${url}/${appointment._id}`} style={{textDecoration: 'none', color: 'inherit'}}><Button size="small" variant="contained" color="primary">Appointment Information and Actions</Button></Link>)
      }
      
      const sortTable = (col) => {        
        if(direction === "asc"){
           let sorted = appointments.sort(function(a, b){
             if(a[col] > b[col]) { return 1; }
             if(a[col] < b[col]) { return -1; }  
             return 0;
         })  
         setAppoitnments(sorted)
         setDirection("desc")
         } else {
           let sorted = appointments.sort(function(a, b){
             if(a[col] < b[col]) { return 1; }
             if(a[col] > b[col]) { return -1; }
           return 0;
         })  
          setAppoitnments(sorted)
          setDirection("asc")
         }
    }

//to implement once API finished....
const handleSearchChange = (e) => {
  setSearch(e.target.value);
};

const submitSearch = (event) => {
  if (event.key === "Enter" && search !== "") {
    console.log(search)
    setSearchToggle(true)
    setPage(1)
    event.target.value = ""
  }
}

//clear search fields, render base API  result again.
const clearSearch = () => {
  setSearch("")
  setSearchToggle(false)
  setPage(1)
}


//to implement once API finished....
const handleChangePage = () => {
console.log("next")
}
    
const handleDateA = (date) => {
 setDateA(date)
};

const handleDateB = (date2) => {
  setDateB(date2)
  //do something with dateA, dateB
 };

 const handleToday = () => {
  setDateA(today)
  setDateB(today)
  console.log(dateA, dateB)
 }

return(
  <div> 
          {error !== null ? error : ""}
          {appointments !== null && appointments !== undefined ? 
  <div>
    {/* { console.log(appointments)} */}
    <h3>Appointments: </h3>
    <Paper className={classes.root}>
    {searchToggle === true ? <Button size="small" variant="contained" color="primary" onClick={clearSearch}>Clear Search</Button> : ""}
    <Button size="small" variant="contained" color="primary" onClick={handleToday}>Show Today</Button>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="From"
          value={dateA}
          onChange={handleDateA}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-inline"
          label="To"
          format="MM/dd/yyyy"
          value={dateB}
          onChange={handleDateB}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />      
        </Grid>
      </MuiPickersUtilsProvider>

    <TextField id="outlined-basic" label="Search By Field" variant="outlined" style={{float: 'right', marginBottom: '2%'}} onChange={handleSearchChange} onKeyPress={submitSearch}/> 

    <TableContainer className={classes.container}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead >
          <TableRow>
            {columns.map((column, i) => (
              <TableCell 
                key={i}
                align={column.align}
                style={{ minWidth: column.minWidth, backgroundColor: '#df0f6a', color: 'white' }} >
                {column.label}
                {column.id !== 'action' ? <MuiTableSortLabel active onClick={() => sortTable(column.id) } direction={direction}> </MuiTableSortLabel> : ""}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((row, i) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                {columns.map((column, i) => {
                  let value = row[column.id];
                  return (
                    <TableCell key={column.id} key={i} align={column.align}>
                      {column.id === 'action' ? renderAction(row) : value}
                    </TableCell>
                  );
                })}
                  
              </TableRow>
            );
          })}
        </TableBody>

        <TableBody > 
        <div  style={{display: 'flex', justifyContent: 'center'}}> 
        Page {page} of {meta.totalPages}
        <ArrowLeftIcon onClick={() => handleChangePage("l")}/>
        <ArrowRightIcon onClick={() => handleChangePage("r")}/>
        </div>
        </TableBody> 

      </Table>
    </TableContainer>
  </Paper>
</div>
      : "" }
</div>
  ) 
  }