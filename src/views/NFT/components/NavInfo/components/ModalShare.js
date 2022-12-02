import React, { useState } from 'react'
import { Box, Container, Modal, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import { AiFillCopy, AiOutlineTwitter } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import {SiDiscord} from 'react-icons/si';
import {
    ModalShareContainer,
    ModalShareContent,
    ModalShareContentButton,
    ModalShareContentSocialButton
} from './styled';
import Proptypes from 'prop-types'

const ModalShare = ({open, setOpen, url}) => {
    
    const { t } = useTranslation("translate");
    const handleClose = () => {
        setOpen(false)
        setTextCopied('');
    }

    const [textCopied,setTextCopied] = useState('');

    const handleCopy = () => {
        if('clipboard' in navigator) {
            navigator.clipboard.writeText(url);
            //setCopied(true)
        } else {
            document.execCommand('copy',true,url)
            //setCopied(true)
        }
        setTextCopied(t("modal_shared.copied_link_text"));
    }

    const handleTwitter = () => {
        window.open('https://twitter.com/intent/tweet?text=&url='+url,'_blank')
    }

    const handleTelegram = () => {
        window.open('https://t.me/share/url?text=&url='+url,'_blank')
    }
    const handleDiscord = () => {
        window.open('https://discord.com','_blank')
    }


    return (<>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <ModalShareContainer>
                <ModalShareContent>
                    <Box width="100%" justifyContent="flex-end">
                        <ModalShareContentButton  variant="contained"size="small" onClick={ () => handleClose()}>
                            <CloseIcon/>
                        </ModalShareContentButton>
                    </Box>
                    <Typography  variant="h5" color="#000" component="h2">
                        
                        {t("modal_shared.title")}
                    </Typography>
                    {url &&
                    <Typography  variant="h5" component="h4">
                        <Box sx={{display:'flex',justifyContent:'center'}}>
                            <Box  sx={{color:'#7a8088'}}>
                                {url.substring(0,10)}..{url.substring(url.length - 10, url.length)}
                            </Box>
                            <Box sx={{marginTop:'3px', marginLefet:'15px',color:'#000',cursor:'pointer'}}>
                                <AiFillCopy onClick={() => handleCopy()} size={22}  />
                            </Box>
                        </Box>
                    </Typography>
                    }
                    <center>
                        <Box sx={{height:'30px'}}>
                            { textCopied}
                        </Box>
                    </center>
                    <Container maxWidth="xl">
                        <Box sx={{ display:'flex', justifyContent:'center' }}>
                            <div style={{ padding : '2px' }}>
                                <ModalShareContentSocialButton
                                    size='small'
                                    variant="contained"
                                    onClick={() => handleTwitter()}
                                >
                                    <AiOutlineTwitter style={{ margin: '5px'}}  size={20}/>
                                </ModalShareContentSocialButton>
                            </div>
                            <div style={{padding : '2px'}}>
                                <ModalShareContentSocialButton size='small' onClick={() => handleTelegram()} variant="contained">
                                    <FaTelegramPlane style={{ margin: '5px'}}  size={20}/>
                                </ModalShareContentSocialButton>
                            </div>
                            <div style={{padding : '2px'}}>
                                <ModalShareContentSocialButton
                                    size='small'
                                    onClick={() => handleDiscord()}
                                    variant="contained"
                                >
                                    <SiDiscord style={{ margin: '5px'}}  size={20}/>
                                </ModalShareContentSocialButton>
                            </div>
                        </Box>
                    </Container>
                </ModalShareContent>
            </ModalShareContainer>
        </Modal>
    </>)
}
ModalShare.propTypes = {
    open : Proptypes.bool,
    setOpen : Proptypes.func,
    url : Proptypes.string
}
export default ModalShare;