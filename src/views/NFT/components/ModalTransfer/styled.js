import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const ModalTransferContainer = styled(Box)`
    width: 700px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 2px solid #E5E5E5;
    border-radius: 8px;
    box-shadow: 24px;
    padding: 16px;
    @media screen and (max-width: 750px) {
        width: 100%;
    }
`;

export const ModalTransferContent = styled(Box)`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
    text-align: center;
`;

export const ModalTransferContentButton = styled(Box)`
    width: 30px;
    background: gray;
    border-radius: 20px 20px 20px 20px;
    &:hover {
        background: black;
    }
`;