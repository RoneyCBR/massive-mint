import React, { useState, useContext } from 'react'
import { Box, Button, Modal, Typography, Alert } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import LoadGif from 'assets/images/load.gif';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { safeTransferNFT } from 'services/web3/ERC1155/transferNFT';
import { cancelAllRequests } from '../ModalOffers/components/cancelAllRequests/cancelAllRequests';
import { cancelAllCryptoRequests } from 'services/ExchangeCrypto/cancelAllCryptoRequests';
import { updateOwner } from 'services/Blockchain/updateOwner';
import Web3 from 'web3';
import { Context } from 'hooks/WalletContext';
import { ModalTransferContainer, ModalTransferContentButton, ModalTransferContent } from './styled';
import PropTypes from 'prop-types'

const ModalTransfer = ({open, onClose, nft}) => {
    const { data } = useContext(Context);
    const { t }=useTranslation("translate")
    const [error,setError]=useState('');
    const [posTx,setPosTX]=useState('');
    const [loadTransfer,setLoadTransfer]=useState(false);
    const [transferSuccess,setTransferSuccess]=useState(false);
    const [transferBtn,setTransferBtn]=useState(false);
    const [transfer,setTransfer]=useState('');
    const handleChange = (e) =>{
        e.preventDefault();
        setError(''); 
        let value = e.target.value;
        setTransfer(value);
        console.log(Web3.utils.isAddress(value))
        if(!Web3.utils.isAddress(value)) {
            setError('This address is not valid');
        }
        console.log(transfer);  
    }
    const handleClose = () => {
        setLoadTransfer(false);
        setTransferSuccess(false);
        setTransferBtn(false);
        onClose();
    }
    const handleSafeTransfer = async() => {
        setError('')
        setPosTX('')
        setLoadTransfer(true)
        setTransferSuccess(false);
        if(data && data.provider) {
            if(!Web3.utils.isAddress(transfer)) {
                setError('This address is not valid');
                setLoadTransfer(false)
                setTransferSuccess(false);
            } else {
                safeTransferNFT(data.userAccount,nft.project_key,transfer,data.provider,nft.token_id,(receipt) => {
                    try {
                        cancelAllRequests(nft.token_id).then(() => { 
                            cancelAllCryptoRequests(nft.token_id).then(() => {    
                                setPosTX(receipt.transactionHash)
                                setLoadTransfer(false)
                                setTransferSuccess(true);
                            }).then((error) => {console.log(error)})
                        }).then((error) => {console.log(error)})
                        updateOwner(nft.token_id,transfer).then((success) => {console.log(success)}).then((error) => { console.log(error)})
                    } catch (error) {
                        console.log(error)
                    }
                    nft.owner = data.userAccount
                },(error) => {
                    console.log('error ::', error.message)
                    if(error.code == '4001'){
                        setError(t("custom_error_metamask.cancel_transaction"));
                    }else{
                        setError("Error: "+ error.message.substring(0,100));
                    }
                    setLoadTransfer(false)
                    setTransferSuccess(false);
                    
                })
            }
        } else {
            setError('The provider is not ready, try later')
            setLoadTransfer(false)
            setTransferSuccess(false);
        }
    }

    return (
        <Modal
            open={open}
            onClose={()=>onClose(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <ModalTransferContainer>
                <ModalTransferContent>
                    <Box sx={{
                        display:'flex',
                        width:'100%',
                        justifyContent:'flex-end'
                    }}>
                    <ModalTransferContentButton
                        variant="contained" 
                        size="small"
                        onClick={() => handleClose()}
                    >
                        <CloseIcon/>
                    </ModalTransferContentButton>
                    </Box>
                    <Typography variant="h5" component="h2" >
                        {t("nft-screen.nft-screen.transfer_modal_title")}
                    </Typography>
                    <Typography variant="h4" component="h2" sx={{color:'#000',marginTop:'2rem'}}>
                        {nft.metadata.json_data.name}
                    </Typography>
                    <Box sx={{display:'flex',justifyContent:'center'}}>
                        { (error != '') &&
                            <Alert severity="error"> {error}!</Alert>
                        }
                        { (posTx != '') &&
                            <Alert severity="success">
                                <a style={{textDecoration:'none',color:'green'}} href={'https://polygonscan.com/tx/'+posTx} target="_blank" rel="noreferrer">
                                   {t("nft-screen.modal_exchange.transaction_modal_text")}: {(posTx).substring(0,8)+ '...' +(posTx).substring(58,66)}
                                </a>
                            </Alert>
                        }
                    </Box>
                    {!transferSuccess &&
                        <>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <input 
                                    disabled = {loadTransfer} 
                                    type="tel" 
                                    value={transfer} 
                                    onChange={handleChange} 
                                    placeholder="Address of user"
                                    style={{
                                        padding:'10px',
                                        border:'solid 2px #191F8E',
                                        borderRadius:'10px',
                                        width:'100%',
                                        textAlign:'center'
                                    }}
                                />
                            </Typography>   
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {
                                    transferBtn ? 
                                    <>
                                        <Box>{t("nft-screen.nft-screen.text_1_2_modal")}</Box>
                                        <Box>{t("nft-screen.nft-screen.text_2_2_modal")}</Box>
                                        <Box sx={{marginTop:'10px'}}>
                                            <Button  variant="contained" color='inherit'
                                                disabled = {(transfer == '' || loadTransfer )}
                                                onClick={ () => handleSafeTransfer()}
                                                endIcon={(transferSuccess ? <CheckCircleIcon color='#000' sx={{background:'#fff',color:'#000',borderRadius:'50%',padding:'none',margin:'none'}} />:"")}
                                            >
                                                {t("nft-screen.nft-screen.transfer_modal_button")}
                                                {loadTransfer &&
                                                    <img style={{width:'20px',height:'20px',marginLeft:'5px'}} src={LoadGif}/>
                                                }
                                            </Button>
                                        </Box>
                                    </>
                                    :
                                    <Button variant="contained" color='inherit'
                                        disabled = {(transfer == '' || loadTransfer )}
                                        onClick={ () => setTransferBtn(true)}
                                    >
                                        {t("nft-screen.nft-screen.transfer_modal_button")}
                                    </Button>
                                }
                            </Typography>
                        </>
                    }
                    
                    { /*transferSuccess &&
                        <>
                        <Typography  sx={{ mt: 2 }}>
                           <a style={{color:'#F344A1'}} href={'https://polygonscan.com/tx/'+posTx} target="_blank" rel="noreferrer">{t("nft-screen.nft-screen.view_in_polygonscan_text")}</a>
                        </Typography>
                        </>*/
                    }
                </ModalTransferContent>
            </ModalTransferContainer>
        </Modal>
    )
}

ModalTransfer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    nft: PropTypes.object.isRequired,
}

export default ModalTransfer