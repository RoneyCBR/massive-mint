import axios from "axios";

export const uploadFile = async(file) => {
    return new Promise((resolve,reject) => {
        try {
            let formData = new FormData();
            formData.append("files", file);
            axios.post(process.env.REACT_APP_URL_API+"/extra-files",formData)
            .then((data) => { resolve(data) })
            .catch(error => { reject(error) })
        } catch (error) {
            reject(error)
        }
    });
}