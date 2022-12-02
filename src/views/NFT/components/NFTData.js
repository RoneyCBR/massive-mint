import React, { useState,useContext } from 'react'
import { Container } from '@mui/material';
import NFTMedia from './NFTMedia';
import NFTDataMedia from './NFTDataMedia';
import ModalTransfer from './ModalTransfer/ModalTransfer';
import Buttons from '../components/Buttons';
import ModalOffers from './ModalOffers';
import ModalSetupNFT from './ModalSetupNFT';
import AuctionSetup from './ModalSetupNFT/components/AuctionSetup';
import ModalSelectConfigureNFT from './ModalSelectConfigureNFT';
import { Context } from 'hooks/WalletContext';
import { NFTDataContent } from '../Styled';
import PropTypes from 'prop-types';

const NFTData = ({nft, setBidTx, bids, reloadPage}) => {
    const [openModalTransfer, setOpenModalTransfer]=useState(false);
    const [openModalSelectconfiguration, setOpenModalSelectconfiguration]=useState(false);
    const [openModalOffers, setOpenModalOffers]=useState(false);
    const [openModalSetupNFT, setOpenModalSetupNFT]=useState(false);
    const [openModalAuction, setOpenModalAuction]=useState(false);
    const {data}=useContext(Context);
    const [isOpenModalOfferCrypto, setIsOpenModalOfferCrypto]=useState(false);

    return (
        <Container maxWidth="xl" sx={{marginTop:'1rem'}}>
            <NFTDataContent>
                <NFTMedia nft={nft} />
                <NFTDataMedia 
                    nft={nft} 
                    setBidTx={setBidTx} 
                    bids={bids} 
                    reloadPage={reloadPage}
                >
                    <Buttons
                        nft={nft}
                        setOpenModalTransfer={setOpenModalTransfer}
                        setOpenModalSelectconfiguration={setOpenModalSelectconfiguration}
                        setOpenModalOffers={setOpenModalOffers}  
                    />
                </NFTDataMedia>
                <ModalTransfer
                    open={openModalTransfer}
                    onClose={()=>setOpenModalTransfer(false)}
                    nft={nft}
                />
                <ModalSelectConfigureNFT 
                    nft = {nft}
                    projectKey={nft && nft.project_key}
                    image={nft && nft.metadata.is_video ? nft.thumb_gif:nft.thumb_url_large}
                    isVideo={nft && nft.metadata && nft.metadata.json_data.isVideo ? true : false}
                    open={openModalSelectconfiguration} 
                    onClose={setOpenModalSelectconfiguration}
                    auction={setOpenModalAuction}
                    sale={setOpenModalSetupNFT}
                />
                <AuctionSetup 
                    auction = { (nft && nft.auction) ? nft.auction : {}}
                    //src={item.metadata.is_video ? item.thumb_gif:item.thumb_url_large}
                    image={nft && nft.metadata.is_video ? nft.thumb_gif:nft.thumb_url_large}
                    tokenId={nft && nft.token_id}
                    projectKey={nft && nft.project_key}
                    isVideo={nft && nft.metadata && nft.metadata.json_data.isVideo ? true : false}
                    isOpen={openModalAuction} 
                    isClosed={setOpenModalAuction}
                    selector={setOpenModalSelectconfiguration}
                    setOpenModalSelectconfiguration={setOpenModalSelectconfiguration}
                />
                <ModalOffers 
                    openModalOffers={openModalOffers} 
                    dataNFTS={[]} 
                    setOpenModalOffers={setOpenModalOffers}
                    data={data}
                    offers={[]}
                    setIsOpenModalOfferCrypto={setIsOpenModalOfferCrypto}
                    isOpenModalOfferCrypto={isOpenModalOfferCrypto}
                />
                {nft &&
                    <ModalSetupNFT
                        sale = { (nft && nft.sale) ? nft.sale : {}}
                        open={openModalSetupNFT}
                        openModalSetupNFT={openModalSetupNFT}
                        setOpenModalSetupNFT={setOpenModalSetupNFT}
                        nftImage={nft && nft.metadata.is_video ? nft.thumb_gif:nft.thumb_url_large}
                        tokenId={nft && nft.token_id && nft.token_id}
                        projectKey={nft && nft.project_key}
                        isVideo={nft && nft.metadata && nft.metadata.json_data.isVideo ? true : false}
                        setOpenModalSelectconfiguration={setOpenModalSelectconfiguration}
                    />
                }
            </NFTDataContent>
        </Container>
    )
}

NFTData.propTypes = {
    nft: PropTypes.object.isRequired,
    setBidTx : PropTypes.func,
    bids : PropTypes.array,
    reloadPage : PropTypes.func
    //NFTurl: PropTypes.string,
} 

export default NFTData