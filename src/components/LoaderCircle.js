import React from 'react'
import { CircularProgress, Box } from '@mui/material';
import PropTypes from 'prop-types';

const LoaderCircle = ({text, textColor, spinnerColor}) => {
    return(
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{
                textAlign: 'center',
                marginTop: '2rem',
                color: textColor ? textColor : '#fff',
                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '
            }}
        >
            <CircularProgress
                sx={{
                    color: spinnerColor ? spinnerColor : '#fff',
                }}
            />
            <h3>{text}...</h3>
        </Box>
    )
}

LoaderCircle.propTypes = {
    text: PropTypes.string,
    textColor: PropTypes.string,
    spinnerColor: PropTypes.string,
}

export default LoaderCircle;