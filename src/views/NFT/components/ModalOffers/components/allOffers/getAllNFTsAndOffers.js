import axios from "axios";

export const getAllNFTsAndOffers = async() => {
    return new Promise((resolve,reject) => {
        try {
            axios.get(process.env.REACT_APP_URL_API+"/exchange/nft?filter=NFTS_AND_OFFERS")
            .then((success) => { resolve(success.data) })
            .catch(error => { reject(error) })
        } catch (error) {
            reject(error)
        }
    });
}