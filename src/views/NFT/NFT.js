import React, { lazy, Suspense,useState } from 'react'
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next'; 
import ErrorBoundary from './components/ErrorBoundary'
import ErrorMessage from 'components/ErrorMessage';
import { useFetch } from 'hooks/useFetch';
import Details from './components/Details';
import OfferHistory from 'components/OfferHistory';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LoaderCircle from 'components/LoaderCircle';
import { isMinted } from 'services/ERC721/isMinted';
import { ConteinerHeader, ContentBox, ContentBoxLoader, NFTContainer, NFTTitle } from './Styled';
const NFTData = lazy(() => import('./components/NFTData'));
const NavInfo = lazy(() => import('./components/NavInfo'));

const NFT = () => {
    const { t } = useTranslation("translate"); 
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const address = query.get("address")
    const tokenId = query.get("token_id")
    const [bidTx ,setBidTx] =  useState(null)
    const NFTurl = location.search
    const [url,setUrl]= useState(process.env.REACT_APP_URL_API+`/nft?address=${address}&token_id=${tokenId}&domain=${process.env.REACT_APP_DOMAIN}`)
    const [historyUrl,setHistoryUrl] = useState(process.env.REACT_APP_URL_API+`/history?domain=${process.env.REACT_APP_DOMAIN}&token_id=${tokenId}&address=${address}&blockchain=${process.env.REACT_APP_NETWORK_NAME}`) 
    const [countError1,setCountError1] = useState(0);
    const [countError2,setCountError2] = useState(0);
    const {data, error, loading} = useFetch(url,countError1)
    const {data:dataHistory, error:errorHistory, loading:loadingHistory} = useFetch(historyUrl,countError2)
    
    const reloadPage = () => {
        window.location.reload();
    }

    React.useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    let timeOut1 = null ;
    React.useEffect(() => {
        timeOut1 = null;
        clearTimeout(timeOut1)
        setUrl(process.env.REACT_APP_URL_API+`/nft?address=${address}&token_id=${tokenId}&domain=${process.env.REACT_APP_DOMAIN}`)
        if(!loading && error) {
            if(countError1 < 3){
                timeOut1 = setTimeout(() =>{
                    setCountError1(countError1+1)
                    clearTimeout(timeOut1)
                    return null;
                },5000);
               
            }else{
                return null;
            }
        }
    },[error,countError1,loading]);

    let timeOut2 = null ;
    React.useEffect(() => {
        timeOut2 = null;
        clearTimeout(timeOut2)
        setHistoryUrl(process.env.REACT_APP_URL_API+`/history?domain=${process.env.REACT_APP_DOMAIN}&token_id=${tokenId}&address=${address}&blockchain=${process.env.REACT_APP_NETWORK_NAME}`)
        if(!loadingHistory && errorHistory) {
            if(countError2 < 3){
                timeOut2 = setTimeout(() =>{
                    setCountError2(countError2+1)
                    clearTimeout(timeOut2)
                    return null;
                },5000);
               
            }else{
                return null;
            }
        }
    },[errorHistory,countError2,loadingHistory]);
    
    return (
        <NFTContainer component='section'>
            <ErrorBoundary fallback={<ErrorMessage error={""}/>}>
                <Suspense fallback={<div></div>}>
                    {(loading || loadingHistory || countError1 < 3) && !data && (
                        <ContentBoxLoader>
                            <LoaderCircle text={t('message_loader.nft_screen.loading')} />
                        </ContentBoxLoader>
                    )}
                    {error && (countError1 == 3) ? <ErrorMessage error={error} /> :
                      errorHistory &&  (countError2 == 3) && <ErrorMessage error={errorHistory} />
                    }
                    {bidTx &&
                    <Container maxWidth="xs" sx={{margin:'0 auto', marginBottom:'5px'}}>
                        <Alert severity="success">
                            {t('nft-screen.successful_offer')} {bidTx.bid} WAVAX ! {t('nft-screen.reload_message')}
                            <a style={{textDecoration:'none',color:'green'}} href={`${process.env.REACT_APP_SCAN}tx/${bidTx.tx}`} target="_blank" rel="noreferrer">
                                {(bidTx.tx).substring(0,8)+ '...' +(bidTx.tx).substring(58,66)}
                            </a>
                        </Alert>
                    </Container>}
                    {
                        data && data.length == 0 &&
                        <ContentBox>
                            <Typography variant='h4' sx={{color:'#A658D8',fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>
                                {t("explore.not_found")}
                            </Typography>
                        </ContentBox>
                    }
                    {data && dataHistory && data.length > 0 && 
                    <NFTData
                        bids = {dataHistory}
                        setBidTx = {setBidTx}
                        address={address}
                        tokenId={tokenId}
                        nft={data[0]}
                        reloadPage = {reloadPage}
                        NFTurl={NFTurl}
                    />}
                    {data && data.length > 0 && data[0] && data[0].reveal.confirmed && isMinted(data[0]) && (<NavInfo nft={data[0]} />)}
                    <Container maxWidth='lg'>
                        <Grid container columns={{lg:12, md:12}}>
                            <Grid item lg={6} md={6} sm={1} xs={1}>
                                <ConteinerHeader maxWidth='lg'>
                                    {data && data.length > 0 &&  data[0] && data[0].reveal.confirmed && isMinted(data[0]) && (
                                        <Box>
                                            <NFTTitle>{t('nft_details.title')}</NFTTitle>
                                            <Divider />
                                            <Container maxWidth='lg' sx={{marginTop:'2rem'}}>
                                                <Details content={data[0]} />
                                            </Container>
                                        </Box>
                                    )}
                                </ConteinerHeader>
                            </Grid>
                            <Grid item lg={6} md={6} sm={1} xs={1} sx={{marginBottom:'2rem'}}>
                                <Container maxWidth='sm'>
                                    {dataHistory != null && dataHistory && data && data[0] && data instanceof Array &&  data[0] && data[0].reveal.confirmed && isMinted(data[0]) &&
                                    <Box>
                                        <NFTTitle>{t('trading_history.title')}</NFTTitle>
                                        <Divider />
                                        <Container maxWidth='lg' sx={{marginTop:'2rem'}}>
                                            <OfferHistory content={dataHistory} />
                                        </Container>
                                    </Box>}
                                </Container>
                            </Grid>
                        </Grid>
                    </Container>
                </Suspense>
            </ErrorBoundary>
        </NFTContainer>
    );
}

export default NFT;
