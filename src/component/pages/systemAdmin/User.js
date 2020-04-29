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


import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Popover from '@material-ui/core/Popover';

import Box from '@material-ui/core/Box';
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
              setUser(data.data)
            }
          })
        }
      }
      start()
    }, [])

    function formRow(label, data) {
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
      </Grid>
        <Typography variant="body2" component="p" style={{marginTop: '2%'}}>
                {user.isEnabled ? "Clinic status currently open.": "Clinic status currently closed." }
       </Typography>
           </CardContent>

           <CardActions>
      <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
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

    <Button variant="contained" color="primary" style={{ marginLeft: '8%'}} >
          Enable/Disable Account
    </Button>

         </CardActions>
       </Card>
       <Link to={`${path.substring(0, path.length - 4)}`} style={{textDecoration: 'none', color: 'inherit'}}> <Button variant="contained" color="black" style={{marginTop: '2%', backgroundColor: 'black', color: 'white'}}> Return to list </Button> </Link>
       </div>)
    }

    return(<div>
        {error !== null ? error : ""}
        {user !== null && user !== undefined ? renderUser(user) : ""}
       </div>)
}