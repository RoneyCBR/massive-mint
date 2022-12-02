import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import AlarmIcon from '@mui/icons-material/Alarm';
// import SnoozeIcon from '@mui/icons-material/Snooze';
// import ClockIcon from '@mui/icons-material/AccessTime';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

let day = 86399000; // one day
let nMonth = day * ((365)*100); // 30 days
let maxDate = (new Date().getTime()-day) + nMonth; // max date selected


let color ={
    "50":"#43B02A",
    "100":"#43B02A",
    "200":"#43B02A",
    "300":"#43B02A",
    "400":"#43B02A",
    "500":"#43B02A",
    "600":"#43B02A",
    "700":"#43B02A",
    "800":"#43B02A",
    "900":"#43B02A",
    "A100":"#43B02A",
    "A200":"#43B02A",
    "A400":"#43B02A",
    "A700":"#43B02A"
}
let color1 = {
    "50":"#fff",
    "100":"#fff",
    "200":"#fff",
    "300":"#fff",
    "400":"#fff",
    "500":"#fff",
    "600":"#fff",
    "700":"#fff",
    "800":"#fff",
    "900":"#fff",
    "A100":"#fff",
    "A200":"#fff",
    "A400":"#fff",
    "A700":"#fff"
}

let color2 = {
    "50":"#fff",
    "100":"#fff",
    "200":"#fff",
    "300":"#fff",
    "400":"#fff",
    "500":"#fff",
    "600":"#fff",
    "700":"#fff",
    "800":"#fff",
    "900":"#fff",
    "A100":"#fff",
    "A200":"#fff",
    "A400":"#fff",
    "A700":"#fff"
}

const theme = createTheme({
    palette: {
        primary: color,
        text:color1,
        background:color2,
        color:color1
    },
    typography:{
        primary:color1,
        color:color1,
        text:color1
    }
});

const CalendarAndTime = ({date,setDate,name,minDate,maxDate}) => {

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                display:'none',
                width:{xs:'80%',sm:'90%',md:'90%',lg:'300px',xl:'300px'},
                "&.MuiPickersCalendarHeader-root":{
                    color:'#fff'
                },
                "&,button":{
                    color:'#fff'
                },
                "&,button>.Mui-selected":{
                    color:'#fff'
                },
                "&,div":{
                    color:'#fff'
                }
                
            }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} 
                            sx={{
                                color:'#fff',
                                borderColor: '#fff',
                                "& ,input":{
                                    color:'#fff'
                                },
                                "& label.Mui-focused":{
                                    color:'#fff'
                                },
                                "& label":{
                                    color:'#fff',
                                    borderColor: '#fff'
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: 'green',
                                },
                                '& , fieldset': {
                                    borderColor: '#fff'
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      borderColor: '#fff',
                                    },
                                    '&:hover fieldset': {
                                      borderColor: '#43B02A',
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: '#43B02A',
                                    }
                                }
                            }}
                        />
                        }
                        value={date[name]}
                        onChange={(newValue) => {
                            let format = new Date(newValue);
                            setDate({...date,[name]:format})
                        }}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                    </Stack>
                </LocalizationProvider>
            </Box>
        </ThemeProvider>
    );
};

CalendarAndTime.defaultProps = {
    date:{date:new Date()},
    setDate: ()=>{},
    name:"date",
    minDate:new Date().getTime()+day,
    maxDate:maxDate
};

CalendarAndTime.propTypes = {
    date: PropTypes.object,
    setDate: PropTypes.func,
    name: PropTypes.string,
    minDate: PropTypes.any,
    maxDate: PropTypes.any
};


export default CalendarAndTime;