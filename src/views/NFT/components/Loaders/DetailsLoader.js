import React from 'react'
import { Skeleton, Container } from '@mui/material'

const DetailsLoader = () => {
    return (
        <Container 
            maxWidth='md' 
            sx={{
                marginBottom:'25px', 
                //border:'1px solid #e5e5e5',
                marginTop:'43px',
                display:'flex',
                alignItems:'center',
                gap:'0.5rem',
            }}
        >
            <Skeleton animation="wave" variant="circular" width={35} height={35} />
            <Skeleton variant="rectangular" width={50} height={20} />
        </Container>
    )
}

export default DetailsLoader