import axios from "axios";

export const getUser = async(address) => {
    const blockchain = process.env.REACT_APP_NETWORK_NAME;
    const domain = process.env.REACT_APP_DOMAIN;
    return axios.get(process.env.REACT_APP_URL_API+`/user?domain=${domain}&wallet=${address}&blockchain=${blockchain}&limit=15&page=0`)
    .then(res=>res.data[0])
}