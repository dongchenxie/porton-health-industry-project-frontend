import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="contained" color="default" className={props.className} onClick={handleClickOpen}>
          Register
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TextField required id="email-register" label="Email" autoComplete="username" variant="outlined" />
            </DialogContentText>
            <DialogContentText>
              <TextField required id="Name-register" label="Name" autoComplete="first-name"  variant="outlined" />
            </DialogContentText>
            <DialogContentText>
            <TextField required id="password-register" label="Password"   type="password" autoComplete="current-password" variant="outlined" />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" onClick={handleClose} color="primary">
              Register
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  