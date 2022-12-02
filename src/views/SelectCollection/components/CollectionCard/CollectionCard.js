import React from 'react'
import { Box, Button, CardMedia, Container, Grid, Avatar, Typography } from '@mui/material'
import { Background, BigTitle, DisplayOver,DisplayOverBottom } from './styles/styles'
import { Link } from 'react-router-dom';
import { collections } from './utils/collections'
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const CollectionCard = ({showBtnAll, content, limit}) => {
    const {t} = useTranslation("translate");

    if(content.length === 0) {
        return (
            <Box
                sx={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} 
            >
                <BigTitle>
                    <Typography variant='h4' sx={{color:'#fff'}}>
                        {t("select_collection_view.any_results")}
                    </Typography>
                </BigTitle>
            </Box>
     
        )
    }
    
    return (
        <>
        <Container maxWidth='xl' sx={{marginTop:'1.5rem'}}>
            <Grid 
                container 
                columns={{sm:12, md:12, lg:12, xl:12}}
                rowSpacing={4} 
                spacing={{ xs: 2, md: 3, lg: 3, xl: 3 }}
               
            >
                {content.slice(0, limit).map((item, index)=>(
                <Grid 
                    key={index} 
                    item 
                    sm={12} 
                    md={6} 
                    lg={3} 
                    xl={3}
                    sx={{
                        width:'100%'
                    }}
                >
                    <Link to={`/create/massive-pre-mint-nft?address=${item.project_key}`}>
                        <Background>
                            <CardMedia
                                className={'card-collection'}
                                component={'img'}
                                src={item.is_video ? item.thumb_gif : item.thumb_url_large}
                                autoPlay
                                loop
                                muted
                                sx={{
                                    position:'relative',
                                    borderRadius: '8px 8px 0 0',
                                    height:'100%',
                                    width:'100%',
                                    margin: '0 auto',
                                    transform:   'none',
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
                            <DisplayOverBottom
                            >
                                  <Box
                                    sx={{
                                        padding:'15px'
                                    }}
                                  >
                                            <h2 style={{fontWeight:600, fontSize:'30px', marginBottom:'0px'}}>
                                                {item.name}
                                            </h2>
                                            <Box 
                                                display='inline-flex' 
                                                justifyContent='flex-start'
                                                alignItems='center'
                                                sx={{
                                                    gap:'0.5rem',
                                                    backgroundColor:'rgba(255, 255, 255, 0.2)',
                                                    //filter: 'blur(10px)',
                                                    boxSizing:'border-box',
                                                    padding:'0.5rem',
                                                    borderRadius: '999px',
                                                }}
                                            >
                                                <Avatar variant='circular' src={item.user.profile_pic_url} />
                                                <Box sx={{fontWeight:600, fontSize:'16px'}}>
                                                    {
                                                        item && item.user && item.user.username ? item.user.username
                                                        :
                                                        item && item.owner && String(item.owner ).substring(0,5)+ '...' + String(item.owner).substring(38,54)
                                                    }
                                                </Box>
                                            </Box>
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
}

CollectionCard.propTypes = {
    showBtnAll: PropTypes.bool,
    content: PropTypes.array,
    limit: PropTypes.number,
}

export default CollectionCard