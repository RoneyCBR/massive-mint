import styled from '@emotion/styled'
import { Field } from 'formik';

export const UploadFile = styled.input`
    display: none;
`;

export const TextField = styled(Field)`
    width:100%;
    border-radius:8px;
    border:1px solid #E5E5E5;
    padding:10px;
    font-size: 16px;
`;

export const TextArea =styled(Field)`
    width: 100%;
    height: 150px;
    border: 1px solid #E5E5E5;
    border-radius: 8px;
    padding: 10px;
    font-size: 16px;
`;