import axios from "axios";

export const saveConfiguration = async(data) => {
    return new Promise((resolve,reject) => {
        try {
            let request = {
                amount_top : data['amount_top'],
                amount_floor: data['amount_floor'],
                currency: "WMATIC",
                id_token : data["id_token"],
                main_key : data["main_key"],
            }
            axios.post(process.env.REACT_APP_URL_API+"/exchange/configuration",request)
            .then((data) => { resolve(data) })
            .catch(error => { reject(error) })
        } catch (error) {
            reject(error)
        }
    });
}