import axios from "axios";

export const uploadNFT = async(data) => {
    return new Promise((resolve,reject) => {
        try {
            axios.post(process.env.REACT_APP_URL_API+"/nft?type=SINGLE",data)
           // axios.post("https://api.v.je/nft?type=SINGLE",data)
            .then((data) => { resolve(data) })
            .catch(error => { reject(error) })
        } catch (error) {
            reject(error)
        }
    });
}