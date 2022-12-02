import React from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const Background = styled(Card)({
    borderRadius: '8px',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "#FFF",
    position: "relative",
    width:'100%',
    height:'300px',
    cursor: "pointer",
    border: "1px solid #e3e3e3",
    [`:hover ${CardMedia}`]: {
      backgroundColor: "rgba(0,0,0,.5)",
    },

    [`:hover ${CardMedia}`]: {
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
    },
    ["@media (max-width: 320px)"]: {
      height: '330px'
    }
});

const DisplayOverBottom = styled(Box)({
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

const CollectionCard = ({ content, limit,t}) => {

    if(content == null || content && content.length === 0) {
        return (
            <Box
                sx={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} 
            >
                <Typography variant='h6' sx={{color:'red'}}>
                    {t("explore.not_found")}
                </Typography>
            </Box>
     
        )
    }
    
    return (
        <Box>  
        {content.slice(0, limit).map((item, index)=>(
        <React.Fragment key={index}>
            <Background>
            <CardMedia
                className={item.is_video ? 'card-collection is-video-collection' : 'card-collection'}
                component={item.is_video ? 'video' : 'img'}
                src={item.thumb_url}
                autoPlay
                loop
                muted
                sx={{
                    position:'relative',
                    borderRadius: '8px 8px 8px 9px',
                    height:'100%',
                    width:'100%',
                    margin: '0 auto',
                    transform: item.is_video ? 'scale(3)' : 'none',
                }}
            />
            <DisplayOverBottom>
                <Box
                  sx={{
                      background:'rgba(255,255,255,.3)',
                      borderRadius:'8px 8px 8px 8px',
                  }}
                >
                    <h2 style={{fontWeight:600, fontSize:'30px', marginBottom:'0px'}}>
                        {item.name}
                    </h2>
                </Box>
            </DisplayOverBottom>
            </Background>
        </React.Fragment>
        ))}
        </Box>
    )

}

CollectionCard.defaultProps = {
    showBtnAll: false,
    content: collections,
    limit: 8,
}

CollectionCard.propTypes = {
    showBtnAll: PropTypes.bool,
    content: PropTypes.array,
    limit: PropTypes.number,
    t: PropTypes.any
}

export default CollectionCard