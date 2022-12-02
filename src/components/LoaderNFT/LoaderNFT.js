import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import PropTypes from 'prop-types'

let sizeQuery = window.screen.width < 768 ? [1] : [1, 2, 3]
const defaultArray = sizeQuery

const LoaderNFT = ({openFilters}) => {
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
                    sm={openFilters != null && openFilters ? 12:6} 
                    md={4} 
                    lg={4} 
                    xl={4}
                    sx={{
                        width:'100%'
                    }}
                >
                    <Skeleton variant="rectangular" height='400px' width="100%" sx={{background:'rgba(0,0,0,.4)'}}>
                        <div style={{ paddingTop: '57%' }} />
                    </Skeleton>
                </Grid>))}
            </Grid>
        </Container>
    )
}

LoaderNFT.defaultProps = {
    openFilters:false
}

LoaderNFT.propTypes = {
    openFilters: PropTypes.bool
}

export default LoaderNFT