import React from 'react';
import {Box} from '@mui/material'
import PropTypes from 'prop-types';

const ContainerSection = ({children,width}) =>{

        return (
            <Box
                sx={{
                    width:'100%',
                    height:'auto',
                    display:'flex',
                    justifyContent:'center',
                    pt:'2rem',
                    pb:'2rem'
                }}
            >
                <Box 
                    sx={{
                        width:width
                    }}
                >
                    {children}  
                </Box>
            </Box>
        );

}

ContainerSection.defaultProps = {
    children: <center>ContainerSection ready!</center>,
    width:'90%'

};


ContainerSection.propTypes = {
    children: PropTypes.node.isRequired,
    width:  PropTypes.string
};




export default ContainerSection;