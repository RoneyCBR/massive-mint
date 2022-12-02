import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const ContentBanner = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#e3e3e3',
    height: '250px',
    marginBottom:'100px',
    position:'relative',
}));    

export const ContentHead = styled(Box)(() => ({
    position:'absolute',
    top: '230px',
    left: '0px',
    width: '100%',
}));    

export const Row1Head = styled(Box)(() => ({
    display: 'flex',
    width:'50%',
    margin:'0 auto',
    alignItems: 'center',
    flexDirection: 'column'
}));    

export const Row2Head = styled(Box)(() => ({
    textAlign:'center',
    marginTop:'30px'
}));    

export const LinkAddress = styled('a')(() => ({
    textDecoration:'none',
    color:'#43B02A'
}));    