import styled from '@emotion/styled';
import { CardMedia } from '@mui/material';
import { Field } from 'formik';

export const NFTBuyNow = styled(CardMedia)`
    display: flex;
    justify-content: center;
    gap: 1rem;
    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`;

export const TextField = styled(Field)`
    width:100%;
    border-radius:8px;
    border:1px solid #E5E5E5;
    padding:10px;
    font-size: 16px;
    display:none;
`;

export const containerInputStyles = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
}

export const titleBuyStyles = {
    fontSize:'15px',
    fontWeight:600,
    color:'#7f7f7f'
}

export const labelPriceStyles = {
    fontSize:'25px',
    fontWeight:600
}