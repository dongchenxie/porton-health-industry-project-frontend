import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

//material-ui components: 
import AuthContext from "../data/AuthContext"
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MailIcon from '@material-ui/icons/Mail';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

//custom components:
import PrivateRoute from '../component/middleware/PrivateRoute'
import LoginPage from '../component/pages/Login'
import NotFoundPage from '../component/pages/NotFoundPage'
import AuthAPI from "../data/AuthContext"
// import LoginWidget from '../component/widgets/loginWidget'
// import RegisterWidget from '../component/widgets/registerWidget'


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

  const { container } = props;
  const theme = useTheme();

  //material ui build-in style hook
  const classes = useStyles();

  //state indicate if the user is authenticated
  const [auth, setAuth] = React.useState(true);
  const authContext = React.useContext(AuthContext)

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
    } else {
      console.log("here")
      authContext.setAuthState({
        isAuthenticated: false,
        token: "123123"
      })
    }
    console.log(authContext.authState.token)
    console.log(authContext.authState.isAuthenticated)
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
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  //sidebar nav component:
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
      <Divider />
          <ListItem button>
            <ListItemText primary="Create Account" />
          </ListItem >
        
        <Link to={`${url}/users`}>  
          <ListItem button>
            <ListItemText primary="Account List" />
          </ListItem >
        </Link> 
      </List>
      <Divider />

     <List>
      <Link to={`${url}/`}>   
        <ListItem button>
          <ListItemText primary="Home" />
        </ListItem >
      </Link>

      <Link to={`${url}/about`}>
        <ListItem button>
          <ListItemText primary="About" />
        </ListItem >
      </Link>  
      
        <ListItem button onClick={handleProfileClose}>
          <ListItemText primary="Profile" />
        </ListItem >

        <ListItem button onClick={handleSignOut}>
          <ListItemText primary="Sign Out" />
        </ListItem >
      </List>
    </div>
  );

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
          Porton Heath Admin Panel
          </Typography> */}
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              Porton Heath Admin Panel
          </Typography>
            {authContext.authState.isAuthenticated ? (
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

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

            <Switch>
              <Route exact path={path}>
                <Home />
              </Route>
              <PrivateRoute path={`${path}/about`}>
                <About />
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
        </main>
      </div>
    </Router>
  );
}


//child components, renders results in the above <main className={classes.content}> tag

function Home() {
  return <h2>Home (not secure data)</h2>;
}


function About() {
  return <h2>About (secure data)</h2>;
}


function Users() {
  const authContext = React.useContext(AuthContext)
  React.useEffect(() => {
    const start = async () => {
      console.log(await authContext.API.getSecureData())
    }
    start()
  }, [])
  return <h2>Users (secure data)</h2>;
}