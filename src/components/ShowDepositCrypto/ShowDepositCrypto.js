import React, { useContext, useState } from 'react'
import ButtonStyled from 'components/ButtonStyled'
import { Box, CardMedia, Button } from '@mui/material'
import { Context } from 'hooks/WalletContext';
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next';
import LoaderModal from 'components/LoaderModal';
import { deposit } from 'services/WAVAX/deposit';
import PropTypes from 'prop-types'


const ShowDepositCrypto = ({image, userBid, isVideo, address, userSigned, onClose, showButtonClose}) => {
    const { t } = useTranslation("translate")
    const { data } = useContext(Context);
    const [loader, setLoader] = useState(false)
    const handleClickSign = async() => {
        setLoader(true)
        try {
            deposit(data.userAccount, userBid,address,data.provider).on('transactionHash', (transactionHash) => {
                 console.log('deposit end', transactionHash)
                 userSigned(true);
                 setLoader(false)
                 onClose(true);
            }).on('error', (e)=> {
                 console.log('Error ::',e)
                 setLoader(false)
                 alert('Error ::'+JSON.stringify(e))
            })
        } catch (e) {
            console.log('Error try catch::',e)
            setLoader(false)
            alert('Error ::'+JSON.stringify(e))
        }
    }
    const handleCloseModal = () => {
        onClose(false);
    }
    return (
        <>
        {showButtonClose &&
        <Box
            display='flex' 
            justifyContent='flex-end' 
            alignItems='flex-start' 
            sx={{width:'100%'}}
        >
            <Button type='button' onClick={handleCloseModal}> 
                <CloseIcon />
            </Button>
        </Box>}
        <Box 
            display='flex' 
            alignItems='center'
            justifyContent='center'
            sx={{
                gap: '5rem',
                '@media screen and (max-width: 360px)': {
                    flexDirection: 'column'
                }
            }}
        >
            <CardMedia
                component={isVideo ? 'video' : 'img'}
                src={image}
                alt='NFT'
                muted
                loop
                autoPlay
                sx={{
                    borderRadius: '10px',
                    width: '25%',
                    height: '25%',
                }}
            />
            <Box sx={{width:'300px', display:'flex', flexDirection:'column', gap:'1rem'}}>
                <Box
                    display='flex' 
                    justifyContent='center'  
                    flexDirection='column'
                    alignItems='center'
                >
                    <Box component='h2' sx={{textAlign:'center', width:'80%'}} severity='success'>
                       {t("modal_deposit.convert")} {userBid} {t("modal_deposit.to_avax")}
                    </Box>  
                </Box>
                <Box sx={{padding:'1rem', fontSize:'15px'}}>
                    {t("modal_deposit.you_need")} {userBid} {t("modal_deposit.make_bid")}
                </Box>
                <Box display='flex' justifyContent='center' sx={{gap:'1rem'}}>
                    <ButtonStyled type='button' onClick={() => handleClickSign()} text={t("modal_sign_premission.sign_btn")} />
                    <ButtonStyled type='button' onClick={()=>onClose(false)} text={t("modal_sign_premission.cancel_btn")} />
                </Box>
            </Box>
            <LoaderModal isOpen={loader} textColor='#fff' text={`${t("sign_crypto.loading")}`} />
        </Box>
        </>
    )
}

ShowDepositCrypto.defaultProps = {
    showButtonClose: true
}

ShowDepositCrypto.propTypes = {
    userBid: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    address: PropTypes.string,
    isVideo: PropTypes.bool.isRequired,
    userSigned: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    showButtonClose: PropTypes.bool
}

export default ShowDepositCrypto