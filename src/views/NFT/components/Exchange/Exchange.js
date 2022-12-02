import React, { useContext } from 'react';
import { CardMedia, Modal, Box, Container, Button, Grid } from '@mui/material';
import {HiOutlineArrowNarrowDown, HiOutlineArrowNarrowUp} from 'react-icons/hi';
import { useHistory, useLocation } from 'react-router-dom';
import NavButton from 'components/NavButton';
import { useTranslation } from 'react-i18next';
import { Context } from 'hooks/WalletContext';
import { safeApproveNFT } from 'services/web3/ERC1155/ApproveNFT';
import LoaderCircle from 'components/LoaderCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { validateRequestChange } from '../RequestChange/validateRequestChange';
import StepBar from 'components/StepBar';

const ValidateError = () => {
    const {t} = useTranslation("translate");
    return (
        <Box
            sx={{
                display:'flex',
                alignItems:'center',
                flexDirection:'column',
            }}
        >
            <ErrorIcon htmlColor='#ed2891' fontSize='large' />
            <h2>{t("nft-screen.modal_exchange.mobile.sign_error")}</h2>
        </Box>
    )
}

const Exchange = () => {
    const { t } = useTranslation("translate");
    const {state} = useLocation()
    const {goBack, push} = useHistory()
    const [approveButton, setApproveButton] = React.useState(!React.useState(Boolean(localStorage.getItem('sign_exchange'))))
    const [confirmButton, setConfirmButton] = React.useState(React.useState(Boolean(localStorage.getItem('sign_exchange'))))
    const [loader, setLoader] = React.useState(false)
    const [validOffer, setValidOffer] = React.useState(false)
    const [validateError, setValidateError] = React.useState(false)
    const [nStep,setNStep] = React.useState(0);
    const steps = [t("nft-screen.modal_exchange.sign_modal_btn"),t("nft-screen.modal_exchange.request_exchange_modal_btn")];
    const {nftImage, nftName, selectedCards, nftId, NFTurl} = state;
    const {data}= useContext(Context);

    const handleApproveButton = () => {
        setApproveButton(false)
        setValidateError(false)
        setLoader(true)
        if(data.provider && data.userAccount) {
            safeApproveNFT(data.userAccount,process.env.REACT_APP_EXCHANGE_CARD,data.provider,(success) => {
                console.log('success ::', success)
                setApproveButton(false)
                setLoader(false)
                setConfirmButton(true);
                setNStep(1);
            },(error) => {
                console.log('error ::', error)
                setLoader(false)
                setValidateError(true)
                setApproveButton(true)
                setConfirmButton(false)
            }, [nftId])

        }
    }
    if(state === undefined){
        return (
            <>
            <h1>{t("nft-screen.modal_exchange.mobile.session_expired")}</h1>
            <Box
                sx={{
                    display:'flex',
                    justifyContent:'center',
                    marginTop:'10px',
                }}
            >
                <NavButton text='Go back to gallery' path='/gallery' />
            </Box>
            </>
        )
    }
   
    console.log("nftID::", nftId);
    let ids = []
    selectedCards.forEach((nft) => {
        ids.push(nft.token_id)
    })
    let requestChange = {};
    requestChange.position = 1
    requestChange.timeLive = 100
    requestChange.startDate = new Date().getTime()
    requestChange.tx = 'VALIDATE'
    requestChange.tokensId = ids
    requestChange.tokenId = nftId
    requestChange.from = data.userAccount
    requestChange.to = data.userAccount
    validateRequestChange(requestChange).then((success) => { console.log('success', success)
        setValidOffer(success.data.valid)
    }).catch((error) => {
        console.log(error)
    })
    console.log('requestChange ::', requestChange)
    return (
        <Modal
            open={true}
            //onClose={()=>{setOpenModalTransfer(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                overflow:'auto',
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
                    minHeight: window.screen.height,
                    '@media screen and (max-width: 750px)': {
                        width: '100%',
                    }
                }}
            >
                <Box sx={{marginBottom:'15px'}}>
                    <center>
                        <StepBar nStep={nStep} steps={steps} />
                    </center>
                </Box>


                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <CardMedia
                        component='img'
                        image={nftImage}
                        alt={nftName}
                        sx={{
                            borderRadius:'8px',
                            width: '40%',
                        }}
                    />
                </Box>
                <Container 
                    maxWidth='sm' 
                    sx={{
                        textAlign:'center',
                        marginTop: '10px',
                        marginBottom: '10px',
                    }}
                >
                    <span><HiOutlineArrowNarrowDown size={40} /></span>
                    <span><HiOutlineArrowNarrowUp size={40} /></span>
                </Container>
                <Container 
                    maxWidth='lg'
                    sx={{
                        //border: '1px solid #ed2891',
                        //borderRadius:'8px',
                        //boxSizing: 'border-box',
                        //padding: '5px',
                        //height: '260px',
                    }}
                >
                    <Grid 
                        container 
                        rowSpacing={1} 
                        spacing={{ xs: 2, md: 3, lg: 4 }} 
                        columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                            sx={{
                            display:'flex',
                            flexWrapp: 'nowrap',
                            overflowX: 'auto',
                        }}
                    >
                        {selectedCards.map((card, index) => (
                            <Grid 
                                key={index} 
                                item 
                                xs={4} 
                                sm={4} 
                                md={6} 
                                lg={6}
                            >
                                <CardMedia
                                    component='img' 
                                    image={card.thumb_url_large}
                                    alt={card.metadata.json_data.name}
                                    sx={{
                                        borderRadius:'8px',
                                        marginRight:'5px',
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <p style={{color:'#ed2891', textAlign:'center'}}>
                    {t("nft-screen.modal_exchange.price_to_exchange_modal_text")}
                </p>

                <p style={{textAlign:'center'}}>
                    {
                        !validOffer && 
                        <b>{t("nft-screen.modal_exchange.mobile.already_offered")}</b>
                    }
                </p>
                {validateError && (<ValidateError />)}
                <Box
                    sx={{
                        display:'flex',
                        justifyContent:'space-around',
                    }}
                >
                   
                    {loader && (
                        <LoaderCircle text={t("message_loader.nft.exchange_validate_text")} />
                    )}
                    {approveButton && (<Button
                        disabled={!validOffer}
                        variant="contained"
                        onClick={handleApproveButton} 
                        sx={{
                            backgroundColor: '#ed2891',
                            width:'120px',
                            '&:hover': {
                                backgroundColor: '#F344A1',
                            },
                        }} 
                    >
                        {t("nft-screen.modal_exchange.mobile.sign_exchange")}
                    </Button>)}
                    {confirmButton && (<Button
                        //disabled={selectedCards.length===0}  
                        disabled={!validOffer}
                        variant="contained"
                        onClick={()=>push(`/confirm?${nftName}?confirm?cards${selectedCards}?id${nftId}`, {nftImage, nftName, selectedCards, nftId, NFTurl})} 
                        sx={{
                            backgroundColor: '#ed2891',
                            width:'120px',
                            '&:hover': {
                                backgroundColor: '#F344A1',
                            },
                        }} 
                    >
                        {t("nft-screen.modal_exchange.mobile.request_exchange")}
                    </Button>)}
                    {!loader && (<Button
                        variant="contained"
                        onClick={()=>goBack()} 
                        sx={{
                            backgroundColor: '#ed2891', 
                            width:'120px',
                            '&:hover': {
                                backgroundColor: '#F344A1',
                            },
                        }} 
                    >
                        {t("nft-screen.modal_exchange.mobile.cancel_exchange")}
                    </Button>)}
                </Box>
            </Box>
        </Modal>
    )
}

export default Exchange;