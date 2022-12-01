import styled from '@emotion/styled';
import { Box, CardMedia, Container } from '@mui/material';

export const NFTContainer = styled(Box)`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`;

export const ConteinerHeader = styled(Container)`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 700px) {
        flex-direction: column;
    }
`;

// nft data

export const NFTDataContent = styled(Box)`
    display: flex;
    justify-content: space-around;
    gap: 10px;
    @media screen and (max-width: 1030px) {
        flex-direction: column;
    }
`;

export const NFTTitle = styled.h1`
    color: #fff;
`;

export const ContentBox = styled(Box)`
    width: 100%;
    height: 100%;
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const ContentBoxLoader = styled(Box)`
    width: 100%;
    height: 100%;
    min-height: 100%;
    box-sizing: border-box;
`;

//nftMedia

export const NFTCardMedia = styled(CardMedia)`
    width: 100%;
    object-fit: 100%;
    border-radius: 8px 8px 8px 8px;
    &:fullScreen {
        object-fit: contain !important;
        border-radius: none !important;
        width: 500px !important;
        height: 500px !important;
        overflow: hidden !important;
    }
`;
