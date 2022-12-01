import axios from "axios";

export const cancelAllCryptoRequestsByIds = (tokeIds) => {
    return new Promise((resolve,reject) => {
        try {
            let params = ""
            tokeIds.forEach(id => {
                params+="&id_request="+id
            });
            axios.put(process.env.REACT_APP_URL_API+"/exchange/crypto?&mode=CANCEL_REQUESTS"+params)
            .then((data) => { resolve(data) })
            .catch(error => { reject(error) })
        } catch (error) {
            reject(error)
        }
    });
}