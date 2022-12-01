import React from 'react'
import { Skeleton, Container, Box } from '@mui/material'

const NFTDataLoader = () => {
    return (
        <Container 
            maxWidth='lg' 
            sx={{
                marginBottom:'25px', 
                //border:'1px solid #e5e5e5',
                marginTop:'1rem',
            }}
        >
            <Box 
                display='flex' 
                justifyContent='space-around' 
                alignItems='center' 
                sx={{
                    gap:'2rem',
                    '@media (max-width: 768px)': {
                        flexDirection:'column',
                    }
                }}
            >
                <Box>
                    <Skeleton variant="rectangular" width={400} height={600} />
                </Box>
                <Box 
                    display='flex' 
                    justifyContent='center' 
                    alignItems='center' 
                    flexDirection='column'
                    sx={{
                        gap:'2rem',
                        '@media screen and (max-width:700px)':{
                            flexDirection:'column',
                        }
                    }}
                >
                    <Skeleton variant="rectangular" width={350} height={50} />
                    <Skeleton variant="rectangular" width={300} height={50} />
                    <Skeleton variant="rectangular" width={300} height={50} />
                </Box>
            </Box>
        </Container>
    )
}

export default NFTDataLoader