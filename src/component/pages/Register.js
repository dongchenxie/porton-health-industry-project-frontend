import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
 //import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import {
  BrowserRouter as Router,
  Switch,
  Route,
 
  Redirect,
  useHistory,
  useLocation

} from "react-router-dom";
import AuthContext from "../../data/AuthContext";
import AuthAPI from "../../data/DataAccessService";
//const BASE_URL = "http://localhost:3333/api/user"; //not sure about port number, just put it for further testing


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

}));

export default function SignUp() {
  const classes = useStyles();

  
    let history = useHistory();
    let location = useLocation();
    const authContext = React.useContext(AuthContext);
    let [name, setName] = React.useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  }
  let [email, setEmail] = React.useState("");
  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  let [password, setPassword] = React.useState("");
  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  let [role, setRole] = React.useState("");
  const handleRoleChange = (e) => {
    console.log(e.target.value);
    setRole(e.target.value);
  };

    const [state, setState] = React.useState({
      SystemAdmin: '',
      ClientAdmin: '',
    });
  
    const handleChange = (event) => {
      const name = event.target.name;
      setState({
        ...state,
        [name]: event.target.value,
      });
    };








  let { from } = location.state || { from: { pathname: "/" } };
      let register = async() => {
          let result =await authContext.API.register(`${name}`, `${email}`, `${password}`, `${role}`)
          console.log(result)
          if(result.status === 200){
             
              localStorage.setItem("token", result.token)
              authContext.setAuthState((prev) => {
              return {
                  ...prev,
                  isAuthenticated: true
              }
              })
              history.replace(from);
          }else{
              console.log (result)
          }  
      };
  
  
  //  function Register(props){
  //      const[formData, setFormData] = useState({
  //          name: "",
  //          email: "",
  //          password: ""
  
  //      });
  //      const{ name, email, password } = formData;
  // //     const onChange = e => {
  // //         setFormData({ ...formData, [e.target.name]: e.target.value });
  // //       }
      
  //  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
     
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                // value={email}
                //  onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>

            <Grid item xs= {12} >
            
            {/* <FormControl className={classes.formControl}> */}
        <InputLabel htmlFor="role-native-simple">Role</InputLabel>
        <Select
          variant="outlined"
                 required
                 fullWidth
          native
          value={state.role}
          onChange={handleChange}
          inputProps={{
            name: 'role',
            id: 'role-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value >System Admin</option>
          <option value >ClientAdmin</option>
          
        </Select>
      {/* </FormControl> */}
      
            </Grid>
            
          </Grid>
          <Button
          onClick={register}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Porton Health Check-In Kiosk
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
  }
