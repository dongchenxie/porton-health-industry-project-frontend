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
 const [checked, setChecked] = React.useState(null);

  React.useEffect(() => {
    const start = async () => {
     // let data = {firstName: 'not req', lastName: 'not req', phoneNumber: 'not req', carecardNumber: 'not req', phoneNumberLat4: 'not req', carecardLast4: 'not req'}
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
              console.log(data)
              console.log(termNameData)
              setTermName(termNameData.data.terminal)
            }
          })
        }
    }
    start()
  }, [])


  const formRow = (label, data, keyType) => {
    //data = bool
    console.log(keyType)
    return (
      <React.Fragment>
        <Grid item xs={4}>
        {label}
        </Grid>
        <Grid item xs={4}>
        {data}
        </Grid>
        <Grid item xs={4}>
        <Switch checked={checked} onChange={handleSwitch} color="primary" name="checkedB" value={'test'} inputProps={{ 'aria-label': 'primary checkbox' }}/>
        </Grid>
        </React.Fragment>
    );
  }

  const handleSwitch = (event) => {
    console.log(event.target.value)
  };
  
  const submitComfirm = () => {
    console.log("hello world")
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
    console.log(terminal)
    return( 
    <div> <Card className={classes.root} variant="outlined">
    <CardContent>
    <Grid container spacing={1}>
   <Grid container item xs={12} spacing={3}>
   {formRow("First Name:", terminal.firstName.toString(), 'firstName')}
   </Grid>
   <Grid container item xs={12} spacing={3}>
   {formRow("Last Name:", terminal.lastName.toString(), 'lastName' )}
   </Grid>
   <Grid container item xs={12} spacing={3}>
   {formRow("Phone Number:", terminal.phoneNumber.toString(), 'phoneNumber' )}
   </Grid>
   <Grid container item xs={12} spacing={3}>
   {formRow("Carecard Number:", terminal.careCardNumber.toString(), 'careCardNumber' )}
   </Grid>
   <Grid container item xs={12} spacing={3}>
   {formRow("Last 4 Digits of Phone Number:", terminal.phoneNumberLast4.toString(), 'phoneNumberLast4')}
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


    return(
      <div>
        {error !== null ? error : ""}
        {termName !== null && termName !== undefined ? <h3>{termName.name}</h3> : ""}
        {terminal !== null && terminal !== undefined ? renderTerminalView(terminal) : ""}
      </div>
    ) 
  }