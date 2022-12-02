import React from 'react'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ClearIcon from '@mui/icons-material/Clear';
import SortNFTs from './components/SortNFTs/SortNFTs';
import SortProfile from './components/SortProfile';
import { useTranslation } from 'react-i18next';
import SortCollection from './components/SortCollection';
import PropTypes from 'prop-types';
import ListIcon from '@mui/icons-material/List';

const SideBar = ({
    urlProject, 
    urlNFT, 
    isNFT, 
    isProfile, 
    isCollection,
    openFilters,
    setOpenFilters,
    listNFT,
    changeFilter,
    setNewContent,
    setSliceNFT,
    requestIsLoad,
    countNfts,
    pageNftRef
    }) => {
    const { t } = useTranslation("translate");
    
    return (
        <Box 
            component='aside'
            sx={{
                boxSizing:'border-box',
                width:openFilters?{xs:'100vw',sm:'320px'}:'30px',
                top: '0px',
                left: '0px',
                '@media screen and (max-width: 600px)': {
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
                    display:openFilters?'none':'flex',
                    marginTop:'10px',
                    marginLeft:'10px',
                    borderBottom:'1px solid #e0e0e0'
                }}   
            >
                <ListIcon 
                    sx={{
                        fontSize:'30px',
                        cursor:'pointer'
                    }} 
                    onClick={()=>setOpenFilters(!openFilters)}
                 />
            </Box>
            <Collapse in={openFilters} timeout="auto" unmountOnExit  orientation={'vertical'}>
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
                        width:{xs:'100%',sm:'320px'},
                        p:'0px 5px',
                        '@media screen and (max-width: 768px)':{
                            display:'flex',
                        }
                    }}   
                >
                    <h1 >{t('sidebar_component.filters')}</h1>
                    <span><ClearIcon  onClick={()=>setOpenFilters(!openFilters)} /></span>
                </Box>
                {isNFT && 
                    <SortNFTs 
                        urlNFT={urlNFT} 
                        listNFT={listNFT} 
                        changeFilter={changeFilter} 
                        setNewContent={setNewContent}
                        setSliceNFT={setSliceNFT}
                        requestIsLoad={requestIsLoad}
                        countNfts={countNfts}
                        pageNftRef={pageNftRef}
                    />}
                {isCollection && <SortCollection urlProject={urlProject} />}
                {isProfile && <SortProfile />}
            </Collapse>
        </Box>
    )
}

SideBar.defaultProps = {
    urlProject: ()=>{},
    urlNFT: ()=>{},
    isNFT: true,
    isCollection: false,
    isProfile: false,
    openFilters: true,
    setOpenFilters: ()=>{},
    listNFT:6,
    changeFilter: {},
    setNewContent: () => {},
    setSliceNFT: ()=>{},
    requestIsLoad:false,
    countNfts: {current:100},
    pageNftRef : {current:0}
}

SideBar.propTypes = {
    isNFT: PropTypes.bool,
    isCollection: PropTypes.bool,
    isProfile: PropTypes.bool,
    urlProject: PropTypes.func,
    urlNFT: PropTypes.func,
    openFilters: PropTypes.bool,
    setOpenFilters: PropTypes.func,
    listNFT: PropTypes.number,
    changeFilter: PropTypes.object,
    setNewContent : PropTypes.func,
    setSliceNFT: PropTypes.func,
    requestIsLoad: PropTypes.bool,
    countNfts: PropTypes.object,
    pageNftRef: PropTypes.object
}

export default SideBar