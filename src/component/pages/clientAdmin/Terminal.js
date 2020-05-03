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


export default function Terminal() {
  const authContext = React.useContext(AuthContext)
  const classes = useStyles();

  const [error, setError] = React.useState(null);
  const [terminal, setTerminal] = React.useState(null);
   let { path } = useRouteMatch();



  React.useEffect(() => {
    const start = async () => {
      let data = {firstName: 'not req', lastName: 'not req', phoneNumber: 'not req', carecardNumber: 'not req', phoneNumberLat4: 'not req', carecardLast4: 'not req'}
  
        if (data === undefined){
          console.log("error")
          setError("Error grabbing data from the server.")
        } else if (data === undefined){
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
              setTerminal(data)
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

  const renderTerminalView = () => {
    return( 
    <div> <Card className={classes.root} variant="outlined">
    <CardContent>
    <Grid container spacing={1}>
   <Grid container item xs={12} spacing={3}>
   {formRow("First Name:", terminal.firstName)}
   </Grid>
   <Grid container item xs={12} spacing={3}>
   {formRow("Last Name:", terminal.lastName)}
   </Grid>
   <Grid container item xs={12} spacing={3}>
   {formRow("Phone Number:", terminal.phoneNumber)}
   </Grid>
   <Grid container item xs={12} spacing={3}>
   {formRow("Carecard Number:", terminal.carecardNumber)}
   </Grid>
   <Grid container item xs={12} spacing={3}>
   {formRow("Last 4 Digits of Phone Number:", terminal.phoneNumberLat4)}
   </Grid>
     <Grid container item xs={12} spacing={3}>
     {formRow("Last 4 Digits of Carecard Number:", terminal.carecardLast4)}
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

const submitComfirm = () => {
  console.log("hello world")
}


    return(
      <div>
        {error !== null ? error : ""}
        {terminal !== null && terminal !== undefined ? renderTerminalView(terminal) : ""}
      </div>
    ) 
  }