import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const ModalShareContainer = styled(Box)`
/* position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #E5E5E5',
    borderRadius:'8px',
    boxShadow: 24,
    p: 4, */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: #fff;
    border: 2px solid #e5e5e5;
    border-radius: 8px;
    box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.1);
    padding: 16px;
    width: 500;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const ModalShareContent = styled(Box)`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
    text-align: center;
`;

export const ModalShareContentButton = styled(Box)`
    background: #e5e5e5;
    border-radius: 20px 20px 20px 20px;
    font-size: 15px;
    &:hover {
        background: #000;
    }
`;

export const ModalShareContentSocialButton = styled(Box)`
    min-width: 50px;
    max-height: 30px;
    margin-top: 5px;
    background-color: #00acee;
    &:hover {
        background-color: #f344a1;
    }
    @media screen and (max-width: 920px) {
        width: 50%;
        margin-top: 5px;
        margin-left: 0px;
    }
`;