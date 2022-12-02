import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box,Card, CardContent,Divider,Grid} from "@mui/material";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CardCurators =  ({item,width,index}) => {
    const { t } = useTranslation("translate")
    return (
        <Grid item  xs={12} sm={12} md={12} lg={12} xl={12}
            sx={{
                width:{xs:'calc(100% - 10px)',sm:'calc(100% - 20px)',md:'calc(100% - 40px)',lg:'calc(100% - 70px)'},
            }}
        >
            <CardContent
                sx={{
                    padding:'0px 0px',
                    width:"100%",
                    height: "100%",
                    "&:last-child":{
                        padding:'5px 0px'
                    }
                }}
            >
                <Card
                    className={`${width}-w`}
                    draggable={false}
                    item={index}
                    sx={{
                       width:"100%",
                       height: "100%"
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            height:{xs:'100px',sm:'100px',md:'100px',lg:'120px',xl:'180px'},
                            position:'relative'
                        }}
                    >
                        <Link 
                            to={`/profile?address=${item && item.wallet}`}
                            style={{
                                textDecoration: 'none',
                            }}
                        >
                            <Box
                                draggable={false}
                                sx={{
                                    width:'100%',
                                    height:'100%',
                                    backgroundImage: `url(${item && item.banner_url && item.banner_url})`,
                                    backgroundSize:'cover',
                                    backgroundPosition:'center',
                                    borderRadius:'10px 10px 0px 0px',
                                
                                }}
                            />
                        </Link>
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
                                    <Link 
                                    to={`/profile?address=${String(item.wallet).length > 0 && item.wallet}`}
                                        style={{
                                            textDecoration: 'none',
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
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                    
                    </Box>
                    <br/>
                    <Box
                        sx={{
                            p:1,
                            width:'100%',
                        }}
                    >
                        <Box
                            sx={{
                                display:'flex',
                                justifyContent:'center'
                            }}
                        >   
                            <Box
                                component={Link}
                                to={`/profile?address=${String(item.wallet).length > 0 && item.wallet}`}
                                sx={{
                                    width:'auto',
                                    boxSizing:'border-box',
                                    maxWidth:{xs:'90%',sm:'90%',md:'90%',lg:'90%',xl:'80%'},
                                    textDecoration: 'none'
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
                                        fontSize:'28px',
                                        borderRadius: '10px',
                                        background: 'linear-gradient(110.78deg, #76E650 -1.13%, #F9D649 15.22%, #F08E35 32.09%, #EC5157 48.96%, #FF18BD 67.94%, #1A4BFF 85.34%, #62D8F9 99.57%)',
                                        backgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                                    {
                                        item && item.username && item.username != item.username.substring(0,12)+'com' ? '@'+item.username 
                                        :
                                        item && item.username && '@'+(item.wallet).substring(0,5)+ '...' +(item.wallet).substring(38,54)
                                    }
                                </Box>
                            </Box>
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
            </CardContent>
        </Grid>
    );
};

CardCurators.propTypes = {
    item: PropTypes.object,
    width: PropTypes.any,
    index: PropTypes.number
};

export default CardCurators;