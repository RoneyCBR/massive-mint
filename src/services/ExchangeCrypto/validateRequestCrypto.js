import axios from "axios";

export const validateRequestCrypto= async(data) => {
    return new Promise((resolve,reject) => {
        try {
            let my_offer = []
            data.tokensId.forEach((id) => {
                my_offer.push(parseInt(id));
            })
            let request = {
                my_offer : my_offer,
                timeLive : parseInt(data.timeLive),
                from_address: data.from,
                to_address: data.to,
                tx_request : data.tx,
                id_token : parseInt(data.tokenId),
                id_project : 1,
                position : parseInt(data.position),
                amount : data.amount,
                currency : data.currency,
                id_request_change : 0
            }
            axios.post(process.env.REACT_APP_URL_API+"/exchange/crypto?mode=VALIDATE",request)
            .then((data) => { resolve(data) })
            .catch(error => { reject(error) })
        } catch (error) {
            reject(error)
        }
    });
}