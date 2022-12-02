import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import "react-multi-carousel/lib/styles.css";
import CarouselSimple from 'components/Carousel/CarouselSimple';
import items from './utils/items';
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

const Categories = ({content,title}) => {
    const {t} = useTranslation("translate");
    const [array,setArray] = React.useState(content);
    let width = window.innerWidth;
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
        setArray(content);     
    },[]);
    
    return (
        <Box
            sx={{
                width:'100%',
            }}
        >   
            <Box
                sx={{
                    width:'100%',
                    display:'flex',
                    justifyContent:'space-between'
                }}
            >
                <Box
                    sx={{
                        fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                        fontSize:'40px',
                        fontWeight:'bold',
                        color:'#0D0D0D',
                        "@media screen and (max-width: 380px)":{
                            fontSize:'30px',
                        } 
                    }}
                >
                   {title}
                </Box>
            </Box>

            <Box
                sx={{
                    width:'calc(100% - 0px)',
                    height:'100%',
                    overflowX:'hidden'
                }}
            >
                {
                    (content != null && content.length > 0)? 
                        <CarouselSimple deviceType={typeDevice} content={array} width={10000} type={"categories"} />
                    :
                    <ErrorMessage error={t("explore.not_found")} />
                }
            </Box>
        </Box>
    );
};

Categories.defaultProps = {
    content: items,
    title:'title'
};

Categories.propTypes = {
    content: PropTypes.array,
    title:PropTypes.string
};

export default Categories;