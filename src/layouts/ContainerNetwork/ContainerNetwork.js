import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import ModalSwitchNetwork from 'components/ModalSwitchNetwork';

const ContainerNetwork = ({children}) => {
    return (
        <Box>
            <ModalSwitchNetwork />
            {children}
        </Box>
    );
};

ContainerNetwork.propTypes = {
    children: PropTypes.node
};

export default ContainerNetwork;