import React from 'react'
import { Box } from '@mui/material'

const SortByDropdown = () => {
    return (
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            sx={{
                display:'flex',
                gap:'10px', 
                paddingRight:'24px',
                '@media screen and (min-width: 768px)': {
                    display:'none',
                }
            }}
        >
            <span style={{fontSize:'20px', marginLeft:'5px'}}>Sort by</span>
            <select>
                <option>Date Buy Now price set: Newest</option>
                <option>Date listed: Oldest</option>
                <option>Ending: Soonest</option>
                <option>Ending: Latest</option>
                <option>Date Offer made: Oldest</option>
                <option>Date Offer made: Newest</option>
            </select>
        </Box>
    )
}

export default SortByDropdown