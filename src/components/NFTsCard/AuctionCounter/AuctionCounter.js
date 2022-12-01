import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const initialState = {
    days: 0, 
    hours: 0,
    minutes: 0,
    seconds: 0,
}
const AuctionCounter = ({finishAuction}) => {
    const [dateCounter, setDateCounter] = useState(initialState);
    const [showCounter, setShowCounter] = useState(false);
    useEffect(() => {
        let countDownDate = finishAuction * 1000;
        if (finishAuction > 0) {
            setShowCounter(true);
        }
        let x = setInterval(function () {
            let now = new Date().getTime();
            let distance = countDownDate - now;  
            if (distance < 0) {
                clearInterval(x);
                setShowCounter(false);
            } 
            if(finishAuction == 0){
                clearInterval(x);
                setShowCounter(false);
            } 
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);    
            setDateCounter({days, hours, minutes, seconds});   
            if (distance < 0) {
                clearInterval(x);
                setShowCounter(false);
            }
        }, 1000);
        return () => clearInterval(x);
    },[dateCounter]);
    return (
        <>
        {showCounter &&
        <Box>
            <Box>
                <Typography 
                    variant="overline" 
                    display="block" 
                    gutterBottom 
                    sx={{
                        fontSize:'16px',
                        color:'#b3b3b3',
                        fontWeight: 600,
                    }}
                >
                    Ends in
                </Typography>
            </Box>
            <Box
                display='flex'
                sx={{
                    fontSize:'18px',
                    color:'#fff',
                    fontWeight: 600,
                    gap:'10px'
                }}
            >
                <Box compoennt='span' sx={{display: (dateCounter.days==0) ? 'none' : 'block'}}>
                    {dateCounter.days}d 
                </Box>
                <Box component='span' sx={{display: (dateCounter.hours==0) ? 'none' : 'block'}}>
                    {dateCounter.hours}h
                </Box>
                <Box compoennt='span' sx={{display: (dateCounter.minutes==0) ? 'none' : 'block'}}>
                    {dateCounter.minutes}m
                </Box>
                <Box compoennt='span' sx={{display: (dateCounter.seconds==0) ? 'none' : 'block'}}>
                    {dateCounter.seconds}s
                </Box>
            </Box>
        </Box>}
        </>
    )
}

AuctionCounter.propTypes = {
    finishAuction: PropTypes.number,
}

export default AuctionCounter