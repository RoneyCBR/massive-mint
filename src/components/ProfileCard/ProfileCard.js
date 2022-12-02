import React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { profiles } from './utils/profiles'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ProfileCard = ({showBtnAll, content, limit,setNewRequest,infinityScroll,loadingProfileData}) => {
    const {t} = useTranslation("translate");
    let contentProfile = 'sectionProfile';
    let allCardsProfile = document.querySelectorAll("#sectionProfile div");
    let ultimo = null;
    
    React.useEffect(()=>{
        if(!loadingProfileData){
            let observerNFtExplore = new IntersectionObserver((cards)=>{
                cards.forEach((card)=>{
                    if(card.isIntersecting){
                        observerNFtExplore.unobserve(ultimo)
                        infinityScroll();
                    }
                })
            },
            {
                rootMargin:'0px 0px 270px 0px',
                threshold:1.0
            })

            allCardsProfile = document.querySelectorAll("#sectionProfile div");
            if(allCardsProfile && allCardsProfile.length > 0){
                ultimo = allCardsProfile[allCardsProfile.length-1];
                setNewRequest(false) 
                observerNFtExplore.observe(allCardsProfile[allCardsProfile.length-1])
            }
        }
    },[allCardsProfile,loadingProfileData,limit])

    if(content == null || (content && content.length === 0)) {
        return (
            <Box
                sx={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center',mt:'20px'}}
            >
                {!loadingProfileData &&
                <Typography variant='h4' sx={{color:'#A658D8',fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>
                    {t("explore.not_found")}
                </Typography>
                }
            </Box>
     
        )
    }


    return <>
        <Container maxWidth='xl' sx={{marginTop:'1.5rem'}}>
            <Grid 
                container 
                columns={{xs:12,sm:12, md:12, lg:12, xl:12}}
                rowSpacing={"20px"} 
                spacing={"20px"}
                id={contentProfile}
            >
                { content?.slice(0,limit).map((item, index)=>{
                        return  <Grid 
                            key={index} 
                            item 
                            xs={12}
                            sm={6} 
                            md={6} 
                            lg={3} 
                            xl={3}
                            sx={{
                                width:'100%',
                                minHeight:'400px'
                            }}
                            className={"profileCard"}
                        >
                            <Link 
                                to={`/profile?address=${item.wallet}`}
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <Card
                                    sx={{
                                        width:'100%',
                                        borderRadius:'8px',
                                        cursor:'pointer',
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        src={item && item.banner_url.length == 0 ? item.profile_pic_url:item.banner_url}
                                        alt="art"
                                        autoPlay
                                        loop
                                        muted
                                        sx={{
                                            borderRadius: '8px 8px 0 0',
                                            height: {xs:'180px',sm:'180px',md:'180px',lg:'180px',xl:'180px'},
                                            width:'100%',
                                            margin: '0 auto',
                                        }}
                                    />
                                    <CardContent
                                        sx={{
                                            display:'flex',
                                            flexDirection:'column',
                                            marginBottom:'-28px',
                                        }}
                                    >
                                        <Box>
                                            <Avatar 
                                                src={item.profile_pic_url}
                                                sx={{
                                                    marginTop:'-40px',
                                                    border: '4px solid #fff',
                                                    width: 65, 
                                                    height: 65
                                                }}
                                            />  
                                        </Box>
                                        <Box
                                            sx={{
                                                display:'flex',
                                                justifyContent:'flex-start',
                                            }}
                                        >   
                                            <Box
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
                                                        fontSize:'24px',
                                                        borderRadius: '10px',
                                                        background: 'linear-gradient(110.78deg, #76E650 -1.13%, #F9D649 15.22%, #F08E35 32.09%, #EC5157 48.96%, #FF18BD 67.94%, #1A4BFF 85.34%, #62D8F9 99.57%)',
                                                        backgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent'
                                                    }}
                                                >
                                                    {
                                                    item && item.username != item.username.substring(0,12)+'com' ? '@'+item.username
                                                    :
                                                    item && item.username && '@'+(item.username).substring(0,5)+ '...' +(item.username).substring(38,54)
                                                    }
                                                </Box>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                    <Box
                                        display='flex'
                                        justifyContent='space-between'
                                        sx={{
                                            marginTop:'20px',
                                            borderTop:'1px solid #e0e0e0',
                                        }}
                                    >
                                        <CardContent>
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
                                                {t("cards.profile.follower_text")}
                                            </Box>
                                        </CardContent>
                                        <CardContent>
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
                                        </CardContent>
                                    </Box>
                                </Card>
                            </Link>
                        </Grid>
                    }
                )}
            </Grid>
        </Container>
        {showBtnAll &&
        (<Container 
            maxWidth='sm' 
            sx={{
                display: 'flex',
                marginTop:'2rem',
                justifyContent:'center',
            }}
        >
            <Button
                variant="outlined"
                type="button"
                sx={{
                    borderRadius:'9999px',
                    backgroundColor:'#fff',
                    color:'#000',
                    border:'1px solid #e3e3e3',
                    fontSize:'18px',
                    '&:hover':{
                        backgroundColor:'#000',
                        transition:'background-color 0.3s ease-in-out',
                        color:'#fff',
                        border:'1px solid #000',
                    }
                }}
            >
                View all Profiles
            </Button>
        </Container>)}
    </>
}

ProfileCard.defaultProps = {
    showBtnAll: false,
    content: profiles,
    limit: 8,
    infinityScroll: ()=>{},
    setNewRequest: ()=>{},
    loadingProfileData:false
}

ProfileCard.propTypes = {
    showBtnAll: PropTypes.bool,
    content: PropTypes.array,
    limit: PropTypes.number,
    infinityScroll: PropTypes.func,
    setNewRequest: PropTypes.func,
    loadingProfileData: PropTypes.bool
}

export default ProfileCard