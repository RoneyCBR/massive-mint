import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import {
    CardContent,
    ContentArea,
    ContentForm,
    TitleH2,
    LineDividerV,
    LineDividerH,
    ContentFilter
} from './style';

const PreMintMassive = ({
    data,
    titleCollection
    })=>{

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
                                    <Box component='section' sx={{m:'0 auto',width:'90%',minHeight:'200px',maxHeight:'400px'}} >
                                        
                                    </Box>
                                </ContentForm>
                                <LineDividerV orientation="vertical"  flexItem />
                                <LineDividerH orientation="horizontal"  flexItem />
                                <ContentFilter>
                                    MassiveMint {String(data.userAccount).slice(0,10)+''}
                                </ContentFilter>
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