import axios from "axios";

export const getIfHaveTxt = async (address, gas = 'NONE') => {
    const blockchain = process.env.REACT_APP_NETWORK_NAME;
    const domain = process.env.REACT_APP_DOMAIN;
    const url = `${process.env.REACT_APP_URL_API}/transaction?blockchain=${blockchain}&wallet=${address}&domain=${domain}&gasinfo=${gas}`
    return axios.get(url).then(res=>res.data)
}



export const validateTx = (address,tx)=>{
    const blockchain = process.env.REACT_APP_NETWORK_NAME;
    const domain = process.env.REACT_APP_DOMAIN;
    const url = `${process.env.REACT_APP_URL_API}/transaction?blockchain=${blockchain}&wallet=${address}&domain=${domain}&gasinfo=NONE&transaction=${tx}`
    return axios.get(url).then(res=>res.data)
}

export const saveEmail = async(email,address,tx)=>{
    const blockchain = process.env.REACT_APP_NETWORK_NAME;
    const domain = process.env.REACT_APP_DOMAIN;
    let data = { 
        email : email,
        address : address, transaction : tx,
        blockchain_name :blockchain
    }
    const url = `${process.env.REACT_APP_URL_API}/whitelist?domain=${domain}`
    return axios.post(url,data).then(res=>res.data)
}