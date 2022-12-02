import React, { useContext, useEffect, useState } from 'react';
import { CardMedia, Container, Grid, Box, Tabs, Tab, Alert, Card } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useFetch } from 'hooks/useFetch';
import BuyNow from 'views/NFT/components/BuyNow';
import { Context } from 'hooks/WalletContext';
import PlaceBid from 'views/NFT/components/PlaceBid';
import MakeOffer from 'views/NFT/components/MakeOffer';
import { useTranslation } from 'react-i18next';
import LoaderCircle from 'components/LoaderCircle';

const Offer = () => {
    const  { t } = useTranslation("translate");
    const  { data:account } = useContext(Context);
    const [tab, setTab] = useState(0);
    const [bidTx ,setBidTx] =  useState(null);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const address = query.get('address');
    const tokenId = query.get('token_id');
    const url = process.env.REACT_APP_URL_API+`/nft?address=${address}&token_id=${tokenId}&domain=${process.env.REACT_APP_DOMAIN}`
    const  { loading, data, error } = useFetch(url);
    const historyUrl = process.env.REACT_APP_URL_API+`/history?domain=${process.env.REACT_APP_DOMAIN}&token_id=${tokenId}&address=${address}&blockchain=${process.env.REACT_APP_NETWORK_NAME}`;
    const { data:dataHistory } = useFetch(historyUrl);
    useEffect(() => {
        if (!address || !tokenId) return window.location.href = '/';
    }, []);
    const handleChangeValue = (event, newValue) => {
        setTab(newValue);
    };
    const reloadPage = () => {
        window.location.reload();
    }
    if (loading) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
                <LoaderCircle text={t('message_loader.loading')} />
            </Box>
        );
    }
    if (error) return <div>Error: {error.message}</div>;
    return (
        <Container maxWidth="xl" sx={{ margin: '10px auto 50px' }}>
            <Container maxWidth="sm">
                <Box component="h1" sx={{textAlign: 'center' }}>{t("offer_view.title")}</Box>
            </Container>
            {bidTx && (
                <Container maxWidth="xs" sx={{margin:'0 auto', marginBottom:'5px'}}>
                    <Alert severity="success">
                        Oferta existosa de {bidTx.bid} WAVAX ! Esta pagina se actualizará en 2 segundos
                        <a style={{textDecoration:'none',color:'green'}} href={`${process.env.REACT_APP_SCAN}tx/${bidTx.tx}`} target="_blank" rel="noreferrer">
                            {(bidTx.tx).substring(0,8)+ '...' +(bidTx.tx).substring(58,66)}
                        </a>
                    </Alert>
                </Container>
            )}
            {data && data[0] && account && account.userAccount && (
                <Grid container spacing={3} columns={{ xs: '12', sm: '12', md: '12', lg: '12', xl: '12' }}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Card>
                            <CardMedia 
                                //onClick={() => setOpenImage(true)}
                                component={data[0].metadata.is_video ? "video" :"img"}
                                src={data[0].metadata.json_data.image} 
                                alt={data[0].metadata.json_data.name}
                                autoPlay
                                loop
                                controls
                                sx={{
                                    cursor: 'pointer',
                                    width: '100%',
                                    objectFit:'100%',
                                    borderRadius: '8px 8px 8px 8px',
                                    "&:fullScreen":{
                                        objectFit:'contain !important',
                                        borderRadius: 'none !important',
                                        width: '500px !important',
                                        height: '500px !important',
                                        overflow: 'hidden !important'
                                    }
                                }}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Tabs value={tab} onChange={handleChangeValue} aria-label="basic tabs example">
                            <Tab disableRipple label={t("offer_view.tabs.make_offer")} />
                            {data[0].on_auction && (
                                <Tab value={1} disableRipple label={t("offer_view.tabs.place_bid")} />
                            )}
                            {data[0].on_sale && (
                                <Tab value={2} disableRipple label={t("offer_view.tabs.buy_now")} />
                            )}
                        </Tabs>
                        {tab === 0 && (
                            <Container maxWidth="sm" sx={{margin: {xs: '50px auto 0px', md: '50px auto 5px'}}}>
                                <MakeOffer
                                    projectKey={data[0].project_key} 
                                    userAccount={account && account.userAccount}
                                    image={data[0].thumb_url_large}
                                    isVideo={data[0].metadata.json_data.isVideo ? true : false}
                                />
                            </Container>
                        )}
                        {tab === 1 && (
                            <Container maxWidth="sm" sx={{margin: {xs: '50px auto 0px', md: '50px auto 5px'}}}>
                                <PlaceBid
                                    reloadPage = {reloadPage}
                                    setBidTx = {setBidTx}
                                    bid = {data[0].last_bid}
                                    tokenId = {data[0].token_id}
                                    projectKey={data[0].project_key}
                                    userAccount={account && account.userAccount}
                                    image={data[0].thumb_url_large}
                                    isVideo={data[0].metadata.json_data.isVideo ? true : false}
                                    bids={dataHistory}
                                    finishAuction={data[0].auction.finish_date}
                                />
                            </Container>
                        )}
                        {tab === 2 && (
                            <Container maxWidth="sm" sx={{margin: {xs: '50px auto 0px', md: '50px auto 5px'}}}>
                                <BuyNow
                                    projectKey={data[0].project_key} 
                                    userAccount={account && account.userAccount}
                                    image={data[0].thumb_url_large}
                                    isVideo={data[0].metadata.json_data.isVideo ? true : false}
                                />
                            </Container>
                        )}
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default Offer;