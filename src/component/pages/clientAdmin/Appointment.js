import React from "react";
import AuthContext from "../../../data/AuthContext"
import { useLocation, useRouteMatch, Link } from 'react-router-dom';

//material-ui components:
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


export default function Appointment() {
  const authContext = React.useContext(AuthContext)
  const classes = useStyles();
  let location = useLocation();
  let { path } = useRouteMatch();
  
  const [error, setError] = React.useState(null);
  const [appoitnment, setAppoitnment] = React.useState(null);
  const [comment, setComment] = React.useState(null);

  React.useEffect(() => {
    const start = async () => {
      let data = await authContext.API.getIndivAppointment(location.pathname.toString().split("/")[3]) 
      console.log(data)
     // let data = {patient: "john smith", appointmentTime: '2020-04-11T03:36:57.292Z', doctorName: 'john doe', status: 'Pending', comments: "", reason: "Flu", _id: 1}
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
            setAppoitnment(data.data)
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

  const submitComment = (e) => {
    //PUT to appointment....
    appoitnment.comments = comment
    console.log(appoitnment)
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const renderAppointment = () => {
    return( 
    <div> <Card className={classes.root} variant="outlined">
    <CardContent>
    <Grid container spacing={1}>
   <Grid container item xs={12} spacing={3}>
   {formRow("Patient Name:", appoitnment.patient)}
   </Grid>
   <Grid container item xs={12} spacing={3}>
   {formRow("Appointment Time:", appoitnment.appointmentTime.split('T')[0])}
   </Grid>
   <Grid container item xs={12} spacing={3}>
   {formRow("Doctor:", appoitnment.doctorName)}
   </Grid>
   <Grid container item xs={12} spacing={3}>
   {formRow("Reason For Visit:", appoitnment.reason)}
   </Grid>
   {appoitnment.comments ? <Grid container item xs={12} spacing={3}>
   {formRow("Comments:", appoitnment.comment)}
   </Grid> : ""}
   <Grid container item xs={12} spacing={3}>
   {formRow("Appointment Status:", appoitnment.status)}
   </Grid>
  </Grid>
 </CardContent>

 <CardActions style={{display: 'block', width: '50%'}}>   
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
   <Button size="small" variant="contained" color="primary" style={{marginTop:"2%"}} onClick={submitComment}>Submit</Button>
  </CardActions>
  </Card>
  
  <Link to={`${path.substring(0, path.length - 4)}`} style={{textDecoration: 'none', color: 'inherit'}}> <Button variant="contained" style={{marginTop: '2%', backgroundColor: 'black', color: 'white'}}> Return to list </Button> </Link>
  </div>)
}

    return(
      <div>
        {error !== null ? error : "" }
        {appoitnment !== null && appoitnment !== undefined ? renderAppointment(appoitnment) : ""}
      </div>
    ) 
  }