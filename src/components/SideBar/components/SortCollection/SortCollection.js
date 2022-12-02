import React, { useState } from 'react'
import { Box, Checkbox, Collapse } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

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

 const SortCollection = ({urlProject}) => {
    const { t } = useTranslation("translate");
    const history = useHistory();
    const [type, setType] = useState(false)
    const [currency, setCurrency] = useState(false)
    const [isImage, setIsImage] = useState(false)
    const [isVideo, setIsVideo] = useState(false)
    const [allTypes, setAllTypes] = useState(false)
    const [isAvax, setIsAvax] = useState(false)
    const [isWavax, setIsWavax] = useState(false)
    const [isUsdc, setIsUsdc] = useState(false)

    const handleClickType= (value) => {
        if(value == 'ONLY_VIDEO'){
            setIsImage(false)
            setIsVideo(true)
            setAllTypes(false)
        }
        if(value == 'ONLY_IMAGE'){
            setIsImage(true)
            setIsVideo(false)
            setAllTypes(false)
        }
        if(value == 'SEARCH'){
            setIsImage(false)
            setIsVideo(false)
            setAllTypes(true)
            history.push(`/explore?limit=10&page=0&order=created&key_name=SEARCH&key_val=news`)
            urlProject(`${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=10&page=0&order=created&key_name=SEARCH&key_val=news`)
            return;
        }
        history.push(`/explore?limit=10&order=created&key_name=${value}&key_val=1`)
        urlProject(`${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=10&page=0&order=created&key_name=${value}&key_val=1`)
    }

    const handleClickCurrency= (value) => {
        if(value == 'AVALANCHE'){
            setIsAvax(true)
            setIsUsdc(false)
            setIsWavax(false)
        }
        if(value == 'USDC'){
            setIsAvax(false)
            setIsUsdc(true)
            setIsWavax(false)
        }
        if(value == 'WAVAX'){
            setIsAvax(false)
            setIsUsdc(false)
            setIsWavax(true)
        }
        history.push(`/explore?limit=10&order=created&key_name=${value}&key_val=1`)
        urlProject(`${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=10&page=0&order=created&key_name=${value}&key_val=1`)
    }

    return (
        <Box 
            sx={{
                position:'sticky',
                top: 0,
                '@media screen and (max-width: 768px)':{
                    position:'block',
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
                    <h1>{t("sidebar_component.type")}</h1>
                    <span onClick={()=>setType(!type)}><AddIcon sx={{cursor:'pointer'}} /></span>
                </Box>
                <Collapse in={type} timeout="auto" unmountOnExit>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                onChange={()=>{ handleClickType('ONLY_IMAGE')}}
                                defaultChecked={isImage}
                                checked={isImage}
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#1B2635'
                                    }
                                }}
                            />
                            <h1>{t("sidebar_component.image")}</h1>
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
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                onChange={()=>{ handleClickType('ONLY_VIDEO')}}
                                defaultChecked={isVideo}
                                checked={isVideo}
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#1B2635'
                                    }
                                }}
                            />
                            <h1>{t("sidebar_component.video")}</h1>
                        </Box>
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                onChange={()=>{ handleClickType('SEARCH')}}
                                defaultChecked={false}
                                checked={allTypes}
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#1B2635'
                                    }
                                }}
                            />
                            <h1>All</h1>
                        </Box>
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
                    <h1>Moneda</h1>
                    <span onClick={()=>setCurrency(!currency)}><AddIcon sx={{cursor:'pointer'}} /></span>
                </Box>
                <Collapse in={currency} timeout="auto" unmountOnExit>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                onChange={()=>{ handleClickCurrency('AVALANCHE')}}
                                defaultChecked={false}
                                checked={isAvax}
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#1B2635'
                                    }
                                }}
                            />
                            <h1>ETH</h1>
                        </Box>
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                onChange={()=>{ handleClickCurrency('USDC')}}
                                defaultChecked={false}
                                checked={isUsdc}
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#1B2635'
                                    }
                                }}
                            />
                            <h1>USDC</h1>
                        </Box>
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                onChange={()=>{ handleClickCurrency('WAVAX')}}
                                defaultChecked={false}
                                checked={isWavax}
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#1B2635'
                                    }
                                }}
                            />
                            <h1>ETHC</h1>
                        </Box>
                    </Box>
                </Collapse>
            </Box>
        </Box>
    )
}
SortCollection.defaultProps = {
    urlProject: ()=>{},
}

SortCollection.propTypes = {
    urlProject: PropTypes.func,
}
export default SortCollection
