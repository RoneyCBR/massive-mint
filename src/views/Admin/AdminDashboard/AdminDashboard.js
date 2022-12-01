import React, { useState } from 'react'
import { Box, Container } from '@mui/material'
import TabSelector from 'components/TabSelector';
import UserRegisteredTab from './components/UserRegisteredTab';
import AuctionSaleTab from './components/AuctionSaleTab';
import NFTUserRegisteredTab from './components/NFTUserRegisteredTab';
import Categories from './components/Categories';
import Sections from './components/Sections';
import ArtistsAndCurators from './components/ArtistsAndCurators';
import { createTheme, ThemeProvider } from '@mui/material/styles';

let color ={
    "50":"#fff",
    "100":"#fff",
    "200":"#fff",
    "300":"#fff",
    "400":"#fff",
    "500":"#fff",
    "600":"#fff",
    "700":"#fff",
    "800":"#fff",
    "900":"#fff",
    "A100":"#fff",
    "A200":"#fff",
    "A400":"#fff",
    "A700":"#fff"
}

const theme = createTheme({
    palette: {
        primary: color,
    }
});

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState(1)
    const initialState = [
        {
            name: 'Usuarios registrados',
            active: true,
            number: 1
        },
        {
            name: 'Ventas/Subastas',
            active: false,
            number: 2
        },
        {
            name: 'Usuarios con NFTs',
            active: false,
            number: 3
        },
        {
            name: 'Categorias',
            active: false,
            number: 4
        },
        {
            name: 'Sección',
            active: false,
            number: 5
        },
        {
            name: 'Artistas/Curadores',
            active: false,
            number: 6
        }
    ]

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <Box
        sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}>
            <Box component='h1' sx={{color:'#fff'}}>Dashboard</Box>
            <Container>
                <TabSelector items={initialState} setUpdate={setActiveTab} showSelector={false}/>
                <ThemeProvider theme={theme}>
                    <Box 
                        sx={{
                            marginBottom:'2rem'
                        }}
                    >
                        { activeTab == 1 &&  <UserRegisteredTab />}
                        { activeTab == 2 &&  <AuctionSaleTab />}
                        { activeTab == 3 &&  <NFTUserRegisteredTab />}
                        { activeTab == 4 &&  <Categories />}
                        { activeTab == 5 &&  <Sections />}
                        { activeTab == 6 &&  <ArtistsAndCurators />}

                    </Box>
                </ThemeProvider>
            </Container>
        </Box>
    )
}

export default AdminDashboard