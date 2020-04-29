import React from "react";
import AuthContext from "../../../data/AuthContext"
import { useLocation, useRouteMatch, Link } from 'react-router-dom';

//material-ui components:
import { makeStyles } from '@material-ui/core/styles';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';

import PasswordResetPage from './resetPW';

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


export default function UserDetail() {
    const classes = useStyles();
    let { path } = useRouteMatch();
    let location = useLocation();

    const authContext = React.useContext(AuthContext)
    const [user, setUser] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [enabled, setEnable] = React.useState(null);
    const [enableMessage, setEnableMessage] = React.useState(null);
    const [checkedVal, setCheckedVal] = React.useState(null);


    React.useEffect(() => {
      const start = async () => {
        let data = await authContext.API.getIndivUser(location.pathname.toString().split("/")[3])
        if (data === undefined){
          console.log("error")
          setError("Error grabbing data from the server.")
        } else if (data.data === undefined){
          console.log("error")
          setError("Error grabbing data from the server.")
        } else {
          authContext.API.readToken(authContext.authState).then(function(result){
            if (result.role !== 'SYSTEM_ADMIN'){
             return setError("404. Please try again.")
            } else {

              //this can be removed when endpoint is implemented for clinic.
              data.data.clinic = [{isCheckInEnabled: true, name: "West Vancouver Clinic"}]
              grabClinics()
              setUser(data.data)
              setEnable(data.data.isEnabled)
              setCheckedVal(data.data.isEnabled)
              data.data.isEnabled ? setEnableMessage("Enabled") : setEnableMessage("Not Enabled.")
            }
          })
        }
      }
      start()
    }, [])

    const grabClinics = async () => {
      //user id 5e990ebba93b163294ef066d
      let result = await authContext.API.getClinics();
       if (result.status === 200){
          console.log(result)
          return result
        }  else if(result.status === 400) {
        console.log(result, error)
        setError("Problem with server.")
        return result
       }
    }

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

    //dropdown menu for clinics
    const renderClinicDropdown = (clinics) => {
       let clinicList = (
       <div>test</div>
      //  clinics.map(clinic => {
      //    let clinicStatus = clinic.isCheckInEnabled ? "Open" : "Closed"
      //    return(<div><Grid container item xs={12} spacing={3}>
      //     {formRow("Clinic Name:", clinic.name)}
      //     </Grid>
      //     <Grid container item xs={12} spacing={3}>
      //     {formRow("Clinic Status:", clinicStatus )}
      //     </Grid></div>)
       )

      return(<div style={{width: '80%'}}>
    <ExpansionPanel>
        <ExpansionPanelSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>User Clinics:</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          <Grid container spacing={1}>
          {clinicList}
          </Grid>  
        </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </div>)
    }

    //toggle enable/diable
    let updateAPI = async () => {
      let result = await authContext.API.updateUserEnabled(user['_id'], enabled);
       if (result.status === 200){
        console.log(enabled)
        if (enabled){ 
          setEnable(!enabled)
          setCheckedVal(!checkedVal)
          setEnableMessage("Enabled")
          return result
        } else {
          setEnable(!enabled)
          setCheckedVal(!checkedVal)
          setEnableMessage("Not Enabled.")
          return result
        }
       } else if(result.status === 400) {
        console.log(result, error)
        setError("Problem with server.")
        return result
       }
      };

      //render grid info
    const renderUser = () => {
         return( 
         <div> <Card className={classes.root} variant="outlined">
         <CardContent>
         <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
        {formRow("First Name:", user.firstName)}
        </Grid>
        <Grid container item xs={12} spacing={3}>
        {formRow("Last Name:", user.lastName)}
        </Grid>
        <Grid container item xs={12} spacing={3}>
        {formRow("Email:", user.email)}
        </Grid>
        <Grid container item xs={12} spacing={3}>
        {formRow("Creation Date:", user.date.split('T')[0])}
        </Grid>
        <Grid container item xs={12} spacing={3}>
        {formRow("Role:", user.role)}
        </Grid>
        <br />
        {user.role === 'CLIENT_ADMIN' ?  
        <Grid container item xs={12} spacing={3}>
        {formRow("Status:", enableMessage)}
        </Grid> : <br /> }
        {user.role === 'CLIENT_ADMIN' ?  
        <Grid container item xs={12} spacing={3}>
        {formRow("Clinics:", renderClinicDropdown())}
        </Grid> : <br /> }
      </Grid>
      </CardContent>

      <CardActions style={{display: 'inline'}}>
      <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button variant="contained" color="primary" style={{marginLeft: '2%'}} {...bindTrigger(popupState)}>
            Reset Password
          </Button>
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
            <PasswordResetPage user={user["_id"]} />
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>

     {/* to implement: */}
     {/*///////////////*/}
     <Typography style={{marginLeft: '2%', marginTop: '2%'}}> 
      Enable/Disable Account: 

       <Switch
        checked={checkedVal}
        onChange={updateAPI}
        color="primary"
        name="enabled"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      </Typography>

         </CardActions>
       </Card>
       <Link to={`${path.substring(0, path.length - 4)}`} style={{textDecoration: 'none', color: 'inherit'}}> <Button variant="contained" style={{marginTop: '2%', backgroundColor: 'black', color: 'white'}}> Return to list </Button> </Link>
       </div>)
    }

    return(<div>
        {error !== null ? error : ""}
        {user !== null && user !== undefined ? renderUser(user) : ""}
       </div>)
}