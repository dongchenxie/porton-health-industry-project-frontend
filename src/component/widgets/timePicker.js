import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        width:"100%",
        minWidth: 200,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      textCenter:{
        textAlign: "center"
      }
}));

export default function TimePickers() {
    const classes = useStyles();
    const startHour=9
    const startMinute=30
    const step=15//in minutes
    const closeHour=18
    const closeMinute=30
    const [selectedTime, setselectedTime] = React.useState("");
    const [timeList, setTimeList] = React.useState([])
    const [startingTime, setStartingTime] = React.useState()
    const handleChange = event => {
        setselectedTime(event.target.value);
    };
    React.useEffect(() => {
       
        let currentTime=new Date()
        let timeArray=[]
        currentTime.setHours(startHour)
        currentTime.setMinutes(startMinute)
        currentTime.setSeconds(0,0)
        console.log(currentTime)
        let startTime=currentTime
        let oldDateObj=startTime
        let newDateObj=startTime
        let Counter=0
        while(Counter<100){
            console.log(oldDateObj.getHours())
            if(oldDateObj.getHours()>closeHour){
                break
            }else if(oldDateObj.getHours()===closeHour&&oldDateObj.getMinutes()>closeMinute){
                break
            }
            timeArray.push([oldDateObj.getTime(),`${oldDateObj.getHours()<10?"0"+oldDateObj.getHours():oldDateObj.getHours()}:${oldDateObj.getMinutes()<10?"0"+oldDateObj.getMinutes():oldDateObj.getMinutes()}`])
            oldDateObj = newDateObj;
            newDateObj = new Date();
            newDateObj.setTime(oldDateObj.getTime() + (step * 60 * 1000));
            Counter++
        }
        
        setTimeList(timeArray)
        console.log(timeArray);
    }, [])
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            
         
             <Grid item xs={12} sm={10} md={8} lg={8} className={classes.textCenter}>
                <Typography variant="h5" component="h6">Please input your check in time</Typography>
             </Grid>
             
            <Grid item xs={10} sm={8} md={6} lg={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                    
                    <InputLabel id="demo-simple-select-outlined-label">Selected Time</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={selectedTime}
                        onChange={handleChange}
                        label="selectedTime"
                    >
                        
                        {timeList.map((v,i)=>{
                            return ( <MenuItem value={v[0]}>{v[1]}</MenuItem>)
                        })}
                        
                    </Select>
                </FormControl>
            </Grid>
           
        </Grid>
    );
}
