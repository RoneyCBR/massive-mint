import React, { Fragment, useContext } from 'react'
import { Box,  IconButton, Menu, MenuItem, Stack } from '@mui/material'
import { FaUser } from 'react-icons/fa';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { NavLink } from 'react-router-dom';
import { Context } from 'hooks/WalletContext';
import Wallet from '../Wallet';
import { DrawerMobileContext } from 'hooks/DrawerMobileContext';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import PropTypes from 'prop-types';
import { authorizedAddress } from 'config/authorizedAddress'
import {listenTxt} from 'services/web3/ListenerTransaction/ListenerTransaction';
import CircleIcon from '@mui/icons-material/Circle';
import {ContentMenu} from './style';

const CustomNavLink = styled(NavLink)`
    text-decoration: none;
    color: #fff;
    border: none;
    background: '#fff';
    padding: 0px 0.4rem;
`;

const DesktopBar = ({tabs}) => {
    const { t } = useTranslation("translate");
    const { data } = useContext(Context);
    const { openWallet, setOpenWallet } = useContext(DrawerMobileContext);
    const handleOpenWallet = () => {
        /* disable scroll */
        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden';
        setOpenWallet(!openWallet);
    }
    const openTab = (tab) => {
        window.open(tab, '_blank');
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    let selectGoogle = document.querySelector("#google_translate_element select");
    let array = document.querySelectorAll("#google_translate_element select option");

    const handleClose = async (val) => {
        selectGoogle = document.querySelector("#google_translate_element select");
        array = document.querySelectorAll("#google_translate_element select option");
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

    React.useEffect(()=>{
        try{
            if(data && data != null && data.userAccount && data.userAccount != 'undefined'){
                listenTxt(data.userAccount);
            }
        }catch(err){
            console.log(err)
        }
    },[data])

    return (
        <Fragment>
            <ContentMenu>
                {tabs?.map((tab, index) => (
                    tab.visible && (
                    <Box key={index} display='flex' alignItems='center'>
                        {
                            tab.public ?
                            <Box onClick={()=>openTab(tab.path)} sx={{padding: '0px 0.4rem',fontSize:{xs:'12px', sm:'12px', md:'15px', lg:'20px', xl:'25px'},cursor:'pointer',color:'#F2F2F2',fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>{tab.name}</Box>
                            :
                            <Box component={CustomNavLink} 
                                style={{
                                    color:"#F2F2F2",
                                    background:"transparent"
                                }} 
                                to={tab.path} 
                                sx={{fontSize:{xs:'12px', sm:'12px', md:'15px', lg:'20px', xl:'25px'}, textDecoration:'none', color:'#F2F2F2',fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}
                            >
                                {tab.name}
                            </Box>
                        }
                    </Box>
                    )
                ))}
                {(data && data.userAccount && data.user && data.user.role > 1)  &&
                <Box 
                    component={CustomNavLink} 
                    style={{
                        color:"#F2F2F2",
                        background:"transparent"
                    }}
                    to='/create' 
                    sx={{fontSize:{xs:'12px', sm:'12px', md:'15px', lg:'20px', xl:'25px'}, textDecoration:'none', color:'#F2F2F2', fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}
                >
                    {t('top_bar.create')}
                </Box>}

                {(data && data.userAccount)  && authorizedAddress.includes(data.userAccount) &&
                <Box 
                    component={CustomNavLink} 
                    style={{
                        color:"#F2F2F2",
                        background:"transparent",
                    }}
                    to='/admin' 
                    sx={{fontSize:{xs:'12px', sm:'12px', md:'15px', lg:'20px', xl:'25px'}, textDecoration:'none', color:'#F2F2F2', fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}
                >
                    {t('top_bar.dashboard')}
                </Box>}

                {data && data.userAccount && 
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                    component={CustomNavLink}
                    //style={active}
                    to={`/notifications?address=${data.userAccount}`}
                    sx={{display:'none'}}
                >
                    <NotificationsNoneIcon
                        //htmlColor="#ed2891"
                        htmlColor="#000"
                        sx={{
                        fontSize: '30px',
                        //color: '#EBECF0',
                        }}
                    />
                </IconButton>
                }
                {/* <Notification /> */}
                {data && data.userAccount &&
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                    component={CustomNavLink}
                    to={`/profile?address=${String(data.userAccount+'').toUpperCase()}`}
                >
                    <FaUser size={22} />
                </IconButton>}
                {/* <Language /> */}
                <Box component='label' htmlFor="goog-te-combo" id="google_translate_element" sx={{display:{xs:'none',sm:'none',md:'none'}, alignItems:'center', justifyContent:'center', marginLeft:'1rem', marginRight:'20px'}}>
                    <LanguageIcon sx={{marginRight:'-20px',color:'#fff'}} />
                </Box>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleClick}
                    sx={{ display: 'none' }}
                >
                    <LanguageIcon 
                        //sx={{color:'#000'}} 
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                       
                    />
                </IconButton>
                <Stack direction="row" spacing={2}>
                    <Menu
                        id="basic-menu"
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
                </Stack>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleClick}
                    sx={{ display: 'none' }}
                >
                    <LanguageIcon 
                        //sx={{color:'#000'}} 
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                       
                    />
                </IconButton>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleOpenWallet}
                >
                    {
                        data && data.userAccount && data.userAccount != 'undefined' && 
                        <CircleIcon
                            htmlColor="#43B02A"
                            sx={{
                            fontSize: '20px',
                            }}
                        />
                    }
                    <AccountBalanceWalletIcon fontSize="large" />
                </IconButton>
            </ContentMenu>
            <Wallet />
        </Fragment>
    )
}

DesktopBar.propTypes = {
    tabs: PropTypes.array,
}

export default DesktopBar