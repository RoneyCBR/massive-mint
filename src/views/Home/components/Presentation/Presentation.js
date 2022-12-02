import React, { useEffect, useState } from 'react';
import {Box,CardMedia,Grid} from '@mui/material';
import UniquePeopleLogo from 'assets/images/png/slogan_blanco_1.png';
import ArtcryptedWhiteLogo from 'assets/images/png/logosolo_blanco.png';
import { nft } from './utils/nft';
import { Link } from 'react-router-dom';
import { header } from 'api/sanity';
import BlockContent from '@sanity/block-content-to-react';
import PropTypes from 'prop-types';

const Presentation = ({content}) =>{
    const [readyUnique, setReadyUnique] = useState(false);
    const [titleHeader, setTitleHeader] = useState([0])
    useEffect(()=>{
        header().then(response=>setTitleHeader(response[0]))
        .catch(error=>console.error(error))
    },[])
    return (
        <Grid container columns={{xs:12,sm:12,md:12,lg:12,xl:12}}
            sx={{
                width:'100%',
                height:readyUnique?'100%':'100vh',
                display:'flex',
                alignItems:'center'
            }}
        >
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}
                className={readyUnique ? 'fadeInLeft1':''}
                sx={{
                    display:readyUnique ?'auto':'none'
                }}
            >
                <Box
                    sx={{
                        width:'100%',
                        display:'flex',
                        justifyContent:'center',
                        mt:{xs:'40px',sm:'40px',md:'40px',lg:'0px',xl:'0px'}
                    }}
                >
                    <Box
                        sx={{
                            width:{xs:'61%',sm:'58%',md:'58%',lg:'90%',xl:'70%'}
                        }}
                    >
                        <CardMedia
                            component="img"
                            src={UniquePeopleLogo}
                            onLoad={()=>setReadyUnique(true)}
                            sx={{display:'none'}}
                        />
                        <Box
                            sx={{
                                //display:'none',
                                width:'100%',
                                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                fontSize:'5.15rem',
                                //fontWeight:'bold',
                                color:'#FFF',
                                marginBottom:'20px',
                                '& > div > p':{
                                    marginTop:'0px',
                                    marginBottom:'0px',
                                    lineHeight:'0.99',
                                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                    fontSize:'5.15rem',
                                }
                            }}
                        >
                            {
                                titleHeader != null && titleHeader.title != null &&
                                <BlockContent blocks={titleHeader.title} projectId="87sy9d0n" />
                            }
                        </Box>
                        <Box
                            sx={{
                                width:'100%',
                                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                fontSize:'1.75rem',
                                fontWeight:'bold',
                                color:'#0D0D0D',
                                '& > div > p':{
                                    marginTop:'0px',
                                    marginBottom:'0px',
                                    lineHeight:'0.99',
                                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                    fontSize:'1.75rem',
                                }
                            }}
                        >
                            {
                                titleHeader != null && titleHeader.subtitle != null &&
                                <BlockContent blocks={titleHeader.subtitle} projectId="87sy9d0n" />
                            }
                        </Box>
                        <Box
                            sx={{
                                width:'100%',
                                display:'none',
                                justifyContent:'center'
                            }}
                        >
                            <CardMedia
                                component={"img"}
                                src={ArtcryptedWhiteLogo}
                                sx={{
                                    width:{xs:'140px',sm:'200px',md:'200px',lg:'200px',xl:'200px'},
                                    marginRight:{xs:'0px',sm:'0px',md:'50px'},
                                   
                                }}
                            />
                        </Box>
                           
                    </Box>
                    
                </Box>


            </Grid>
                
       

            <Grid  item xs={12} sm={12} md={12} lg={6} xl={6}
                sx={{
                    width:'100%',
                    overflow:'hidden'
                }}
            >
                <Box
                    sx={{
                        width:'75%',
                        height:'100%',
                        display:'flex',
                        alignItems:'center',
                        margin:'0 auto',
                        "@media screen and (max-width: 1568px)":{
                            width:'95%'
                        }                    
                    }}
                >
                    <Grid container columns={{xs:12,sm:12,md:12,lg:12,xl:12}}
                        sx={{
                            width:'100%',
                            mt:{xs:'0px',sm:'0px',md:'5px'}
                        }}
                    >
                        {
                            readyUnique && content?.slice(0,4).map((item,index)=>{
                                return  <Grid key={index} item xs={6} sm={6} md={6} lg={6} xl={6} 
                                    className={'presentation-fadeIn'+index}
                                    sx={{
                                        width:'100%',
                                        display:'flex',
                                        justifyContent:'center',
                                        mt:index==0 || index == 2 ?'0px':'20px',
                                        mb:index==0 || index == 2 ?'0px':'20px'
                                    }}
                                >        
                                    <Box
                                        component={Link}
                                        to={`/nft?address=${item.project_key}&token_id=${item.token_id}&domain=${process.env.REACT_APP_DOMAIN}`}
                                        sx={{
                                            width:'270px',
                                            height:'285px',
                                            background:`url(${item.metadata.is_video ? item.thumb_gif : item.thumb_resize})`,
                                            backgroundSize:'cover',
                                            backgroundPosition:'center',
                                            backgroundRepeat:'no-repeat',
                                            textDecoration: 'none',
                                            "@media screen and (max-width: 1300px)":{
                                                width:'250px',
                                                height:'270px',
                                            },
                                            "@media screen and (max-width: 750px)":{
                                                width:'160px',
                                                height:'190px',
                                            },
                                            "@media screen and (max-width: 375px)":{
                                                width:'130px',
                                                height:'150px',
                                            },
                                            borderRadius:'5px'
                                        }}
                                    />
                                
                                </Grid>
                            })
                        
                        }
                    </Grid>
                </Box>
            </Grid>
      
        </Grid>
    );
}

Presentation.defaultProps = {
    content: nft,
}

Presentation.propTypes = {
    content: PropTypes.array,
}

export default Presentation;