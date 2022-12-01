import React from 'react'
import Countdown from 'react-countdown'
import {Box} from '@mui/material'
import styled from '@emotion/styled';
import PropTypes from 'prop-types'

const Item = styled.div`
    display: 'grid';
    grid-template-columns:'repeat(2,1fr)';
`;


const Count = ({days,hours,minutes,seconds}) => {
    return (
        <Box>
            <Box
                sx={{
                    width:'auto',
                    display: 'grid',
                    gridTemplateColumns:' repeat(1,1fr)',
                    fontWeight: 'bolder',
                    fontSize: {xs:'17px',sm:'17px',md:'20px'},
                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                    gap:'10px'
                }}
            >
                <Box
                            sx={{
                                display: days>0 ? 'auto' : 'none',
                            }}
                        >
                        <Item>
                            <span style={{color:'#f2f2f2'}}>{days < 10 ? '0'+days:days}</span>
                            <span>D</span>
                        </Item>
                </Box>
                <Box
                            sx={{
                                display: (hours > 0 && days < 1 )? 'auto' : 'none',
                            }}
                        >
                        <Item>
                            <span style={{color:'#f2f2f2'}}>{hours < 10 ? '0'+hours:hours}</span>
                            <span>H</span>
                        </Item>
                </Box>
                <Box
                            sx={{
                                display: (minutes > 0 && hours < 1 && days < 1 )? 'auto' : 'none',
                            }}
                        >
                        <Item>
                            <span style={{color:'#f2f2f2'}}>{minutes < 10 ? '0'+minutes:minutes}</span>
                            <span>M</span>
                        </Item>
                </Box>
                <Box
                            sx={{
                                display: (seconds > 0 && minutes < 1 && hours < 1 && days < 1 )? 'auto' : 'none',
                            }}
                        >
                        <Item>
                            <span style={{color:'#ed2891'}}>{seconds < 10 ? '0'+seconds:seconds}</span>
                            <span>S</span>
                        </Item>
                </Box>
            </Box>
        </Box>
    )
}

Count.defaultProps = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
}

Count.propTypes =  {
    days: PropTypes.number,
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
}

const  CountDownCustomShort = ({date,children}) =>{

    const customDateProperties  = ({days, hours, minutes, seconds, completed}) => {
        
        if(!completed){
            return (
                <Count 
                    days={days}
                    hours={hours}  
                    minutes={minutes}
                    seconds={seconds}
                />
            )
        }
        return <React.Fragment> {children} </React.Fragment>
    }

    return (
        <Countdown  date={date}  renderer={customDateProperties}  />
    )
}


CountDownCustomShort.propTypes = {
    date: PropTypes.any,
    children: PropTypes.any
}


export default CountDownCustomShort;