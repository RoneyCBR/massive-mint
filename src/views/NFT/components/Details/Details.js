import React from 'react';
import { Box, CardMedia } from '@mui/material';
import {BiCube} from 'react-icons/bi';
import {BsEye} from 'react-icons/bs';
import {useTranslation} from 'react-i18next'
import LogoETH from 'assets/logos/eth.png';
import { detailsStyles, detailsStyles2 } from './styled';
import PropTypes from 'prop-types';

const Details = ({content}) => {
    const { t } = useTranslation("translate");
    const handleClickSocialMedia = (link) =>{
        window.open(link, '_blank');
    }
    return (
        <>
            <Box
                onClick={()=>handleClickSocialMedia(`${process.env.REACT_APP_SCAN}address/${content.project_key}`)}
                display='flex'
                alignItems='center'
                sx={detailsStyles}
            >
                <CardMedia
                    component='img'
                    src={LogoETH}
                    alt='scan'
                    sx={detailsStyles2}
                />
                <span>{t('nft_details.etherscan')}</span>
            </Box>
            <Box
                onClick={()=>handleClickSocialMedia(content.metadata.metadata_url)}
                display='flex'
                alignItems='center'
                sx={detailsStyles}
            >
                <BiCube size={26} style={{color:'#fff'}} />
                <span>{t('nft_details.metadata')}</span>
            </Box>
            <Box
                onClick={()=>handleClickSocialMedia(content.metadata.image_url)}
                display='flex'
                alignItems='center'
                sx={detailsStyles}
            >
                <BsEye size={26} style={{color:'#fff'}}  />
                <span>{t('nft_details.ipfs')}</span>
            </Box>
        </>
    )
}

Details.propTypes = {
    content: PropTypes.object,
}

export default Details