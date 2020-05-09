import React from "react";
import AuthContext from "../../../data/AuthContext"
import { Link, useRouteMatch } from "react-router-dom";
import Copywrite from '../shared/Copywrite'

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

const startStamp = "T00:00:00.000Z";
const endStamp = "T22:58:58.000Z";


const query = {term: undefined, start: undefined, end: undefined, page: undefined}

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

  let sortKey = {doctorName: "asc", appointmentTime: "asc", patient: "asc", status: "asc"}
  const [direction, setDirection] = React.useState(sortKey)
  let [page, setPage] = React.useState(1);
  const [searchToggle, setSearchToggle] = React.useState(null);
  const [helper, setHelper] = React.useState(null);

  const [dateA, setDateA] = React.useState();
  const [dateB, setDateB] = React.useState();

  React.useEffect(() => {
    const start = async () => {
      return callAPI(query)
    }
    handleToday()
    start()
  }, [])
  
  const callAPI = async (query) => {
    let apiData = undefined
    const start=query.start
    const end=query.end
    
    apiData = await authContext.API.getClientAppointments(query.term, start, end, query.page) 
  if (apiData === undefined){
    console.log("error", apiData)
    setError("Error grabbing data from the server.")
  } else if (apiData.data === undefined){
    console.log("error", apiData)
    setError("Error grabbing data from the server.")
    alert("Invalid dates seleceted, try again.")
  } else {
    
    authContext.API.readToken(authContext.authState).then(function(result){
      if (result.role !== 'CLIENT_ADMIN'){
       return setError("404. Please try again.")
      } else {
        if(apiData.data.metadata.totalResults === 0){
          setMeta(apiData.data.metadata)
          setMeta((prevState) => ({
            ...prevState,
            totalPages: 1,
          }))
          setHelper("No current appointments")
          setAppoitnments([])
         setPage(1)
        } else {
        setError("")
        setHelper("")
        setMeta(apiData.data.metadata)
        setAppoitnments(formatAppoitments(apiData.data.data))
        }
      }
    })
  }
}
  
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
     
const handleSearchChange = (e) => {
  setSearch(e.target.value);
};

//may be bug here...
const submitSearch = (event) => {
  if (event.key === "Enter" && search !== "") {
    query.term = ""
    query.term = search
    setSearchToggle(true)
    setPage(1)
    event.target.value = ""
    return  callAPI(query)
  }
}

const clearSearch = () => {
  setSearch("")
  setSearchToggle(false)

  query.term = undefined
  query.page = undefined
  setHelper("")
  setPage(1)
  return callAPI(query)
}

 const handleDateA = (date, event) => {

    if (date != 'Invalid Date'){

      setDateA(date)
      let val = date    
    let adjustedDate=new Date(date);
    adjustedDate.setHours(0,0,0,0)
    // adjustedDate.setDate(date.getDate()-1)

      query.term = undefined
     query.start = adjustedDate
     query.end = dateB
     query.page = undefined

     return callAPI(query)
    } else {
      return setError('Enter a Valid Date')
    }
  };
   
   const handleDateB = (date2) => {
    if (date2 != 'Invalid Date'){
      setDateB(date2)
      let val = date2  
      let adjustedDate=new Date(dateA);
    adjustedDate.setDate(new Date(dateA).getDate())
     query.term = undefined
     query.start =  dateA
     query.end = val
     query.page = undefined

     return callAPI(query)
    } else {
      return setError('Enter a Valid Date')
    }
   };
   

  //  I MAY NEED TO FIX THIS PART>>>>>>

     const handleToday = () => {
      const tempDate=new Date()
      const tempDate1=new Date()
     
      tempDate.setHours(0,0,0,0)
 
       let a =   tempDate
       tempDate1.setHours(22,59,0,0)
       let b = tempDate1
   
       setDateA(a)
       setDateB(b)
       setError("")
       setSearch("")
       setSearchToggle(false)
       setPage(1)

      query.term = undefined
      query.start = a
      query.end = b
      query.page = undefined

      return callAPI(query)
     }

  //might need some correction once more seeded data added...
const handleChangePage = async (pageDir) => {
  if (pageDir == 'r' && page + 1 <= meta.totalPages){
    setPage(page += 1)
    query.page = page
    return callAPI(query)
  } else if (pageDir == 'l' && page - 1 >= 1){
    setPage(page -= 1)
    query.page = page
  return  callAPI(query)
  }
};

const sortTable = (col) => {
  if(direction[col] === "asc"){
    let sorted = appointments.sort(function(a, b){
      if(a[col] > b[col]) { return 1; }
      if(a[col] < b[col]) { return -1; }  
     return 0;
  })  
  setAppoitnments(sorted)
  return setDirection(prevState => ({
  ...prevState,
  [col]: "desc"
  }));
  } else {
    let sorted = appointments.sort(function(a, b) {
      if(a[col] < b[col]) { return 1; }
      if(a[col] > b[col]) { return -1; }
      return 0;
  })  
  setAppoitnments(sorted)
  return setDirection(prevState => ({
    ...prevState,
    [col]: "asc"
    }));
  }
}

const parseStatus = (str) => {
  if (str === 'CHECK_IN'){
    return str = "Checked In"
  } else if (str === 'PENDING'){
    return str = "Pending Appointment"
  } else if (str === 'NOT_SHOW'){
    return str = "Patient Did Not Show Up"
  } else if (str === 'CANCELED') {
   return str = "Canceled"
  }
}

const parseTime = (str) => {
  let time = str.split(':');
  let meridiemTime = time[0] >= 12 && (time[0]-12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
  return meridiemTime
}

const parseDate = (datestr) => {
 
  const result= new Date(datestr)
  result.setMinutes(result.getMinutes()-result.getTimezoneOffset())
  
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour: 'numeric',minute: 'numeric'};

  return  result.toLocaleDateString("en-US", options)
}

return(
  <div> 
          {error !== null ? error : ""}
          {appointments !== null && appointments !== undefined ? 
  <div>
    <h3>Appointments: <Button size="small" variant="contained" color="primary" style={{marginLeft: '1%'}} onClick={handleToday}>Show Today</Button>
</h3> 
    <Paper className={classes.root}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
         style={{marginTop: '1%'}}
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
         style={{marginTop: '1%'}}
          margin="normal"
          disableToolbar
          variant="inline"
          id="date-picker-inline"
          label="To"
          format="MM/dd/yyyy"
          value={dateB}
          onChange={handleDateB}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />      

       <TextField id="outlined-basic" label="Search" variant="outlined" size="small" style={{ marginBottom: '1%', marginTop: '2%', marginRight: '2%', float: 'right', display: 'inline'}} onChange={handleSearchChange} onKeyPress={submitSearch}/> 
        </Grid>
      </MuiPickersUtilsProvider>

      {searchToggle === true ? <Button size="small" variant="contained" color="primary" style={{marginRight: '1%', marginLeft: '1%', marginTop: '2%'}} onClick={clearSearch}>Clear Search</Button> : ""}

    <TableContainer className={classes.container}>
    {helper !== null ? <div style={{ marginLeft: '1%', marginBottom: '1%'}}>{helper}</div> : "" }
      <Table stickyHeader aria-label="sticky table">
        <TableHead >
          <TableRow>
            {columns.map((column, i) => (
              <TableCell 
                key={i}
                align={column.align}
                style={{ minWidth: column.minWidth, backgroundColor: '#df0f6a', color: 'white' }} >
                {column.label}
                {column.id !== 'action' ? <MuiTableSortLabel active onClick={() => sortTable(column.id) } direction={direction[column.id]}> </MuiTableSortLabel> : ""}
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
                  if (column.id === 'status' ){
                    value = parseStatus(value) 
                  } else if (column.id === 'appointmentTime'){
                    value = parseDate(value)
                  }
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
      <div style={{marginTop: '4%'}}> <Copywrite /> </div>
</div>
  ) 
}