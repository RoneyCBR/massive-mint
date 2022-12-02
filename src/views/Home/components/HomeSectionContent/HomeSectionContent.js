import React from 'react'
import { Box, Container, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import NFTsCard from 'components/NFTsCard';
import CollectionCard from 'components/CollectionCard';
import ProfileCard from 'components/ProfileCard';
import PropTypes from 'prop-types'

const NavLink = styled(Link)`
    text-decoration: none;
    color: #666;
    font-size: 18px;
`

const HomeSectionContent = ({title, searchBlockName, query, nft, collection,profile, showBtnAll, content, limit}) => {
    return (
        <>
        <Container 
            maxWidth='xl' 
            sx={{
                marginTop:'4rem'
            }}
        >
            <Box 
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
            >
                <Box
                    sx={{
                        fontSize:'24px', 
                        color:'#000'
                    }}
                >
                    <Box
                        display='flex'
                        alignItems='center'
                        sx={{
                            gap:'10px'
                        }}
                    >
                        <span
                            style={{
                                letterSpacing:'-0.02em',
                                fontWeight: 600,
                                fontFamily: '"Suisse", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            }}
                        >
                            {title}
                        </span>
                    </Box>
                </Box>
                <Box
                    sx={{
                        fontSize:'18px', 
                        color:'#666',
                        cursor:'pointer',
                        display:'flex',
                        alignItems:'center'
                    }}
                >
                    <NavLink to={`/explore?${query}`}>{searchBlockName}</NavLink>
                </Box>
            </Box>
            <Divider sx={{marginTop:'0.8rem'}} />
            {nft && <NFTsCard showBtnAll={showBtnAll} content={content} limit={limit} />}
            {collection && <CollectionCard showBtnAll={showBtnAll} content={content} limit={limit} />}
            {profile && <ProfileCard showBtnAll={showBtnAll} content={content} limit={limit} />}
        </Container>
        </>
    )
}

HomeSectionContent.propTypes = {
    title: PropTypes.string,
    searchBlockName: PropTypes.string,
    query: PropTypes.string,
    nft: PropTypes.bool,
    collection: PropTypes.bool,
    profile: PropTypes.bool,
    showBtnAll: PropTypes.bool,
    content: PropTypes.array,
    limit: PropTypes.number,
}

export default HomeSectionContent