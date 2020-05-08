import React from "react";
import Logo from "../img/logo2.png"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams,
  useRouteMatch
} from "react-router-dom";

//material-ui components: 
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

//custom components:
import AuthContext from "../data/AuthContext"
import PrivateRoute from '../component/middleware/PrivateRoute';
import NotFoundPage from '../component/pages/NotFoundPage';
import AuthAPI from "../data/AuthContext"
import dataAccessService from '../App'
// import LoginWidget from '../component/widgets/loginWidget'
// import RegisterWidget from '../component/widgets/registerWidget'

//sys. admin components:
import UserList from '../component/pages/systemAdmin/UserList';
import UserDetail from '../component/pages/systemAdmin/User';
import CreateAccount from '../component/pages/systemAdmin/CreateAccount'

//client admin components:
import TerminalList from '../component/pages/clientAdmin/TerminalList'
import Terminal from '../component/pages/clientAdmin/Terminal'
import AppointmentList from '../component/pages/clientAdmin/AppointmentList'
import Appointment from '../component/pages/clientAdmin/Appointment'

//shared:
import Copywrite from "../component/pages/shared/Copywrite";

//App styles:
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    marginRight: theme.spacing(2),
  },
  flex: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


export default function AdminRouter(props) {
  //get router path and url
  let { path, url } = useRouteMatch();
  let history = useHistory()


  const { container } = props;
  const theme = useTheme();

  //material ui build-in style hook
  const classes = useStyles();

  //state indicate if the user is authenticated
  const [auth, setAuth] = React.useState(true);
  const authContext = React.useContext(AuthContext)
  const [role, setRoll] = React.useState(null);
  const [username, setUserName] = React.useState(null);


  //state indicate if the profile meun is opened
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const open = Boolean(anchorEl);
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      authContext.setAuthState({
        isAuthenticated: true,
        token: localStorage.getItem('token')
      })
      authContext.API.readToken(authContext.authState).then(function(result){
         setRoll(result.role)
        setUserName(`${result.firstName} ${result.lastName}`)
      })
    } else {
      setRoll(false)
      authContext.setAuthState({
        isAuthenticated: false,
        token: "123123"
      })
    }
    
  }, []);
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

  const handleSignOut = () => {
    authContext.API.signOut()
    handleProfileClose()
    history.push("/login")
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  //sidebar nav component:
  const drawer = (
    <div>
      <div style={{marginTop: '6%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '-20%'}}> 
      <img style={{width: '78%', height: '22%'}} src={Logo}></img>
      </div>
      <div className={classes.toolbar} />
      { role === "CLIENT_ADMIN" ? 
      <List>
        <Divider />
       <Link to={`${url}/appointments`} style={{textDecoration: 'none', color: 'inherit'}}>  
          <ListItem button>
            <ListItemText primary="Appointments" />
          </ListItem >
       </Link> 
       <Link to={`${url}/terminals`} style={{textDecoration: 'none', color: 'inherit'}}>  
          <ListItem button>
            <ListItemText primary="Check-in Terminals" />
          </ListItem >
       </Link> 
      </List>
    : 
    <List>
      <Divider />
      <Link to={`${url}/createAccount`} style={{textDecoration: 'none', color: 'inherit'}}> 
        <ListItem button>
          <ListItemText primary="Create Account" />
        </ListItem >
      </Link> 
     <Link to={`${url}/users`} style={{textDecoration: 'none', color: 'inherit'}}>  
      <ListItem button>
        <ListItemText primary="Account List" />
      </ListItem >
    </Link> 
    </List> 
    } 
      <Divider />
     <List>
      <Link to={`${url}`} style={{textDecoration: 'none', color: 'inherit'}}>   
        <ListItem button>
          <ListItemText primary="Home" />
        </ListItem >
      </Link>

        <ListItem button onClick={handleSignOut}>
          <ListItemText primary="Sign Out" />
        </ListItem >
      </List>
    </div>
  );

  return (
    <Router>
      { role === false ?
        <div> <span>Error: you do not have permission to view this feature. Please log in.</span>
        <Link to={`/login`} style={{textDecoration: 'none', color: 'inherit'}} onClick={handleSignOut}>
        Return.
        </Link>  
      </div> 
      : 
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              Porton Heath Admin Panel
          </Typography>
          <Typography variant="h6" noWrap className={classes.title}>
              Hello {username}
          </Typography>
            {authContext.authState.isAuthenticated ? (
              <div>
                
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
                </Menu>
              </div>
            ) : (
                <div className={classes.flex}>
                  {/* <LoginWidget className={classes.btn} auth={authContext.authState.isAuthenticated}/>
                <RegisterWidget className={classes.btn}/> */}
                </div>
              )}
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div>
            {/* <FormGroup>
        <FormControlLabel
          control={<SwitchComponent checked={authContext.authState.isAuthenticated} onChange={handleLoginChange} aria-label="login switch" />}
          label={authContext.authState.isAuthenticated ? 'Logout' : 'Login'}
        />
      </FormGroup> */}

            <Switch>
              <Route exact path={path}>
                <Home />
              </Route>
              <PrivateRoute path={`${path}/users/:id`}>
                <UserDetail />
              </PrivateRoute>
              <PrivateRoute path={`${path}/users`}>
                <UserList />
              </PrivateRoute>
              <PrivateRoute path={`${path}/createAccount`}>
                <CreateAccount />
              </PrivateRoute>
              <PrivateRoute path={`${path}/terminals/:id`}>
                <Terminal/>
              </PrivateRoute>
              <PrivateRoute path={`${path}/terminals`}>
                <TerminalList />
              </PrivateRoute>
              <PrivateRoute path={`${path}/appointments/:id`}>
                <Appointment />
              </PrivateRoute>
              <PrivateRoute path={`${path}/appointments`}>
                <AppointmentList />
              </PrivateRoute>
              <Route path="*">
                <NotFoundPage />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
      }
    </Router>
  );
}


function Home() {
  return (
  <div>
    <h2>Home: </h2>
    <p>Welcome to the Porton Health administrator panel.</p>
    <div style={{marginTop: '4%'}}>
       <Copywrite /> 
    </div>
  </div>
  );
}