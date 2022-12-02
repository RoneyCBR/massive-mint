import React from 'react'
import { Box, Modal } from "@mui/material";
import Proptypes from 'prop-types'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #E5E5E5',
    borderRadius:'8px',
    boxShadow: 24,
    p: 4,
};

const ModalPowerOff = ({open = true}) => {

    return (<>
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={{ ...style, width: 500,
            '@media screen and (max-width: 750px)': {
                width: '100%'
            }}}>
                <Box sx={{
                    display: 'grid',
                    width:'100%',
                    gridTemplateColumns:'repeat(1,1fr)',
                    textAlign:'center'
                }}>
                    <h1>Cryptoloteria is under maintenance</h1>
                </Box>
            </Box>
        </Modal>
    </>)
}
ModalPowerOff.propTypes = {
    open : Proptypes.bool
}
export default ModalPowerOff;