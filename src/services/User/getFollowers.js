import axios from "axios";

export const getFollowers = async(wallet) => {
    return axios.get(process.env.REACT_APP_URL_API+`/follow?wallet=${wallet}`)
    .then(res=>res.data)
}