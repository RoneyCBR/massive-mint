import React, { useContext, useEffect, useState } from 'react'
import { Box, CardMedia, Container, Modal } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Context } from 'hooks/WalletContext';
import { switchNetwork } from 'services/web3';
import { style } from './styles';
import EthIcon from 'assets/logos/eth.png'

const ModalSwitchNetwork = () => {
    const { t } = useTranslation("translate");
    const { data }= useContext(Context)
    const [network, setNetwork] = useState(false);
    useEffect(()=>{
      if (data && data.chainID !== 'NaN') {
        if (data.chainID != process.env.REACT_APP_NETWORK){
            setNetwork(true)
        }else{
            setNetwork(false)
        }
    }
    }, [data])
    const handleChangeNetwork = () => {
        switchNetwork(data.provider)
    }
    return (
        <Modal
            open={network}
            onClose={() => setNetwork(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h3 style={{textAlign:'center'}}>{t("modal_switch_network.title")}</h3>
                <Container maxWidth="xs" onClick={handleChangeNetwork} sx={{ cursor: 'pointer' }}>
                    <Box display="flex" justifyContent="center" alignItems="center" gap="10px">
                        <CardMedia component="img" src={EthIcon} alt="simbol" sx={{ width: '6%' }} />
                        <Box>{t("modal_switch_network.switch_network_text")}</Box>
                    </Box>
                </Container>
                
            </Box>
        </Modal>
    )
}


export default ModalSwitchNetwork