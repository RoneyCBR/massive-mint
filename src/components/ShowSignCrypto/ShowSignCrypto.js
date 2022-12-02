import React, { useContext, useState } from 'react'
import ButtonStyled from 'components/ButtonStyled'
import { Box, CardMedia, Button, Alert, Container } from '@mui/material'
import { Context } from 'hooks/WalletContext';
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next';
import { approve } from 'services/WAVAX/approve';
import LoaderModal from 'components/LoaderModal';
import PropTypes from 'prop-types'

const ShowSignCrypto = ({image, isVideo,userBid, address, userSigned, onClose, showButtonClose}) => {
    const { t } = useTranslation("translate")
    const { data } = useContext(Context);
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)
    const [tx, setTx] = useState('')
    const [success, setSuccess] = useState(false)
    const handleClickSign = async() => {
        setLoader(true)
        try{
            console.log('userBid of sign ::', userBid, address,process.env.REACT_APP_EXCHANGE)
            approve(data.userAccount,process.env.REACT_APP_EXCHANGE, userBid,address,data.provider)
              .on('transactionHash', (transactionHash) => {
                console.log('Transaction hash ::', transactionHash)
                setError(false)
                userSigned(true);
                setLoader(false)
                setSuccess(true)
                onClose(true);
              })
              .on('error', (e)=> {
                console.log('error::', e)
                setSuccess(false)
                setLoader(false)
                setError(true)
                setTx(e.message)
              })
        }
        catch(e){
            console.log('error::', e)
            setSuccess(false)
            setLoader(false)
            setError(true)
            setTx(e.message)
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
        <Container maxWidth='sm' sx={{marginBottom:'5px'}}>
            {error && 
            <Alert  severity="error">
                {tx}
            </Alert>}
            {success &&
            <Alert severity="success">
                <a style={{textDecoration:'none',color:'green'}} href={`${process.env.REACT_APP_SCAN}tx/${tx}`} target="_blank" rel="noreferrer">
                    {(tx).substring(0,8)+ '...' +(tx).substring(58,66)}
                </a>
            </Alert>}
        </Container>
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
                        {t("modal_sign_premission.title")}
                    </Box>
                    { success &&
                        <Alert severity="success">
                            {t("sign_crypto.successful_sign")}
                        </Alert>

                    }
                </Box>
                <Box sx={{padding:'1rem', fontSize:'15px'}}>
                    {t("sign_crypto.sign")}
                </Box>
                <Box display='flex' justifyContent='center' sx={{gap:'1rem'}}>
                    <ButtonStyled type='button' onClick={handleClickSign} text={t("modal_sign_premission.sign_btn")} />
                    <ButtonStyled type='button' onClick={()=>onClose(false)} text={t("modal_sign_premission.cancel_btn")} />
                </Box>
            </Box>
            <LoaderModal isOpen={loader} textColor='#fff' text={`${t("sign_crypto.loading")}`} />
        </Box>
        </>
    )
}

ShowSignCrypto.defaultProps = {
    showButtonClose: true
}

ShowSignCrypto.propTypes = {
    userBid: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    address: PropTypes.string,
    isVideo: PropTypes.bool.isRequired,
    userSigned: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    showButtonClose: PropTypes.bool
}

export default ShowSignCrypto