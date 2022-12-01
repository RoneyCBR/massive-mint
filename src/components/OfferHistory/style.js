import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

export const CardContent = styled(Card)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    boxSizing: 'border-box',
    padding: '1rem',
    marginBottom: '1rem',
    "@media (max-width: 350px)": {
        padding: '10px',
        justifyContent: 'center',
        gap: '0px',
    }
}));   

export const ContentHistory = styled(Box)(() => ({
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    boxSizing: 'border-box'
}));   

export const BodyHistory = styled(Box)(() => ({
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    boxSizing: 'border-box'
}));   

export const ContentAvatar = styled(Box)(() => ({
    display: 'flex',
    width: 'auto',
    height: '100%',
    alignItems: 'center',
    margin:'auto 0'
}));   

export const ContentDetails = styled(Box)(() => ({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    "@media (max-width: 650px)": {
        gridTemplateColumns: '1fr'
    }
})); 

export const GridItem1 = styled(Box)(() => ({
    display:'flex',
    width: '100%',
    flexDirection: 'column',
    padding:'8px',
    boxSizing: 'border-box',
    position:'relative',
    color:'#fff'
})); 

export const GridItem2 = styled(Box)(() => ({
    width: '100%'
})); 

export const TextAbout = styled(Box)(() => ({
    cursor:'pointer',
    fontWeight:600,
    fontSize:'16px',
    color:'#fff'
})); 

export const TextType = styled(Box)(() => ({

})); 

export const TextData = styled(Box)(() => ({
    "@media (max-width: 350px)": {
        fontSize: '13px'
    },
    color:'#fff'
})); 

export const ContentMovements = styled(Box)(() => ({
    display:'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    padding:'0px 8px',
    "@media (max-width: 650px)": {
        justifyContent: 'flex-start'
    }
})); 

export const BodyMovement = styled(Box)(() => ({
    display:'flex',
    height: '100%',
    alignItems: 'center',
    gap:'3px',
    color:'#fff'
})); 


export const AnyResults = styled(Box)(() => ({
    width:'100%',
    height:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    color:'#fff'
})); 


