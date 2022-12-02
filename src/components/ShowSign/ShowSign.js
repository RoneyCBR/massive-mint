import React, { useContext, useState } from 'react'
import ButtonStyled from 'components/ButtonStyled'
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { Context } from 'hooks/WalletContext';
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next';
import LoaderModal from 'components/LoaderModal';
import { setApprovedForAll } from 'services/ERC721/setApprovedForAll';
import PropTypes from 'prop-types'

const ShowSign = ({image, isVideo, projectKey, userSigned, onClose, showButtonClose}) => {
    const { t } = useTranslation("translate")
    const { data } = useContext(Context);
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const handleClickSign = () => {
        setLoader(true)
        setApprovedForAll(data.userAccount,process.env.REACT_APP_EXCHANGE,projectKey,data.provider)
        .then(res=>{
            console.log('from signde::', res)
            setMessage(res.transactionHash)
            setSuccess(true)
            setLoader(false)
            userSigned(true)
            setError(false)
            localStorage.setItem('lastTx', res.transactionHash)
            localStorage.setItem('lastTxWho','Success signature! Now you can sale or create an auction')
        })
        .catch(err=>{
            setError(true)
            setMessage(err.message)
            setLoader(false)
            userSigned(false)
        })
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
                {error && 
                <Alert  severity="error">
                    {message}
                </Alert>}
                {(success && message.length>0) &&
                <Alert severity="success">
                    {(message).substring(0,8)+ '...' +(message).substring(58,66)}
                </Alert>}
                <Box
                    display='flex' 
                    justifyContent='center'  
                    flexDirection='column'
                    alignItems='center'
                >
                   
                    <Box component='h2' sx={{textAlign:'center', width:'80%'}} severity='success'>
                        {t("modal_sign_premission.title")}
                    </Box>  
                </Box>
                <Box sx={{padding:'1rem', fontSize:'15px'}}>
                    {t("modal_sign_premission.subtitle_one")}
                    <span style={{marginLeft:'5px'}}>{t("modal_sign_premission.subtitle_two")}</span>
                </Box>
                <Box display='flex' justifyContent='center' sx={{gap:'1rem'}}>
                    <ButtonStyled type='button' onClick={handleClickSign} text={t("modal_sign_premission.sign_btn")} />
                    <ButtonStyled type='button' onClick={()=>onClose(false)} text={t("modal_sign_premission.cancel_btn")} />
                </Box>
            </Box>
            <LoaderModal isOpen={loader} textColor='#fff' text={t("message_loader.loading")} />
        </Box>
        </>
    )
}

ShowSign.defaultProps = {
    showButtonClose: true
}

ShowSign.propTypes = {
    image: PropTypes.string.isRequired,
    projectKey: PropTypes.string,
    isVideo: PropTypes.bool.isRequired,
    userSigned: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    showButtonClose: PropTypes.bool
}

export default ShowSign