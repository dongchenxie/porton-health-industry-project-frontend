import React from "react";
import AuthContext from "../../../data/AuthContext"
import { useLocation, useRouteMatch, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
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


export default function Terminal(name) {
  const authContext = React.useContext(AuthContext)
  const classes = useStyles();
  let location = useLocation();
  let { path } = useRouteMatch();

  const [error, setError] = React.useState(null);
  const [terminal, setTerminal] = React.useState(null);
  const [termName, setTermName] = React.useState(null);
  const [stateCheck, setStateCheck] = React.useState(null);
  const [checkEnable, setCheckEnable] = React.useState(null);
  const [initCheck, setInitCheck] = React.useState(null);


  let checkvals = {
  firstName: null,
  lastName: null,
  phoneNumber: null, 
  phoneNumberLast4: null,
  careCardNumber: null
  }


  React.useEffect(() => {
    const start = async () => {
     let termNameData = await authContext.API.getIndivTerminal(location.pathname.toString().split("/")[3])
     let data = await authContext.API.getIndivTerminal(location.pathname.toString().split("/")[3], true)
        if (data === undefined || termNameData === undefined || termNameData === null || data === null ){
          console.log("error")
          setError("Error grabbing data from the server.")

        } else if(data.status === 400 || termNameData.status === 400) {
          console.log("error")
          setError("Terminal has been deleted.")
        } else {
          /////
          //MIGHT NEED TO FIX ORDER OF TOKEN VERIFICATION.....
          /////
          authContext.API.readToken(authContext.authState).then(function(result){
            if (result.role !== 'CLIENT_ADMIN'){
             return setError("404. Please try again.")
            } else {
              setTerminal(data.data)
              setTermName(termNameData.data.terminal)
              setChecks(data.data)
              setInitCheck(termNameData.data.terminal.status)
              setCheckEnable(termNameData.data.terminal.status)
            }
          })
        }
    }
    start()
  }, [])


  const delTerminal = () => {
    let reqBody = {"name": termName.name,
    "status": 'DELETED',
    "verificationContent": JSON.stringify(stateCheck) 
   }
   setError("Terminal has been deleted.")
   return submitPut(reqBody)
  }
  
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
        console.log(result)
      //  setAppoitnment(result.data)
         setError("")
        } else if (result.status === 400) {
         console.log(result)
         setError("Error submitting data to the server.")
       }

       setTerminal(stateCheck)
  }

const configStr = (str) => {
let parsedStr = str ?  "Required" : "Not Required"
return parsedStr
}

const submitPut = async (reqBody) => {
    let result = await authContext.API.getIndivTerminal(termName._id, undefined, reqBody);
      if (result.status === 200){
        console.log(result)
      //  setAppoitnment(result.data)
         setError("")
        } else if (result.status === 400) {
         console.log(result)
         setError("Error submitting data to the server.")
       }
    }

    const handleCheckEnable = (event) => {
      console.log("test click")
      console.log(event.target.value)
       setCheckEnable(event.target.value);
       console.log(checkEnable)
    }

    const updateStatus = async () => {
      console.log("in func")
      if (checkEnable === initCheck ){
        console.log('fail')
        return
      }
      let reqBody = {"name": termName.name,
      "status": checkEnable,
      "verificationContent": JSON.stringify(stateCheck) 
     }

     submitPut(reqBody)
    }


//terminal popup
const EnableTerminal = () => {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <FormControl component="fieldset">
      <FormLabel component="legend">Status</FormLabel>
      <br/>
      <RadioGroup aria-label="status" name="status" onChange={handleCheckEnable} aria-label="position" row>
        <FormControlLabel value="ENABLED" control={<Radio />} label="Enable" labelPlacement="top" />
        <FormControlLabel value="DISABLED" control={<Radio />} label="Disable" labelPlacement="top" />
      </RadioGroup>
      <Button onClick={updateStatus} fullWidth variant="contained"color="primary" > Confirm </Button>
    </FormControl>
        </div>
      </Container>
    </div>
  );     
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
     {formRow("Phone Number:", configStr(terminal.phoneNumber), 'phoneNumber' )}
     </Grid>
     <Grid container item xs={12} spacing={3}>
     {formRow("Carecard Number:", configStr(terminal.careCardNumber), 'careCardNumber' )}
     </Grid>
     <Grid container item xs={12} spacing={3}>
     {formRow("Last 4 Digits of Phone Number:", configStr(terminal.phoneNumberLast4), 'phoneNumberLast4')}
     </Grid>
    </Grid>
   </CardContent>
  
   <CardActions style={{display: 'block', width: '50%'}}>   
  
     <Button size="small" variant="contained" color="primary" style={{marginTop:"2%"}} onClick={submitComfirm}>Comfirm</Button>
    </CardActions>
    </Card>
  
    <Button variant="contained" onClick={delTerminal} style={{marginTop: '3%', marginLeft: '4%', marginBottom: '1%', backgroundColor: 'blue', color: 'white'}}> Delete Terminal </Button>
    <Link to={`${path.substring(0, path.length - 4)}`} style={{textDecoration: 'none', color: 'inherit'}}> <Button variant="contained" style={{marginTop: '2%', backgroundColor: 'black', color: 'white'}}> Return to list </Button> </Link>
    </div>)
  }

    return(
      <div>
        {error !== null ? error : ""}
        {termName !== null && termName !== undefined ? <h3>{termName.name}</h3> : ""}
        {terminal !== null && terminal !== undefined ? 
        <div> 
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
         : ""}
      </div>
    ) 
  }