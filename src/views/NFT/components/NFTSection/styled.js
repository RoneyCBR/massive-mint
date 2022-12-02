import styled from '@emotion/styled';
import { Box, CardMedia } from '@mui/material';

export const DetailsBoxContainer = styled(Box)`
    z-index: 10;
    display: flex;
    flex-direction: row-reverse;
    margin-right: 14px;
    margin-top: 14px;
`;

export const DetailsBoxContainerMain = styled(Box)`
    background-color: #f3f4f7;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    margin-top: 2rem;
`;

export const NFTSectionCardMedia = styled(CardMedia)`
    box-sizing: border-box;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid #E5E5E5;
    background-color: none;
`;

export const NFTSectionCardContentBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    margin-top: -8px;
    background: transparent;
    border: none;
    outline: none;
    box-shadow: none;
    margin-bottom: -12px;
`;

export const NFTSectionCardContentBoxBody = styled(Box)`
    display: flex;
    justify-content: space-between;
    margin-top: -8px;
    background: transparent;
    border: none;
    outline: none;
    box-shadow: none;
    margin-bottom: -12px;
`;

export const NFTSectionCardContentBoxFooter = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const NFTSectionIconETH = styled(CardMedia)`
    height: 20px;
    width: 20px;
    margin-left: 5px;
`;

export const NFTSectionTitle = {
    marginBottom:'40px',
    textAlign:'center'
}

export const NFTSectionOutlineIcon = {
    zIndex:'10',
    color:'#fff'
}

export const NFTSectionLocalOutlineIcon = {
    zIndex: '10',
    color:'#fff',
    marginRight:'10px'
}

export const NFTSectionValue = styled(Box)`
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
`;
