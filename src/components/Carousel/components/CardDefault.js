import React from 'react';
import PropTypes from 'prop-types';
import { Box,Card, CardContent, CardMedia, Grid} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CardDefault = ({images,type,width,query}) => {
    const {t} = useTranslation("translate");
    return (
        <React.Fragment>
            {
                type=="auction" &&
                <Grid item  xs={12} sm={12} md={12} lg={12} xl={12}
                    sx={{
                        width:{xs:'calc(100% - 10px)',sm:'calc(100% - 20px)',md:'calc(100% - 40px)',lg:'calc(100% - 70px)'}
                    }}
                >
                    <CardContent
                        draggable="false"
                        sx={{
                            padding:'0px 0px',
                            width: "100%",
                            height: "100%",
                            "&:last-child":{
                                padding:'5px 0px'
                            },
                            display:'flex',
                            alignItems:'center'
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                height: '100%',
                                position:'relative'
                            }}
                        >

                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    display:'grid',
                                    gridTemplateColumns:`repeat(3,1fr)`,

                                }}
                            >

                                {
                                    images?.map((item,index)=>{
                                        return (
                                            index <= 5 &&
                                            <Card key={index}
                                                sx={{
                                                    width: "100%",
                                                    height: {xs:(width / 2) -30,sm:(width / 2) + 32,md:(width / 2) + 37,lg:(width / 2) + 22},
                                                    borderRadius:index == 0 ? '8px 0px 0px 0px':index == 2 ? '0px 8px 0px 0px':index==3?'0px 0px 0px 8px':index==5?'0px 0px 8px 0px':'0px 0px'
                                                }}
                                            >
                                                <CardMedia   
                                                    component="img"
                                                    src={item && item.metadata && item.metadata.is_video ? item && item.thumb_gif: item && item.thumb_url_large}
                                                    sx={{
                                                        height: "100%"
                                                    }}
                                                />
                                            </Card>
                                        )
                                    })
                                }


                            </Box>
                            <Box
                                sx={{
                                    position:'absolute',
                                    left:'0px',top:'0px',
                                    width: "100%",
                                    height: "100%"
                                }}
                                >

                                    <Box
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            display:'flex',
                                            justifyContent:'center',
                                            alignItems:'center'                                        
                                        }}
                                    >
                                        <Link 
                                            to={`/explore?${query}`}
                                            style={{
                                                display:'flex',
                                                alignItems:'center',
                                                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                                fontSize:'30px',
                                                fontWeight:'bold',
                                                color:'#000',
                                                textDecoration:'none',
                                                "@media screen and (maxWidth: 380px)":{
                                                    fontSize:'18px',
                                                },
                                                cursor:'pointer',
                                                "a:hover":{
                                                    color:'#A630D9',
                                                    opacity:'0.3'
                                                },
                                                borderRadius:'8px 8px',
                                                backgroundColor:'rgba(255,255,255,0.4)',
                                                padding:'5px 5px'
                                            }}
                                        >
                                            <AddIcon sx={{fontSize:'50px',color:'#000'}} />{t("home.view_more")}
                                        </Link>
                                    </Box>

                            </Box>
                        </Box>
                    </CardContent>
                </Grid>
            }
            {
                type === "nft" && 
                <Grid item  xs={12} sm={12} md={12} lg={12} xl={12}
                    sx={{
                        width:{xs:'calc(100% - 10px)',sm:'calc(100% - 20px)',md:'calc(100% - 40px)',lg:'calc(100% - 70px)'}
                    }}
                >
                    <CardContent
                        draggable="false"
                        sx={{
                            padding:'0px 0px',
                            width: "100%",
                            height: "100%",
                            "&:last-child":{
                                padding:'5px 0px'
                            },
                            display:'flex',
                            alignItems:'center'
                        }}
                    >
                        <Box
                            className={`${width}-w`}
                            sx={{
                                width: "100%",
                                height: '100%',
                                position:'relative'
                            }}
                        >

                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    display:'grid',
                                    gridTemplateColumns:`repeat(3,1fr)`,
                                    boxSizing: 'border-box',
                                }}
                            >
                                {
                                    images?.map((item,index)=>{
                                        return (
                                            index <= 5 &&
                                            <Card key={index}
                                                sx={{
                                                    width: "100%",
                                                    boxSizing: 'border-box',
                                                    height: {xs:"165px",sm:"185px",md:"140px",lg:"155px",xl:"240px"},
                                                    borderRadius:index == 0 ? '8px 0px 0px 0px':index == 2 ? '0px 8px 0px 0px':index==3?'0px 0px 0px 8px':index==5?'0px 0px 8px 0px':'0px 0px'
                                                }}
                                            >
                                                <CardMedia   
                                                    component="img"
                                                    src={item && item.metadata && item.metadata.is_video ? item && item.thumb_gif: item && item.thumb_url_large}
                                                    sx={{
                                                        height: "100%"
                                                    }}
                                                />
                                            </Card>
                                        )
                                    })
                                }
                            </Box>
                            <Box
                                sx={{
                                    position:'absolute',
                                    left:'0px',top:'0px',
                                    width: "100%",
                                    height: "100%"
                                }}
                                >

                                    <Box
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            display:'flex',
                                            justifyContent:'center',
                                            alignItems:'center'                                        
                                        }}
                                    >
                                        <Link 
                                            to={`/explore?${query}`}
                                            style={{
                                                display:'flex',
                                                alignItems:'center',
                                                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                                fontSize:'30px',
                                                fontWeight:'bold',
                                                color:'#000',
                                                textDecoration:'none',
                                                "@media screen and (maxWidth: 380px)":{
                                                    fontSize:'18px',
                                                },
                                                cursor:'pointer',
                                                "a:hover":{
                                                    color:'#A630D9',
                                                    opacity:'0.3'
                                                },
                                                borderRadius:'8px 8px',
                                                backgroundColor:'rgba(255,255,255,0.4)',
                                                padding:'5px 5px'
                                            }}
                                        >
                                            <AddIcon sx={{fontSize:'50px',color:'#000'}} />{t("home.view_more")}
                                        </Link>
                                    </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Grid>
            }
            {
                (type === "profile" || type=="curators") &&
                <Grid item  xs={12} sm={12} md={12} lg={12} xl={12}
                    sx={{
                        width:{xs:'calc(100% - 10px)',sm:'calc(100% - 20px)',md:'calc(100% - 40px)',lg:'calc(100% - 70px)'}
                    }}
                >
                    <CardContent
                        draggable="false"
                        sx={{
                            padding:'0px 0px',
                            width: "100%",
                            height: "100%",
                            "&:last-child":{
                                padding:'5px 0px'
                            },
                            display:'flex',
                            alignItems:'center'
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                height: '100%',
                                position:'relative'
                            }}
                        >

                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    display:'grid',
                                    gridTemplateColumns:`repeat(3,1fr)`,

                                }}
                            >

                                {
                                    images?.map((item,index)=>{
                                        return (
                                            index <= 5 &&
                                            <Card key={index}
                                                sx={{
                                                    width: "100%",
                                                    height: {xs:"143px",sm:"143px",md:"143px",lg:"143px",xl:"183px"},
                                                    borderRadius:index == 0 ? '8px 0px 0px 0px':index == 2 ? '0px 8px 0px 0px':index==3?'0px 0px 0px 8px':index==5?'0px 0px 8px 0px':'0px 0px'
                                                }}
                                            >
                                                <CardMedia   
                                                    component="img"
                                                    src={item && item.banner_url && item.banner_url}
                                                    sx={{
                                                        height: "100%"
                                                    }}
                                                />
                                            </Card>
                                        )
                                    })
                                }
                            </Box>
                            <Box
                                sx={{
                                    position:'absolute',
                                    left:'0px',top:'0px',
                                    width: "100%",
                                    height: "100%"
                                }}
                                >

                                    <Box
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            display:'flex',
                                            justifyContent:'center',
                                            alignItems:'center'                                        
                                        }}
                                    >
                                        <Link 
                                            to={String(query).toUpperCase().includes("CURATORS") ? `/curators`:`/explore?${query}`}
                                            style={{
                                                display:'flex',
                                                alignItems:'center',
                                                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                                fontSize:'30px',
                                                fontWeight:'bold',
                                                color:'#000',
                                                textDecoration:'none',
                                                "@media screen and (maxWidth: 380px)":{
                                                    fontSize:'18px',
                                                },
                                                cursor:'pointer',
                                                "a:hover":{
                                                    color:'#A630D9',
                                                    opacity:'0.3'
                                                },
                                                borderRadius:'8px 8px',
                                                backgroundColor:'rgba(255,255,255,0.4)',
                                                padding:'5px 5px'
                                            }}
                                        >
                                            <AddIcon sx={{fontSize:'50px',color:'#000'}} />{t("home.view_more")}
                                        </Link>
                                    </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Grid>
            }
            {
                type === "collections" &&
                <Grid item  xs={12} sm={12} md={12} lg={12} xl={12}
                    sx={{
                        width:{xs:'calc(100% - 10px)',sm:'calc(100% - 20px)',md:'calc(100% - 40px)',lg:'calc(100% - 70px)'}
                    }}
                >
                    <CardContent
                        draggable="false"
                        sx={{
                            padding:'0px 0px',
                            width: "100%",
                            height: "100%",
                            "&:last-child":{
                                padding:'5px 0px'
                            },
                            display:'flex',
                            alignItems:'center'
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                height: '100%',
                                position:'relative'
                            }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    display:'grid',
                                    gridTemplateColumns:`repeat(3,1fr)`,

                                }}
                            >
                                {
                                    images?.map((item,index)=>{
                                        return (
                                            index <= 5 &&
                                            <Card key={index}
                                                sx={{
                                                    width: "100%",
                                                    height: {xs:"150px",sm:"170px",md:"125px",lg:"155px",xl:"240px"},
                                                    borderRadius:index == 0 ? '8px 0px 0px 0px':index == 2 ? '0px 8px 0px 0px':index==3?'0px 0px 0px 8px':index==5?'0px 0px 8px 0px':'0px 0px'
                                                }}
                                            >
                                                <CardMedia   
                                                    component="img"
                                                    src={item && item.thumb_url}
                                                    sx={{
                                                        height: "100%"
                                                    }}
                                                />
                                            </Card>
                                        )
                                    })
                                }
                            </Box>
                            <Box
                                sx={{
                                    position:'absolute',
                                    left:'0px',top:'0px',
                                    width: "100%",
                                    height: "100%"
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        display:'flex',
                                        justifyContent:'center',
                                        alignItems:'center'                                        
                                    }}
                                >
                                    <Link 
                                        to={`/explore?${query}`}
                                        style={{
                                            display:'flex',
                                            alignItems:'center',
                                            fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                            fontSize:'30px',
                                            fontWeight:'bold',
                                            color:'#000',
                                            textDecoration:'none',
                                            "@media screen and (maxWidth: 380px)":{
                                                fontSize:'18px',
                                            },
                                            cursor:'pointer',
                                            "a:hover":{
                                                color:'#A630D9',
                                                opacity:'0.3'
                                            },
                                            borderRadius:'8px 8px',
                                            backgroundColor:'rgba(255,255,255,0.4)',
                                            padding:'5px 5px'
                                        }}
                                    >
                                        <AddIcon sx={{fontSize:'50px',color:'#000'}} />{t("home.view_more")}
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Grid>
            }
        </React.Fragment>
    );
};

CardDefault.propTypes = {
    images: PropTypes.array,
    type: PropTypes.string,
    width: PropTypes.any,
    query: PropTypes.string
};

export default CardDefault;

