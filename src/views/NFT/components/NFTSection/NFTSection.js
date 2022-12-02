import React from 'react'
import { Card, CardContent, Container, Divider, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import LockIcon from '@mui/icons-material/Lock';
import {
    DetailsBoxContainer,
    NFTSectionCardContentBoxFooter,
    NFTSectionCardMedia,
    NFTSectionIconETH,
    NFTSectionLocalOutlineIcon,
    NFTSectionOutlineIcon,
    NFTSectionTitle,
    NFTSectionValue
} from './styled';
import PropTypes from 'prop-types';

const NFTSection = ({ resource}) => {
    const { t } = useTranslation("translate");
    const data = resource.nft.read()
    const nft = data[0]
    return (
        <DetailsBoxContainerMain>
            <Container maxWidth='xl'>
                <h1 style={NFTSectionTitle}>{t("nft-screen.other_nfts")}</h1>
                <Grid container rowSpacing={5} spacing={{ xs: 2, md: 3, lg: 4 }} columns={{ xs: 1, sm: 2, md: 8, lg: 10 }}>
                    {nft.random && nft.random.map((card, index) => (
                        <Grid key={index} item xs={1} sm={1} md={2} lg={2}>
                            <DetailsBoxContainer>
                                {
                                    card.on_auction ? <GavelOutlinedIcon sx={NFTSectionOutlineIcon} /> : ''
                                }
                                {
                                    card.on_sale ? <LocalOfferOutlinedIcon sx={NFTSectionLocalOutlineIcon} /> : ''
                                }
                            </DetailsBoxContainer>
                            <Card sx={{marginTop:'-38px'}}>
                                <Link to={`/nft?address=${card.project_key}&token_id=${card.token_id}`}>
                                    <NFTSectionCardMedia
                                        component="img"
                                        image={'https://f8n-production-collection-assets.imgix.net/0x30C80b9633b4C6071B44569DA52b58Cceb6C17B4/1/nft.jpg?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680'}
                                        //image={card.thumb_resize}
                                        alt="lottery" 
                                    />
                                </Link>
                                <CardContent style={{paddingBottom:'0px', paddingTop:'0px'}}>
                                    <NFTSectionCardContentBox>
                                        <h4>
                                            00.00 USD
                                        </h4>
                                        <NFTSectionCardContentBoxFooter>
                                            {
                                                nft.creator == nft.owner &&
                                                <LockIcon htmlColor='#000' sx={{fontSize:'20px'}} />  
                                                
                                            }
                                        </NFTSectionCardContentBoxFooter>
                                        <NFTSectionCardContentBoxFooter>
                                            <span style={{marginTop:'3px'}} >
                                                <NFTSectionIconETH
                                                    component="img"
                                                    src='https://cryptoloteria.mx/static/media/ethIcon.13752778.svg'
                                                />
                                            </span>
                                            <h4> 
                                                00.00
                                            </h4>
                                        </NFTSectionCardContentBoxFooter>
                                    </NFTSectionCardContentBox>
                                    {/* <h4 style={{marginTop:'-10px', marginBottom:'5px', textAlign:'center'}}>{t("card-section-gallery.minted")}</h4> */}
                                    <Divider />
                                    <center>
                                        <NFTSectionValue component="h3">{card.metadata.json_data.attributes[0].value}</NFTSectionValue>
                                    </center>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </DetailsBoxContainerMain>
    );
}

NFTSection.propTypes = {
    resource: PropTypes.object.isRequired,
}

export default NFTSection;