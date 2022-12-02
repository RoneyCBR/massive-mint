import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const ButtonStyled = ({text, maxWidth, width, isDisabled=false, onClick, icon, type = 'submit'})=>{

    return (
        <Button
            variant="contained"
            disabled={isDisabled}
            endIcon={icon}
            onClick={onClick}
            type={type}
            sx={{
                marginLeft:'5px',
                backgroundColor: '#4aa521',
                color:'#fff', 
                width: width ? width : '120px',
                maxWidth: maxWidth ? maxWidth :  '100%',
                transition: 'all 0.3s ease-in-out',
                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#4aa521',
                },
                '@media screen and (max-width: 650px)': {
                    width:'100%',
                    marginTop:'5px',
                    marginBottom:'5px',
                    marginLeft:'0px'
                },
            }} 
        >
            <span>
                Btn - {text}
            </span>
        </Button>
    )
}

ButtonStyled.propTypes = {
    text: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    width: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.element,
    type: PropTypes.string,
    maxWidth: PropTypes.string,
}

export default ButtonStyled;