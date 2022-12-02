import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Container, Modal, Box, Button, CardMedia, Input } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import { Context } from 'hooks/WalletContext';
import Web3 from 'web3';
import StepBar from 'components/StepBar';
import { TableOffersModalBid } from './components';
import { useTranslation } from 'react-i18next';
import { request } from 'services/Blockchain/ExchangeCrypto/request';
import { deposit } from 'services/Blockchain/WMATIC/deposit';
import {setupSale} from './helpers/setupSale'
import {saveRequestCrypto} from 'services/ExchangeCrypto/saveRequestCrypto'
import wmaticLogo from 'assets/logos/wmatic-logo.svg'
import LoaderCircle from 'components/LoaderCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Alert from '@mui/material/Alert';
import PropTypes from 'prop-types';
import maticIcon from 'assets/logos/matic.svg'
import { signWMatic } from 'services/WMATIC/signWMatic';
import { getPositionRequest } from 'services/ExchangeCrypto/getPositionRequest';
import { validateAcceptExchange } from 'services/WMATIC/validateAcceptExchange';
import { getBalanceWMatic } from 'services/WMATIC/getBalance';
import { DrawerMobileContext } from 'hooks/DrawerMobileContext';
import { executeExchange} from 'services/ExchangeDirect/executeExchange';
import {saveConfiguration} from 'services/ExchangeConfiguration/saveConfiguration';
import { cancelAllRequests } from 'services/cancelAllRequests/cancelAllRequests';
import { cancelAllCryptoRequests } from 'services/ExchangeCrypto/cancelAllCryptoRequests';
import { updateOwner } from 'services/Blockchain/updateOwner';

const ModalBid = ({
    openModalBid, 
    setOpenModalBid, 
    src, 
    isVideo, 
    handleOpenModalExchange, 
    handleOfferState, 
    offerDispatch, 
    initialState,
    isOffer,
    isPack,
    bid,
    setBid,
    setIsOffer,
    setIsPack,
    isVisible,
    setIsVisible,
    tokenID,
    isOpenModalOfferCrypto,
    setIsOpenModalOfferCrypto,
    setOffersSelected
}) => {
    const {data} = useContext(Context)
    const {t} = useTranslation("translate")
    console.log('isOpenModalOfferCrypto ::', isOpenModalOfferCrypto)
    const {setOpenWallet}= useContext(DrawerMobileContext)
    /**Buttons visible status */
    const [showChangeMaticButton, setShowChangeMaticButton] = useState(false)
    const [showSignButton, setShowSignButton] = useState(false)
    const [showOfferButton, setShowOfferButton] = useState(true)
    /** Control booleans*/
    const [isApprove, setIsApprove] = useState(false)
    console.log(isApprove)
    /* WMatic change */
    const [wethToChange, setWethToChange] = useState(0)
    /**
     * Balance  of WMatic
    */
    const [wethBalance, setWethBalance] = useState(0.0)
    /** Is disabled bid*/
    const [disabledBid, setDisabledBid] = useState(false)

    const [showBalance, setShowBalance] = useState(false)
    const [isProgressBar, setIsProgressBar] = useState(false)
    const [myBalance, setMyBalance] = useState(0)
    const [floor, setFloor] = useState(0)
    const [top, setTop] = useState(0)
    const [automaticSell, setAutomaticSell] = useState(false)
    const [offers, setOffers] = useState([])
    const [errorAmount, setErrorAmount] = useState(false)
    const [errorDeposit, setErrorDeposit] = useState(false)
    const [iswMaticBalance, setIswMaticBalance]=useState(true)
    const [stepTX, setStepTX] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingGeneral, setIsLoadingGeneral] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [exchangeWmatic, setExchangeWmatic] = useState(false)
    const [alert, setAlert] = useState(null)

    useEffect(async() => {
        //setBid(15)
        setIsLoadingGeneral(false)
        setAlert(null)
        setIsSuccess(false)
        setSpinner(false)
        setIsLoading(false)
        setErrorAmount(false)
        setErrorDeposit(false)
        setShowBalance(false)
        setIsProgressBar(false)
        setMyBalance(data && data.formatMaticBalance)
        setWethBalance(data && parseFloat(data.formatWMaticBalance))
        setIsVisible(true)
        setWethToChange(0)
        setIswMaticBalance(true)
        setStepTX(0)
        setDisabledBid(false)
        /* setupSale(tokenID).then(res => {
            setFloor(res.floor)
            setOffers(res ? res.offers : [])
            setBid(res.floor)
        }) */
        handleSetupCallbcak(tokenID)
        try {
            let weth = await getBalanceWMatic(data.userAccount, data.provider)
            setWethBalance(parseFloat(""+weth))
            console.log('weth of user ::', weth)
        } catch (error) {
            console.log('error ',error)
        }
        if(localStorage.getItem('sign_exchange_approve')) {
            if(localStorage.getItem('sign_exchange_approve').includes('true')) {
                setIsApprove(true)
            }else {
                setIsApprove(false)
            }
        } else {
            setIsApprove(false)
        }
    },[openModalBid])

    const handleSetupCallbcak = useCallback(async tokenID => {
        setIsLoadingGeneral(true)
        try {
            const res = await setupSale(tokenID)
            console.log('settings of nfts ::', res)
            setAutomaticSell(res.automatic_sell)
            setTop(res.roof)
            setFloor(res.floor)
            setOffers(res ? res.offers : [])
            setBid(res.floor)
            setIsLoadingGeneral(false)
        } catch (error) {
            setFloor(20.0)
            setBid(20.0)
            console.log('handleSetupCallbcak ::', error)
            setIsLoadingGeneral(false)
        }
    },[])

    const closeModal = () => {
        setShowChangeMaticButton(false)
        setShowSignButton(false)
        setShowOfferButton(true)
        setIsApprove(false)
        setWethToChange(false)
        setWethBalance(0.0)
        setShowBalance(false)
        setIsProgressBar(false)
        setOpenModalBid(false)
        setShowBalance(false)
        setIsProgressBar(false)
        offerDispatch({type: 'RESET_OFFER', payload: initialState})
        setOpenModalBid(false)
        setIsOffer(false)
        setIsPack(false)
        setAlert(null)
        setIsSuccess(false)
        setSpinner(false)
        setIsLoading(false)
        setErrorAmount(false)
        setErrorDeposit(false)
        setShowBalance(false)
        setIsProgressBar(false)
        setMyBalance(data && data.formatMaticBalance)
        setWethBalance(data && parseFloat(data.formatWMaticBalance))
        setIsVisible(true)
        setWethToChange(0)
        setIswMaticBalance(true)
        setIsLoadingGeneral(false)
        setStepTX(0)
        setDisabledBid(false)
        setupSale(tokenID).then(res => {
            setFloor(res.floor)
            setOffers(res ? res.offers : [])
            setBid(res.floor)
        })
        if(localStorage.getItem('sign_exchange_approve')) {
            if(localStorage.getItem('sign_exchange_approve').includes('true')) {
                setIsApprove(true)
            }else {
                setIsApprove(false)
            }
        } else {
            setIsApprove(false)
        }
    }

    const activeButtons = (activeChangeMaticButton,activeOfferButton,activeSignButton) => {
        setShowChangeMaticButton(activeChangeMaticButton)
        setShowSignButton(activeSignButton)
        setShowOfferButton(activeOfferButton)
    }

    const executeRequest = () => {
        setAlert(null);
        setIsLoading(true)
        setSpinner(true)
        setStepTX(1)
        offerDispatch({type: 'OFFER', payload: bid})
        let weekTime = 604_800_000
        getPositionRequest().then((position) => {
            console.log(position)
            request(data.provider, data.userAccount, parseFloat(bid), 0.21, handleOfferState.offer, tokenID, weekTime,position, (success)=>{
                console.log('requestSuccess::', success)
                let requestChange = {
                    timeLive: null,
                    startDate : null,
                    tokensId : null,
                    tokenId : null,
                    from : null,
                    position : null,
                    tx : success.transactionHash,
                    to : data.userAccount
                }
                requestChange.position = position
                requestChange.timeLive = weekTime
                requestChange.startDate = 0
                requestChange.tokensId =  handleOfferState.offer
                requestChange.tokenId = tokenID
                requestChange.amount = parseFloat(bid)
                requestChange.from =  data.userAccount
                requestChange.currency = 'Matic'
                requestChange.id_request_change = 0
                saveRequestCrypto(requestChange).then((res, err)=>{
                    if(res){
                        setStepTX(2)
                        setIsLoading(false)
                        setSpinner(false)
                        activeButtons(false,false,false)
                        setIsSuccess(true)
                        createAlert('success', "",success.transactionHash)
                    }
                    if(err){
                        setSpinner(false)
                        setIsLoading(false)
                        if(err.code == '4001'){
                            createAlert('error',t("custom_error_metamask.cancel_transaction"))
                        } else if (err.code == '-32603'){
                            createAlert('error', "Error in the rpc, please try again later")
                        } else{
                            createAlert('error',"Error: "+ err.message.substring(0,100));
                        }
                    }
                })
            }, (err)=>{
                setSpinner(false)
                setIsLoading(false)
                if(err.code == '4001'){
                    createAlert('error',t("custom_error_metamask.cancel_transaction"))
                } else if (err.code == '-32603'){
                    createAlert('error', "Error in the rpc, please try again later")
                } else{
                    createAlert('error',"Error: "+ err.message.substring(0,100));
                }
            })
        }).catch((err) => {
            setSpinner(false)
            setIsLoading(false)
            if(err.code == '4001'){
                createAlert('error',t("custom_error_metamask.cancel_transaction"))
            } else if (err.code == '-32603'){
                createAlert('error', "Error in the rpc, please try again later")
            } else{
                createAlert('error',"Error: "+ err.message.substring(0,100));
            }
        })
    }

    const executeAutomaticSell = () => {
        executeExchange(data.userAccount,0.0001,parseFloat(""+bid), tokenID, data.provider, (success) => {

            let setting = {
                'amount_top' : 0,
                'amount_floor' : parseFloat(0.001),
                'id_token': tokenID,
                'main_key': data.userAccount
            }
            saveConfiguration(setting).then(() => {
                cancelAllRequests(tokenID).then(() => {
                    cancelAllCryptoRequests(tokenID).then(() => {}).then((error) => {console.log(error)})
                }).then((error) => {console.log(error)})
                updateOwner(tokenID,data.userAccount).then((success) => {console.log(success)}).then((error) => { console.log(error)})
                setStepTX(2)
                setIsLoading(false)
                setSpinner(false)
                setIsSuccess(true)
                activeButtons(false,false,false)
                createAlert('success', "",success.transactionHash)
            },(error) => {
                console.log(error)
            })
        }, (error) => {
            console.log('error ::', error)
        })
    }
    const createAlert = (severity,msg, transactionHash = null)  => {
        let alert = {
            severity:severity,
            msg: msg,
            transactionHash : transactionHash
        }
        setAlert(alert)
    }

    const handleBidTop = () => {
        setBid(parseFloat(""+top))
    }
    const handleOffer = async() => {
        setAlert(null)
        setShowBalance(false)
        setIsProgressBar(false)
        if(bid < floor){
            setErrorAmount(true)
            return
        }
        if(bid === 0 || !bid){
            return
        }
        setIsProgressBar(true)
        try {
            let weth = await getBalanceWMatic(data.userAccount)
            setWethBalance(parseFloat(""+weth))
        } catch (error) {
            setWethBalance(0.0)
        }
        console.log('handleOffer wethBalance ::', wethBalance)
        console.log('handleOffer bid ::', bid)
        if(wethBalance >= parseFloat(""+bid)) {
                    setIsProgressBar(true)
                    console.log('Intenta approbar')
                    let approved = 0;
                    if( parseFloat(""+bid) >= parseFloat(""+top)) {
                        if(automaticSell) {
                            approved = await validateAcceptExchange(data.provider,data.userAccount,process.env.REACT_APP_EXCHANGE_DIRECT)
                        } else {
                            approved = await validateAcceptExchange(data.provider,data.userAccount,process.env.REACT_APP_EXCHANGE_CRYPTO)
                        }
                    } else {
                        approved = await validateAcceptExchange(data.provider,data.userAccount,process.env.REACT_APP_EXCHANGE_CRYPTO)
                    }
                    console.log('approved ::', approved)
                    setIsProgressBar(false)

                    if (parseFloat(""+approved) >= parseFloat(""+bid)) {
                        setStepTX(1)
                        setIsProgressBar(true)
                        console.log('handleOfferState ::', handleOfferState)
                        if(isOffer && !isPack) { 
                            console.log('Execute request')
                            if(automaticSell) {
                                if( parseFloat(""+bid) >= parseFloat(""+top)) {
                                    executeAutomaticSell()
                                } else {
                                    executeRequest()
                                }
                            } else {
                                executeRequest()
                            }

                        } else if(!isOffer && isPack) {
                            console.log('Update of nfts is pack')
                        } else {
                            offerDispatch({type: 'OFFER_AND_CARD', payload: [{offer: handleOfferState.offer, crypto:bid}]})
                            handleOpenModalExchange(true)
                            setOpenModalBid(false)
                            setIsVisible(true)
                        }
                    } else {
                        setIsProgressBar(true)
                        setStepTX(0)
                        setShowChangeMaticButton(false)
                        setShowSignButton(true)
                        setShowOfferButton(false)
                    }
        } else {
            if ((parseFloat(""+bid) - parseFloat(""+wethBalance)) <= parseFloat(data.formatMaticBalance)) {
                activeButtons(true,false,false)
                setWethToChange((parseFloat(""+bid) - parseFloat(""+wethBalance)).toFixed(6))
            } else {
              setShowBalance(true)
            }
        }
    }
    const handleDeposit = () => {
        if(data && data.provider){
            if(!Web3.utils.isAddress(data.userAccount)){
                console.log('This address is not valid')
            }else{
                setExchangeWmatic(true)
                if(parseFloat(data.formatMaticBalance) < wethToChange){
                    setShowBalance(false)
                    setErrorDeposit(true)
                    console.log('You dont have enough funds',wethToChange)
                    console.log(data.formatMaticBalance)
                    return
                }else{
                    setSpinner(true)
                    setIsProgressBar(false)
                    deposit(data.userAccount, wethToChange, tokenID, data.provider, ()=>{
                        setWethBalance(wethBalance+parseFloat(wethToChange))
                        setSpinner(false)
                        setIsProgressBar(true)
                        if(wethBalance >= bid) {
                            activeButtons(false,false,true)
                        } else {
                            activeButtons(false,true,false)
                        }
                        setShowBalance(false)
                        setIsVisible(true)
                        setExchangeWmatic(false)
                    }, (error)=>{
                        setSpinner(false)
                        setIsProgressBar(false)
                        setExchangeWmatic(false)
                        console.log(error)
                    })
                }
            }
        }
    }

    const handleBid = (e) =>{
        const {value} = e.target;
        console.log('Value bid ::', value)
        if(value.length == 0){
            setBid('')
        }else {
            try {
                setBid(parseFloat(value))
            } catch (error) {
                setBid('')
            }
        }
    }

    const handleWethToChange = (e) =>{
        const {value} = e.target;
        console.log('Value weth ::', value)
        if(value.length == 0){
            setWethToChange('')
        }else {
            try {
                setWethToChange(parseFloat(value))
            } catch (error) {
                setWethToChange('')
            }
        }
    }

    const handleSign = () => {
        setIsLoading(true)
        setSpinner(true)
        setIsProgressBar(true)
        setStepTX(0)
        let to = process.env.REACT_APP_EXCHANGE_CRYPTO
        if( parseFloat(""+bid) >= parseFloat(""+top)) {
            if(automaticSell) {
                to = process.env.REACT_APP_EXCHANGE_DIRECT
            }
        }
        signWMatic(bid,data.userAccount,to,tokenID,data.provider, () => {
            setStepTX(1)
            activeButtons(false,true,false)
            setIsLoading(false)
            setSpinner(false)
            setIsApprove(true)
            setIsProgressBar(true)
            setDisabledBid(true)
            localStorage.setItem('BidSigned',""+bid)
        }, (error) => {
            setIsProgressBar(true)
            setStepTX(0)
            setShowChangeMaticButton(false)
            setShowSignButton(true)
            setShowOfferButton(false)
            setSpinner(false)
            console.log('error ::', error)
        })
 
    }
    const handleGoToFoundAccount = () =>{
        closeModal()
        setOpenWallet(true)
    }
    const handleCancelAndReset = ()=>{
        /* reset buttons */
        setShowChangeMaticButton(false)
        setShowOfferButton(true)
        setupSale(tokenID).then(res => {
            setFloor(0.0001)
            setOffers(res ? res.offers : [])
            setBid(0.0001)
        })
    }
    return (
        <Modal
            open={openModalBid}
            //onClose={()=>{setOpenModalTransfer(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
           
                display: isVisible ? 'block' : 'none',
                alignItems:'center',
                justifyContent:'center',
                height: '100%',
            }}
        >
            <Box 
                sx={{
                    width: 1100,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    border: '2px solid #E5E5E5',
                    borderRadius:'8px',
                    boxShadow: 24,
                    p: 4,
                    '@media screen and (max-width: 1286px)': {
                        width: '100vw',
                        height: '100vh',
                        overflow:'auto'
                        
                        //top: `${showOfferButton}` ? '60%' : '60%',
                    }
                }}
            >
                
               
                {isLoadingGeneral ? <LoaderCircle text={t("message_loader.loading")} /> :  
                (<><Box sx={{
                        position:'relative'
                    }}>
                    <Box sx={{'@media screen and (max-width: 360px)': {
                                fontSize: '12px'
                            }}}> 
                        <center>
                            <h1 style={{textAlign:'center', marginTop:'5px'}}>{t("exchange_offers.modal_crypto.title")}</h1>
                        </center>
                    </Box>
                    <Box sx={{position:'absolute',top:'0',right:'0'}}>
                        <Button 
                            variant="contained" 
                            size="small"
                            onClick={closeModal}
                            sx={{
                                width:'30px',
                                background:"gray",
                                borderRadius:"20px 20px 20px 20px",
                                float:'right',
                                "&:hover":{
                                    background:"black"
                                }
                            }}
                        >
                        <CloseIcon />
                        </Button>
                    </Box>
                </Box>
                <Container 
                    component='main' 
                    maxWidth='md' 
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        '@media screen and (max-width:600px)':{
                            marginTop:'60px',
                        }
                    }}
                >
                    {isProgressBar && (<StepBar nStep={stepTX} steps={['sign', 'bid']} />)}
                    { /*
                        isError &&(<Alert  severity="error">
                            {message}
                        </Alert>)*/
                    }

                    {(alert &&(
                        <h4
                            style={{
                                textAlign:'center', 
                                marginTop:'0px',
                                color:'#4CAF50',
                            }}>
                            <Alert severity={alert.severity}>
                                { alert.transactionHash  ?
                                    <a 
                                        href={'https://polygonscan.com/tx/'+alert.transactionHash} 
                                        style={{textDecoration:'none', color:'green',height:'100%'}} 
                                        target="_blank" rel="noreferrer"
                                    >
                                        {t("nft-screen.modal_accept_exchange.transaction_modal_text")}: {(alert.transactionHash).substring(0,5)}...{(alert.transactionHash).substring(37,42)}
                                    </a>
                                    : alert.msg
                                }
                            </Alert>
                        </h4>))
                    }
                </Container>
                <Container
                    component='section' 
                    maxWidth='xl'
                    sx={{
                        display:'flex',
                        justifyContent:'space-around',
                        marginTop:'15px',
                        '@media screen and (max-width:1280px)':{
                            flexDirection:'column',
                            alignItems:'center',
                        }
                    }}
                >
                    <Box
                        component='div'
                        sx={{
                            width:'25%',
                            '@media screen and (max-width:1050px)':{
                                width:'60%',
                            },
                            '@media screen and (max-width:600px)':{
                                width:'100%',
                            }
                        }}
                    >
                        <CardMedia
                            component={isVideo ? "video" :"img"}
                            src={src}
                            autoPlay
                            loop
                            //width="480px"
                            alt="NFT"
                            sx={{
                                borderRadius:"8px",
                            }}
                        />
                    </Box>
                    <Box
                        component='div'
                        sx={{
                            marginTop:'-6px',
                            width:'45%',
                            '@media screen and (max-width:600px)':{
                                marginTop:'40px',
                                width:'100%',
                            }
                        }}
                    >
                        <Box 
                            component='div'
                            sx={{
                                '@media screen and (max-width:600px)':{
                                    marginTop:'40px',
                                }
                            }}
                        >
                            {!spinner &&(<Box 
                                sx={{
                                    marginBottom:'10px',
                                    '@media screen and (max-width:1250px)':{
                                        marginTop:'15px',
                                    }
                                }}>
                                <span style={{fontWeight:'bold'}}>{t("exchange_offers.modal_crypto.sub_title")}:</span>
                                <span 
                                    style={{
                                        float:'right', 
                                        cursor:'pointer', 
                                        color:'#000',
                                        display:'none'
                                    }}
                                >
                                    {t("exchange_offers.modal_crypto.all_offers")}
                                </span>
                                {/* <span style={{fontWeight:'bolder'}}>MATIC:</span> <span>{(data.formatMaticBalance).substring(0,8)}</span> */}
                                {/* <TableOffersModalBid /> */}
                            </Box>)}
                            {!spinner &&(<TableOffersModalBid 
                                account={data && data.userAccount ?  data.userAccount : null} 
                                setIsOpenModalOfferCrypto={setIsOpenModalOfferCrypto}
                                setOpenModalBid={setOpenModalBid}
                                offers={offers}
                                setOffersSelected={setOffersSelected}
                            />)}

                       
                            {spinner && <LoaderCircle text={ (stepTX >= 1) ?  exchangeWmatic ? t("nft-screen.bid_modal.loading_wrapping_matic_text") : t("nft-screen.modal_exchange.sending_request") : exchangeWmatic ? t("nft-screen.bid_modal.loading_wrapping_matic_text") : t("nft-screen.modal_exchange.signing_request")} />}
                            {!spinner &&(<Box>
                                <p 
                                    style={{
                                        float:'right', 
                                        fontWeight:'bolder'
                                    }}
                                >
                                    {t("exchange_offers.modal_crypto.minimal_bid")}: {floor} WMATIC
                                </p>
                            </Box>)}
                        </Box>
                    </Box>
                </Container>
                {!spinner && !isSuccess &&(
                <Container 
                    component='section' 
                    maxWidth='md'
                    sx={{
                        marginTop:'10px',
                    }}
                >
                    {iswMaticBalance &&(
                    <Box 
                        component='div'
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        sx={{
                            textAlign:'center', 
                            fontWeight:'bold',
                            gap:'10px',
                            display:'none',
                        }}
                    >
                        <span>
                            {t("exchange_offers.modal_crypto.minimal_bid")}: {floor} MATIC
                        </span>
                        <span>
                            <CardMedia
                                component="img"
                                src={wmaticLogo}
                                sx={{
                                    width:'4%',
                                }}
                            />
                        </span>
                    </Box>)}
                    {iswMaticBalance &&(
                        <>
                        <Container component='div' sx={{textAlign:'center'}}>
                            Your balance: <br/>
                            <Box sx={{display:'flex',justifyContent:'center'}}>
                                <Box sx={{display:'flex',alignItems:'center',height:'25px'}}>
                                   {(myBalance +'').toString().substring(0,8)+' '}
                                    MATIC
                                   <span>
                                       <img src={maticIcon} style={{marginTop:'5px',height:'25px', width:'25px'}} />
                                    </span>
                                </Box>
                            </Box>
                        </Container>
                        <Box sx={{display:'flex',justifyContent:'center',marginBottom:'10px'}}>
                            <Box sx={{display:'grid',gridTemplateColumns:'repeat(1,1fr)'}}>
                                <center>
                                    {data && wethBalance && (wethBalance+'').toString().substring(0,8)+' '} WMATIC
                                    <span>
                                   <img src={wmaticLogo} style={{marginTop:'5px',marginLeft:'4px',marginRight:'4px',height:'17px', width:'17px'}} />
                                    </span>
                               </center>
                               
                                <center style={{color:'#000'}}>
                                    {t("exchange_offers.modal_crypto.offers_in_matic")}
                                </center>
                               { automaticSell &&
                                <small style={{color:'#000'}}>
                                    With <b style={{textDecoration:'underline', cursor:'pointer'}} onClick={() => handleBidTop()}>{top.toFixed(6)}</b> WMATIC you can buy now
                                </small>
                               }
                            </Box>
                        </Box>
                        <center>
                            <span style={{color:'#000', fontSize:'14px', textAlign:'center'}}>
                                {t("nft-screen.modal_exchange.price_to_exchange_modal_text")}
                            </span>
                        </center>
                        {(showChangeMaticButton && (
                        <Container>
                            <p
                                style={{
                                    boxSizing:'border-box',
                                    padding:'2px',
                                    color:'#df4759',
                                    marginTop: '10px',
                                    textAlign:'center',
                                    fontSize:'12px',
                                    width:'100%'
                                }}
                            >
                                {t("exchange_offers.modal_crypto.change_to_matic_text_1")}
                                <span style={{margin:'0px 2px'}}>{bid} WMATIC</span>
                                {t("exchange_offers.modal_crypto.change_to_matic_text_2")}
                                <span style={{margin:'0px 2px'}}>{wethToChange.toFixed(4)} WMATIC</span> <br />
                                {t("exchange_offers.modal_crypto.change_to_matic_text_3")}
                                <span style={{margin:'0px 2px'}}>{wethToChange.toFixed(4)} WMATIC  into WMATIC</span>
                            </p>
                        </Container>))}
                        <Box
                            sx={{
                                display:'flex',
                                justifyContent:'center',
                                marginTop:'1px',
                            }}
                        >
                            {showOfferButton &&(<Input
                                disabled = {disabledBid}
                                inputProps={{pattern:"^[0-9]+", min: 0, inputMode: 'numeric', maxLength: 8}}
                                type='number'
                                placeholder='Tu oferta'
                                value={bid}
                                onChange={(e)=>{handleBid(e)}}
                            />)}
                            { showChangeMaticButton &&(
                            <Input
                                inputProps={{pattern:"^[0-9]+", min: 0, inputMode: 'numeric',  maxLength: 8}}
                                type='number'
                                placeholder='Cambiar MATIC'
                                value={wethToChange}
                                onChange={e=>handleWethToChange(e)}
                            />)}
                            
                        </Box>
                        </>
                    )}
                    {showSignButton &&
                    <Box
                        sx={{
                            display:'flex',
                            justifyContent:'center',
                            marginTop:'0px'
                        }}
                    >
                        <center>
                            <small style={{color:'#000'}}>{t("exchange_offers.modal_crypto.you_sign")} {bid} WMATIC {t("exchange_offers.modal_crypto.you_sign_2")}</small>
                        </center>
                    </Box>}
                    <Box
                        sx={{
                            display:'flex',
                            justifyContent:'center',
                            marginTop:'15px'
                        }}
                    >
                        { showSignButton && <>
                            <Button
                                    variant='contained' 
                                    type='button'
                                    onClick={handleSign}
                                    sx={{
                                        width:'180px',
                                        backgroundColor:'#000',
                                        color:'#fff',
                                        ':hover':{
                                            backgroundColor: '#000',
                                        },
                                    }}
                                >
                                {t("exchange_offers.modal_crypto.sign")} 
                            </Button></>
                        }
                        {showOfferButton && (
                            <Button
                                disabled={isLoading || bid == '' || bid == 0}
                                variant='contained' 
                                type='button'
                                onClick={handleOffer}
                                sx={{
                                    width:'180px',
                                    backgroundColor:'#000',
                                    color:'#fff',
                                    ':hover':{
                                        backgroundColor: '#000',
                                    },
                                }}
                            >
                             {t("exchange_offers.modal_crypto.offer_btn")}
                            </Button>)
                        }
                        {showChangeMaticButton && (
                        <Box
                            component='div'
                            display='flex'
                            sx={{
                                justifyContent:'center',
                                gap:'10px',
                                '@media (max-width:600px)':{
                                    flexDirection:'column',
                                }
                            }}
                        >
                            <Button
                                disabled={isLoading || wethToChange == '' || wethToChange == 0}
                                variant='contained' 
                                type='button'
                                onClick={handleDeposit}
                                sx={{
                                    display: iswMaticBalance ? 'block' : 'none',
                                    width:'180px',
                                    backgroundColor:'#000',
                                    color:'#fff',
                                    ':hover':{
                                        backgroundColor: '#000',
                                    },
                                }}
                            >
                               {t("exchange_offers.modal_crypto.change_matic")}
                            </Button>
                            <Button
                                disabled={isLoading || wethToChange == '' || wethToChange == 0}
                                variant='contained' 
                                type='button'
                                onClick={handleCancelAndReset}
                                sx={{
                                    display: iswMaticBalance ? 'block' : 'none',
                                    width:'180px',
                                    backgroundColor:'#000',
                                    color:'#fff',
                                    ':hover':{
                                        backgroundColor: '#000',
                                    },
                                }}
                            >
                               Cancel
                            </Button>
                        </Box>)}
                    </Box>
                    {(errorAmount && (
                    <h4 
                        style={{
                            textAlign:'center', 
                            marginTop:'0px',
                            color:'#df4759',
                        }}
                    >   
                        {
                            bid < floor &&
                            <>
                             {t("nft-screen.bid_modal.minimum_amount_text")+' '}{floor} WMATIC
                            </>
                        }
                       
                    </h4>))}
                    {(showBalance &&(
                    <h4 
                        style={{
                            textAlign:'center', 
                            marginTop:'0px',
                            color:'#df4759',
                        }}
                    >
                        {t("exchange_offers.modal_crypto.not_enough_balance")}
                        <button 
                            type='button' 
                            onClick={handleGoToFoundAccount}
                            style={{
                                backgroundColor:'transparent',
                                border:'none',
                                color:'#df4759',
                                cursor:'pointer',
                                textDecoration:'underline',
                                fontWeight:'bold',
                                fontSize:'16px',
                            }}
                        >
                          {t("nft-screen.bid_modal.here_text")}
                        </button>
                    </h4>))}
                    {(errorDeposit &&(
                    <h4 
                        style={{
                            textAlign:'center', 
                            marginTop:'0px',
                            color:'#df4759',
                        }}
                    >
                       {t("exchange_offers.modal_crypto.not_enough_balance")}
                    </h4>))}
                </Container>)}
                {isSuccess &&(
                    ((parseFloat(""+bid) >= parseFloat(""+top))  && automaticSell) ? 
                    <>
                        <Box sx={{textAlign:'center'}}>
                            <CheckCircleIcon color='success' sx={{fontSize:'80px'}} />
                        </Box>
                        <Box sx={{textAlign:'center'}}>
                            {'You are the new owner of this NFT'}
                        </Box>
                    </>
                    :
                <>
                <Box sx={{textAlign:'center'}}>
                    <CheckCircleIcon color='success' sx={{fontSize:'80px'}} />
                </Box>
                <Box sx={{textAlign:'center'}}>
                    {t('nft-screen.bid_modal.success_offer_bid_text_1')+' '}
                    {parseFloat(bid)} WMATIC
                    {' '+t('nft-screen.bid_modal.success_offer_bid_text_2')}
                </Box>
                </>)}
               </>)}
            </Box>
        </Modal>
    )
}

ModalBid.propTypes = {
    openModalBid: PropTypes.bool.isRequired,
    setOpenModalBid: PropTypes.func.isRequired,
    src: PropTypes.string,
    isVideo: PropTypes.bool,
    handleOpenModalExchange: PropTypes.func.isRequired,
    handleOfferState: PropTypes.object.isRequired,
    offerDispatch: PropTypes.func.isRequired,
    initialState: PropTypes.object.isRequired,
    isOffer: PropTypes.bool.isRequired,
    isPack: PropTypes.bool.isRequired,
    bid: PropTypes.number.isRequired,
    setBid: PropTypes.func.isRequired,
    setIsOffer: PropTypes.func.isRequired,
    setIsPack: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    setIsVisible: PropTypes.func.isRequired,
    tokenID: PropTypes.number.isRequired,
    isOpenModalOfferCrypto: PropTypes.bool.isRequired,
    setIsOpenModalOfferCrypto: PropTypes.func.isRequired,
    setOffersSelected: PropTypes.func
}

export default ModalBid;