import React from 'react';
import { Box, Card, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { isMinted } from 'services/ERC721/isMinted';
import { NFTCardMedia } from 'views/NFT/Styled';
import { NFTMediaCardAction, NFTMediaCardContent, NFTMediaCardFooter, NFTMediaDefaultTittle } from './styled';
import PropTypes from 'prop-types';

const NFTMedia = ({nft}) => {
    const { t } = useTranslation("translate");
    let imgFull = document.querySelector('#imgFull');
    
    const handleViewFullscreen = (e,obj) => {
        if(e && e.target && obj && obj.metadata && String(obj.metadata.format).toUpperCase() != "MPEG"){  
            e.target.attributes.getNamedItem('src').value = obj.metadata.image_url; 
            if(e.target.requestFullscreen) {
                e.target.requestFullscreen();
            } else if( e.target.mozRequestFullScreen) {
                e.target.mozRequestFullScreen();
            } else if( e.target.webkitRequestFullscreen) {
                e.target.webkitRequestFullscreen();
            } else if(e.target.msRequestFullscreen) {
                e.target.msRequestFullscreen();
            }
        }else{
            if(obj && obj.metadata && obj.metadata.image_url &&  String(obj.metadata.format).toUpperCase() == "MPEG" ){
                window.open(obj.metadata.image_url, '_blank');
            }
        }
    
    }

    const handleResetViewFullscreen = (e,obj) => {
        if(obj && obj.metadata && obj.metadata.is_video && obj.metadata.is_video){
            e.target.attributes.getNamedItem('src').value = obj.metadata.image_url
        }else{
            if(obj && obj.thumb_url_large){
                e.target.attributes.getNamedItem('src').value = obj.thumb_url_large
            }
        }
    }      

    React.useEffect(() => {
        let count = 0;
        if(imgFull && nft){
            imgFull.onfullscreenchange = async(e) =>{
                count++;
                if(count == 2){
                    handleResetViewFullscreen(e,nft);
                    count=0;
                }
            } 
        }
    },[imgFull]);


    return (
        <Box width="100%">
            <Grid 
                container 
                columns={{sm:12, md:12, lg:12, xl:12}}
                rowSpacing={4} 
                spacing={1}
                justifyContent="center"
            >
                <Grid 
                    item 
                    xs={12}
                    sm={12} 
                    md={11} 
                    lg={12} 
                    xl={12}
                    sx={{ width:'100%' }}
                >
                    <Card sx={{ width: '100%' }}>   
                        {nft && nft.reveal.confirmed && isMinted(nft) ?
                            <NFTMediaCardAction onClick={async(e)=>{handleViewFullscreen(e,nft)}}>
                                <NFTCardMedia
                                    id="card-media"
                                    ref={(img)=>{imgFull = img}}
                                    component={"img"}
                                    src={nft && nft.metadata && nft.metadata.image_url}
                                    //autoPlay={isPlayed}
                                    autoPlay
                                    loop
                                    controls
                                    //preload
                                    alt="nft image"
                                /> 
                            </NFTMediaCardAction>
                            :
                            <NFTMediaDefaultTittle component="h1"> 
                                ?
                            </NFTMediaDefaultTittle>
                        }
                        
                        {
                            nft && nft.metadata && nft.metadata.is_video == false && nft.metadata.format == "mpeg" && nft.metadata.image_url && nft && nft.reveal.confirmed &&  isMinted(nft) &&
                            <Box width="100%" display="flex" justifyContent="center">
                                <Box
                                    component={"audio"}
                                    controlsList="nodownload"
                                    src={nft.metadata.image_url}
                                    typeof="audio/mpeg"
                                    controls
                                    width="100%" height="32px"
                                    sx={{
                                        "& audio":{
                                            color:'red'
                                        }
                                    }} 
                                />
                            </Box>
                        }
                        {nft && nft.reveal.confirmed && isMinted(nft) && 
                            <NFTMediaCardContent>   
                                <NFTMediaCardFooter gutterBottom variant="body2" component="h2">
                                    {t("nft-screen.format")}: {nft && nft.metadata && nft.metadata.format.toUpperCase()}
                                </NFTMediaCardFooter>
                                <NFTMediaCardFooter gutterBottom variant="body2" component="h2">
                                    {t("nft-screen.resolution")}: {nft && nft.metadata && nft.metadata.resolution}
                                </NFTMediaCardFooter>
                            </NFTMediaCardContent>
                        }
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

NFTMedia.propTypes = {
    nft: PropTypes.object.isRequired
}

export default NFTMedia