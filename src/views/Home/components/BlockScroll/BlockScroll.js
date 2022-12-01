import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box'
/* imports para carousel */
import "react-multi-carousel/lib/styles.css";
import "./BlockScroll.css";
import CarouselSimple from 'components/Carousel/CarouselSimple';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ErrorMessage from 'components/ErrorMessage';

const handleResize = (size) => {
    if(size <= 600){
        return "mobile";
    }else
    if(size > 600 && size < 1024){
        return "tablet";
    }else
    if(size > 1023 && size < 3000){
        return "desktop"
    }else
    if(size >= 3000){
        return "big";
    }
}

const BlockScroll = ({content,title,header,type,sectionLoading,query}) => {
    const {t} = useTranslation("translate");
    let width = window.innerWidth;
    const [newArr,setNewArr] = React.useState(content);
    const [typeDevice,setTypeDevice] = React.useState(handleResize(width));
   
   
    React.useEffect(() => {
        window.addEventListener("resize", function(){
            width = window.innerWidth;
            setTypeDevice(handleResize(width));
        });
    
        window.removeEventListener("resize",function(){
            width = window.innerWidth;
            setTypeDevice(handleResize(width));
        });
    },[width]);

    
    React.useEffect(() => {
        setNewArr(content);
        if(type == "auction"){
            setNewArr(content.filter((item)=>{
                return item.on_auction == true;
            }));
        }else{
            setNewArr(content);
        }
    },[]);

    return (
        <Box
            sx={{
                width:'100%'
            }}
        >   
            <Box
                sx={{
                    width:'100%',
                    display:header,
                    justifyContent:'space-between'
                }}
            >
                <Box
                    sx={{
                        fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                        fontSize:{xs:'30px',sm:'30px',md:'40px'},
                        fontWeight:'bold',
                        color:'#0D0D0D'
                    }}
                >
                   {title}
                </Box>

                <Box
                    sx={{
                        width:'auto',
                        display:'flex',
                        justifyContent:'space-between'
                    }}
                >
                    <Box
                        sx={{
                            fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                            fontSize:{xs:'15px',sm:'15px',md:'20px'},
                            fontWeight:'bold',
                            color:'#0D0D0D',
                            "&:hover":{
                                color:'#0D0D0D',
                                opacity:'0.6'
                            }
                        }}
                    >
                        {
                        String(title).toUpperCase().includes('CURATORS') || String(title).toUpperCase().includes('CURATOR') ?
                            <Link 
                                to={`/curators`}
                                style={{
                                    textDecoration: 'none',
                                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                    fontSize:{xs:'15px',sm:'15px',md:'20px'},
                                    fontWeight:'bold',
                                    color:'#0D0D0D',
                                    cursor:'pointer',
                                    "&:hover":{
                                        color:'#0D0D0D',
                                        opacity:'0.6'
                                    }
                                }}
                            >
                                {t("home.view_all")}
                            </Link>
                        : 
                            <Link 
                                to={`/explore?${query}`}
                                style={{
                                    textDecoration: 'none',
                                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                                    fontSize:{xs:'15px',sm:'15px',md:'20px'},
                                    fontWeight:'bold',
                                    color:'#0D0D0D',
                                    cursor:'pointer',
                                    "&:hover":{
                                        color:'#0D0D0D',
                                        opacity:'0.6'
                                    }
                                }}
                            >
                                {t("home.view_all")}
                            </Link>
                        }
                       
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    width:'100%',
                    height:'100%',
                    overflowX:'hidden',
                }}
            >
                {
                    (newArr != null && newArr.length > 0)? 
                        <CarouselSimple 
                            deviceType={typeDevice}
                            content={newArr}
                            width={5555} 
                            type={type} 
                            query={String(title).toUpperCase().includes('CURATORS') || String(title).toUpperCase().includes('CURATOR') ? "curators" :query}
                        />
                    :
                    !sectionLoading && <ErrorMessage error={t("explore.not_found")} />
                }
            </Box>
        </Box>
    );
};

BlockScroll.defaultProps = {
    content:[],
    title:'Title',
    header:'flex',
    type:'nft',
    sectionLoading:false,
    query:''
}

BlockScroll.propTypes = {
    content: PropTypes.array,
    title: PropTypes.string,
    header: PropTypes.string,
    type: PropTypes.string,
    sectionLoading: PropTypes.bool,
    query: PropTypes.string
};



export default BlockScroll;