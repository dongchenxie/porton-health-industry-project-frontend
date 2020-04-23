import React from "react";
import AuthContext from "../../../data/AuthContext"
import { BrowserRouter, Link, useRouteMatch } from "react-router-dom";

//material-ui components:
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    },
  });

export default function Users() {
    const classes = useStyles();
    let { url } = useRouteMatch();

    const authContext = React.useContext(AuthContext)
    const [users, setUsers] = React.useState(null);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
      const start = async () => {
        let data = await authContext.API.getUsers()
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
              setUsers(data.data)
            }
          })
        }
      }
      start()
    }, [])

    const renderUsers = (usersArr) => {

        let userList =  usersArr.users.map((user, index) =>  ( 
            <Card className={classes.root} variant="outlined" key={index}>
            <CardContent>
              <Typography variant="h5" component="h2">
                  {user.email}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Account created: {user.date}
              </Typography>
            </CardContent>
            <CardActions>
            <Link to={`${url}/${user._id}`} style={{textDecoration: 'none', color: 'inherit'}}> 
              <Button size="small">Learn More</Button>
            </Link>
            </CardActions>
          </Card>
         ))

         return(<div>{userList}</div>)
    }

    return(
        <div> 
             <h2>User accounts:</h2>      
        <div>
            {error !== null ? error : ""}
            {users !== null && users !== undefined ? renderUsers(users) : ""}
        </div>
       </div>
    ) 
  }