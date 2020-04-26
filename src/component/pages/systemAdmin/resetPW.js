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
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

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

  let [password2, setPassword2] = React.useState("");
  const handlePasswordChange2 = (e) => {
    setPassword2(e.target.value);
  };

  let [password, setPassword] = React.useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  let { from } = location.state || { from: { pathname: "/" } };
  let login = async () => {
    //not sure of following line of code
    let result = await authContext.API.putPasswordReset(
      `${password}`
    );

    if (password == password2) {
      alert("Password change Success");
    } else {
      alert("Password Failed please check inputs");
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
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
              type="password2"
              id="password2"
              onChange={handlePasswordChange2}
            />

            <Button
              onClick={login}
              fullWidth
              variant="contained"
              color="primary"
            >
              Confirm
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
