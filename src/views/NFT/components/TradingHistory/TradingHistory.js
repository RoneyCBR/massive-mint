import React from 'react'
import { Box, Container, Divider } from '@mui/material'
import OfferHistory from './components/OfferHistory';

const TradingHistory = () => {
    return (
        <Container maxWidth='lg'>
            <Box>
                <h1>Trading History</h1>
                <Divider />
                <Container maxWidth='lg' sx={{marginTop:'2rem'}}>
                    <OfferHistory />
                </Container>
            </Box>
        </Container>
    )
}

export default TradingHistory