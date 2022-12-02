import React from 'react'
import { Avatar, Box, CardMedia } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import avalancheIcon from 'assets/logos/avalanche_logo.svg'
import {history} from 'mocks/history'
import { RiShareBoxFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { isEnglish } from 'utils/sanityLanguage';
import { OfferHistoryContainerAvatar, OfferHistoryContainerBody, OfferHistoryContainerBox, OfferHistoryContainerCard, OfferHistoryContainerFooter, OfferHistoryContentBody, OfferHistoryContentBox } from './styled';
import PropTypes from 'prop-types';

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
        }else if (type == "LISTED") {
            return t("offers_history.at_sale_text")
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
        }
    }

    const dataFormated = (data)=> {
        /* data format days, month, years */
        const format = new Intl.DateTimeFormat(isEnglish ? 'es-ES' : 'en-US' , {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
        console.log('date history',data)
        const date = format.format(new Date(data * 1000));
        return date;
    }

    if(content.length === 0){
        return <center><h1>{t("message_you_dont_have_movements")}</h1></center>;
    }
    return (
        <>
            {content.map((item, index) =>
                <OfferHistoryContainerCard key={index}>
                    <OfferHistoryContainerBox>   
                        <OfferHistoryContentBox>   
                            <OfferHistoryContainerAvatar>
                                <Avatar alt="artcrypted.art"  >
                                    <AccountCircleIcon />
                                </Avatar>
                            </OfferHistoryContainerAvatar>
                            <OfferHistoryContainerBody>
                                <OfferHistoryContainerBody>
                                    <Box>
                                        { determinateTypeNameUser(item.type_movement) }  {' ' + determinateIdentifier(item.type_movement)}
                                    </Box>
                                    <OfferHistoryContentBody>
                                        { localStorage.getItem('current_wallet') && item.to.toUpperCase() == localStorage.getItem('current_wallet').toUpperCase()  ?
                                            '@'+t("offers_history.you_text") :'@'+(item.to).substring(0,5)+ '...' +(item.to).substring(38,54)
                                        }
                                    </OfferHistoryContentBody>
                                    <Box
                                        sx={{
                                            "@media (max-width: 350px)": {
                                                fontSize: '13px'
                                            }
                                        }}
                                    >
                                        {dataFormated(item.created)}
                                    </Box>
                                </OfferHistoryContainerBody>
                                <Box width="100%">
                                    <OfferHistoryContainerFooter>   
                                        {item.type_movement != "MINT" &&  item.type_movement != "TRANSFER" && 
                                            <Box sx={{ display:'flex', height: '100%', alignItems: 'center' }}>   
                                                <OfferHistorycardMediaFooter
                                                    component='img' 
                                                    src={avalancheIcon} 
                                                />
                                                {item.amount}
                                                WAVAX
                                            </Box>
                                        }
                                    </OfferHistoryContainerFooter>
                                </Box>
                            </OfferHistoryContainerBody>
                            <Box>
                                <span 
                                    style={{cursor:'pointer'}} 
                                    onClick={()=>handleClickSnowtrace(`${process.env.REACT_APP_SCAN}tx/${item.transaction_hash}`)}
                                >
                                    <RiShareBoxFill size={20} />
                                </span>
                            </Box>
                        </OfferHistoryContentBox>
                    </OfferHistoryContainerBox>
                </OfferHistoryContainerCard>
            )}
        </>
    )
}

OfferHistory.defaultProps = {
    content: history,
}

OfferHistory.propTypes = {
    content: PropTypes.array,
}


export default OfferHistory

