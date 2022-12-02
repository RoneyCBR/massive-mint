import Web3 from 'web3'
import Contract from './Exchange.json'

export const fee = async(address) => {
    let web3 = new Web3(process.env.REACT_APP_RPC);
    let contract = new web3.eth.Contract(Contract.abi,address)
    let  approve = await contract.methods.fee().call()
    console.log('Fee',approve)
    return approve
}
