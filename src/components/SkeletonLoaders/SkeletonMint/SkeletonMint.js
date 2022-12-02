import React from 'react'
import Container from '@mui/material/Container'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'

const SkeletonMint = () => {
  return (
    <Box
      sx={{
        m:'30px 0px'
      }}
    >
      <Container maxWidth='xl' sx={{marginBottom:'20px', display:'flex', justifyContent:'center'}}>
        <Skeleton variant="rectangular" width={180} height={35} />
      </Container>

      <Container maxWidth='lg' sx={{marginBottom:'20px',width:'100%',gap:'30px'}}>
        <Box
          sx={{
            width:'100%',
            display:'grid',
            gridTemplateColumns:'repeat(1,1fr)',
            gap:'20px'
          }}
        >
          <Box
            sx={{
              display:'flex',
              justifyContent:'space-between',
              gap:'30px'
            }}
          >
            <Skeleton variant="rectangular" width={"100%"} height={300} />     
            <Skeleton variant="rectangular" width={"100%"} height={300} />     
          </Box>
          <Skeleton variant="rectangular" width={"100%"} height={300} />       
        </Box>
      </Container>
    </Box>
  )
}

export default SkeletonMint