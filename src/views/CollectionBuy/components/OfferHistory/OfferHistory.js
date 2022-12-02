import React from 'react'
import { Avatar, Box, Card, CardMedia, Container, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import avalancheIcon from 'assets/logos/avalanche_logo.svg'
import { RiShareBoxFill } from 'react-icons/ri';
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next';

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
                <Box
                    sx={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center',minHeight: '200px'}}
                >
                        <Typography variant='h4' sx={{color:'#4aa521',fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>
                            {t("message_you_dont_have_movements")}
                        </Typography>
                </Box>
            )
        }
    } catch (error) {
        console.log('error',error);
    }
    return (
        <Container maxWidth="xl" sx={{mt:"30px"}}>
        {content.map((item, index)=>
        <Card
            key={index}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                boxSizing: 'border-box',
                padding: '1rem',
                marginBottom: '1rem',
                "@media (max-width: 350px)": {
                    padding: '10px',
                    justifyContent: 'center',
                    gap: '0px',
                }
            }}
        >

            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    boxSizing: 'border-box'
                }}
            >   
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'space-between',
                        boxSizing: 'border-box'
                    }}
                >   
                    <Box sx={{
                        display: 'flex',
                        width: 'auto',
                        height: '100%',
                        alignItems: 'center',
                        margin:'auto 0'
                    }}>
                        <Avatar alt="artcrypted.art"  >
                            <AccountCircleIcon />
                        </Avatar>
                    </Box>

                    <Box
                        sx={{
                            width: '100%',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            "@media (max-width: 650px)": {
                                gridTemplateColumns: '1fr'
                            }
                        }}
                    >

                        <Box
                            sx={{
                                display:'flex',
                                width: '100%',
                                flexDirection: 'column',
                                padding:'8px',
                                boxSizing: 'border-box',
                                position:'relative'
                            }}
                        >
                            <Box>
                                { determinateTypeNameUser(item.type_movement) }  {' ' + determinateIdentifier(item.type_movement)}
                            </Box>
                            <Box
                                sx={{
                                    cursor:'pointer',
                                    fontWeight:600,
                                    fontSize:'16px',
                                    color:'#2d3748',
                                }}
                            >
                                { localStorage.getItem('current_wallet') && item.to.toUpperCase() == localStorage.getItem('current_wallet').toUpperCase()  ?
                                    '@'+t("offers_history.you_text") :'@'+(item.to).substring(0,5)+ '...' +(item.to).substring(38,54)
                                }
                            </Box>
                            <Box
                                sx={{
                                    "@media (max-width: 350px)": {
                                        fontSize: '13px'
                                    }
                                }}
                            >
                                {dataFormated(item.created)}
                            </Box>

                          
                     
                        </Box>
                        
                        <Box
                            sx={{
                                width: '100%'
                            }}
                        >
                            <Box
                                sx={{
                                    display:'flex',
                                    width: '100%',
                                    height: '100%',
                                    justifyContent: 'flex-end',
                                    padding:'0px 8px',
                                    "@media (max-width: 650px)": {
                                        justifyContent: 'flex-start'
                                    }
                                }}
                            >   
                                {item.type_movement != "MINT" &&  item.type_movement != "TRANSFER" && item.type_movement != "AUCTION_SALE_FINISH" &&
                                    <Box
                                        sx={{
                                            display:'flex',
                                            height: '100%',
                                            alignItems: 'center',
                                            gap:'3px'
                                        }}
                                    >
                                        
                                        <CardMedia
                                            component='img' 
                                            src={avalancheIcon} 
                                            sx={{
                                                display:'block',
                                                height:'24px', 
                                                width:'24px',
                                                padding:'1px'
                                            }}
                                        />
                                        {item.amount}
                                        <span>AVAX</span>
                                    </Box>
                                }
                            </Box>
                        </Box>

                    </Box>

                    <Box>
                        <span 
                            style={{cursor:'pointer'}} 
                            onClick={()=>handleClickSnowtrace(`${process.env.REACT_APP_SCAN}tx/${item.transaction_hash}`)}
                        >
                            <RiShareBoxFill size={20} />
                        </span>
                    </Box>

                    

                    

                </Box>
            </Box>

        </Card>)}
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

