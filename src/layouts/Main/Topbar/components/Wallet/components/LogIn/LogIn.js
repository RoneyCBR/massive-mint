import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, CircularProgress, Container, Divider, Input, List, ListItem } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box';
import jazzicon from "@metamask/jazzicon";
import { saveUser } from 'services/User/saveUser'
import { DrawerMobileContext } from 'hooks/DrawerMobileContext'
import { sign } from 'services/Utils/signature'
import PropTypes from 'prop-types';
import LogoETH from 'assets/logos/eth.png';

const LogIn = ({data}) => {
    const { t } = useTranslation("translate");
    const [notifications,setNotifications] = useState('');
    const [viewEmailInput,setViewEmailInput] = useState(true);
    const [emailAcceptButtonValid,setEmailAcceptButtonValid] = useState(false);
    const {setOpenWallet} = useContext(DrawerMobileContext);
    const [initRegistrationEmail,setInitRegistrationEmail] = useState(false);
    const [msgError,setMsgError] = useState('');
    const avatarRef = useRef();

    useEffect(() => {
        const element = avatarRef.current;
        if (element && data.userAccount) {
            const addr = data.userAccount.slice(2, 10);
            const seed = parseInt(addr, 16);
            const icon = jazzicon(20, seed); //generates a size 20 icon
            if (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            element.appendChild(icon);
        }
    }, [data.userAccount, avatarRef]);
    const deleteAllCookies = () => {
        const cookies = document.cookie.split(";");
        for (const cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
    const disconnect = ()=>{
        if(data.provider) {
            localStorage.clear()
            data.provider.request({
                method: "eth_requestAccounts",
                params: [
                    {
                        eth_accounts: {}
                    }
                ]
            });
            //data.provider.close()
            deleteAllCookies()
            window.location.reload()
        }
    }
    const handleNotifications = (e) =>{
        e.preventDefault(); 
        setEmailAcceptButtonValid(new RegExp(/^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(e.target.value))
        setNotifications(e.target.value);
    }
    const handleReceiveNotifications = async(e)=>{
        e.preventDefault();
        setInitRegistrationEmail(true);
        setMsgError('')
        try{
            let  { signature, message } = await sign("Approve my intention to receive notifications at",data.userAccount,data.provider).catch(
                (errorSignature)=>{
                    setInitRegistrationEmail(false);
                    setMsgError(errorSignature)
                }
            )
            if(signature){
                await saveUser({
                    address : data.userAccount,
                    email : notifications,
                    signature : signature,
                    message : message
                }).then(()=>{
                    setViewEmailInput(false)
                    localStorage.setItem('viewEmailInput',JSON.stringify(viewEmailInput))
                    setOpenWallet(false)
                    setInitRegistrationEmail(false);
                    setMsgError('')
                    window.location.reload();
                }).catch((catchErr)=>{
                    setInitRegistrationEmail(false);
                    setMsgError(catchErr)
                })
               
            }
        }catch(err){
            console.log(err);
            setInitRegistrationEmail(false);      
        }  
    }

    return (
        <>
            <List
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'center',
                }}
            >
                <Divider />
                <Divider />
                <ListItem button sx={{display:'flex', justifyContent:'flex-start', gap:'2rem',fontFamily:'Futura,Trebuchet MS,Arial,sans-serif'}}>
                    <Box
                        display='flex'
                        sx={{gap: '0.5rem', padding:'0.1rem', fontWeight: 600}}
                    >
                        <Box ref={avatarRef}></Box>
                        {(data.userAccount).substring(0, 4).concat('...').concat((data.userAccount).substring(38, 42))}
                    </Box>
                    <Box display='flex' alignItems='center' justifyContent='center'>
                        <Checkbox icon={<CheckCircleIcon color='success' />} checkedIcon={<CheckCircleIcon color='success' />} />
                        <Box>
                            {t('top_bar.wallet.connected')}
                            { data && data.chainID && data.chainID == process.env.REACT_APP_NETWORK &&
                                "Ethereum"
                            }
                            {data && data.chainID && data.chainID != process.env.REACT_APP_NETWORK && data.chainID != process.env.REACT_APP_NETWORK &&
                                "Unknown network"
                            }
                        </Box>
                    </Box>
                </ListItem>
                <ListItem button sx={{fontFamily:'Futura,Trebuchet MS,Arial,sans-serif'}}>
                    {data && data.chainID && data.chainID == process.env.REACT_APP_NETWORK &&
                    <Box
                        display='flex' 
                        alignItems='center' 
                        justifyContent='center'
                        sx={{gap:'0.5rem', padding:'0.1rem', fontWeight: 600}}
                    >
                        <img src={LogoETH} style={{height:'26px', width:'16px'}} />
                        {data.formatMaticBalance.substring(0,6)} ETH
                    </Box>}
                </ListItem>
                <ListItem button sx={{ display: 'none', fontFamily:'Futura,Trebuchet MS,Arial,sans-serif' }}>
                    {data && data.chainID && data.chainID == process.env.REACT_APP_NETWORK  &&
                    <Box
                        display='flex' 
                        alignItems='center' 
                        justifyContent='center'
                        sx={{gap:'0.5rem', padding:'0.1rem', fontWeight: 600}}
                    >
                        <img src={LogoETH} style={{height:'26px', width:'16px'}} />
                        <span>{(data.formatWMaticBalance+'').toString().substring(0,6)} ETH</span>
                    </Box>}
                </ListItem>
            </List>
            <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {data && (data.viewEmailInput && viewEmailInput) &&
                    <Box sx={{paddingTop:'1rem', mb: 2}}>
                        <Box sx={{display:'flex',width:'100%',justifyContent:'center'}}>
                            <form onSubmit={(e)=>handleReceiveNotifications(e)}>
                                <Box sx={{width:'100%',fontFamily:'Futura,Trebuchet MS,Arial,sans-serif'}}>
                                    <label>{t("top_bar.wallet.modal_receive_notifications_label")}</label>
                                </Box>
                                <Input
                                    className="notranslate"
                                    value={notifications}
                                    onChange={(e)=>{handleNotifications(e)}}
                                    type='email' placeholder="E-mail"
                                    disableUnderline
                                    disabled = {initRegistrationEmail}
                                    sx={{
                                        borderRadius: '10px',
                                        boxSizing: 'border-box',
                                        border:'solid 1px rgba(224, 224, 224,.1213)',
                                        outlineStyle:'red',
                                        padding: '3px',
                                        fontSize:'14px',
                                        background:'rgba(224, 224, 224,.43)',
                                        fontFamily:'Futura,Trebuchet MS,Arial,sans-serif',
                                        '@media screen and (max-width: 920px)': {
                                            width:'100%'
                                        },
                                        "&:hover":{
                                            background:'rgb(224, 224, 224)'
                                        },
                                        "&:focus::-webkitInputPlaceholder":{
                                            color:'red'
                                        }
                                    }}
                                />
                                <Button
                                    className="notranslate"
                                    disabled = { !emailAcceptButtonValid || initRegistrationEmail}
                                    onClick={(e) => handleReceiveNotifications(e)}
                                    sx={{
                                        marginLeft:'5px',
                                        color: '#fff',
                                        fontFamily:'Futura,Trebuchet MS,Arial,sans-serif',
                                        '@media screen and (max-width: 920px)': {
                                            width:'50%',
                                            marginTop:'5px',
                                            marginLeft:'0px'
                                    }
                                    }}
                                    variant="contained"
                                    size="small"
                                >
                                    {
                                        initRegistrationEmail ? 
                                        <CircularProgress size={24}
                                            sx={{
                                                color: '#fff',
                                                marginLeft: '5px'
                                            }}
                                        />
                                        :
                                        t("top_bar.wallet.modal_receive_notifications_btn")
                                    }
                                    
                                </Button>
                            </form>
                        </Box>
                        <center style={{color:'red'}}>
                            {
                                msgError && msgError.response && msgError.response.data &&  msgError.response.data.message ?
                                <React.Fragment>
                                    Error: {msgError.response.data.message}
                                </React.Fragment> 
                                :
                                <React.Fragment>
                                    {msgError && msgError.message && String(msgError.message+'').includes("status code 500") ? 
                                    t("message_errors.try_again_later")
                                    :
                                    <React.Fragment>
                                        {
                                            msgError && msgError.message ?
                                            msgError.message
                                            :
                                            msgError
                                        }
                                    </React.Fragment> 
                                    }
                                </React.Fragment> 
                            }
                        </center>
                    </Box>
                }
            </Container>
            <Divider />
            <List
                component="div"
                sx={{
                    margin:'15px auto',
                    height:'20%',
                }}
            >
                <ListItem sx={{display:'flex', justifyContent:'center'}}>
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={disconnect}
                    >
                        {t('top_bar.wallet.logout')}
                    </Button>
                </ListItem>
            </List>
        </>
    );
}

LogIn.propTypes = {
    data: PropTypes.object,
};


  

export default LogIn;
