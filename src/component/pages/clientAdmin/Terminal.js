import React from "react";
import AuthContext from "../../../data/AuthContext"
import { useLocation, useRouteMatch, Link, useHistory } from 'react-router-dom';
import Copywrite from '../shared/Copywrite'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Switch from '@material-ui/core/Switch';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
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
  },
  paper: {
    width: 800,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    transform: `translate(  50%, 50%)`
  },
}));


export default function Terminal(name) {
  const authContext = React.useContext(AuthContext)
  const classes = useStyles();
  let location = useLocation();
  let { path } = useRouteMatch();
  const history = useHistory()

  const [error, setError] = React.useState(null);
  const [terminal, setTerminal] = React.useState(null);
  const [termName, setTermName] = React.useState(null);
  const [stateCheck, setStateCheck] = React.useState(null);
  const [checkEnable, setCheckEnable] = React.useState(null);
  const [initCheck, setInitCheck] = React.useState(null);
  const [renderDisabled, setRenderDisabled] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [progress2, setProgress2] = React.useState(0);
  const timerRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [userVerifyName, setUserVerifyName] = React.useState("");
  const [helper, setHelper] = React.useState("");
  const [statusHelper, setStatusHelper] =  React.useState(null);

  let checkvals = {
  firstName: null,
  lastName: null,
  phoneNumber: null, 
  phoneNumberLast4: null,
  careCardNumber: null,
  dateOfBirth: null,
  careCardLast4: null
  }

  React.useEffect(() => {
    const start = async () => {
     let termNameData = await authContext.API.getIndivTerminal(location.pathname.toString().split("/")[3])
     
     let data = await authContext.API.getIndivTerminal(location.pathname.toString().split("/")[3], true)

     if (data.status === 400 && termNameData.status === 400 && termNameData.data.terminal === undefined) {
      console.log(data, "error")
      return setError("Error grabbing data from the server.")
    } else if (termNameData.data.terminal[0].status === "DISABLED" && data.status === 400 ){
       setTermName(termNameData.data.terminal[0])
       setInitCheck(termNameData.data.terminal[0].status)
       setCheckEnable(termNameData.data.terminal[0].status)
       return setRenderDisabled(true)
     } else if (data === undefined || termNameData === undefined || termNameData === null || data === null || data.status == 400){
          console.log("error", data, termNameData)
          return setError("Terminal is deleted.")
        } else {
          /////
          //MIGHT NEED TO FIX ORDER OF TOKEN VERIFICATION.....
          /////
          authContext.API.readToken(authContext.authState).then(function(result){
            if (result.role !== 'CLIENT_ADMIN'){
             return setError("404. Please try again.")
            } else {
              setTerminal(data.data.terminal[0].verificationContent[0])
              setTermName(termNameData.data.terminal[0])
              setChecks(data.data.terminal[0].verificationContent[0])
              setInitCheck(termNameData.data.terminal[0].status)
              return setCheckEnable(termNameData.data.terminal[0].status)
            }
          })
        }
    }
    start()
  }, [])


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserCreateName = (e) => {
    setUserVerifyName(e.target.value);
  }

  const delTerminal = () => {
    if (userVerifyName !== termName.name){
      return setHelper("Names do not match. Try Again.")
    } else {
    
    let reqBody = { "name": termName.name, "status": 'DELETED', "verificationContent": JSON.stringify(stateCheck) }
   setError("Terminal has been deleted.")
   return submitPut(false, reqBody)
   }
  }

  const body = (
    <div  className={classes.paper}>
      <h2 id="simple-modal-title"> Enter Terminal Name to Confirm: </h2>
      <TextField
          multiline={false}
          fullWidth={true}
          label="None"
          id="outlined-margin-none"
          className={classes.textField}
          label="Name:"
          variant="outlined"
          onChange={handleUserCreateName}
        />
        <div>
        <Button size="small" variant="contained" color="primary" style={{marginRight: '2%', marginTop: '2%', display: 'block'}} onClick={delTerminal}>Submit</Button>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
           <CircularProgress variant="determinate" style={{ marginLeft: '4%', marginTop: '3%', marginBottom: '1%', display: 'inline-block'}} value={progress2} />
           <span style={{marginTop: '3%', color: 'red'}}>{helper !== null ? helper : ""}</span> 
        </div>
    </div>
  );

  const setChecks = (terminalObj) => {
    for (var property in terminalObj) {
      for ( var compareProp in checkvals ) {
      if (compareProp === property){
         checkvals[compareProp] = terminalObj[property]
       }
      }   
    }
    return setStateCheck(checkvals)
  }

  const submitComfirm = async () => {
    let reqBody = {"name": termName.name,
    "status": termName.status,
    "verificationContent": JSON.stringify(stateCheck) 
  }
        
    let result = await authContext.API.getIndivTerminal(termName._id, undefined, reqBody);
      if (result.status === 200){
      //  setAppoitnment(result.data)
         setError("")
        } else if (result.status === 400) {
         console.log(result, "error 400")
         setError("Error submitting data to the server.")
       }

   function tick() {
    setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
   }
 
  let timer = setInterval(tick, 10);

   const finsihProcess = () => {
     clearInterval(timer)
     history.go()
     return setTerminal(stateCheck)
   }

   let finish = setTimeout(finsihProcess, 1000);
  }

const submitPut = async (path, reqBody) => {
    let result = await authContext.API.getIndivTerminal(termName._id, path, reqBody);
      if (result.status === 200){
      //  setAppoitnment(result.data)
         setError("")
         setHelper("")
         history.go()
        } else if (result.status === 400) {
         console.log(result, "status 400")
         setError("Error submitting data to the server.")
         setHelper("Error submitting data to the server.")
       }
    }

    const updateStatus = async () => {
      if (checkEnable === termName.status && termName.status === 'DISABLED') {
        setHelper("")
        return setError("Identical Status.")
      } else if (checkEnable === termName.status) {
        setError("")
        return setStatusHelper("Identical Status.")
      } else {
        setStatusHelper("")
        setError("")

      let reqBody = {"name": termName.name,
      "status": checkEnable,
      "verificationContent": JSON.stringify(stateCheck) 
     }
     
   function tock() {
    if (checkEnable === 'ENABLED'){
    setProgress2((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
    } else {
    setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }
   }
 
  let timer = setInterval(tock, 10);

   const finsihProcess2 = () => {
     clearInterval(timer)
     history.go()
     return submitPut(false, reqBody)
     }
     let finish = setTimeout(finsihProcess2, 1000);
    }
  }

        const handleSwitch = (event) => {
      let keyType = event.target.value
        setStateCheck(prevState => ({
      ...prevState,
       [keyType]: event.target.checked
       }));
     };
  
    const formRow = (label, data, keyType) => {
      return (
        <React.Fragment>
          <Grid item xs={4}>
          {label}
          </Grid>
          <Grid item xs={4}>
          {data}
          </Grid>
          <Grid item xs={4}>
           {stateCheck !== null ?  <Switch checked={stateCheck[keyType]} onChange={handleSwitch} color="primary" name="checkedB" value={keyType} inputProps={{ 'aria-label': 'primary checkbox' }}/> : "" }
          </Grid>
          </React.Fragment>
      );
    }

    const configStr = (str) => {
    let parsedStr = str ?  "Required" : "Not Required"
    return parsedStr
    }

  const renderTerminalView = (terminal) => {
    return( 
      <div> <Card className={classes.root} variant="outlined">
      <CardContent>
      <Grid container spacing={1}>
     <Grid container item xs={12} spacing={3}>
     {formRow("First Name:", configStr(terminal.firstName), 'firstName')}
     </Grid>
     <Grid container item xs={12} spacing={3}>
     {formRow("Last Name:", configStr(terminal.lastName), 'lastName' )}
     </Grid>
     <Grid container item xs={12} spacing={3}>
     {formRow("Date of Birth:", configStr(terminal.dateOfBirth), 'dateOfBirth' )}
     </Grid>
     <Grid container item xs={12} spacing={3}>
     {formRow("Phone Number:", configStr(terminal.phoneNumber), 'phoneNumber' )}
     </Grid>
     <Grid container item xs={12} spacing={3}>
     {formRow("Carecard Number:", configStr(terminal.careCardNumber), 'careCardNumber' )}
     </Grid>
     <Grid container item xs={12} spacing={3}>
     {formRow("Last 4 Digits of Carecard:", configStr(terminal.careCardLast4), 'careCardLast4')}
     </Grid>
     <Grid container item xs={12} spacing={3}>
     {formRow("Last 4 Digits of Phone Number:", configStr(terminal.phoneNumberLast4), 'phoneNumberLast4')}
     </Grid>
    </Grid>
   </CardContent>
  
   <CardActions style={{display: 'block', width: '50%'}}>   
  
     <Button size="small" variant="contained" color="primary" style={{marginTop:"2%"}} onClick={submitComfirm}>Confirm</Button>
     <CircularProgress variant="determinate" style={{ marginLeft: '4%', marginTop: '2%', marginBottom: '-2%'}} value={progress} />
    </CardActions>
    </Card>
  
    <Button variant="contained" onClick={handleOpen} style={{marginTop: '3%', marginBottom: '1%', backgroundColor: 'blue', color: 'white', display: 'block'}}> Delete Terminal </Button>
    </div>
    )
  }


//terminal popup functions:

const handleCheckEnable = (event) => {
   return setCheckEnable(event.target.value);
}

const EnableTerminal = () => {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div >
        <FormControl component="fieldset">
      <FormLabel component="legend">Status</FormLabel>
      <br/>
      <RadioGroup aria-label="status" name="status" onChange={handleCheckEnable} aria-label="position" row>
        <FormControlLabel value="ENABLED" control={<Radio />} label="Enable" labelPlacement="top" />
        <FormControlLabel value="DISABLED" control={<Radio />} label="Disable" labelPlacement="top" />
      </RadioGroup>
      <Button onClick={updateStatus} fullWidth variant="contained"color="primary"> Confirm </Button>
    </FormControl>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {statusHelper !== null ? statusHelper : ""}
    </div>
  </div>
      </Container>
    </div>
  );     
 }

const RenderDisableView = () => {
  return( <div> 
    <h3>Terminal Is Currently Disabled</h3>
    <PopupState variant="popover" popupId="demo-popup-popover">
       {(popupState) => (
         <div>
        <Button size="small" variant="contained" color="primary" style={{marginTop:"2%", marginBottom: '1%'}} {...bindTrigger(popupState)}>Enable/Disable Terminal</Button>
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
             <EnableTerminal />
             </Box>
           </Popover>
         </div>
       )}
     </PopupState>
     <CircularProgress variant="determinate" style={{ marginLeft: '4%', marginTop: '3%', marginBottom: '1%', display: 'inline-block'}} value={progress2} />
   </div> )
}


    return(
      <div>
        {error !== null ? error : ""}
        {termName !== null && termName !== undefined ? <h3>{termName.name}</h3> : ""}
        {renderDisabled === true ? <RenderDisableView /> : ""}
        {terminal !== null && terminal !== undefined && renderDisabled === null ? 
  <div> 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
   <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
       <Button size="small" variant="contained" color="primary" style={{marginTop:"2%", marginBottom: '1%'}} {...bindTrigger(popupState)}>Enable/Disable Check-in</Button>
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
            <EnableTerminal />
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
     {renderTerminalView(terminal)}
        </div> 
         : "" }
    <Link to={`${path.substring(0, path.length - 4)}`} style={{textDecoration: 'none', color: 'inherit'}}> <Button variant="contained" style={{marginTop: '2%', backgroundColor: 'black', color: 'white', display: 'block'}}> Return to list </Button> </Link>
    <div style={{marginTop: '4%'}}> <Copywrite /> </div>
      </div>
    ) 
  }