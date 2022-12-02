import React from 'react'
import { Box, Divider, Typography } from '@mui/material'
import AuctionCounter from './AuctionCounter';
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types';

const OwnerPrice = ({content}) => {
    const { t } = useTranslation("translate"); 
    return (
        <Box 
            display='flex'
            flexDirection='row'
            sx={{
                marginTop:'2rem',
                color:'#666',
                fontWeight: 600,
                '@media screen and (max-width: 768px)': {
                    flexDirection:'column',
                }
            }}
        >
           {content.on_sale && 
           <>
            <Box>
                {t("home.current_bid")}
                <Typography 
                    variant="overline" 
                    display="block" 
                    gutterBottom 
                    sx={{
                        fontSize:'36px',
                        color:'#000',
                        fontWeight: 600,
                        marginTop: '-20px',
                    }}
                >
                    {content.sale.price} AVAX
                </Typography>
                <Typography 
                    variant="overline" 
                    display="block" 
                    gutterBottom 
                    sx={{
                        display:'none',
                        fontSize:'16px',
                        color:'#666',
                        fontWeight: 600,
                        marginTop: '-30px',
                    }}
                >
                    $2,226.98
                </Typography>
            </Box>
            <Divider
                orientation="vertical"
                flexItem
                sx={{
                    margin: '0px 10px',
                    '@media screen and (max-width: 768px)': {
                        display: 'none',
                    }
                }}
            />
            </>}
            { content.on_auction &&
                <AuctionCounter finishAuction={content.auction.finish_date} />   
            }
        </Box>
    )
}

OwnerPrice.propTypes = {
    content: PropTypes.object,
}

export default OwnerPrice