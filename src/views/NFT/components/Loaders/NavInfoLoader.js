import React from 'react'
import { Skeleton, Container } from '@mui/material'

const NavInfoLoader = () => {
    return (
        <Container 
            maxWidth='lg' 
            sx={{
                marginBottom:'25px', 
                //border:'1px solid #e5e5e5',
                display:'flex',
                justifyContent:'center',
            }}
        >
            <Skeleton variant="rectangular" width={600} height={50} />
        </Container>
    )
}

export default NavInfoLoader