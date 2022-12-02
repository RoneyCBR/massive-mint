import React from 'react';
import { Container } from '@mui/material';
import PropTypes from 'prop-types';

const PreMintMassive = ({data})=>{

    return (
        <Box>
            <Container maxWidth="xl">
                    <br></br>
                    MassiveMint {data.userAccount+''}
            </Container>
        </Box>
    )
}

PreMintMassive.propTypes = {
    data: PropTypes.object
};


export default PreMintMassive;