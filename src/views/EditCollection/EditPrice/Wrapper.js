import React from 'react';
import { Paper, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const Wrapper = ({ children, handleClose }) => {
    const { t } = useTranslation("translate")
    return (
        <Paper
            sx={{
                width: 800,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                border: '2px solid #E5E5E5',
                borderRadius:'8px',
                boxShadow: 24,
                p: 4,
                outline: 'none',
                ':focus': {
                    outline: 'none',
                },
                overflow:'auto',
                '@media (max-width:850px)':{
                    width: '100%',
                    height: '100%'
                },
                '@media (max-width:830px)':{
                    width: '100%',
                    height: '100%'
                },
                '@media (max-width:600px)':{
                    width: '100vw',
                    height: '100%'
                }
            }}
        >
            <Box
                display='flex' 
                justifyContent='flex-end' 
                alignItems='flex-start' 
                sx={{width:'100%'}}
            >
                <Button type='button' onClick={handleClose}> 
                    <CloseIcon />
                </Button>
            </Box>
            <Box 
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
                <Box sx={{ textAlign: 'center', fontSize: '40px', mb: 4 }}>
                    {t("update_price_collection_view.title")}
                </Box>
                {children}
            </Box>
        </Paper>
    );
};

Wrapper.propTypes = {
    children: PropTypes.node,
    handleClose: PropTypes.func
};

export default Wrapper;
