import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AuthContext from "../../data/AuthContext"
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textCenter: {
    textAlign: "center",
    marginBottom: theme.spacing(1)
  },
  textField: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    width: '25ch',
  },
}));


export default function LayoutTextFields(props) {
  const authContext = React.useContext(AuthContext)
  const [userInput,setUserInput]=React.useState({})
  const [verificationContent, getVerificationContent] = React.useState({
    firstName: true,
    lastName: true,
    phoneNumber: true,
    careCardNumber: false,
    phoneNumberLast4: true,
    careCardLast4: false
  })
  React.useEffect(() => {
    console.log(props.userInfo)
    const start = async () => {
      const result = await authContext.API.TerminalGetVerificationContent()
      if (result.status === 401) {
        alert("failure to login")
        localStorage.removeItem("terminal-token")
        props.setIsAuthed(false)
      } else if (result.status === 200) {
        console.log("ok",result)
        getVerificationContent(result.data.terminal[0].verificationContent[0])
      } else {
        alert("unkonwn error")
      }
    }
    start()
  }, [])
  const handleCheckin =async () => {
    props.setUserInfo((state)=>{
      return {...state,content:userInput}
    })
    const userInfo=props.userInfo
    userInfo["content"]=JSON.stringify(userInput)
 
    const result=await authContext.API.TerminalCheckin(userInfo)
    console.log(result)
    if (result.status === 401) {
      alert("failure to login")
      localStorage.removeItem("terminal-token")
      props.setIsAuthed(false)
    } else if (result.status === 200) {
      console.log(result.data)
      props.setUserInfo((state)=>{
        return{...state,appointmentData:result.data}})
      props.handleNext()
    } else {
      if(typeof result.error.response.data=="string"){
        alert(result.error.response.data)
      }else{
        alert(result.error.response.data.error)
      }
      
     
    }
   
    
  }
  const handleInputChange=(e, term)=>{
    console.log(userInput)
    const value=e.target.value
    setUserInput((state)=>{
      return{...state,[term]:value}
    })
  }
  const classes = useStyles();
  const availableTerms = [
    "firstName",
    "lastName",
    "dateOfBirth",
    "phoneNumber",
    "careCardNumber",
    "phoneNumberLast4",
    "careCardLast4"
  ]
  const ItemName = {
    firstName: "First Name",
    lastName: "Last Name",
    phoneNumber: "Phone Number",
    careCardNumber: "Care Card Number",
    dateOfBirth: "Date of Birth",
    phoneNumberLast4: "Last 4 digits of phone number",
    careCardLast4: "Last 4 digits of care card number"
  }
  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h6" className={classes.textCenter}>Please Provide the Below Informaiton to Verify Your Check In</Typography>
      {availableTerms.map((term) => {
      
        if (verificationContent&&verificationContent[term]) {
          return (<TextField required
            id="standard-full-width"
            onChange={(e)=>{handleInputChange(e, term)}}
            label={ItemName[term]}
            style={{ margin: 8, paddingRight: 16 }}
            fullWidth
            variant="outlined"
            margin="normal"
            helperText={term == "dateOfBirth" ? "Your Input should be in a format of YYYY-MM-DD eg: 1990-01-01" : ""}
            InputLabelProps={{
              shrink: true,
            }}
          />)
        }
      })}

      <div>
        <Button disabled={props.activeStep === 0} onClick={props.handleBack} className={classes.button}>
          Back
          </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckin}
          className={classes.button}
        >
          {props.activeStep === props.steps.length - 1 ? 'Comfirm' : 'Complete Your Check In'}
        </Button>
      </div>

    </div>
  );
}