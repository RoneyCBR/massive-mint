import React from 'react'
import Countdown from 'react-countdown'
import {Box} from '@mui/material'
import styled from '@emotion/styled';
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next';

const Item = styled.div`
    display: 'grid';
    grid-template-columns:'repeat(1,1fr)';
`;


const  CountDownCustom = ({date,size,children}) =>{
    const {t} = useTranslation("translate")


    const customDateProperties  = ({days, hours, minutes, seconds, completed}) => {

        
        if (completed) {
          return (
            <React.Fragment> {children} </React.Fragment>
          )
        
        } else {
          // Render a countdown
    
          return <React.Fragment>            
                <Box
                     sx={{
                    display: 'grid',
                    gridTemplateColumns:' repeat(4,1fr)',
                    margin: '0 auto',
                    fontSize:  size == "xs" ? '12px' : size == "sm" ? '20px': size == "md" ? '26px' : size == "lg" ? '32px':'30px',
                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                    fontWeight: 'bolder'
                    }}>
                            <Item>
                                <center>
                                <span style={{color:'#000', fontSize:  size == "xs" ? '27px' : size == "sm" ? '20px': size == "md" ? '26px' : size == "lg" ? '32px':'30px'}}>{days < 10 ? '0'+days:days}</span>
                                </center>
                                <center>
                                <span>{days < 2 ? t("countdown.day"): t("countdown.day")+'s '}</span>
                                </center>
                            </Item>
                            <Item>
                                <center>
                                <span style={{color:'#000', fontSize:  size == "xs" ? '27px' : size == "sm" ? '20px': size == "md" ? '26px' : size == "lg" ? '32px':'30px'}}>{hours < 10 ? '0'+hours:hours}</span>
                                </center>
                                <center>
                                <span>{days < 2 ? t("countdown.hour"): t("countdown.hour")+'s '}</span>
                                </center>
                            </Item>
    
    
                            <Item>
                                <center>
                                <span style={{color:'#000', fontSize:  size == "xs" ? '27px' : size == "sm" ? '20px': size == "md" ? '26px' : size == "lg" ? '32px':'30px'}}>{minutes < 10 ? '0'+minutes:minutes}</span>
                                </center>
                                <center>
                                <span>{days < 2 ? t("countdown.minute"): t("countdown.minute")+'s '}</span>
                                </center>
                            </Item>
    
                            <Item>
                                <center>
                                <span style={{color:'#000', fontSize:  size == "xs" ? '27px' : size == "sm" ? '20px': size == "md" ? '26px' : size == "lg" ? '32px':'30px'}}>{seconds < 10 ? '0'+seconds:seconds}</span>
                                </center>
                                <center>
                                <span>{seconds < 2 ? t("countdown.second"): t("countdown.second")+'s '}</span>
                                </center>
                            </Item>
    
            
                </Box>
            </React.Fragment>;
        }
    }

  
  
    return (
        <React.Fragment>
            <Countdown className='contador' date={date}  renderer={customDateProperties} />
        </React.Fragment>
    )
}


CountDownCustom.propTypes = {
    date: PropTypes.string,
    size: PropTypes.string,
    children: PropTypes.any
}


export default CountDownCustom;