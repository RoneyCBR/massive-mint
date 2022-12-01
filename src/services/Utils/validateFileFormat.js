export  const formats = ['JPG','JPEG','PNG','GIF','MP3','PDF','audio/mpeg', 'MP4']

const noVideoFormat = ['JPG','JPEG','PNG','GIF','MP3','PDF','audio/mpeg']

export const isVideo = (file) => {
    console.log('test file', file)
    let isVideo = true
    noVideoFormat.forEach(format => {
        if(file.type.toUpperCase().includes(format.toUpperCase())) {
            isVideo = false
        }
    })
    return isVideo
}

export const isFormat = (file,type) => {
    if (file.type.toUpperCase().includes(type.toUpperCase())) {
        return true;
    } else {
        return false;
    }
}


export const isValidFormat = (file,validFormats) => {
    let valid = false;
    if(file == "undefined" ||  file == null) return false;
    validFormats.forEach(type => {
        if(isFormat(file,type)) {
            valid = true;
        }
    })
    return valid;
}