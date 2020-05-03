import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    width: '25ch',
  },
}));

export default function LayoutTextFields(props) {
  const classes = useStyles();
  const verificationContent = {
    firstName: true,
    lastName: false,
    phoneNumber: false,
    careCardNumber: false,
    phoneNumberLast4: false,
    careCardLast4: false
  }
  const availableTerms = [
    "firstName",
    "lastName",
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
    phoneNumberLast4: "Last 4 digits of phone number",
    careCardLast4: "Last 4 digits of care card number"
  }
  return (
    <div className={classes.root}>

      {availableTerms.map((term) => {
        console.log(term)
        if (verificationContent[term]) {
          return (<TextField required
            id="standard-full-width"

            label={ItemName[term]}
            style={{ margin: 8, paddingRight: 16 }}
            fullWidth
            variant="outlined"
            margin="normal"
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
          onClick={props.handleNext}
          className={classes.button}
        >
          {props.activeStep === props.steps.length - 1 ? 'Comfirm' : 'Next'}
        </Button>
      </div>

    </div>
  );
}