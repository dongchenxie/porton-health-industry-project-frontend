import React from "react";
<<<<<<< HEAD
import ReactDOM from "react-dom";
=======

>>>>>>> master
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
<<<<<<< HEAD
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
=======
>>>>>>> master
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {
  BrowserRouter as Router,
<<<<<<< HEAD
  Switch,
  Route,
  Link,
  Redirect,
=======
  Route,
  Link,
>>>>>>> master
  useHistory,
  useLocation,
} from "react-router-dom";
import AuthContext from "../../data/AuthContext";
import AuthAPI from "../../data/DataAccessService";
<<<<<<< HEAD

=======
>>>>>>> master
const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
<<<<<<< HEAD

export default function CheckIn() {
  const classes = useStyles();

=======
export default function CheckIn() {
  const classes = useStyles();
>>>>>>> master
  let history = useHistory();
  let location = useLocation();
  const authContext = React.useContext(AuthContext);
  let [username, setUsername] = React.useState("");
  const handleTextChange = (e) => {
<<<<<<< HEAD
    console.log(e.target.value);
=======

>>>>>>> master
    setUsername(e.target.value);
  };
  let [password, setPassword] = React.useState("");
  const handlePasswordChange = (e) => {
<<<<<<< HEAD
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  let { from } = location.state || { from: { pathname: "/" } };

  let login = async () => {
    // console.log({username});console.log({password});

    let result = await authContext.API.login(`${username}`, `${password}`);
    
    //testing purpose "results var"
    // let result = await authContext.API.login("xxx@x.com", "password");
    console.log(result);
    if (result.status == 200) {
      
=======

    setPassword(e.target.value);
  };
  let { from } = location.state || { from: { pathname: "/" } };
  let login = async () => {
    let result = await authContext.API.login(`${username}`, `${password}`);
    //testing purpose "results var"
    // let result = await authContext.API.login("xxx@x.com", "password");
    
    if (result.status === 200) {
>>>>>>> master
      localStorage.setItem("token", result.token);
      authContext.setAuthState((prev) => {
        return {
          ...prev,
          isAuthenticated: true,
        };
      });
      history.replace(from);
    } else {
<<<<<<< HEAD
      console.log(result);
    }
  };
  // React.useEffect(()=>{
  //     return ()=>{
  //       if(localStorage.getItem("token")){
  //           console.log("here")
  //       console.log("found token in localStorage")
  //       authContext.setAuthState((prev)=>{
  //         return {...prev, token:localStorage.getItem("token"),isAuthenticated:true}
  //       })
  //       history.replace(from);
  //     }}
  //   },[authContext,history,from])

=======
      if (result.status === 400) {
        // alert("Issue with you Username or Password");
        //Error alerts located in App.js
        console.log(result & "Issue with username or password");
      }else{
        console.log(result);
      }
      
    }







  };


  
>>>>>>> master
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
<<<<<<< HEAD

=======
>>>>>>> master
          <form
            className={classes.form}
              noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleTextChange}
            />
<<<<<<< HEAD

=======
>>>>>>> master
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
<<<<<<< HEAD

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
=======
>>>>>>> master
            <Button
              onClick={login}
              //   type="submit"
              fullWidth
              variant="contained"
              color="primary"
              // className={classes.submit}
            >
              Sign In
            </Button>
<<<<<<< HEAD
            {/* <button onClick={login}>test Log in with preset account</button> */}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
=======
            <Grid container>
              <Grid item>
                {/* <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
>>>>>>> master
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
<<<<<<< HEAD

=======
>>>>>>> master
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Porton Health
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}