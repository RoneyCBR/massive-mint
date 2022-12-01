import axios from "axios";
import { saveRequestChange } from "services/ExchangeCards/saveRequestChange";

export const saveRequestCrypto = async(data) => {
    return new Promise((resolve,reject) => {
        try {
            let my_offer = []
            data.tokensId.forEach((id) => {
                my_offer.push(parseInt(id));
            })
            if (my_offer.length > 0) {
                saveRequestChange(data).then((success) => {
                    let request = {
                        my_offer : my_offer,
                        timeLive : parseInt(data.timeLive),
                        from_address: data.from,
                        amount : data.amount,
                        to_address: data.to,
                        tx_request : data.tx,
                        id_token : parseInt(data.tokenId),
                        id_project : 1,
                        position : parseInt(""+data.position),
                        currency : data.currency,
                        id_request_change : success.data.id_request_change
                    }
                    axios.post(process.env.REACT_APP_URL_API+"/exchange/crypto",request)
                    .then((data) => { resolve(data) })
                    .catch(error => { reject(error) })
                }).catch((error) => {
                    reject(error)
                })
            } else {
                let request = {
                    timeLive : parseInt(data.timeLive),
                    from_address: data.from,
                    amount : data.amount,
                    to_address: data.to,
                    tx_request : data.tx,
                    id_token : parseInt(data.tokenId),
                    id_project : 1,
                    position : parseInt(data.position),
                    currency : data.currency,
                    id_request_change : data.id_request_change
                }
                axios.post(process.env.REACT_APP_URL_API+"/exchange/crypto",request)
                .then((data) => { resolve(data) })
                .catch(error => { reject(error) })
            }
        } catch (error) {
            reject(error)
        }
    });
}