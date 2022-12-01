import React from 'react'
import { CircularProgress, Box, Modal } from '@mui/material';
import PropTypes from 'prop-types';

const LoaderModal = ({isOpen, setIsClosed, text, textColor, spinnerColor}) => {
    return (
        <Modal open={isOpen} onClose={()=> setIsClosed(false)}>
            <Box sx={{width: '100%', height: '100vh', display:' flex', alignItems:'center', justifyContent: 'center', flexDirection: 'column'}}>
                <CircularProgress
                    sx={{
                        color: spinnerColor ? spinnerColor : '#fff',
                    }}
                />
                <Box component="h3" sx={{ color: textColor ? textColor : '#000' }}>{text}</Box>
            </Box>
        </Modal>
    )
}

LoaderModal.propTypes = {
    text: PropTypes.string,
    textColor: PropTypes.string,
    spinnerColor: PropTypes.string,
    isOpen: PropTypes.bool,
    setIsClosed: PropTypes.func,
}

LoaderModal.defaultProps = {
    isOpen:false,
    setIsClosed: () => {}
}

export default LoaderModal