import axios from "axios";

export const updateOwner = async(tokenId,address) => {
    return new Promise((resolve,reject) => {
        try {
        let url = process.env.REACT_APP_URL_API+`/nft?address=${address}&token_id=${tokenId}&domain=${process.env.REACT_APP_DOMAIN}&blockchain=${process.env.REACT_APP_NETWORK_NAME}`
        axios.get(url)
            .then(() => { 
                url = process.env.REACT_APP_URL_API+`/nft?address=${address}&token_id=${tokenId}&domain=${process.env.REACT_APP_DOMAIN}`
                axios.get(url)
                .then(async(data) => {
                    //await updateOwner(tokenId,address)
                    resolve(data)
                })
            })
            .catch(error => { reject(error) })
        } catch (error) {
            reject(error)
        }
    });
}