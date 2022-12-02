import React from 'react';
import PropTypes from 'prop-types';
import {Box, Avatar,Card,CardMedia, CardContent, Grid, Tooltip} from '@mui/material';
import { Link } from 'react-router-dom';
import styled from "@emotion/styled/macro";

export const DisplayOver = styled(Box)({
    borderRadius: '8px',
    height: "100%",
    left: "0",
    position: "absolute",
    top: "0",
    width: "100%",
    zIndex: 2,
    transition: "background-color 350ms ease",
    backgroundColor: "transparent",
    padding: "20px 20px 0 20px",
    boxSizing: "border-box",
  });

export const DisplayOverBottom = styled(Box)({
    borderRadius: '8px',
    bottom: "0",
    left: "0",
    position: "absolute",
    width: "100%",
    zIndex: 2,
    transition: "background-color 350ms ease",
    backgroundColor: "transparent",
    padding: "15px",
    boxSizing: "border-box",
});
  
export const BigTitle = styled(Box)({
    //textTransform: "uppercase",
    fontSize: "30px",
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '18rem',
    display:'inline-block',
    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
    ["@media screen and (max-width: 400px)"]: {
      fontSize: "15px"
    }
});

export const Hover = styled(Box)({
    borderRadius: '8px',
    opacity: 0,
    transition: "opacity 350ms ease",
  });

export const SubTitle = styled.h4({
    fontFamily: "Helvetica",
    transform: "translate3d(0,50px,0)",
    transition: "transform 350ms ease",
  });
  
export const Paragraph = styled.p({
    transform: "translate3d(0,50px,0)",
    transition: "transform 350ms ease",
  });
  
export const CTA = styled(Link)({
    position: "absolute",
    bottom: "20px",
    left: "20px",
  });

export const Background = styled(Card)({
    borderRadius: '10px 10px',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "#FFF",
    position: "relative",
    width:'100%',
    height:'100%',
    cursor: "pointer",
    //backgroundOrigin: "url(https://assets.foundation.app/2Z/Pu/QmdoxFGWDa6Pcygj9hxfcJtXXvwWxFpWNeDUJXPPGA2ZPu/nft_preview.mp4)",
    //backgroundImage: "url(https://f8n-production.imgix.net/collections/mv9wjhxzq-Backyard%20Diaries%20Vol.1%20%2302.jpg?q=50&auto=format%2Ccompress&fit=fill&max-w=800&max-h=800&exp=-5)",
    // Other background code
    [`:hover ${DisplayOver}`]: {
      backgroundColor: "rgba(0,0,0,.5)",
    },
    [`:hover ${SubTitle}, :hover ${Paragraph}`]: {
      transform: "translate3d(0,0,0)",
    },
    [`:hover ${Hover}`]: {
      opacity: 1,
    },
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        //transform: 'translateY(-2px)',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
        /* select class */
        '& .card-collection': {
          transform: 'scale(1.06)',
        },
        '& .is-video-collection': {
          transform: 'scale(3.08)',
        }
    }
});



const CardCollection =  ({item,width,index}) => {
    return (
        <Grid item  xs={12} sm={12} md={12} lg={12} xl={12}
            sx={{
                width:{xs:'calc(100% - 10px)',sm:'calc(100% - 20px)',md:'calc(100% - 40px)',lg:'calc(100% - 70px)'},
            }}
        >
            <CardContent
                className={`${width}-w`}
                draggable={false}
                sx={{
                    padding:'0px 0px',
                    width: "100%",
                    height: "100%",
                    "&:last-child":{
                        padding:'5px 0px'
                    }
                }}
            >
                <Box
                    item={index}
                    sx={{
                        width: "100%",
                        height:{xs:'300px',sm:'340px',md:'250px',lg:'310px',xl:'480px'}
                    }}
                   
                >
                    <Link to={`/collection?address=${item.project_key}`}>
                        <Background    draggable={false}>
                            <CardMedia 
                                draggable={false}
                                className={ 'card-collection'}
                                //className={item.is_video ? 'card-collection is-video-collection' : 'card-collection'}
                                //component={item.is_video ? 'video' : 'img'}
                                component={ 'img'}
                                src={item.thumb_url_big}
                                autoPlay
                                loop
                                muted
                                sx={{
                                    position:'relative',
                                    borderRadius: '10px 10px 0 0',
                                    height:'100%',
                                    width:'100%',
                                    margin: '0 auto',
                                    transform: item.is_video ? 'scale(3)' : 'none',
                                }}
                            />
                            <DisplayOver>
                                        <BigTitle>
                                            <Box
                                                display='flex'    
                                                flexDirection='column'
                                                justifyContent='space-between'
                                                sx={{
                                                    // height:'45vh',
                                                    height:'470px',
                                                    '@media screen and (max-width: 768px)': {
                                                        width:'100%',
                                                    },
                                                    '@media screen and (max-width: 430px)': {
                                                        height:'270px',
                                                    }
                                                }}
                                            >
                                            </Box>
                                        </BigTitle>
                            </DisplayOver>
                            <DisplayOverBottom>
                                <Box
                                    sx={{
                                        padding:'15px',
                                        fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                        display:'flex',
                                        flexDirection:'column',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width:'100%',
                                            display:'flex',
                                            justifyContent:'flex-start'
                                        }}
                                    >
                                        <Tooltip title={item.name}  placement="top">
                                            <Box
                                                sx={{
                                                    width:'auto',
                                                    boxSizing:'border-box',
                                                    maxWidth:{xs:'100%',sm:'100%',md:'100%',lg:'60%',xl:'60%'},
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
                                                        fontSize:'30px',
                                                        backgroundColor:'rgba(0, 0, 0, 0.2)',
                                                        padding:'0.5rem',
                                                        borderRadius: '10px',
                                                    }}
                                                >
                                                    {item.name}
                                                </Box>
                                            </Box>
                                        </Tooltip>
                                    </Box> 

                                    <Box
                                        sx={{
                                            width:'100%',
                                            mt:'8px',
                                            display:'flex',
                                            justifyContent:'flex-start'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width:'auto',
                                                boxSizing:'border-box',
                                                maxWidth:{xs:'100%',sm:'100%',md:'100%',lg:'60%',xl:'60%'},
                                                display:'flex',
                                                justifyContent:'flex-start',
                                                backgroundColor:'rgba(0, 0, 0, 0.2)',
                                                padding:'0.5rem',
                                                borderRadius: '999px',
                                                gap:'0.5rem',
                                            }}
                                        >
                                            <Avatar variant='circular' src={item.user.profile_pic_url} />
                                            <Box
                                                sx={{
                                                    width:'100%',
                                                    boxSizing:'border-box',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    fontWeight:600, 
                                                    fontSize:'30px'
                                                }}
                                            >
                                                {
                                                    item && item.user && item.user.username ? item.user.username
                                                    :
                                                    item && item.owner && String(item.owner ).substring(0,5)+ '...' + String(item.owner).substring(38,54)
                                                }
                                            </Box>
                                        </Box>
                                    </Box> 
                                </Box>
                            </DisplayOverBottom>
                        </Background>
                    </Link>
                </Box>
            </CardContent>
        </Grid>
    );
};

CardCollection.propTypes = {
    item: PropTypes.object,
    width: PropTypes.number,
    index: PropTypes.number
};

export default CardCollection;