import axios from "axios";
import { tokenIdsOfUser } from "services/web3/ERC1155/idsOfUser";
import Web3 from 'web3'

const getNFTOffered = (address)=>{
    
    return new Promise((resolve)=>{
        if(Web3.utils.isAddress(address)) {
            console.log('getNFTOffered :: project')
            tokenIdsOfUser(address,1000,(tokensId) => {
                let tokenIDs = []
                for (let index = 0; index < tokensId.length; index++) {
                    //const element = array[index];
                    let token_id = parseInt(tokensId[index])
                    if(token_id > 0) {
                        tokenIDs.push(token_id)
                    }
                }
                if (tokenIDs.length > 0) {
                    let url = `${process.env.REACT_APP_URL_API}/nft?address=${process.env.REACT_APP_COLLECTION_ADDRESS}`;
                    tokenIDs.forEach(tokenID => {
                        url+="&token_id="+tokenID
                    })
                    axios.get(url).then(res=>{
                        console.log('user nfts ::',res.data)
                        resolve(res.data)
                    })
                }
            })
            /*
            axios.get(`${process.env.REACT_APP_URL_API}/project?address=${process.env.REACT_APP_COLLECTION_ADDRESS}`).then(res=>{
                tokenIdsOfUser(address,1000,(tokensId) => {
                    let nfts = []
                    for (let index = 0; index < tokensId.length; index++) {
                        //const element = array[index];
                        let token_id = parseInt(tokensId[index])
                        if(token_id > 0) {
                            let nft = res.data[0].nfts.find(x => x.token_id == token_id);
                            if(nft) {
                                nfts.push(nft)
                            }
                        }
                    }
                    resolve(res.data[0].nfts)
                })
            })*/
        } else {
            resolve([])
        }
    })
}

export const fetchCardOffered = (address)=>{
    const cardsPromise = getNFTOffered(address);
    return{
        cardsOffered: WrapPromise(cardsPromise),
    }
}

const WrapPromise = promise =>{
    let status = 'pending';
    let result;
    let suspender = Promise.all([promise]).then(
        res=>{
            status = 'success';
            result = res;
        },
        err=>{
            status = 'error';
            result = err;
        }
    )
    return {
        read(){
            if(status === 'pending'){
                throw suspender;
            }else if(status === 'success'){
                return result;
            }else if(status === 'error'){
                throw result;
            }
        }
    }
}