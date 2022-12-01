import axios from "axios";

export const deleteFollower = async(wallet, follower) => {
    return axios.delete(process.env.REACT_APP_URL_API+`/follow?wallet=${wallet}&follower=${follower}`)
    .then(res=>res.data)
}