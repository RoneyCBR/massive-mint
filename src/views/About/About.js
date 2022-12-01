import React, { Suspense, useEffect, useState } from 'react'
import { Box, CardMedia, Container } from '@mui/material'
import ErrorBoundary from 'components/ErrorBoundary';
import BlockContent from '@sanity/block-content-to-react';
import { useTranslation } from 'react-i18next';
import LoaderCircle from 'components/LoaderCircle';
import ServerError from 'components/ServerError';
import { aboutSanity } from 'api/sanity';
import { Link } from 'react-router-dom';

const About = () => {
    const { t } = useTranslation("translate");
    const [about, setAbout] = useState([]);
    const [loader, setLoader] = useState(false);
    useEffect(()=>{
        window.scrollTo(0,0);
        setLoader(true);
        try {
            aboutSanity().then(res=>{
                setAbout(res[0]);
                setLoader(false);
            })
        } catch (error) {
            console.error(error);
            setLoader(false);
        }
    },[]);
    if(loader) {
        return (
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ height: '100vh' }}
            >
                <LoaderCircle text={t('message_loader.loading')} />
            </Box>
        );
    }
    return (
        <>
            <Box
                id='terms'
                component="h1"
                sx={{ textAlign:'center' , fontSize: '30px' }}
            >
                {t("about.about")}
            </Box>
            <Container maxWidth='md'>
                <ErrorBoundary fallback={<ServerError />}>
                    <Suspense fallback={<LoaderCircle text='loading' />}>
                        <Container maxWidth="lg" sx={{ marginTop: '5%' }}>
                            {about && about.header &&
                                <BlockContent
                                    blocks={ about.header }
                                    projectId="87sy9d0n"
                                />
                            }
                            <Box sx={{ marginBottom: '50px' }}>
                                {about && about.headerImage &&
                                    <CardMedia
                                        component="img"
                                        src={about.headerImage.asset.url}
                                        alt="artcrypted"
                                        sx={{ width: '50%', margin: '0 auto' }}
                                    />
                                }
                            </Box>
                            {about && about.blockBody &&
                                about.blockBody.map((block, index)=>(
                                    <Box key={index}>
                                        {block.blockTitle && 
                                            <Box sx={{ fontSize: '25px', color:'#735cff' }}>
                                                {block.blockTitle}
                                            </Box>
                                        }
                                        <BlockContent
                                            blocks={ block.block }
                                            projectId="87sy9d0n"
                                        />
                                    </Box>
                                ))
                            }
                            <Box sx={{ marginBottom: '50px' }}>
                                {about && about.bodyImage &&
                                    <CardMedia
                                        component="img"
                                        src={about.bodyImage.asset.url}
                                        alt="artcrypted"
                                        sx={{ width: '50%', margin: '0 auto' }}
                                    />
                                }
                            </Box>
                            <Box sx={{ fontSize: '25px' }}>
                                {about.blockTitle}
                            </Box>
                            {about && about.links &&
                                about.links.map((block, index)=>(
                                    <Box component="ul" key={index}>
                                        {!block.isLink && !block.externalLink &&
                                        <Box 
                                            component="li"
                                            //key={index} 
                                            sx={{fontSize:{xs:'16px',sm:'22px'}, color:'#000'}}
                                        >
                                            {block.item}
                                        </Box>}
                                        {block.isLink && block.externalLink && block.link &&
                                        <Box 
                                            component="li"
                                            //key={index} 
                                        >
                                            <Box
                                                component='a'
                                                href={block.link}
                                                target='_blank'
                                                sx={{fontSize:{xs:'16px',sm:'22px'}, color:'#000', textDecoration:'none', cursor:'pointer'}}
                                            >
                                                    {block.item}
                                            </Box>
                                        </Box>}
                                        {block.isLink && !block.externalLink &&
                                        <Box 
                                            component="li"
                                            //key={index} 
                                        >
                                            <Box
                                                component={Link}
                                                to={block.link}
                                                sx={{fontSize:{xs:'16px',sm:'22px'}, color:'#000', textDecoration:'none', cursor:'pointer'}}
                                            >
                                                {block.item}
                                            </Box>
                                        </Box>}
                                    </Box>
                                ))
                            }
                        </Container>
                    </Suspense>
                </ErrorBoundary>
            </Container>
        </>
    )
}

export default About