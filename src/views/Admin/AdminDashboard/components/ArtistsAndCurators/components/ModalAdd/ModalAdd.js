import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ModalAdd = ({open,onClose,children}) => {

  const handleClose = () => onClose(false);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                <Button 
                    variant="contained" 
                    size="small"
                    onClick={handleClose}
                    sx={{
                        width:'30px',
                        background:"gray",
                        borderRadius:"20px 20px 20px 20px",
                        float:'right',
                        "&:hover":{
                            background:"black"
                        }
                    }}
                >
                    <CloseIcon />
                </Button>
            </Box>
            <Box
                sx={{
                    width: '100%'
                }}
            >
                {children}
            </Box>
        </Box>
      </Modal>
    </div>
  );
}

ModalAdd.propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
    onClose: PropTypes.func
}

export default ModalAdd;