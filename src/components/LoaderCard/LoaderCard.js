import React from 'react'
import { Container, Grid, Skeleton } from '@mui/material'

let sizeQuery = window.screen.width < 768 ? [1] : [1, 2, 3, 4]
const defaultArray = sizeQuery

const LloaderCard = () => {
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
                    sm={12} 
                    md={6} 
                    lg={3} 
                    xl={3}
                >
                    <Skeleton variant="rectangular" height='45vh' width="100%">
                        <div style={{ paddingTop: '57%' }} />
                    </Skeleton>
                </Grid>))}
            </Grid>
        </Container>
    )
}

export default LloaderCard