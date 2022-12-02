import React ,{useContext, useEffect} from 'react';
import { Modal, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import { AcceptExchange, TableOffers } from './components';
import { allRequestChangeByTokenId } from '../RequestChange/allRequestChangeByTokenId';
import {useTranslation} from 'react-i18next';
import { CircularProgress } from '@mui/material';
import { Context } from 'hooks/WalletContext';
//import { ModalOffersCrypto } from '../ModalBid/components';
import PropTypes from 'prop-types';



const Spinner = () => {
    const { t } = useTranslation("translate");
    return(
        <Box
            sx={{
                textAlign: 'center',
                marginTop: '2rem',
                color: '#000'
            }}
        >
            <CircularProgress
                sx={{
                    color: '#000',
                }}
            />
            <h3>{t('gallery.loading')}...</h3>
        </Box>
    )
}


const ModalOffers = ({
    openModalOffers, 
    setOpenModalOffers, 
    dataNFTS, 
    offers,
    setIsOpenModalOfferCrypto,
    isOpenModalOfferCrypto,
    setOffersSelected
}) => {
    const {data}=useContext(Context);
    const { t } = useTranslation("translate");
    const [showTableOffers, setShowTableOffers] = React.useState(true);
    const [showAcceptExchange, setShowAcceptExchange] = React.useState(false);
    const [showOffercrypto, setShowOffercrypto] = React.useState(false); 
    const [allOffers, setAllOffers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const [loadOffers,setLoadOffers] = React.useState(false);


    const getOffers = () =>{
        if(dataNFTS.length <= 0) return null;

        setLoadOffers(true)
        allRequestChangeByTokenId(dataNFTS[0].token_id).then((success) =>{
            console.log('debug success today :: ', success.data)
            setAllOffers(success.data)
            console.log('debug success nft offers:',allOffers);

        }).finally((success) =>{
            console.log(success);
            setLoadOffers(false)
        })
        .catch((error) => {
            console.log('error ::', error)
            setLoadOffers(false)
        })
    }

    useEffect(() => {
        let temp = 22;
        
        //if(allOffers.length == 0){
            getOffers();
       //}
        if(temp == -22){
            console.log("success modal offers::" ,offers);
            console.log("success modal alloffers::" , allOffers);
            console.log("s::" , showOffercrypto);
            console.log('selecteredFRom::', selected?.from)
        }
        
        if(!isOpenModalOfferCrypto){
            setShowTableOffers(true);
            setShowAcceptExchange(false);
        }
        if(!AcceptExchange){
            setShowTableOffers(true);
            setIsOpenModalOfferCrypto(false);
        }
        if(!AcceptExchange && !isOpenModalOfferCrypto){
            setShowTableOffers(true);
        }
    //     //console.log('Data nfts ::',dataNFTS)
    //     // setShowTableOffers(true);
    //     // setShowAcceptExchange(false);
    //     // if(first) {
    //     //     getAllOffers()
    //     // }
    },[isOpenModalOfferCrypto]);
    
    return (
        <>
        {showTableOffers && (
        <Modal
            open={openModalOffers}
            onClose={() => setOpenModalOffers(false)}
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
                    display: openModalOffers ? 'block' : 'none',
                    width: window.screen.width < 800 ? window.screen.width : 900,
                    margin: '0 auto',
                    bgcolor: 'background.paper',
                    border: '2px solid #E5E5E5',
                    borderRadius:'8px',
                    boxShadow: 24,
                    p: 4,
                    //minHeight: window.screen.height,
                    '@media screen and (max-width: 750px)': {
                        width: '100%',
                        padding: '10px 0px',              
                    }
                }}
            >
                <Box sx={{
                    '@media screen and (max-width: 750px)': {
                        width: '100%',
                        padding: '20px 0px',
                        height: "100vh"
                    }
                  }}
                >
                    <Box sx={{
                        position:'relative'
                    }}>
                        <Box sx={{'@media screen and (max-width: 360px)': {
                                    fontSize: '12px'
                                }}}> 
                            <center>
                                <h2>
                                    {t("table-section.exchange.table_title")}
                                </h2>
                            </center>
                        </Box>

                        <Box sx={{position:'absolute',top:'0',right:'0'}}>
                            <Button 
                                variant="contained" 
                                size="small"
                                onClick={()=>setOpenModalOffers(false)}
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
                    
                    {
                        loadOffers ? <Spinner/>:
                        <TableOffers 
                            setShowAcceptExchange={setShowAcceptExchange} 
                            setShowTableOffers={setShowTableOffers} 
                            allOffers = {allOffers}
                            setSelected = {setSelected}
                            dataNFTS={dataNFTS}
                            data={data}
                            setAllOffers = {setAllOffers}
                            getAllOffers = {getOffers}
                            setIsOpenModalOfferCrypto = {setIsOpenModalOfferCrypto}
                            setShowOffercrypto={setShowOffercrypto}
                            setOffersSelected={setOffersSelected}
                        />
                    }
                   
                   
                </Box>
            </Box>
        </Modal>)}
        {/* <ModalOffersCrypto
            isOpenModalOfferCrypto={false}
            setIsOpenModalOfferCrypto={setShowOffercrypto}
            dataNFTS={dataNFTS}
            //isVideo={nft.metadata.json_data.isVideo ? true : false}
            data={data}
            selected={selected}
            allOffers={allOffers}
            setAllOffers={setAllOffers}
            isisUserOwner={true}
            functionName={()=>console.log("functionName")}
        /> */}
        {showAcceptExchange && (
            <AcceptExchange 
                data={data} 
                setShowAcceptExchange={setShowAcceptExchange} 
                setShowTableOffers={setShowOffercrypto} 
                dataNFTS={dataNFTS} 
                selected={selected}
                allOffers={allOffers}
                setAllOffers={setAllOffers}
            />)}
        </>
    )
}

ModalOffers.propTypes = {
    openModalOffers: PropTypes.bool.isRequired,
    dataNFTS: PropTypes.array.isRequired,
    setOpenModalOffers: PropTypes.func.isRequired,
    data: PropTypes.object,
    offers : PropTypes.array,
    setIsOpenModalOfferCrypto : PropTypes.func,
    isOpenModalOfferCrypto : PropTypes.bool,
    setOffersSelected : PropTypes.func
}

export default ModalOffers;