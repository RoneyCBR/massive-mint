import React from 'react'
import { Box, Container } from '@mui/material'

const AdminDashboard = () => {
    return (
        <Box>
            <Box component='h1'>Dashboard</Box>
            <Container>
                <Box component='label' htmlFor='addres'>Addres</Box>
                <input id='address' type='text' placeholder='address' />
                <span>
                    <input type='checkbox' />
                </span>
                <span>
                    Accept user
                </span>
            </Container>
        </Box>
    )
}

export default AdminDashboard