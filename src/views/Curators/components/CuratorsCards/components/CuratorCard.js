import React from 'react';
import PropTypes from 'prop-types';
import { Image } from "semantic-ui-react";
import { Avatar, Box,Card, CardContent,Typography,Divider} from "@mui/material";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CuratorCard =  ({item,width,index}) => {
    const { t } = useTranslation("translate")

    return (
        <CardContent
          sx={{
            p:0,
            width: width,
            height: "100%",
            "&:last-child": {
                textDecoration: "none"
            }
          }}
        >
            <Link 
                to={`/profile?address=${item && item.wallet}`}
                style={{
                    textDecoration: 'none'
                }}
            >   
                <Card
                    item={index}
                    sx={{
                        width: width,
                        height: "100%"
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            height: {xs:'180px',sm:'180px',md:'180px',lg:'180px',xl:'180px'},
                            position:'relative',
                        }}
                    >
                        <Image
                            draggable={false}
                            style={{ width:width,height:'100%'}}
                            src={item && item.banner_url}
                        />
                        <Box
                            sx={{
                                position:'absolute',
                                width:'100%',
                                left:'0px',
                                bottom:'-25px'
                            }}
                        >
                            <Box
                                sx={{
                                    display:'flex',
                                    justifyContent:'center',
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
                                        src={item && item.profile_pic_url}
                                        sx={{
                                            width:'50px',
                                            height:'50px',
                                        }}
                                    />
                                   
                                </Box>
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
                                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                fontSize:'25px',
                                fontWeight:'bold',
                                color:'#0D0D0D',
                                p:'0px 10px',
                                display:'flex',
                                justifyContent:'center',
                                "a":{
                                    textDecoration:'none'
                                }
                            }}
                        >
                            
                            <Typography 
                                variant="overline" 
                                display="block" 
                                gutterBottom 
                                component='p'
                                sx={{
                                    fontSize:'24px',
                                    color:'#000',
                                    fontWeight: 600,
                                    letterSpacing:'-0.01em',
                                    background: 'linear-gradient(110.78deg, #76E650 -1.13%, #F9D649 15.22%, #F08E35 32.09%, #EC5157 48.96%, #FF18BD 67.94%, #1A4BFF 85.34%, #62D8F9 99.57%)',
                                    backgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    marginTop:'-14px',
                                    marginBottom:'-10px',
                                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '                                    
                                    //marginTop:'-30px',
                                }}
                            >
                                
                                {
                                    item && item.username && item.username != item.username.substring(0,12)+'com' ? item.username
                                    :
                                    item && item.wallet && (item.wallet).substring(0,5)+ '...' +(item.wallet).substring(38,54)
                                }
                            </Typography>
                            
                        </Box>
                        <Divider />
                        <CardContent
                            sx={{
                                display:'flex',
                                justifyContent:'space-between',
                            }}
                        >
                            <Box>
                                <Box
                                    sx={{
                                        color:'#000',
                                        fontSize:'24px',
                                        fontWeight: 600,
                                        letterSpacing:'-0.01em',
                                        fontFamily: '"Suisse", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                    }}
                                >
                                {item.followers}
                                </Box>
                                <Box
                                    sx={{
                                        color:'#666',
                                        fontSize:'18px',
                                        fontWeight: 600,
                                    }}
                                >
                                    {t("card_profile.followers")}
                                </Box>
                            </Box>
                            {/* <Divider orientation="vertical" flexItem /> */}
                            <Box>
                                <Box
                                    sx={{
                                        color:'#000',
                                        fontSize:'24px',
                                        fontWeight: 600,
                                        letterSpacing:'-0.01em',
                                        fontFamily: '"Suisse", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                    }}
                                >
                                    {item.nfts}
                                </Box>
                                <Box
                                    sx={{
                                        color:'#666',
                                        fontSize:'18px',
                                        fontWeight: 600,
                                    }}
                                >
                                    NFTs
                                </Box>
                            </Box>

                        </CardContent>                        
                    </Box>
                </Card>
            </Link>
        </CardContent>

    );
};

CuratorCard.propTypes = {
    item: PropTypes.object,
    width: PropTypes.any,
    index: PropTypes.number
};

export default CuratorCard;