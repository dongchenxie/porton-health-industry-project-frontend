import React from "react";
import AuthContext from "../../../data/AuthContext";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function PasswordReset(userId) {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  const authContext = React.useContext(AuthContext);

  let [password, setPassword] = React.useState("");
  let [password2, setPassword2] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  let [helper, setHelper] = React.useState(null)
  

  const handlePasswordChange2 = (e) => {
    setPassword2(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  let { from } = location.state || { from: { pathname: "/" } };
  let updatePass = async () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    if (password === password2 && password.length >= 6) {
      let result = await authContext.API.resetUserPassword(userId.user, password);
       if (result.status === 200){
        let timer = setInterval(tock, 20);
        const finsihProcess = async () => {
          setHelper("Password change Success");
          await delay(1000);
          clearInterval(timer)
          return history.go()
          }
          let finish = setTimeout(finsihProcess, 800);

       } else if(result.status === 400) {
        console.log(result, "error")
        let timer = setInterval(tock, 30);
  
        const finsihProcess = () => {
          clearInterval(timer)
          return  alert("Server error")
          }
          let finish = setTimeout(finsihProcess, 800);
       }
     } else if (password.length < 6) {
      setHelper("Password must be at least 6 charecters long. Please try again.")
     } else if (password !== password2) {
       setHelper("Passwords do not match, please try again.")
     }

     function tock() {
      setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
     }
   
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {helper ? helper : ""}
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              onChange={handlePasswordChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              id="password2"
              onChange={handlePasswordChange2}
            />
            <Button
              onClick={updatePass}
              fullWidth
              variant="contained"
              color="primary"
            >
              Confirm
            </Button>
          </form>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <CircularProgress variant="determinate" style={{ marginLeft: '4%', marginTop: '3%', marginBottom: '1%', display: 'inline-block'}} value={progress} />
        </div>
      </Container>
    </div>
  );
}