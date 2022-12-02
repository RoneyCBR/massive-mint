import React from 'react';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import ButtonStyled from 'components/ButtonStyled';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import PropTypes from 'prop-types';

const TextField = styled('select')`
    width:100%;
    border-radius:8px;
    border:1px solid #E5E5E5;
    background:'transparent';
    color:'#fff';
    padding:10px;
    font-size:16px;
    font-weight:bold;
`;


const PriceRange = ({
    loadingNFTs,
    typeFilter,
    setTypeFilter,
    cleanAllFilter
    }) => {
    const { t } = useTranslation("translate");
    const [showPriceRange, setShowPriceRange] = React.useState(false);
    const [rangeBottom,setRangeBottom] = React.useState(0)
    const [rangeTop,setRangeTop] = React.useState(0)

    const handleClickSetPriceRange = () =>{
        if(rangeBottom != '' && rangeTop != ''){
            setTypeFilter({...typeFilter,
                priceRange:`&key_name=PRICE_RANGE_BOTTOM&key_val=${rangeBottom}&key_name=PRICE_RANGE_TOP&key_val=${rangeTop}`,
                slug:'',
                author:'',
                type:'',
                available:''
            });
        }else{
            setTypeFilter({...typeFilter,slug:'',priceRange:'',author:'',type:'',available:''});
        }
    }

    const handleChangeRangeBottomAndTop = (e) =>{
        const {value,name} = e.target;
        if(Number(value) < 0){
            name == 'rangeMin' ? setRangeBottom(''): setRangeTop('')
        }else{
            name == 'rangeMin' ? setRangeBottom(Number(value)): setRangeTop(Number(value))
        }  
    }

    React.useEffect(()=>{
        if(cleanAllFilter){
            setRangeBottom(0)
            setRangeTop(0)
        }
    },[cleanAllFilter]);

    return (
        <Box
            component='article'
            display='flex'
            flexDirection='column'
            sx={{ borderBottom:'1px solid #e0e0e0' }}
        >
            <Box
                component='article'
                display='flex'
                justifyContent='space-between'
                alignItems='center' 
                sx={{color:'#fff'}} 
            >
                <h1>{t("sidebar_component.price_range")}</h1>
                <span onClick={()=>setShowPriceRange(!showPriceRange)}>
                    {!showPriceRange && <AddIcon sx={{cursor:'pointer'}} />}
                    {showPriceRange && <HorizontalRuleIcon sx={{cursor:'pointer'}} />}
                </span>
            </Box>
            <Collapse in={showPriceRange} timeout="auto" unmountOnExit>
            <Box display='flex' justifyContent='flex-start' sx={{width:'95%',margin:'0 auto',gap:'10px', marginBottom:'25px',color:'#fff'}}>
                <Box
                    sx={{width:'32%',"& > select":{background:'transparent',color:'#fff'}}}
                >
                     <TextField 
                        id='currency'
                        name='currency'
                        as='select'
                    >
                        <option style={{background:'transparent'}} value='ETH'>ETH</option>
                    </TextField> 
                </Box>
                <Input 
                    type='number' 
                    placeholder='0.00' 
                    disableUnderline
                    disabled={loadingNFTs}
                    name="rangeMin"
                    value={rangeBottom}
                    onChange={(e)=>handleChangeRangeBottomAndTop(e)}
                    sx={{
                        width:'29%',
                        border: '1px solid #e0e0e0',
                        color:'#fff'
                    }}
                />
                <Box
                    sx={{
                        display:'flex',
                        alignItems: 'center',
                        fontWeight:'bold',
                        fontSize:'20px'
                    }}
                >
                    {t('sidebar_component.to')}
                </Box>
                <Input 
                    type='number' 
                    placeholder='0.00' 
                    disableUnderline
                    disabled={loadingNFTs}
                    name="rangeMax"
                    value={rangeTop}
                    onChange={(e)=>handleChangeRangeBottomAndTop(e)}
                    sx={{
                        width:'29%',
                        border: '1px solid #e0e0e0',
                        color:'#fff'
                    }}
                />
            </Box>
            <Box
                sx={{width:'95%',margin:'0 auto',marginBottom:'15px'}}
            >
                <ButtonStyled
                    type='submit'
                    onClick={()=>handleClickSetPriceRange()}
                    isDisabled={Number(rangeBottom) <= 0 || rangeBottom == '' || Number(rangeTop) <= 0 && rangeTop == ''|| loadingNFTs}
                    text={t('sidebar_component.set_price')}
                    width='95%'
                />
            </Box>
            </Collapse>
        </Box>
    );
};

PriceRange.defaultProps = {
    loadingNFTs: false,
    typeFilter: {},
    setTypeFilter: ()=>{},
    cleanAllFilter:false
};

PriceRange.propTypes = {
    loadingNFTs: PropTypes.bool,
    typeFilter: PropTypes.object,
    setTypeFilter: PropTypes.func,
    cleanAllFilter: PropTypes.bool
};

export default PriceRange;