import React from 'react'
import { Box } from '@mui/material'
import CollectionNFTs from '../CollectionNFTs'
import PropTypes from 'prop-types'

const SectionNFTs = ({content,NFTLoading}) => {
    return (
        <Box sx={{marginBottom:'2rem',color:'#fff'}}>
            <CollectionNFTs 
                limit={content && content.length>0?content.length:0}
                content={content} 
                NFTLoading={NFTLoading}
            />
        </Box>
    )
}

SectionNFTs.propTypes = {
    content: PropTypes.any,
    NFTLoading: PropTypes.bool
}

export default SectionNFTs