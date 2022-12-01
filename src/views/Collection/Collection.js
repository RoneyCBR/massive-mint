import React, { useEffect, useState } from 'react'
import { Box, Container } from '@mui/material';
import { useLocation } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import SectionNFTs from './components/SectionNFTs';
import CollectionHeader from './components/CollectionHeader';
import LoaderCircle from 'components/LoaderCircle';
import ErrorMessage from 'components/ErrorMessage';
import TabSelector from 'components/TabSelector';
import LoaderNFT from 'components/LoaderNFT';
import Description from './components/Description';
import { useTranslation } from 'react-i18next'
import OfferHistory from 'components/OfferHistory';

const Collection = () => {
    const { t } = useTranslation("translate")
    const [activeTab, setActiveTab] = useState(1)
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const address = query.get("address")
    const project = `${process.env.REACT_APP_URL_API}/project?address=${address}&domain=${process.env.REACT_APP_DOMAIN}`
    const nft = `${process.env.REACT_APP_URL_API}/nft?address=${address}&domain=${process.env.REACT_APP_DOMAIN}&limit=10000&page=0&order=created`
    const historyUrl = process.env.REACT_APP_URL_API+`/history?domain=${process.env.REACT_APP_DOMAIN}&address=${address}&blockchain=${process.env.REACT_APP_NETWORK_NAME}`
    const {loading, error, data} = useFetch(project)
    const {loading:loadingNFTs, error:errorNfTs, data:NFTsData} = useFetch(nft)
    const {data:dataHistory, error:errorHistory, loading:loadingHistory} = useFetch(historyUrl)
    const initialState = [
        {
            name: t('collection.nft_tab'),
            active: true,
            number: 1,
        },
        {
            name: t('collection.description_tab'),
            active: false,
            number: 2,
        },
        {
            name: t('collection.activity_tab'),
            active: false,
            number: 3,
        }
    ]
    
    const options = [
        {
            name: t('tab_selector_component.newest'),
            value: 'newest'
        },
        {
            name: t('tab_selector_component.oldest'),
            value: 'oldest'
        },
        {
            name: t('tab_selector_component.price_highest'),
            value: 'highest'
        },
        {
            name: t('tab_selector_component.price_lowest'),
            value: 'lowest'
        }
    ]
    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);
    useEffect(()=>{
        if(!address){
            window.location.href = '/'
        }
    },[]);
    if(loading){
        return (
            <Box sx={{marginTop: '20rem'}}>
                <LoaderCircle text={t('message_loader.collection.loading')} />
            </Box>
        )
    }
    return (
        <Box>
            <Container maxWidth="xl" sx={{ color: '#fff' }}>
                {error && <ErrorMessage error={error.message} />}
                {data && 
                    <CollectionHeader 
                        content={data[0]} 
                        address={address} 
                    />
                }
                <TabSelector items={initialState} setUpdate={setActiveTab} showSelector={true} options={options} />
                <Box sx={{width:'100%',minHeight:'300px'}}>
                    {activeTab === 1 && loadingNFTs && <LoaderNFT />}
                    {activeTab === 1 && errorNfTs && !loadingNFTs &&  <ErrorMessage error={errorNfTs} />}
                    {activeTab === 1 && !loadingNFTs && !errorNfTs  && <SectionNFTs content={NFTsData} NFTLoading={loadingNFTs} />}

                    {activeTab === 2 && loading && <div>{t("collection.loading_description")}...</div>}
                    {activeTab === 2 && error && <ErrorMessage error={error} />}
                    {activeTab === 2 && data && <Description content={data[0].description}  />}
                    
                    {activeTab === 3 && loadingHistory && <div>{t("collection.loading_activity")}...</div>}
                    {activeTab === 3 && errorHistory && <ErrorMessage error={errorHistory} />}
                    {activeTab === 3 && dataHistory && <Box sx={{marginTop:'2rem'}}><OfferHistory content={dataHistory} /></Box>}
                </Box>
            </Container>
        </Box>
    )
}

export default Collection