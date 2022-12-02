import React from 'react'
import { Box, CardMedia } from '@mui/material';
import PropTypes from 'prop-types';
import { RiShareBoxFill } from 'react-icons/ri';

const Banner =  ({background,content,isVideo, randomThumb,children}) => { 
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
            sx={{
                mt: 2,
                gap:'10px',
                backgroundImage: `url(${background})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                padding: '10px 40px 10px',
                borderRadius: '10px',
                height: '400px',
                width:'100%'
            }}
        >
            <Box 
                sx={{
                    width:'100%',
                    height:'100%',
                    display:'flex',
                    justifyContent:{xs:'center',sm:'space-between',md:'space-between',lg:'space-between',xl:'space-between'},
                    flexDirection:{xs:'column-reverse',sm:'row',md:'row',lg:'row',xl:'row'}
                }}
            >
                <Box>
                {children}
                </Box>
                <Box>
                    <Box
                        sx={{
                            display:'flex',
                            justifyContent:'center'
                        }}
                    >
                        <Box
                            sx={{
                                boxSizing:'border-box',
                                padding: '10px',
                                borderRadius:'8px',
                                backdropFilter: 'blur(20px)',
                                backgroundColor:'transparent',
                                boxShadow:'inset 0px 0px 20px rgba(65, 176, 42, 0.8)',
                                '@media screen and (max-width: 768px)':{
                                    marginTop:'0px',
                                },
                               
                            }}
                        >
                            <CardMedia  
                                component={ isVideo ? 'video' : 'img'}
                                alt='collection'
                                src={randomThumb}
                                autoPlay
                                muted
                                sx={{
                                    width:'120px',
                                    height:'120px',
                                    borderRadius:'8px'
                                }}
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display:'flex',
                            justifyContent:'center'
                        }}
                    >
                        <Box
                            display='inline-flex'
                            alignItems='center'
                            justifyContent='space-between'
                            onClick={()=>window.open(`${process.env.REACT_APP_SCAN}address/${String(content.project_key).toLowerCase()}`, '_blank')}
                            sx={{
                                cursor: 'pointer',
                                marginTop:'0.5rem',
                                gap:'0.5rem',
                                backdropFilter: 'blur(20px)',
                                backgroundColor:'transparent',
                                boxShadow:'inset 0px 0px 20px rgba(65, 176, 42, 0.8)',
                                boxSizing:'border-box',
                                padding:'0.5rem 1rem',
                                borderRadius: '999px',
                                textAlign:'center',
                                color:'#fff',
                                fontSize:'18px',
                                letterSpacing:'1px',
                                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '
                            }} 
                        >
                            <span>
                                {(content.project_key).substring(0,5)+ '...' +(content.project_key).substring(38,54)}
                            </span>
                            <span><RiShareBoxFill color='#fff' /></span>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

Banner.propTypes = {
    content: PropTypes.object.isRequired,
    background: PropTypes.string.isRequired,
    isVideo: PropTypes.bool.isRequired,
    randomThumb: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default Banner