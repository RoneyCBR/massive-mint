import { styled } from '@mui/material/styles';
import { Field } from 'formik';


export const UploadFile = styled("input")(() => ({
    display: 'none'
})); 

export const TextField = styled(Field)(() => ({
    width:'100%',
    borderRadius:'8px',
    border:'1px solid #E5E5E5',
    padding:'10px',
    fontSize: '16px'
})); 

export const TextArea = styled(Field)(() => ({
    width: '100%',
    height:' 150px',
    border:' 1px solid #E5E5E5',
    borderRadius: '8px',
    padding: '10px',
    fontSize: '16px'
})); 

