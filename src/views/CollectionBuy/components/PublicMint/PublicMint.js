import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, CardMedia, CircularProgress, Divider, Input } from "@mui/material";
import { DrawerMobileContext } from 'hooks/DrawerMobileContext';
import { StatusTx } from 'hooks/StatusTxContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { payableMint } from 'services/ERC721/payableMint';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { totalLeft } from 'services/ERC721/totalLeft';
import { Link } from 'react-router-dom';
import { Context } from 'hooks/WalletContext';
import axios from 'axios';
import { getUsdPrice, convertEthToUsd } from 'services/getUsdPrice';
import { saveUser } from 'services/User/saveUser';
import { sign } from 'services/Utils/signature';

const ShowFormRegister = ({data,msgError,setMsgError,setRegisterSuccess,handleBuyCollection,collection}) =>{
    const { t } = useTranslation("translate");
    const [notifications,setNotifications] = useState('');
    const [viewEmailInput,setViewEmailInput] = useState(true);
    const [emailAcceptButtonValid,setEmailAcceptButtonValid] = useState(false);
    const [initRegistrationEmail,setInitRegistrationEmail] = useState(false);
    

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
                    localStorage.setItem('viewEmailInput',JSON.stringify(viewEmailInput))
                    setRegisterSuccess(true)
                    let timeOut = setTimeout(()=>{
                        setInitRegistrationEmail(false);
                        setMsgError('')
                        setViewEmailInput(false)
                        clearTimeout(timeOut)
                        handleBuyCollection(collection);
                    },1500);
                  
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
        <form onSubmit={(e)=>handleReceiveNotifications(e)}>
            <Box sx={{width:'100%',fontFamily:'Futura,Trebuchet MS,Arial,sans-serif'}}>
                <label>{t("top_bar.wallet.register_email")}</label>
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
                    border:msgError != '' ?'solid 1px  red': 'solid 1px rgba(224, 224, 224,.1213)',
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
    )
}


ShowFormRegister.propTypes = {
    data: PropTypes.any,
    msgError: PropTypes.any,
    setMsgError: PropTypes.func,
    setRegisterSuccess: PropTypes.func,
    handleBuyCollection: PropTypes.func,
    collection: PropTypes.object
}

const PublicMint = ({ collection, openModalBuy, wallet, reserve, activeNFTPay}) => {
    const { t } = useTranslation("translate");
    const { setOpenWallet } = useContext(DrawerMobileContext);
    const { data } = useContext(Context)
    const { setStatusTx, statusTx } = useContext(StatusTx);
    const [errorTx, setErrorTx] = useState(null);
    const [successTx, setSuccessTx] = useState(null);
    const [hideElement, setHideElement] = useState(null);
    const [msgTx, setMsgTx] = useState(null);
    const [msgHightPrice,setMsgHightPrice] = useState(null);
    const [errorPrice,setErrorPrice] = useState(false);
    const [usdPrice, setUsdPrice] = useState(null);
    const [showForm,setShowForm] = useState(false);
    const [msgError,setMsgError] = useState('');
    const [registersuccess,setRegisterSuccess] = useState(false);

    useEffect(() => {
        getUsdPrice()
            .then((response) => {
                console.log('usd price aprox', response);
                const convertered = convertEthToUsd(collection.reveal.price, response.data.data.amount);
                setUsdPrice('$ '+convertered.toFixed(4));
            })
            .catch((error) => console.error(error))
    }, []);

    const handleBuyCollection = async (collection) => {
        let url = 'https://api.coinbase.com/v2/prices/ETH-USD/spot';
        if(collection && collection.reveal && collection.reveal.usd_eth){
            setStatusTx(true);
            setMsgTx(null);
            setHideElement(true)
            setMsgHightPrice(null);
            setErrorPrice(false)
            axios.get(url).then(async (res)=>{
                if(res.status == 200){
                    const {data} = res;
                    ///data.data.amount = 1000000000000000000000000;
                    //collection.reveal.usd_eth = 0;
                    console.log('min amount', activeNFTPay.floorPrice)
                    if(activeNFTPay && activeNFTPay.floorPrice != '' && Number(data.data.amount) >= Number(activeNFTPay.floorPrice)){
                        try {
                            //setUsdPrice(data.data.amount);
                            let left =  await totalLeft(wallet.provider, collection.project_key);
                            if(left == 0) {
                                window.location.reload();
                            }
                            payableMint(wallet.provider, wallet.userAccount, collection.project_key, collection.reveal.price)
                            .then(async(response) => {
                                if (response && response.type == 0) {
                                    setStatusTx(false);
                                    setErrorTx(null);
                                    setSuccessTx(null);
                                    setMsgTx(false);
                                    setHideElement(false);
                                    console.log('response type ::', response);
                                } else {
                                    console.log(response);
                                    setStatusTx(false);
                                    setErrorTx(null);
                                    setSuccessTx(true);
                                    setHideElement(true);
                                    setMsgTx(response.transaction);
                                    if ( await totalLeft(wallet.provider, collection.project_key) == 0) {
                                        window.location.reload()
                                    }
                                
                                }
                            })
                            .catch((error) => {
                                setMsgTx(false)
                                setStatusTx(false);
                                setErrorTx("Please contact support with the administrator");
                                setHideElement(false);
                                console.error(error);
                            })
                        } catch (error) {
                            console.error(error);
                            setStatusTx(false);
                            setSuccessTx(null);
                            msgTx(false);
                            setHideElement(false);
                            setErrorTx("Please contact support with the administrator");
                        }
                    }else{
                        setMsgHightPrice(t("collection_buy_view.hight_price"))
                        setStatusTx(false);
                        setMsgTx(null);
                        setHideElement(false)
                    }
                }else{
                    setMsgHightPrice(t("collection_buy_view.error_valid_price"))
                    setStatusTx(false);
                    setMsgTx(null);
                    setHideElement(false)
                    setErrorPrice(true)
                }
            }).catch((er)=>{
                console.log(er);
                setMsgHightPrice(t("collection_buy_view.error_valid_price"))
                setStatusTx(false);
                setMsgTx(null);
                setHideElement(false)
                setErrorPrice(true)
            })
        }else{
            setErrorPrice(true)
            setMsgHightPrice('Price not found')
        }
    };



    
    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                sx={{
                    background: 'rgba(0, 0, 0, 0.25)',
                    boxSizing: 'border-box',
                    padding: '15px',
                    borderRadius: '5px',
                    mt: 2
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >
                    <Box>{t("collection_buy_view.public_mint")}</Box>
                    <Box display="none">Ended</Box>
                </Box>
                <Divider sx={{ width: '100%', mt: 1, mb: 1 }} />
                <Box
                    width="100%"
                    sx={{
                        display:'flex',
                        justifyContent:'space-between',
                        alignItems:'center',
                        '@media screen and (max-width: 350px)':{
                            flexDirection:'column'
                        }
                    }}
                >
                    {  collection.reveal &&
                        <Box
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                            width="100%"
                            gap="20px"
                        >
                            { collection.reveal && collection.reveal.price > 0 &&
                                <Box>
                                    <Box>{t("collection_buy_view.price")}</Box>
                                    <Box display="flex" alignItems="center" gap="5px">
                                        <CardMedia component="img" src="eth.png" alt="currency" sx={{ width: '12px' }} />
                                        <span>{collection.reveal.price}</span>
                                    </Box>
                                </Box>

                            }
                            <Box>
                                <Box>Items</Box>
                                <Box>{collection.collection_of }</Box>
                            </Box>
                            <Box>
                                <Box>{t("collection_buy_view.max_items")}</Box>
                                <Box>1</Box>
                            </Box>
                        </Box>
                    }
                    <Box sx={{ flex: 1 }} />
                    {Object.keys(collection.reveal).length > 0 && reserve > 0 && (
                        <Box
                            gap="5px"
                            width="100%"
                            sx={{
                                display:'flex',
                                justifyContent:'flex-end',
                                alignItems:'center',
                                flexDirection:{xs:'column',sm:'column',md:'row',lg:'row',xl:'row'},
                                '@media screen and (max-width: 350px)':{
                                    mt:'10px'
                                }
                            }}
                        >
                            {wallet && wallet.userAccount || registersuccess ? (
                                <>
                                    {
                                    (wallet && wallet.userAccount && wallet.user && wallet.user.registered) || registersuccess ?
                                    <React.Fragment>                              
                                        {!statusTx && !errorTx && !successTx && (
                                            <Button
                                                disabled={hideElement}
                                                type="button"
                                                onClick={()=>handleBuyCollection(collection)}
                                                sx={{
                                                    fontSize: {xs: '0.5em', sm: '0.6em', md: '1em', lg: '1em', xl: '1em' },
                                                    display: !hideElement ? 'initial' : 'none',
                                                    '@media screen and (max-width: 350px)':{
                                                        width:'100%'
                                                    }
                                                }}
                                            >
                                                {t("collection_buy_view.buy_with_crypto")}
                                            </Button>
                                        )}
                                    
                                        {statusTx && !errorTx && !successTx && (
                                            <CircularProgress sx={{ color: '#4aa521' }} />
                                        )}
                                        {!statusTx && errorTx && !successTx && (
                                            <Box>error</Box>
                                        )}
                                        {!statusTx && !errorTx && successTx && msgTx && (
                                            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" sx={{ mt: 2 }}>
                                                <CheckCircleIcon fontSize="large" sx={{ color: '#4aa521' }} />
                                                <a 
                                                    href={`${process.env.REACT_APP_SCAN}/tx/${msgTx}`}
                                                    style={{ textDecoration:'none', color: '#fff', height:'100%', textAlign: 'center' }} 
                                                    target="_blank" rel="noreferrer"
                                                >
                                                    {t("collection_buy_view.buy_success")}
                                                    <span style={{ marginLeft: '8px'}}>
                                                        {(msgTx).substring(0,5)}...{(msgTx).substring(37,42)}
                                                    </span><br/>
                                                    <Box
                                                        component={Link}
                                                        to={`/profile?address=${String(data.userAccount).toUpperCase()}`}
                                                        sx={{
                                                            textDecoration:'none',
                                                            color:'#fff',
                                                            "&:hover":{
                                                                color:'#00FD90'
                                                            }
                                                        }}
                                                    >
                                                        <small>
                                                            {t("collection_buy_view.go_to_profile")}
                                                        </small>
                                                    </Box>
                                                    
                                                </a>
                                            </Box>
                                        )}
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        {
                                            showForm ?
                                            <ShowFormRegister 
                                                data={wallet}
                                                msgError={msgError}
                                                setMsgError={setMsgError}
                                                setRegisterSuccess={setRegisterSuccess}
                                                handleBuyCollection={handleBuyCollection}
                                                collection={collection}
                                            />
                                            :
                                        <Button
                                            type="button"
                                            onClick={() => setShowForm(true)}
                                            sx={{
                                                fontSize: {xs: '0.5em', sm: '0.6em', md: '1em', lg: '1em', xl: '1em' },
                                                '@media screen and (max-width: 350px)':{
                                                    width:'100%'
                                                }
                                            }}
                                        >
                                            {t("collection_buy_view.register_user")}
                                        </Button>
                                        }
                                    </React.Fragment>
                                    }
                                </>
                            )
                            : 
                            (
                                <Button
                                    type="button"
                                    onClick={() => setOpenWallet(true)}
                                    sx={{
                                        fontSize: {xs: '0.5em', sm: '0.6em', md: '1em', lg: '1em', xl: '1em' },
                                        '@media screen and (max-width: 350px)':{
                                            width:'100%'
                                        }
                                    }}
                                >
                                    {t("collection_buy_view.connect_wallet")}
                                </Button>
                            )}
                            { (activeNFTPay && activeNFTPay.activePay) && 
                                <Button
                                    disabled={hideElement}
                                    type="button"
                                    onClick={()=>openModalBuy(true)}
                                    sx={{
                                        fontSize: {xs: '0.5em', sm: '0.6em', md: '1em', lg: '1em', xl: '1em' },
                                        display: !hideElement ? 'initial' : 'none',
                                        '@media screen and (max-width: 350px)':{
                                            width:'100%'
                                        }
                                    }}
                                >
                                    {t("collection_buy_view.buy_with_credit_card")}
                                </Button>
                            }
                            
                        </Box>
                    )}
                </Box>
                {
                    msgHightPrice != null&&
                    <Box sx={{width:'100%',display:'flex',justifyContent:'center'}}>
                        {
                            errorPrice ?
                            <Box sx={{color:'red'}}>{msgHightPrice}</Box>
                            :
                            <Box sx={{color:'#fff'}}>{msgHightPrice}</Box>
                        }
                    </Box>
                }
            </Box>
            <Box
                sx={{
                    boxSizing: 'border-box',
                    padding: '0px 15px',
                    borderRadius: '5px',
                    color: '#B5B8C0',
                    mt: 2
                }}
            >
                <Box sx={{ fontSize: '14px' }}>
                    {t("collection_buy_view.price_aprox")}: {usdPrice} USD
                </Box>
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
        </>
    );
};

PublicMint.propTypes = {
    collection: PropTypes.object,
    openModalBuy: PropTypes.func,
    reserve: PropTypes.number,
    wallet: PropTypes.object,
    activeNFTPay: PropTypes.any
};

export default PublicMint;
