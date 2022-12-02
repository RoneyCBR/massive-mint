import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import cards from 'utils/cardName';
import PropTypes from 'prop-types';

const SearchBar = ({
    loadingNFTs,
    typeFilter,
    setTypeFilter,
    cleanAllFilter
    }) => {
    const [search, setSearch] = useState('');
    const handleSearch = () => {
        if(search != ''){
            setTypeFilter({...typeFilter,
                slug:`&key_name=SLUG&key_val=${search}`,priceRange:'',author:'',type:'',available:''
            });
        }else{
            setTypeFilter({...typeFilter,slug:'',priceRange:'',author:'',type:'',available:''});
        }
    };

    const handleSearchSlug = (e) => {
        if (e.code === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    React.useEffect(()=>{
        if(cleanAllFilter){
            setSearch('')
        }
    },[cleanAllFilter]);

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" 
            sx={{ 
                border: '0.5px solid #e3e3e3', 
                borderRadius: '8px',
                padding: '0px 10px',
                backgroundColor:loadingNFTs?'#d2d2d2':'transparent',
                color:'#fff'
            }}>
            <Input
                disableUnderline
                disabled={loadingNFTs}
                placeholder='Search'
                inputProps={{ list: 'slug-search' }}
                name="slug-search"
                type="search"
                onKeyDown={handleSearchSlug}
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                sx={{
                    width: '100%',
                    ':-webkit-appearance': 'none',
                    color:'#fff',
                }}
            />
            <SearchIcon sx={{ cursor: 'pointer' }} onClick={()=> !loadingNFTs && handleSearch()} />
            <datalist id="slug-search">
                {cards.map((name, index)=>(
                    <option key={index} value={name.name} />
                ))}
            </datalist>
        </Box>
    );
};

SearchBar.defaultProps = {
    loadingNFTs: false,
    typeFilter: {},
    setTypeFilter: ()=>{},
    cleanAllFilter:false
};
SearchBar.propTypes = {
    loadingNFTs: PropTypes.bool,
    typeFilter: PropTypes.object,
    setTypeFilter: PropTypes.func,
    cleanAllFilter: PropTypes.bool
};

export default SearchBar;