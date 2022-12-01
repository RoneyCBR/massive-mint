import React, {Suspense } from 'react'
import { Box,Button, Modal} from '@mui/material';
import {useTranslation} from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
//import {fetchCardOffered} from './fetchCardOffered'
import ListCardsOffered from './components/ListCardsOffered';
import ErrorBoundary from 'components/ErrorBoundary';
import LoaderCircle from 'components/LoaderCircle'


const AcceptExchange = ({dataNFTS, setShowTableOffers, setShowAcceptExchange, selected, data, allOffers = [], setAllOffers,setOpenModalOffers}) => {
    const nft = dataNFTS[0]
    //let sourceOffer = fetchCardOffered(selected.from);
    let sourceOffer = selected.nft_offers;
    console.log(nft + data)
    const { t } = useTranslation("translate");
    const [acceptOffer,setAcceptOffer] = React.useState(false);
    const handleCloseModalAcceptExchange = ()=>{
        if(acceptOffer){
            setShowTableOffers(false);
            setShowAcceptExchange(false);
            setOpenModalOffers(false); 
        }else{
            setShowTableOffers(true);
            setShowAcceptExchange(false);
        }
    }
   
    return (
        <Modal
            open={setShowAcceptExchange}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
            }}
        >
            <Box sx={{
                width: 1100,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                border: '2px solid #E5E5E5',
                borderRadius:'8px',
                boxShadow: 24,
                padding:'20px',
                p: 4,
                '@media screen and (max-width: 1100px)':{
                    width:'100%',
                },
                '@media screen and (max-width: 700px)':{
                    width:'100%',
                    height:'100vh'
                },
                overflowY:'auto'
            }}
            >
                <Box 
                    sx={{
                        width:'100%',
                        position:'relative',
                        marginBottom:'25px',
                        '@media screen and (max-width: 750px)': {
                            marginBottom:'5px'
                        },
                    }}
                >
                    <Box sx={{

                        '@media screen and (max-width: 360px)': {
                            fontSize: '12px',
                            marginBottom:'10px'
                        },
                        
                    }} > 
                        <center>
                            <h2>{t("nft-screen.modal_accept_exchange.sub_title_modal_text")}</h2>    
                        </center>
                    </Box>

                    <Box  sx={{
                        position:'absolute',
                        top:'0',
                        right:'-4px'
                    }}>
                        <Button 
                            variant="contained" 
                            size="small"
                            onClick={handleCloseModalAcceptExchange}
                            sx={{
                                width:'33px',
                                background:"gray",
                                borderRadius:"20px 20px 20px 20px",
                                float:'center',
                                "&:hover":{
                                background:"black"
                                }
                                // '@media screen and (max-width: 360px)': {
                                //     maxWidth:'33px',
                                //     minWidth:'33px',
                                // }
                            }}
                        >
                            <CloseIcon />
                        </Button>
                    </Box>
                </Box>
                
                <Box>
                <ErrorBoundary>
                    <Suspense fallback={<Box sx={{
                        display:'flex',alignItems:'center',justifyContent:'center',height:'100%',width:'100%'}}>  <LoaderCircle text={t("message_loader.loading")} /></Box>}>
                        <ListCardsOffered setAcceptOffer={setAcceptOffer} sourceOffer={sourceOffer} selected={selected} data={data} nft={nft} allOffers={ allOffers} setAllOffers = {setAllOffers}/>
                    </Suspense>
                </ErrorBoundary>
                </Box>
              
            </Box>
        </Modal> 
    );
}

AcceptExchange.propTypes = {
    dataNFTS: PropTypes.array,
    setShowAcceptExchange: PropTypes.func,
    setShowTableOffers: PropTypes.func,
    selected : PropTypes.object,
    data : PropTypes.object,
    allOffers : PropTypes.array,
    setAllOffers : PropTypes.func,
    setOpenModalOffers : PropTypes.func
}


export default AcceptExchange;
