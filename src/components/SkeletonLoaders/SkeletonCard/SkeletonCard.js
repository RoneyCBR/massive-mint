import React from 'react'
import { Grid, Skeleton,Box } from '@mui/material';
import Container from 'components/Container';

const SkeletonCard = () => {
  return (
    <Container maxWidth="xl">
        <Grid container rowSpacing={5} spacing={{ xs: 2, md: 3, lg: 4 }} columns={{ xs: 1, sm: 2, md: 8, lg: 10 }}>
            <Grid item xs={1} sm={1} md={2} lg={2}>
                <Skeleton variant="square" width={"100%"} height={380} />
                <Box sx={{display:'flex',justifyContent:'center'}}>
                <Skeleton width="45%" />
                <Box sx={{width:'10%'}}></Box>
                <Skeleton width="45%" /> 
                </Box>
                
                <center>
                    <Skeleton width="50%" /> 
                </center>
            </Grid>
            <Grid item xs={1} sm={1} md={2} lg={2}>
                <Skeleton variant="square" width={"100%"} height={380} />
                <Box sx={{display:'flex',justifyContent:'center'}}>
                <Skeleton width="45%" />
                <Box sx={{width:'10%'}}></Box>
                <Skeleton width="45%" /> 
                </Box>
                
                <center>
                    <Skeleton width="50%" /> 
                </center>
            </Grid>
            <Grid item xs={1} sm={1} md={2} lg={2}>
                <Skeleton variant="square" width={"100%"} height={380} />
                <Box sx={{display:'flex',justifyContent:'center'}}>
                <Skeleton width="45%" />
                <Box sx={{width:'10%'}}></Box>
                <Skeleton width="45%" /> 
                </Box>
                
                <center>
                    <Skeleton width="50%" /> 
                </center>
            </Grid>
            <Grid item xs={1} sm={1} md={2} lg={2}>
                <Skeleton variant="square" width={"100%"} height={380} />
                <Box sx={{display:'flex',justifyContent:'center'}}>
                <Skeleton width="45%" />
                <Box sx={{width:'10%'}}></Box>
                <Skeleton width="45%" /> 
                </Box>
                
                <center>
                    <Skeleton width="50%" /> 
                </center>
            </Grid>
            <Grid item xs={1} sm={1} md={2} lg={2}>
                <Skeleton variant="square" width={"100%"} height={380} />
                <Box sx={{display:'flex',justifyContent:'center'}}>
                <Skeleton width="45%" />
                <Box sx={{width:'10%'}}></Box>
                <Skeleton width="45%" /> 
                </Box>
                
                <center>
                    <Skeleton width="50%" /> 
                </center>
            </Grid>
        </Grid>
    </Container>
  )
}

export default SkeletonCard