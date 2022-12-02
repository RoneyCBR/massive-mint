import React, { useContext, useEffect } from 'react'
import { Box, Divider, Drawer, IconButton } from '@mui/material';
import { DrawerMobileContext } from 'hooks/DrawerMobileContext';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useTheme } from '@emotion/react';
import OutsideClickHandler from 'react-outside-click-handler';
import {useTranslation} from 'react-i18next';
import { Context } from 'hooks/WalletContext';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import LoaderCircle from 'components/LoaderCircle';

const Wallet = () => {
    const { t } = useTranslation("translate");
    const { data, isLoading, setIsLoading,msg } = useContext(Context);
    const { openWallet, setOpenWallet } = useContext(DrawerMobileContext);
    const theme = useTheme();
    const handleClickAway = () => {
        document.body.style.overflow = 'auto';
        setOpenWallet(false);
    }
    useEffect(()=>{
        if(data && data.userAccount){
            setIsLoading(false)
        }
    },[data])

    useEffect(()=>{
        if(openWallet){
           // window.scrollTo(0,0)
            document.body.style.overflow = 'none';
        }else{
            document.body.style.overflow = 'auto';
        }
    },[openWallet])

    return (
        <OutsideClickHandler onOutsideClick={handleClickAway}>      
            <Drawer 
                id='drawer-wallet'
                variant="persistent" 
                anchor="right" 
                open={openWallet}
                sx={{
                    "& .MuiDrawer-paper": {
                        top: {xs:'0px',sm:'62px',md:'90px'},
                        right: '0px',
                        height: '100vh',
                        '@media (max-width:600px)': {
                            top: 0,
                            width: '100%',
                        }
                    }
                }}
            >
                <Box
                    sx={{
                        width:450,
                        height: '100vh',
                        '@media (max-width:600px)': {
                            width: '100%',
                            height: '100vh'
                        }
                    }}
                >
                    <Box sx={{padding: '0.8rem'}}>
                        <IconButton onClick={handleClickAway}>
                            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <CloseIcon />}
                        </IconButton>
                    </Box>
                    <Divider />
                    {isLoading ? 
                        <React.Fragment>
                            <LoaderCircle text={t("message_loader.wallet.loading_account")}  textColor="#000" spinnerColor="#000" /> 
                            <br/>
                            <center>
                            {
                                msg != '' && msg
                            }
                            </center>
                        </React.Fragment>
                    :(
                        <>
                        {data && data.userAccount ?
                            <LogIn data={data} setIsLoading={setIsLoading} /> :
                            <LogOut />
                        }
                        </>
                    )}
                </Box>
            </Drawer>
        </OutsideClickHandler> 
    )
}

export default Wallet