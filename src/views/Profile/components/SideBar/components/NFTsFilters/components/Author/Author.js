import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import artist from 'utils/artist';
import PropTypes from 'prop-types';

const styleBox = {
    gap:'1rem',
    marginBottom:'0.5rem',
    border: '1px solid #1B2635',
    borderRadius:'8px',
    boxSizing:'border-box',
    cursor:'pointer',
    padding:'0px 1rem',
    '&:hover':{
        border: '1px solid #1B2635',
    }
}

const Author = ({
    loadingNFTs,
    typeFilter,
    setTypeFilter,
    cleanAllFilter
    }) => {

    const { t } = useTranslation("translate");
    const [showAuthor, setShowAuthor] = useState(false);
    const [authors, setAuthors] = useState(artist);

    const handleCheckAuthor = (id) => {
        setAuthors(authors.map((author, index)=>{
            if(index == id) {
                if(author && author.check){
                    setTypeFilter({...typeFilter,author:'',slug:'',priceRange:''});
                }else{
                    if(!String(author.name).toUpperCase().includes("ALL")){
                        setTypeFilter({...typeFilter,author:`&key_name=author&key_val=${author.name}`,slug:'',priceRange:''});
                    }else{
                        setTypeFilter({...typeFilter,author:'',slug:'',priceRange:''});
                    }
                }
                return {...author, check:!author.check}
            }else {
                return {...author, check: false}
            }
        }));
    };

    React.useEffect(()=>{
        if(cleanAllFilter){
            setAuthors(authors.map((author)=>{
                return {...author, check: false}
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
            >
                <h1>{t("sidebar_component.filter_artist")}</h1>
                <span onClick={()=>setShowAuthor(!showAuthor)}>
                    {!showAuthor && <AddIcon sx={{cursor:'pointer'}} />}
                    {showAuthor && <HorizontalRuleIcon sx={{cursor:'pointer'}} />}
                </span>
            </Box>
            <Collapse in={showAuthor} timeout="auto" unmountOnExit>
                {authors.map((author, index)=>(
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
                            sx={{ gap:'0.5rem' }}
                        >
                            <Checkbox
                                checked={author.check}
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#1B2635'
                                    }
                                }}
                            />
                            {
                                String(author.name).toUpperCase() == 'ALL' ?
                                <h1>{t('sidebar_component.all')}</h1>
                                :
                                <h1>{author.name}</h1>
                            }
                        </Box>
                    </Box>
                ))}
            </Collapse>
        </Box>
    );
};

Author.defaultProps = {
    loadingNFTs: false,
    typeFilter: {},
    setTypeFilter: ()=>{},
    cleanAllFilter:false
};

Author.propTypes = {
    loadingNFTs: PropTypes.bool,
    typeFilter: PropTypes.object,
    setTypeFilter: PropTypes.func,
    cleanAllFilter: PropTypes.bool
};

export default Author;