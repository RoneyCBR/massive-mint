import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { sanityPrivacyPolicy } from 'api/sanity';
import LoaderCircle from 'components/LoaderCircle';
import BlockContent from '@sanity/block-content-to-react';

const PrivacyPolicy = () => {
    const { t } = useTranslation("translate");
    const [privacy, setPrivacy] = useState([]);
    const [loader, setLoader] = useState(false);
    useEffect(()=>{
        window.scrollTo(0,0);
        setLoader(true);
        try {
            sanityPrivacyPolicy().then(res=>{
                console.log('res[0', res[0]);
                setPrivacy(res[0]);
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
        <Container maxWidth='md'>
            {privacy && privacy.title && 
                <Box
                    id='terms'
                    component="h1"
                    sx={{ textAlign:'center' , fontSize: '30px' }}
                >
                    {privacy.title}
                </Box>
            }
            <Container maxWidth="lg" sx={{ marginTop: '5%' }}>
                {privacy && privacy.body && 
                    privacy.body.map((block, index)=>(
                        <Box key={index} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Box component="h1">{block.title}</Box>
                            <BlockContent
                                blocks={ block.body }
                                projectId="87sy9d0n"
                            />
                        </Box>
                    ))}
            </Container>
        </Container>
    );
};

export default PrivacyPolicy;