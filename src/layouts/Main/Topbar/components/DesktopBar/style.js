import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';

export const ContentMenu = styled(Box)(({theme}) => ({
    display:'flex', 
    gap:'1rem',
    height:'90px',
    alignItems:'center',
    [theme.breakpoints.only('xs')]: {
        display:'none'
    }
}));

export const CardImg = styled(CardMedia)(({theme}) => ({
    [theme.breakpoints.only('xs')]: {
        width:'100px',
        padding:'10px'
    },
    [theme.breakpoints.only('sm')]: {
        width:'110px',
        padding:'10px'
    },
    [theme.breakpoints.only('md')]: {
        width:'150px',
        padding:'5px'
    },
    [theme.breakpoints.only('lg')]: {
        width:'150px',
        padding:'5px'
    },
    [theme.breakpoints.only('xl')]: {
        width:'150px',
        padding:'5px'
    },
    cursor: 'pointer',
    transition: 'width 0.8s, height 0.8s'
}));


