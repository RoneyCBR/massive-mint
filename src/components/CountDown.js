import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const CountDown = () =>{
    
    const { t } = useTranslation('translate');
    

    useEffect(()=>{
         
        const script1 = document.createElement('script');
        script1.src = "simplyCountdown.min.js";
        script1.async = true;
        const script2 = document.createElement('script');
        script2.src = "countdown.js";
        script2.async = true;
          document.body.appendChild(script1);
          document.body.appendChild(script2);
        
     });
    

    
    return (
  
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            '@media screen and (max-width: 1280px)': {
                flexDirection: 'column',
                boxSizing: 'border-box',
                paddingLeft: '8px',
                paddingRight: '8px',
            }
        }} >
            <Grid container spacing={0} sx={{boxShadow:'0 0 10px 0 #F4AAB9',border:"solid rgba(128, 128, 128,0.199) 1px"}}>
                <Grid item  xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Item >
                        <center>
                            <h1 className="title">{t('shop.cont_down_title')}</h1>
                            <h3>
                                <p className="subtitle">{t('shop.cont_down_subtitle')}</p>
                            </h3>
                        </center>
                    </Item>
                </Grid>

                <Grid item  xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Item>
                        <center>
                        <div id="cuenta"></div>
                        </center>
                    </Item>
                </Grid>

            
            </Grid>
        </Box>


    );
}




export default CountDown;