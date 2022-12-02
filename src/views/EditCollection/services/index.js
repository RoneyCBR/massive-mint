import axios from "axios";

export const uploadThumbnail = (type, url_thumbnail) => {
    let type = isVideo ? "video" : "img";
    let url_thumbnail = process.env.REACT_APP_URL_API+"/thumbnail?type="+type
    let headers = {
      'Content-Type': 'multipart/form-data'
    }
    return axios.post(url_thumbnail, thumbnail, { headers :headers}).then(response => response.data);
}
