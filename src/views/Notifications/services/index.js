import axios from 'axios';

export const getNotifications = async (address) => {
    const url =  process.env.REACT_APP_URL_API+`/history?domain=${process.env.REACT_APP_DOMAIN}&wallet=${address}&blockchain=${process.env.REACT_APP_NETWORK_NAME}&page=0&limit=5`
    try{
        const request = await axios.get(url)
        const { data } = request
        return data
    }
    catch(error){
        return error
    }
}