import React, { useContext } from 'react'
import { DrawerMobileContext } from 'hooks/DrawerMobileContext';
import { useTheme } from '@emotion/react';
import { Box, Divider, Drawer, IconButton, List, ListItem, Menu, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useTranslation } from 'react-i18next';
import { Context } from 'hooks/WalletContext';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';

const MobileBar = ({tabs}) => {
    const { t } = useTranslation("translate")
    const { data } = useContext(Context);
    const { openNav, setOpenNav, setOpenWallet } = useContext(DrawerMobileContext);
    const theme = useTheme();
    const handleClickOpenWallet = () => {
        setOpenWallet(true);
        setOpenNav(false);
    }
    const openTab = (tab) => {
        window.open(tab, '_blank');
        //handleClickOpenWallet()
    }
    const btnStyles={gap:'0.5rem', textDecoration:'none', color:'#fff',width:'100%',fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    let selectGoogle = document.querySelector("#google_translate_element_mobile select");
    let array = document.querySelectorAll("#google_translate_element_mobile select option");
    const handleClose = async (val) => {
        selectGoogle = document.querySelector("#google_translate_element_mobile select");
        array = document.querySelectorAll("#google_translate_element_mobile select option");
        if(array && array.length > 0 && selectGoogle) {
            array.forEach((item,index) => {
                if(item.getAttribute("value") === val) {
                    selectGoogle.selectedIndex=index;
                    selectGoogle.dispatchEvent(new Event('change'));
                }
            });
        }
        setAnchorEl(null);
    };
    return (
       
        <Drawer 
            id='drawer-wallet'
            variant="persistent" 
            anchor="right" 
            open={openNav}
            className='drawer-nav'
            sx={{
                display:{xs:'block',sm:'block',md:'none',lg:'none',xl:'none'},
                "& .MuiDrawer-paper": {
                    display:{xs:'block',sm:'block',md:'none',lg:'none',xl:'none'},
                    backgroundColor: "transparent",
                    border: "none",
                    top:{sm:'0px',md:'130px'},
                    right: "0px",
                    width: "450",
                    height: '100vh',
                    '@media (max-width:600px)': {
                        width: '200px',
                    }
                }
            }}
        >
            <OutsideClickHandler onOutsideClick={()=>setOpenNav(false)}>      
            <Box
                sx={{
                    width:"450",
                    backgroundColor: 'rgba(0,0,0,0.34)',
                    color: '#fff',
                    '@media (max-width:600px)': {
                        width: 'auto',
                        overflowX: 'hidden'
                    }
                }}
            >
                <Box sx={{padding: '0.8rem'}}>
                    <IconButton onClick={()=>setOpenNav(false)} sx={{color:'#fff'}}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <CloseIcon />}
                    </IconButton>
                </Box>
                <Divider sx={{backgroundColor:'transparent',display:'none'}} />
                <List sx={{ display: 'none' }}>
                    {tabs.map((tab, index) => (
                        <ListItem key={index} sx={{width:'100%'}}>
                            {tab.public ?
                            <Box onClick={()=>openTab(tab.path)} display='flex' alignItems='center' sx={{gap:'0.5rem',width:'100%'}}>
                                <tab.icon />
                                <Box>{tab.name}</Box>
                            </Box>
                            :
                            <Box component={Link} to={tab.path} onClick={()=>setOpenNav(false)} display='flex' alignItems='center' sx={btnStyles}>
                                <tab.icon />
                                <Box>{tab.name}</Box>
                            </Box>}
                        </ListItem>
                    ))}
                    {data && data.userAccount &&    
                    <ListItem>
                        <Box component={Link} to='/create' onClick={()=>setOpenNav(false)} display='flex' alignItems='center' sx={btnStyles}>
                            <UploadFileIcon />
                            <Box>{t('topbar.create')}</Box>
                        </Box>
                    </ListItem>}
                    {data && data.userAccount &&    
                    <ListItem>
                        <Box component={Link} to={`/profile?address=${data.userAccount}`} onClick={()=>setOpenNav(false)} display='flex' alignItems='center' sx={btnStyles}>
                            <PersonIcon />
                            <Box>{t('topbar.account')}</Box>
                        </Box>
                    </ListItem>}
                    {data && data.userAccount &&
                    <ListItem>
                        <Box component={Link} to={`/notifications?address=${data.userAccount}`} onClick={()=>setOpenNav(false)} display='flex' alignItems='center' sx={btnStyles}>
                            <NotificationsNoneIcon
                                sx={{
                                    fontSize: '25px'
                                }}
                            />
                            <Box
                            sx={{
                                ml:'-1px',
                                color:'#fff', 
                                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '
                            }}
                            >
                                Notifications
                            </Box>
                        </Box>
                    </ListItem> 
                    }

                    <Box id="google_translate_element_mobile" sx={{display:'none'}} />
                    <ListItem
                        onClick={handleClick}
                        id="basic-menu-mobile"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        sx={{
                            cursor: 'pointer'
                        }}
                    >
                        <LanguageIcon />
                        <Box
                            sx={{
                                ml:'8px',
                                color:'#fff', fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '
                            }}
                        >Language</Box>
                    </ListItem>
                    <Menu
                        id="basic-menu-mobile"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={()=>{handleClose("zh-CN")}}>Chinese - Simplified</MenuItem>
                        <MenuItem onClick={()=>{handleClose("zh-TW")}}>Chinese - Traditional</MenuItem>
                        <MenuItem onClick={()=>{handleClose("en")}}>English</MenuItem>
                        <MenuItem onClick={()=>{handleClose("es")}}>Spanish</MenuItem>
                        <MenuItem onClick={()=>{handleClose("tr")}}>Turkish</MenuItem>
                    </Menu>
               
                    <ListItem onClick={handleClickOpenWallet}>
                    <Divider />
                        <Box display='flex' sx={btnStyles}>
                            <AccountBalanceWalletIcon />
                            <Box
                                sx={{
                                    color:'#fff', fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '
                                }}
                            >Wallet</Box>
                        </Box>
                    </ListItem>
                </List>
                <List>
                    {(data && data.userAccount && data.user && data.user.role > 1)  &&
                        <ListItem>
                            <Box component={Link} to='/create' onClick={()=>setOpenNav(false)} display='flex' alignItems='center' sx={btnStyles}>
                                <UploadFileIcon />
                            <Box>{t('top_bar.create')}</Box>
                        </Box>
                    </ListItem>}
                    {data && data.userAccount &&    
                    <ListItem>
                        <Box component={Link} to={`/profile?address=${data.userAccount}`} onClick={()=>setOpenNav(false)} display='flex' alignItems='center' sx={btnStyles}>
                            <PersonIcon />
                            <Box>{t('top_bar.profile')}</Box>
                        </Box>
                    </ListItem>}

                    <ListItem>
                        <Box onClick={handleClickOpenWallet} display='flex' alignItems='center' sx={btnStyles}>
                            <AccountBalanceWalletIcon />
                                <Box
                                sx={{
                                    color:'#fff',
                                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '
                                }}
                            >
                                Wallet
                            </Box>
                        </Box>
                    </ListItem>
                </List>
            </Box>
            </OutsideClickHandler> 
        </Drawer>
    
    )
}

MobileBar.propTypes = {
    tabs: PropTypes.array,
}

export default MobileBar