import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup'


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
import AuthContext from "../../../data/AuthContext";
import AuthAPI from "../../../data/DataAccessService";
import Error from '../../middleware/Error'
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

//validations via yup, formik
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
  .min(2, "Must be bigger than 1")
  .max(255, "Must be shorter than 255")
  .required("Must enter first name"),

  lastName: Yup.string()
  .min(2, "Must be bigger than 1")
  .max(255, "Must be shorter than 255")
  .required("Must enter last name"),

  email: Yup.string()
  .email("Must be a valid email address")
  .min(5, "Must be more  than 5")
  .max(255, "Must be shorter than 255")
  .required("Must enter email address"),

  password: Yup.string()
 
  .min(6, "You must have atleast 6 characters for the password")
  .required("Password needed"),

  role: Yup.string()
  .required('Role needed')
})

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
      System_Admin: '',
      Client_Admin: '',
    });
  
   



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
              
          } 
         
          
    
  
  
  

          return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
             
                </Avatar>
                <Typography component="h1" variant="h5">
                 Create A New Account
                </Typography>
                <Formik initialValues={{ 
                  firstName : '',
                   lastName : '',
                    email: '',
                     role: ''}}
                  validationSchema={validationSchema}
                  onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true)
        
                    setTimeout(() => {
                      resetForm()
                      setSubmitting(false)
                    }, 500)
                  }}>
        
                  
                  {({
                    values, 
                  errors,
                   touched,
                    handleChange, 
                    handleBlur, 
                    handleSubmit,
                     isSubmitting }) => (
        
            
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
             
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        type="text"
                        id="firstName"
                        
                        label="First Name"
                        autoFocus
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        className={touched.firstName && errors.firstName ? "has-error" : null}/>
                        <Error touched={touched.firstName} message={errors.firstName}/>
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        className={touched.lastName && errors.lastName ? "has-error" : null}
                      />
                       <Error touched={touched.firstName} message={errors.lastName}/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required 
                        fullWidth
                      
                        id="email"
                        
                        label="Email Address"
                        name="email"
                        type = "email"
                        //autoComplete="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={touched.email && errors.email ? "has-error" : null}
                       
                        //  onChange={e => onChange(e)}
                      />
                       <Error touched={touched.firstName} message={errors.email}/>
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={touched.password && errors.password ? "has-error" : null}
                      />
                       <Error touched={touched.password} message={errors.password}/>
                    </Grid>
        
                    <Grid item xs= {12} >
                    
                    {/* <FormControl className={classes.formControl}> */}
                <InputLabel htmlFor="role-native-simple">Role</InputLabel>
                <Select
                  variant="outlined"
                         required
                         fullWidth
                         native
                  // eslint-disable-next-line no-undef
                  value={state.role}
                  // eslint-disable-next-line no-undef
                  //onChange={handleChange}
                  inputProps={{
                    name: 'role',
                    id: 'role-native-simple',
                  }}
                >
                  <option aria-label="None" value="{state.role}" />
                  <option value = "SYSTEM_ADMIN" >System Admin</option>
                  <option value = "CLIENT_ADMIN">Client Admin</option>
                  onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.role}
                  
                </Select>
              {/* </FormControl> */}
              
                    </Grid>
                    <Error touched={touched.role} message={errors.role}/>
                  </Grid>
                  <Button
                   // eslint-disable-next-line no-undef
                   //onClick={register}
                    type="submit"
                    disabled={isSubmitting}
                    fullWidth
                    variant="contained"
                    color="primary"
                    // eslint-disable-next-line no-undef
                    className={classes.submit}
                  >
                    Create a New Account
                  </Button>
                  <Grid container justify="flex-end">
                   
                  </Grid>
                </form>
                )}
                </Formik>
              </div>
              <Box mt={5}>
                <Copyright />
              </Box>
            </Container>
          );
        
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
        }