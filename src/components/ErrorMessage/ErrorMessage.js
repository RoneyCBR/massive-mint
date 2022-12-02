import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

export const ErrorMessage = ({error, type}) => {
  return (
        <>
            {type==='container' &&(
            <Box component='div'>
                {error}
            </Box>)}
            {type==='text' &&(
            <Box component='text'>
                {error}
            </Box>)}
        </>
  );
};

ErrorMessage.prototype = {
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
}

export default ErrorMessage;