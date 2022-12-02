import styled from '@emotion/styled';
import { Box, Card, CardContent, Tabs, Typography } from '@mui/material';

export const DataMediaContent = styled(CardContent)`
    width: 85%;
    margin: 0 auto;
    @media screen and (max-width: 1030px) {
        width: 100%;
    }
`;

export const DataMediaContentBox = styled(Box)`
    border-bottom: 1;
    border-color: divider;
    color: #1B2635;
    & .css-12srgyj-MuiButtonBase-root-MuiTab-root {
        font-weight: bold;
        font-size: 17px;
    }
    & .css-12srgyj-MuiButtonBase-root-MuiTab-root.Mui-selected {
        color: #1B2635;
        font-weight: bold;
    }
    & .css-1aquho2-MuiTabs-indicator {
        background-color: #1B2635;
    }
`;

export const DataMediaContentTab = styled(Tabs)`
    .css-12srgyj-MuiButtonBase-root-MuiTab-root {
        font-weight: bold;
        font-size: 17px;
    }
    .css-12srgyj-MuiButtonBase-root-MuiTab-root.Mui-selected {
        color: #1B2635;
        font-weight: bold;
    }
    .css-1aquho2-MuiTabs-indicator {
        background-color: #1B2635;
    }
`;

export const DataMediaContentChildren = styled(Box)`
    margin-top: 2rem;
    margin-bottom: 25px;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 600px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const DataMediaContentCard = styled(Card)`
    border: 1px solid #E5E5E5;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 70px;
`;

export const DataMediaContentTypograthy = styled(Typography)`
    margin-top: 25px;
    @media screen and (max-width: 1280px) {
        margin-top: 20px;
    }
    color: #fff;
`;