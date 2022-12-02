import axios from "axios";

export const cancelAllCryptoRequests = (id_token) => {
    return new Promise((resolve,reject) => {
        try {
            axios.put(process.env.REACT_APP_URL_API+"/exchange/crypto?id_token="+id_token+"&mode=CANCEL_ALL")
            .then((data) => { resolve(data) })
            .catch(error => { reject(error) })
        } catch (error) {
            reject(error)
        }
    });
}