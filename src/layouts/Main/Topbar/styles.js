import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';


export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '20px 20px',
    border:'1px solid #000',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    }
  }));
  
export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    'input::-webkit-calendar-picker-indicator':{
        opacity: '0',
    },
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  font-size: 15px;
  border: none;
  background: '#fff';
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;




export const AppBarTop = styled(AppBar)(() => ({
    boxShadow:'none',
    border:'none',
    padding:'0px 0px',
    transition:'none',
    background:'transparent'
}));

export const ToolbarTop = styled(Toolbar)(() => ({
    width:'calc(100% -1px)',
    height:'auto',
    padding:'0px 0px'
}));


export const ContentLogo = styled(Box)(() => ({
    color:'#fff',
    fontFamily:'Futura',
    "@media screen and (max-width: 1300px)":{
        mr:'0px',
        ml:'0px',
    },
    "@media screen and (max-width: 758px)": {
        mr:'0px',
        ml:'0px',
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


