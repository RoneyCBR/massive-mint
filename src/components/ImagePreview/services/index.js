export const handlechangeVideoFPS = (video, current, total) => {
    let fps = 29.97003;
    let duration;

    video.addEventListener('loadedmetadata', () => {
        duration = video.duration;
        total = Math.round(duration * fps);
    })
}

function updateFrameNumber (){
    let currentFrame;
    if(!video.seeking){
        currentFrame = Math.round(video.currentTime * fps);
        current = currentFrame;
    }
    requestAnimationFrame(updateFrameNumber);
}

video.addEventListener('play', function(){
    updateFrameNumber();
})
