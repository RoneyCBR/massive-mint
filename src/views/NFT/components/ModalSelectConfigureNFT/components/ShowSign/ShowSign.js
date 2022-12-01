import React, { useContext } from 'react'
import ButtonStyled from 'components/ButtonStyled'
import { Box, CardMedia, Button } from '@mui/material'
import { sign } from 'services/Utils/signature';
import { Context } from 'hooks/WalletContext';
import CloseIcon from '@mui/icons-material/Close'
import { FaSignature } from 'react-icons/fa'
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types'

const ShowSign = ({image, isVideo, userSigned, onClose}) => {
    const { t } = useTranslation("translate")
    const { data } = useContext(Context);
    const handleClickSign = () => {
        sign('', data.userAccount, data.provider).then(res => {
            console.log(res)
            userSigned(true);
            localStorage.setItem('isUserSigned', true);
        })
        .catch(err => console.error(err))
    }
    const handleCloseModal = () => {
        onClose(false);
    }
    return (
        <>
        <Box
            display='flex' 
            justifyContent='flex-end' 
            alignItems='flex-start' 
            sx={{width:'100%'}}
        >
            <Button type='button' onClick={handleCloseModal}> 
                <CloseIcon />
            </Button>
        </Box>
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
                </Box>
                <Box sx={{padding:'1rem', fontSize:'15px'}}>
                    {t("modal_sign_premission.subtitle_one")}
                    {t("modal_sign_premission.subtitle_two")}
                </Box>
                <Box display='flex' justifyContent='center' sx={{gap:'1rem'}}>
                    <ButtonStyled type='button' onClick={handleClickSign} text={t("modal_sign_premission.sign_btn")} />
                    <ButtonStyled type='button' onClick={()=>onClose(false)} text={t("modal_sign_premission.cancel_btn")} />
                </Box>
            </Box>
        </Box>
        </>
    )
}

ShowSign.propTypes = {
    image: PropTypes.string.isRequired,
    isVideo: PropTypes.bool.isRequired,
    userSigned: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ShowSign