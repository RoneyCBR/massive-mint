import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { sanityTermsAndConditions } from 'api/sanity';
import LoaderCircle from 'components/LoaderCircle';
import BlockContent from '@sanity/block-content-to-react';

const TermsAndConditions = () => {
    const { t } = useTranslation("translate");
    const [terms, setTerms] = useState([]);
    const [loader, setLoader] = useState(false);
    useEffect(()=>{
        window.scrollTo(0,0);
        setLoader(true);
        try {
            sanityTermsAndConditions().then(res=>{
                console.log('res[0', res[0]);
                setTerms(res[0]);
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
            {terms && terms.header && 
                <Box
                    id='terms'
                    component="h1"
                    sx={{ textAlign:'center' , fontSize: '30px' }}
                >
                    {terms.header}
                </Box>
            }
            <Container maxWidth="lg" sx={{ marginTop: '5%' }}>
                {terms && terms.body && 
                    terms.body.map((block, index)=>(
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

export default TermsAndConditions;
