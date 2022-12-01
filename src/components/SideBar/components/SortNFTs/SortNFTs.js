import React, { useState } from 'react'
import Box from  '@mui/material/Box';
import Checkbox from  '@mui/material/Checkbox';
import Collapse from  '@mui/material/Collapse';
import Input from  '@mui/material/Input';
import AddIcon from '@mui/icons-material/Add';
import ButtonStyled from 'components/ButtonStyled'
import { useTranslation } from 'react-i18next';
import { useHistory,useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import ListAutoComplete from 'components/ListAutoComplete';
import RemoveIcon from '@mui/icons-material/Remove';

const styleBox = {
    gap:'1rem',
    marginBottom:'0.5rem',
    border: '1px solid #e0e0e0',
    borderRadius:'8px',
    boxSizing:'border-box',
    cursor:'pointer',
    padding:'0px 1rem',
    '&:hover':{
        border: '1px solid #000',
    }
 }

 const SortNFTs = ({urlNFT,listNFT,changeFilter,setNewContent,setSliceNFT,requestIsLoad,countNfts,pageNftRef}) => {
    const { t } = useTranslation("translate");
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const slug = query.get('SLUG')
    const key_name = query.get('key_name')
    const key_val = query.get('key_val')
    const viewAll = query.get('view_all')
    const history = useHistory();
    let limit = listNFT;
    const [range, setRange] = useState(true)
    const [aviable, setAviable] = useState(false)
    const [type, setType] = useState(false)
    const [currency, setCurrency] = useState(false)
    const [isImage, setIsImage] =  useState(query.get('key_name') == "ONLY_IMAGE" ?true:false)
    const [isVideo, setIsVideo] = useState(query.get('key_name') == "ONLY_VIDEO" ?true:false)
    const [isMp3, setIsMp3] = useState(query.get('key_name') == "ONLY_MP3" ?true:false)
    const [isPdf, setIsPdf] = useState(query.get('key_name') == "ONLY_PDF" ?true:false)
    const [allTypes, setAllTypes] = useState(query.get('key_name') == "SEARCH" ?true:false)
    const [isAuction, setIsAuction] = useState(query.get('key_name') == "LIVE_AUCTION" ?true:false)
    const [isBuyNow, setIsBuyNow] = useState(query.get('key_name') == "BUY_NOW" ?true:false)
    const [rangeBottom,setRangeBottom] = useState(query.getAll("key_name").length > 0 &&  query.getAll("key_val").length > 0 && query.getAll("key_name")[0] == "PRICE_RANGE_BOTTOM" ? query.getAll("key_val")[0]:0)
    const [rangeTop,setRangeTop] =  useState(query.getAll("key_name").length > 0 &&  query.getAll("key_val").length > 0 && query.getAll("key_name")[1] == "PRICE_RANGE_TOP" ? query.getAll("key_val")[1]:0)
    const [isAvax, setIsAvax] = useState(false)
    const [isWavax, setIsWavax] = useState(false)
    const [isUsdc, setIsUsdc] = useState(false)
    const [isWeth, setIsWeth] = useState(false)
    const [isUsdt, setIsUsdt] = useState(false)
    const [categories, setCategories] = useState(false)
    const [tempRangeBottom, setTempRangeBottom] = useState(0)
    const [tempRangeTop, setTempRangeTop] = useState(0)

    React.useEffect(() => {
        if(slug != null || key_name == null && key_val == null && viewAll == null){
            countNfts.current = listNFT;
            pageNftRef.current = 0;
            setSliceNFT(10)
            setNewContent([])
            setRangeBottom(0)
            setRangeTop(0)
            setIsImage(false)
            setIsVideo(false)
            setAllTypes(false)
            setIsMp3(false)
            setIsPdf(false)
            setIsAuction(false)
            setIsBuyNow(false)
            if(slug != null && slug != ''){
                urlNFT(`${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=${limit}&page=0&order=created&key_name=SLUG&key_val=${slug}`)
            }
        }
       
    },[slug,key_name,key_val,viewAll])

    React.useEffect(() => {
        setIsImage (query.get('key_name') == "ONLY_IMAGE" ?true:false)
        setIsVideo(query.get('key_name') == "ONLY_VIDEO" ?true:false)
        setIsMp3(query.get('key_name') == "ONLY_MP3" ?true:false)
        setIsPdf(query.get('key_name') == "ONLY_PDF" ?true:false)
        setAllTypes(query.get('key_name') == "SEARCH" ?true:false)
        setIsAuction(query.get('key_name') == "LIVE_AUCTION" ?true:false)
        setIsBuyNow(query.get('key_name') == "BUY_NOW" ?true:false)
        setTempRangeBottom(query.getAll("key_name").length > 0 &&  query.getAll("key_val").length > 0 && query.getAll("key_name")[0] == "PRICE_RANGE_BOTTOM" ? query.getAll("key_val")[0]:0)
        setTempRangeTop(query.getAll("key_name").length > 0 &&  query.getAll("key_val").length > 0 && query.getAll("key_name")[1] == "PRICE_RANGE_TOP" ? query.getAll("key_val")[1]:0)
    },[query])

    const removeFilter = () =>{
        countNfts.current = listNFT;
        pageNftRef.current = 0;
        setSliceNFT(10)
        setNewContent([])
        resetFilter("type");
        history.push('/explore')
        urlNFT(`${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=${limit}&page=0&order=created&key_name=SEARCH&key_val=news`)
    }

    const resetFilter = (filter) =>{
        if(filter == "availability"){
            setRangeBottom(0)
            setRangeTop(0)
            setIsImage(false)
            setIsVideo(false)
            setAllTypes(false)
            setIsMp3(false)
            setIsPdf(false)
            return ;
        }

        if(filter === "priceRange"){
            setIsImage(false)
            setIsVideo(false)
            setAllTypes(false)
            setIsMp3(false)
            setIsPdf(false)
            setIsAuction(false)
            setIsBuyNow(false)
            return;
        }

        if(filter === "type"){
            setRangeBottom(0)
            setRangeTop(0)
            setIsAuction(false)
            setIsBuyNow(false)
        }
    }

    const handleClickType= (check,value) => {
        countNfts.current = listNFT;
        pageNftRef.current = 0;
        setSliceNFT(10)
        setNewContent([])
        resetFilter("type");
        if(value == 'ONLY_VIDEO'){
            changeFilter.current = true;
            setIsImage(false)
            setIsVideo(check)
            setAllTypes(false)
            setIsMp3(false)
            setIsPdf(false)
        }
        if(value == 'ONLY_IMAGE'){
            changeFilter.current = true;
            setIsImage(check)
            setIsVideo(false)
            setAllTypes(false)
            setIsMp3(false)
            setIsPdf(false)
        }
        if(value == 'ONLY_PDF'){
            changeFilter.current = true;
            setIsPdf(check)
            setIsImage(false)
            setIsVideo(false)
            setAllTypes(false)
            setIsMp3(false)
        }
        if(value == 'ONLY_MP3'){
            changeFilter.current = true;
            setIsMp3(check)
            setIsImage(false)
            setIsVideo(false)
            setAllTypes(false)
            setIsPdf(false)
        }
        if(value == 'SEARCH'){
            changeFilter.current = true;
            setIsImage(false)
            setIsVideo(false)
            setIsMp3(false)
            setIsPdf(false)
            setAllTypes(check)
            if(check){
                history.push(`/explore?limit=${limit}&page=0&order=created&key_name=SEARCH&key_val=news`)
                urlNFT(`${process.env.REACT_APP_URL_API}/nft?limit=${limit}&page=0&order=created&key_name=SEARCH&key_val=news&domain=${process.env.REACT_APP_DOMAIN}`)
                return;
            }else{
                removeFilter()
                return;
            }
        }

        if(check){
            history.push(`/explore?limit=${limit}&page=0&order=created&key_name=${value}&key_val=1`)
            urlNFT(`${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=${limit}&page=0&order=created&key_name=${value}&key_val=1`)
        }else{
            removeFilter()
        }
    }

    const handleClickStatus= (check,value) => {
        countNfts.current = listNFT;
        pageNftRef.current = 0;
        setSliceNFT(10)
        setNewContent([])
        resetFilter("availability");
        if(value == 'BUY_NOW'){
            changeFilter.current = true;
            setIsAuction(false)
            setIsBuyNow(check)
        }
        if(value == 'LIVE_AUCTION'){
            changeFilter.current = true;
            setIsAuction(check)
            setIsBuyNow(false)
        }
        if(check){
            history.push(`/explore?limit=${limit}&page=0&order=created&key_name=${value}&key_val=1`)
            urlNFT(`${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=${limit}&page=0&order=created&key_name=${value}&key_val=1`)
        }else{
            removeFilter()
        }
    }

    const handleClickCurrency= (value) => {
        countNfts.current = listNFT;
        pageNftRef.current = 0;
        setSliceNFT(10)
        setNewContent([])
        resetFilter("currency");
        if(value == 'AVALANCHE'){
            changeFilter.current = true;
            setIsAvax(true)
            setIsUsdc(false)
            setIsWavax(false)
            setIsWeth(false)
            setIsUsdt(false)
        }
        if(value == 'USDC'){
            changeFilter.current = true;
            setIsAvax(false)
            setIsUsdc(true)
            setIsWavax(false)
            setIsWeth(false)
            setIsUsdt(false)
        }
        if(value == 'WAVAX'){
            changeFilter.current = true;
            setIsAvax(false)
            setIsUsdc(false)
            setIsWavax(true)
            setIsWeth(false)
            setIsUsdt(false)
        }
        if(value == 'USDT'){
            changeFilter.current = true;
            setIsUsdt(true)
            setIsAvax(false)
            setIsUsdc(false)
            setIsWavax(false)
            setIsWeth(false)
        }
        if(value == 'WETH'){
            changeFilter.current = true;
            setIsWeth(true)
            setIsAvax(false)
            setIsUsdc(false)
            setIsWavax(false)
            setIsUsdt(false)
        }
        history.push(`/explore?limit=${limit}&page=0&order=created&key_name=${value}&key_val=1`)
        urlNFT(`${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=${limit}&page=0&order=created&key_name=${value}&key_val=1`)
    }
    
    const handleChangeCategories = (value) => {
        countNfts.current = listNFT;
        pageNftRef.current = 0;
        changeFilter.current = true;
        history.push(`/explore?limit=${limit}&page=0&order=created&key_name=CATEGORY&key_val=${value}`)
        urlNFT(`${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=${limit}&page=0&order=created&key_name=CATEGORY&key_val=${value}`)
    }

    const handleClickSetPriceRange = () => {
        if(tempRangeBottom != rangeBottom || tempRangeTop != rangeTop){
            countNfts.current = listNFT;
            pageNftRef.current = 0;
            setSliceNFT(10)
            setNewContent([])
            resetFilter("priceRange");
            changeFilter.current = true;
            history.push(`/explore?limit=${limit}&page=0&order=created&key_name=PRICE_RANGE_BOTTOM&key_val=${rangeBottom}&key_name=PRICE_RANGE_TOP&key_val=${rangeTop}`)
            urlNFT(`${process.env.REACT_APP_URL_API}/nft?limit=${limit}&page=0&order=created&key_name=PRICE_RANGE_BOTTOM&key_val=${rangeBottom}&key_name=PRICE_RANGE_TOP&key_val=${rangeTop}&domain=${process.env.REACT_APP_DOMAIN}`)
        }
    }

    const handleChangeRangeBottom = (e) =>{
        const {value} = e.target;
        if(Number(value) < 0){
            setRangeBottom('')
        }else{
            setRangeBottom(e.target.value)
        }       
    }

    const handleChangeRangeTop = (e) =>{
        const {value} = e.target;
        if(Number(value) < 0){
            setRangeTop('')
        }else{
            setRangeTop(value)
        }  
    }


    return (
        <Box 
            sx={{
                position:'sticky',
                width:{xs:'100%',sm:'320px'},
                top: 0,
                p:'0px 5px',
                '@media screen and (max-width: 768px)':{
                    position:'block',
                    width:'100%'
                }
            }}
        >
            <Box
               component='article'
               display='flex'
               flexDirection='column'
               sx={{
                   borderBottom:'1px solid #e0e0e0',
               }}   
            >
                <Box
                    component='article'
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'  
                >
                   <h1 style={{ fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>{t("sidebar_component.price_range")}</h1>
                   <span onClick={()=>setRange(!range)}>{!range ? <AddIcon sx={{cursor:'pointer'}} /> : <RemoveIcon  sx={{cursor:'pointer'}}/>}</span>
                </Box>

                <Collapse in={range} timeout="auto" unmountOnExit>
                    <Box display='flex' justifyContent='space-between' sx={{gap:'40px', marginBottom:'25px'}}>
                        <Input 
                            type='number' 
                            placeholder='0.00' 
                            disableUnderline
                           // value={filters && filters.length > 1 && filters[1].priceRange && filters[1].priceRange.min.keyValue && filters[1].priceRange.min.keyValue >= 0 ? filters[1].priceRange.min.keyValue : '' }
                            name="rangeMin"
                            disabled={requestIsLoad}
                            value = {rangeBottom}
                            onChange={(e)=>{handleChangeRangeBottom(e)}}
                            sx={{
                                border: '1px solid #e0e0e0',
                                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                            }}
                        />
                        <Input 
                            type='number' 
                            placeholder='0.00' 
                            //value={filters && filters.length > 1 && filters[1].priceRange && filters[1].priceRange.max.keyValue && filters[1].priceRange.max.keyValue >= 0 ? filters[1].priceRange.max.keyValue : '' }
                            disableUnderline
                            name="rangeMax"
                            disabled={requestIsLoad}
                            value = {rangeTop}
                            onChange={(e)=>{handleChangeRangeTop(e)}}
                            sx={{
                                border: '1px solid #e0e0e0',
                                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                            }}
                        />
                    </Box>
                    <Box
                        sx={{marginBottom:'15px'}}
                    >
                        <ButtonStyled
                            type='submit'
                            onClick={()=>handleClickSetPriceRange()}
                            isDisabled={Number(rangeBottom) <= 0 || rangeBottom == '' || Number(rangeTop) <= 0 && rangeTop == ''|| requestIsLoad}
                            text={t('sidebar_component.set_price')}
                            width='90%'
                        />
                    </Box>
                </Collapse>
            </Box>
            <Box
                component='article'
                display='flex'
                flexDirection='column'
                sx={{
                    borderBottom:'1px solid #e0e0e0',
                }}   
            >
                <Box
                    component='article'
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'  
                >
                    <h1 style={{ fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>{t("sidebar_component.availability")}</h1>
                    <span onClick={()=>setAviable(!aviable)}>{!aviable ? <AddIcon sx={{cursor:'pointer'}} /> : <RemoveIcon  sx={{cursor:'pointer'}}/>}</span>
                </Box>
                <Collapse in={aviable} timeout="auto" unmountOnExit>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                        style={{
                            backgroundColor: requestIsLoad ? '#E0E0E0':'transparent'
                        }}
                        onClick={()=>!requestIsLoad && handleClickStatus(!isBuyNow,'BUY_NOW')}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                                <Checkbox 
                                    disabled={requestIsLoad}
                                    checked={isBuyNow}
                                    sx={{
                                        '&.Mui-checked':{
                                            color:'#1B2635'
                                        }
                                    }}
                                />
                                <h1 style={{ fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>{t("sidebar_component.buy_now")}</h1>
                        </Box>
                    </Box>
                    
                    <Box
                        display='none'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                        style={{
                            backgroundColor: requestIsLoad ? '#E0E0E0':'transparent'
                        }}
                        onClick={()=>!requestIsLoad && handleClickStatus(!isAuction,'LIVE_AUCTION')}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem'
                            }}>
                                <Checkbox 
                                    disabled={requestIsLoad}
                                    checked={isAuction}
                                    sx={{
                                        '&.Mui-checked':{
                                            color:'#1B2635'
                                        }
                                    }}
                                />
                            <h1 style={{ fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>{t("sidebar_component.live_auction")}</h1>
                        </Box>
                    </Box>
                </Collapse>
            </Box>
            
            <Box
                component='article'
                display='none'
                flexDirection='column'
                sx={{
                    borderBottom:'1px solid #e0e0e0',
                }}   
            >
                <Box
                    component='article'
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'  
                >
                    <h1 style={{ fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>{t("sidebar_component.type")}</h1>
                    <span onClick={()=>setType(!type)}>{!type ? <AddIcon sx={{cursor:'pointer'}} /> : <RemoveIcon  sx={{cursor:'pointer'}}/>}</span>
                </Box>
                <Collapse in={type} timeout="auto" unmountOnExit>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                        style={{
                            backgroundColor: requestIsLoad ? '#E0E0E0':'transparent'
                        }}
                        onClick={()=>{ !requestIsLoad && handleClickType(!isImage,'ONLY_IMAGE')}}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                disabled={requestIsLoad}
                                checked={isImage}
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#1B2635'
                                    }
                                }}
                            />
                            <h1 style={{ fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>{t("sidebar_component.image")}</h1>
                        </Box>
{/*                         <Box>
                            156,563
                        </Box> */}
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                        style={{
                            backgroundColor: requestIsLoad ? '#E0E0E0':'transparent'
                        }}
                        onClick={()=>{ !requestIsLoad && handleClickType(!isVideo,'ONLY_VIDEO')}}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                disabled={requestIsLoad}
                                checked={isVideo}
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#1B2635'
                                    }
                                }}
                            />
                            <h1 style={{ fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>{t("sidebar_component.video")}</h1>
                        </Box>
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                        style={{
                            backgroundColor: requestIsLoad ? '#E0E0E0':'transparent'
                        }}
                        onClick={()=>{ !requestIsLoad && handleClickType(!isPdf,'ONLY_PDF')}}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                disabled={requestIsLoad}
                                checked={isPdf}
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#1B2635'
                                    }
                                }}
                            />
                            <h1 style={{ fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>PDF</h1>
                        </Box>
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                        style={{
                            backgroundColor: requestIsLoad ? '#E0E0E0':'transparent'
                        }}
                        onClick={()=>{ !requestIsLoad && handleClickType(!isMp3,'ONLY_MP3')}}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                disabled={requestIsLoad}
                                checked={isMp3}
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#1B2635'
                                    }
                                }}
                            />
                            <h1 style={{ fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>MP3</h1>
                        </Box>
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                        style={{
                            backgroundColor: requestIsLoad ? '#E0E0E0':'transparent'
                        }}
                        onClick={()=>{ !requestIsLoad && handleClickType(!allTypes,'SEARCH')}}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                disabled={requestIsLoad}
                                checked={allTypes}
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#1B2635'
                                    }
                                }}
                            />
                            <h1 style={{ fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>{t("sidebar_component.all")}</h1>
                        </Box>
                    </Box>
                </Collapse>
            </Box>

            <Box
                component='article'
                display='none'
                flexDirection='column'
                sx={{
                    borderBottom:'1px solid #e0e0e0',
                }}   
            >
                <Box
                    component='article'
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'  
                >
                    <h1 style={{ fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>{t("sidebar_component.currency")}</h1>
                    <span onClick={()=>setCurrency(!currency)}>{!currency ? <AddIcon sx={{cursor:'pointer'}} /> : <RemoveIcon  sx={{cursor:'pointer'}}/>}</span>
                </Box>
                <Collapse in={currency} timeout="auto" unmountOnExit>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                        onClick={()=>{ handleClickCurrency('AVALANCHE')}}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                onChange={()=>{ handleClickCurrency('AVALANCHE')}}
                                checked={isAvax}
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#1B2635'
                                    }
                                }}
                            />
                            <h1 style={{ fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>AVAX</h1>
                        </Box>
                    </Box>
                    <Box
                        display='none'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                        onClick={()=>{ handleClickCurrency('USDC')}}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                onChange={()=>{ handleClickCurrency('USDC')}}
                                checked={isUsdc}
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#1B2635'
                                    }
                                }}
                            />
                            <h1 style={{ fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>USDC</h1>
                        </Box>
                    </Box>
                    <Box
                        display='none'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                        onClick={()=>{ handleClickCurrency('USDT')}}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                onChange={()=>{ handleClickCurrency('USDT')}}
                                checked={isUsdt}
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#1B2635'
                                    }
                                }}
                            />
                            <h1 style={{ fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>USDT</h1>
                        </Box>
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                        onClick={()=>{ handleClickCurrency('WAVAX')}}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                onChange={()=>{ handleClickCurrency('WAVAX')}}
                                checked={isWavax}
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#1B2635'
                                    }
                                }}
                            />
                            <h1 style={{ fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>WAVAX</h1>
                        </Box>
                    </Box>
                    <Box
                        display='none'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                        onClick={()=>{ handleClickCurrency('WETH')}}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                onChange={()=>{ handleClickCurrency('WETH')}}
                                checked={isWeth}
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#1B2635'
                                    }
                                }}
                            />
                            <h1 style={{ fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>WETH</h1>
                        </Box>
                    </Box>
                </Collapse>
            </Box>

            <Box
                component='article'
                display='none'
                flexDirection='column'
                sx={{
                    borderBottom:'1px solid #e0e0e0',
                }}   
            >
                <Box
                    component='article'
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'  
                >
                    <h1 style={{ fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>Categories</h1>
                    <span onClick={()=>setCategories(!categories)}>{!categories ? <AddIcon sx={{cursor:'pointer'}} /> : <RemoveIcon  sx={{cursor:'pointer'}}/>}</span>
                </Box>
                <Collapse in={categories} timeout="auto" unmountOnExit>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={{
                            gap:'1rem',
                            marginBottom:'0.5rem',
                            borderRadius:'8px',
                            boxSizing:'border-box',
                            cursor:'pointer',
                            padding:'0px 1rem'
                        }}
                        width='100%'
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                                width:'100%',
                            }}>
                            <ListAutoComplete width={"100%"} onFunction={handleChangeCategories} />
                        </Box>
                    </Box>

                </Collapse>
            </Box>
        </Box>
    )
}
SortNFTs.defaultProps = {
    urlNFT: ()=>{},
    listNFT:10,
    changeFilter:{},
    setNewContent: ()=>{},
    setSliceNFT: ()=>{},
    requestIsLoad:false,
    countNfts:{current:100},
    pageNftRef:{current:0}
}

SortNFTs.propTypes = {
    urlNFT: PropTypes.func,
    listNFT: PropTypes.number,
    changeFilter: PropTypes.object,
    setNewContent : PropTypes.func,
    setSliceNFT: PropTypes.func,
    requestIsLoad: PropTypes.bool,
    countNfts : PropTypes.object,
    pageNftRef: PropTypes.object
}
export default SortNFTs
