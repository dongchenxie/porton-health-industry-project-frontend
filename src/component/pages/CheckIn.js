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

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

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
        setPaged(state.pages[state.idx++ % state.pages.length]) &
        console.log(state.idx)
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
  const tiers = [
    {
      // title: "Free",
      // price: "0",
      // description: ["Description"],
      buttonText: "1:00 PM",
      buttonVariant: "contained",
    },
    {
      buttonText: "1:30 PM",
      buttonVariant: "outlined",
    },
    {
      buttonText: "2:00 PM",
      buttonVariant: "contained",
    },
    {
      buttonText: "2:30 PM",
      buttonVariant: "outlined",
    },
    {
      buttonText: "3:00 PM",
      buttonVariant: "contained",
    },
    {
      buttonText: "3:30 PM",
      buttonVariant: "outlined",
    },
  ];
  return (
    <div>
      <h1>
        <br />
        <br />
        <br />
        <br />
      </h1>

      {/* Hero unit */}
      <Container>
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={8}>
            <Card>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Please Select Appointment Time
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Current Time
                <br />
                12:00 AM
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              {/* <Card>
                <CardHeader
                title={tier.title}
                subheader={tier.subheader}
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /mo
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul> */}
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    color="primary"
                  >
                    <Typography component="h1" variant="h2">
                    {tier.buttonText}
                </Typography>
                    
                  </Button>
                {/* </CardContent>
                <CardActions></CardActions>
              </Card> */}
            </Grid>
          ))}
        </Grid>
      </Container>
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
