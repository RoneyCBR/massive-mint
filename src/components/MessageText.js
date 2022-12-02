import React from 'react'
import { Box } from '@mui/system';
import PropTypes from 'prop-types';

const MessageText = ({text}) => {
    return(
        <Box
            sx={{
                textAlign: 'center',
                marginTop: '2rem',
                color: '#ED2891'
            }}
        >
            <h3>{text}</h3>
        </Box>
    )
}

MessageText.propTypes = {
    text: PropTypes.string
}

export default MessageText;