import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
    CardContent,
    ContentArea
} from './style';


const PreMintMassive = ({data}) => {

 
    return (
        <Box>
            <Container maxWidth="xl">
                    <br></br>
                    <CardContent>
                        <Box sx={{mb:'10px'}}>  
                            <ContentArea>
                               MassiveMint {data.userAccount}
                            </ContentArea>
                        </Box>
                    </CardContent>
            </Container>
        </Box>
    );
};

PreMintMassive.defaultProps = {
    data:{userAccount:'userAddress'}
};

PreMintMassive.propTypes = {
    data: PropTypes.object,
};



export {PreMintMassive};