import React from 'react'
import { Skeleton, Container, Box,CircularProgress } from '@mui/material'

const LoaderHero = () => {
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
                display='none' 
                justifyContent='space-around' 
                alignItems='center' 
                sx={{
                    gap:'0.5rem',
                    '@media screen and (max-width:700px)':{
                        flexDirection:'column',
                    }
                }}
            >
                <Box>
                    <Skeleton variant="rectangular" width={400} height={400} />
                </Box>
                <Box 
                    display='flex' 
                    justifyContent='center' 
                    alignItems='center' 
                    flexDirection='column'
                    sx={{
                        gap:'2rem',
                    }}
                >
                    <Skeleton variant="rectangular" width={350} height={10} />
                    <Skeleton variant="rectangular" width={300} height={10} />
                    <Skeleton variant="rectangular" width={300} height={10} />
                </Box>
            </Box>
            <Box
                sx={{
                    width:'100%',
                    height:500,
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}
            >
                <Box>
                    <CircularProgress sx={{color:'#f2f2f2'}} size={100}/>
                </Box>
            </Box>
        </Container>
    )
}

export default LoaderHero