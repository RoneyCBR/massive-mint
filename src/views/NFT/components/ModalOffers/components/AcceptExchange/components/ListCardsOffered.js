import React,{useState} from 'react'
import {Grid,Box,Button,Card,CardMedia,Alert} from '@mui/material';
import PropTypes from 'prop-types';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { executeExchangeCard } from '../../../../../components/ExchangeCardContract/executeExchangeCard';
import { safeApproveNFT } from 'services/web3/ERC1155/ApproveNFT';
import { saveAcceptUpdateStatus } from '../../AcceptUpdateStatus/acceptUpdateStatus';
import {useTranslation} from 'react-i18next';
import styled from '@emotion/styled'
import { Link } from 'react-router-dom';
import StepBar from 'components/StepBar';
import { CircularProgress } from '@mui/material';
import { exchange } from 'services/Blockchain/ExchangeCrypto/exchange';
import { acceptCryptoRequest } from 'services/ExchangeCrypto/acceptCryptoRequest';
const AccountLink = styled(Link)`
    text-decoration: none;
    color: #ED2891;
    font-family: Courier, "Lucida Console", monospace;
    cursor: pointer;
`;

const ListCardsOffered = ({setAcceptOffer,sourceOffer,selected,data,nft,allOffers = [], setAllOffers}) => {

    const [txExchangeSuccess,setTxExchangeSuccess] = useState(false);
    const [txInit,setTxInit] = useState(false);
    const [txInit2,setTxInit2] = useState(false);
    const { t } = useTranslation("translate");
    const [initApprove,setInitApprove] = useState(false);
    const [initConfirm,setInitConfirm] = useState(false);
    const [btnApprove,setBtnApprove] = useState((localStorage.getItem('sign_exchange_approve') &&  localStorage.getItem('sign_exchange') && localStorage.getItem('sign_exchange_approve').includes('true')) && (localStorage.getItem('sign_exchange').includes('true')) )
    const [btnConfirm,setBtnConfirm] = useState(false);
    const [postTx,setPostTx] = useState('');
    const [msjError,setMsjError] = useState('');

    const [nStep,setNStep] = React.useState(0);
    const steps = [t("nft-screen.modal_exchange.sign_modal_btn"),t("nft-screen.modal_accept_exchange.exchange_modal_btn")];
    

    console.log('selected ::', selected)
    
    const handleClickInitApprove = ()=>{
        setMsjError('');
        setInitApprove(true);
        setTxInit(true);
        let bid = 0;
        try {
            bid = parseFloat(selected.amount)
        } catch (error) {
            bid = 0
        }
        let address = (bid && parseFloat(bid) > 0) ? process.env.REACT_APP_EXCHANGE_CRYPTO :process.env.REACT_APP_EXCHANGE_CARD
        safeApproveNFT(data.userAccount,address,data.provider,(success) => {
            console.log('approve success ::', success)
            if(bid && parseFloat(bid) > 0) {
                localStorage.setItem('sign_exchange_approve', JSON.stringify(true))
            }
            setInitApprove(false);
            setBtnApprove(true);
            setNStep(1);
        }, (error) => {
            console.log('error ::', error)
            if(error.code == '4001'){
                setMsjError(t("custom_error_metamask.cancel_transaction"));
            }else{
                setMsjError("Error: "+ error.message.substring(0,100));
            }
            setInitApprove(false);
            setTxInit(false)
            setNStep(0);
        }, [selected.id_token])
    }

    const handleClickInitTx = ()=>{
        setInitConfirm(true)
        setTxExchangeSuccess(false);
        setTxInit2(true);
        setAcceptOffer(false)
        if(data.provider && data.userAccount) {
            console.log('data::',data)
                let offersCopy = allOffers;
                if (selected.amount) {
                    if (parseFloat(selected.amount) >= 0) {
                        exchange(data.provider,data.userAccount,0.21,selected.from,selected.id_token,selected.position,(success) => {
                            console.log(' executeExchangeCard ::',success)
                            acceptCryptoRequest(selected.tx_request).then((success) => {
                                console.log('success ::',success)
                                let offer = offersCopy.find(x => x.position == selected.position)
                                if(offer) {
                                    let index = offersCopy.indexOf(offer)
                                    if (index >= 0) {
                                        offersCopy.splice(index,1)
                                        setAllOffers(offersCopy)
                                    }
                                }
                                setTxInit(true)
                                setTxExchangeSuccess(true)
                                setBtnConfirm(true)
                                setTxInit2(true);
                            }).catch((error) => {
                                console.log('error ::', error)
                                if(error.code == '4001'){
                                    setMsjError(t("custom_error_metamask.cancel_transaction"));
                                }else{
                                    setMsjError("Error: "+ error.message.substring(0,100));
                                }
                                setTxInit(false)
                                setInitConfirm(false)
                                setTxInit2(false);
                                setBtnApprove(Boolean(localStorage.getItem('sign_exchange')));
                            })
                            setPostTx(success.transactionHash);
                            setNStep(2);
                            setAcceptOffer(true)
                        }, (error) => {
                            console.log('error ::', error)
                            if(error.code == '4001'){
                                setMsjError(t("custom_error_metamask.cancel_transaction"));
                            }else{
                                setMsjError("Error: "+ error.message.substring(0,100));
                            }
                            setTxInit(false)
                            setInitConfirm(false)
                            setTxInit2(false);
                            setNStep(0);
                            setBtnApprove(Boolean(localStorage.getItem('sign_exchange')));
                            setAcceptOffer(false)
                        })
                    }

                } else {
                    executeExchangeCard(data.provider,data.userAccount,0.21,selected.from,selected.id_token,selected.position,(success) => {
                        console.log(' executeExchangeCard ::',success)
                        saveAcceptUpdateStatus(selected.tx_request).then((success) => {
                            console.log('success ::',success)
                            let offer = offersCopy.find(x => x.position == selected.position)
                            if(offer) {
                                let index = offersCopy.indexOf(offer)
                                if (index >= 0) {
                                    offersCopy.splice(index,1)
                                    setAllOffers(offersCopy)
                                }
                            }
                            setTxInit(true)
                            setTxExchangeSuccess(true)
                            setBtnConfirm(true)
                            setTxInit2(true);
                        }).catch((error) => {
                            console.log('error ::', error)
                            if(error.code == '4001'){
                                setMsjError(t("custom_error_metamask.cancel_transaction"));
                            }else{
                                setMsjError("Error: "+ error.message.substring(0,100));
                            }
                            setTxInit(false)
                            setInitConfirm(false)
                            setTxInit2(false);
                            setBtnApprove(Boolean(localStorage.getItem('sign_exchange')));
                        })
                        setPostTx(success.transactionHash);
                        setNStep(2);
                        setAcceptOffer(true)
                    }, (error) => {
                        console.log('error ::', error)
                        if(error.code == '4001'){
                            setMsjError(t("custom_error_metamask.cancel_transaction"));
                        }else{
                            setMsjError("Error: "+ error.message.substring(0,100));
                        }
                        setTxInit(false)
                        setInitConfirm(false)
                        setTxInit2(false);
                        setNStep(0);
                        setBtnApprove(Boolean(localStorage.getItem('sign_exchange')));
                        setAcceptOffer(false)
                    })
                }
        }
    }


    //3293 6366
    /*const [aux,setAux] = useState([]);
    const [first,setFirst] = useState(true);
    let cards = new Array();
    let filter = new Array();
    filter = selected.offers;
    cards = sourceOffer.cardsOffered.read()[0];
    console.log('offers selected ::',selected)*/

    //console.log("filter:::",filter.map((val)=>{return cards.filter((card) => card.token_id===val ) }) )

    //setAux(filter.filter((val) => val == cards.find((v) => {return v.token_id} ) ));
    // console.log("filter:::",filter)
    // console.log("filter cards:::",cards.find(() => card.token_id == filter[0]))



    //cards?.map((card)=>{
    //    let offer = filter.find(x => x == card.token_id);
    //    if(offer) {
    //        filter.splice(filter.indexOf(offer),1);
    //    }
    //})
/*
    if(first){
        // let arrTemp = new Array()
        // arrTemp = filter.map((val)=>{return cards.filter((card) => card.token_id===val ) });
        setAux(filter ? [...filter] : []);
        setFirst(false);
    }
   */


    return(
        <>
        <br/>
        <Box>
            <Box>
                <center>
                    <StepBar nStep={nStep} steps={steps}/>
                </center>
            </Box>
            <Box sx={{
                display:'flex',justifyContent:'center',
                }}
            >
            {msjError == '' ? btnApprove && !btnConfirm && '' :
                <Alert  severity="error">
                    {msjError}
                </Alert>
            }
            {btnConfirm && 
            <Alert severity={msjError == '' ? "success":"error"}>
                <a 
                    href={'https://polygonscan.com/tx/'+postTx} 
                    style={{textDecoration:'none', color:'green',height:'100%'}} 
                    target="_blank" rel="noreferrer"
                >
                    {t("nft-screen.modal_accept_exchange.transaction_modal_text")}: {(postTx).substring(0,8)+ '...' +(postTx).substring(58,66)}
                </a>
            </Alert>}
            </Box>
            <Grid container rowSpacing={1}  spacing={{ xs: 1, md: 1, lg: 1 }} columns={{xs: 12, sm: 12,md:12, lg:12 }}>
                <Grid item xs={12} sm={12} md={5} lg={5} sx={{display:'flex'}}>
                    <Box sx={{display:'grid',width:'100%',gridTemplateColumns:'repeat(1,1fr)'}}>
                        <Box>
                            <center> 
                                <h3>
                                    {t("nft-screen.modal_accept_exchange.offered_modal_text")+ ' '}
                                    {t("nft-screen.modal_accept_exchange.from_modal_text") + ' '}
                                    <AccountLink to={`/profile?address=${selected.from}`}>
                                        {selected.from.substring(0,5)+ '...'+(selected.from).substring(38,54)}
                                    </AccountLink>
                                </h3>
                            </center>
                        </Box>
                        <Grid 
                            container 
                            rowSpacing={1}
                            columns={{xs:12, sm: 12, md:12, lg:12}}
                            sx={{
                                height:'345px', 
                                border:'1px solid #E5E5E5',
                                borderRadius:'8px',
                            }}
                        >
                        {sourceOffer?.map((card, index) => (
                            <Grid key={index} item xs={3} sm={3} md={2.5} lg={2.5} sx={{marginTop:'0px'}}>
                                <Box 
                                    key={index} 
                                    sx={{
                                        padding:'5px 5px',
                                        '@media screen and (max-width: 800px)': {
                                            padding:'5px',
                                        }
                                    }}
                                >
                                    <Card sx={{borderRadius:'5px'}}>                     
                                        <CardMedia 
                                            sx={{objectFit:'cover'}}
                                            component="img"
                                            image={card.thumb_url_mini}
                                        />
                                    </Card>
                                </Box>
                            </Grid>
                        ))
                        }

             

                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={2} lg={2} 
                    sx={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        '@media screen and (max-width: 750px)': {
                            marginBottom:'30px'
                        }
                    }}
                >
                    <Grid container rowSpacing={1}  spacing={{ xs: 1, md: 1, lg: 1 }} columns={{xs: 12, sm: 12,md:12, lg:12 }}>
                        {nStep == 0 ? !txInit  ?
                        <Grid item xs={12} sm={12} md={12} lg={12}sx={{display:'flex',width:'100%',justifyContent:'center',marginLeft:'-10px'}} >
                            <CompareArrowsIcon sx={{fontSize:'80px',color:'#F344A1'}}/>
                        </Grid>
                        :
                        <>
                        <Grid item xs={12} sm={12} md={12} lg={12}sx={{display:'flex',width:'100%',justifyContent:'center',marginLeft:'-10px'}} >
                            <CircularProgress 
                                sx={{
                                    color: '#ED2891',
                                    marginLeft:'-9px'
                                }}
                                />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} sx={{display:'flex',width:'100%',justifyContent:'center',color: '#ED2891'}} >
                            <h3 style={{marginLeft:'-20px'}}>{t('gallery.loading')}</h3>
                        </Grid>
                        </>        
                        :
                        nStep == 1 ? txExchangeSuccess ?
                        <>
                        <Grid item xs={12} sm={12} md={12} lg={12}sx={{display:'flex',width:'100%',justifyContent:'center',marginLeft:'-10px'}} >
                            <CheckCircleIcon color='success' sx={{fontSize:'80px'}} />
                        </Grid>
                        </>
                        :
                        txInit2  ? 
                        <>
                            <Grid item xs={12} sm={12} md={12} lg={12}sx={{display:'flex',width:'100%',justifyContent:'center',marginLeft:'-10px'}} >
                                <CircularProgress 
                                    sx={{
                                        color: '#ED2891',
                                        marginLeft:'-9px'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} sx={{display:'flex',width:'100%',justifyContent:'center',color: '#ED2891'}} >
                                <h3 style={{marginLeft:'-20px'}}>{t('gallery.loading')}</h3>
                            </Grid>
                        </>  
                        :
                        <>
                            <Grid item xs={12} sm={12} md={12} lg={12}sx={{display:'flex',width:'100%',justifyContent:'center',marginLeft:'-10px'}} >
                                <CheckCircleIcon color='success' sx={{fontSize:'80px'}} /> 
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}sx={{display:'flex',width:'100%',justifyContent:'center',marginLeft:'-10px'}} >
                                {t('nft-screen.modal_exchange.sign_success_text')}
                            </Grid>
                        </>
                        :
                        nStep == 2 &&
                        <>
                            <Grid item xs={12} sm={12} md={12} lg={12}sx={{display:'flex',width:'100%',justifyContent:'center'}} >
                                <CheckCircleIcon color='success' sx={{fontSize:'80px'}} /> 
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}sx={{display:'flex',width:'100%',justifyContent:'center'}} >
                                {t('nft-screen.modal_accept_exchange.success_exchange_modal_text')}
                            </Grid>
                        </>                                            
                        }
                    </Grid>   
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5}  >
                    <Box sx={{display:'grid',width:'100%',gridTemplateColumns:'repeat(1,1fr)'}}>
                        <Box>
                            <center><h3>{t("nft-screen.modal_accept_exchange.for_modal_text")}</h3></center>
                        </Box>
                        <Grid 
                            container 
                            rowSpacing={1}
                            columns={{xs:12, sm: 12, md:12, lg:12}}
                            sx={{
                                height:'345px', 
                                border:'1px solid #E5E5E5',
                                borderRadius:'8px',
                            }}
                        >
                            <Grid item xs={3} sm={3} md={2.5} lg={2.5} sx={{marginTop:'0px'}}>
                                <Box 
                                    sx={{
                                        padding:'5px 5px',
                                        '@media screen and (max-width: 800px)': {
                                            padding:'5px',
                                        }
                                    }}
                                >
                                        <Card sx={{borderRadius:'5px'}}>                     
                                            <CardMedia 
                                                sx={{objectFit:'cover'}}
                                                component="img"
                                                image={nft.thumb_resize}
                                            />
                                        </Card>
                                </Box>
                            </Grid>
                                                            
                        </Grid>
                    </Box>
                </Grid>     
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{display:'flex',justifyContent:'center',marginTop:'15px',
                    '@media screen and (max-width: 750px)':{
                        marginBottom:'15px'
                    }}} >
                    {!btnApprove ?
                    <Button  hidden
                        variant="contained" 
                        onClick={handleClickInitApprove}
                        disabled = {initApprove || selected.status == 1 || selected.offers.length == 0}
                        sx={{marginRight:'5px',backgroundColor: '#ed2891', '&:hover': {
                            backgroundColor: '#F344A1',
                        }}} 
                    >
                         {t("nft-screen.modal_accept_exchange.sign_modal_btn")}
                    </Button>
                    :
                    <Button  
                        variant="contained" 
                        onClick={handleClickInitTx}
                        disabled = {initConfirm}
                        sx={{marginRight:'5px',backgroundColor: '#ed2891', '&:hover': {
                            backgroundColor: '#F344A1',
                        }}} 
                    >
                        {t("nft-screen.modal_accept_exchange.exchange_modal_btn")}
                    </Button>
                    }
                    { /*
                    <Button  variant="contained" 
                        //disabled = {initConfirm || initApprove || selected.offers.length == 0}
                        //onClick={handleCloseModalAcceptExchange}
                        sx={{
                            marginRight:'5px',
                            backgroundColor: '#ed2891', 
                            '&:hover': {
                                backgroundColor: '#F344A1',
                            }
                        }} 
                    >
                        {t("nft-screen.modal_accept_exchange.cancel_modal_btn")}
                    </Button>
                    */}
                </Grid>
            </Grid>
        </Box>


</>
    )

}

ListCardsOffered.propTypes = {
    sourceOffer: PropTypes.object,
    selected: PropTypes.object,
    data: PropTypes.object,
    nft: PropTypes.object,
    allOffers : PropTypes.array,
    setAllOffers : PropTypes.func,
    setAcceptOffer : PropTypes.func
}


export default ListCardsOffered;
