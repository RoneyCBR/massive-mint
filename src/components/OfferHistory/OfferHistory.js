import React from 'react'
import { Avatar, Box, CardMedia, Container } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { RiShareBoxFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { AnyResults, BodyHistory, BodyMovement, CardContent, ContentAvatar, ContentDetails, ContentHistory, ContentMovements, GridItem1, GridItem2, TextAbout, TextData, TextType } from './style';

const OfferHistory = ({content}) => {
    const { t } = useTranslation("translate");
    const handleClickSnowtrace = (link) =>{
        window.open(link, '_blank');
    }

    const determinateTypeNameUser = (type) => {
        if(type == "MINT") {
            return t("offers_history.minted_text")
        } else if (type == "TRANSFER") {
            return t("offers_history.transferred_text")
        } else if (type == "BID") {
            return t("offers_history.bid_placed_text")
        } else if (type == "ONAUCTION") {
            return t("offers_history.on_auction_text")
        } else if (type == "LISTED") {
            return t("offers_history.at_sale_text")
        } else if (type == "AUCTION_SALE_FINISH") {
            console.log('type ::',type);
            return t("offers_history.at_cancel")
        }
    }
    const determinateIdentifier = (type) => {
        if(type == "MINT") {
            return  t("offers_history.by_text")
        } else if (type == "TRANSFER") {
            return t("offers_history.to_text")
        } else if (type == "BID") {
            return t("offers_history.by_text")
        } else if (type == "ONAUCTION") {
            return t("offers_history.by_text")
        }else if (type == "LISTED") {
            return t("offers_history.by_text")
        }else if (type == "AUCTION_SALE_FINISH") {
            return t("offers_history.by_text")
        }
    }

    const dataFormated = (data)=> {
        /* data format days, month, years */
        const format = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });

        const date = format.format(new Date(data * 1000));
        return date;
    }

    try {
        if(content && content.length === 0){
            return (
                <AnyResults>
                    <h2>{t("offers_history.any_results")}</h2>              
                </AnyResults>
            )
        }
    } catch (error) {
        console.log('error',error);
    }
    return (
        <Container maxWidth="xl" sx={{mt:"30px"}}>
        {content.map((item, index)=>
        <CardContent key={index}>
            <ContentHistory>   
                <BodyHistory>   
                    <ContentAvatar>
                        <Avatar alt="artcrypted.art"  >
                            <AccountCircleIcon />
                        </Avatar>
                    </ContentAvatar>
                    <ContentDetails>
                        <GridItem1>
                            <TextType>
                                { determinateTypeNameUser(item.type_movement) }  {' ' + determinateIdentifier(item.type_movement)}
                            </TextType>
                            <TextAbout>
                                { localStorage.getItem('current_wallet') && item.to.toUpperCase() == localStorage.getItem('current_wallet').toUpperCase()  ?
                                    '@'+t("offers_history.you_text") :'@'+(item.to).substring(0,5)+ '...' +(item.to).substring(38,54)
                                }
                            </TextAbout>
                            <TextData>
                                {dataFormated(item.created)}
                            </TextData>
                        </GridItem1>
                        <GridItem2>
                            <ContentMovements>   
                                {item.type_movement != "MINT" &&  item.type_movement != "TRANSFER" && item.type_movement != "AUCTION_SALE_FINISH" &&
                                    <BodyMovement>
                                        <CardMedia
                                            component='img' 
                                            src="eth.png"
                                            sx={{
                                                display:'block',
                                                height:'26px', 
                                                width:'16px',
                                                padding:'1px'
                                            }}
                                        />
                                        {item.amount}
                                        <span>ETH</span>
                                    </BodyMovement>
                                }
                            </ContentMovements>
                        </GridItem2>
                    </ContentDetails>
                    <Box>
                        <span 
                            style={{cursor:'pointer'}} 
                            onClick={()=>handleClickSnowtrace(`${process.env.REACT_APP_SCAN}tx/${item.transaction_hash}`)}
                        >
                            <RiShareBoxFill size={20} style={{color:'#fff'}} />
                        </span>
                    </Box>
                </BodyHistory>
            </ContentHistory>
        </CardContent>)}
        </Container>
    )
}

OfferHistory.defaultProps = {
    content: [],
}

OfferHistory.propTypes = {
    content: PropTypes.array,
}


export default OfferHistory

