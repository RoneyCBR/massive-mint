import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const TitleH2 = styled("h2")(() => ({
    margin:'0px 0px',
    color:'#fff'
})); 

export const TitleH3 = styled("h3")(() => ({
    margin:'0px 0px',
    color:'#fff'
}));   

export const TitleText = styled(Box)(() => ({
    margin:'0px 0px',
    color:'#fff',
    wordWrap: 'break-word'
}));   

export const CardContent = styled(Card)(() => ({
    padding:'10px 0px',
    width:'100%',
    display:'flex',
    flexDirection:'column',
    gap:'15px',
    marginBottom:'50px',
    backgroundColor:'transparent',
    border:'1px solid #fff'
}));

export const ContentArea = styled(Box)(({theme}) => ({
    width:'100%',
    display:'flex',
    padding:'0px 10px',
    justifyContent:'space-between',
    gap:'10px',
    [theme.breakpoints.only('xs')]: {
        display:'block'
    },
    [theme.breakpoints.only('sm')]: {
        display:'block'
    },
    [theme.breakpoints.only('md')]: {
        display:'flex'
    },
    [theme.breakpoints.only('lg')]: {
        display:'flex'
    },
    [theme.breakpoints.only('xl')]: {
        display:'flex'
    }
}));

export const ContentForm = styled(Box)(({theme}) => ({
    width:'25%',
    [theme.breakpoints.only('xs')]: {
        width:'100%'
    },
    [theme.breakpoints.only('sm')]: {
        width:'100%'
    },
    [theme.breakpoints.only('md')]: {
        width:'25%'
    },
    [theme.breakpoints.only('lg')]: {
        width:'25%'
    },
    [theme.breakpoints.only('xl')]: {
        width:'25%'
    }
}));


export const LineDividerV = styled(Divider)(({theme}) => ({
    display:'block',
    width:'2px',
    background:'rgba(255,255,255,0.5)',
    borderRadius:'1px 1px',
    [theme.breakpoints.only('xs')]: {
        display:'none'
    },
    [theme.breakpoints.only('sm')]: {
        display:'none'
    },
    [theme.breakpoints.only('md')]: {
        display:'block'
    },
    [theme.breakpoints.only('lg')]: {
        display:'block'
    },
    [theme.breakpoints.only('xl')]: {
        display:'block'
    }
}));

export const LineDividerH = styled(Divider)(({theme}) => ({
    display:'none',
    height:'5px',
    background:'rgba(255,255,255,0.5)',
    [theme.breakpoints.only('xs')]: {
        display:'block'
    },
    [theme.breakpoints.only('sm')]: {
        display:'block'
    },
    [theme.breakpoints.only('md')]: {
        display:'none'
    },
    [theme.breakpoints.only('lg')]: {
        display:'none'
    },
    [theme.breakpoints.only('xl')]: {
        display:'none'
    }
}));

export const ContentFilter = styled(Box)(({theme}) => ({
    width:'100%',
    [theme.breakpoints.only('xs')]: {
        width:'100%'
    },
    [theme.breakpoints.only('sm')]: {
        width:'100%'
    },
    [theme.breakpoints.only('md')]: {
        width:'75%'
    },
    [theme.breakpoints.only('lg')]: {
        width:'75%'
    },
    [theme.breakpoints.only('xl')]: {
        width:'75%'
    }
}));

export const FilterTitle = styled('h1')(() => ({
    margin:'0px 0px',
    color:'#fff'
}));

export const FilterBody = styled(Box)(({theme}) => ({
    width:'100%',
    display:'grid',
    gap:'20px',
    gridTemplateColumns:'30% 70%',
    [theme.breakpoints.only('xs')]: {
        gridTemplateColumns:'repeat(1,1fr)'
    },
    [theme.breakpoints.only('sm')]: {
        gridTemplateColumns:'repeat(2,1fr)'
    },
    [theme.breakpoints.only('md')]: {
        gridTemplateColumns:'repeat(2,1fr)'
    },
    [theme.breakpoints.only('lg')]: {
        gridTemplateColumns:'30% 70%'
    },
    [theme.breakpoints.only('xl')]: {
        gridTemplateColumns:'30% 70%'
    }
}));

export const FilterForm = styled(Box)(() => ({
    display:'flex',
    justifyContent:'flex-start',
    flexDirection:'row',
    alignItems:'center',
    gap:'10px',
    color:'#fff'
}));

export const ContentGoToCollection = styled(Box)(() => ({
    display:'flex',
    justifyContent:'center'
}));

export const FilterDetailsContent = styled(Box)(() => ({
    display:'flex',
    justifyContent:'flex-end'
}));

export const FilterDetails = styled(Box)(() => ({
    display:'flex',
    width:'100%',
    justifyContent:'flex-start',
    flexDirection:'column',
    color:'#fff'
}));

export const ContainerCards = styled(Box)(({theme}) => ({
    display:'grid',
    gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',
    gap:'10px',
    [theme.breakpoints.only('xs')]: {
        gridTemplateColumns:'repeat(auto-fit, minmax(100%, 1fr))'
    },
    [theme.breakpoints.only('sm')]: {
        gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))'
    },
    [theme.breakpoints.only('md')]: {
        gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))'
    },
    [theme.breakpoints.only('lg')]: {
        gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))'
    },
    [theme.breakpoints.only('xl')]: {
        gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))'
    }
}));

export const ContainerMessage = styled(Box)(() => ({
    width:'100%',
    height:'100%', 
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center',
    color:'red'
}));

export const TextTotal = styled('h2')(() => ({
    margin:'0px 0px',
    color:'#fff'
}));

export const BodyCard = styled(Card)(({theme}) => ({
    padding:'10px',
    maxWidth:'300px',
    minHeight:'200px',
    margin:'5px',
    backgroundColor:'transparent',
    border:'1px solid #fff',
    [theme.breakpoints.only('xs')]: {
        maxWidth:'100%'
    },
    [theme.breakpoints.only('sm')]: {
        maxWidth:'100%'
    },
    [theme.breakpoints.only('md')]: {
        maxWidth:'100%'
    },
    [theme.breakpoints.only('lg')]: {
        maxWidth:'300px'
    },
    [theme.breakpoints.only('xl')]: {
        maxWidth:'300px'
    }
}));

export const CardGrid1 = styled(Box)(({theme}) => ({
    display:'grid',
    gridTemplateColumns:'300px 60%',
    width:'100%',
    height:'auto',
    [theme.breakpoints.only('xs')]: {
        gridTemplateColumns:'100px 60%'
    },
    [theme.breakpoints.only('sm')]: {
        gridTemplateColumns:'100px 1fr'
    },
    [theme.breakpoints.only('md')]: {
        gridTemplateColumns:'100px 1fr'
    },
    [theme.breakpoints.only('lg')]: {
        gridTemplateColumns:'110px 1fr'
    },
    [theme.breakpoints.only('xl')]: {
        gridTemplateColumns:'110px  60%'
    }
}));

export const CardGrid2 = styled(Box)(() => ({
    display:'grid',
    gridTemplateColumns:'repeat(3,1fr)',
    gap:'5px',
    marginTop:'5px'
}));

export const CardList = styled(Card)(() => ({
    background:'transparent',
    border:'1px solid #fff'
}));

export const MessageBoxContainer = styled(Box)(() => ({
    width:'100%',
    height:'100%', 
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center',
    color:'#fff'
}));

export const PanelContainer = styled(Box)(() => ({
    display:'flex',
    width:'100%',
    gap:'10px',
    justifyContent:'center',
    marginTop:'10px',
    marginBottom:'15px',
    flexDirection:'column'
}));

export const TextBox= styled(TextField)(() => ({
    width:"50%",
    color:'#fff',
    "& ,input":{
        color:'#fff'
    },
    "& label.Mui-focused":{
        color:'#fff'
    },
    "& label":{
        color:'#fff'
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#fff',
        },
        '&:hover fieldset': {
          borderColor: '#43B02A',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#43B02A',
        }
    }
}));

export const  LineDividerMobile = styled(Divider)(({theme}) => ({
    display:'none',
    background:'#fff',
    m:'10px 0px',
    [theme.breakpoints.only('xs')]: {
        display:'block'
    },
    [theme.breakpoints.only('sm')]: {
        display:'block'
    },
    [theme.breakpoints.only('md')]: {
        display:'none'
    },
    [theme.breakpoints.only('lg')]: {
        display:'none'
    },
    [theme.breakpoints.only('xl')]: {
        display:'none'
    }
}));


export const  LineDividerD = styled(Divider)(() => ({
    background:'#fff'
}));


export const ButtonLink = styled(Button)(() => ({
    marginTop:'10px',
    minWidth:'200px',
    background:'#00FD90',
    color:'#000',
    "&:hover":{
        color:'#fff'
    }
}));



