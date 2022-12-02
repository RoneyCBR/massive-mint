import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {
    CardContent,
    ContentArea,
    ContentForm,
    TitleH2
} from './style';

const PreMintMassive = ({data,titleCollection})=>{
    return (
        <Box>
            <Container maxWidth="xl">
                    <br></br>
                    <CardContent>
                        <Box sx={{mb:'10px'}}>  
                            <ContentArea>
                                <ContentForm>
                                    <center>
                                        <TitleH2>{titleCollection}</TitleH2>
                                    </center>
                                    MassiveMint {data.userAccount+''}
                                </ContentForm>
                            </ContentArea>
                        </Box>
                    </CardContent>
            </Container>
        </Box>
    )
}

PreMintMassive.propTypes = {
    data: PropTypes.object,
    titleCollection: PropTypes.string
};


export default PreMintMassive;