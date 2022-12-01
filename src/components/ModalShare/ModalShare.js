import React, { useState } from 'react'
import { Box, Button, Container, Modal, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close'
import { AiFillCopy, AiOutlineTwitter } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import {SiDiscord} from 'react-icons/si';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #E5E5E5',
    borderRadius:'8px',
    boxShadow: 24,
    p: 4,
};

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
        } else {
            document.execCommand('copy',true,url)
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
            aria-describedby="modal-modal-description">
                <Box sx={{ ...style, width: 500,
                '@media screen and (max-width: 750px)': {
                    width: '100%'
                }}}>
                    <Box sx={{
                        display: 'grid',
                        width:'100%',
                        gridTemplateColumns:'repeat(1,1fr)',
                        textAlign:'center'
                    }}>
                        <Box sx={{
                            display:'flex',
                            width:'100%',
                            justifyContent:'flex-end'
                        }}>
                            <Button  variant="contained" 
                                sx={{
                                    background:"gray",
                                    borderRadius:"20px 20px 20px 20px",
                                    fontSize:"15px",
                                    "&:hover":{
                                        background:"black"
                                    }
                                }}
                                size="small"
                                onClick={ () => handleClose()}
                            >
                                <CloseIcon/>
                            </Button>
                        </Box>
                        <Typography  variant="h5" color="#000" component="h2">
                            {t("modal_shared.title")}
                        </Typography>
                        <Typography  variant="h5" component="h4">
                            <Box sx={{display:'flex',justifyContent:'center'}}>
                                <Box  sx={{color:'#7a8088'}}>
                                    {url.substring(0,10)}..{url.substring(url.length - 10,url.length)}
                                </Box>
                                <Box sx={{marginTop:'3px', marginLeft:'15px',color:'#000',cursor:'pointer'}}>
                                    <AiFillCopy onClick={() => handleCopy()} size={22}  />
                                </Box>
                            </Box>
                        </Typography>
                        <center>
                            <Box sx={{height:'30px'}}>
                                { textCopied}
                            </Box>
                        </center>
                        <Container maxWidth="xl">
                            <Box
                            sx={{
                                display:'flex',
                                justifyContent:'center',
                            }}>
                                <div style={{padding : '2px'}}>
                                    <Button
                                        size='small'
                                        onClick={() => handleTwitter()}
                                        sx={{
                                            minWidth:'50px',
                                            maxHeight:'30px',
                                            marginTop:'5px',
                                            backgroundColor: '#00acee',
                                            '@media screen and (max-width: 920px)': {
                                                width:'50%',
                                                marginTop:'5px',
                                                marginLeft:'0px'
                                        }
                                        }}
                                        variant="contained"
                                    >
                                        <AiOutlineTwitter style={{ margin: '5px'}}  size={20}/>
                                    </Button>
                                </div>
                                <div style={{padding : '2px'}}>
                                    <Button
                                        size='small'
                                        onClick={() => handleTelegram()}
                                        sx={{
                                            minWidth:'50px',
                                            maxHeight:'30px',
                                            marginTop:'5px',
                                            backgroundColor: '#0088cc',
                                            '@media screen and (max-width: 920px)': {
                                                width:'50%',
                                                marginTop:'5px',
                                                marginLeft:'0px'
                                        }
                                        }}
                                        variant="contained"
                                    >
                                        <FaTelegramPlane style={{ margin: '5px'}}  size={20}/>
                                    </Button>
                                </div>
                                <div style={{padding : '2px'}}>
                                    <Button
                                        size='small'
                                        onClick={() => handleDiscord()}
                                        sx={{
                                            minWidth:'50px',
                                            maxHeight:'30px',
                                            marginTop:'5px',
                                            backgroundColor: '#5865f2',
                                            '@media screen and (max-width: 920px)': {
                                                width:'50%',
                                                marginTop:'5px',
                                                marginLeft:'0px'
                                        }
                                        }}
                                        variant="contained"
                                    >
                                        <SiDiscord style={{ margin: '5px'}}  size={20}/>
                                    </Button>
                                </div>
                            </Box>
                        </Container>
                    </Box>
                </Box>
        </Modal>
    </>)    
}
ModalShare.propTypes = {
    open : PropTypes.bool,
    setOpen : PropTypes.func,
    url : PropTypes.string
}
export default ModalShare;