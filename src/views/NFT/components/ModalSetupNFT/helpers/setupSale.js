import axios from "axios";

export const setupSale = (token) => {
    return new Promise((resolve, reject) => {
        let url = `${process.env.REACT_APP_URL_API}/exchange/configuration?filter=CONFIG&token_id=${token}`;
        axios.get(url).then(res => {
            resolve(res.data)
        }).catch(err => {
            console.log('setupSale ::', err)
            reject(err)
        })
    })
}