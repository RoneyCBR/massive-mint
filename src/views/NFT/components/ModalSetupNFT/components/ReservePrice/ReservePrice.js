import React from 'react'
import { Box, CardMedia, Checkbox } from '@mui/material';
import styled from '@emotion/styled'
import NumberInput from 'components/Form/NumberInput'
import avalancheIcon from 'assets/logos/avalanche_logo.svg'
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types'

const OfferBox = styled(Box)`
    border: 1px solid #E5E5E5;
    //border-top: ${props => props.bt ? '4px solid #dedede' : '4px solid #000'}
    //border-top: 4px solid #000;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 10px;
    text-align: center;
    height: 320px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    box-size: border-box;
    padding: 15px;
    ${props => props.styles}
`

const ReservePrice = ({
        handleChangeCheckBox, 
        isTopOffer, 
        isInitialTopOffer, 
        initSign, 
        nStep,
        setIsInitialTopOffer
    }) => {
    const {t} = useTranslation("translate")
    return (
        <Box
            sx={{
                display: 'none',
                width: '50%',
                '@media screen and (max-width:750px)':{
                    width:'90%',
                }
            }}
        >
            <OfferBox
                sx={{
                    //filter: !isTopOffer ? 'grayscale(25%)' : 'none',
                    backgroundColor: isTopOffer ? '#fff' : '#dedede',
                    borderTop: !isTopOffer ? '4px solid #dedede !important' : '4px solid #000 !important',
                    '@media screen and (max-width:750px)':{
                        display: isTopOffer ?  'block':'none'
                    }
                    
                }}
            >
                <Box
                    sx={{
                        backgroundColor: isTopOffer ? '#fff' : '#dedede',
                    }}
                >
                    <h3>{t("setup_modal.reserve_price")}</h3>
                </Box>
                <Box
                    display='flex'
                    sx={{
                        marginTop:'5px',
                        padding:'10px 0px',
                    }}
                >
                    <CardMedia
                        component="img"
                        src={avalancheIcon}
                        alt="Polygon"
                        sx={{
                            width:'40px',
                            height:'40px',
                            marginRight:'5px',
                        }}
                    />
                    <NumberInput 
                        disableUnderline
                        value={isInitialTopOffer}
                        setValue={setIsInitialTopOffer}
                        name={"baseOffer"}
                        placeholder=""
                        isTopOffer={isTopOffer}
                        initSign={initSign}
                        nStep={nStep}
                    />
                </Box>
                <p>{t("setup_modal.reserve_price_legend")}</p>
            </OfferBox>
            <Box
                sx={{
                    marginTop:'10px',
                    '@media screen and (max-width:600px)':{
                        marginBottom:'15px',
                    }
                }}
            >
                <Checkbox 
                    type='checkbox' 
                    disabled={initSign || nStep==2}
                    checked={isTopOffer} 
                    onChange={()=>{handleChangeCheckBox()}}
                    value={isTopOffer}
                />
                <span>{t("setup_modal.reserve_price_legend_2")}</span>
            </Box>
        </Box>
    )
}

ReservePrice.propTypes = {
    handleChangeCheckBox: PropTypes.func.isRequired,
    isTopOffer: PropTypes.bool.isRequired,
    isInitialTopOffer: PropTypes.number.isRequired,
    initSign: PropTypes.bool.isRequired,
    nStep: PropTypes.number,
    setIsInitialTopOffer: PropTypes.func.isRequired,
}

export default ReservePrice