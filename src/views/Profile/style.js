import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export const MenuBody= styled(Container)(() => ({
    display: 'flex',
    justifyContent: 'center',
    '@media screen and (max-width: 750px)': {
        justifyContent: 'space-between',   
        overflowX:'auto'        
    }
}));    


export const ActiveTag = styled(Box)`
    margin:auto 25px; 
    cursor:pointer;
    color:#fff;
    border-bottom: ${props => props.active =="true" ? '3px solid #43B02A' : 'null'};
    font-weight: ${props => props.active =="true" ? 'bold' : 'null'};
    ${props => props.styles}
`

export const ActiveTagCenter= styled(Box)(() => ({
    display:'flex',
    justifyContent:'center',
    alignItems: 'center'
}));    

export const ActiveTagSpaceBetween = styled(Box)(() => ({
    display:'flex',
    justifyContent:'space-between',
    alignItems: 'center'
})); 

export const ContainerCards = styled(Box)(() => ({
    display:'flex',
    justifyContent:'flex-start',
    width:'100%',
    "@media screen and (max-width:599px)":{
        display:'grid',
        gridTemplateColumns:'1fr'
    }
})); 

export const ContentMenu = styled(Box)(({theme,open}) => ({
    display:'none',
    width:`${open == 'true'?'400px':'100px'}`,
    marginTop:'20px',
    marginBottom:'40px',
    borderRight:'1px solid #d2d2d2',
    borderBottom:'none',
    overflow:'hidden',
    WebkitTransition: 'width 0.5s ease-in-out',
    MozTransition: 'width 0.5s ease-in-out',
    OTransition: 'width 0.5s ease-in-out',
    transition: 'width 0.5s ease-in-out',
    "@media screen and (max-width:599px)":{
        width:'100vw',
        borderRight: 'none',
        borderBottom:'1px solid #d2d2d2'
    },
    [theme.breakpoints.only('xs')]: {
        marginTop:'10px',
        marginBottom:'10px'
    },
    [theme.breakpoints.only('sm')]: {
        marginTop:'10px',
        marginBottom:'10px'
    },
    [theme.breakpoints.up('sm')]: {
        marginTop:'20px',
        marginBottom:'40px'
    }
})); 

export const BodyCards = styled(Box)(({theme}) => ({
    width:'100%',
    marginTop:'40px',
    marginBottom:'40px',
    [theme.breakpoints.only('xs')]: {
        marginTop:'0px',
        marginBottom:'10px'
    },
    [theme.breakpoints.only('sm')]: {
        marginTop:'0px',
        marginBottom:'10px'
    },
    [theme.breakpoints.up('sm')]: {
        marginTop:'40px',
        marginBottom:'40px'
    }
})); 


export const ContainerPop = styled(Box)(() => ({
    position:'absolute',
    top:'0px',
    right:'0px',
})); 

export const BodyPop = styled(Box)(({theme}) => ({
    width:'328px',
    height:'170px',
    backgroundColor: '#f2f2f2 !important',
    position: 'fixed',
    bottom:'15px',
    right:'15px',
    zIndex: '99999 !important',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
    "&:hover": {
        opacity: '1'
    },
    [theme.breakpoints.only('xs')]: {
        width:'100%',
        height:'170px',
        bottom:'0px',
        right:'0px'
    },
    [theme.breakpoints.only('sm')]: {
        width:'328px',
        height:'170px',
        bottom:'15px',
        right:'15px'
    },
    [theme.breakpoints.up('sm')]: {
        width:'328px',
        height:'170px'
    }
})); 

export const PopBtnClose = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    "&>div":{
        paddingTop:'10px',
        paddingRight:'10px'
    }
})); 

export const PopTitle = styled(Box)(({theme}) => ({
    width: '100%',
    padding: '0px 10px',
    fontSize:'20px',
    textAlign: 'center',
    [theme.breakpoints.only('xs')]: {
        fontSize:'22px'
    },
    [theme.breakpoints.only('sm')]: {
        fontSize:'22px'
    },
    [theme.breakpoints.up('sm')]: {
        fontSize:'20px'
    }
})); 

export const PopBtnHere = styled(Box)(() => ({
    width: '100%',
    padding: '0px 10px',
    display: 'flex',
    justifyContent: 'center'
})); 


