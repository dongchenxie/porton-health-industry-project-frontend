/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

import Select from '@material-ui/core/Select';
import {
  BrowserRouter as Router,
  useHistory,
  useLocation
} from "react-router-dom";
import AuthContext from "../../../data/AuthContext";
import AuthAPI from "../../../data/DataAccessService";
import Error from '../../middleware/Error'

import Copywrite from '../shared/Copywrite'

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
  const [errorHelper, setErrorHelper] = React.useState(null);
  const [authError, setAuthError] = React.useState(null);
    
    let [name, setName] = React.useState("");
  const handleNameChange = (e) => {
    return setName(e.target.value);
  }

  let [email, setEmail] = React.useState("");
  const handleEmailChange = (e) => {
    return setEmail(e.target.value);
  };

  let [password, setPassword] = React.useState("");
  const handlePasswordChange = (e) => {
    return setPassword(e.target.value);
  };

  let [role, setRole] = React.useState("");
  const handleRoleChange = (e) => {
     return setRole(e.target.value);
  };

    const [state, setState] = React.useState({
      System_Admin: '',
      Client_Admin: '',
    });

    React.useEffect(() => {
      const start = async () => {
          authContext.API.readToken(authContext.authState).then(function(result){
            if (result.role !== 'SYSTEM_ADMIN'){
             return setAuthError("404. Please try again.")
            } 
          })
      }
      start()
    }, [])


  const handleRegister = async (reqBody) => {
    let result = await authContext.API.registerUserAccount(reqBody);
    
    if (result && result.status === 201){
      alert("New Account Created.")
      setErrorHelper("New Account Created.")
      return setTimeout(() => {
        history.go()
      }, 1000)
      } else if ( result.data.error.data.error === 'Email already exists.') {
        console.log(result, "error")
       setErrorHelper("Email Already exists. Try again.")
       return setTimeout(() => {
        history.go()
       }, 1000)
      }
      else if (result.status === 400){
        console.log(result, "error")
        setErrorHelper("Error submiting data to the server.")
       return setTimeout(() => {
        history.go()
       }, 1000)
      }
    }
    
          return (
            <div>
              {authError ?  authError : 
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                 Create a New Account
                </Typography>
                <Formik initialValues={{ 
                  firstName : '',
                   lastName : '',
                    email: '',
                     role: ''}}
                  validationSchema={validationSchema}
                  onSubmit={( values, {setSubmitting, resetForm, setErrors}) => {
                     setSubmitting(true)
                    setTimeout(() => {
                      //may need some error handling here....
                      handleRegister({"firstName": values.firstName.toString(), "lastName": values.lastName.toString(), "email": values.email.toString(), "password": values.password.toString(), "role": values.role.toString()})
                      resetForm()
                      setSubmitting(false)
                    }, 1000)
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
                       <Error touched={touched.lastName} message={errors.lastName}/>
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
                        autoComplete="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={touched.email && errors.email ? "has-error" : null}
                      />
                       <Error touched={touched.email} message={errors.email}/>

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
                  onChange={handleChange}
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
                  {errorHelper ?  errorHelper : ""}
                  <Button
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
                <Copywrite/>
              </Box>
            </Container>
            }
          </div>
     )
}