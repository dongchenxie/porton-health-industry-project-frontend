import React from "react";
import AuthContext from "../../../data/AuthContext"
import { useLocation } from 'react-router';

//material-ui components:
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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

export default function UserDetail() {
    const classes = useStyles();
    let location = useLocation();

    const authContext = React.useContext(AuthContext)
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
      const start = async () => {
        let data = await authContext.API.getIndivUser(location.pathname.toString().split("/")[3])
        setUser(data.data)
      }
      start()
    }, [])

    const renderUser = (user) => {
         return(<div><Card className={classes.root} variant="outlined">
         <CardContent>
           <Typography variant="h5" component="h2">
               {user.name}
           </Typography>
           <br />
           <Typography variant="h5" component="h2">
               {user.email}
           </Typography>
           <br />
           <Typography className={classes.pos} color="textSecondary">
             Account created: {user.date}
           </Typography>
           <Typography variant="body2" component="p">
                {user.isEnabled ? "Clinic status currently open.": "Clinic status currently closed." }
           </Typography>
         </CardContent>

       </Card></div>)
    }

    return(<div>{user !== null ? renderUser(user) : ""}</div>)
}