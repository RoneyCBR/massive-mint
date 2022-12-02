import React, { Suspense, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import SideBar from 'components/SideBar';
import { useHistory, useLocation, useRouteMatch, Switch, Route} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from 'components/ErrorBoundary';
import NFTsCard from 'components/NFTsCard';
import CollectionCard from 'components/CollectionCard';
import ProfileCard from 'components/ProfileCard';
import { useFetch }  from 'hooks/useFetch';
import styled from '@emotion/styled';
import LoaderCollection from 'components/LoaderCollection';
import ErrorMessage from 'components/ErrorMessage';
import LoaderNFT from 'components/LoaderNFT';
import LoaderProfile from 'components/LoaderProfile';

const ActiveTag = styled(Box)`
    border-bottom: ${props => props.active == "true" ? '3px solid #FFA300' : 'null'};
    font-weight: ${props => props.active == "true" ? 'bold' : 'null'};
    cursor: pointer;
    //background-color: ${props => props.active == "true" ? '#F344A1' : '#000'};
    ${props => props.styles}
`

const Explore = () => {
    const { t } = useTranslation("translate");
    const {path} = useRouteMatch();
    const history = useHistory();
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const key_name = query.get('key_name')
    const key_val = query.get('key_val')
    const viewAll = query.get('view_all')

    let listNFT = 100;
    const limitNFTRef = useRef(listNFT);
    const countNfts = useRef(listNFT);
    const pageNftRef = useRef(0);
    const [sliceNFT,setSliceNFT] = useState(10);
    const [newContent,setNewContent] = useState([]);

    let listProfile = 20;
    const limitProfileRef = useRef(listProfile);
    const countProfile = useRef(listProfile);
    const pageProfileRef = useRef(0);
    const [sliceProfile,setSliceProfile] = useState(10);
    const [newProfile,setNewProfile] = useState([]);

    let listCollection = window.innerWidth < 900 ? 2 : 8;
    const limitCollectionRef = useRef(listCollection);
    const [firstRequest,setFirstRequest] = useState(true);
    const changeFilter = useRef(false)

    const handleCheckTab = () =>{
        if(viewAll && String(viewAll).includes('collection')){
            return 'collection';
        }
        if(viewAll && String(viewAll).includes('profile')){
            return 'profile';
        }
        return 'nft';
    }

    const tabActive = useRef(handleCheckTab())
    const [moreCollection,setMoreCollection] = useState(false)

    let compURlNFT = `${process.env.REACT_APP_URL_API}/nft?limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created&key_name=SEARCH&key_val=news&domain=${process.env.REACT_APP_DOMAIN}`

    let key_values = [];
    const handleChoseLink = () =>{
        key_values = query.getAll("key_val");
        if(key_name && key_val && key_values.length > 0 && (key_name === "PRICE_RANGE_BOTTOM"||key_name === "PRICE_RANGE_TOP")){
            return `${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created&key_name=PRICE_RANGE_BOTTOM&key_val=${key_values[0]}&key_name=PRICE_RANGE_TOP&key_val=${key_values[1]}`
        }
        if(key_name && key_val && (key_name === "LIVE_AUCTION" )||(key_name === "BUY_NOW")){
            return `${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created&key_name=${query.get("key_name")}&key_val=1`
        }
        if(key_name && key_val && key_name === "ONLY_IMAGE"|| key_name === "ONLY_VIDEO" || key_name === "ONLY_PDF" || key_name === "ONLY_MP3" ){
            return `${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created&key_name=${query.get("key_name")}&key_val=${query.get("key_name")}`
        }
        if(key_name && key_val && key_name == "BUY_NOW" || key_name == "LIVE_AUCTION"){
            return `${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created&key_name=${query.get("key_name")}&key_val=1`
        }
        if(key_name && key_val && String(key_name).toUpperCase() === "SEARCH"){
            return `${process.env.REACT_APP_URL_API}/nft?&limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created&key_name=SEARCH&key_val=news&domain=${process.env.REACT_APP_DOMAIN}`
        }
        if(query.get('SLUG') != null && query.get('SLUG') != ''){
            return `${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created&key_name=SLUG&key_val=${query.get('SLUG')}`
        }
        return `${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created&key_name=SEARCH&key_val=news`
    }
    
    const [urlNFT, setUrlNFT] = useState(handleChoseLink())
    useEffect(()=>{
        setUrlNFT(handleChoseLink());
    },[])

    const [urlProject, setUrlProject] = useState(`${process.env.REACT_APP_URL_API}/project?domain=${process.env.REACT_APP_DOMAIN}&search=NEWS&limit=1&page=0`)
    const [urlProfile, setUrlProfile] = useState(`${process.env.REACT_APP_URL_API}/user?domain=${process.env.REACT_APP_DOMAIN}&limit=${limitProfileRef.current}&page=${pageProfileRef.current}&search=ALL`)
    const [byProfile, setByProfile] =useState( ((viewAll != null) && viewAll.includes('profiles')) ? true :false )
   // const [activeProfile, //setActiveProfile] = useState(((viewAll != null) && viewAll.includes('profiles')) ? true :false)

    const [byCollection, setByCollection] = useState(((viewAll != null) && viewAll.includes('collections')) ? true :false)
    const [activeCollection, setActiveCollection] = useState(((viewAll != null) && viewAll.includes('collections')) ? true :false)

    const [byNFT, setByNFT] = useState(((viewAll != null) && !viewAll.includes('nfts')) ? false :true)
    const [activeNFT, setActiveNFT] = useState(((viewAll != null) && !viewAll.includes('nfts')) ? false :true)
    const [openFilters, setOpenFilters] = React.useState(true);

    const handleSlug = ()=>{
        setUrlNFT(`${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=0&order=created&key_name=SLUG&key_val=${query.get('SLUG')}`)
    }

    const handleResetLimitAndPAgeNFT = () =>{
        limitNFTRef.current = listNFT;
        countNfts.current = listNFT;
        pageNftRef.current = 0;
        setSliceNFT(10)
    }
    
    let {data, error, loading} = useFetch(urlProject) // collections
    let {data:NFTData, error:NFTError, loading:NFTLoading} = useFetch(urlNFT) // nfts
    let {data:profileData, error:errorProfileData, loading:loadingProfileData} = useFetch(urlProfile) // profiles

    const sortby = (str)=>{
        if(str === "nft" && !NFTLoading){
            setByNFT(true)
            setByProfile(false)
            setByCollection(false)
            setActiveNFT(true)
            setActiveCollection(false)
            //setActiveProfile(false)
            tabActive.current = "nft"
            history.push(`/explore`)
            setNewContent([])
            handleResetLimitAndPAgeNFT();
            if(urlNFT == compURlNFT){
                setUrlNFT(`${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created&key_name=SEARCH&key_val=news`)
            }else{
                setUrlNFT(`${process.env.REACT_APP_URL_API}/nft?limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created&key_name=SEARCH&key_val=news&domain=${process.env.REACT_APP_DOMAIN}`)
            }
            return 0;
        }
        if(str === "collection"){
            setByNFT(false)
            setByProfile(false)
            setByCollection(true)
            setActiveNFT(false)
            setActiveCollection(true)
            //setActiveProfile(false)
            tabActive.current = "collection"
            return 0;
        }
        if(str === "profile"){
            setByNFT(false)
            setByProfile(true)
            setByCollection(false)
            setActiveNFT(false)
            setActiveCollection(false)
            //setActiveProfile(true)
            tabActive.current = "profile"
            //setUrlProfile(`${process.env.REACT_APP_URL_API}/user?domain=${process.env.REACT_APP_DOMAIN}&limit=${limitProfileRef.current}&page=0&search=ALL`)
        }
    }

    const handleConcatNfts = () =>{
        if(NFTData && NFTData.length > 0){
            setNewContent([...newContent, ...NFTData]);
        }
    }

    const handleConcatProfile = () =>{
        if(profileData && profileData.length > 0){
            setNewProfile([...newProfile,...profileData])
        }
    }

    useEffect(async()=>{
        handleConcatNfts();
    },[NFTData])

    useEffect(async()=>{
        handleConcatProfile();
    },[profileData])

    const handleGetResultsWithOutFilter = ()=>{
        setUrlNFT(`${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created&key_name=SEARCH&key_val=news`)
    }

    const handleGetResultsWithFilter = ()=>{
        key_values = query.getAll("key_val");
        if(key_name && key_val && key_values.length > 0 && (key_name === "PRICE_RANGE_BOTTOM"||key_name === "PRICE_RANGE_TOP")){
            history.push(`/explore?limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created&key_name=PRICE_RANGE_BOTTOM&key_val=${key_values[0]}&key_name=PRICE_RANGE_TOP&key_val=${key_values[1]}`)
        }
        if(key_name && key_val && key_name === "ONLY_IMAGE"|| key_name === "ONLY_VIDEO" || key_name === "ONLY_PDF" || key_name === "ONLY_MP3" ){
            history.push(`/explore?limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created&key_name=${query.get("key_name")}&key_val=${query.get("key_name")}`)
        }
        if(key_name && key_val && key_name == "BUY_NOW" || key_name == "LIVE_AUCTION"){
            history.push(`/explore?limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created&key_name=${query.get("key_name")}&key_val=1`)
        }
        if(key_name && key_val && String(key_name).toUpperCase() === "SEARCH"){
            history.push(`/explore?limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created&key_name=SEARCH&key_val=news`)
        }
        setUrlNFT(handleChoseLink());
    }

    const getNfts = () =>{
        if(!loading && !NFTLoading && !loadingProfileData ){
            if(sliceNFT < (countNfts.current - 20)){
                return 0;
            }
            countNfts.current = countNfts.current + limitNFTRef.current
            pageNftRef.current++;
            if(query.get("limit") && query.get("order") && query.get("key_name") && query.get("key_val") || query.get("key_val") != ''){
                handleGetResultsWithFilter();
                return 0;
            }
            handleGetResultsWithOutFilter();
        }
    }

    const incrementProfile = ()=>{
        setUrlProfile(`${process.env.REACT_APP_URL_API}/user?domain=${process.env.REACT_APP_DOMAIN}&limit=${limitProfileRef.current}&page=${pageProfileRef.current}&search=ALL`)
    }

    const getProfile =  () =>{
        if(!loading && !NFTLoading && !loadingProfileData ){
            if((countProfile.current - 10) > sliceProfile){
                return 0;
            }
            countProfile.current = countProfile.current + limitProfileRef.current;
            pageProfileRef.current++;
            incrementProfile();
        }
    }

    const getCollection = () => {
        if(!moreCollection && data && limitCollectionRef.current <= data.length){
            setMoreCollection(true)
            limitCollectionRef.current = limitCollectionRef.current + listCollection;
            let timeOut = setTimeout(()=>{
                setMoreCollection(false)
                clearTimeout(timeOut)  
                return null; 
            },1000)
        }
    }

    const infinityScroll = () => {
        if(tabActive.current == "nft" && newContent && sliceNFT <= newContent.length){
            getNfts();
            setSliceNFT(sliceNFT+10);
        }
        if(tabActive.current == "profile" && newProfile && sliceProfile  <= newProfile.length){
            getProfile();
            setSliceProfile(sliceProfile+10);
        }
        if(tabActive.current == "collection" && byCollection){
            getCollection();
        }
    }
    useEffect(() => {   
        if(query.get('SLUG') != null && query.get('SLUG') != '' && !NFTLoading && sliceNFT <= newContent.length){
            tabActive.current ='nft'
            setByNFT(true)
            setByProfile(false)
            setByCollection(false)
            setActiveNFT(true)
            setActiveCollection(false)
            //setActiveProfile(false)
            handleResetLimitAndPAgeNFT();
            handleSlug();
            return 0;
        } 
        if(query.get('SLUG') != null && query.get('SLUG') == '' && !NFTLoading){
            sortby("nft")
        }
    },[query.get('SLUG'),NFTLoading])

    useEffect(()=>{ // !important show cards when finish request
        setFirstRequest(false);
        if(!firstRequest){
            changeFilter.current = false;
        }
    },[changeFilter,NFTData,NFTLoading]);

    useEffect(()=>{window.scrollTo(0,0);},[]);

    return (
        <>
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            > 
                <Typography 
                    variant="overline" 
                    display="block" 
                    gutterBottom 
                    component='h2'
                    sx={{
                        //color:'#000', 
                        fontSize:{xs:'30px',sm:'30px',md:'34px',lg:'37px'},
                        textAlign:'center',
                        marginTop:'14px',
                        fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                        //background: 'linear-gradient(110.78deg, #361FD8 10%, #361FD8 10%, #A658D8 67.94%, #A658D8 85.34%, #A658D8 99.57%)',
                        backgroundClip: 'text',
                        //WebkitTextFillColor: 'transparent',
                        textTransform: 'uppercase'
                    }}
                >
                    {t("gallery.title")}
                </Typography>
            </Box>

            <Box display='flex' justifyContent='flex-start' sx={{gap:'1rem', marginLeft:'1.5rem', fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>
                <ActiveTag active={activeNFT+''} onClick={()=>sortby('nft')}>{t('explore.nft_tab')}</ActiveTag>
                <ActiveTag active={activeCollection+''} onClick={()=>sortby('collection')}>{t('explore.collection_tab')}</ActiveTag>
            </Box>
            <Divider />

            <Box
                display='flex'
                justifyContent='space-between'
                sx={{
                    '@media screen and (max-width: 750px)': {
                        display:'grid',
                        gridTemplateColumns:!openFilters?'repeat(1,1fr)':'repeat(auto-fit, minmax(330px, 1fr))',
                    },
                }}
            >
                { tabActive.current =='nft' && 
                    <Box
                        sx={{
                            // position:'relative',
                            // height:openFilters ? 'auto':'20px',
                            p:'0px 10px'
                        }}
                    >
                        {(byNFT) && 
                            <SideBar 
                                urlProject={setUrlProject}
                                urlNFT={setUrlNFT}
                                isNFT={byNFT} 
                                openFilters={openFilters} 
                                setOpenFilters={setOpenFilters} 
                                listNFT={listNFT} 
                                changeFilter={changeFilter}
                                setNewContent={setNewContent}
                                setSliceNFT={setSliceNFT}
                                requestIsLoad={NFTLoading}
                                countNfts={countNfts}
                                pageNftRef={pageNftRef}
                        />}
                    </Box>
                }
                <Box display='flex' justifyContent='center' sx={{width:'100%', marginBottom:'1rem',mt:'30px'}}>
                    <Switch>
                        <Route path={`${path}`}>          
                            <ErrorBoundary fallback={<div>error</div>}>
                                <Suspense fallback={null}>
                                    <Box
                                        sx={{
                                            width:'100%',
                                            gridTemplateColumns:'repeat(1,1fr)',
                                        }}
                                    >
                                        {byNFT && !NFTError && !firstRequest && !changeFilter.current &&  
                                            <Box >
                                                <NFTsCard  
                                                    infinityScroll={infinityScroll} 
                                                    content={newContent} 
                                                    limit={sliceNFT} 
                                                    openFilters={openFilters} 
                                                    NFTLoading={NFTLoading} 
                                                />
                                            </Box>
                                        }
                                        {byNFT && NFTLoading && !NFTError && <Box><LoaderNFT openFilters={openFilters} /></Box>}
                                        {byNFT && NFTError && <Box><ErrorMessage error={NFTError.message} /></Box>}


                                        {byCollection && data && 
                                            <Box>
                                                <CollectionCard   
                                                    infinityScroll={infinityScroll} 
                                                    content={data} 
                                                    limit={limitCollectionRef.current} 
                                                />
                                            </Box>}
                                        {byCollection && loading && <Box><LoaderCollection /></Box>}
                                        {byCollection && error && <Box><ErrorMessage error={error.message} /></Box>}

                                        {
                                            byProfile && !errorProfileData && profileData && 
                                            <Box>
                                                <ProfileCard  
                                                    infinityScroll={infinityScroll} 
                                                    content={newProfile} 
                                                    limit={sliceProfile} 
                                                    loadingProfileData={loadingProfileData} 
                                                />
                                            </Box>
                                        }                                    
                                        {byProfile && errorProfileData && <Box><ErrorMessage error={errorProfileData.message} /></Box>}
                                        {byProfile && loadingProfileData && <Box><LoaderProfile /></Box>}
                                    </Box>
                                </Suspense>
                            </ErrorBoundary>
                        </Route>
                    </Switch>
                </Box>
            </Box>         
        </>
    )
}

export default Explore