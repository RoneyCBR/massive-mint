import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const  TabPanel =({ children, value, index, ...other })=>{
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box
                    sx={{
                        padding: '15px 5%',
                        "@media (min-width: 650px)": {
                            padding:'0px 2%'
                        }
                    }}
                >
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default TabPanel;