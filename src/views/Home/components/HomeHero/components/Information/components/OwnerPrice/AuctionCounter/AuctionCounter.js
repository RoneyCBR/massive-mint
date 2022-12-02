import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const initialState = {
    days: 0, 
    hours: 0,
    minutes: 0,
    seconds: 0,
}
const AuctionCounter = ({finishAuction}) => {
    const { t } = useTranslation("translate"); 
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
                setShowCounter(false);
                clearInterval(x);
                return;
            } 
            if(finishAuction == 0){
                setShowCounter(false);
                clearInterval(x);
                return;
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
    },[dateCounter])
    return (
        <>
        {showCounter &&
            <Box>
                {t("home.auction_ends")}
                <Box
                    display='flex'
                    sx={{
                        gap:'30px',
                    }}
                >
                    <Box sx={{display: (dateCounter.days==0) ? 'none' : 'block'}}>
                        <Typography 
                            variant="overline" 
                            display="block" 
                            gutterBottom 
                            sx={{
                                fontSize:'36px',
                                color:'#000',
                                fontWeight: 600,
                                marginTop: '-20px',
                            }}
                        >
                            {dateCounter.days}
                        </Typography>
                        <Typography 
                            variant="overline" 
                            display="block" 
                            gutterBottom 
                            sx={{
                                fontSize:'16px',
                                color:'#666',
                                fontWeight: 600,
                                marginTop: '-30px',
                            }}
                        >
                            {t("home.auction_days")}
                        </Typography>
                    </Box>
                    <Box sx={{display: (dateCounter.hours==0) ? 'none' : 'block'}}>
                        <Typography 
                            variant="overline" 
                            display="block" 
                            gutterBottom 
                            sx={{
                                fontSize:'36px',
                                color:'#000',
                                fontWeight: 600,
                                marginTop: '-20px',
                            }}
                        >
                            {dateCounter.hours}
                        </Typography>
                        <Typography 
                            variant="overline" 
                            display="block" 
                            gutterBottom 
                            sx={{
                                fontSize:'16px',
                                color:'#666',
                                fontWeight: 600,
                                marginTop: '-30px',
                            }}
                        >
                            {t("home.auction_hours")}
                        </Typography>
                    </Box>
                    <Box sx={{display: (dateCounter.minutes==0) ? 'none' : 'block'}}>
                        <Typography 
                            variant="overline" 
                            display="block" 
                            gutterBottom 
                            sx={{
                                fontSize:'36px',
                                color:'#000',
                                fontWeight: 600,
                                marginTop: '-20px',
                            }}
                        >
                            {dateCounter.minutes}
                        </Typography>
                        <Typography 
                            variant="overline" 
                            display="block" 
                            gutterBottom 
                            sx={{
                                fontSize:'16px',
                                color:'#666',
                                fontWeight: 600,
                                marginTop: '-30px',
                            }}
                        >
                            {t("home.auction_minutes")}
                        </Typography>
                    </Box>
                    <Box sx={{display: (dateCounter.seconds==0) ? 'none' : 'block'}}>
                        <Typography 
                            variant="overline" 
                            display="block" 
                            gutterBottom 
                            sx={{
                                fontSize:'36px',
                                color:'#000',
                                fontWeight: 600,
                                marginTop: '-20px',
                            }}
                        >
                            {dateCounter.seconds}
                        </Typography>
                        <Typography 
                            variant="overline" 
                            display="block" 
                            gutterBottom 
                            sx={{
                                fontSize:'16px',
                                color:'#666',
                                fontWeight: 600,
                                marginTop: '-30px',
                            }}
                        >
                            {t("home.auction_seconds")}
                        </Typography>
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