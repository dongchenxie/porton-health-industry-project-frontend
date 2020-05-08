import React from 'react';
import { Link, useRouteMatch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TimePickerWidget from "../widgets/timePicker";
import CareCardPage from '../widgets/careCard';
import AppointmentComfirmPage from '../widgets/AppointmentComfirm'
import AppointmentList from "../widgets/TerminalAppointmentList"
import Verification from "../widgets/TerminalVerification"
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#ffffff",
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    paperStyle: {
        padding: theme.spacing(2),
    }
}));

function getSteps() {
    return ['Find Your Appointment', 'Verify Your Information', 'Comfirm Your Appointment'];
}



export default function HorizontalLinearStepper(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [userInfo, setUserInfo] = React.useState({})
    const steps = getSteps();
    let { url } = useRouteMatch();

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (< AppointmentList setIsAuthed={props.setIsAuthed} userInfo={userInfo} handleBack={handleBack} handleNext={handleNext} activeStep={activeStep} steps={steps} setUserInfo={setUserInfo}/>);
            case 1:
                return (<  Verification  setIsAuthed={props.setIsAuthed} userInfo={userInfo} handleBack={handleBack} handleNext={handleNext} activeStep={activeStep} steps={steps} setUserInfo={setUserInfo}/>);
            case 2:
                return (<AppointmentComfirmPage setIsAuthed={props.setIsAuthed} userInfo={userInfo}  handleNext={handleNext} activeStep={activeStep} steps={steps} setUserInfo={setUserInfo}/>);
            default:
                return (< TimePickerWidget />);
        }
    }
    const isStepOptional = (step) => {
        return false;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Container>

            <div className={classes.root}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = <Typography variant="caption">Optional</Typography>;
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={12} sm={10} md={9} lg={8}>
                        <Paper className={classes.paperStyle}>
                            <div>
                                {activeStep === steps.length ? (
                                    <div>
                                        <Typography className={classes.instructions}>
                                            All steps completed - you&apos;re finished
            </Typography>
                                        <Button onClick={handleReset} className={classes.button}>
                                            Reset
            </Button>
                                    </div>
                                ) : (
                                        <div>
                                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                           
                                        </div>
                                    )}
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                
            </div>

        </Container>
    );
}
