import React from 'react';
import PropTypes from 'prop-types';
import { Box,Card, CardContent, Divider , Grid, Tooltip} from "@mui/material";
import { Link } from 'react-router-dom';
import styled from "@emotion/styled/macro";
import { useTranslation } from 'react-i18next';

export const BigTitle = styled(Box)({
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


const CardNFT =  ({item,width,index}) => {
  const { t } = useTranslation("translate");
  return (
    <Grid item  xs={12} sm={12} md={12} lg={12} xl={12}
        sx={{
          width:{xs:'calc(100% - 10px)',sm:'calc(100% - 20px)',md:'calc(100% - 40px)',lg:'calc(100% - 70px)'}
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
        <Card
          item={index}
          sx={{
            width:"100%",
            height: "100%"
          }}
        >
          <Box
            sx={{
              width: "100%",
              height:{xs:'220px',sm:'260px',md:'170px',lg:'200px',xl:'370px'},
            }}
          >
            <Link 
                to={`/nft?address=${item.project_key}&token_id=${item.token_id}&domain=${process.env.REACT_APP_DOMAIN}`}
                style={{
                    textDecoration: 'none',
                }}
            >
              <Box
                draggable={false}
                sx={{
                    width:'100%',
                    height:'100%',
                    backgroundImage: `url(${item && item.metadata && item.metadata.is_video ? item && item.thumb_gif: item && item.thumb_resize})`,
                    backgroundSize:'cover',
                    backgroundPosition:'center',
                    borderRadius:'10px 10px 0px 0px',
                
                }}
              />
            </Link>
          </Box>
          <Box
            sx={{
              p:1,
              height: "110px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Tooltip title={item && item.metadata && item.metadata && item.metadata.json_data && item.metadata.json_data.name}  placement="top">
                <Box
                  component={BigTitle}
                  sx={{
                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                    fontSize:'20px',
                    fontWeight:'bold',
                    color:'#0D0D0D'
                  }}
                >
                  {item && item.metadata && item.metadata && item.metadata.json_data && item.metadata.json_data.name}
                </Box>
              </Tooltip>
            </Box>
            <Box
              sx={{
                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                fontSize:'19px',
                color:'#0D0D0D',
                opacity:0.7
              }}
            >
              {
                item && item.user && item.user.username && item.user.username != item.user.username.substring(0,12)+'com' ? item.user.username
                :
                item && item.user &&  item && item.user.wallet && (item.user.wallet).substring(0,5)+ '...' +(item.user.wallet).substring(38,54)
              }
            </Box>
            <Divider/>
            <Box
              sx={{
                mt:'5px',
                display: "flex",
                justifyContent: "space-between",
                flexDirection:'row'
              }}
            >
            
              <Box
                sx={{
                  fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                  fontSize:'19px',
                  color:'#0D0D0D',
                  opacity:0.7
                }}
              >
                {t("cards.sale.price_text")}
              </Box>
              <Box
                sx={{
                  fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                  fontSize:'17.5px',
                  color:'#0D0D0D',
                  opacity:0.7,
                  mt:'5px',
                }}
              >
                {item.sale.price + ' ' + item.sale.coin }
              </Box>
            </Box>
            
          </Box>
        </Card>
      </CardContent>
    </Grid>
  );
};

CardNFT.propTypes = {
    item: PropTypes.object,
    width: PropTypes.number,
    index: PropTypes.number
};

export default CardNFT;