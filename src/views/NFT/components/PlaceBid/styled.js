import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Field } from 'formik';

export const PlaceBidContentBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`;

export const PlaceBidInputNumber = styled(Box)`
    font-size: 25px;
    font-weight: 600;
    text-align: center;
`;

export const TextField = styled(Field)`
    width:100%;
    border-radius:8px;
    border:1px solid #E5E5E5;
    padding:10px;
    font-size: 16px;
`;

export const SelectField = styled(Field)`
    width:100%;
    border-radius:8px;
    border:1px solid #E5E5E5;
    padding:10px;
    font-size: 16px;
`;

export const counterStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#000',
    borderRadius: '8px',
}

export const auctionMesaggeStyles = {
   color:'#7f7f7f',
   fontSize:'20px',
   fontWeight:600
}

export const auctionEndsTextStyles = {
    color:'#7f7f7f',
    fontSize:'25px',
    fontWeight:600,
    marginBottom:'0px'
}