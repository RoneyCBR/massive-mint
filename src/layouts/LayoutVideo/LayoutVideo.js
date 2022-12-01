import React, { useState } from 'react';
import openDesk from 'assets/video/open_desk.mp4';
import openMobile from 'assets/video/open_mobile.mp4';
import { CardMedia, Modal } from '@mui/material';

const LayoutVideo = () => {
    const [videoModal, setVideoModal] = useState(true);
    return(
        <Modal open={videoModal}>
            <div>
                <CardMedia
                    sx = {{
                        height:'calc(100vh - 1px)',
                        objectFit:'cover',
                        animation:'fadeIn .8s',
                        "@keyframes fadeIn":{
                            "0%":{ opacity: 0 },
                            "100%":{ opacity: 1}
                        }
                    }}
                    component="video"
                    src={window.screen.width > 470 ? openDesk : openMobile}
                    type="video/mp4"
                    onClick={()=>setVideoModal(false)}
                    muted
                    autoPlay
                    onPause={()=>setVideoModal(false)}
                    controls={false}
                />
            </div>
        </Modal>
    );
};

export default LayoutVideo;
