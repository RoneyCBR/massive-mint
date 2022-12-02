import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import {  Box  } from '@mui/material';
import { CustomNavLink ,AppBarTop,ToolbarTop,ContentLogo,CardImg} from './styles';
import DesktopBar from './components/DesktopBar/DesktopBar';
import MenuIcon from '@mui/icons-material/Menu';
import MobileBar from './components/MobileBar';
import { DrawerMobileContext } from 'hooks/DrawerMobileContext';
import movnft from 'assets/images/mexicoopenlogo.png';

const TopBar = () => {

    const { setOpenNav } = useContext(DrawerMobileContext);

    const handleOpenNav = () => {
        setOpenNav(true);
    }

    const items = []

    return (
        <React.Fragment>
            <AppBarTop position="static">
                <ToolbarTop>
                    <ContentLogo> 
                        <CustomNavLink to="/home">
                            <CardImg
                                component="img"
                                src={movnft}
                                alt="logo"
                            />
                        </CustomNavLink>
                    </ContentLogo>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { sm: 'block', md: 'none' },mr:'5px' }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleOpenNav}
                        >
                            <MenuIcon
                                htmlColor="#fff"
                                sx={{
                                    fontSize: '30px',
                                }} 
                            />
                        </IconButton>
                    </Box>
                    <DesktopBar tabs={items} />
                    <MobileBar tabs={items} />
                </ToolbarTop>
            </AppBarTop>
        </React.Fragment>
    );
}

export default TopBar;