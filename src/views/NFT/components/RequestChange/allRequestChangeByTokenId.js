import axios from "axios";

export const allRequestChangeByTokenId = async(tokenId) => {
    return new Promise((resolve,reject) => {
        try {
            axios.get(process.env.REACT_APP_URL_API+"/exchange/nft?filter=TOKEN_ID&token_id="+tokenId)
            .then((data) => { resolve(data) })
            .catch(error => { reject(error) })
        } catch (error) {
            reject(error)
        }
    });
}