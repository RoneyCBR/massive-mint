import React, { Fragment, useEffect, useState } from 'react';
import { Box, CardMedia, Container } from '@mui/material';
import { sanityRoadmap } from 'api/sanity';
import LoaderCircle from 'components/LoaderCircle';
import { useTranslation } from 'react-i18next';
import BlockContent from '@sanity/block-content-to-react';

const RoadMap = () => {
    const { t } = useTranslation("translate");
    const [roadmap, setRoadmap] = useState([]);
    const [loader, setLoader] = useState(false);
    useEffect(()=>{
        window.scrollTo(0,0);
        setLoader(true);
        try {
            sanityRoadmap().then(res=>{
                //console.log(res[0]);
                setRoadmap(res[0]);
                setLoader(false);
            })
        } catch (error) {
            console.error(error);
            setLoader(false);
        }
    },[]);
    if (loader) {
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
        <Fragment>
            {roadmap && roadmap.title && 
                <Box
                    id='terms'
                    component="h1"
                    sx={{ textAlign:'center' , fontSize: '30px' }}
                >
                    {roadmap.title}
                </Box>
            }
            <Container maxWidth="md" sx={{ marginTop: '50px'}}>
                {roadmap && roadmap.headerImage && 
                    <CardMedia
                        component="img"
                        src={roadmap.headerImage.asset.url}
                        alt="roadmap"
                        sx={{ width: '50%', margin: '0 auto' }}
                    />
                }
                <Container maxWidth="md" sx={{ marginTop: '50px' }}>
                    {roadmap && roadmap.block && 
                        roadmap.block.map((block, index)=>(
                            <div key={index}>
                                {console.log(block, index)}
                                {block.year && 
                                    <Box component="h2" sx={{ color: '#735cff', fontSize: '25px' }}>
                                        {block.year}
                                    </Box>
                                }
                                {block.lapse && 
                                    <Box component="h3" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                                        {block.lapse}
                                    </Box>
                                }
                                {block.titleDescription && 
                                    <Box component="h4" sx={{ fontSize: '18px' }}>
                                        {block.titleDescription}
                                    </Box>
                                }
                                <BlockContent
                                    blocks={ block.description }
                                    projectId="87sy9d0n"
                                />
                            </div>
                        ))
                    }
                </Container>
            </Container>
        </Fragment>
    );
};

export default RoadMap;
