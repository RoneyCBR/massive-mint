import React from 'react';
import PropTypes from 'prop-types';
import {
    TitleH2,
    MessageBoxContainer
} from '../style';

const  MessageBox = ({msgSuccess,isOwner,loading,t}) =>{
    return (
        <React.Fragment>
            {
                !loading && 
                <React.Fragment>
                    <MessageBoxContainer>
                        <TitleH2>{msgSuccess}</TitleH2> 
                    </MessageBoxContainer>
                    {!isOwner && 
                    <MessageBoxContainer>
                        <TitleH2>{ t("pre_mint_nft_massive.message.you_dont_owner")}</TitleH2>
                    </MessageBoxContainer>
                    }
                </React.Fragment>
            }
        </React.Fragment>
    )
}

MessageBox.propTypes = {
    msgSuccess: PropTypes.string,
    isOwner: PropTypes.bool,
    loading: PropTypes.bool,
    t: PropTypes.any,
}

export default MessageBox;
