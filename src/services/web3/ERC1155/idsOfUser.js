import ABI from './ABI.json'
import Web3 from 'web3'


export const tokenIdsOfUser = async(address, projectKey, maxToken = 654,callback) => {
    let walletWeb3 = new Web3(process.env.REACT_APP_PROVIDER_MATIC);
    let tokenIdsToSend = []
    let addressToSend = []
    for (let index = 0; index < maxToken; index++) {
        tokenIdsToSend.push(index)
        addressToSend.push(address)
    }
    console.log(addressToSend)
    console.log(tokenIdsToSend)
    const contract = new walletWeb3.eth.Contract(ABI, projectKey);
    let tokensIds = await contract.methods.balanceOfBatch(addressToSend,tokenIdsToSend).call();
    let tokensOfUser = []
    for (let index = 0; index < tokensIds.length; index++) {
        const amount = parseInt(tokensIds[index]);
        if(amount > 0) {
            let tokenId = tokenIdsToSend[index];
            tokensOfUser.push(tokenId)
        }
    }
    callback(tokensOfUser)
}


export const tokenIdOfUser = async(address,projectKey, tokenId,callback) => {
    let walletWeb3 = new Web3(process.env.REACT_APP_PROVIDER_MATIC);
    const contract = new walletWeb3.eth.Contract(ABI, projectKey);
    let isOwner = await contract.methods.balanceOf(address,tokenId).call();
    callback(isOwner)
}