import { Link } from 'react-router-dom'
import styled from "@emotion/styled/macro";
import { Box, Card } from '@mui/material';

export const DisplayOver = styled(Box)({
    borderRadius: '8px 8px 0 0',
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
  
export const BigTitle = styled(Box)({
    //textTransform: "uppercase",
    fontSize: "30px",
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    display:'inline-block',
    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
    ["@media screen and (max-width: 400px)"]: {
      fontSize: "15px"
    }
  });

export const Hover = styled(Box)({
    borderRadius: '8px 8px 0 0',
    opacity: 0,
    transition: "opacity 350ms ease",
  });

export const SubTitle = styled.h4({
    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
    //transform: "translate3d(0,50px,0)",
    //transition: "transform 350ms ease",
  });
  
export const Paragraph = styled.p({
    //transform: "translate3d(0,50px,0)",
    //transition: "transform 350ms ease",
  });
  
export const CTA = styled(Link)({
    position: "absolute",
    bottom: "20px",
    left: "20px",
  });

export const Background = styled(Card)({
    borderRadius: '8px 8px 0 0',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "#FFF",
    position: "relative",
    height: "100%",
    width:'100%',
    cursor: "pointer",
    //border: "1px solid #e3e3e3",
    //backgroundOrigin: "url(https://assets.foundation.app/2Z/Pu/QmdoxFGWDa6Pcygj9hxfcJtXXvwWxFpWNeDUJXPPGA2ZPu/nft_preview.mp4)",
    //backgroundImage: "url(https://f8n-production.imgix.net/collections/mv9wjhxzq-Backyard%20Diaries%20Vol.1%20%2302.jpg?q=50&auto=format%2Ccompress&fit=fill&max-w=800&max-h=800&exp=-5)",
    // Other background code
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    [`:hover ${DisplayOver}`]: {
      backgroundColor: "rgba(0,0,0,.5)",
    },
    //[`:hover ${SubTitle}, :hover ${Paragraph}`]: {
    //  transform: "translate3d(0,0,0)",
    //},
    [`:hover ${Hover}`]: {
      opacity: 1,
    },
    //transition: 'all 0.3s ease-in-out',
    //'&:hover': {
    //    transform: 'translateY(-2px)',
    //    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
    //},
});


export const BackgroundNewCard = styled(Card)({
    borderRadius: '8px',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "#FFF",
    position: "relative",
    width:'100%',
    height:'400px',
    cursor: "pointer",
    border: "1px solid #e3e3e3",
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
          transform: 'scale(1.05)',
        }
    },
    ["@media (max-width: 320px)"]: {
      height: '330px'
    }
});


export const BackgroundHomeHero= styled(Card)({
    borderRadius: '8px',
    backgroundPosition: 'center', /* Center the image */
    backgroundRepeat: 'no-repeat', /* Do not repeat the image */
    backgroundSize: 'cover', /* Image cover the entire container */
    color: "#FFF",
    position: "relative",
    width:'100%',
    height:'290px',
    cursor: "pointer",
    border: "1px solid #e3e3e3",
    transition: 'all 0.3s ease-in-out',

});
