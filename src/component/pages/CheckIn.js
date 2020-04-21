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
  withStyles,
} from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CareCard1 from "../images/CareCback.png"; // Tell webpack this JS file uses this image
import CareCard2 from "../images/oldCareC.jpg"; // Tell webpack this JS file uses this image

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

const GreenButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: "#5aac5c",
    "&:hover": {
      backgroundColor: "#5aac5c",
    },
  },
}))(Button);

const RedButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
}))(Button);

const state = {
  pages: [<Welcome />, <SelectAppTime />, <AuthenticateUser />, <AppDetails />],
  idx: 0,
};

export default function CheckIn() {
  const [paged, setPaged] = useState(state.pages[state.idx]);

  return (
    <div
      style={{
        backgroundColor: "#ff991d",
        color: "white",
        height: "100vh",
      }}
      onClick={() =>
        setPaged(state.pages[state.idx % state.pages.length]) &
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

            <GreenButton
              variant="contained"
              color="primary"
              className={classes.margin}
              fullWidth
              onClick={() => state.idx++ & console.log(state.idx)}
            >
              <Typography component="h1" variant="h2">
                Check-In
              </Typography>
            </GreenButton>

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
  const timeSlots = [
    {
      id: "timeSlot1",
      buttonText: "1:00 PM",
      buttonVariant: "contained",
    },
    {
      id: "timeSlot2",
      buttonText: "1:30 PM",
      buttonVariant: "outlined",
    },
    {
      id: "timeSlot3",
      buttonText: "2:00 PM",
      buttonVariant: "contained",
    },
    {
      id: "timeSlot4",
      buttonText: "2:30 PM",
      buttonVariant: "outlined",
    },
    {
      id: "timeSlot5",
      buttonText: "3:00 PM",
      buttonVariant: "contained",
    },
    {
      id: "timeSlot6",
      buttonText: "3:30 PM",
      buttonVariant: "outlined",
    },
  ];
  return (
    <div
      style={{
        //gray #ECECEC
        backgroundColor: "white",
        color: "white",
        width: "84vw",
        height: "100vh",
        margin: "auto",
      }}
    >
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          height: "110px",
          margin: "auto",
          padding: "0 0 0 100px",
        }}
      >
        <br />
        <Typography component="h1" variant="h2" align="left" gutterBottom>
          Select Appointment Time
        </Typography>
      </div>
      <br />
      <br />
      {/* Hero unit */}
      <Container>
        <Grid container spacing={5} alignItems="flex-end">
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Please select your given appointment:
      </Typography>
      <br />
      <br />
      <br />
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {timeSlots.map((tSlot) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tSlot.id}
              xs={12}
              sm={tSlot.id === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Button
                fullWidth
                variant={tSlot.buttonVariant}
                color="primary"
                onClick={() => state.idx++ & console.log(state.idx)}
              >
                <Typography component="h1" variant="h2">
                  {tSlot.buttonText}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

function AuthenticateUser() {
  const classes = useStyles();
  // const tiers = [
  //   {
  //     id: "vf1",
  //     buttonText: "98473",
  //     buttonVariant: "contained",
  //   },
  //   {
  //     id: "vf2",
  //     buttonText: "43894",
  //     buttonVariant: "outlined",
  //   },
  //   {
  //     id: "vf3",
  //     buttonText: "83049",
  //     buttonVariant: "contained",
  //   },
  //   {
  //     id: "vf4",
  //     buttonText: "29384",
  //     buttonVariant: "outlined",
  //   },
  //   {
  //     id: "vf5",
  //     buttonText: "29384",
  //     buttonVariant: "contained",
  //   },
  //   {
  //     id: "vf6",
  //     buttonText: "38492",
  //     buttonVariant: "outlined",
  //   },
  // ];
  return (
    <div
      style={{
        //gray #ECECEC
        backgroundColor: "white",
        color: "white",
        width: "84vw",
        height: "100vh",
        margin: "auto",
      }}
    >
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          height: "110px",
          margin: "auto",
          padding: "0 0 0 100px",
        }}
      >
        <br />
        <Typography component="h1" variant="h2" align="left" gutterBottom>
          Patient Verification
        </Typography>
        <br />
      </div>
      <br />
      <br />
      <br />

      <Container maxWidth="xl" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography
                  component="h5"
                  variant="h5"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  NEW* BC Service Card (Back)
                </Typography>
                <img src={CareCard1} alt="CareCard1" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography
                  component="h5"
                  variant="h5"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  OLD* Care Card
                </Typography>
                <img src={CareCard2} alt="CareCard2" />;
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <br />
      <br />
      <br />
      <Container component="main" maxWidth="md">
        {/* <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.id}
              xs={12}
              sm={tier.id === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Button
                fullWidth
                variant={tier.buttonVariant}
                color="primary"
                onClick={() => state.idx++ & console.log(state.idx)}
              >
                <Typography component="h1" variant="h2">
                  {tier.buttonText}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid> */}

        <Grid item xs={12} sm={12}>
          <Card>
            <CardContent>
              <TextField
                required
                id="careCardNumber"
                fullWidth
                placeholder="Please Enter Care Card #"
              />
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Card>
            <CardContent>
              {/* <TextField
                required
                id="birthYear"
                fullWidth
                placeholder="Year of Birth"
              /> */}
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Grid>
      </Container>
      <h1>
        <br />
        <br />
        <br />
        <br />
      </h1>
      <Container component="main" maxWidth="md">
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={4}>
            <RedButton
              variant="contained"
              color="primary"
              onClick={() => state.idx-- & console.log(state.idx)}
            >
              <Typography component="h1" variant="h2">
                Back
              </Typography>
            </RedButton>
          </Grid>

          <Grid item xs={4}>
            <GreenButton
              variant="contained"
              color="primary"
              onClick={() => state.idx++ & console.log(state.idx)}
            >
              <Typography component="h1" variant="h2">
                Next
              </Typography>
            </GreenButton>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

function AppDetails() {
  const tiers = [
    {
      gridSpace: 3,
      required: true,
      id: "firstName",
      name: "firstName",
      title: "First Name",
      autoComplete: "fname",
      description: ["Description"],
      buttonVariant: "contained",
      //Example Details
      placeholder: "Don",
    },
    {
      gridSpace: 3,
      required: true,
      id: "lastName",
      name: "lastName",
      title: "Last Name",
      autoComplete: "lname",
      description: ["Description"],
      buttonVariant: "contained",
      //Example Details
      placeholder: "Chen",
    },
    {
      gridSpace: 3,
      required: false,
      id: "phoneNum",
      name: "phoneNum",
      title: "Phone Number",
      autoComplete: "pnum",
      description: ["Description"],
      buttonVariant: "contained",
      //Example Details
      placeholder: "(123) 456 - 5555",
    },
    {
      gridSpace: 12,
      required: true,
      id: "address",
      name: "address",
      title: "Address line",
      autoComplete: "billing address-line",
      description: ["Description"],
      buttonVariant: "contained",
      //Example Details
      placeholder: "123123",
    },

    {
      gridSpace: 3,
      required: true,
      id: "city",
      name: "city",
      title: "City",
      autoComplete: "billing address-level2",
      description: ["Description"],
      buttonVariant: "contained",
      //Example Details
      placeholder: "Vancouver",
    },
    {
      gridSpace: 3,
      required: false,
      id: "state",
      name: "state",
      title: "State/Province/Region",
      autoComplete: "billing address-level2",
      description: ["Description"],
      buttonVariant: "contained",
      //Example Details
      placeholder: "British Columbia",
    },
    {
      gridSpace: 3,
      required: false,
      id: "zip",
      name: "zip",
      title: "Zip / Postal code",
      autoComplete: "billing postal-code",
      description: ["Description"],
      buttonVariant: "contained",
      //Example Details
      placeholder: "V4V 4V4",
    },
  ];
  return (
    <div>
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          height: "110px",
          margin: "auto",
          padding: "0 0 0 100px",
        }}
      >
        <br />
        <Typography component="h1" variant="h2" align="left" gutterBottom>
          Review Details
        </Typography>
        <br />
      </div>
      <br />
      <br />

      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Please review and verify your details below:
      </Typography>
      <br />
      <br />

      <Container maxWidth="xl" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.id} xs={12} sm={tier.gridSpace}>
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: "center" }}
                />
                <CardContent>
                  <TextField
                    required={tier.required}
                    id={tier.id}
                    name={tier.firstName}
                    fullWidth
                    autoComplete={tier.autoComplete}
                    placeholder={tier.placeholder}
                    default={tier.default}
                  />
                </CardContent>
                <CardActions></CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <h1>
        <br />
        <br />
        <br />
        <br />
      </h1>
      <Container component="main" maxWidth="md">
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={4}>
            <RedButton
              variant="contained"
              color="primary"
              onClick={() => state.idx-- & console.log(state.idx)}
            >
              <Typography component="h1" variant="h2">
                Back
              </Typography>
            </RedButton>
          </Grid>

          <Grid item xs={4}>
            <GreenButton
              variant="contained"
              color="primary"
              onClick={() => state.idx++ & console.log(state.idx)}
            >
              <Typography component="h1" variant="h2">
                Complete
              </Typography>
            </GreenButton>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
