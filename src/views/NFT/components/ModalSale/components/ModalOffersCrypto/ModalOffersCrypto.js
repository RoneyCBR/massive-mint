import React, { useEffect, useState } from 'react';
//import { Button, CardMedia, Container, Modal, Box, Grid } from '@mui/material';
//import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next';
//import wmaticLogo from 'assets/logos/wmatic-logo.svg'
//import cotorro from 'assets/images/cotorro.jpg' 
import ModalCustom from 'components/ModalCustom';
import ModalGridContainer from 'components/ModalGridContainer';
import StepBar from 'components/StepBar';
import Proptypes from 'prop-types'
import { Box } from '@mui/material';


const ModalOffersCrypto =({
    isOpenModalOfferCrypto, 
    setIsOpenModalOfferCrypto, 
    dataNFTS, 
    offers,
    isUserOwner,
    OffersSelected,
    getAllOffers,
    setAllOffers

    //isVideo
})=>{
    const { t } = useTranslation("translate")
    const [isOfferMatic, setIsOfferMatic]=useState(false)
    //const [cryptoOffers, setCryptoOffers] = React.useState([]);
    const [isProgressBar, setIsProgressBar] = React.useState(false);
    const nftData = dataNFTS[0]
    useEffect(()=>{
        //OffersSelected?.offers.length === 0 ? setIsOfferMatic(true) : setIsOfferMatic(false)
        setIsOfferMatic(false)
        console.log('cryptoOffersss::', offers)
        setIsProgressBar(false)
    },[])
    /* console.log('dataNFTS::',dataNFTS)
    const nftData = dataNFTS[0]
    {selectedCards.length}/6
    const CloseOffersModalCrypto = () => {
        setIsOpenModalOfferCrypto(false)
    } */
    /* if(offers.length === 0){
        return (
            <div>loading...</div>
        )
    } */
    return ( 
        <ModalCustom
            title={t("modal_accept_crypto.title")}
            isOpen={isOpenModalOfferCrypto}
            onCloseModal={setIsOpenModalOfferCrypto}
        >
            {/* {isProgressBar && (<StepBar nStep={2} steps={['sign', 'bid']} />)} */}
            {isProgressBar &&(<Box
                component='div'
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <StepBar nStep={2} steps={['sign', 'bid']} />
            </Box>)}
            <ModalGridContainer
                nft={nftData}
                image={nftData.thumb_resize}
                isUserOwner={isUserOwner}
                isOfferMatic={isOfferMatic}
                getAllOffers = {getAllOffers}
                setAllOffers = {setAllOffers}
               // functionName={functionName}
                setIsOpenModalOfferCrypto={setIsOpenModalOfferCrypto}
                offers={offers}
                OffersSelected={OffersSelected}
            />
        </ModalCustom>
    )
}

ModalOffersCrypto.propTypes = {
    isOpenModalOfferCrypto: Proptypes.bool.isRequired,
    setIsOpenModalOfferCrypto: Proptypes.func.isRequired,
    dataNFTS: Proptypes.array.isRequired,
    offers: Proptypes.array,
    isUserOwner: Proptypes.bool,
    //functionName: Proptypes.func,
    getAllOffers : Proptypes.func,
    OffersSelected: Proptypes.array,
    setAllOffers : Proptypes.func
    //isVideo: Proptypes.bool.isRequired,
}


export default ModalOffersCrypto;