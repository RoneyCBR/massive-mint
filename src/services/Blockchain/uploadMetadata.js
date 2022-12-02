import axios from "axios";

export const uploadMetadata = async(data) => {
    return new Promise((resolve,reject) => {
        try {
            axios.post(process.env.REACT_APP_URL_API+"/nft/metadata",data)
            .then((data) => { resolve(data) })
            .catch(error => { reject(error) })
        } catch (error) {
            reject(error)
        }
    });
}