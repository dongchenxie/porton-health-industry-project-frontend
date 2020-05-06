import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

 export default function Copywrite() {
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