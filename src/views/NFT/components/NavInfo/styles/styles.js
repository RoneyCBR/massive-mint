import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export const AccountLink = styled(Link)`
    text-decoration: none;
    color: #666;
    font-family: Courier, "Lucida Console", monospace;
    cursor: pointer;
`;
export const AccountLinkImage = styled(Link)`
    text-decoration: none;
    color: #666;
    font-family: Courier, "Lucida Console", monospace;
    cursor: pointer;
`;
export const ContractLink = styled.a`
    text-decoration: none;
    color: #fff;
    font-family: Courier, "Lucida Console", monospace;
    cursor: pointer;
`;

export const NavInfoContainer = styled(Container)`
    width: 100%;
    margin-bottom: 25px;
    margin-top: 43px;
`;

export const NavInfoItem = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 5px;
    border: 1px solid #e5e5e5;
    min-height: 105px;
    border-top-left-radius: 8px;
    color: #fff;
`;

export const NavInfoItem2 = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 5px;
    border: 1px solid #e5e5e5;
    min-height: 36px;
    height: 100%;
    border-bottom-left-radius: 8px;
    @media screen and (max-width: 500px) {
        min-height: 60px;
    }
`;

export const NavInfoItemContainerLast = styled(Box)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
    min-height: 36px;
    border-bottom-right-radius: 8px;
    height: 100%;
`;

export const NavInfoItemWithBorderTopRightRadius = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 5px;
    border: 1px solid #e5e5e5;
    min-height: 105px;
    border-top-left-radius: 8px;
    color: #fff;
    @media (max-width: 767px) {
        border-top-right-radius: 8px;
    }
`;

export const NavInfoItemContent = styled(Box)`
    width: 100%;
    text-align: center;
    color: #fff;
`;

export const NavInfoItemContentText = styled(Box)`
    box-sizing: border-box;
    width: auto;
    color: #fff;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

/* export const NavInfoItemContentText = styled(Box)`
    box-sizing: border-box;
    width: auto;
    color: #fff;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`; */