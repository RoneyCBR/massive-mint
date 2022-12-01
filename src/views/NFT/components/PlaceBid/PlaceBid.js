import React, { useEffect, useState ,useContext } from 'react'
import ButtonStyled from 'components/ButtonStyled';
import { Box, Card } from '@mui/material';
import { Form, Formik } from 'formik';
import LoaderModal from 'components/LoaderModal';
import ShowSignCrypto from 'components/ShowSignCrypto'
import ModalCustom from 'components/ModalCustom';
import { balanceOf } from 'services/WAVAX/balanceOf';
import { allowance } from 'services/WAVAX/allowance';
import { getBalance } from 'services/MATIC/getBalance';
import ShowDepositCrypto from 'components/ShowDepositCrypto';
import { sendBid } from 'services/Exchange/sendBid';
import { Context } from 'hooks/WalletContext';
import { useTranslation } from 'react-i18next';
import { DrawerMobileContext } from 'hooks/DrawerMobileContext';
import { initialState, bidSchema } from './schema';
import { PlaceBidContentBox, PlaceBidInputNumber, TextField, counterStyle, auctionMesaggeStyles, auctionEndsTextStyles } from './styled';
import PropTypes from 'prop-types';
//import { updateOwner } from 'views/cryptoloterita/Blockchain/updateOwner';

const PlaceBid = ({projectKey, tokenId, bid, userAccount, image, isVideo, finishAuction, setBidTx,bids,owner}) => {
    const { t } = useTranslation("translate");
    const { data } = useContext(Context);
    const {setOpenWallet } = useContext(DrawerMobileContext);
    const [isUserSigned, setIsUserSigned] = useState(false)
    const [isUserDeposit, setIsDeposit] = useState(false)
    const [userBid, setUserBid] = useState(0)
    const [openModalSignature, setOpenModalSignature] = useState(false)
    const [openModalDeposit, setOpenModalDeposit] = useState(false)
    const [dateCounter, setDateCounter] = useState(initialState);
    const [showCounter, setShowCounter] = useState(false);
    const [lessPrice, setLessPrice] = useState(false);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        const countDown = () => {
            let countDownDate = finishAuction * 1000;
            if (finishAuction > 0) {
                setShowCounter(true);
            }
            let x = setInterval(function () {
                let now = new Date().getTime();
                let distance = countDownDate - now;  
                if (distance < 0) {
                    clearInterval(x);
                    setShowCounter(false);
                    return;
                } 
                if(finishAuction == 0){
                    clearInterval(x);
                    setShowCounter(false);
                    return;
                } 
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);    
                setDateCounter({days, hours, minutes, seconds});   
                if (distance < 0) {
                    clearInterval(x);
                    setShowCounter(false);
                }
            }, 1000);
        }
        countDown();
    },[dateCounter])
    const cryptos = [
        process.env.REACT_APP_WRAPPED
    ]

    const handleCloseDeposit = (deposit) => {
        setOpenModalDeposit(false)
        if(isUserDeposit || deposit) {
            setOpenModalSignature(true)
        }
    }
    const lastBidOfUser = () => {
        let lastBid = null;
        if(bids.length > 0) {
            bids.forEach((bid) => {
                if (bid.type_movement == "BID") { 
                    if (bid.to.toUpperCase() == userAccount.toUpperCase()) {
                        if(lastBid) {
                            if(bid.amount > lastBid.amount) {
                                lastBid = bid
                            }
                        } else {
                            lastBid = bid
                        }
                    }
                }
            })
        }
        return lastBid
    }
    const handleCloseSignature = async(signature) => {
        setOpenModalSignature(false)
        if(isUserSigned || signature) {
            console.log('bid userBid',userBid)
            await executeBid(userBid)
        }
    }

    const executeBid = async(value) => {

        try{
                setLoader(true)
                sendBid(tokenId,projectKey,cryptos[0],value,data.userAccount,data.provider)
                .on('sent', (sent) => {
                    console.log('sent',sent)
                })
                .on('transactionHash', (transactionHash) => {
                    console.log('Transaction hash ::', transactionHash)
                    localStorage.setItem('bidTx', transactionHash)
                    setBidTx({tx : transactionHash, bid : value})
                    setLoader(false)
                    setTimeout(() =>{
                        setLoader(false)
                        window.location.reload()
                    },1020)
                  }).on('error', (e)=> {
                    setLoader(false)
                    console.log('error::', e)
                  })
                return true
        }
        catch(e){
            console.log('Error try catch::',e)
            setLoader(false)
            alert('Error ::'+JSON.stringify(e))
        }
    }

    return (
        <Formik
            initialValues={{ bid: 0, currency: 'wavax' }}
            validationSchema={bidSchema}
            onSubmit={async(values) =>{
                setLoader(true)
                const balance = await getBalance(userAccount)
                console.log('values ::', values)
                setUserBid(values.bid)
                if(balance < values.bid) {
                    setLoader(false)
                    setOpenModalDeposit(true)
                }else {
                    if(values.bid > bid.amount) {
                        setUserBid(values.bid)
                        let wavaxBalance = await balanceOf(cryptos[0],userAccount);
                        if(wavaxBalance >= values.bid) {
                            let wavaxAllowance = await allowance(cryptos[0],userAccount,process.env.REACT_APP_EXCHANGE);
                            if(wavaxAllowance >= values.bid) {
                                //Efectuar bid
                                try{
                                    await executeBid(values.bid)
                                }
                                catch(error){
                                    console.log('error', error)
                                    setLoader(false);
                                }
                            } else {
                                setOpenModalSignature(true)
                                setLoader(false);
                            }
                        } else {
                            const newBalance = await getBalance(userAccount)
                            if(newBalance >= values.bid) {
                                setOpenModalDeposit(true)
                                setLoader(false);
                            }
                        }
                    }else {
                        setLessPrice(true)
                        setLoader(false);
                    }
                }
            }}
        >
            {({errors, touched})=>(
                <Form>
                    <Card sx={{ padding: '1rem' }}>
                        <PlaceBidContentBox>
                            {
                                data && data.userAccount && data.userAccount != null && data.userAccount != 'undefined' && data.userAccount != owner &&
                                <Box display='flex' flexDirection='column' width="100%">
                                    <PlaceBidInputNumber component='label' htmlFor='bid'>
                                        {t("component_place_bid.input_number")}
                                    </PlaceBidInputNumber>
                                    <TextField id='bid' type='number' name='bid' placeholder='0.00'  />
                                    <span style={{color:'#dc3545', fontSize:'12px'}}>
                                        {lastBidOfUser() &&
                                            `${t("component_place_bid.last_bid")} `+lastBidOfUser().amount+' WAVAX' 
                                        }
                                    </span>
                                    {errors.bid && touched.bid ? (
                                        <div style={{color:'#dc3545'}}>{errors.bid}</div>
                                    ) : null}
                                    {lessPrice ? (
                                        <div style={{color:'#dc3545'}}>{t("component_place_bid.input_number")} {bid && bid.amount}</div>
                                    ) : null}
                                </Box>
                            }
                        </PlaceBidContentBox>
                        <Box>
                            <Box component='p' sx={auctionMesaggeStyles}>
                                {t("component_place_bid.advice")} {bid && bid.amount} WAVAX
                            </Box>
                            {showCounter &&
                            <Box sx={{marginBottom:'0.2rem'}}>
                                <Box component='p' sx={auctionEndsTextStyles}>
                                    {t("component_place_bid.auction_ends")}
                                </Box> 
                                <Box display='flex' alignItems='center' sx={{gap:'1rem'}}>
                                    <Box className="notranslate" component='span' sx={counterStyle}>{((dateCounter.days *24) + dateCounter.hours).toFixed(0)} </Box>
                                    <Box component='span' sx={counterStyle}>{t("component_place_bid.hours")}</Box>
                                    <Box className="notranslate" component='span' sx={counterStyle}>{dateCounter.minutes}</Box>
                                    <Box component='span' sx={counterStyle}>{t("component_place_bid.minutes")}</Box>
                                    <Box className="notranslate" component='span' sx={counterStyle}>{dateCounter.seconds}</Box>
                                    <Box component='span' sx={counterStyle}>{t("component_place_bid.seconds")}</Box>
                                </Box>
                            </Box>}
                            {
                                data && data.userAccount && data.userAccount != null && data.userAccount != 'undefined' ?
                                    data && data.userAccount != owner &&
                                    <ButtonStyled type='submit' text={t("component_place_bid.bid_btn")} width='100%' />
                                :
                                <ButtonStyled onClick={()=>{setOpenWallet(true)}} text={"Connect wallet"} width='100%' />
                            }
                            
                        </Box>
                    </Card>
                    <LoaderModal isOpen={loader} textColor='#fff' text={`${t("sign_crypto.loading")}`} />
                    <ModalCustom width={800} isOpen={openModalSignature} onCloseModal={handleCloseSignature}>
                        <ShowSignCrypto 
                            userBid = {userBid}
                            address={cryptos[0]}
                            image={image}
                            isVideo={isVideo}
                            userSigned={setIsUserSigned} 
                            onClose={handleCloseSignature}
                            showButtonClose={false}
                        />
                    </ModalCustom>
                    <ModalCustom width={800} isOpen={openModalDeposit} onCloseModal={handleCloseDeposit}>
                        <ShowDepositCrypto
                            userBid = {userBid}
                            address={cryptos[0]}
                            image={image} 
                            isVideo={isVideo} 
                            userSigned={setIsDeposit} 
                            onClose={handleCloseDeposit}
                            showButtonClose={false}
                        />
                    </ModalCustom>
                </Form>
            )}
        </Formik>
    )
}

PlaceBid.propTypes = {
    tokenId: PropTypes.number,
    bid: PropTypes.object,
    projectKey: PropTypes.string,
    image: PropTypes.string.isRequired,
    isVideo: PropTypes.bool.isRequired,
    userAccount: PropTypes.string.isRequired,
    setBidTx: PropTypes.func,
    finishAuction: PropTypes.number.isRequired,
    bids : PropTypes.array,
    owner: PropTypes.any
    //reloadPage : PropTypes.func
}

export default PlaceBid
