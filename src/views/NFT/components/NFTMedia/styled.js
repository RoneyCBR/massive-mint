import styled from '@emotion/styled';
import { Box, Card, CardActionArea, Typography } from '@mui/material';

export const NFTMediaCardContent = styled(Card)`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0px;
    box-sizing: content-box;
    padding-bottom: 0px;
    @media screen and (max-width: 884px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const NFTMediaDefaultTittle = styled(Box)`
    text-align: center;
    color: #fff;
    font-size: 120px;
    margin: 10px 10px;
`;

export const NFTMediaCardAction = styled(CardActionArea)`
    width: 100%;
    box-sizing: border-box;
    padding: 8px 8px;
`;

export const NFTMediaCardFooter = styled(Typography)`
    margin-right: 20px;
    padding-bottom: 0px;
    color: #fff;
`;