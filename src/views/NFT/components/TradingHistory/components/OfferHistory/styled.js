import styled from '@emotion/styled';
import { Box, Card } from '@mui/material';

export const OfferHistoryContainerCard = styled(Card)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    box-sizing: border-box;
    padding: 1rem;
    margin-bottom: 1rem;
    @media (max-width: 350px) {
        padding: 10px;
        justify-content: center;
        gap: 0px;
    }
`;

export const OfferHistoryContainerBox = styled(Box)`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    box-sizing: border-box;
`;

export const OfferHistoryContentBox = styled(Box)`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    box-sizing: border-box;
`;

export const OfferHistoryContainerAvatar = styled(Box)`
    display: flex;
    width: auto;
    height: 100%;
    align-items: center;
    margin: auto 0;
`;

export const OfferHistoryContainerBody = styled(Box)`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 8px;
    box-sizing: border-box;
    position: relative;
`;

export const OfferHistoryContentBody = styled(Box)`
    cursor: pointer;
    font-weight: 600;
    font-size: 16px;
    color: #2d3748;
`;

export const OfferHistoryContainerFooter = styled(Box)`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 0px 8px;
    @media (max-width: 650px) {
        justify-content: flex-start;
    }
`;

export const OfferHistorycardMediaFooter = styled(Box)`
    height: 24px;
    width: 24px;
    padding: 1px;
`;