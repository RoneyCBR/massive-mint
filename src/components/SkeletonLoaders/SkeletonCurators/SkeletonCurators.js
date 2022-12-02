import React from 'react'
import Container from '@mui/material/Container'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'

const SkeletonCurators = () => {
  return (
    <Box
      sx={{
        m:'30px 0px'
      }}
    >
      <Container maxWidth='xl' sx={{marginBottom:'20px', display:'flex', justifyContent:'center'}}>
        <Skeleton variant="rectangular" width={180} height={35} />
      </Container>

      <Container maxWidth='xl' sx={{marginBottom:'20px',width:'100%',gap:'30px'}}>
        <Box
          sx={{
            width:'100%',
            display:'grid',
            gridTemplateColumns:'repeat(4,1fr)',
            gap:'20px',
            "@media screen and (max-width: 1300px)":{
              gridTemplateColumns:'repeat(3,1fr)',
            },
            "@media screen and (max-width: 1200px)":{
              gridTemplateColumns:'repeat(2,1fr)',
            },
            "@media screen and (max-width: 750px)":{
              gridTemplateColumns:'repeat(1,1fr)'
            }
          }}
        >
          <Skeleton variant="rectangular" width={"100%"} height={300} />
          <Skeleton variant="rectangular" width={"100%"} height={300} sx={{display:{xs:'none',sm:'block',md:'block',lg:'block'}}}/>
          <Skeleton variant="rectangular" width={"100%"} height={300} sx={{display:{xs:'none',sm:'none',md:'none',lg:'block'}}} />
          <Skeleton variant="rectangular" width={"100%"} height={300} sx={{display:{xs:'none',sm:'none',md:'none',lg:'block'}}} />
          
        </Box>
      </Container>
    </Box>
  )
}

export default SkeletonCurators