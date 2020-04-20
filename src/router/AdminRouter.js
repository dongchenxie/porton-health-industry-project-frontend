import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import AuthContext from "../data/AuthContext"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SwitchComponent from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
 import LoginWidget from '../component/widgets/loginWidget'
 import RegisterWidget from '../component/widgets/registerWidget'
import PrivateRoute from '../component/middleware/PrivateRoute'
import Register from '../component/pages/Register'
import LoginPage from '../component/pages/Login'
import NotFoundPage from '../component/pages/NotFoundPage'
import AuthAPI from "../data/AuthContext"

export default function App() {
  //get router path and url
  let { path, url } = useRouteMatch();
  //material ui build-in style hook
  const classes = useStyles();
  //state indicate if the user is authenticated
  const [auth, setAuth] = React.useState(true);
  const authContext =React.useContext(AuthContext)
  //state indicate if the profile meun is opened
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  React.useEffect(() => {
    if(localStorage.getItem('token')){
      authContext.setAuthState({
        isAuthenticated:true,
        token:localStorage.getItem('token')
       
      })
    }else{
      console.log("here")
      authContext.setAuthState({
        isAuthenticated:false,
        token:"123123"
      })
    }
    console.log(authContext.authState.token)
    console.log(authContext.authState.isAuthenticated)
  },[]);
  // const handleLoginChange = (event) => {
  //   authContext.setAuthState((prev)=>{
  //     return {...prev,isAuthenticated:event.target.checked}});
  // };

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () =>{
      authContext.API.signOut()
      handleProfileClose()
  }
  return (
    <Router>
        
         <div className={classes.root}>
      
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Porton Heath Admin Panel
          </Typography>
          {authContext.authState.isAuthenticated ?(
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleProfileClose}
              >
                <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
              </Menu>
            </div>
          ):(
            <div className={classes.flex}>
                {/* <LoginWidget className={classes.btn} auth={authContext.authState.isAuthenticated}/>
                <RegisterWidget className={classes.btn}/> */}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
     
      <div>
        <nav>
          <ul>
            <li>
              <Link to={`${url}/`}>Home(not secure)</Link>
            </li>
            <li>
              <Link to={`${url}/register`}>Register(secure)</Link>
            </li>
            
            <li>
              <Link to={`${url}/about`}>About(secure)</Link>
            </li>
            <li>
              <Link to={`${url}/users`}>Users(secure)</Link>
            </li>
          </ul>
        </nav>
        {/* <FormGroup>
        <FormControlLabel
          control={<SwitchComponent checked={authContext.authState.isAuthenticated} onChange={handleLoginChange} aria-label="login switch" />}
          label={authContext.authState.isAuthenticated ? 'Logout' : 'Login'}
        />
      </FormGroup> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        
        <Switch>
          <Route exact path={path}>
            <Home />
          </Route>
          <PrivateRoute path={`${path}/about`}>
            <About />
          </PrivateRoute>
          <PrivateRoute path={`${path}/register`}>
            <Register />
          </PrivateRoute>
          <Route path={`${path}/login`}>
            <LoginPage />
          </Route>
          <PrivateRoute path={`${path}/users`}>
            <Users />
          </PrivateRoute>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    btn: {
        marginRight: theme.spacing(2),
    },
    flex:{
        display: "flex",
    }
  }));


function Home() {
  return <h2>Home (not secure data)</h2>;
}

function About() {
  return <h2>About (secure data)</h2>;
}

  // function Register() {
  //   return <h2>Register (secure data)</h2>;
  // }

function Users() {
  const authContext =React.useContext(AuthContext)
  React.useEffect(() =>{
    const start= async()=>{
      console.log(await authContext.API.getSecureData())
    }
    start()
  },[])
  return <h2>Users (secure data)</h2>;
}
