import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";

import AuthContext from "../../data/AuthContext";
import AuthAPI from "../../data/DataAccessService";

//material-ui components: 
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

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


export default function TerminalLogin(props) {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  const authContext = React.useContext(AuthContext);
  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleTextChange = (e) => {
    setUsername(e.target.value);
  };
  let [password, setPassword] = React.useState("");
  const handlePasswordChange = (e) => {

    setPassword(e.target.value);
  };
  let { from } = location.state || { from: { pathname: "/" } };
  React.useEffect(()=>{
    if(  localStorage.getItem("terminal-token")){
      props.setIsAuthed(true)
    }
  },[])
  const login = async () => {
    console.log("terminal login page!")
    const result=await authContext.API.TerminalLogin(password)
    console.log(result)
    if(result.status === 200){
      localStorage.setItem("terminal-token", result.token)
      props.setIsAuthed(true)
      
    }else{
      console.log(result)
      alert(result.error.response)
    }
     
     
    // let result = await authContext.API.login(`${username}`, `${password}`);
    // //testing purpose "results var"
    // // let result = await authContext.API.login("xxx@x.com", "password");
    // if (result.status === 200) {
    //    localStorage.setItem("token", result.token);
    //    authContext.setAuthState((prev) => {
    //      return {
    //        ...prev,
    //        isAuthenticated: true,
    //      };
    //    })
    //   history.push("/admin");
    // } else {
    //   if (result.status === 400) {
    //     // alert("Issue with you Username or Password");
    //     //Error alerts located in App.js
    //     console.log(result & "Issue with username or password");
    //     setError("Incorrect user name or password. Please try again.")
    //   } else {
    //     setError("Incorrect user name or password. Please try again.")
    //     console.log(result);
    //   }
    // }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in to terminal
          </Typography>
          <form
            className={classes.form}
              noValidate
          >
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="token"
              label="Token"
              type="password"
              id="password"
              autoComplete="token"
              onChange={handlePasswordChange}
            />
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
            <Grid container>
              <Grid item>
                {/* <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
              </Grid>
            </Grid>
          </form>
          {error ? error : ""}
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

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