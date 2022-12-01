import React, {useState,useEffect,useContext,useRef} from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LoaderCircle from 'components/LoaderCircle';
import { useLocation } from 'react-router-dom';
import {Header,NFTs} from './components';
import { BsFillGrid1X2Fill } from 'react-icons/bs';
import { Context } from 'hooks/WalletContext'
import { getMaticInUSD } from 'services/getMaticInUSD'
import { useTranslation } from 'react-i18next';
import { useFetch } from 'hooks/useFetch';
import SideBar from './components/SideBar/SideBar';
import OfferHistory from 'components/OfferHistory';
import { getUser } from 'services/User/getUser';
import CloseIcon from '@mui/icons-material/Close';
import OutsideClickHandler from 'react-outside-click-handler';
import { DrawerMobileContext } from 'hooks/DrawerMobileContext';
import ButtonStyled from 'components/ButtonStyled';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import { MdCollections } from 'react-icons/md'; 
import CollectionCard from 'components/CollectionCard';
import ErrorMessage from 'components/ErrorMessage';
import {
    MenuBody,
    ActiveTag,
    ActiveTagCenter,
    ActiveTagSpaceBetween,
    ContainerCards,
    ContentMenu,
    BodyCards,
    ContainerPop,
    BodyPop,
    PopBtnClose,
    PopTitle,
    PopBtnHere
} from './style';



const Profile = () => {
    const {t} = useTranslation("translate");
    const {data} = React.useContext(Context);
    const {setOpenWallet } = useContext(DrawerMobileContext);
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    let address = query.get("address");
    const [addressTemp,setAddressTemp] = useState(address)
    const [userNfts, setUserNfts] = useState(true);
    const [myCollections,setMyCollections] = useState(false);
    const [user, setUser] = useState(null);
    const [offers, setOffers] = useState(false);
    const [userActivity, setUserActivity] = useState(false);
    const [openFilters,setOpenFilters] = useState(true);
    const [msgProfile,setMsgProfile] = useState(false);
    const [openModalForm,setOpenModalForm] = useState(false);
    const [openPopText,setOpenPopText] = useState(false);
    const [load,setLoad] = useState(false);
    const [loadMyData,setLoadMyData] = useState(false);
    const[cleanAllFilter,setCleanAllFilter] = useState(false);
    const [typeFilter,setTypeFilter] = useState({
        slug:'',
        priceRange:'',
        author:'',
        type:'',
        available:''
    });

    const [dataTemp,setDataTemp] = useState(
        {
            username:'',
            email:''
        }
    )
    const [formEditProfile,setFormEditProfile] = useState({
        avatar:'',
        fileAvatar: [],
        banner:'',
        fileBanner: [],
        username:'',
        email:'',
        description:'',
        social_media:{
            instagram:'',
            twitter:''
        },
        validateAttr:{
            instagram:null,
            twitter:null
        }
    });
    const tabActive = useRef("nft");
    const [firstRequest,setFirstRequest] = useState(true);
    const changeFilter = useRef(false)
    let listNFT = 100;
    let listCards = 6;

    const limitNFTRef = useRef(listNFT);
    const countNfts = useRef(listNFT);
    const pageNftRef = useRef(0);
    const [sliceNFT,setSliceNFT] = useState(listCards);
    const [newNFTs,setNewsNFTs] = useState([]);

    const limitActivityRef = useRef(listNFT);
    const countActivity = useRef(listNFT);
    const pageActivityRef = useRef(0);
    const [sliceActivity,setSliceActivity] = useState(listCards);
    const [newActivity,setNewsActivity] = useState([]);

    const limitMyCollectionRef = useRef(listNFT);
    const countMyCollection = useRef(listNFT);
    const pageMyCollectionRef = useRef(0);
    const [sliceMyCollection,setSliceMyCollection] = useState(listCards);
    const [newsMyCollection,setNewsMyCollection] = useState([]);

    const [urlNFTs,setUrlNFTs] = useState(`${process.env.REACT_APP_URL_API}/nft?wallet=${address}&domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created`);
    const [historyUrl,setHistoryUrl] = useState(`${process.env.REACT_APP_URL_API}/history?domain=${process.env.REACT_APP_DOMAIN}&key_name=wallet&key_val=${address}&blockchain=${process.env.REACT_APP_NETWORK_NAME}&limit=${limitActivityRef.current}&page=${pageActivityRef.current}&order=created`);
    const [userCollectionOwnerUrl, setUserCollectionOwnerUrl] = useState(`${process.env.REACT_APP_URL_API}/project?domain=${process.env.REACT_APP_DOMAIN}&key_name=OWNER&key_val=${address}&page=${pageMyCollectionRef.current}&limit=${limitMyCollectionRef.current}&order=created`);
    
    let {data:dataNFTs,loading:loadingNFTs,error:errorNFTs} = useFetch(urlNFTs);//nfts
    let {data:dataHistory,loading:loadingHistory, error:errorHistory} = useFetch(historyUrl);//activity
    let {data: collectionsOwner, loading: loaderCollectionOwner, error: errorCollectionOwner} = useFetch(userCollectionOwnerUrl);// Collection owner
    let dataOffers = null;
    let loadingOffers = false;
    let errorOffers = null;

    const handleConcatNfts = () =>{
        if(dataNFTs && dataNFTs.length > 0 && !loadingNFTs){
            let newArray = [];
            newArray = dataNFTs;
            setNewsNFTs([...newNFTs,...newArray.filter((nft)=> nft.transaction && nft.transaction.toUpperCase() != "PRE_MINT" && nft.transaction.toUpperCase() != "0X0")]);
        }
    }

    useEffect(()=>{
        handleConcatNfts();
    },[dataNFTs,loadingNFTs])

    const handleConcatActivity = () =>{
        if(dataHistory && dataHistory.length > 0 && !loadingHistory){
            setNewsActivity([...newActivity,...dataHistory]);
        }
    }

    useEffect(()=>{
        handleConcatActivity();
    },[dataHistory,loadingHistory]);

    const handleConcatMyCollection = () =>{
        if(collectionsOwner && collectionsOwner.length > 0 && !loaderCollectionOwner){
            setNewsMyCollection([...newsMyCollection,...collectionsOwner]);
        }
    }

    useEffect(async()=>{
        handleConcatMyCollection();
    },[collectionsOwner,loaderCollectionOwner]);

    const resetDataUser = () =>{
        setFormEditProfile({...formEditProfile,username:'',avatar:'',fileAvatar:[],email:'',banner:'',fileBanner:[]});
        setDataTemp({...dataTemp,username:'', email :''});
        countNfts.current = limitNFTRef.current;
        pageNftRef.current = 0;
        setSliceNFT(listCards);
        setNewsNFTs([]);

        countActivity.current = limitActivityRef.current;
        pageActivityRef.current = 0;
        setSliceActivity(listCards);
        setNewsActivity([]);

        countMyCollection.current = limitMyCollectionRef.current;
        pageMyCollectionRef.current = 0
        setSliceMyCollection(listCards)
        setNewsMyCollection([])
    }
  
    const handleShowNFTtComponent = () => {
        tabActive.current == "nft"
        setUserNfts(true)
        setUserActivity(false)
        setOffers(false)
        setMyCollections(false)
    }

    const handleShowActivityComponent = ()=>{
        tabActive.current == "activity"
        setUserActivity(true)
        setUserNfts(false)
        setOffers(false)
        setMyCollections(false)
    }

    const handleShowMyCollections = ()=>{
        tabActive.current == "myCollection"
        setMyCollections(true)
        setUserActivity(false)
        setUserNfts(false)
        setOffers(false)
    }


    let timeOut = null;
    const getMyDataProfile = async ()=>{
        clearTimeout(timeOut);
        setMsgProfile('');
        setLoadMyData(true);
        setOpenModalForm(false);
        let userData = null;
        try{
            userData = await getUser(address).finally(()=>{setLoadMyData(false);setMsgProfile('')}).catch(err=>{console.log("error profile",err);setMsgProfile(err+'');setLoad(false)})
            if(userData && userData.username && userData.registered == true){
                setFormEditProfile({...formEditProfile,
                    username:userData.username, email : userData.email,
                    avatar:userData.profile_pic_url_mini,
                    banner:userData.banner_resize,
                    country : userData.country,  description : userData.about, social_media : {
                    twitter : userData.twitter,
                    instagram : userData.facebook,
                }})
                setDataTemp({...dataTemp,
                    username:userData.username, email : userData.email,
                    avatar:userData.profile_pic_url_mini,
                    banner:userData.banner_resize,
                    country : userData.country,  description : userData.about, social_media : {
                    twitter : userData.twitter,
                    instagram : userData.facebook,
                }})
                setLoadMyData(false)
                setOpenModalForm(true);
            }else{
                clearTimeout(timeOut);
                if(userData.registered == false){
                    setOpenPopText(true);
                }
                setLoadMyData(false)
            }
        }catch(e){
            console.log("error::",e);
        }
    }

    const getDataProfile = async ()=>{
        setFormEditProfile({...formEditProfile,username:'',avatar:'',fileAvatar:[],email:'',banner:'',fileBanner:[]});
        setDataTemp({...dataTemp,username:'', email :''});
        setUser(null)
        setLoad(true)
        let isOwner = false
        let wallet = localStorage.getItem('wallet')
        if (wallet) {
            isOwner =  (address.toUpperCase() == wallet.toUpperCase()) ? true : false
        }
        let userData = await getUser(address,isOwner).finally(()=>{setLoad(false);setMsgProfile('')}).catch(err=>{console.log("error profile",err);setMsgProfile(err+'');setLoad(false)})
        if(userData && userData.username) {
            setUser(userData)
            setFormEditProfile({...formEditProfile,
                username:userData.username, email : userData.email,
                avatar:userData.profile_pic_url_mini,
                banner:userData.banner_resize,
                country : userData.country,  description : userData.about, social_media : {
                twitter : userData.twitter,
                instagram : userData.facebook,
            }})
            setDataTemp({...dataTemp,
                username:userData.username, email : userData.email,
                avatar:userData.profile_pic_url_mini,
                banner:userData.banner_resize,
                country : userData.country,  description : userData.about, social_media : {
                twitter : userData.twitter,
                instagram : userData.facebook,
            }})
        }
        
    }

    useEffect(()=>{ //infinity scroll NFTs without filter
        if(!loadingNFTs){
            if(sliceNFT < (countNfts.current - 20)){
                return 0;
            }
            countNfts.current = countNfts.current + limitNFTRef.current;
            pageNftRef.current++;
            const {author,type,available} = typeFilter;
            if(author != '' ||  type !='' || available != ''){
                setUrlNFTs(`${process.env.REACT_APP_URL_API}/nft?wallet=${address}&domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}${author}${type}${available}&order=created`)
            }else{
                setUrlNFTs(`${process.env.REACT_APP_URL_API}/nft?wallet=${address}&domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created`)
            }
        }
    },[sliceNFT])

    const handleSlug = () =>{
        const {author,type,available,slug,priceRange} = typeFilter;
        let url = `${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}${author}${type}${available}${slug}${priceRange}&key_name=OWNER&key_val=${address}&order=created`;
        if(url === urlNFTs){
            setUrlNFTs(`${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&page=${pageNftRef.current}&limit=${limitNFTRef.current}${author}${type}${available}${slug}${priceRange}&key_name=OWNER&key_val=${address}&order=created`)
        }else{
            setUrlNFTs(`${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}${author}${type}${available}${slug}${priceRange}&key_name=OWNER&key_val=${address}&order=created`)
        }
    }

    const getNFTsWithFilters = () =>{
        if(typeFilter){
            setCleanAllFilter(false);
            const {author,type,available,slug,priceRange} = typeFilter;
            changeFilter.current = true;
            countNfts.current = limitNFTRef.current;
            pageNftRef.current = 0;
            setSliceNFT(listCards)
            setNewsNFTs([])
            if(!loadingNFTs && author && author != '' || type && type !='' || available && available != '' || slug && slug != '' || priceRange && priceRange != ''){
                if(slug && slug != ''){
                    handleSlug();
                }else{
                    setUrlNFTs(`${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}${author}${type}${available}${slug}${priceRange}&key_name=OWNER&key_val=${address}&order=created`)
                }
                return 0;
            }
            if(!loadingNFTs){
                let url = `${process.env.REACT_APP_URL_API}/nft?wallet=${address}&domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created`;
                if(urlNFTs == url){
                    setUrlNFTs(`${process.env.REACT_APP_URL_API}/nft?wallet=${address}&domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created`)
                }else{
                    setUrlNFTs(`${process.env.REACT_APP_URL_API}/nft?wallet=${address}&domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created`)
                }
            }
        }
    }

    const handleClearFilter = () =>{
        changeFilter.current = true;
        countNfts.current = limitNFTRef.current;
        pageNftRef.current = 0;
        setSliceNFT(listCards)
        setNewsNFTs([])
        setCleanAllFilter(true);
        setTypeFilter({
            typeFilter,
            slug:'',
            priceRange:'',
            author:'',
            type:'',
            available:''
        })
        let url =`${process.env.REACT_APP_URL_API}/nft?wallet=${address}&domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created`;
        if(url == urlNFTs){
            setUrlNFTs(`${process.env.REACT_APP_URL_API}/nft?wallet=${address}&domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created`);
        }else{
            setUrlNFTs(`${process.env.REACT_APP_URL_API}/nft?wallet=${address}&domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created`);
        }
       
    }

    const infinityScroll = () => {
        if(tabActive.current == "myCollection"  && collectionsOwner && limitMyCollectionRef.current <= collectionsOwner.length && !loaderCollectionOwner){
            setSliceMyCollection(sliceMyCollection + 10)
            if((countMyCollection.current - 20) < sliceMyCollection){
                countMyCollection.current = countMyCollection.current + limitMyCollectionRef.current
                pageMyCollectionRef.current++;
                setUserCollectionOwnerUrl(`${process.env.REACT_APP_URL_API}/project?domain=${process.env.REACT_APP_DOMAIN}&key_name=OWNER&key_val=${address}&page=${pageMyCollectionRef.current}&limit=${limitMyCollectionRef.current}&creator=${address}`)
            }
            return 0;
        }
    }

    useEffect(()=>{//infinity scroll NFTs with filter
        getNFTsWithFilters();
    },[typeFilter]);

    useEffect(()=>{ // !important show cards when finish request
        setFirstRequest(false);
        if(!firstRequest){
            changeFilter.current = false;
        }
    },[changeFilter,loadingNFTs,dataNFTs]);


    useEffect(()=>{ // infinity scroll Activity
        if(!loadingHistory){
            if(sliceActivity < (countActivity.current - 20)){
                return 0;
            }
            countActivity.current = countActivity.current + limitActivityRef.current;
            pageActivityRef.current++;
            setHistoryUrl(`${process.env.REACT_APP_URL_API}/history?domain=${process.env.REACT_APP_DOMAIN}&key_name=wallet&key_val=${address}&blockchain=${process.env.REACT_APP_NETWORK_NAME}&limit=${limitActivityRef.current}&page=${pageActivityRef.current}&order=created`);
        }
    },[sliceNFT])


    useEffect(()=>{
        try {
            resetDataUser();
            getDataProfile(); 
            setAddressTemp(address)
            getMaticInUSD().then((usd) => {
                localStorage.setItem('USD',""+usd)
            })
            setUrlNFTs(`${process.env.REACT_APP_URL_API}/nft?wallet=${address}&domain=${process.env.REACT_APP_DOMAIN}&limit=${limitNFTRef.current}&page=${pageNftRef.current}&order=created`)
            setHistoryUrl(`${process.env.REACT_APP_URL_API}/history?domain=${process.env.REACT_APP_DOMAIN}&key_name=wallet&key_val=${address}&blockchain=${process.env.REACT_APP_NETWORK_NAME}&limit=${limitActivityRef.current}&page=${pageActivityRef.current}&order=created`)
            setUserCollectionOwnerUrl(`${process.env.REACT_APP_URL_API}/project?domain=${process.env.REACT_APP_DOMAIN}&key_name=OWNER&key_val=${address}&page=${pageMyCollectionRef.current}&limit=${limitMyCollectionRef.current}&order=created`)
        } catch (error) {
            console.log(error)
        }
    },[address,addressTemp])
    
    if(address === null){
        return <LoaderCircle text={t("profile.message_load.loading_profile")} />
    }

    return (
       
        <Box component="header" sx={{position:'relative'}}>
            <Header 
                formEditProfile={formEditProfile} 
                setFormEditProfile={setFormEditProfile}
                address={address} 
                data={data}
                user={user}
                dataTemp={dataTemp}
                setDataTemp={setDataTemp}
                openPopText={openPopText}
                setOpenPopText={setOpenPopText}
                getMyDataProfile={getMyDataProfile}
                loadMyData={loadMyData}
                openModalForm={openModalForm}
                setOpenModalForm={setOpenModalForm}
                loadingData={load}
            />
            <MenuBody maxWidth='md'>
                <ActiveTag active={userNfts+''} onClick={handleShowNFTtComponent}>
                    <ActiveTagCenter><BsFillGrid1X2Fill /><span style={{fontSize:'20px', marginLeft:'5px'}}>NFTs</span></ActiveTagCenter>
                </ActiveTag>
                <ActiveTag active={myCollections+''} onClick={handleShowMyCollections}>
                    <ActiveTagSpaceBetween>
                        <MdCollections size={25} /><span style={{fontSize:'20px', marginLeft:'5px'}}>{t("profile.tab_collections_created")}</span>
                    </ActiveTagSpaceBetween>
                </ActiveTag>
                <ActiveTag active={userActivity+''} onClick={handleShowActivityComponent}>
                    <ActiveTagCenter><ViewStreamIcon sx={{fontSize:'25px'}}/> <span style={{fontSize:'20px', marginLeft:'5px'}}>{t("profile.tabs.activity")}</span></ActiveTagCenter>
                </ActiveTag>
            </MenuBody>
            <Divider sx={{background:'#fff'}} />
            <ContainerCards>
                {
                    userNfts && 
                    <ContentMenu
                        open={openFilters}
                    >
                        <SideBar 
                            openFilters={openFilters}
                            setOpenFilters={setOpenFilters}
                            loadingNFTs={loadingNFTs}
                            typeFilter={typeFilter}
                            setTypeFilter={setTypeFilter}
                            pageNftRef={pageNftRef}
                            limitNFTRef={limitNFTRef}
                            address={address}
                            setUrlNFTs={setUrlNFTs}
                            handleClearFilter={handleClearFilter}
                            cleanAllFilter={cleanAllFilter}
                        />
                    </ContentMenu>
                }
                <BodyCards>
                        <React.Fragment>
                            <div style={{color:'red', display:'none'}}><center>{msgProfile != '' && msgProfile}</center></div>
                            {userNfts && !errorNFTs && !firstRequest && !changeFilter.current && 
                                <NFTs
                                    content={newNFTs}
                                    address={address}
                                    data={data}
                                    loadingNFTs={loadingNFTs}
                                    limit={sliceNFT}
                                    setSliceNFT={setSliceNFT}
                                    listCards={listCards}
                                    pageNftRef={pageNftRef}
                                    firstRequest={firstRequest}
                                />
                            }
                            {userNfts && loadingNFTs &&
                                <Box sx={{display:'flex',justifyContent:'center'}}>
                                    <LoaderCircle text={t("profile.message_load.loading_nfts")} />
                                </Box>
                            }
                            {errorNFTs && !loadingNFTs && userNfts && 
                                <Box  sx={{display:'flex',justifyContent:'center'}}>
                                    <ErrorMessage error={errorNFTs} />
                                </Box>
                               
                            }
                            {
                                user && myCollections && !errorCollectionOwner &&
                                <CollectionCard 
                                    content={newsMyCollection} 
                                    limit={sliceMyCollection} 
                                    infinityScroll={infinityScroll} 
                                    openFilters={openFilters} 
                                    loaderCollection={loaderCollectionOwner}
                                />
                            }  
                            {myCollections && errorCollectionOwner && 
                            <Box  sx={{display:'flex',justifyContent:'center'}}>
                               <ErrorMessage error={errorCollectionOwner} />
                            </Box>
                            }
                            {myCollections && loaderCollectionOwner &&  <LoaderCircle text={t("profile.message_load.loading_collections")} />}
                           
                           
                           
                            {offers && !loadingOffers && !errorOffers && dataOffers+''}
                            {offers && loadingOffers && 
                                <Box sx={{display:'flex',justifyContent:'center',alignItem:'center'}}>
                                    <LoaderCircle text={t("offers_history.loading_activity")} />
                                </Box>
                            }
                            {offers && errorOffers && 
                                <Box  sx={{display:'flex',justifyContent:'center'}}>
                                    <ErrorMessage error={errorOffers} />
                                </Box>
                            }
                            
                            {
                                userActivity && !loadingHistory && !errorHistory &&
                                <Box sx={{width:{xs:'90%',sm:'90%',md:'70%',lg:'40%',xl:'600px'},m:'0 auto'}}>
                                    <OfferHistory 
                                        content={newActivity}
                                        loadingHistory={loadingHistory}
                                        limit={sliceActivity}
                                        setSliceActivity={setSliceActivity}
                                        listCards={listCards}
                                        pageNftRef={pageNftRef}
                                    />
                                </Box>
                            }
                            {userActivity && loadingHistory && 
                                <Box sx={{display:'flex',justifyContent:'center',alignItem:'center'}}>
                                    <LoaderCircle text={t("offers_history.loading_activity")} />
                                </Box>
                            }
                            {userActivity && errorHistory && 
                                <Box sx={{display:'flex',justifyContent:'center',alignItem:'center', textAlign: 'center', color: 'red' }}>
                                    <h3>{
                                        errorHistory && String(errorHistory.message+'').includes("status code 500") ? 
                                        t("message_errors.try_again_later")
                                        :
                                        errorHistory.message
                                    }
                                    </h3>
                                </Box>
                            }
                        </React.Fragment>
                </BodyCards>

            </ContainerCards>
            {
                openPopText &&
                <ContainerPop>
                    <BodyPop>
                        <OutsideClickHandler onOutsideClick={()=>setOpenPopText(false)}>      
                            <PopBtnClose>
                                <Box  
                                    components={'div'}
                                >
                                    <CloseIcon onClick={()=>setOpenPopText(false)}
                                        sx={{
                                            fontSize: '30px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Box>
                            </PopBtnClose>
                            <PopTitle>
                                {t("profile.register_pop.register_your_email_text")} <br/> {t("profile.register_pop.complete_your_profile_text")}
                            </PopTitle>
                            <PopBtnHere>
                                <ButtonStyled
                                    text={t("profile.register_pop.here_btn")}
                                    onClick={async()=>{setOpenPopText(false); setOpenWallet(true)}}
                                />
                            </PopBtnHere>
                        </OutsideClickHandler>
                    </BodyPop>
                </ContainerPop>
            }
        </Box>
         
    );
}

export default Profile;
