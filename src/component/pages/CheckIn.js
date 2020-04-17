import React from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

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

export default function CheckIn() {
  const classes = useStyles();

  return (
    <div>
      <Grid>
        <Typography
          component="h2"
          variant="h2"
          color="inherit"
          align="center"
          noWrap
        >
          <br />
          <br />
          <br />
          <br />
          <br />
          WELCOME
          <br />
          <br />
          <br />
        </Typography>
      </Grid>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          
          <form className={classes.form} noValidate>
          <Link to={`https://www.googel.ca`}>
            <Button fullWidth variant="contained" color="primary">
            <Typography component="h1" variant="h5">
            Check-In
          </Typography>

            </Button>
            </Link>
            <Grid container>

              <Grid item>
                
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