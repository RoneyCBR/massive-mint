import React, { useState } from 'react'
import { Box, Divider } from '@mui/material'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const ActiveTag = styled(Box)`
    border-bottom: ${props => props.active == "true" ? '3px solid #43B02A' : 'null'};
    font-weight: ${props => props.active == "true" ? 'bold' : 'null'};
    cursor: pointer;
    ${props => props.styles}
`

const initialState = [
    {
        name: 'NFTs',
        active: true,
        number: 1,
    },
    {
        name: 'Description',
        active: false,
        number: 2,
    },
    {
        name: 'Activity',
        active: false,
        number: 3,
    }
]



const TabSelector = ({items, setUpdate}) => {
    const [tabs, setTabs] = useState(items)
    const handleClickActiveTab = (index) => {
        const newTabs = [...tabs]
        newTabs.forEach((tab, i) => {
            if(i === index){
                setUpdate(tab.number)
                setTabs([...tabs.map((tab, i) => {
                    if(i === index){
                        return {...tab, active: true}
                    }
                    return {...tab, active: false}
                })])
            }
        })
    }
    return (
        <>
            <Box
                sx={{
                    width:'100%'
                }}
            >
                <Box display='flex' justifyContent='space-between' 
                    sx={{
                        width: '100%',

                        "@media (max-width: 768px)": {
                            display:'grid',
                            width:'100%',
                            gridTemplateColumns:'1fr',
                        }
                    }}
                >
                    
                    <Box display='flex' justifyContent='flex-start' 
                        sx={{
                            gap:'1rem',
                            marginLeft:'1.5rem',
                            color:'#fff',
                            "@media (max-width: 768px)": {
                                width:'100%',
                                justifyContent:'flex-start',
                            }
                        }}>
                        {tabs.map((item, index) => 
                        <ActiveTag key={index} onClick={()=>handleClickActiveTab(index)} active={item.active+''}>{item.name}</ActiveTag>)}
                    </Box>       
                </Box>
                <Divider sx={{background:'#fff'}} />

            </Box>
        </>
    )
}

TabSelector.defaultProps = {
    items: initialState,
    setUpdate: () => {}
}

TabSelector.propTypes = {
    items: PropTypes.array,
    setUpdate: PropTypes.func,
}

export default TabSelector

