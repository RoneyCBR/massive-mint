import axios from "axios";

export const getMaticInUSD = () => {
    return new Promise((resolve,reject) => {
        try {
            axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=MATIC&tsyms=USD')
            .then((data) => { 
                resolve(data.data["RAW"]["MATIC"]["USD"]["PRICE"]) 
            })
            .catch(error => { reject(error) })
        } catch (error) {
            reject(error)
        }
    });
}