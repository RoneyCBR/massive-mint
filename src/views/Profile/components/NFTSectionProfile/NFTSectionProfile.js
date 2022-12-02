import React, { useEffect, useState } from 'react';
import { Box, Card, CardMedia, Container, Divider, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import LockIcon from '@mui/icons-material/Lock';
import { useTranslation } from 'react-i18next';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

const NFTSectionProfile = ({content, user, data, loadingNFTs, limit, setSliceNFT, listCards}) => {
    const { t } = useTranslation("translate"); 
    const [USDPrice, setUSDPrice] = useState(parseFloat('00.00').toFixed(2));
    let contentCards = 'sectionMyNFTs';
    let allCards = document.querySelectorAll("#sectionMyNFTs .MuiGrid-item");
    let ultimo = null;
   
    useEffect(()=>{   
        if(!loadingNFTs && content && limit <= content.length){
            let observerNFtExplore = new IntersectionObserver((cards)=>{
                cards.forEach((card)=>{
                    if(card.isIntersecting){
                        observerNFtExplore.unobserve(ultimo)
                        setSliceNFT(limit + listCards)
                    }
                })
            },
            {
                rootMargin:'0px 0px 270px 0px',
                threshold:1.0
            })

            allCards = document.querySelectorAll("#sectionMyNFTs .MuiGrid-item");
            if(allCards && allCards.length > 0){
                ultimo = allCards[allCards.length-1];
                observerNFtExplore.observe(allCards[allCards.length-1])
            }
        }
    }, [allCards,loadingNFTs,limit,content]);
    useEffect(()=>{
        setUSDPrice(parseFloat('00.00').toFixed(2));
    }, []);

    if(content == null || content.length===0 && !loadingNFTs){
        return (
            <Box
                sx={{
                    display:'flex',
                    alignItems:'center',
                    flexDirection:'column',
                    justifyContent:'center',
                    color:'#fff'
                }}
            >
                <h2>{t("profile.any_results")}</h2>
            </Box>
        )
    }
    return (
        <Container maxWidth='xl' sx={{ marginBottom:'20px' }}>
            {content && content.length <= 0 && data && user && data.userAccount.toUpperCase() == user.wallet.toUpperCase() &&
                <center>
                    <h1  style={{ fontSize:'30px'}}>
                        You dont have Cards, you can buy <Link to={`/shop`} style={{color:'#ED2891'}}>here</Link>
                    </h1>
                </center>
            }
            {content && content.length <= 0 && data && user && data.userAccount.toUpperCase() != user.wallet.toUpperCase() &&
                <center>
                    <h1  style={{ fontSize:'30px'}}>
                        This user has no cards
                    </h1>
                </center>
            }
            {content && content.length > 0 &&
                <Grid id={contentCards} container rowSpacing={5} spacing={{ xs: 2, md: 3, lg: 4 }} columns={{ xs: 1, sm: 2, md: 8, lg: 10 }}>
                    {content?.slice(0, limit).map((card, index) => (
                        <Grid key={index} item xs={1} sm={1} md={2} lg={2} xl={1} sx={{position:'relative',minHeight:'300px'}}>
                            <Box sx={{zIndex: '10', display:'flex', flexDirection:'row-reverse', marginRight:'14px', marginTop:'14px',color:'#fff'}}>
                                {
                                    card.on_auction ? <GavelOutlinedIcon sx={{zIndex: '10', color:'#fff'}} /> : ''
                                }

                                {  data && user && user.info && user.info.wallet && (data.userAccount+'').toUpperCase() == (user.info.wallet+'').toUpperCase() && card.requests_count > 0 &&
                                 <CircleNotificationsIcon 
                                     htmlColor='#ED2891' 
                                     fontSize= {window.screen.width < 600 ? 'large' : 'medium'}
                                     sx={{
                                         position:'absolute',
                                         top:'4px',
                                         left:'18px',
                                         cursor:'pointer',
                                         '@media (max-width: 600px)': {
                                             left:'4px',
                                             top:'0px',
                                         }
                                     }} />
                                 
                                }
                            </Box>
                            <Card sx={{ padding: '8px', borderRadius: '8px',minHeight:'300px' }}>
                                <Box
                                    component={Link}
                                    to={`/nft?address=${card.project_key}&token_id=${card.token_id}`}
                                >
                                    {
                                        card.metadata.is_video ?
                                        <CardMedia
                                            component="video"
                                            src={card.thumb_gif}
                                            autoPlay
                                            loop
                                            muted
                                            alt={card.metadata.json_data.name}
                                            sx={{ borderRadius: '8px',minHeight:'350px',maxHeight:{xs:'auto',sm:'350px',md:'350px',lg:'350px',xl:'350px'}}}
                                        />
                                        :
                                        <CardMedia
                                            component="img"
                                            src={card.thumb_resize}
                                            alt={card.metadata.json_data.name}
                                            sx={{ borderRadius: '8px',minHeight:'350px',maxHeight:{xs:'auto',sm:'350px',md:'350px',lg:'350px',xl:'350px'}}}
                                        />
                                    }
                                </Box>
                                <Box
                                    display="flex"
                                    justifyContent="space-around"
                                    alignItems="center"
                                    sx={{ mt: 1, mb: 1 ,color:'#fff'}}
                                >
                                    <Box
                                        sx={{
                                            visibility: card.on_sale ? 'visible' : 'hidden'
                                        }}
                                    >
                                        {USDPrice} USD
                                    </Box>
                                    <LockIcon
                                        sx={{
                                            visibility: card.owner.toUpperCase() == card.creator.toUpperCase() ? 'visible' : 'hidden'
                                        }}
                                    />
                                    <Box
                                        display="flex"
                                        sx={{
                                            visibility: card.on_sale ? 'visible' : 'hidden'
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            src="eth.png"
                                            alt="matic"
                                            sx={{ width: '18px' }}
                                        />
                                        <Box>{card.sale.price}</Box>
                                        <Box>{card.sale.coin}</Box>
                                    </Box>
                                </Box>
                                <Divider />
                                <Box component="h3" sx={{ textAlign: 'center', margin: '0 auto' ,color:'#fff'}}>
                                    {card.metadata.json_data.name}
                                    {!card.metadata.json_data.name &&
                                        card.metadata.json_data.attributes.map((attribute) => (
                                        attribute.trait_type == 'Name' && attribute.value))
                                    }
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            }
        </Container>
    );
}

NFTSectionProfile.defaultProps = {
    content: [],
    user: {name:''},
    data: {userAccount: ''},
    address: '',
    loadingNFTs: false,
    limit: 10,
    setSliceNFT: ()=>{},
    listCards: 100
}

NFTSectionProfile.propTypes = {
    content: PropTypes.array,
    user: PropTypes.object,
    data: PropTypes.object,
    address: PropTypes.string,
    loadingNFTs: PropTypes.bool,
    limit: PropTypes.number,
    setSliceNFT: PropTypes.func,
    listCards: PropTypes.number
}

export default NFTSectionProfile;