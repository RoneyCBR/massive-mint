import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, CardMedia, Container, Grid, Modal } from '@mui/material';
import { FaInstagram, FaShareAlt } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import { GrShare } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import PublicMint from './components/PublicMint'; 
import { useFetch } from 'hooks/useFetch';
import LoaderCircle from 'components/LoaderCircle';
import ErrorMessage from 'components/ErrorMessage';
import WhiteListFormFrame from 'views/Home/components/WhiteListFormFrame';
import ModalShare from 'components/ModalShare';
import { Context } from 'hooks/WalletContext';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { totalLeft } from 'services/ERC721/totalLeft';
import Web3 from 'web3';
import { isOnWhitelist } from 'services/MintList/IsOnWhitelist';
import {collectionWithNFTPay} from 'api/sanity'
import {getUrlPaymentsNFTPay} from 'config/getUrlPaymentsNFTPay'

const CollectionBuy = ({ location }) => {
    const { data: wallet } = useContext(Context);
    const { t } = useTranslation("translate");
    const [modalBuyCArd, setModalBuyCard] = useState(false);
    const [modalShare, setModalShare] = useState(false);
    const [reserve, setReserve] = useState(30);
    const query = new URLSearchParams(location.search);
    const address = query.get("collection");
    const url = `${process.env.REACT_APP_URL_API}/project?address=${address}&domain=${process.env.REACT_APP_DOMAIN}`;
    const { data: collection, error, loading } = useFetch(url);
    const [interval, setInterval] = useState(null);
    const [showPublicMint, setShowPublicMint] = useState(true);
    const [collectionsSanity,setCollectionsSanity] = useState([]);
    const [sanityError,setSanityError] = useState(null);
    const [activeNFTPay, setActiveNFTPay] = useState(null);


    useEffect(() => {
        setActiveNFTPay(null)
        if(collectionsSanity && collectionsSanity.length > 0) {
            let arrSanity = [];
            arrSanity = collectionsSanity;
            arrSanity?.map((itemSanity)=>{
                if(String(itemSanity.address).toUpperCase() === String(address).toUpperCase()){
                    getUrlPaymentsNFTPay.find((itemNFTPay)=> {
                        if(String(itemNFTPay.address).toUpperCase() === String(address).toUpperCase()){
                            setActiveNFTPay({
                                activePay:itemSanity.activePay,
                                urlPayments:itemNFTPay.urlPayments,
                                floorPrice: parseFloat(itemSanity.floorPrice)
                            })
                            return 0;
                        }
                    })
                    return 0;
                }
            })
        }
    },[collectionsSanity]);

    useEffect(async() => {
        console.log('wallet',wallet)
        if(new Date().getTime() < new  Date('2022-11-12T18:00:00').getTime()) {
            if(wallet.provider && wallet.userAccount) {
                let is = await isOnWhitelist(wallet.provider,wallet.userAccount);
                console.log(is)
                setShowPublicMint(is)
                console.log('isOnWhitelist',showPublicMint,is)
            }
        } else {
            setShowPublicMint(true)
        }
    },[wallet])

    useEffect(async() => {
        try {
            if (interval == null && collection && collection[0] && wallet.provider) {
                let left =  await totalLeft(wallet.provider, collection[0].project_key)
                console.log('left 1',left)
                setReserve(left)
            } else if (interval == null && collection && collection[0] && !wallet.provider) {
                let left =  await totalLeft(null, collection[0].project_key)
                console.log('left 2',left)
                setReserve(left)
            }
            if (interval == null && collection && collection[0]) {
                let newInterval = setInterval(async() => {
                    let provider = null
                    if (wallet.provider)  {
                        provider = wallet.provider
                    }
                    if(collection && collection[0])  {
                        let left =  await totalLeft(provider, collection[0].project_key)
                        setReserve(left)
                        console.log('left 3',left)
                        if (left == 0) {
                            clearInterval(newInterval);
                            //window.location.reload()
                        }
                    }
                    return true
                },10000)
                console.log('new interval', newInterval)
                setInterval(true)
            }
            console.log('interval', interval)
        } catch (error) {
            console.log('error', error)
        }
    },[collection])

    const handleClickSocial = (social) => {
        window.open(social, '_blank');
    };
    const handleCloseModalFrame = () => {
        if(activeNFTPay && activeNFTPay.activePay){
            setModalBuyCard(false);
        }
    };

    useEffect(()=>{
        try{
            collectionWithNFTPay()
            .then((response) => {
                if (response) {
                    setCollectionsSanity(response[0].collectionsList);
                }else{
                    setCollectionsSanity([])
                }
            })
            .catch((error) => {
                console.error(error);
                setSanityError(error);
                setCollectionsSanity([])
            })
        }catch(er){
            console.log(er)
        }
    },[]);


    if (loading) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ minHeight: '90vh' }}>
                <LoaderCircle text={t("collection_buy_view.loading")} />
            </Box>
        );
    }
    if (error) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ minHeight: '90vh' }}>
                <ErrorMessage error={error} />
            </Box>
        );
    }
    return (
        <Box sx={{ paddingBottom: '50px' }}>
            {collection && (
                <>
                    <Container maxWidth="xl" sx={{ color: '#fff' }}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="flex-end"
                            flexDirection="column"
                            sx={{
                                mt: 2,
                                backgroundImage: `url(${collection[0].banner_url})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                padding: '0px 50px 20px',
                                borderRadius: '10px',
                                height: { xs: '200px', sm: '220px', md: '250px', lg: '300px', xl: '400px' }
                            }}
                        >
                            <Box sx={{ flex: 1 }} />
                            {collection[0].reveal && reserve == 0 &&
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="flex-end"
                                    width="100%"
                                    sx={{
                                        textAlign: 'center',
                                        fontSize: {xs: '38px', sm: '60px', md: '80px', lg: '100px', xl: '110px' },
                                        fontWeight: '600', 
                                        flex: 1,
                                        letterSpacing: {xs: '2px', sm: '10px', md: '30px', lg: '30px', xl: '30px' }
                                    }}
                                >
                                    {t("collection_buy_view.sold_out").toUpperCase()}
                                </Box>
                            }
                            {collection[0]?.user && (
                                <Box 
                                    sx={{
                                        flex:1,
                                        width:"100%",
                                        display:'flex',
                                        justifyContent:"space-between",
                                        alignItems:"flex-end",
                                        "@media screen and (max-width:400px)":{
                                            display:'grid',
                                            gridTemplateColumns:'1fr'
                                        }
                                    }}
                                >
                                    <Box
                                        component={Link}
                                        to={`/profile?address=${collection[0].user.wallet}`}
                                        display="flex"
                                        alignItems="center"
                                        gap="15px"
                                        sx={{ textDecoration: 'none', color: 'inherit'}}
                                    >
                                        <CardMedia
                                            component="img"
                                            src={collection[0].user.profile_pic_url_resize}
                                            alt="img"
                                            sx={{ width: '50px', height: '50px', borderRadius: '5px' }}
                                        />
                                        <Box
                                            sx={{
                                                display: { xs: 'initial', sm: 'initial', md: 'none', lg: 'none', xl: 'none' }
                                            }}
                                        >
                                            {
                                                collection && collection[0] && collection[0].user && collection[0].user.username != '' && 
                                                <React.Fragment>
                                                    {
                                                        Web3.utils.isAddress(collection[0].user.username) ?
                                                            (collection[0].user.username).substring(0,5)+ '...' +(collection[0].user.username).substring(38,54)
                                                        :
                                                        collection[0].user.username
                                                    }
                                                </React.Fragment>
                                            }
                                        </Box>
                                        <Box
                                            sx={{
                                                display: { xs: 'none', sm: 'none', md: 'initial', lg: 'initial', xl: 'initial' }
                                            }}
                                        >
                                            {
                                                collection && collection[0] && collection[0].user && collection[0].user.username != '' && 
                                                <React.Fragment>
                                                    {
                                                        Web3.utils.isAddress(collection[0].user.username) ?
                                                            (collection[0].user.username).substring(0,5)+ '...' +(collection[0].user.username).substring(38,54)
                                                        :
                                                        collection[0].user.username
                                                    }
                                                </React.Fragment>
                                            }
                                        </Box>
                                    </Box>
                                    <Box display="flex" alignItems="center" gap="8px">
                                        {
                                            collection[0].user.facebook != '' && collection[0].user.facebook != 'no' &&
                                            <FaInstagram
                                                onClick={() => handleClickSocial(collection[0].user.facebook)}
                                                size={25}
                                                color="#fff"
                                                style={{ cursor: 'pointer' }}
                                            />
                                        }
                                        {
                                            collection[0].user.twitter != '' &&
                                            <BsTwitter
                                                onClick={() => handleClickSocial(collection[0].user.twitter)}
                                                size={28}
                                                color="#fff"
                                                style={{ cursor: 'pointer' }}
                                            />
                                        }
                                        <FaShareAlt
                                            onClick={() => setModalShare(true)}
                                            size={24}
                                            color="#fff"
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </Box>
                                </Box>
                            )}
                        </Box>
                        <Box sx={{ mt: 5 }}>
                            <Grid
                                container
                                spacing={2}
                                columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
                                sx={{ mt: 0, flexDirection: { xs: 'column-reverse', sm: 'row', md: 'row', lg: 'row', xl: 'row' } }}
                            >
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <Box
                                        sx={{
                                            display: { xs: 'none', sm: 'initial', md: 'initial', lg: 'initial', xl: 'initial'},
                                            fontSize: '30px',
                                            color: '#4aa521'
                                        }}
                                    >
                                        {collection[0].name}
                                    </Box>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        gap="8px"
                                        sx={{
                                            fontSize: '14px',
                                            mb: 2,
                                            mt: { xs: 8, sm: 0, md: 0, lg: 0, xl: 0 }
                                        }}
                                    >
                                        <Box>
                                            {t("collection_buy_view.minted")}: <b>{  collection[0].collection_of - reserve }</b>
                                        </Box>
                                        <Box>
                                            Total: <b>{collection[0].collection_of}</b>
                                        </Box>
                                        <Box>
                                            {t("collection_buy_view.reserved")}: <b>{ reserve }</b>
                                        </Box>
                                    </Box>
                                    <Box sx={{ wordWrap: 'break-word' }}>
                                        {collection[0].description}
                                    </Box>
                                    { collection[0].collection_of > 0 && showPublicMint &&
                                        <PublicMint
                                            collection={collection[0]}
                                            openModalBuy={setModalBuyCard}
                                            wallet={wallet}
                                            reserve={reserve}
                                            activeNFTPay={activeNFTPay}
                                        />
                                    }
                                    { !showPublicMint &&
                                    <Box sx={{display:'flex',justifyContent:'flex-end',width:'100%',mt:'10px',color:'#fff',textDecoration:'underline'}}>
                                        {t("collection_buy_view.not_found_white_list")}
                                        <br />
                                    </Box>
                                    }
                                    { (sanityError != '' || sanityError != null) &&
                                        <Box
                                            sx={{
                                                boxSizing: 'border-box',
                                                padding: '0px 15px',
                                                borderRadius: '5px',
                                                color: '#B5B8C0',
                                                mt: 2
                                            }}
                                        >
                                            <Box sx={{ fontSize: '14px',color:'red' }}>
                                                {sanityError}
                                            </Box>
                                        </Box>
                                    }
                                    <Button
                                        LinkComponent={Link}
                                        to={`/collection?address=${collection[0].project_key}`}
                                        sx={{ mt: 2 }}
                                        endIcon={<GrShare size={15} />}
                                    >
                                        {t("collection_buy_view.view_collection")}
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <Box
                                        sx={{
                                            display: { xs: 'initial', sm: 'none', md: 'none', lg: 'none', xl: 'none'},
                                            fontSize: '30px',
                                            color: '#4aa521'
                                        }}
                                    >
                                        {collection[0].name}
                                    </Box>
                                    <CardMedia
                                        component={collection[0].is_video ? "video" : "img"}
                                        src={collection[0].thumb_url}
                                        autoPlay
                                        muted
                                        alt="nft"
                                        sx={{
                                            borderRadius: '8px',
                                            objectFit: 'contain',
                                            width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' },
                                            margin: '0 auto',
                                            aspectRatio: 'inherit'
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                    <Modal open={modalBuyCArd} onClose={handleCloseModalFrame}>
                        <>
                            <WhiteListFormFrame close={handleCloseModalFrame} collection={collection[0]} activeNFTPay={activeNFTPay}/>
                        </>
                    </Modal>
                </>
            )}
            <ModalShare open={modalShare} setOpen={setModalShare} url={`https://gallery.proteinalab.com/collection-buy?collection=${address}`} />
        </Box>
    );
};

CollectionBuy.propTypes = {
    location: PropTypes.object
}

export default CollectionBuy;
