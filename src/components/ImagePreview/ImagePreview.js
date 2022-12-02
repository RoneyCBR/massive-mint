import React from 'react'
import { Box, Card, CardMedia } from '@mui/material'
import preview from 'assets/images/preview2.jpg'
import PropTypes from 'prop-types'

const ImagePreview = ({image, isVideo, title, timeVideoRef}) => {

    return (
        <Box
            sx={{
                marginTop:{xs:'1rem',sm:'1rem',md:'2rem',lg:'4rem',xl:'2rem'}
            }}
        >
            <Box
                component='h2'
                sx={{
                    fontSize:'26px',
                    lineHeight:'26px',
                    marginBottom:'20px',
                    marginTop:'0px',
                    textAlign:'center',
                    color:'#fff'
                }}
            >
                {title}
            </Box>
            <Card
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    border: '1px solid #E5E5E5',
                    padding: '10px',
                    position: 'relative'
                }}
            >
                <CardMedia
                    ref={timeVideoRef}
                    id="preview"
                    component={isVideo ? "video" : "img"}
                    src={image ? image : preview}
                    //autoPlay
                    loop
                    muted
                    controls={false}
                    type="video/mp4"
                    sx={{
                        borderRadius: '5px',
                        minHeight:'100px',
                        maxHeight: '400px',
                        maxWidth: '400px',
                        '@media (max-width: 600px)': {
                            height: '100%',
                            width: '100%',
                        }
                    }}
                />
            </Card>
        </Box>
    )
}

ImagePreview.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    isVideo: PropTypes.bool,
    timeVideoRef: PropTypes.object
}
 
export default ImagePreview