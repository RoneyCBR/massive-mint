import axios from "axios";

export const saveAcceptUpdateStatus = async(tx_request) => {
    return new Promise((resolve,reject) => {
        try {
            axios.put(process.env.REACT_APP_URL_API+"/exchange/nft?status=1&tx_request="+tx_request+"&mode=UPDATE_STATUS")
            .then((data) => { resolve(data) })
            .catch(error => { reject(error) })
        } catch (error) {
            reject(error)
        }
    });
}