import React from "react";
import AuthContext from "../../../data/AuthContext"

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
    const authContext = React.useContext(AuthContext)
    const [users, setUsers] = React.useState(null);

    React.useEffect(() => {
      const start = async () => {
        let data = await authContext.API.getUsers()
        setUsers(data.data)
      }
      start()
    }, [])

    //example data:
     // date: "2020-04-11T01:51:55.596Z"
     // email: "donana@donana.com"
     // isEnabled: false
     // name: "donana"
     // _id: "5e9122c85ce2627044323a7d"

    const renderUsers = (usersArr) => {
        console.log("it works", usersArr.users)
        let userList =  usersArr.users.map(user =>  ( 
            <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                  {user.email}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Account created: {user.date}
              </Typography>
              <Typography variant="body2" component="p">
               {user.isEnabled ? "Clinic status currently open.": "Clinic status currently closed." }
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
         ))

         return(<div>{userList}</div>)
    }

    return(
        <div> 
         <h2>User accounts:</h2>      
        <div>
            {users !== null ? renderUsers(users) : ""}
        </div>
       </div>
    ) 
  }