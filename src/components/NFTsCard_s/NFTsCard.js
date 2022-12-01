import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import {BigTitle, DisplayOver,BackgroundNewCard} from './styles/styles'
import { Link } from 'react-router-dom';
import { nfts } from './utils/nfts';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';


const initialState = {
    days: 0, 
    hours: 0,
    minutes: 0,
    seconds: 0,
}

const CounterAuction = ({item})=>{
    const {t} = useTranslation("translate");
    const [counters, setCounters] = useState(initialState)
    let isFirst = true;
    const countDown = () => {
        setInterval(function () {
            let realTime = 0;
            if(item && (item.time_live+item.start_date) > 0 && !item.finish_date){
                realTime = (item.time_live+item.start_date)
            }
            if(item && item.finish_date > 0){
                realTime = item.finish_date;
            }
            if(item && realTime > 0) {
                let countDownDate = realTime * 1000;
                let now = new Date().getTime();
                let distance = countDownDate - now;
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000)
                if(distance >= 0) { 
                    setCounters({
                        ...counters,
                        days: days,
                        hours: hours,
                        minutes: minutes,
                        seconds: seconds
                    })
                }
            }
        }, 1000);
    }

    useEffect(() => {
        if(isFirst) {
            isFirst = false;
            countDown();
        }
    } ,[])

    return (
        <Box>
            <Box>
                <Typography 
                    variant="overline" 
                    display="block" 
                    gutterBottom 
                    sx={{
                        fontSize:'15px',
                        color:'#b3b3b3',
                        fontWeight: 600,
                    }}
                >
                {t("home.ends_in")}
                </Typography>
            </Box>
            <Box
                display='flex'
                sx={{
                    fontSize:'18px',
                    color:'#fff',
                    fontWeight: 600,
                    gap:'10px',
                    "@media (min-width: 320px)": {
                        fontSize:'13px',
                        fontWeight: 200,
                        gap:'5px',
                    }
                }}
                className="notranslate"
            >
                <Box>{((counters.days * 24) + counters.hours).toFixed(0)}{t("cards.auction.short_hour_text")}</Box>
                <Box>{counters.minutes}{t("cards.auction.short_minute_text")}</Box>
                <Box>{counters.seconds}{t("cards.auction.short_second_text")}</Box>
            </Box>
        </Box>
    )
}

const Card = ({item}) =>{
    const {t} = useTranslation("translate");
    return (
        <BackgroundNewCard>
            <CardMedia
                className='card-media'
                component='img'
                src={item.metadata.is_video ? item.thumb_gif:item.thumb_resize}
                autoPlay
                loop
                muted
                sx={{
                    position:'relative',
                    borderRadius: '8px 8px 0 0',
                    height:'100%',
                    width:'100%',
                    margin: '0 auto',
                }}
            />
            <DisplayOver>
                <BigTitle>
                    <Box
                        sx={{
                            width:'100%',
                            display:'flex',
                            justifyContent:'flex-start'
                        }}
                    >
                        <Tooltip title={item.metadata.json_data.name+''}  placement="top">
                            <Box
                                sx={{
                                    width:'auto',
                                    boxSizing:'border-box',
                                    maxWidth:'100%'
                                }}
                            >
                                <Box
                                    sx={{
                                        width:'100%',
                                        boxSizing:'border-box',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        fontWeight:600, 
                                        fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                        fontSize:'30px',
                                        color:'#FFF',
                                        backgroundColor:'rgba(0, 0, 0, 0.2)',
                                        padding:'0.5rem',
                                        borderRadius: '10px',
                                    }}
                                >
                                    {item.metadata.json_data.name}
                                </Box>
                            </Box>
                        </Tooltip>
                    </Box>
                </BigTitle>
            </DisplayOver>

                <Box
                    sx={{
                        height: "auto",
                        bottom: "0",
                        left: "0",
                        position: "absolute",
                        width: "100%",
                        zIndex: 2,
                        backgroundColor: "transparent",
                        boxSizing: "border-box",
                    }}
                >
                    <CardContent
                        sx={{
                            backgroundColor:'rgba(61, 61, 61, 0.68)',
                            borderRadius:'0 0 8px 8px',
                            height:'auto',
                            width:'100%',
                            display:'flex',
                            flexDirection:'column',
                            paddingBottom:'0px'
                        }}
                    >
                        <Box
                            display='flex'
                            sx={{
                            
                                "@media (min-width: 320px)": {
                                    gap:'5px',
                                }
                            }}
                        >
                            <Box component='span'>
                                <Avatar variant="circular" src={item.user.profile_pic_url} />
                            </Box>
                            <Box component='span'>
                                <Typography 
                                    variant="overline" 
                                    display="block" 
                                    gutterBottom 
                                    component='span'
                                    sx={{
                                        marginTop:'3px',
                                        fontSize:'25px',
                                        color:'#b3b3b3',
                                        fontWeight: 600,
                                        cursor:'pointer',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        width: '13rem',
                                        display:'inline-block',
                                        fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                        "@media (min-width: 320px)": {
                                            fontSize:'13px',
                                            fontWeight: 200,
                                        }
                                    }}
                                >
                                    {item.owner && (item.user.main_key.toUpperCase() == item.owner.toUpperCase())? item.user.username : (item.owner).substring(0,5)+ '...' +(item.owner).substring(38,54) }
                                </Typography>
                            </Box>
                        </Box>
                        {((item.on_auction) || (item.on_sale)) &&
                            <Box
                                display='flex'
                                justifyContent='space-between'
                            >
                                {item &&
                                    <Box>
                                        <Box>
                                            <Typography 
                                                variant="overline" 
                                                display="block" 
                                                gutterBottom 
                                                component='span'
                                                sx={{
                                                    fontSize:'20px',
                                                    color:'#b3b3b3',
                                                    fontWeight: 600,
                                                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                                    "@media (min-width: 320px)": {
                                                        fontSize:'13px',
                                                        fontWeight: 200,
                                                    }
                                                }}
                                            >
                                                {
                                                    item && item.on_auction &&
                                                    <React.Fragment>
                                                        {
                                                            item && item.on_auction && item.user && item.user.wallet && item.last_bid && item.last_bid.user && 
                                                            item.last_bid.user.wallet && item.last_bid.user.wallet != item.user.wallet ?
                                                            t("cards.auction.current_bid_text")
                                                            :
                                                            t("cards.auction.reserve_text")
                                                        }
                                                    </React.Fragment>
                                                }
                                                {
                                                    item && item.on_sale &&
                                                    t("cards.sale.price_text")
                                                }
                                            </Typography>
                                        </Box>
                                        <Box
                                            display='flex'
                                            sx={{
                                                fontSize:'20px',
                                                color:'#fff',
                                                fontWeight: 600,
                                                gap:'10px',
                                                "@media (min-width: 320px)": {
                                                    fontSize:'13px',
                                                    fontWeight: 200,
                                                    gap:'5px',
                                                }
                                            }}
                                        >
                                            <Box component='span'>
                                                <RadioButtonCheckedIcon fontSize='5px' />
                                            </Box>
                                            <Box component='span' 
                                                sx={{
                                                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '
                                                }}
                                            >
                                                { item.on_auction && item.last_bid ?
                                                    item.last_bid.amount+' '+'ETH':  item.sale.price + ' ' + item.sale.coin 
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                }
                                {
                                    (item && item.on_auction && item.auction && item.auction.start_now && item.auction.start_date && (item.auction.start_date + item.auction.time_live) >= Math.floor(Date.now() / 1000))||
                                    (item && item.on_auction && item.auction && item.auction.finish_date && (item.auction.finish_date) >= Math.floor(Date.now() / 1000)) ?
                                    <CounterAuction item={item.auction} />
                                    :''
                                }
                                {item && item.on_auction && item.auction && item.auction.finish_date > 0 && item.auction.finish_date < Math.floor(Date.now() / 1000) &&      
                                    <Box>
                                        <Box>
                                            <Typography 
                                                variant="overline" 
                                                display="block" 
                                                gutterBottom
                                                component='span' 
                                                sx={{
                                                    fontSize:'18px',
                                                    color:'#b3b3b3',
                                                    fontWeight: 600,
                                                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                                    "@media (min-width: 320px)": {
                                                        fontSize:'13px',
                                                        fontWeight: 200,
                                                    }
                                                }}
                                            >
                                                { 
                                                    item.on_auction && t("home.auction_close")
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                }
                            </Box>
                        }
                    </CardContent>
                </Box>
        </BackgroundNewCard>
    )

}

const NFTsCard = ({setNewRequest,showBtnAll, content, limit,openFilters,NFTLoading,infinityScroll}) => {
    const {t} = useTranslation("translate");
    let contentCards = 'sectionCards';
    let allCards = document.querySelectorAll("#sectionCards .nftCard");
    let ultimo = null;
    
    React.useEffect(()=>{
        if(!NFTLoading){
            let observerNFtExplore = new IntersectionObserver((cards)=>{
                cards.forEach((card)=>{
                    if(card.isIntersecting){
                        observerNFtExplore.unobserve(ultimo)
                        infinityScroll();
                    }
                })
            },
            {
                rootMargin:'0px 0px 270px 0px',
                threshold:1.0
            })

            allCards = document.querySelectorAll("#sectionCards .nftCard");
            if(allCards && allCards.length > 0){
                ultimo = allCards[allCards.length-1];
                setNewRequest(false) 
                observerNFtExplore.observe(allCards[allCards.length-1])
            }
        }
    },[allCards,NFTLoading,limit])

    if(content == null || (content && content.length === 0)) {
        return (
            <Box
                sx={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center',mt:'20px'}}
            >
                {!NFTLoading &&
                <Typography variant='h4' sx={{color:'#A658D8',fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>
                    {t("explore.not_found")}
                </Typography>
                }
            </Box>
     
        )
    }
    
    return (
        <>
        <Container maxWidth='xl' sx={{marginTop:'1.5rem'}}>
            <Box
                id={contentCards}
                sx={{
                    width:'100%',
                    display:'grid',
                    gridTemplateColumns:'repeat(3,1fr)',
                    gap:'20px',
                    "@media screen and (max-width: 1300px)":{
                        gridTemplateColumns:openFilters?'repeat(auto-fit, minmax(400px, 1fr))':'repeat(3,1fr)',
                    },
                    "@media screen and (max-width: 1200px)":{
                        gridTemplateColumns:openFilters?'repeat(auto-fit, minmax(300px, 1fr))':'repeat(2,1fr)',
                    },
                    "@media screen and (max-width: 750px)":{
                        gridTemplateColumns:'repeat(1,1fr)',
                    }
                }}
            >
                {
                    content?.slice(0, limit).map((item, index)=>(
                        <Box
                            key={index}
                            sx={{
                                width:'100%',
                                minHeight:'400px'
                            }}
                            className="nftCard"
                        >
                            <Link 
                                to={`/nft?address=${item.project_key}&token_id=${item.token_id}&domain=${process.env.REACT_APP_DOMAIN}`}
                                style={{
                                    textDecoration: 'none',
                                    minHeight:'400px'
                                }}
                            >
                               <Card item={item}/>
                            </Link>
                        </Box>
                    ))
                }
            </Box>
        </Container>
        {showBtnAll &&
        (<Container 
            maxWidth='sm' 
            sx={{
                display: 'flex',
                marginTop:'2rem',
                justifyContent:'center',
            }}
        >
            <Button
                variant="outlined"
                type="button"
                sx={{
                    borderRadius:'9999px',
                    backgroundColor:'#fff',
                    color:'#000',
                    border:'1px solid #e3e3e3',
                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                    fontSize:'18px',
                    '&:hover':{
                        backgroundColor:'#000',
                        transition:'background-color 0.3s ease-in-out',
                        color:'#fff',
                        border:'1px solid #000',
                    }
                }}
            >
                View all NFTs
            </Button>
        </Container>)}
        </>
    )
}

NFTsCard.defaultProps = {
    setNewRequest:()=>{},
    limit: 8,
    showBtnAll: false,
    content: nfts,
    NFTLoading: false,
    infinityScroll:()=>{}
}

NFTsCard.propTypes = {
    setNewRequest:PropTypes.func,
    showBtnAll: PropTypes.bool,
    content: PropTypes.array, 
    limit: PropTypes.number,
    openFilters: PropTypes.bool,
    NFTLoading: PropTypes.bool,
    infinityScroll: PropTypes.func
}

Card.propTypes = {
    item: PropTypes.object
}

CounterAuction.propTypes = {
    item: PropTypes.object
}

export default NFTsCard