import React from 'react';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';
import "react-multi-carousel/lib/styles.css";
import CarouselSimple from 'components/Carousel/CarouselSimple';


const Collections = ({content,title}) => {

    let width = window.screen.width;
    const [newWidth,setNewWidth] = React.useState(width);
    const [typeDevice,setTypeDevice] = React.useState("desktop");

    window.addEventListener("resize", function(){
        width = window.screen.width
        if(width <= 600){
            setNewWidth((width*85)/100);
            setTypeDevice("mobile");
        }else
        if(width > 600 && width < 1024){
            if(width > 930 && width < 1024){
                setNewWidth((width/2)-70);
            }else{
                setNewWidth((width/2)-60);
            }
            setTypeDevice("tablet");
        }else
        if(width > 1023 && width < 3000){
            if(width > 1500 && width < 3000){
                setNewWidth((width/3)-140);
            }else{
                setNewWidth((width/3)-100);
            }
            setTypeDevice("desktop");
        }else
        if(width >= 3000){
            setNewWidth((width/4));
            setTypeDevice("big");
        }
    });

    React.useEffect(() => {
        if(width <= 600){
            setNewWidth((width*85)/100);
            setTypeDevice("mobile");
        }else
        if(width > 600 && width < 1024){
            if(width > 930 && width < 1024){
                setNewWidth((width/2)-70);
            }else{
                setNewWidth((width/2)-60);
            }
            setTypeDevice("tablet");
        }else
        if(width > 1023 && width < 3000){
            if(width > 1500 && width < 3000){
                setNewWidth((width/3)-140);
            }else{
                setNewWidth((width/3)-100);
            }
            setTypeDevice("desktop");
        }else
        if(width >= 3000){
            setNewWidth((width/4));
            setTypeDevice("big");
        }
    },[width]);


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
                <CarouselSimple deviceType={typeDevice} content={content} width={newWidth} type={"collections"} />
            </Box>
        </Box>
    );
};

Collections.propTypes = {
    content: PropTypes.array,
    title: PropTypes.string
};

export default Collections;