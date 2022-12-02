import React from 'react'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types';
import Type from './components/Type';
import SearchBar from './components/SearchBar';
import PriceRange from './components/PriceRange';
// import Author from './components/Author';
// import Available from './components/Available';
import { Divider } from '@mui/material';


const NFTsFilters = ({
    loadingNFTs,
    typeFilter,
    setTypeFilter,
    cleanAllFilter
    }) => {

    return (
        <Box 
            sx={{
                width:'100%',
                height:'100%',
                boxSizing:'border-box'
            }}
        >
            <SearchBar 
                loadingNFTs={loadingNFTs}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                cleanAllFilter={cleanAllFilter}
            />
            <Divider sx={{background:'#e3e3e3',mt:'10px'}}/>
            <PriceRange
                loadingNFTs={loadingNFTs}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                cleanAllFilter={cleanAllFilter}
            />
            {/* <Author 
                loadingNFTs={loadingNFTs}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                cleanAllFilter={cleanAllFilter}
            /> */}
            <Type 
                loadingNFTs={loadingNFTs}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                cleanAllFilter={cleanAllFilter}
            />
            {/* <Available 
                loadingNFTs={loadingNFTs}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                cleanAllFilter={cleanAllFilter}
            /> */}
        </Box>
    )
}

NFTsFilters.defaultProps = {
    loadingNFTs: false,
    typeFilter: {},
    setTypeFilter: ()=>{},
    cleanAllFilter:false
}

NFTsFilters.propTypes = {
    loadingNFTs: PropTypes.bool,
    typeFilter: PropTypes.object,
    setTypeFilter: PropTypes.func,
    cleanAllFilter: PropTypes.bool
}
export default NFTsFilters
