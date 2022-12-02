import React from 'react'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/material/Grid'
import { Background, BigTitle, DisplayOver,DisplayOverBottom ,AnyResults, TextName, ContentTextName,ContentDetails, BodyDetails, TextAddress} from './styles'
import { Link } from 'react-router-dom';
import { collections } from './utils/collections'
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const CollectionCard = ({showBtnAll, content, limit,setNewRequest,infinityScroll}) => {
    const {t} = useTranslation("translate");


    let section = 'collectionCards';
    let allCards = document.querySelectorAll("#collectionCards .collectionCard");
    let ultimo = null;

        
    let observerProfile = new IntersectionObserver((cards)=>{
        cards.forEach((card)=>{
            if(card.isIntersecting){
                observerProfile.unobserve(ultimo)
                infinityScroll();
            }
        })
    },
    {
        rootMargin:'0px 0px 10px 0px',
        threshold:1.0
    })
    
    React.useEffect(()=>{
        allCards = document.querySelectorAll("#collectionCards .collectionCard");
        if(allCards && allCards.length > 0){
            ultimo = allCards[allCards.length-1];
            setNewRequest(false)
            observerProfile.observe(ultimo)        
        }
    },[allCards])

    
    if(content.length === 0) {
        return (
            <AnyResults>
                <h2>{t("profile.any_results")}</h2>
            </AnyResults>
     
        )
    }
    
    return (
        <>
        <Container maxWidth='xl' sx={{marginTop:'1.5rem'}}>
            <Grid 
                container 
                columns={{xs:12,sm:12, md:12, lg:12, xl:12}}
                rowSpacing={"20px"} 
                spacing={"20px"}
                id={section}
            >
                {content.slice(0, limit).map((item, index)=>(
                <Grid 
                    key={index} 
                    item 
                    xs={12}
                    sm={6} 
                    md={6} 
                    lg={3} 
                    xl={3}
                    sx={{
                        width:'100%'
                    }}
                    className={"collectionCard"}
                >
                    <Link to={`/collection?address=${item.project_key}`}>
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
                                    borderRadius: '8px 8px 0 0',
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
                                    <ContentTextName>
                                        <Tooltip title={item.name}  placement="top">
                                            <Box
                                                sx={{
                                                    width:'auto',
                                                    boxSizing:'border-box',
                                                    maxWidth:'100%'
                                                }}
                                            >
                                                <TextName>
                                                    {item.name}
                                                </TextName>
                                            </Box>
                                        </Tooltip>
                                    </ContentTextName> 

                                    <ContentDetails>
                                        <BodyDetails>
                                            <Avatar variant='circular' src={item.user.profile_pic_url} />
                                            <TextAddress>
                                                {
                                                    item && item.user && item.user.username ? item.user.username
                                                    :
                                                    item && item.owner && String(item.owner ).substring(0,5)+ '...' + String(item.owner).substring(38,54)
                                                }
                                            </TextAddress>
                                        </BodyDetails>
                                    </ContentDetails> 
                                </Box>
                            </DisplayOverBottom>
                        </Background>
                    </Link>
                </Grid>))}
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
                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                    '&:hover':{
                        backgroundColor:'#000',
                        transition:'background-color 0.3s ease-in-out',
                        color:'#fff',
                        border:'1px solid #000',
                    }
                }}
            >
                View all Collections
            </Button>
        </Container>)}
        </>
    )

}

CollectionCard.defaultProps = {
    showBtnAll: false,
    content: collections,
    limit: 8,
    infinityScroll: ()=>{console.log("");},
    setNewRequest: ()=>{console.log("");}
}

CollectionCard.propTypes = {
    showBtnAll: PropTypes.bool,
    content: PropTypes.array,
    limit: PropTypes.number,
    infinityScroll: PropTypes.func,
    setNewRequest: PropTypes.func
}

export default CollectionCard