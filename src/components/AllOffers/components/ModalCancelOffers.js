import React ,{ useState } from 'react';
import { Modal,Box,Button,Alert } from '@mui/material';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close'
import { sign } from "services/Blockchain/signMessage";
import { useTranslation } from 'react-i18next';
import { cancelAllByIds } from 'services/cancelAllRequests/cancelAllByIds';
import LoaderCircle from 'components/LoaderCircle';

const ModalCancelOffers = ({openModalCancel,arrChecked,setOpenModalCancel,address,data,textCancel}) => {
    const { t } = useTranslation("translate");
    const [initCancel, setInitCancel] = useState(false);
    const [error, setError] = useState(false);
    const [msg,setMsg] = useState('');
    const [successCancel, setSuccessCancel] = useState(false);
    

    const handleCloseModal = () =>{
        if(successCancel){
            window.location.reload();
        }else{
            setOpenModalCancel(false)
        }
       
    }

    const handleCancelOffers = () => {
        console.log("arrChecked::",arrChecked)
        setMsg('')
        setError(false);
        setSuccessCancel(false);
        let requestIDS = []
        arrChecked.map((val) => {
            if(val.check){
                requestIDS.push(val.name)
            }
        })
        
        if(requestIDS.length > 0) {
            setInitCancel(true)
            sign(address,data.provider,textCancel,"cancel").then((response) => {
                console.log("response::",response) 
                setError(false);
                cancelAllByIds(requestIDS).then((success) => {
                    console.log(success)
                    setInitCancel(false)
                    setError(false);
                    setMsg(t('all_offers.cancel_success_text'))
                    setSuccessCancel(true);
                },(error) => {
                    console.log(error)
                    setInitCancel(false)
                    setMsg(error.message)
                    setError(true);
                })        
            }).catch((error) => {
                console.log('error ::', error)
                setMsg(error.message);
                setInitCancel(false)
                setError(true);
            })

        }
    }

    return (
        <Modal
            open={openModalCancel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                overflowY: 'none',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                
            }}
        >
            <Box
                sx={{
                    width: 700,
                    margin: '0 auto',
                    bgcolor: 'background.paper',
                    border: '2px solid #E5E5E5',
                    borderRadius:'8px',
                    boxShadow: 24,
                    p: 4,
                    '@media screen and (max-width: 700px)': {
                        width: '100%',
                        padding: '10px 0px',
                
                    }
                }}
            >
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',padding:'10px 0px',position:'relative'}}>
                    <Box sx={{marginTop:'20px'}}>
                    {
                        textCancel
                    }
                    </Box>

                    <Box sx={{position:'absolute',top:'0',right:'0'}}>
                        <Button 
                            variant="contained" 
                            size="small"
                            onClick={()=>handleCloseModal()}
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
                
                {   initCancel &&
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',padding:'10px 0px'}}>
                        <LoaderCircle text={"loading"} />
                    </Box>
                }

                {
                    msg !== '' &&
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',padding:'10px 0px'}}>
                        <Alert severity={error ? "error":"success"} >
                            {msg}
                        </Alert>
                    </Box>
                }
                

                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',padding:'10px 0px'}}>
                    <Button 
                        disabled ={initCancel}
                        sx={{
                            marginRight:'5px',backgroundColor: '#ed2891',color:'#fff',
                            '&:hover': {
                                backgroundColor: '#F344A1',
                            }
                        }} 
                        onClick={()=>handleCancelOffers()}
                    >
                        {t("all_offers.cancel_yes_text")}
                    </Button>
                    
                    <Button
                        disabled ={initCancel}
                         sx={{
                            marginRight:'5px',backgroundColor: '#ed2891',color:'#fff',
                            '&:hover': {
                                backgroundColor: '#F344A1',
                            }
                        }} 
                        onClick={()=>handleCloseModal()}
                    >
                        {t("all_offers.cancel_no_text")}
                    </Button>
                </Box>

            </Box>
        </Modal>
    );
};

ModalCancelOffers.propTypes = {
    openModalCancel: PropTypes.bool.isRequired,
    address: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    textCancel: PropTypes.string.isRequired,
    setOpenModalCancel: PropTypes.func.isRequired,
    arrChecked: PropTypes.array.isRequired
};

export default ModalCancelOffers;