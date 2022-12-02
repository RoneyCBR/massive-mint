import Web3 from 'web3'
import Contract from './PerseaSimpleCollection.json'

export const totalLeft = async(provider,address) => {
    let web3 = null;
    if(web3) {
        web3 = new Web3(provider)
    } else {
        web3 = new Web3(process.env.REACT_APP_RPC)
    }
    let contract = new web3.eth.Contract(Contract.abi,address)
    let left = await contract.methods.totalLeft().call()
    console.log('left',left)
    return parseInt(left)
}


export const getCurrentPrice = async(provider,address) => {
    let web3 = null;
    if(web3) {
        web3 = new Web3(provider)
    } else {
        web3 = new Web3(process.env.REACT_APP_RPC)
    }
    let contract = new web3.eth.Contract(Contract.abi,address)
    let price = await contract.methods.currentPrice().call()
    console.log('price', price)
    return price
}
