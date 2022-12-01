import React from 'react'
import logo from 'assets/logos/logo.jpg'
import bg from 'assets/logos/logo.jpg'
import { Box, CardMedia } from '@mui/material'

const styleContainer = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    backgroundRepeat: 'no-repeat',
    opacity: '0.9'
}

const ComingSoon = () => {
    return (
        <Box sx={styleContainer}>
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                alignContent='center'
                sx={{
                    textAlign: 'center',
                }}
            >
                <Box 
                    component='h2' 
                    sx={{
                        fontWeight:600, 
                        fontSize:'6rem', 
                        color:'#fff', 
                        fontFamily:'Arial, sans-serif',
                        letterSpacing:'0.05em',
                        marginBottom:'0.5rem',
                        '@media screen and (max-width: 600px)': {
                            fontSize:'4rem',
                        }
                    }}
                >
                    Coming Soon
                </Box>
                <Box 
                    sx={{
                        width:'50%',
                        height:'50%',
                        '@media screen and (max-width: 600px)': {
                            width:'100%',
                            height:'100%',
                        }
                    }}
                >
                    <iframe 
                        width="540" 
                        height="400" 
                        src="https://64286aa2.sibforms.com/serve/MUIEAGRbSJZeItCwNihD_u3neNxoOjQtet-_1YAQ8c5XMfOu7fKMjaUNlRxLvfh3-qVkhrqqkX3-zfJDAHD2AdTTvfAy5lh7hj1l8ZKFzIkksFYeG7SACwz5hIEPeCH21OCRlPEnojPzkKFpVPAB9_yTtKx29E2KoqIfZpQnuZWabF5cxqMJT5yiuzp5aSv053X0EEiq1Oq1DoQD" 
                        frameBorder="1px"
                        scrolling="auto" 
                    />
                </Box>
                <Box 
                    component='figure' 
                    sx={{
                        height:'30px',
                        '@media screen and (max-width: 600px)': {
                            height:'10%',
                            width:'10%',
                        },
                        '@media screen and (max-width: 300px)': {
                            overflow:'auto',
                        }
                    }}
                >
                    <CardMedia
                        component='img'
                        src={logo}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default ComingSoon