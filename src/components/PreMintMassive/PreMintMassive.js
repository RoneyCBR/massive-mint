import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';

const PreMintMassive = ({data}) => {

 
    return (
        <Box>
            <Container maxWidth="xl">
                    <br></br>
                    MassiveMint {data.userAccount}
            </Container>
        </Box>
    );
};

PreMintMassive.defaultProps = {
    data:{userAccount:'userAddress'}
};

PreMintMassive.propTypes = {
    data: PropTypes.object
};

export default PreMintMassive;