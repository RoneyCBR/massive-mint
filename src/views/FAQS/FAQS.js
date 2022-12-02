import React, { Fragment, useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { sanityFAQS } from 'api/sanity';
import { useTranslation } from 'react-i18next';
import LoaderCircle from 'components/LoaderCircle';
import BlockContent from '@sanity/block-content-to-react';

const FAQS = () => {
    const { t } = useTranslation("translate");
    const [faqs, setFaqs] = useState([]);
    const [loader, setLoader] = useState(false);
    useEffect(()=>{
        window.scrollTo(0,0);
        setLoader(true);
        try {
            sanityFAQS().then(res=>{
                //console.log(res[0]);
                setFaqs(res[0]);
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
            <Box
                id='terms'
                component="h1"
                sx={{ textAlign:'center' , fontSize: '30px' }}
            >
                {t("faqs_view.title")}
            </Box>
            <Container maxWidth="md" sx={{ marginTop: '50px'}}>
                {faqs && faqs.list && 
                    faqs.list.map((item, index)=>(
                        <div key={index}>
                            <Box sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                                {item.question}
                            </Box>
                            <BlockContent
                                blocks={ item.answer }
                                projectId="87sy9d0n"
                            />
                        </div>
                    ))
                }
            </Container>
        </Fragment>
    );
};

export default FAQS;
