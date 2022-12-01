import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
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

const theme = createTheme({
    palette: {
        primary: color,
        background: 'red',
        textColor:"#fff"
    },
    typography:{
        primary:'#fff',
        color:'#fff'
    }
});

const CalendarCustom = ({date,setDate,name,minDate,maxDate}) => {
    return (
        <ThemeProvider theme={theme} >
            <Box sx={{
                "&.MuiCalendarOrClockPicker-root":{
                    background: 'red',
                },
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
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"26/10/2022"}>
                    <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        openTo="year"
                        value={date[name]}
                        onChange={(newValue) => {
                            let format = new Date(newValue);
                            format.toLocaleDateString([],{
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            })
                            setDate({...date,[name]:format})
                        }}
                        InputProps={{
                            style:{
                                color:'#fff',
                                "&.MuiPickersCalendarHeader-label":{
                                    color:'#fff'
                                }
                            }
                        }}
                        renderInput={(params) => <TextField {...params} 
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
                        minDate={minDate}
                        maxDate={maxDate}
                        mask="__/__/____"
                        OpenPickerButtonProps={{
                            color:'#fff'
                        }}                        
                    />
                </LocalizationProvider>
            </Box>
        </ThemeProvider>
    );
};

CalendarCustom.defaultProps = {
    date:{date:new Date()},
    setDate: ()=>{},
    name:"date",
    minDate:new Date().getTime()+day,
    maxDate:maxDate
};

CalendarCustom.propTypes = {
    date: PropTypes.object,
    setDate: PropTypes.func,
    name: PropTypes.string,
    minDate: PropTypes.any,
    maxDate: PropTypes.any
};

export default CalendarCustom;