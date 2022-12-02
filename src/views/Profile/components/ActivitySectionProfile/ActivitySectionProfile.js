import React from 'react';
import PropTypes from 'prop-types';
import { Container,TableContainer,Paper } from '@mui/material';
//import TableSectionProfile from '../TableSectionProfile';
import TableFilterCrypto from 'components/Tables/TableFilterCrypto';

const ActivitySectionProfile = ({user}) => {

    return (
        <Container maxWidth='lg'>
            {/* <TableSectionProfile movements={user ? user.movements : []}  /> */}
            <center>
            <TableContainer component={Paper} sx={{marginBottom:'25px',maxWidth:870}}>
                <TableFilterCrypto movements={user ? user.movements:[]} />
            </TableContainer>
            </center>
        </Container>
    );
}

ActivitySectionProfile.propTypes = {
    user: PropTypes.object,
}

export default ActivitySectionProfile;