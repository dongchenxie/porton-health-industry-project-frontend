import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

import { makeStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import careCardNew from "../../img/CareCback.png"
import careCardOld from "../../img/oldCareC.jpg"
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        
    },
    imageStyle: {

    },
    textCenter: {
        textAlign: "center",
        marginBottom:theme.spacing(1)
    }
}));

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
            placeholderChar={'X'}
            showMask
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};



export default function FormattedInputs() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        textmask: '',
        numberformat: '1320',
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >

            <Grid item xs={12} sm={10} md={10} lg={10} >
                <Typography variant="h5" component="h6" className={classes.textCenter}>Please Input Your BC Care Card Number</Typography>
            </Grid>
            <Grid item xs={4} lg={4} justify="center" alignItems="center" >
                <Typography variant="body1" component="body1" className={classes.textCenter}>Find your care card number (new card)</Typography>
                <img src={careCardNew} alt="new care card" style={{ maxWidth: "100%" }}></img>
            </Grid>
            <Grid item xs={2} lg={2} justify="center" alignItems="center" ></Grid>
            <Grid item xs={4} lg={4} justify="center" alignItems="center" >
                <Typography variant="body1" component="body1" className={classes.textCenter}>Find your care card number (old card)</Typography>
                <img src={careCardOld} style={{ maxWidth: "100%" }} alt="old care card"></img>
            </Grid>
            <Grid item xs={12} sm={10} md={8} lg={8} justify="center" alignItems="center" ></Grid>
            <div className={classes.root}>
                <FormControl>
                    <TextField
                        value={values.textmask}
                        onChange={handleChange}
                        name="textmask"
                        variant="outlined"
                        label="Care Card Number"
                        id="formatted-text-mask-input"
                        placeholder="XXXX-XXX-XXX"
                        InputProps={{ inputComponent: TextMaskCustom }}
                    />
                </FormControl>
            </div>
        </Grid>

    );
}
