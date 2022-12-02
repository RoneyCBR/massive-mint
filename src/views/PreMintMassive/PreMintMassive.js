import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
    CardContent,
    ContentArea
} from './style';


const PreMintMassive = ({data}) => {
    const { t } = useTranslation("translate");
    const [msgLoad,setMsgLoad] = React.useState('Loading...');

   
    useEffect(() => {
        setMsgLoad(t("pre_mint_nft_massive.message_loader.confirm_pre_mint"))
        console.log(data);
    },[]);
 
    return (
        <Box>
            <Container maxWidth="xl">
                    <br></br>
                    <CardContent>
                        <Box sx={{mb:'10px'}}>  
                            <ContentArea>
                               MassiveMint {msgLoad}
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



export default PreMintMassive;