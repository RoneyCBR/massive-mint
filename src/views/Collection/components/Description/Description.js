import React from 'react'
import { Box, Container } from '@mui/material'
import PropTypes from 'prop-types'

const Description = ({content}) => {
    return (
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            sx={{marginTop:'2rem',marginBottom:'2.2rem',letterSpacing: '-0.02em'}}
        >
            <Container maxWidth='lg'>
                <Box
                    sx={{
                        width:{xs:'100%',sm:'100%',md:'80%',lg:'50%'},
                        fontSize:{xs:'25px',sm:'25px',md:'30px',lg:'30px'},
                        color:'#fff'
                    }}
                >
                    {content}
                </Box>
            </Container>
        </Box>
    )
}

Description.propTypes = {
    content: PropTypes.string,
}

export default Description