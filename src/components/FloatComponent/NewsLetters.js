import React from 'react'
import {Box, Button, CircularProgress, InputBase} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const styleFadeIn = {
    opacity: '0',
    animation: 'fadeIn 0.5s ease-in-out',
    animationFillMode: 'forwards',
    animationDelay: '0.2s',
    animationIterationCount: '1',
    animationName: 'fadeIn',
    animationTimingFunction: 'ease-in-out',
    "@keyframes fadeIn": {
        "0%": {
            opacity: 0
        }
        ,
        "100%": {
            opacity: 1
        }
    }
}


const  NewsLetters = () =>{

    const [email, setEmail] = React.useState('');
    const [closeBox, setCloseBox] = React.useState(false);
    const [ready,setReady] = React.useState(false);
    const [msg,setMsg] = React.useState('');
    const [loading,setLoading] = React.useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleClose = () => {
        setCloseBox(true);
    }

    const handleReady = () => {
        setReady(!ready);
    }

    const validateEmail = (mail) => {     
        /* eslint-disable no-useless-escape */
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(mail).toLowerCase());
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMsg('');
        try{
            if(validateEmail(email)){
                window.localStorage.setItem('newsletters',JSON.stringify(true));
                setMsg('');
                setLoading(true);
                axios.get(`${process.env.REACT_APP_URL_API}/artcrypted?email=`+email).then(() => {
                    setLoading(false);
                    setMsg("Thank you for subscribing!");
                    let timeOut1 = setTimeout(() => {
                        handleClose();
                        clearTimeout(timeOut1);
                    }, 2000);
                }).catch((error) => {
                    setLoading(false);
                    setMsg(error.message);
                })
            }else{
                setMsg('Email invalid');
            }
        }catch(error){
            setMsg('Error internal');
            console.log("Error: newsletters",error); 
        }
     
    }

    const showNewsLetters = () => {
        if(window.localStorage.getItem('newsletters') !== null){
            if(!JSON.parse(window.localStorage.getItem('newsletters'))){
                handleReady();
            }
        }else{
            handleReady();
        }
    }




    React.useEffect(async() => {
        if(window.location.pathname.toUpperCase().includes('/HOME')){
            window.addEventListener('scroll', () => {
                if(window.scrollY > 500){
                    showNewsLetters();
                }
            });

            window.removeEventListener('scroll', () => {
                if(window.scrollY > 500){
                    showNewsLetters();
                }
            });
        }else{
            handleClose();
        }

       
    },[window.location.pathname])

    return(
        <Box
            component="div"
            sx={{...styleFadeIn,display:(!ready || closeBox )? 'none' : 'block'}}
        >
            <Box 
                sx={{
                    width: {xs:'100%',sm:'328px',md:'328px'},
                    height:  {xs:'170px',sm:'170px',md:'170px'},
                    backgroundColor: '#f2f2f2 !important',
                    position: 'fixed',
                    bottom: {xs:'0px',sm:'15px'},
                    right: {xs:'0px',sm:'15px'},
                    zIndex: '99999 !important',
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
                    "&:hover": {
                        opacity: '1',
                       
                    },
                   
                }}
            
            >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <Box  
                        sx={{
                            pt:'10px',
                            pr:'10px'
                        }}
                    >
                        <CloseIcon onClick={handleClose}
                            sx={{
                                fontSize: '30px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        height: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                fontSize: {xs:'22px',sm:'22px',md:'20px'},
                                fontWeight: 'bold',
                                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '
                            }}
                        >
                            Subscribe to our newsletter
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '10px',
                                mt:'15px'
                            }}
                        >
                            <Box
                                sx={{
                                    display:'flex',
                                    flexDirection:'row',
                                    border:'1px solid rgba(0,0,0,0.1)',
                                    borderRadius:'10px 10px',
                                    background:'rgba(255,255,255,0.4)',
                                    p:'4px 1px'
                                }}
                            >  
                                <InputBase 
                                    className="notranslate"
                                    type="search"
                                    sx={{
                                        width:'100%',
                                        m:'0px 0px',
                                        p:'0px 4px',
                                        color: '#000',
                                    }}
                                    variant="standard"
                                    placeholder={"Email"}
                                    onChange={handleChange}
                                    value={email}
                                    disabled={loading}
                                    onKeyDown={(e)=>{
                                        if(e.key === 'Enter'){
                                            handleSubmit(e);
                                        }
                                    }}
                                    onAbort={()=>{
                                        setLoading(false);
                                    }
                                    }
                                />
                            </Box>

                            <Button variant='square'
                                className="notranslate"
                                onClick={handleSubmit}
                                disabled={loading}
                                onAbort={()=>{
                                    setLoading(false);
                                }
                                }
                                sx={{
                                    p:'0px 5px',
                                    borderRadius: '0px 0px',
                                    fontSize: {sm:'20px',md:'14px'},
                                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                    lineHeight: '1.2',
                                    color: '#fff',
                                }}
                            >
                                {
                                    loading ? 
                                    <CircularProgress
                                        size={25}
                                        sx={{
                                            color:'#fff'
                                        }}
                                    />
                                    :
                                    'Accept'
                                }
                            </Button>

                        </Box>

                        <Box display="flex" justifyContent={"flex-start"}>
                            <small>{msg}</small>
                        </Box>

                    </Box>
                </Box>
                
            </Box>
        </Box>
    )
}

export default NewsLetters;