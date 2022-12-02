import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

let sizeQuery = window.screen.width < 768 ? [1] : [1, 2, 3, 4]
const defaultArray = sizeQuery

const LoaderNFT = () => {
    return (
        <Container maxWidth='xl' sx={{marginTop:'1.5rem'}}>
            <Grid 
                container 
                columns={{sm:12, md:12, lg:12, xl:12}}
                rowSpacing={4} 
                spacing={{ xs: 2, md: 3, lg: 3, xl: 3 }}
            >
                {defaultArray.map((item, index)=>(
                <Grid 
                    key={index} 
                    item 
                    xs={12}
                    sm={6} 
                    md={6} 
                    lg={3} 
                    xl={3}
                    sx={{
                        width:'100%'
                    }}
                >
                    <Skeleton variant="rectangular" height='400px' width="100%">
                        <div style={{ paddingTop: '57%' }} />
                    </Skeleton>
                </Grid>))}
            </Grid>
        </Container>
    )
}



export default LoaderNFT