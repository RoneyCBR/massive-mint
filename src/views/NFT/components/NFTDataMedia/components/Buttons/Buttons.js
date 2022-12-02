import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Context } from 'hooks/WalletContext';
import ButtonStyled from 'components/ButtonStyled';
import PropTypes from 'prop-types';

const Buttons = ({nft, setOpenModalTransfer, setOpenModalSelectconfiguration, setOpenModalOffers}) => {
    const {data} = useContext(Context);
    const { t } = useTranslation("translate");
    const [blockAllButtons, setBlockAllButtons] = useState(false);
    useEffect(() => {
        //console.log('Component buttons', nft.owner, data.userAccount)
        if(data && data.userAccount){
            //console.log('Component buttons', nft.owner == data.userAccount)
            if(toString(nft.owner) == toString(data.userAccount)) {
                console.log('Component buttons is true', nft.owner == data.userAccount)
                setBlockAllButtons(true)
            }else{
                setBlockAllButtons(false)
            }
        }
    } ,[data])
    return (
        <>
            <ButtonStyled
                isDisabled={!blockAllButtons}
                onClick={()=>{setOpenModalTransfer(true)}}
                text={t("nft-screen.transfer_btn")}
            />
            <ButtonStyled
                disabled = {blockAllButtons}
                //width={localStorage.getItem('i18nextLng').includes('es') ? '150px' : null}
                maxWidth='150px'
                onClick={()=>setOpenModalSelectconfiguration(true)}
                text={t("nft-screen.settings_btn")}
            />
            <ButtonStyled
                disabled = {blockAllButtons}
                onClick={()=>setOpenModalOffers(true)}
                text={t("nft-screen.view_my_offers_btn")}
            />
        </>
    )
}

Buttons.propTypes = {
    nft: PropTypes.object.isRequired,
    setOpenModalTransfer: PropTypes.func,
    setOpenModalSelectconfiguration: PropTypes.func,
    setOpenModalOffers: PropTypes.func,
}

export default Buttons;