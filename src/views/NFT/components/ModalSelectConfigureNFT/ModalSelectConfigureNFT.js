import React, { useContext, useEffect, useState } from 'react'
import { Alert, Box, Button, Card, CardMedia, Modal, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import {RiAuctionFill} from 'react-icons/ri'
import {FaTag} from 'react-icons/fa'
import {IoIosArrowForward} from 'react-icons/io' 
import { useTranslation } from 'react-i18next'
import ShowSign from 'components/ShowSign'
import { isApproved } from 'services/ERC721/isApproved';
import { Context } from 'hooks/WalletContext';
import PropTypes from 'prop-types';
import PresentationBackground from 'assets/background/newBackground.png';
import { deleteAuction } from 'services/Exchange/configurationAuction';

const cardStyle = {
    cursor:'pointer', 
    display:'flex', 
    justifyContent:'space-between', 
    alignItems:'center', 
    marginBottom:'1rem', 
    padding:'1rem',
    border:'1px solid #e0e0e0',
}
localStorage.removeItem('lastTx')
localStorage.removeItem('lastTxWho')
const ModalSelectConfigureNFT = ({open, onClose, projectKey,image, isVideo, auction, sale, nft}) => {
    const {data} = useContext(Context)
    const { t } = useTranslation("translate")
    const [isUserSigned, setIsUserSigned] = useState(false)
    const deleteAuctionOrSale = async() => {
        await deleteAuction(nft.token_id,projectKey, data.userAccount,data.provider);
        window.location.reload()
    }

    useEffect(async()=>{
        if(data && nft && nft.user && nft.user.main_key &&  (data.userAccount+'').toUpperCase() == (nft.user.main_key+'').toUpperCase()) {
            try {
                let approve = await isApproved(projectKey, data.userAccount,process.env.REACT_APP_EXCHANGE);
                setIsUserSigned(approve)
            } catch (error) {
                console.log(error);
                //setIsUserSigned(true)
            }
        }

        //setIsUserSigned(false)
    },[])
    const handleClickSelectSetup = async(step) => {
        if(step===1){
            await onClose(false);
            sale(true);
        }
        if(step===2){
            await onClose(false);
            auction(true);
        }
    }
    const handleCloseModal = () => {
        onClose(false);
    }
    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Paper
                sx={{
                    width: 800,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    border: '2px solid #E5E5E5',
                    borderRadius:'8px',
                    boxShadow: 24,
                    p: 4,
                    outline: 'none',
                    ':focus': {
                        outline: 'none',
                    },
                    overflow:'auto',
                    '@media (max-width:850px)':{
                        width: '100%',
                        height: '100%'
                    },
                    '@media (max-width:830px)':{
                        width: '100%',
                        height: '100%'
                    },
                    '@media (max-width:600px)':{
                        width: '100vw',
                        height: '100%'
                    }
                }}
            >
                {!isUserSigned && <ShowSign projectKey={projectKey} image={image} isVideo={isVideo} userSigned={setIsUserSigned} onClose={onClose} />}
                {isUserSigned &&
                <>
                <Box
                    display='flex' 
                    justifyContent='flex-end' 
                    alignItems='flex-start' 
                    sx={{width:'100%'}}
                >
                    <Button type='button' onClick={handleCloseModal}> 
                        <CloseIcon />
                    </Button>
                </Box>
                <Box
                    display='flex' 
                    justifyContent='center' 
                    alignItems='flex-start' 
                >
                    <h1>{t("modal_setup_nft.title")}</h1>
                </Box>
                { localStorage.getItem('lastTx') &&
                <Box sx={{width:'100%', margin:'0 auto', marginBottom:'0.5rem'}}>
                    <Alert severity="success">
                        { localStorage.getItem('lastTxWho') &&
                            localStorage.getItem('lastTxWho')+' '
                        }
                        <a style={{textDecoration:'none',color:'green'}} href={`${process.env.REACT_APP_SCAN}tx/${localStorage.getItem('lastTx')}`} target="_blank" rel="noreferrer">
                            {(localStorage.getItem('lastTx')).substring(0,8)+ '...' +(localStorage.getItem('lastTx')).substring(58,66)}
                        </a>
                    </Alert>
                </Box>}
                {nft && (nft.auction && nft.auction.time_live > 0 || nft.sale && nft.sale.price > 0)&&
                    <Box 
                    display='flex' 
                    alignItems='center'
                    justifyContent='center'
                    sx={{width:'100%', margin:'0 auto', marginBottom:'0.5rem'}}>
                        <Alert severity="info">
                            {nft.auction && nft.auction.time_live > 0 ?
                                'You have an active auction' : 'You have your nft on sale'
                            }
                        <Button 
                            type='button' 
                           onClick={ () => deleteAuctionOrSale() }
                            //disabled
                            sx={{
                                backgroundImage:`url(${PresentationBackground})`, 
                                backgroundRepeat:'no-repeat',
                                backgroundSize:'cover',
                                color:'#fff',
                                marginLeft: '5px'
                            }}>
                        {t("modal_setup_nft.btn_cancel")}</Button>
                        </Alert>
                    </Box>
                }
                <Box 
                    display='flex' 
                    alignItems='center'
                    justifyContent='center'
                    sx={{
                        gap: '5rem',
                        '@media screen and (max-width: 360px)': {
                            flexDirection: 'column'
                        }
                    }}
                >
                    <CardMedia
                        component="img"
                        src={image}
                        alt='NFT'
                        muted
                        loop
                        autoPlay
                        sx={{
                            borderRadius: '10px',
                            width: '20rem',
                            height: '20rem',
                        }}
                    />
                    <Box sx={{width:'300px'}}>
                        <Card onClick={()=>handleClickSelectSetup(1)} sx={cardStyle}>
                            <Box sx={{display:'flex', gap:'1rem', alignItems:'center'}}>
                                <FaTag size={20} color='#2d3748' />
                                <Box component='span'>{t("modal_setup_nft.on_sale")}</Box>
                            </Box>
                            <Box>
                                <IoIosArrowForward size={20} />
                            </Box>
                        </Card>
                        <Card onClick={()=>handleClickSelectSetup(2)} sx={cardStyle}>
                            <Box sx={{display:'flex', gap:'1rem', alignItems:'center'}}>
                                <RiAuctionFill size={25} color='#2d3748' />
                                <Box component='span'>{t("modal_setup_nft.on_auction")}</Box>
                            </Box>
                            <Box>
                                <IoIosArrowForward size={20} />
                            </Box>
                        </Card>
                        <Card onClick={()=>handleClickSelectSetup(3)} sx={{display:'none'}}>
                            <Box sx={{display:'flex', gap:'1rem', alignItems:'center'}}>
                                <RiAuctionFill size={25} />
                                <Box component='span'>{t("modal_setup_nft.auction_and_sale")}</Box>
                            </Box>
                            <Box>
                                <IoIosArrowForward size={20} />
                            </Box>
                        </Card>
                    </Box>
                </Box>
                </>}
            </Paper>
        </Modal>
    )
}

ModalSelectConfigureNFT.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    projectKey: PropTypes.string,
    userAccount: PropTypes.string,
    isVideo: PropTypes.bool.isRequired,
    auction: PropTypes.func.isRequired,
    sale: PropTypes.func.isRequired,
    nft : PropTypes.object
}

export default ModalSelectConfigureNFT
