import React from 'react'
// import HomeHero from './components/HomeHero';
import Presentation from './components/Presentation'
import HomeBlockSanity from './components/HomeBlockSanity';
import HomeSectionContent from './components/HomeSectionContent';
import HomeBlockContent from './components/HomeBlockContent';
import { useFetch } from 'hooks/useFetch';
import ErrorMessage from 'components/ErrorMessage';
import { Box } from '@mui/material';
import LoaderCard from 'components/LoaderCard';
import LoaderHero from './components/Loaders/LoaderHero';
import { isEnglish } from 'utils/sanityLanguage';
import './components/Presentation/Presentation.css';

const Home = () => {
    const url = process.env.REACT_APP_URL_API+'/section?domain='+process.env.REACT_APP_DOMAIN;
    const {data, loading, error} = useFetch(url);
    const randomUrl = `${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=4&page=0&order=RANDOM&key_name=SEARCH&key_val=news`
    //const randomUrl = `${process.env.REACT_APP_URL_API}/nft?domain=artcrypted.com&limit=1&page=0&order=created&key_name=SEARCH&key_val=news`
    const {data:random, loading:loadingRandom, error:errorRandom} = useFetch(randomUrl);
    return (
        <Box>
            <Box
                sx={{
                    width:'100%',height:'calc(100vh - 130px)',
                    position:'relative',
                    border:'0.5px solid transparent',
                    background: 'linear-gradient(to right,#3E0CF2,#A630D9,#A630D9,rgba(242,242,242,.999),#A630D9,#3E0CF2,#A659D9 ,#F2F2F2 ,#3E0CF2 ,#371ED9)',
                   
                    "@media screen and (max-width: 1200px)":{
                        height:'100%',
                    }   
                }}
            >   
                
                {loadingRandom && <LoaderHero />}
                {errorRandom && <ErrorMessage error={errorRandom.message} />}
                {/* {random && <HomeHero content={random[0]} />} */}
                {random && 
                    <Presentation content={random}  />
                }
            </Box>
            <HomeBlockContent />
            {loading && <LoaderCard />}
            {error && <ErrorMessage error={error.message} />}
            {data && data.slice(0,2).map((item, index)=>(
                <div key={index}>
                    <HomeSectionContent
                        title={isEnglish() ? item.title_en : item.title_es}
                        searchBlockName={isEnglish() ? item.search_block_name_en : item.search_block_name_es}
                        content={item.content}
                        showBtnAll={item.show_btn_all} 
                        limit={item.limit}
                        query={item.query}
                        nft={item.nft}
                        collection={item.collection}
                        profile={item.profile}
                    />
                </div>
            ))}
            <HomeBlockSanity />
            <div style={{marginBottom:'2rem'}}>
                {loading && <LoaderCard />}
            </div>
            {error && <ErrorMessage error={error.message} />}
            {data && data.slice(2, data.length).map((item, index)=>(
                <div key={index} style={{marginBottom:'2rem'}}>
                    <HomeSectionContent
                        title={isEnglish() ? item.title_en : item.title_es}
                        searchBlockName={isEnglish() ? item.search_block_name_en : item.search_block_name_es}
                        content={item.content}
                        showBtnAll={item.show_btn_all} 
                        limit={item.limit}
                        query={item.query}
                        nft={item.nft}
                        collection={item.collection}
                        profile={item.profile}
                    />
                </div>
            ))}
        </Box>
    );
}

export default Home;
