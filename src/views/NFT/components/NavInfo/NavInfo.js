import React, { useEffect, useState } from 'react'
import { Avatar, Grid, Box, CardMedia, Tooltip } from '@mui/material';
import {BiShareAlt} from 'react-icons/bi'
import { useTranslation } from 'react-i18next';
import ModalShare from './components/ModalShare';
import { useLocation } from 'react-router';
import {
    AccountLink,
    AccountLinkImage,
    ContractLink,
    NavInfoItem,
    NavInfoItemWithBorderTopRightRadius,
    NavInfoContainer,
    NavInfoItemContent,
    NavInfoItemContentText,
    NavInfoItem2,
    NavInfoItemContainerLast
} from './styles/styles';
import Web3 from 'web3';
import PropTypes from 'prop-types';

const NavInfo =  ({nft}) => {
    const { t } = useTranslation("translate");
    const [openModalShare, setOpenModalShare] = useState(false);
    const [url,setUrl] = useState('');
    const location = useLocation(); 
    const handleOpenModalShare = () => {
        setUrl('https://'+ process.env.REACT_APP_DOMAIN+location.pathname + location.search)
        setOpenModalShare(true)
    }

    useEffect(()=>{
        setUrl('https://'+ process.env.REACT_APP_DOMAIN+location.pathname + location.search)
    },[]) 
    

    return (
        <NavInfoContainer maxWidth='lg'>
            <Grid container columns={{ xs: 2, sm: 2, md: 4, lg: 6 }} justifyContent='center'>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <NavInfoItem>
                        {t("nft-navInfo.token_standard")}
                        <h1 style={{marginBottom:'0px'}}>ERC 721</h1>
                    </NavInfoItem>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <NavInfoItemWithBorderTopRightRadius>
                        {t('nft-navInfo.creator')}
                        <AccountLinkImage to={`/profile?address=${nft.project.user.main_key}`}>
                            <Avatar alt={nft.project.user.short_main_key} src={`${nft.project.user.profile_pic_url}`} />
                        </AccountLinkImage>
                        <NavInfoItemContent>
                             <AccountLink to={`/profile?address=${nft.project.user.main_key}`}>
                                <Tooltip 
                                    title=
                                    { 
                                        nft && nft.project && nft.project.user && nft.project.user.username ? nft.project.user.username
                                        :
                                        nft.project.user.short_main_key
                                    }
                                    placement="top"
                                >
                                    <NavInfoItemContentText>
                                        { 
                                            nft && nft.project && nft.project.user && nft.project.user.username && !Web3.utils.isAddress(nft.user.username) ?
                                            nft.project.user.username
                                            :
                                            nft.project.user.short_main_key
                                        }
                                    </NavInfoItemContentText>
                                </Tooltip>   
                            </AccountLink>
                        </NavInfoItemContent>
                    </NavInfoItemWithBorderTopRightRadius>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <NavInfoItem>
                        {t('nft-navInfo.owner')}
                        <AccountLinkImage to={`/profile?address=${nft && nft.user.main_key}`}>
                            <Avatar alt={nft && nft.user.short_main_key} src={`${nft && nft.user.profile_pic_url}`} />
                        </AccountLinkImage>
                        <Box sx={{ width:'100%', textAlign: 'center' }}>
                            <AccountLink to={`/profile?address=${nft && nft.user.main_key }`}>
                                <Tooltip 
                                    title=
                                    {
                                        nft && nft.user && nft.user.username ? nft.user.username
                                        :
                                        nft.user.short_main_key
                                    }
                                    placement="top"
                                >
                                    <NavInfoItemContentText>
                                        {
                                            nft && nft.user && nft.user.username && !Web3.utils.isAddress(nft.user.username) ? 
                                            nft.user.username
                                            :
                                            nft.user.short_main_key
                                        }
                                    </NavInfoItemContentText>
                                </Tooltip>   
                            </AccountLink>
                        </Box>
                    </NavInfoItem>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <NavInfoItemWithBorderTopRightRadius>
                        {t("nft-navInfo.name")}
                        <AccountLinkImage to={`/collection?address=${nft && nft.project.project_key}`}>
                            <Avatar alt={nft &&  (nft.owner).substring(0,5)+ '...' +(nft.owner).substring(38,54)} src={`${nft && nft.project.thumb_url}`}>
                                <CardMedia
                                    component={nft.project.is_video ? 'video' : 'img'}
                                    src={nft.project.thumb_url}
                                    alt={nft.project.name}
                                    loop
                                    autoPlay
                                    muted
                                    controls={false}
                                    sx={{
                                        transform: 'scale(2)',
                                    }}
                                />
                            </Avatar>
                        </AccountLinkImage>
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <AccountLink to={`/collection?address=${nft && nft.project.project_key}`}>
                                <Tooltip title={nft.project.name+''}  placement="top">
                                    <NavInfoItem>
                                        {nft.project.name}
                                    </NavInfoItem>
                                </Tooltip>
                            </AccountLink>
                        </Box>
                    </NavInfoItemWithBorderTopRightRadius>
                </Grid>
            </Grid>
            <Grid container columns={{ xs: 2, sm: 2, md: 2, lg: 6 }} justifyContent='center'>
                <Grid item xs={1} sm={1} md={1} lg={2}>
                    <NavInfoItem2>
                        <span style={{marginRight:'5px', fontWeight:'bold'}}>{t("nft-navInfo.contract")}:</span>
                        <span style={{fontFamily:'Courier, "Lucida Console", monospace'}}>
                            <ContractLink href={`${process.env.REACT_APP_SCAN}address/${String(nft.project.project_key).toLowerCase()}`} target="_blank" rel="noopener noreferrer">
                                {nft.project.project_key_format ? nft.project.project_key_format : 'Name is not aviable'}
                            </ContractLink>
                        </span> 
                    </NavInfoItem2>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={2}>
                    <NavInfoItemContainerLast>   
                        <Box onClick={()=>handleOpenModalShare()} sx={{marginTop:'3px', cursor:'pointer',pt:'5px'}}>
                            <>
                            <BiShareAlt size={20} style={{color:'#fff'}} />
                            </>
                        </Box>
                        <ModalShare 
                            setOpen={setOpenModalShare} 
                            open={openModalShare} 
                            url={url}
                        />
                    </NavInfoItemContainerLast>
                </Grid>
            </Grid>
        </NavInfoContainer>
    );
}

NavInfo.propTypes = {
    nft: PropTypes.object.isRequired,
}

export default NavInfo;
