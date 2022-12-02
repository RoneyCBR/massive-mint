import axios from "axios";

export const getProjectByAddress = async(address,page=0, limit = 40) => {
    return axios.get(process.env.REACT_APP_URL_API+`/project?domain=artcrypted.com&wallet=${address}&limit=${limit}&page=${page}&search=USER`)
    .then(res=>res.data)
}