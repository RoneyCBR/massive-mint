import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import {ImTwitter, ImTelegram, ImFacebook2} from 'react-icons/im';
import {MdContentCopy} from 'react-icons/md'
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: window.screen.width > 650 ? 500 : window.screen.width,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

const inputStyle = {
    width: '80%'
}

const Share = ({shareModal, text, setOpenShareModal}) => {
    const [isCopied, setIsCopied] = useState(false)
    const handleClickText =()=>{
        console.log('click text');
        setIsCopied(true)
    }
    return (
        <Modal
            open={shareModal}
            //onClose={()=>{setOpenModalTransfer(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                overflow:'auto',
            }}
        >
            <Box
                sx={style}
            >
                <Button 
                    variant="contained" 
                    size="small"
                    onClick={()=>{setOpenShareModal(false)}}
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
                <h2 style={{textAlign:'center'}}>Share</h2>
                {isCopied && <p style={{textAlign:'center'}}>copied!</p>}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '25px',
                    }}
                >
                    {text && <input type="text" value={text} style={inputStyle} />}
                    {text && <MdContentCopy onClick={handleClickText} style={{cursor:'pointer', marginLeft:'5px'}} size={20} />}
                </Box>
                <Grid container rowSpacing={1} spacing={{xs: 2, sm: 2, md: 2}} columns={{xs: 12, sm: 12, md: 12}}>
                    <Grid item xs={4} sm={4} md={4}>
                        <ImTwitter style={{cursor:'pointer'}} size={40} />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                        <ImTelegram style={{cursor:'pointer'}} size={40} />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                        <ImFacebook2 style={{cursor:'pointer'}} size={40} />
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

Share.propTypes = {
    shareModal: PropTypes.bool.isRequired,
    setOpenShareModal: PropTypes.func.isRequired,
    text: PropTypes.string,
}

export default Share;