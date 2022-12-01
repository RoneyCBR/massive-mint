import { Avatar, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import metamaskLogo from 'assets/logos/metamask.svg'
import wcLogo from 'assets/logos/walletconnect-circle.svg'
import { Context } from 'hooks/WalletContext';
import { useTranslation } from 'react-i18next';

const LogOut = () => {

    const { t } = useTranslation("translate");
    const {data, setIsLoading} = useContext(Context)
    const {connection}= useContext(Context)
    const [metamask, setMetamask] = useState(null)

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            setMetamask(true)
        }else{
            setMetamask(false)
        }
    },[])

    useEffect(() => {
        if(JSON.parse(window.localStorage.getItem('isMetamask'))){
            setIsLoading(true)
            setTimeout(() => {
                connection('metamask')
            }, 2000);
        }
    },[data])

    const handleConnectionMetamask = () => {
        localStorage.clear()
        setIsLoading(true)
        if(metamask){
            connection('metamask')
        }else{
            alert('Please install Metamask')
        }
    }
    const handleConnectionWalletconnect = ()=>{
        localStorage.clear()
        connection('walletConnect')
    }

    return (
        <List>
            <ListItemButton
                onClick={handleConnectionMetamask} 
            >
                <ListItemIcon>
                    <Avatar alt="metamask" src={metamaskLogo} />
                </ListItemIcon>
                <ListItemText 
                    primary={metamask ? 'Metamask' : 'Install Metamask'} 
                    sx={{
                        fontFamily:'Futura,Trebuchet MS,Arial,sans-serif'
                    }}
                />
                
            </ListItemButton>
           
            {!metamask ?
                <ListItemButton >
                    <ListItemText>
                        <center>
                            {t("top_bar.install_metamask.how")} <a href='https://metamask.io/' target='_blank'  rel="noreferrer">{t("top_bar.install_metamask.here")}</a>
                        </center>
                    </ListItemText>
                </ListItemButton>
                : null
            }
            <Divider />
            <ListItemButton
                onClick={handleConnectionWalletconnect}
            >
                <ListItemIcon>
                    <Avatar alt="walletconnect" src={wcLogo} />
                </ListItemIcon>
                <ListItemText 
                    primary='WalletConnect'
                    sx={{
                        fontFamily:'Futura,Trebuchet MS,Arial,sans-serif'
                    }}
                />
            </ListItemButton>
            <Divider />
        </List>
    );
}


export default LogOut;
