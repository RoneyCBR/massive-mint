import React from 'react';
import PropTypes from 'prop-types';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import styled from "@emotion/styled/macro";

const Background = styled(Card)({
    borderRadius: '8px',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "#FFF",
    position: "relative",
    width:'100%',
    height:'150px',
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

const CardNFT = ({item}) => {
    return (
        <Background>
          {
            item  && 
            <React.Fragment>
              {
                item.metadata && item.metadata.is_video ?
                <CardMedia
                    className='card-media'
                    component={'video'}
                    src={item && item.thumb_gif}
                    autoPlay
                    loop
                    muted
                    sx={{
                        position:'relative',
                        borderRadius: '8px 8px 0 0',
                        height:'100%',
                        width:'100%',
                        margin: '0 auto'
                    }}
                />
                :
                <CardMedia
                    className='card-media'
                    component={'img'}
                    src={item && item.thumb_resize}
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
              }
            </React.Fragment>
          }
        </Background>
    );
};

CardNFT.propTypes = {
    item: PropTypes.object
};

export default CardNFT;