import axios from "axios";

export const cancelAllRequests = (id_token) => {
    return new Promise((resolve,reject) => {
        try {
            axios.put(process.env.REACT_APP_URL_API+"/exchange/nft?id_token="+id_token+"&mode=CANCEL_ALL")
            .then((data) => { resolve(data) })
            .catch(error => { reject(error) })
        } catch (error) {
            reject(error)
        }
    });
}