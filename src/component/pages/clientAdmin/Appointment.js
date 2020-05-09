import React from "react";
import AuthContext from "../../../data/AuthContext"
import { useLocation, useRouteMatch, Link, useHistory } from 'react-router-dom';
import Copywrite from '../shared/Copywrite'

//material-ui components:
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
  }
});


export default function Appointment() {
  const authContext = React.useContext(AuthContext)
  const classes = useStyles();
  let location = useLocation();
  let { path } = useRouteMatch();
  const history = useHistory();
  
  const [error, setError] = React.useState(null);
  const [appoitnment, setAppoitnment] = React.useState(null);
  const [comment, setComment] = React.useState(null);
  const [checkVal, setCheckVal] = React.useState(null);
  const [initCheck, setInitCheck] = React.useState(null);
  const [helper, setHelper] = React.useState(null);
  const [statusHelper, setStatusHelper] = React.useState(null);

  const [progress, setProgress] = React.useState(0);
  const [progress2, setProgress2] = React.useState(0);
  const timerRef = React.useRef();

  React.useEffect(() => {
    const start = async () => {
      let data = await authContext.API.getIndivAppointment(location.pathname.toString().split("/")[3]) 
      if (data === undefined || data.error){
        console.log("error: ", data)
        setError("Error grabbing data from the server.")
      } else {
        authContext.API.readToken(authContext.authState).then(function(result){
          if (result.role !== 'CLIENT_ADMIN'){
           return setError("404. Please try again.")
          } else {
            setAppoitnment(data.data)
            setInitCheck(data.data.status)
          }
        })
      }
    }
    start()
  }, [])


  const formRow = (label, data) => {
    return (
      <React.Fragment>
        <Grid item xs={4}>
        {label}
        </Grid>
        <Grid item xs={4}>
        {data}
        </Grid>
        </React.Fragment>
    );
  }

  const submitComment = async (e) => {
    if (comment === "" || comment === null){
      return setHelper("Can not be blank.")
    }

    let reqBody = {
      "doctorName": appoitnment.doctorName,
      "appointmentTime": appoitnment.appointmentTime,
      "reason": appoitnment.reason,
      "status": appoitnment.status,
      "comment": comment,
      "clinic": appoitnment.clinic,
      "patient": appoitnment.patient._id
  };

  let result = await authContext.API.updateAppointment(appoitnment['_id'], reqBody);
        if (result.status === 200){
         setError("")
         let timer = setInterval(tick, 20);
         const finsihProcess = () => {
         clearInterval(timer)
         return history.go()
         }
         let finish = setTimeout(finsihProcess, 1000);
        } else if (result.status === 400) {
         console.log('400 error:', result)
         let timer = setInterval(tick, 30);
         const finsihProcess = () => {
           clearInterval(timer)
           history.go()
           return setError("Error submitting data to the server.")
         }
         let finish = setTimeout(finsihProcess, 1000);
        }

        function tick() {
          setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
        }
      }

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const parseStatus = (str) =>{ 
  if (str === 'CHECK_IN'){
    return str = "Checked In"
  } else if (str === 'PENDING'){
    return str = "Pending Status"
  } else if (str === 'CANCELED') {
   return str = "Canceled"
    } else if (str === 'NOT_SHOW') {
      return str = "Patient Did Not Attend"
    }
  }

  const parseTime = (str) => {
  let time = str.split(':');
  let meridiemTime = time[0] >= 12 && (time[0]-12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
  return meridiemTime
}

const parseDate = (datestr) => {
 
  const result= new Date(datestr)
 
  
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour: 'numeric',minute: 'numeric'};

  return  result.toLocaleDateString("en-US", options)
}


  const renderAppointment = () => {
    return( 
    <div style={{marginBottom: '2%'}}> <Card className={classes.root} variant="outlined">
    <CardContent>
    <Grid container spacing={1}>
   <Grid container item xs={12} spacing={3}>
   {formRow("Patient Name:", appoitnment.patient.firstName + " " + appoitnment.patient.lastName)}
   </Grid>
   <Grid container item xs={12} spacing={3}>
   {formRow("Appointment Time:", parseDate(appoitnment.appointmentTime))}
   </Grid>
   <Grid container item xs={12} spacing={3}>
   {formRow("Doctor:", appoitnment.doctorName)}
   </Grid>
   <Grid container item xs={12} spacing={3}>
   {formRow("Reason For Visit:", appoitnment.reason)}
   </Grid>
   {appoitnment.comment && appoitnment.comment !== "" ? <Grid container item xs={12} spacing={3}>
   {formRow("Comments:", appoitnment.comment)}
   </Grid> : ""}
   <Grid container item xs={12} spacing={3}>
   {formRow("Appointment Status:", parseStatus(appoitnment.status))}
   </Grid>
  </Grid>
 </CardContent>

 <CardActions style={{display: 'block', width: '50%'}}>   
 <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
       <Button size="small" variant="contained" color="primary" style={{marginTop:"2%", marginLeft: '1%', marginBottom: '5%'}} {...bindTrigger(popupState)}>Change Appointment Status </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
           >
            <Box p={2}>
            <StatusChange />
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>

   <div style={{marginBottom: '-1%'}}>
   <TextField
          multiline={true}
          fullWidth={true}
          label="None"
          id="outlined-margin-none"
          className={classes.textField}
          label="Comments"
          variant="outlined"
          onChange={handleCommentChange}
        />
     </div>    
   <Button size="small" variant="contained" color="primary"  onClick={submitComment}>Submit</Button>
   <CircularProgress variant="determinate" style={{ marginLeft: '4%', marginTop: '2%'}} value={progress} />
  </CardActions>
  </Card>
  </div>)
}

const updateStatus = async () => {
  if (checkVal === initCheck ){
    return setStatusHelper("Status is identical.") 
   }

  let reqBody = {
    "doctorName": appoitnment.doctorName,
    "appointmentTime": appoitnment.appointmentTime,
    "reason": appoitnment.reason,
    "status": checkVal,
    "comment": appoitnment.comment,
    "clinic": appoitnment.clinic,
    "patient": appoitnment.patient._id
};

     let result = await authContext.API.updateAppointment(appoitnment['_id'], reqBody);
      if (result.status === 200){
        setStatusHelper("")
        setError("")
      let timer = setInterval(tock, 30);
       const finsihProcess2 = () => {
         clearInterval(timer)
         return history.go()
         }
         let finish = setTimeout(finsihProcess2, 1000);
      } else if (result.status === 400) {
        setStatusHelper("")
       console.log("400 status:", result)
      let timer = setInterval(tock, 30);
      const finsihProcess2 = () => {
        clearInterval(timer)
        return  setError("Error submitting data to the server.")
        }
        let finish = setTimeout(finsihProcess2, 1000);
      }
      
      function tock() {
        setProgress2((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
       }
}

const handleCheck = (event) => {
  return setCheckVal(event.target.value);
};

const StatusChange = () => {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <FormControl component="fieldset">
      <FormLabel component="legend">Status</FormLabel>
      <br/>
      <RadioGroup aria-label="status" name="status" onChange={handleCheck} aria-label="position" row>
        <FormControlLabel value="CHECK_IN" control={<Radio />} label="Checked In" labelPlacement="top" />
        <FormControlLabel value="PENDING" control={<Radio />} label="Pending" labelPlacement="top" />
        <FormControlLabel value="NOT_SHOW" control={<Radio />} label="Not Shown" labelPlacement="top" />
      </RadioGroup>
      <Button onClick={updateStatus} fullWidth variant="contained"color="primary" > Confirm </Button>
    </FormControl>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'block', marginBottom: '2%'}}>{statusHelper !== null ? statusHelper : "" }</div> 
        <CircularProgress variant="determinate" style={{ marginLeft: '4%', marginTop: '3%', marginBottom: '1%', display: 'inline-block'}} value={progress2} />
      </div>
        </div>
    </Container>
  </div>
  )  
}

    return(
      <div>
        {error !== null ? error : "" }
        {appoitnment !== null && appoitnment !== undefined ? renderAppointment(appoitnment) : ""}
        <div style={{display: 'block', marginBottom: '2%'}}>{helper !== null ? helper : "" }</div> 
        <Link to={`${path.substring(0, path.length - 4)}`} style={{textDecoration: 'none', color: 'inherit'}}> <Button variant="contained" style={{marginTop: '2%', backgroundColor: 'black', color: 'white'}}> Return to list </Button> </Link>
        <div style={{marginTop: '4%'}}> <Copywrite /> </div>
      </div>
    ) 
  }