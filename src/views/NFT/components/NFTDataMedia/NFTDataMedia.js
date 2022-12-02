import React, { useContext, useEffect, useState } from 'react'
import { Box, Grid, Typography, Container, ListItemText, Tab } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Context } from 'hooks/WalletContext';
import { DrawerMobileContext } from 'hooks/DrawerMobileContext';
import ButtonStyled from 'components/ButtonStyled'; 
import BuyNow from '../../components/BuyNow';
import PlaceBid from '../../components/PlaceBid';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import TabPanel from './components/TabPanel';
import { isMinted } from 'services/ERC721/isMinted';
import {
    DataMediaContentBox,
    DataMediaContent,
    DataMediaContentTab,
    DataMediaContentChildren,
    DataMediaContentTypograthy,
    DataMediaContentCard
} from './styled';
import PropTypes from 'prop-types';

const NFTDataMedia = ({
    nft, 
    setBidTx, 
    bids, 
    reloadPage,
    children  
    }) => {
    const {data} = useContext(Context);
    const { t } = useTranslation("translate");
    const {setOpenWallet} = useContext(DrawerMobileContext);
    const [arrow, setArrow]=useState(false);
    const [value, setValue] = React.useState(0);
    const handleOpenDrawerWallet = ()=>{
        setOpenWallet(true);
        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden';
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [activeAllFunctions,setActiveAllfunctions] = useState(false);

    useEffect(()=>{
        setActiveAllfunctions(false);
        if(nft){
            if(nft.on_sale && nft.on_auction){
                setValue(0);
            }
            if(nft.on_sale && !nft.on_auction){
                setValue(1);
            } 
            if(!nft.on_sale && nft.on_auction){
                setValue(0);
            } 
        }
    },[])

    function MaysFirstLetter(string){
        let replace = String(string).toLowerCase();
        return replace.charAt(0).toUpperCase() + replace.slice(1);
    }

    console.log('nft buttons 1', nft)
    return (
        <Box
             sx={{
                width: '100%',
                color:'#fff'
            }}
        >
            <DataMediaContent>
                {  nft &&  nft.reveal.confirmed &&  isMinted(nft)  ?
                    <Typography gutterBottom variant="h4" component="h4" sx={{color:'#000'}}>
                        {nft && nft.metadata && nft.metadata.json_data.name ?
                            <p style={{marginTop:'10px'}}>{nft && nft.metadata && nft.metadata.json_data.name}</p>
                            :  nft && nft.metadata && nft.metadata.json_data.attributes.map((attribute) => (
                                attribute.trait_type == 'Name' && <p style={{marginTop:'10px'}}>{attribute.value}</p>
                            ))
                        }
                    </Typography> :
                   <Typography gutterBottom variant="h4" component="h4" >{t("nft-screen.name_not_available")}</Typography>
                }

                { activeAllFunctions && nft && (nft.on_sale || nft.on_auction) && nft && nft.transaction && nft.reveal.confirmed &&  isMinted(nft)  && 
                <>
                <DataMediaContentBox>
                    <DataMediaContentTab value={value} onChange={handleChange} aria-label="basic tabs example">
                        {
                            nft && nft.transaction && nft.reveal.confirmed &&  isMinted(nft)  && (nft && nft.on_auction && nft.auction && !nft.auction.finish_date && nft.auction.start_date &&  (nft.auction.start_date + nft.auction.time_live) >= Math.floor(Date.now() / 1000) ||
                            nft && nft.on_auction && nft.auction && nft.auction.finish_date && nft.auction.finish_date >= Math.floor(Date.now() / 1000)) ?
                            <Tab
                                sx={{display:nft && nft.on_auction ? 'block':'none'}} 
                                value={0}
                                disableRipple 
                                label={t("nft-screen.tabs.offer_title")}
                            />
                            :''
                        }
                        <Tab
                            sx={{
                                display: nft && nft.on_sale && nft && nft.reveal.confirmed && nft.reveal.reveal_date_time > (new Date().getTime() / 1000)   ? 'block':'none'
                            }} 
                            value={1}
                            disableRipple 
                            label={t("nft-screen.tabs.buy_title")}
                        />
                    </DataMediaContentTab>
                </DataMediaContentBox>
                {                    
                   activeAllFunctions && nft && nft.transaction && nft.reveal.confirmed &&  isMinted(nft)  && (nft && nft.on_auction && nft.auction && !nft.auction.finish_date && nft.auction.start_date &&  (nft.auction.start_date + nft.auction.time_live) >= Math.floor(Date.now() / 1000) ||
                   nft && nft.on_auction && nft.auction && nft.auction.finish_date && nft.auction.finish_date >= Math.floor(Date.now() / 1000)) ?
                    <TabPanel value={value} index={0}>
                        {nft.on_auction && (
                        <Container maxWidth='sm' sx={{marginTop: '30px'}}>
                            <PlaceBid
                                reloadPage = {reloadPage}
                                setBidTx = {setBidTx}
                                bid = {nft && nft.last_bid}
                                tokenId = {nft && nft.token_id}
                                projectKey={nft && nft.project_key} 
                                userAccount={data && data.userAccount}
                                bids = {bids}
                                image={nft && nft.thumb_url_large && nft.thumb_url_large}
                                isVideo={nft && nft.metadata && nft.metadata.json_data.isVideo ? true : false}
                                finishAuction={nft && nft.auction.finish_date}
                                owner={nft.owner}
                            />
                        </Container>
                        )}
                    </TabPanel>
                    :''
                }
                <TabPanel value={value} index={1}>
                    { activeAllFunctions && nft && nft.reveal.confirmed && nft.reveal.reveal_date_time > (new Date().getTime() / 1000)  && nft.on_sale && (
                    <Container maxWidth='sm' sx={{marginTop: '30px'}}>
                        <BuyNow
                            projectKey={nft && nft.project_key} 
                            userAccount={data && data.userAccount}
                            image={nft && nft.thumb_url_large && nft.thumb_url_large}
                            isVideo={nft && nft.metadata && nft.metadata.json_data.isVideo ? true : false}
                            nft={nft}
                            owner={nft.owner}
                        />
                    </Container>
                    )}
                </TabPanel>
                </>}
                {data && data?.provider && data.userAccount && nft  && nft.user.main_key.toUpperCase() == data.userAccount.toUpperCase() ?
                <DataMediaContentChildren>
                    {children}
                </DataMediaContentChildren> 
                : (activeAllFunctions && !data && nft && !nft.on_auction && !nft.on_sale &&
                <Box 
                    sx={{
                        marginTop:'2rem',
                        marginBottom:'25px',
                        display: 'flex',
                        //display: 'none',
                        justifyContent: 'space-between',
                        '@media screen and (max-width: 600px)': {
                            flexDirection:'column',
                            alignItems:'center',
                        }
                    }}
                >
                    <ButtonStyled onClick={handleOpenDrawerWallet} width='200px' text={t('shop.connected_to_wallet_2')} />
                </Box>)}
                {
                    nft && nft.tags && nft.tags.length > 0 && nft.reveal.confirmed &&  isMinted(nft)  &&
                    <React.Fragment>
                        <Typography gutterBottom variant="h5" component="h5" sx={{marginTop:'10px',color:'#fff'}}>
                            Category
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2" sx={{color:"#D1D1D1"}}>
                            {
                                nft && nft.tags && nft.tags.length > 0 ? nft.tags.map((tag, index) => {
                                    return <span key={index}>{MaysFirstLetter(String(tag.name))}{index != nft.tags.length-1 && ', '}</span>
                                }): ''
                            }
                        </Typography>
                    </React.Fragment>
                }
                {nft && nft.reveal && nft.reveal.confirmed &&  isMinted(nft)  && 
                <Typography gutterBottom variant="h5" component="h5" sx={{marginTop:'10px',color:'#fff'}}>
                    {t("nft-screen.description")}
                </Typography>
                }
                {  nft && nft.reveal && nft.reveal.confirmed &&  isMinted(nft)  && nft.metadata && nft.metadata.json_data.description ?
                    <Typography gutterBottom variant="h6" component="h2" sx={{color:'#fff'}} >
                        {arrow ? 
                            <p style={{marginTop:'10px'}}>{MaysFirstLetter(nft.metadata.json_data.description)}</p> : 
                            <p style={{marginTop:'10px'}}>{MaysFirstLetter(nft.metadata.json_data.description.substring(0,500))}</p>
                        }
                        { nft.metadata.json_data.description.length > 500 ? !arrow ? <TiArrowSortedDown onClick={()=>setArrow(!arrow)} style={{cursor:'pointer'}} size={20} /> :
                        <TiArrowSortedUp onClick={()=>setArrow(!arrow)} style={{cursor:'pointer'}} size={20} /> : null }
                    </Typography>
                    :nft && nft.metadata && nft.metadata.json_data.attributes.map((attribute) => (
                        attribute.trait_type == 'Description' && <p style={{marginTop:'10px'}}>  {attribute.value}</p>
                    ))
                }
                        {   nft && nft.reveal.confirmed &&  isMinted(nft)   && nft.metadata && nft.metadata.json_data.attributes.length > 0 &&
                            <DataMediaContentTypograthy gutterBottom variant="h5" component="h2">
                                {t("nft-screen.attributes")}
                            </DataMediaContentTypograthy>
                        }
                <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 1, sm: 2, md: 4, lg: 9}}>
                    {  nft && nft.reveal && nft.reveal.confirmed &&  isMinted(nft) &&  nft.metadata && (nft.metadata.json_data.attributes).map((attribute, index) => (
                        attribute.trait_type != 'Description' &&  attribute.trait_type != 'Name' && attribute.trait_type != 'Number' &&
                        <Grid key={index} item xs={1} sm={1} md={2} lg={3}>
                            <DataMediaContentCard>
                               <ListItemText 
                                    primaryTypographyProps={{style: {color:'#fff'}}}
                                    secondaryTypographyProps={{style: {color:'#D1D1D1'}}}
                                    primary={attribute.trait_type ? (attribute.trait_type) : ''} 
                                    secondary={attribute.trait_type ? (attribute.value) : ''}
                                    sx={{textAlign:'center'}}
                                />
                            </DataMediaContentCard>
                        </Grid>
                    ))}
                </Grid>
            </DataMediaContent>
        </Box>
    )
}

NFTDataMedia.propTypes = {
    nft: PropTypes.object.isRequired,
    setBidTx : PropTypes.func,
    bids : PropTypes.array,
    reloadPage : PropTypes.func,
    children : PropTypes.node,
}

export default NFTDataMedia;