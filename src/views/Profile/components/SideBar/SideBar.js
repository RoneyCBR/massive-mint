import React from 'react'
import { Box} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import NFTsFilters from './components/NFTsFilters';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ButtonStyled from 'components/ButtonStyled';

const SideBar = ({
    openFilters,
    setOpenFilters,
    loadingNFTs,
    typeFilter,
    setTypeFilter,
    handleClearFilter,
    cleanAllFilter
    }) => {
    const { t } = useTranslation("translate");
    const handleRandom = () => {
        window.scrollTo(0, 0);
        handleClearFilter();
    };
    return (
        <Box
            sx={{
                p:'0px 10px',
            }}
        >
            <Box 
                component='aside'
                sx={{
                    boxSizing:'border-box',
                    width:'100%',
                    top: '0px',
                    left: '0px',
                    '@media screen and (max-width: 750px)': {
                        position:'static',
                        width:'100%'
                    }
                }}
            >
                    <Box
                        component='article'
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={{
                            display:'flex',
                            boxSizing:'border-box',
                            justifyContent:'space-between',
                            cursor:'pointer',
                            width:'100%',
                            color:'#fff',
                            '@media screen and (max-width: 758px)':{
                                display:'flex',
                            }
                        }}   
                    >
                        <h1 >{t('sidebar_component.filters')}</h1>
                        <span>
                            <ClearIcon 
                                onClick={()=>setOpenFilters(!openFilters)} 
                                sx={{
                                    mt:'8px',
                                    transform: openFilters?'none':'rotate(45deg)',
                                    transition: '0.5s ease-in-out'
                                }}
                            />
                        </span>
                    </Box>
                    <Box
                        sx={{
                            width:'100%',
                            height:openFilters?'100%':'0px',
                            overflow: 'hidden',
                            boxSizing:'border-box',
                            transition: '0.2s ease-in-out'
                        }}
                    >
                        <NFTsFilters 
                            loadingNFTs={loadingNFTs}
                            typeFilter={typeFilter}
                            setTypeFilter={setTypeFilter}
                            cleanAllFilter={cleanAllFilter}
                        />
                    </Box>
                    {openFilters && (
                        <Box sx={{ marginTop: '10px' }}>
                            <ButtonStyled
                                isDisabled={loadingNFTs}
                                onClick={handleRandom} 
                                text={t("sidebar_component.reset_filters")} 
                                width="100%"
                            />
                        </Box>
                    )}
            </Box>
        </Box>
    )
}


SideBar.defaultProps = {
    openFilters: false,
    setOpenFilters: ()=>{},
    loadingNFTs: false,
    typeFilter: {},
    setTypeFilter: ()=>{},
    handleClearFilter: () =>{},
    cleanAllFilter:false
}

SideBar.propTypes = {
    openFilters: PropTypes.bool,
    setOpenFilters: PropTypes.func,
    loadingNFTs: PropTypes.bool,
    typeFilter: PropTypes.object,
    setTypeFilter: PropTypes.func,
    pageNftRef: PropTypes.object,
    limitNFTRef: PropTypes.object,
    address: PropTypes.string,
    setUrlNFTs: PropTypes.func,
    handleClearFilter: PropTypes.func,
    cleanAllFilter: PropTypes.bool
}

export default SideBar