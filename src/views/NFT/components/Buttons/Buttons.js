import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Context } from 'hooks/WalletContext';
import ButtonStyled from 'components/ButtonStyled';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';

const Buttons = ({nft, setOpenModalTransfer, setOpenModalSelectconfiguration, setOpenModalOffers}) => {
    const {data} = useContext(Context);
    const { t } = useTranslation("translate");
    const [blockAllButtons, setBlockAllButtons] = useState(false);
    const location = useHistory();

    useEffect(() => {
        //console.log('Component buttons', nft.owner, data.userAccount)
        if(data && data.userAccount){
            //console.log('Component buttons', nft.owner == data.userAccount)
            if(toString(nft.user.main_key).toUpperCase() == toString(data.userAccount).toUpperCase()) {
                console.log('Component buttons is true', nft.owner == data.userAccount)
                setBlockAllButtons(true)
            }else{
                setBlockAllButtons(false)
            }
        }
    } ,[data])

    
    const handleEditNFT = () => {
        if(data && data.userAccount && data.userAccount != 'undefined'){
            location.push(`/edit-nft?token_id=${nft.token_id}&address=${nft.project_key}`)
        }
    }

    return (
        <Box sx={{display:'none'}}>
            <ButtonStyled
                isDisabled={!blockAllButtons}
                onClick={()=>{setOpenModalTransfer(true)}}
                text={t("nft-screen.transfer_btn")}
            />
            <ButtonStyled
               // isDisabled = {true}
                //width={localStorage.getItem('i18nextLng').includes('es') ? '150px' : null}
                maxWidth='150px'
                onClick={()=>setOpenModalSelectconfiguration(true)}
                text={t("nft-screen.settings_btn")}
            />
            <ButtonStyled
                isDisabled = {true}
                onClick={()=>setOpenModalOffers(false)}
                text={t("nft-screen.view_my_offers_btn")}
            />
            {
                data && data.userAccount && data.userAccount != 'undefined' && nft && (nft.owner+'').toUpperCase() == (data.userAccount+'').toUpperCase() &&
                <Box display="block">
                    <ButtonStyled
                        isDisabled = {false}
                        onClick={handleEditNFT}
                        text={'Edit'}
                    />
                </Box>
            }
        </Box>
    )
}

Buttons.propTypes = {
    nft: PropTypes.object.isRequired,
    setOpenModalTransfer: PropTypes.func,
    setOpenModalSelectconfiguration: PropTypes.func,
    setOpenModalOffers: PropTypes.func,
}

export default Buttons;