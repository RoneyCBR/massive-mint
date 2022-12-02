import React from 'react';
import { Box } from '@mui/material';
import { IoMdClose } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const WhiteListFormFrame = ({ close, collection ,activeNFTPay}) => {
    console.log(collection);
    const { t } = useTranslation("translate");
    console.log(t, close)
    return (
        <Box
            display="flex"
            justifyContent="center"
            sx={{
                minHeight: '100vh',
                background: {xs: '#fff', sm: '#fff', md: 'none', lg: 'none', xl: 'none'},
                alignItems: {xs: 'flex-start', sm: 'flex-start', md: 'center', lg: 'center', xl: 'center'}
            }}
        >
            <Box sx={{ background: '#fff', width: 500 }}>
                <Box sx={{display:'flex', justifyContent:'flex-end', padding:'10px'}}>
                    <IoMdClose onClick={close} size={40} style={{cursor:'pointer'}} />
                </Box>
                <Box sx={{textAlign:'center', fontSize:{xs:'18px', sm:'18px', md:'25px', lg:'30px', xl:'40px'}}}>
                    <Box component="h3">
                        {t("collection_buy_view.nft_pay")}
                    </Box>
                    <iframe height="550" style={{border:'none'}} src={activeNFTPay.urlPayments}></iframe>
                </Box>
            </Box>
        </Box>
    )
}

WhiteListFormFrame.propTypes = {
    close: PropTypes.func,
    collection: PropTypes.object,
    activeNFTPay: PropTypes.object
}

export default WhiteListFormFrame;
