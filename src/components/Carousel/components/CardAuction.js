import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box,Card, CardContent, Grid, Tooltip} from "@mui/material";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TimeLive = ({item,index}) =>{
    const { t } = useTranslation("translate");
    const [counters, setCounters] = React.useState([])
    let isFirst = true;
    const countDown = () => {
        setInterval(function () {
            let counts = []
           
                if(item && item.finish_date > 0) {
                    let countDownDate = item.finish_date * 1000;
                    let now = new Date().getTime();
                    let distance = countDownDate - now;  
                    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((distance % (1000 * 60)) / 1000); 
                    if (distance >= 0) { 
                        counts[index] = [days, hours, minutes, seconds];
                    }
                }

                if(item && item.start_date && !item.finish_date && (item.time_live+item.start_date) > 0) {
                    let countDownDate = (item.time_live+item.start_date) * 1000;
                    let now = new Date().getTime();
                    let distance = countDownDate - now;
                    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((distance % (1000 * 60)) / 1000)
                    if (distance >= 0) { 
                        counts[index] = [days, hours, minutes, seconds];
                    }
                }
            setCounters(counts)
        }, 1000);
    }

    React.useEffect(() => {
        if(isFirst) {
            isFirst = false;
            countDown();
        }
    } ,[])

    return (
        <Box
            sx={{
                mt:'13px'
            }}
        >
            {
               counters.length > 0  && counters[index]  && 
                <React.Fragment>
                    <Box
                        sx={
                            {
                            display:'flex',
                            alignItems:'flex-end',
                            justifyContent:'flex-end',
                            animation: 'zoomInZoomOut 0.5s ease-in-out',
                            animationFillMode:'forwards',
                            animationIterationCount:'infinite',
                            animationDirection:'alternate',
                            animationTimingFunction:'ease-in-out',
                            animationDelay:'0s',
                            animationDuration:'0.5s',
                            animationName:'zoomInZoomOut',
                            animationPlayState:'running',
                            "@keyframes zoomInZoomOut":{
                                "0%":{
                                    transform:'scale(1)',
                                    opacity:'1'
                                }
                                ,"50%":{
                                    transform:'scale(1.1)',
                                    opacity:'1'
                                }
                                ,"100%":{
                                    transform:'scale(1)',
                                    opacity:'1'
                                }
                            }
                            
                            }
                        }
                    >
                        <Box
                            sx={{
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                borderRadius:'15px 15px',
                                backgroundColor:'#0D0D0D',
                                p:'5px 10px',
                                color:'#F2F2F2',
                                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                            }}
                        >
                            <Box
                                sx={{
                                    width:'10px',
                                    height:'10px',
                                    boxShadow:'0px 0px 10px rgba(242,242,242,0.9)',
                                    borderRadius:'50% 50%',
                                    backgroundColor:'#F2F2F2',
                                    mr:'3px',
                                    fontSize: {xs:'17px',sm:'17px',md:'20px'},
                                    display:'grid',
                                    gridTemplateColumns:'repeat(2,1fr)',
                                }}
                            />
                            <Box
                                sx={{
                                    mr:'5px',
                                    display:'flex',
                                    flexDirection:'row'
                                }}
                            >
                                <Box sx={{mr:'5px'}}>{t("cards.auction.ends_text")}</Box>
                                <Box>{t("cards.auction.in_text")}</Box>
                            </Box>
                            <Box
                                className="notranslate"
                                sx={{
                                    color:'#A658D8'
                                }}
                                >
                                    {((counters[index][0]*24)+counters[index][1]) }{t("cards.auction.short_hour_text")}:
                                    {counters[index][2] }{t("cards.auction.short_minute_text")}:
                                    {counters[index][3] }{t("cards.auction.short_second_text")}                                   
                            </Box>
                        </Box>
                    </Box>
                </React.Fragment>
            }
        </Box>
    )
}

TimeLive.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
}

const CardAuction =  ({item,width,index,isYour}) => {
    const { t } = useTranslation("translate");
    return (
        <Grid item  xs={12} sm={12} md={12} lg={12} xl={12}
            sx={{
                width:{xs:'calc(100% - 10px)',sm:'calc(100% - 20px)',md:'calc(100% - 40px)',lg:'calc(100% - 70px)'},
            }}
        >
            <CardContent
                sx={{
                    padding:'0px 0px',
                    width: "100%",
                    height: "100%",
                    "&:last-child":{
                        padding:'5px 0px'
                    }
                }}
            >
                <Card
                    className={`${width}-w`}
                    item={index}
                    draggable={false}
                    sx={{
                        width:"100%",
                        height: "100%"
                    }}
                >
                    <Link
                        to={`/nft?address=${item.project_key}&token_id=${item.token_id}&domain=${process.env.REACT_APP_DOMAIN}`}
                        style={{
                            textDecoration: 'none',
                        }}
                    >
                    <Box
                        sx={{
                            width: "100%",
                            height:{xs:'220px',sm:'260px',md:'170px',lg:'200px',xl:'370px'},
                            position:'relative',
                        }}
                    >
                        <Box
                            sx={{
                                position:'absolute',
                                left:'0px',
                                top:'0px',
                                width:'100%'
                            }}
                        >
                            <Box
                                sx={{
                                    width:'calc(100% - 1px)',
                                    display:'flex',
                                    justifyContent:'flex-start',
                                    p:'20px',
                                    boxSizing:'border-box'
                                }}
                            >
                                <Tooltip title={item && item.metadata && item.metadata && item.metadata.json_data && item.metadata.json_data.name?item.metadata.json_data.name:''}  placement="top">
                                    <Box
                                        sx={{
                                            width:'auto',
                                            boxSizing:'border-box',
                                            maxWidth:{xs:'100%',sm:'100%',md:'100%',lg:'80%',xl:'80%'}
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
                                                fontSize:'25px',
                                                color:'#0D0D0D',
                                                backgroundColor:'rgba(254,254,254,0.5)',
                                                borderRadius:'10px 10px',
                                                padding:'0.5rem',
                                            }}
                                        >
                                            {item && item.metadata && item.metadata && item.metadata.json_data && item.metadata.json_data.name}
                                        </Box>
                                    </Box>
                                </Tooltip>
                            </Box>
                        </Box>

                        <Box

                            sx={{
                                width:'100%',
                                height:'100%',
                                backgroundImage: `url(${item && item.metadata && item.metadata.is_video ? item && item.thumb_gif: item && item.thumb_resize})`,
                                backgroundSize:'cover',
                                backgroundPosition:'center',
                                borderRadius:'10px 10px 0px 0px',
                            
                            }}
                        />
                       
                        <Box
                            sx={{
                                position:'absolute',
                                left:'20px',
                                bottom:'-25px'
                            }}
                        >
                            <Box
                                sx={{
                                    
                                    border:'2px solid #fff',
                                    borderRadius:'50% 50%',
                                }}
                            >
                            <Avatar 
                                alt="user" 
                                src={item && item.user && item.user.profile_pic_url}
                                sx={{
                                    width:'50px',
                                    height:'50px',
                                }}
                            />
                            </Box>
                        </Box>
                    </Box>
                    <br/>
                    <Box
                        sx={{
                            p:1
                        }}
                    >
                        <Box
                            sx={{
                                width:'auto',
                                boxSizing:'border-box',
                                maxWidth:{xs:'100%',sm:'100%',md:'100%',lg:'80%',xl:'80%'},
                                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                p:'0px 10px'
                            }}
                        >
                            <Box
                                sx={{
                                    width:'100%',
                                    boxSizing:'border-box',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    fontSize:'25px',
                                    fontWeight:'bold',
                                    color:'#0D0D0D'
                                }}
                            >
                                {
                                    isYour && t("cards.auction.your_nft_text")
                                }
                                {
                                    !isYour && item && item.user && item.user.username && item.user.username != item.user.username.substring(0,12)+'com' ?
                                    item.user.username
                                    :
                                    item && item.user &&  item && item.user.wallet && (item.user.wallet).substring(0,5)+ '...' +(item.user.wallet).substring(38,54)
                                }
                            </Box>
                        </Box>
                        


                        {
                            item && item.on_auction && 
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    mt:'5px',
                                    justifyContent: "flex-start",
                                    p:'0px 10px',
                                    height:'35px'
                                }}
                            >
                                {
                                    
                                    item && item.user && item.user.wallet && item.last_bid && item.last_bid.user && 
                                    item.last_bid.user.wallet && item.last_bid.user.wallet != item.user.wallet ?
                                    <React.Fragment>
                                        <Avatar 
                                            alt="user" 
                                            variant='square'
                                            src={item && item.last_bid && item.last_bid.user && item.last_bid.user.profile_pic_url}
                                            sx={{
                                                width:'40px',
                                                height:'40px',
                                                borderRadius:'8px 8px',
                                                mr:'1rem'
                                            }}
                                        />

                                        <Box
                                            sx={{
                                                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                                fontSize:'25px',
                                                fontWeight:'bold',
                                                color:'#0D0D0D',
                                                opacity:0.7
                                            }}
                                        >
                                            {item.last_bid.user.username}
                                        </Box>
                                    </React.Fragment>
                                    :
                                    ''
                                }
                                
                            </Box>
                        }
                        <Box
                            sx={{
                                width: "100%",
                                height: "60px",
                            }}
                        >
                            {
                                item && item.on_auction &&
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        p:'0px 10px'
                                    }}
                                >

                                    <Box
                                        sx={{
                                            pt:'5px',
                                            width: "100%",
                                            display:'flex',
                                            flexDirection:'column',
                                            fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                            color:'#0D0D0D'
                                        }}
                                    >
                                        <Box>
                                            {
                                                item && item.user && item.user.wallet && item.last_bid && item.last_bid.user && 
                                                item.last_bid.user.wallet && item.last_bid.user.wallet != item.user.wallet ?
                                                t("cards.auction.current_bid_text")
                                                :
                                                t("cards.auction.reserve_text")
                                            }
                                        </Box>
                                        <Box>{item && item.last_bid && item.last_bid.amount && item.last_bid.amount > 0 ? item.last_bid.amount:'0'} ETH</Box>
                                    </Box>
                                    {
                                        item && item.on_auction && item.auction ?
                                            <TimeLive item={item.auction} index={index}/>
                                        :'' 
                                    }
                                </Box>
                            }
                        </Box>
                    </Box>
                    </Link>
                </Card>
            </CardContent>
        </Grid>
    );
};

CardAuction.propTypes = {
    item: PropTypes.object,
    width: PropTypes.number,
    index: PropTypes.number,
    isYour: PropTypes.bool,
};

export default CardAuction;