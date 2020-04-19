import React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const state = {
  pages: [<Welcome />, <SelectAppTime />, <AuthenticateUser />, <AppDetails />],
  idx: 0,
};


export default function CheckIn() {
  const [paged, setPaged] = useState(state.pages[state.idx]);


  return (
    <div
      onClick={() =>
        setPaged(state.pages[(state.idx++)%state.pages.length]) & console.log(state.idx)
      }
    >
      {paged}

      <Box mt={8}>
        <Copyright />
      </Box>
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

function Welcome() {
  const classes = useStyles();
  return (
    <div>
      <Grid>
        <Typography
          component="h1"
          variant="h1"
          color="inherit"
          align="center"
          noWrap
        >
          <br />
          <br />
          <br />
          <br />
          WELCOME
          <br />
          <br />
        </Typography>
      </Grid>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            {/* <Link href="/admin/login"> */}
            <ThemeProvider theme={theme}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                // onClick={() => state.idx++& console.log(state.idx)}
              >
                <Typography component="h1" variant="h2">
                  Check-In
                </Typography>
              </Button>
            </ThemeProvider>
            {/* </Link> */}
            <Grid container>
              <Grid item></Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

function SelectAppTime() {
  return (
    <div>
      <h1>
      <br />
      <br />
      <br />
      <br />
      </h1>

      <Typography variant="body2" color="textSecondary" align="center">
        Select your appointnment
      </Typography>
    </div>
  );
}

function AuthenticateUser() {
  return (
    <div>
      <h1>
      <br />
      <br />
      <br />
      <br />
      </h1>
      <Typography variant="body2" color="textSecondary" align="center">
        Authentication Test
      </Typography>
    </div>
  );
}

function AppDetails() {
  return (
    <div>
      <h1>
      <br />
      <br />
      <br />
      <br />
      </h1>
      <Typography variant="body2" color="textSecondary" align="center">
        Appointment Details ie. Address Checking
      </Typography>
    </div>
  );
}