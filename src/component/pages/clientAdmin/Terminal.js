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
          setError("Error grabbing data from the server.")
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
            }
          })
        }
    }
    start()
  }, [])


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

  const handleSwitch = (event) => {
   let keyType = event.target.value
     setStateCheck(prevState => ({
   ...prevState,
    [keyType]: event.target.checked
    }));
  };
  
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
  
  // {firstName: true, lastName: true, phoneNumber: false, careCardNumber: false, phoneNumberLast4: false, …}
  // careCardLast4: false
  // careCardNumber: false
  // firstName: true
  // lastName: true
  // phoneNumber: false
  // phoneNumberLast4: false
  // __v: 0
  // _id: "5ead1ffdaec9612138f1eede"

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
  
  <Link to={`${path.substring(0, path.length - 4)}`} style={{textDecoration: 'none', color: 'inherit'}}> <Button variant="contained" style={{marginTop: '2%', backgroundColor: 'black', color: 'white'}}> Return to list </Button> </Link>
  </div>)
}

const configStr = (str) => {
let parsedStr = str ?  "Required" : "Not Required"
return parsedStr
}

const enabaleTerminal = () => {
console.log(termName, terminal)
// //clinic: "5ea9186d4a33612928dc0b3e"
// creationDate: "2020-05-02T01:05:38.677Z"
// name: "Terminal 1"
// status: "ENABLED"
// token: "NA"
// verificationContent: "5ead1ffdaec9612138f1eede"

}

const delTerminal = () => {
  let reqBody = {"name": termName.name,
  "status": 'DELETED',
  "verificationContent": JSON.stringify(stateCheck) 
 }
 return submitPut(reqBody)
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

    return(
      <div>
        {error !== null ? error : ""}
        {termName !== null && termName !== undefined ? <h3>{termName.name}</h3> : ""}
        {terminal !== null && terminal !== undefined ? 
        <div> 
   <Button variant="contained" onClick={enabaleTerminal} style={{marginTop: '2%', marginRight: '2%', marginBottom: '1%', backgroundColor: 'blue', color: 'white'}}> Enable/Disable Check-in</Button> 
   <Button variant="contained" onClick={delTerminal} style={{marginTop: '2%', marginBottom: '1%', backgroundColor: 'blue', color: 'white'}}> Delete Terminal </Button>
   {renderTerminalView(terminal)}

        </div> 
         : ""}
      </div>
    ) 
  }