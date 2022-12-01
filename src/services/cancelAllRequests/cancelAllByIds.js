import axios from "axios";

export const cancelAllByIds = (tokeIds) => {
    return new Promise((resolve,reject) => {
        try {
            let params = ""
            tokeIds.forEach(id => {
                params+="&id_request="+id
            });
            axios.put(process.env.REACT_APP_URL_API+"/exchange/nft?&mode=CANCEL_REQUESTS"+params)
            .then((data) => { resolve(data) })
            .catch(error => { reject(error) })
        } catch (error) {
            reject(error)
        }
    });
}