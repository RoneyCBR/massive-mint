import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import PropTypes from 'prop-types';

const styleBox = {
    gap:'1rem',
    marginBottom:'0.5rem',
    border: '1px solid #fff',
    borderRadius:'8px',
    boxSizing:'border-box',
    cursor:'pointer',
    padding:'0px 1rem',
    '&:hover':{
        border: '1px solid #43B02A',
    }
}

const Available = ({
    loadingNFTs,
    typeFilter,
    setTypeFilter,
    cleanAllFilter
    }) => {

    const { t } = useTranslation("translate");
    const availableType = [
        {
            id : 0,
            name : t('sidebar_component.all'),
            value: "all",
            check: false
        },
        {
            id : 1,
            name: t('sidebar_component.filter_buy_now'),
            value : "buy_now",
            check: false
        },
        {
            id : 2,
            name: t('sidebar_component.filter_auction'),
            value : "live_auction",
            check: false
        }
    ]
    const [showAuthor, setShowAuthor] = useState(false);
    const [arrayAvailable, setArrayAvailable] = useState(availableType);

    const handleCheckAuthor = (id) => {
        setArrayAvailable(arrayAvailable.map((available, index)=>{
            if(index == id) {
                if(available && available.check){
                    setTypeFilter({...typeFilter,available:'',slug:'',priceRange:''}); 
                }else{
                    if(!String(available.name).toUpperCase().includes("ALL")){
                        setTypeFilter({...typeFilter,available:`&key_name=${available.value}&key_val=1`,slug:'',priceRange:''}); 
                    }else{
                        setTypeFilter({...typeFilter,available:'',slug:'',priceRange:''}); 
                    }
                }
                return {...available, check:!available.check}
            }else {
                return {...available, check: false}
            }
        }));
    };

    React.useEffect(()=>{
        if(cleanAllFilter){
            setArrayAvailable(arrayAvailable.map((available)=>{
                return {...available, check: false}
            }));
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
                <h1>{t("sidebar_component.filter_available")}</h1>
                <span onClick={()=>setShowAuthor(!showAuthor)}>
                    {!showAuthor && <AddIcon sx={{cursor:'pointer'}} />}
                    {showAuthor && <HorizontalRuleIcon sx={{cursor:'pointer'}} />}
                </span>
            </Box>
            <Collapse in={showAuthor} timeout="auto" unmountOnExit>
                {arrayAvailable.map((author, index)=>(
                    <Box
                        key={index}
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        onClick={()=> !loadingNFTs && handleCheckAuthor(index)}
                        sx={styleBox}
                        style={{
                            backgroundColor:loadingNFTs?'#d2d2d2':'transparent'
                        }}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{ gap:'0.5rem',color:'#fff'}}
                        >
                            <Checkbox
                                checked={author.check}
                                sx={{
                                    color:'#43B02A',
                                    '&.Mui-checked':{
                                        color:'#43B02A'
                                    }
                                }}
                            />
                            <h1>{author.name}</h1>
                        </Box>
                    </Box>
                ))}
            </Collapse>
        </Box>
    );
};

Available.defaultProps = {
    loadingNFTs: false,
    typeFilter: {},
    setTypeFilter: ()=>{},
    cleanAllFilter:false
}

Available.propTypes = {
    loadingNFTs: PropTypes.bool,
    typeFilter: PropTypes.object,
    setTypeFilter: PropTypes.func,
    cleanAllFilter: PropTypes.bool
};

export default Available;