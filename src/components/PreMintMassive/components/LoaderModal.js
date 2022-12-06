import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
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
    setIsClosed: () => {}
}

export default LoaderModal