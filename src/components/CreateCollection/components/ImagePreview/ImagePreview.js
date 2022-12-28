import React from 'react'
import { Box, Card, CardMedia } from '@mui/material'
import PropTypes from 'prop-types'

/**
 * It's a function that returns a preview of the image or video
 * @param {string} image The (image or video) to preview
 * @param {string} title The title of the preview
 * @param {bool} isVideo The isVideo property indicates what to display if a video or an image (true = video || false = image)
 * @param {object} timeVideoRef The timeVideoRef indicates which frame should be displayed in case it is video
 * @returns A component to display an image
 */
const ImagePreview = ({image, isVideo, title, timeVideoRef,imgDefaultPreview}) => {
    return (
        <Box
            sx={{
                marginTop:{xs:'1rem',sm:'1rem',md:'1rem',lg:'1rem',xl:'1rem'}
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
                    color:'#fff',
                    fontFamily:'BentonSansBBVA-Medium,sans-serif'
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
                    src={image ? image : imgDefaultPreview}
                    //autoPlay
                    loop
                    muted
                    controls={false}
                    type="video/mp4"
                    sx={{
                        borderRadius: '5px',
                        minHeight:'100px',
                        maxHeight: '200px',
                        maxWidth: '350px',
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
    timeVideoRef: PropTypes.object,
    imgDefaultPreview: PropTypes.string
}
 
export default ImagePreview