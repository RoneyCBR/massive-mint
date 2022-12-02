import React from 'react';
import { Modal, Box, Container, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';


const ModalCustom = ({children, title, isOpen, onCloseModal, width,height})=>{
    return (
        <Modal
            open={isOpen}
            //onClose={()=>{setOpenModalTransfer(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            
        >
            <Box 
                sx={{
                    width: width ? width : 1100,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    border: '2px solid #E5E5E5',
                    borderRadius:'8px',
                    boxShadow: 24,
                    p: 4,
                    overflow:'auto',
                    ["@media (max-width:1000px)"]:{
                        width: '100%',
                        height: height ? height:'100%'
                    }
                }}
            >
                <Container component='header'>

                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        position:'relative'
                    }}>
                    
                        <Box 
                            sx={{
                                position:'relative',
                                width: '100%',
                                height: '100%'
                            }}
                        > 
                            <Box 
                                sx={{
                                    display:'flex',
                                    alignItems:'flex-end',
                                    justifyContent:'center',
                                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif',
                                    fontSize:{xs:'25px',sm:'25px',md:'25px',lg:'25px',xl:'30px'},
                                    fontWeight:'bold'
                                }}
                            >
                                {title}
                            </Box>
                        </Box>

                        <Box sx={{position:'absolute',top:'0',right:'0'}}>
                            <Button 
                                variant="contained" 
                                size="small"
                                onClick={()=>onCloseModal(!isOpen)}
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
                   
                </Container>
               
                {children}
            </Box>
        </Modal>
    )
}



ModalCustom.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    onCloseModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    width: PropTypes.any,
    height: PropTypes.any
}

export default ModalCustom;