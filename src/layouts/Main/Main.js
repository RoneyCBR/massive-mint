import React from 'react'
import TopBar from './Topbar'
import Footer from './Footer'
import { Box } from '@mui/material'
import {ContainerMain} from './style'
import PropTypes from 'prop-types'

const Main = ({children}) => {
    return (
        <ContainerMain>
            <TopBar />
                <Box
                    sx={{
                        width:'100%',
                        overflowX: 'hidden',
                        boxSizing:'border-box',
                        minHeight: '100vh'
                    }}
                >
                    {children}
                </Box>
            <Footer />
        </ContainerMain>
    )
}

Main.propTypes = {
    children: PropTypes.node,
}

export default Main